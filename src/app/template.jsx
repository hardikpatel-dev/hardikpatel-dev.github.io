"use client";

import { animatePageIn } from "@/lib/animatePage";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }) {
  const pathname = usePathname();
  const [pageLabel, setPageLabel] = useState("");

  useEffect(() => {
    let label = "Home";
    if (pathname === "/contact") label = "Contact";
    else if (pathname === "/about") label = "About";
    else if (pathname === "/work") label = "Work";

    setPageLabel(label);

    // animate with this label
    animatePageIn(label);
  }, [pathname]);


  return (
    <div>
      {/* Transition banners */}
      <div
        id="banner-1"
        className="min-h-screen bg-inverse z-[999999] fixed top-0 left-0 w-1/4"
      />
      <div
        id="banner-2"
        className="min-h-screen bg-inverse z-[99999] fixed top-0 left-1/4 w-1/4"
      />
      <div
        id="banner-3"
        className="min-h-screen bg-inverse z-[9999] fixed top-0 left-2/4 w-1/4"
      />
      <div
        id="banner-4"
        className="min-h-screen bg-inverse z-[9999] fixed top-0 left-3/4 w-1/4"
      />

      {/* Page transition label */}
      <div className="page-label fixed inset-0 flex items-center justify-center z-[100000] pointer-events-none">
        <span className="text-4xl font-bold text-inverse opacity-0">
          {pageLabel}
        </span>
      </div>

      {children}
    </div>
  );
}
