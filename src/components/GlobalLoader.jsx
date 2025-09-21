"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export default function GlobalLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const text = "HARDIK PATEL";

    const loaderEl = document.getElementById("loader");
    if (!loaderEl) return;

    // Inject text dynamically
    loaderEl.textContent = text;

    // Split characters
    const split = new SplitType("#loader", { types: "chars" });
    const chars = split.chars;

    // Initial hidden state with rotation for rolling effect
    gsap.set(chars, {
      y: 50,
      opacity: 1,
      rotationX: 90,
      transformPerspective: 600,
    });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // 1. Letters rise up with rolling effect (rotating along X-axis)
    tl.to(chars, {
      y: 0,
      rotationX: 0, // Roll back to 0 degrees
      duration: 0.6,
      stagger: { each: 0.05, from: "random" },
    });

    // 2. Swipe out letters except H and P
    const atel = chars.filter((c) =>
      ["A", "T", "E", "L"].includes(c.innerText)
    );
    const hardik = chars.filter((c) =>
      ["A", "R", "D", "I", "K"].includes(c.innerText)
    );

    // ATEL swipe out
    tl.to(
      atel,
      {
        x: -120,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
      },
      "s"
    );

    // HARDIK swipe out (except H)
    tl.to(
      hardik,
      {
        x: 120,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
      },
      "s"
    );

    // 3. Move H and P toward each other dynamically
    const h = chars.find((c) => c.innerText === "H");
    const p = chars.find((c) => c.innerText === "P");

    const hRect = h.getBoundingClientRect();
    const pRect = p.getBoundingClientRect();
    const distance = pRect.left - hRect.right; // gap between H and P

    const moveFraction = 0.2; // move 40% toward each other

    tl.to(
      h,
      {
        x: distance * (moveFraction + 0.7), // H moves toward P
        duration: 0.6,
        ease: "power4.out",
      },
      "s"
    );

    tl.to(
      p,
      {
        x: -distance * 0.1, // P moves toward H
        duration: 0.6,
        ease: "power4.out",
      },
      "s"
    );

    // 4. HP zoom (centered)
    tl.to(loaderEl, {
      scale: 20,
      duration: 0.4,
      ease: "power4.in",
      transformOrigin: "center center", // ensures zoom happens from the element's center
    });

    // 5. Fade loader
    tl.to("#global-loader", {
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        setShow(false);
        window.dispatchEvent(new Event("loaderComplete"));
      },
    });

    // Cleanup to revert SplitType changes
    return () => {
      split.revert();
    };
  }, []);

  if (!show) return null;

  return (
    <div
      id="global-loader"
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-secondary overflow-hidden"
    >
      <h1
        id="loader"
        className="font-whyte text-text text-center text-[12vw] text-nowrap font-bold tracking-wide relative"
      ></h1>
    </div>
  );
}