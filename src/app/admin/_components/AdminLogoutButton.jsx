"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    const response = await fetch("/api/admin/auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      toast.error("Logout failed.");
      setIsLoading(false);
      return;
    }

    toast.success("Logged out.");
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="flex w-full items-center gap-3 rounded-2xl bg-white/[0.04] px-3 py-2.5 text-left text-sm text-white transition hover:bg-white/[0.07] disabled:opacity-60"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" x2="9" y1="12" y2="12" />
        </svg>
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="font-medium text-white">{isLoading ? "Logging out..." : "Logout"}</span>
      </span>
    </button>
  );
}
