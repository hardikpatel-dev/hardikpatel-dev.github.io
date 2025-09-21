"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const circleTextRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const text = textRef.current;
    const circleText = circleTextRef.current;

    // GSAP quickTo for smooth motion
    const xMove = gsap.quickTo(cursor, "x", {
      duration: 0.5,
      ease: "power3.out",
    });
    const yMove = gsap.quickTo(cursor, "y", {
      duration: 0.5,
      ease: "power3.out",
    });

    const move = (e) => {
      // center the cursor element on mouse
      xMove(e.clientX - cursor.offsetWidth / 2);
      yMove(e.clientY - cursor.offsetHeight / 2);
    };
    window.addEventListener("mousemove", move);

    // rotating circle text (default)
    gsap.to(circleText, {
      rotate: 360,
      duration: 8,
      repeat: -1,
      ease: "linear",
    });

    // helper lists of classes to toggle
    const defaultClasses = ["w-16", "h-16", "backdrop-blur-sm"];
    const smallDotClasses = ["w-3", "h-3", "bg-inverse", "shadow-lg"];
    const bubbleClasses = ["px-4", "py-2", "w-auto", "h-auto"];

    const makeDefault = () => {
      // remove both special states, then add default
      cursor.classList.remove(...smallDotClasses, ...bubbleClasses);
      cursor.classList.add(...defaultClasses);
      cursor.style.border = ""; // reset if modified
      cursor.style.background = ""; // reset if modified
      text.textContent = "";
      text.classList.remove("!visible"); // in case
      circleText.style.display = "block";
    };

    const makeSmallDot = () => {
      // small filled dot for data-cursor=""
      cursor.classList.remove(...defaultClasses, ...bubbleClasses);
      cursor.classList.add(...smallDotClasses, "rounded-full");
      // hide text and circle text
      text.textContent = "";
      circleText.style.display = "none";
      // ensure no internal text element shows
      text.classList.remove("inline-block");
    };

    const makeBubble = (t) => {
      // bubble with text
      cursor.classList.remove(...defaultClasses, ...smallDotClasses);
      cursor.classList.add(
        ...bubbleClasses,
        "rounded-full",
        "backdrop-blur-sm"
      );
      text.textContent = t;
      circleText.style.display = "none";
      // ensure text visible
      text.classList.add("inline-block");
    };

    const handleEnter = (e) => {
      const t = e.target.getAttribute("data-cursor");
      if (t !== null) {
        // attribute exists
        if (t === "") {
          makeSmallDot();
        } else {
          makeBubble(t);
        }
      }
    };
    const handleLeave = () => {
      makeDefault();
    };

    // attach listeners to all elements that have data-cursor
    const els = Array.from(document.querySelectorAll("[data-cursor]"));
    els.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    // cleanup
    return () => {
      window.removeEventListener("mousemove", move);
      els.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center
        w-16 h-16 rounded-full backdrop-blur-sm text-xs text-text-muted font-medium"
      style={{ transform: "translate3d(0,0,0)" }}
    >
      {/* Circle text (default state) */}
      <svg
        ref={circleTextRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
      >
        <defs>
          <path
            id="circlePath"
            d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
          />
        </defs>
        <text fill="currentColor" fontSize="12" fontWeight="500">
          <textPath
            href="#circlePath"
            startOffset="0%"
            className="tracking-[5px]"
          >
            SCROLL 🌟 SCROLL 🌟
          </textPath>
        </text>
      </svg>

      {/* Hover text (data-cursor) */}
      <span
        ref={textRef}
        className="relative z-10 text-text rounded-full pointer-events-none"
      />
    </div>
  );
}
