"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { toast } from "sonner";
import AdminBrandMark from "@/app/admin/_components/AdminBrandMark";

export default function AdminAuthForm({
  mode = "login",
  signupEnabled = true,
}) {
  const router = useRouter();
  const isLogin = mode === "login";
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    const response = await fetch(
      isLogin ? "/api/admin/auth/login" : "/api/admin/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      toast.error(result.error || "Authentication failed.");
      setIsSubmitting(false);
      return;
    }

    toast.success(isLogin ? "Welcome back." : "Admin account created.");
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="relative flex min-h-full w-full flex-col overflow-hidden rounded-2xl bg-[#111111] p-6 text-white shadow-[0_22px_60px_rgba(17,17,17,0.22)] sm:p-8 lg:ml-auto lg:max-w-[640px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_30%)]" />
      <div className="relative flex min-h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <AdminBrandMark size="sm" className="shrink-0" />
              <p className="text-[10px] uppercase tracking-[0.34em] text-white/42">
                {isLogin ? "Admin Login" : "Admin Signup"}
              </p>
            </div>
            <h1 className="max-w-[8ch] font-whyte text-[clamp(1.9rem,2.5vw,2.5rem)] leading-[0.94]">
              {isLogin ? "Control access" : "Create access"}
            </h1>
          </div>
          <div className="hidden rounded-2xl bg-white/8 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/52 sm:block">
            {isLogin ? "Secure entry" : "First setup"}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-7">
          {!isLogin ? (
            <label className="block text-sm">
              <span className="text-white/70">Full name</span>
              <input
                required
                value={formState.name}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, name: event.target.value }))
                }
                className="mt-3 w-full rounded-2xl bg-white/6 px-4 py-3.5 outline-none ring-1 ring-white/8 placeholder:text-white/28 transition focus:bg-white/[0.08] focus:ring-white/18"
                placeholder="Hardik Patel"
              />
            </label>
          ) : null}

          <label className="block text-sm">
            <span className="text-white/70">Email</span>
            <input
              required
              type="email"
              value={formState.email}
              onChange={(event) =>
                setFormState((current) => ({ ...current, email: event.target.value }))
              }
                className="mt-3 w-full rounded-2xl bg-white/6 px-4 py-3.5 outline-none ring-1 ring-white/8 placeholder:text-white/28 transition focus:bg-white/[0.08] focus:ring-white/18"
              placeholder="admin@yourdomain.com"
            />
          </label>

          <label className="block text-sm">
            <span className="text-white/70">Password</span>
            <div className="relative mt-3">
              <input
                required
                type={isPasswordVisible ? "text" : "password"}
                minLength={8}
                value={formState.password}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, password: event.target.value }))
                }
                className="w-full rounded-2xl bg-white/6 px-4 py-3.5 pr-13 outline-none ring-1 ring-white/8 placeholder:text-white/28 transition focus:bg-white/[0.08] focus:ring-white/18"
                placeholder="Minimum 8 characters"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible((current) => !current)}
                className="absolute right-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-2xl bg-white/6 text-white/58 transition hover:bg-white/10 hover:text-white"
                aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              >
                {isPasswordVisible ? (
                  <IconEyeOff size={18} stroke={1.8} />
                ) : (
                  <IconEye size={18} stroke={1.8} />
                )}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3.5 text-sm font-medium text-black transition hover:bg-[#eef1f5] disabled:opacity-60"
          >
            {isSubmitting
              ? "Please wait..."
              : isLogin
              ? "Open dashboard"
              : "Create account"}
          </button>
        </form>

        <div className="mt-auto pt-8">
          <div className="flex items-center justify-between gap-4 border-t border-white/8 pt-5 text-sm text-white/55">
            <span>
              {isLogin
                ? signupEnabled
                  ? "Need an account?"
                  : "Signup is disabled in production."
                : "Already set up?"}
            </span>
            {isLogin ? (
              signupEnabled ? (
                <Link
                  href="/admin/signup"
                  className="rounded-2xl bg-white/8 px-4 py-2 text-white transition hover:bg-white/12"
                >
                  Go to signup
                </Link>
              ) : null
            ) : (
              <Link
                href="/admin/login"
                className="rounded-2xl bg-white/8 px-4 py-2 text-white transition hover:bg-white/12"
              >
                Go to login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
