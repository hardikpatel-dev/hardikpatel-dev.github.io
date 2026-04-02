import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  clearAdminSession,
  hashPassword,
  isAdminSignupEnabled,
  setAdminSession,
  verifyPassword,
} from "@/app/admin/_lib/auth";

function getErrorDetails(error) {
  return process.env.NODE_ENV !== "production" ? error?.message : undefined;
}

export async function loginAdmin(request) {
  try {
    const payload = await request.json();
    const email = String(payload?.email || "").trim().toLowerCase();
    const password = String(payload?.password || "");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    await setAdminSession(user);

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Admin login failed:", error);

    return NextResponse.json(
      {
        error: "Failed to login.",
        details: getErrorDetails(error),
      },
      { status: 500 }
    );
  }
}

export async function signupAdmin(request) {
  try {
    if (!isAdminSignupEnabled()) {
      return NextResponse.json(
        {
          error:
            "Admin signup is disabled in production. Use an existing admin account to log in.",
        },
        { status: 403 }
      );
    }

    const payload = await request.json();
    const name = String(payload?.name || "").trim();
    const email = String(payload?.email || "").trim().toLowerCase();
    const password = String(payload?.password || "");

    if (!name || !email || password.length < 8) {
      return NextResponse.json(
        {
          error:
            "Name, valid email, and a password of at least 8 characters are required.",
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An admin account with this email already exists." },
        { status: 409 }
      );
    }

    const user = await prisma.adminUser.create({
      data: {
        name,
        email,
        passwordHash: hashPassword(password),
      },
    });

    await setAdminSession(user);

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Admin signup failed:", error);

    return NextResponse.json(
      {
        error: "Failed to create admin account.",
        details: getErrorDetails(error),
      },
      { status: 500 }
    );
  }
}

export async function logoutAdmin() {
  await clearAdminSession();
  return NextResponse.json({ success: true });
}
