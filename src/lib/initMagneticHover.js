import { gsap } from "gsap";

const magneticRegistry = new WeakMap();

export function initMagneticHover() {
  if (window.innerWidth < 768) return;

  const elements = document.querySelectorAll(".magnetic-hover");
  const cleanupFns = [];

  elements.forEach((el) => {
    const existing = magneticRegistry.get(el);
    if (existing) {
      existing.count += 1;
      cleanupFns.push(() => {
        const current = magneticRegistry.get(el);
        if (!current) return;
        current.count -= 1;
        if (current.count <= 0) {
          el.removeEventListener("mousemove", current.onMouseMove);
          el.removeEventListener("mouseleave", current.onMouseLeave);
          magneticRegistry.delete(el);
        }
      });
      return;
    }

    const strength = 1.5;
    // agar tum element me `data-strength="60"` likhoge to override ho jayega

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const offsetX = e.clientX - (rect.left + rect.width / 2);
      const offsetY = e.clientY - (rect.top + rect.height / 2);

      gsap.to(el, {
        x: offsetX / strength, // yaha strength ka effect hoga
        y: offsetY / strength,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "back.inOut(1)", // bounce back
      });
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    magneticRegistry.set(el, { onMouseMove, onMouseLeave, count: 1 });

    cleanupFns.push(() => {
      const current = magneticRegistry.get(el);
      if (!current) return;
      current.count -= 1;
      if (current.count <= 0) {
        el.removeEventListener("mousemove", current.onMouseMove);
        el.removeEventListener("mouseleave", current.onMouseLeave);
        magneticRegistry.delete(el);
      }
    });
  });

  return () => {
    cleanupFns.forEach((cleanup) => cleanup());
  };
}
