"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { animatePageIn } from "@/lib/animatePage";
import { initMagneticHover } from "@/lib/initMagneticHover";

export default function Template({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    animatePageIn();
    const cleanupMagnetic = initMagneticHover();

    return () => {
      if (typeof cleanupMagnetic === "function") cleanupMagnetic();
    };
  }, [pathname]);

  return (
    <div>
      {/* Transition banners */}
      <div
        id="banner-1"
        className="min-h-screen bg-inverse z-[999] fixed top-0 left-0 w-1/4"
      />
      <div
        id="banner-2"
        className="min-h-screen bg-inverse z-[999] fixed top-0 left-1/4 w-1/4"
      />
      <div
        id="banner-3"
        className="min-h-screen bg-inverse z-[999] fixed top-0 left-2/4 w-1/4"
      />
      <div
        id="banner-4"
        className="min-h-screen bg-inverse z-[999] fixed top-0 left-3/4 w-1/4"
      />

      {children}
    </div>
  );
}
