"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconArrowUpRight,
  IconFolders,
  IconLayoutGrid,
  IconMail,
  IconSettings,
  IconUserCircle,
} from "@tabler/icons-react";
import AdminLogoutButton from "@/app/admin/_components/AdminLogoutButton";
import AdminBrandMark from "@/app/admin/_components/AdminBrandMark";

const navItems = [
  { href: "/admin", label: "Overview", icon: IconLayoutGrid },
  { href: "/admin/projects", label: "Projects", icon: IconFolders },
  { href: "#", label: "Messages", icon: IconMail },
  { href: "#", label: "Settings", icon: IconSettings },
];

export default function AdminSidebar({ user, className = "" }) {
  const pathname = usePathname();

  return (
    <aside className={`flex h-[calc(100vh-1.5rem)] flex-col overflow-hidden rounded-2xl bg-[#101010] text-white ${className}`}>
      <div className="border-b border-white/8 px-5 pb-5">
        <div className="mt-5 flex items-center gap-3">
          <AdminBrandMark size="md" className="shrink-0" />
          <div>
            <p className="font-whyte text-[18px] leading-none text-white">Admin</p>
          </div>
        </div>
      </div>

      <nav className="space-y-1.5 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isRoute = item.href !== "#";
          const isActive = isRoute && pathname === item.href;

          const content = (
            <>
              <span className="flex items-center gap-3">
                <Icon size={18} stroke={1.8} />
                {item.label}
              </span>
              {!isRoute ? (
                <span className="text-[11px] uppercase tracking-[0.2em] opacity-50">
                  Soon
                </span>
              ) : isActive ? (
                <IconArrowUpRight size={16} stroke={1.8} />
              ) : null}
            </>
          );

          return isRoute ? (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm transition ${
                isActive
                  ? "bg-white text-black"
                  : "bg-transparent text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {content}
            </Link>
          ) : (
            <button
              key={item.label}
              type="button"
              className="flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm text-white/38"
              disabled
            >
              {content}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/8 px-3 py-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-3 py-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-black">
              <IconUserCircle size={20} stroke={1.8} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{user.name}</p>
              <p className="truncate text-xs text-white/42">Profile</p>
            </div>
          </div>

          <AdminLogoutButton />
        </div>
      </div>
    </aside>
  );
}
