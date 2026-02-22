"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import FadeUpTextScroll from "@/app/animations/FadeUpTextScroll";
import FlipOnScroll from "@/app/animations/FlipOnScroll";
import techStack from "@/data/tech-stack";

const TechStack = () => {
  const topRow = techStack.slice(0, 3);
  const bottomRow = techStack.slice(3);

  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const [active, setActive] = useState(techStack[0].id);

  useEffect(() => {
    const activeEl = document.getElementById(`tech-${active}`);
    const overlay = overlayRef.current;
    const container = containerRef.current;

    if (activeEl && overlay && container) {
      const rect = activeEl.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();

      gsap.to(overlay, {
        x: rect.left - parentRect.left,
        y: rect.top - parentRect.top,
        width: rect.width,
        height: rect.height,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [active]);

  return (
    <div
      id="tech-stack"
      data-cursor=""
      className="wrapper bg-secondary border-t-2 z-1 relative"
    >
      <h2 className="heading uppercase text-center my-8 md:my-10 lg:my-20">
        <FadeUpTextScroll delay={0.5}>
          Modern <span className="text-nowrap">Tech stack</span>
        </FadeUpTextScroll>
      </h2>

      <div className="container-fluid md:py-20">
        <div className="stack-container relative" ref={containerRef}>
          {/* Overlay */}
          <div
            ref={overlayRef}
            className="absolute bg-inverse pointer-events-none flex items-center justify-center"
            style={{ top: 0, left: 0 }}
          ></div>

          {/* Desktop / Tablet Layout */}
          <div className="hidden md:flex flex-col items-center justify-center relative z-10">
            {/* Top Row */}
            <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
              {topRow.map((tech) => (
                <a
                  key={tech.id}
                  data-cursor={tech.id}
                  id={`tech-${tech.id}`}
                  href={tech.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setActive(tech.id)}
                  className="h-60 flex flex-1 items-center justify-center p-6 border-r border-b border-t-0 border-gray-300 transition first:border-l-0 last:border-r-0"
                >
                  <FlipOnScroll>
                    <Image
                      src={tech.icon}
                      alt={tech.id}
                      width={60}
                      height={60}
                      sizes="60px"
                      quality={50}
                      loading="lazy"
                      className={`h-18 w-auto object-contain  ${
                        active === tech.id ? "filter-invert" : "svg-invert"
                      }`}
                    />
                  </FlipOnScroll>
                </a>
              ))}
            </div>

            {/* Bottom Row */}
            <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
              {bottomRow.map((tech) => (
                <a
                  key={tech.id}
                  id={`tech-${tech.id}`}
                  href={tech.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setActive(tech.id)}
                  className="h-50 flex flex-1 items-center justify-center p-6 border-r border-gray-300 transition first:border-l-0 last:border-r-0"
                >
                  <FlipOnScroll>
                    <Image
                      src={tech.icon}
                      alt={tech.id}
                      width={60}
                      height={60}
                      sizes="60px"
                      quality={50}
                      loading="lazy"
                      className={`h-12 w-auto object-contain  ${
                        active === tech.id ? "filter-invert" : "svg-invert"
                      }`}
                    />
                  </FlipOnScroll>
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Layout (2 per row) */}
          <div className="grid grid-cols-2 md:hidden relative z-1">
            {techStack.map((tech) => (
              <a
                key={tech.id}
                id={`tech-${tech.id}`}
                href={tech.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActive(tech.id)}
                className="h-30 flex flex-1 items-center justify-center p-4 border-r border-b border-gray-300 transition odd:border-l-0 even:border-r-0 last:border-r-0"
              >
                <FlipOnScroll>
                  <Image
                    src={tech.icon}
                    alt={tech.id}
                    width={50}
                    height={50}
                    sizes="50px"
                    quality={50}
                    loading="lazy"
                    className={`h-12 w-auto object-contain svg-invert`}
                  />
                </FlipOnScroll>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
