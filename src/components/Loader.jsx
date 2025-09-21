"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { IconSparkles } from "@tabler/icons-react";

export default function Loader() {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });

    tl.fromTo(
      iconRef.current,
      { scale: 0.8, rotate: 0 },
      { scale: 1.2, rotate: 360, duration: 1.5, ease: "power2.inOut" }
    ).to(
      textRef.current,
      {
        opacity: 0.3,
        duration: 0.7,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1,
      },
      "-=1"
    );

    return () => tl.kill();
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-primary text-text-heading"
    >
      {/* Animated Icon */}
      <div
        ref={iconRef}
        className="flex items-center justify-center w-20 h-20 rounded-full"
      >
        <IconSparkles size={40} stroke={1} className="text-yellow-400" />
      </div>

      {/* Loading text */}
      <p
        ref={textRef}
        className="mt-6 text-lg font-semibold tracking-wide text-text-muted uppercase"
      >
        Loading…
      </p>
    </div>
  );
}
