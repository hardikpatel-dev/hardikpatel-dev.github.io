"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mockups from "../data/mockups.json";
import DeviceFrame from "./ui/DeviceFrame";

gsap.registerPlugin(ScrollTrigger);

export default function MockupGrid() {
  const root = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop / lg screens (vertical animation)
      mm.add("(min-width: 1024px)", () => {
        gsap.to(
          ".mockup-item",
          {
            y:50,
            duration: 0.6,
            stagger: 0.2,
            ease:"power1.inOut",
            scrollTrigger: {
              trigger: root.current,
              start: "20% 60%",
              end: "bottom 20%",
              scrub: true,
            },
          }
        );
      });

      // Mobile / tablet (horizontal scroll effect)
      mm.add("(max-width: 1023px)", () => {
        const track = root.current.querySelector(".mockup-track");

        // auto loop
        const tl = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          duration: 30,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        // scroll karte hi speed boost
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            // scroll speed ke hisaab se timeline ka speed
            const speed = 1 + self.getVelocity() / 100;
            gsap.to(tl, {
              timeScale: Math.min(Math.abs(speed), 3),
              duration: 0.3,
            });
          },
          onLeave: () => gsap.to(tl, { timeScale: 1, duration: 0.5 }),
          onEnterBack: () => gsap.to(tl, { timeScale: 1, duration: 0.5 }),
        });
      });

    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="relative  max-lg:w-screen  lg:translate-x-15  lg:translate-y-[-30px] xl:translate-x-0 transition"
    >
      {/* lg screens → grid | below lg → flex row */}
      <div className="mockup-track grid grid-cols-3 gap-1 auto-rows-fr max-lg:flex max-lg:space-x-4 ">
        {mockups.map((item, i) => (
          <div
            key={i}
            className={`mockup-item ${
              item.type === "mobile" ? "lg:col-span-1 mx-auto" : "lg:col-span-2"
            }`}
          >
            <DeviceFrame type={item.type} src={item.src} />
          </div>
        ))}
      </div>
    </div>
  );
}
