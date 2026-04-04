import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const SESSION_COOKIE_NAME = "hp_admin_session";

// ─── Signup Gate ────────────────────────────────────────────────────────
export function isAdminSignupEnabled() {
  return (
    process.env.NODE_ENV !== "production" ||
    process.env.ADMIN_ALLOW_SIGNUP === "true"
  );
}

// ─── Session Secret ─────────────────────────────────────────────────────
function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (secret) {
    return secret;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "ADMIN_SESSION_SECRET environment variable is required in production."
    );
  }

  // Dev-only fallback — never used in production
  return "dev-only-admin-secret-do-not-use-in-prod";
}

// ─── Password Hashing ──────────────────────────────────────────────────
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

// ─── Rate Limiting ──────────────────────────────────────────────────────
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;
const rateLimitStore = new Map();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000).unref?.();

export async function checkRateLimit(identifier) {
  const key = `auth:${identifier}`;
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(key, { windowStart: now, attempts: 1 });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }

  entry.attempts += 1;

  if (entry.attempts > MAX_ATTEMPTS) {
    const retryAfterSeconds = Math.ceil(
      (RATE_LIMIT_WINDOW_MS - (now - entry.windowStart)) / 1000
    );
    return { allowed: false, retryAfterSeconds };
  }

  return { allowed: true, remaining: MAX_ATTEMPTS - entry.attempts };
}

export async function getClientIp() {
  const headerStore = await headers();
  return (
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip") ||
    "unknown"
  );
}

// ─── Session Encoding / Signing ─────────────────────────────────────────
function encode(value) {
  return Buffer.from(value).toString("base64url");
}

function decode(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
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

  try {
    const parsedPayload = JSON.parse(decode(payload));

    if (!parsedPayload?.expiresAt || parsedPayload.expiresAt < Date.now()) {
      return null;
    }

    return parsedPayload;
  } catch {
    return null;
  }
}

// ─── Session Management ─────────────────────────────────────────────────
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
