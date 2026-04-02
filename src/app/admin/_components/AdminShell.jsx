"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IconMenu2, IconX } from "@tabler/icons-react";
import AdminSidebar from "@/app/admin/_components/AdminSidebar";
import AdminBrandMark from "@/app/admin/_components/AdminBrandMark";

export default function AdminShell({ user, children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#f5f5f7_0%,#eceef2_45%,#f9f9fb_100%)] p-3 text-text">
      <div className="sticky top-3 z-30 mb-3 flex items-center justify-between rounded-2xl bg-[#101010] px-4 py-3 text-white shadow-[0_12px_30px_rgba(17,17,17,0.12)] lg:hidden">
        <div className="flex min-w-0 items-center gap-3">
          <AdminBrandMark size="sm" className="shrink-0" />
          <div className="min-w-0">
            <p className="text-[9px] uppercase tracking-[0.34em] text-white/42">Website Admin</p>
            <p className="mt-1 truncate font-whyte text-2xl leading-none">Hardik Patel</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsSidebarOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black transition hover:bg-[#f1f3f6]"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isSidebarOpen ? <IconX size={20} stroke={1.8} /> : <IconMenu2 size={20} stroke={1.8} />}
        </button>
      </div>

      <div className="grid min-h-[calc(100vh-1.5rem)] gap-3 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="hidden lg:sticky lg:top-3 lg:block lg:self-start">
          <AdminSidebar user={user} />
        </div>

        <section className="min-w-0 space-y-3">{children}</section>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/38 backdrop-blur-[2px] transition lg:hidden ${
          isSidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div
        className={`fixed inset-y-3 left-3 z-50 w-[min(88vw,320px)] transition duration-300 lg:hidden ${
          isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-[110%] opacity-0"
        }`}
      >
        <AdminSidebar user={user} className="h-full shadow-[0_24px_60px_rgba(17,17,17,0.28)]" />
      </div>
    </main>
  );
}
