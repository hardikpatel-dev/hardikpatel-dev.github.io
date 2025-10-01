"use client";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";

const HeroTagLineSlideUp = () => {
  const lineRef = useRef(null);
  const iconsRef = useRef(null);

  useEffect(() => {
    // initial entry animation (only once on mount)
    gsap.from([lineRef.current, iconsRef.current], {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 2,
      ease: "power3.out",
      stagger: 0.2,
    });

    const durationVisible = 4;
    const durationAnim = 0.6;

    const tl = gsap.timeline({ repeat: -1, delay: 3 + 1.2 });
    // delay = initial delay (3s) + entry animation duration (≈1.2s)

    // Line -> show -> hide
    tl.to(lineRef.current, {
      y: "0%",
      opacity: 1,
      duration: durationAnim,
      ease: "power2.out",
    })
      .to(lineRef.current, {
        y: "-150%",
        opacity: 0,
        duration: durationAnim,
        ease: "power2.in",
        delay: durationVisible,
      })

      // Icons -> show -> hide
      .to(iconsRef.current, {
        y: "0%",
        opacity: 1,
        duration: durationAnim,
        ease: "power2.out",
      })
      .to(iconsRef.current, {
        y: "-150%",
        opacity: 0,
        duration: durationAnim,
        ease: "power2.in",
        delay: durationVisible,
      });
  }, []);

  return (
    <>
      <div
        ref={lineRef}
        className="font-whyte text-text-muted translate-y-full opacity-0 lg:w-[90%] xl:w-full"
      >
        <p className=" tracking-wide font-light text-sm md:text-md text-center lg:text-start gradient-text">
          I build modern, fast websites
        </p>
        <p className="font-serif tracking-widest  font-bold text-xs md:text-[16px] text-center lg:text-start gradient-text">
          — optimized for search, designed to impress, and built to convert —
        </p>
      </div>
      <div
        ref={iconsRef}
        className="absolute font-whyte font-light flex gap-1 md:gap-2 mx-1 text-gray-500 dark:text-gray-400 translate-y-full opacity-0"
      >
        <span>Plan</span>
        <span>•</span>
        <span>Design</span>
        <span>•</span>
        <span>Code</span>
        <span>•</span>
        <span>Test</span>
        <span>•</span>
        <span>Iterate</span>
        <span>•</span>
        <span>Polish</span>
        <span>•</span>
        <span>Ship</span>
      </div>
    </>
  );
};

export default HeroTagLineSlideUp;
