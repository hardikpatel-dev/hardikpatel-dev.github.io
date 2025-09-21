// components/animations/FlipOnScroll.jsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FlipOnScroll({ children, delay = 0.5 }) {
  const el = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.current,
        { rotateY: 180, opacity: 0 }, // start tilted & hidden
        {
          rotateY: 0,
          opacity: 1,
          duration: 1.5,
          delay,
          stagger: 0.1,
          ease: "back.out(1.7)",
          transformOrigin: "center center", // sikka center se ghoome
          scrollTrigger: {
            trigger: el.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={el}
      className="inline-block will-change-transform"
      style={{ display: "inline-block", perspective: "1000px" }} // depth ke liye
    >
      {children}
    </div>
  );
}
