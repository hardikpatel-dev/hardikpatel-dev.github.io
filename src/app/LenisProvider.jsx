"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // smoothness (lower = faster, higher = smoother)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // default easing
      smoothWheel: true, // smooth scroll with mouse wheel
      smoothTouch: false, // touch devices me normal scroll
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    // 🔥 anchor link smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          lenis.scrollTo(target);
        }
      });
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
