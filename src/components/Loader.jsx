"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader() {
  const shellRef = useRef(null);
  const haloRef = useRef(null);
  const coreRef = useRef(null);
  const shineRef = useRef(null);
  const labelRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(dotsRef.current, { opacity: 0.2, y: 0 });

      gsap.to(haloRef.current, {
        scale: 1.08,
        opacity: 0.85,
        duration: 1.8,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(coreRef.current, {
        y: -3,
        duration: 1.8,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.fromTo(
        shineRef.current,
        { xPercent: -140, opacity: 0 },
        {
          xPercent: 140,
          opacity: 0.9,
          duration: 1.45,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 0.2,
        }
      );

      gsap.to(labelRef.current, {
        opacity: 0.42,
        duration: 1,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(dotsRef.current, {
        opacity: 1,
        y: -2,
        duration: 0.45,
        stagger: 0.12,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }, shellRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={shellRef}
      className="fixed inset-0 z-[99999] overflow-hidden bg-[radial-gradient(circle_at_top,rgba(247,248,250,0.96),#ffffff_44%,rgba(241,243,246,0.96)_100%)] text-[#111111]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(17,17,17,0.035),transparent_66%)]" />
        <div className="absolute left-[14%] top-[18%] h-40 w-40 rounded-2xl border border-black/[0.035]" />
        <div className="absolute right-[16%] bottom-[20%] h-28 w-28 rounded-full border border-black/[0.04]" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-6">
        <div className="flex flex-col items-center">
          <div className="relative flex h-24 w-24 items-center justify-center">
            <div
              ref={haloRef}
              className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(17,17,17,0.065),transparent_68%)] opacity-60"
            />
            <div
              ref={coreRef}
              className="relative h-16 w-16 overflow-hidden rounded-2xl bg-[linear-gradient(145deg,#171717,#232323)] shadow-[0_20px_40px_rgba(17,17,17,0.14)]"
            >
              <div className="absolute inset-[1px] rounded-[15px] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))]" />
              <div
                ref={shineRef}
                className="absolute inset-y-2 w-8 skew-x-[-20deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.75),transparent)] blur-[2px]"
              />
            </div>
          </div>

          <div className="mt-7 flex items-center gap-1.5">
            <span
              ref={labelRef}
              className="text-[10px] font-medium uppercase tracking-[0.34em] text-black/38"
            >
              Loading
            </span>
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                ref={(node) => {
                  dotsRef.current[dot] = node;
                }}
                className="mt-[1px] h-1 w-1 rounded-full bg-black/34"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
