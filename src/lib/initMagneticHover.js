import { gsap } from "gsap";

export function initMagneticHover() {

  if (window.innerWidth < 768) return;

  const elements = document.querySelectorAll(".magnetic-hover");

  elements.forEach((el) => {
    const strength = 1.5;
    // agar tum element me `data-strength="60"` likhoge to override ho jayega

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const offsetX = e.clientX - (rect.left + rect.width / 2);
      const offsetY = e.clientY - (rect.top + rect.height / 2);

      gsap.to(el, {
        x: offsetX / strength, // yaha strength ka effect hoga
        y: offsetY / strength,
        duration: 0.3,
        ease: "power3.out",
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "back.inOut(1)", // bounce back
      });
    });
  });
}
