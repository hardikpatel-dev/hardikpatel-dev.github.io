import { redirect } from "next/navigation";
import {
  getAdminSession,
  isAdminSignupEnabled,
} from "@/app/admin/_lib/auth";
import AdminAuthForm from "@/app/admin/_components/AdminAuthForm";

export const metadata = {
  title: "Admin Login | Hardik Patel",
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  const signupEnabled = isAdminSignupEnabled();

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#f5f5f7_0%,#eceef2_42%,#ffffff_100%)] p-3 text-text">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-[1480px] gap-3 lg:grid-cols-[minmax(0,1.18fr)_minmax(560px,0.82fr)]">
        <section className="relative hidden overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#ffffff,#eef1f6)] p-8 shadow-[0_16px_48px_rgba(17,17,17,0.06)] lg:flex lg:flex-col lg:justify-between">
          <div className="relative z-10">
            <p className="text-[10px] uppercase tracking-[0.4em] text-text-muted">
              Admin Login
            </p>
            <h2 className="mt-4 max-w-[8ch] font-whyte text-[clamp(4.2rem,6.8vw,7rem)] leading-[0.88] text-text-heading">
              Welcome back
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-text-muted">
              Secure entry for the project dashboard.
            </p>
          </div>

          <div className="relative z-10 grid gap-3 sm:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-2xl bg-[#111111] p-5 text-white shadow-[0_16px_36px_rgba(17,17,17,0.12)]">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/38">
                Access path
              </p>
              <p className="mt-3 text-sm leading-6 text-white/72">
                Login opens projects, publishing, and the responsive admin shell.
              </p>
            </div>
            <div className="rounded-2xl bg-white/82 p-5 shadow-[0_12px_30px_rgba(17,17,17,0.05)] ring-1 ring-black/5">
              <p className="text-[10px] uppercase tracking-[0.28em] text-text-muted">
                Focus
              </p>
              <p className="mt-3 text-sm leading-6 text-text-muted">
                Clean entry with one account and no extra admin friction.
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-10 top-18 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,112,255,0.10),transparent_68%)]" />
            <div className="absolute right-10 top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(17,17,17,0.06),transparent_68%)]" />
            <div className="absolute left-12 top-28 h-44 w-44 rounded-2xl border border-black/6" />
            <div className="absolute left-40 top-36 h-28 w-28 rounded-full border border-[#4f70ff]/14" />
            <div className="absolute left-20 top-44 h-2 w-40 bg-[linear-gradient(90deg,transparent,rgba(17,17,17,0.08),transparent)]" />
            <div className="absolute right-24 top-40 h-40 w-40 rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.6),rgba(232,237,248,0.9))] ring-1 ring-black/5" />
            <div className="absolute right-32 top-48 h-24 w-24 rounded-full border border-black/6" />
          </div>
        </section>

        <AdminAuthForm mode="login" signupEnabled={signupEnabled} />
      </div>
    </main>
  );
}
