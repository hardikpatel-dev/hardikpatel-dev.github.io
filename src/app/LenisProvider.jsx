"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1, // smoothness (lower = faster, higher = smoother)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // default easing
      smoothWheel: true, // smooth scroll with mouse wheel
      smoothTouch: false, // touch devices me normal scroll
    });
    let rafId = null;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    // 🔥 anchor link smooth scroll
    const handlers = [];
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      const onClick = (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          lenis.scrollTo(target);
        }
      };
      link.addEventListener("click", onClick);
      handlers.push([link, onClick]);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      handlers.forEach(([link, onClick]) => {
        link.removeEventListener("click", onClick);
      });
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
