// components/animations/FadeUpTextScroll.jsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FadeUpTextScroll({ children, delay = 0 }) {
  const el = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.current,
        { y: "104%" }, // hidden niche
        {
          y: "4%",
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el.current,
            start: "top 85%", // 👈 jab element viewport me aa jaye
            toggleActions: "play none none reverse",
            // play on enter, reverse on leave
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <span className="inline-block overflow-y-clip">
      <span ref={el} className="inline-block will-change-transform">
        {children}
      </span>
    </span>
  );
}
