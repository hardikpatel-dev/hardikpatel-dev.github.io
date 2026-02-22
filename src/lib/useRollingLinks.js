import gsap from "gsap";
import { useEffect } from "react";

export default function useRollingLinks() {
  useEffect(() => {
    const links = document.querySelectorAll(".nav-link");
    const cleanupFns = [];

    links.forEach((link) => {
      const spans = link.querySelectorAll("span");
      if (spans.length < 2) return;

      const onMouseEnter = () => {
        gsap.to(spans[0], {
          yPercent: -100,
          duration: 0.4,
          ease: "power2.inOut",
        });

        gsap.to(spans[1], {
          yPercent: -100,
          duration: 0.4,
          ease: "power2.inOut",
          delay: 0.05, // thoda delay for rolling effect
        });
      };

      const onMouseLeave = () => {
        gsap.to(spans[0], {
          yPercent: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });

        gsap.to(spans[1], {
          yPercent: 0,
          duration: 0.4,
          ease: "power2.inOut",
          delay: 0.05,
        });
      };

      link.addEventListener("mouseenter", onMouseEnter);
      link.addEventListener("mouseleave", onMouseLeave);
      cleanupFns.push(() => {
        link.removeEventListener("mouseenter", onMouseEnter);
        link.removeEventListener("mouseleave", onMouseLeave);
      });
    });

    return () => {
      cleanupFns.forEach((cleanup) => cleanup());
    };
  }, []);
}
