import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const SESSION_COOKIE_NAME = "hp_admin_session";

export function isAdminSignupEnabled() {
  return (
    process.env.NODE_ENV !== "production" ||
    process.env.ADMIN_ALLOW_SIGNUP === "true"
  );
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.DATABASE_URL || "dev-admin-secret";
}

function encode(value) {
  return Buffer.from(value).toString("base64url");
}

function decode(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

export function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derivedKey}`;
}

export function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(":")) {
    return false;
  }

  const [salt, originalKey] = storedHash.split(":");
  const derivedKey = scryptSync(password, salt, 64).toString("hex");
  return timingSafeEqual(Buffer.from(originalKey, "hex"), Buffer.from(derivedKey, "hex"));
}

function createSessionValue(user) {
  const payload = encode(
    JSON.stringify({
      userId: user.id,
      email: user.email,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    })
  );

  return `${payload}.${sign(payload)}`;
}

function parseSessionValue(sessionValue) {
  if (!sessionValue || !sessionValue.includes(".")) {
    return null;
  }

  const [payload, signature] = sessionValue.split(".");

  if (signature !== sign(payload)) {
    return null;
  }

  const parsedPayload = JSON.parse(decode(payload));

  if (!parsedPayload?.expiresAt || parsedPayload.expiresAt < Date.now()) {
    return null;
  }

  return parsedPayload;
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = parseSessionValue(sessionCookie);

  if (!session?.userId) {
    return null;
  }

  const user = await prisma.adminUser.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return user ? { user } : null;
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function setAdminSession(user) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, createSessionValue(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
