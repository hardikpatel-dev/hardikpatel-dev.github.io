import gsap from "gsap";
import { useEffect } from "react";

export default function useRollingLinks() {
  useEffect(() => {
    const links = document.querySelectorAll(".nav-link");

    links.forEach((link) => {
      const spans = link.querySelectorAll("span");

      link.addEventListener("mouseenter", () => {
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
      });

      link.addEventListener("mouseleave", () => {
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
      });
    });
  }, []);
}
