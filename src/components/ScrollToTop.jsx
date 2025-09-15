"use client";

import { useState, useEffect, useRef } from "react";
import { IconArrowUp } from "@tabler/icons-react";
import gsap from "gsap";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false); // desired visibility from scroll
  const [isMounted, setIsMounted] = useState(false); // controls rendering so hide animation can run
  const btnRef = useRef(null);
  const arrowWrapRef = useRef(null);
  const tlRef = useRef(null);

  // watch scroll and set desired visibility
  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 200);
    onScroll(); // init
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // when desired visibility changes -> animate in/out
  useEffect(() => {
    // show
    if (isVisible) {
      setIsMounted(true); // ensure DOM exists first
      // wait a frame so element is in DOM
      requestAnimationFrame(() => {
        if (!btnRef.current) return;
        // kill any previous timeline
        if (tlRef.current) tlRef.current.kill();

        // build entry timeline
        const tl = gsap.timeline();
        // slide in from right (x: positive means coming from right)
        tl.fromTo(
          btnRef.current,
          { x: 140, opacity: 0, pointerEvents: "none" },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            onStart: () => gsap.set(btnRef.current, { pointerEvents: "auto" }),
          }
        );
        // arrow bounce once (small upward translate)
        tl.to(
          arrowWrapRef.current,
          { y: -8, duration: 0.3, ease: "power2.inOut", yoyo: true, repeat: 1 },
          "-=0.12"
        );

        tlRef.current = tl;
      });
    } else if (isMounted) {
      // hide (animate out) then unmount
      if (tlRef.current) tlRef.current.kill();
      const tl = gsap.timeline({
        onComplete: () => {
          setIsMounted(false);
        },
      });

      // reset arrow position (if needed)
      tl.to(
        arrowWrapRef.current || btnRef.current,
        { y: 0, duration: 0.08 },
        0
      );

      // slide out to right
      tl.to(
        btnRef.current,
        {
          x: 140,
          opacity: 0,
          duration: 0.45,
          ease: "power2.in",
          onStart: () => gsap.set(btnRef.current, { pointerEvents: "none" }),
        },
        0
      );

      tlRef.current = tl;
    }

    return () => {
      // keep timeline until next run; we won't kill here to let animations finish
    };
  }, [isVisible, isMounted]);

  // on click -> small press feedback + scroll
  const scrollToTop = () => {
    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { scale: 1 },
        {
          scale: 0.95,
          duration: 0.06,
          yoyo: true,
          repeat: 1,
          ease: "power1.out",
        }
      );
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // only render while mounted (so hide animation can run before unmount)
  if (!isMounted) return null;

  return (
    <button
      ref={btnRef}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-7 -right-2 z-[1000] w-[60px] h-[46px] px-2 py-3 rounded-l-full bg-gradient-to-bl from-gray-300 to-gray-900 text-white shadow-lg flex items-end gap-0.5 cursor-pointer overflow-hidden"
      style={{ transform: "translateX(0)", opacity: 1 }}
    >
      {/* wrap arrow in an element so we can animate it */}
      <span ref={arrowWrapRef}>
        <IconArrowUp size={20} />
      </span>
      <span className="text-[10px] leading-none select-none">Top</span>
    </button>
  );
}
