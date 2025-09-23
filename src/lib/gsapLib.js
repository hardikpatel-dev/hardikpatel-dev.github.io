"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export function animateWorkTiles() {
  if (typeof window === "undefined") return;

  const tiles = document.querySelectorAll(".work-tile");

  tiles.forEach((tile) => {
    const elements = tile.querySelectorAll(
      " .work-title, .work-description, .work-meta"
    );

    gsap.set(elements, { opacity: 0, y: 40 }); // initial state

    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15, // ek ek karke aaye
      scrollTrigger: {
        trigger: tile,
        start: "50% 85%",
        toggleActions: "play none none reverse",
      },
    });
  });
}
