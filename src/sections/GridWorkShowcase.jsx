"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// simple array of image sources
const works = [
  "/assets/workGrid/work1.png",
  "/assets/workGrid/work2.png",
  "/assets/workGrid/work3.png",
  "/assets/workGrid/work4.png",
  "/assets/workGrid/work5.png",
  "/assets/workGrid/work6.png",
  "/assets/workGrid/work7.png",
  "/assets/workGrid/work8.png",
  "/assets/workGrid/work3.png",
  "/assets/workGrid/work10.png",
  "/assets/workGrid/work9.png",
  "/assets/workGrid/work13.png",
  "/assets/workGrid/work11.png",
  "/assets/workGrid/work12.png",
  "/assets/workGrid/work1.png",
];

export default function GridWorkShowcase() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = gsap.utils.toArray(".grid-col");
      const V = window.innerHeight;

      cols.forEach((col, i) => {
        const H = col.offsetHeight;
        let speedFactor = 1; // lower = slower, higher = faster
        let M = (H - V) * speedFactor;
        if (M < 0) M = 0;

        const isEven = i % 2 === 0;

        gsap.fromTo(
          col,
          { y: isEven ? 0 : -M },
          {
            y: isEven ? -M : 0,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "30% 80%",
              end: "80% 80%",
              scrub: true,
              // markers: true,
            },
          }
        );
      });
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // split works into 4 columns
  const columns = [[], [], [], []];
  const colCount =
    typeof window !== "undefined" && window.innerWidth < 768 ? 3 : 4;
  works.forEach((src, i) => columns[i % colCount].push(src));

  return (
    <div
      ref={containerRef}
      className="relative h-[250vh] md:h-[300vh] lg:h-[400vh] -mt-[100vh] -mb-[100vh]"
    >
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 items-start bg-gray-700 overflow-hidden px-4 sticky top-0 h-screen">
        {columns.map((col, i) => (
          <div
            key={i}
            className={`grid-col flex flex-col gap-3 ${
              i % 2 === 0 ? "items-start" : "items-end"
            }`}
          >
            {col.map((src, j) => (
              <div
                key={j}
                className={`relative w-full overflow-hidden bg-gray-200 shadow-md `}
              >
                <Image
                  src={src}
                  alt={`Work ${i}-${j}`}
                  width={800}
                  height={1200}
                  className="w-full h-auto object-contain"
                  quality={40}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
