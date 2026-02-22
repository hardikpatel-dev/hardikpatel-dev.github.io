"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);
  const textRef = useRef(null);
  const isMovingRef = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const timeoutRef = useRef(null);
  const rafRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const moveFnsRef = useRef(null);
  const directionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const text = textRef.current;
    const trailDots = trailRefs.current;
    if (!cursor || !text || !trailDots.length) return;

    // Number of trail dots
    const numDots = 10;

    // Create trail dots
    trailDots.forEach((dot, index) => {
      dot.style.opacity = 1 - (index / numDots) * 0.8; // Fading opacity
      dot.style.transform = `scale(${1 - index * 0.05})`; // Slightly smaller
    });

    // GSAP quickTo for smooth motion of main cursor
    const xMove = gsap.quickTo(cursor, "x", {
      duration: 0.3,
      ease: "power3.out",
    });
    const yMove = gsap.quickTo(cursor, "y", {
      duration: 0.3,
      ease: "power3.out",
    });

    // Trail dot animations
    const trailMoves = trailDots.map((dot, index) =>
      gsap.quickTo(dot, "x", {
        duration: 0.3 + index * 0.05,
        ease: "power3.out",
      })
    );
    const trailYMoves = trailDots.map((dot, index) =>
      gsap.quickTo(dot, "y", {
        duration: 0.3 + index * 0.05,
        ease: "power3.out",
      })
    );
    moveFnsRef.current = { xMove, yMove, trailMoves, trailYMoves };

    const renderCursor = (x, y) => {
      const fns = moveFnsRef.current;
      if (!fns) return;

      // Move main cursor
      fns.xMove(x);
      fns.yMove(y);

      // Move trail dots
      fns.trailMoves.forEach((moveX, index) => {
        const distance = isMovingRef.current ? (index + 1) * 5 : 0;
        moveX(x - directionRef.current.x * distance);
      });
      fns.trailYMoves.forEach((moveY, index) => {
        const distance = isMovingRef.current ? (index + 1) * 5 : 0;
        moveY(y - directionRef.current.y * distance);
      });
    };

    const move = (e) => {
      pointerRef.current = {
        x: e.clientX - cursor.offsetWidth / 2,
        y: e.clientY - cursor.offsetHeight / 2,
      };

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          const { x, y } = pointerRef.current;

          // Detect movement
          if (
            Math.abs(x - lastPosition.current.x) > 1 ||
            Math.abs(y - lastPosition.current.y) > 1
          ) {
            const dx = x - lastPosition.current.x;
            const dy = y - lastPosition.current.y;
            const len = Math.hypot(dx, dy);
            if (len > 0) {
              directionRef.current = { x: dx / len, y: dy / len };
            }

            isMovingRef.current = true;
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              isMovingRef.current = false;
              renderCursor(lastPosition.current.x, lastPosition.current.y);
            }, 100);
          }

          renderCursor(x, y);
          lastPosition.current = { x, y };
        });
      }
    };

    window.addEventListener("mousemove", move);

    // Classes for cursor
    const smallDotClasses = [
      "w-3",
      "h-3",
      "bg-inverse",
      "shadow-lg",
      "rounded-full",
    ];
    const bubbleClasses = [
      "px-4",
      "py-2",
      "w-auto",
      "h-auto",
      "rounded-full",
      "backdrop-blur-md",
    ];

    // Default: small dot
    const makeDefault = () => {
      cursor.classList.remove(...bubbleClasses);
      cursor.classList.add(...smallDotClasses);
      text.textContent = "";
      text.classList.remove("inline-block");
    };

    const makeBubble = (t) => {
      cursor.classList.remove(...smallDotClasses);
      cursor.classList.add(...bubbleClasses);
      text.textContent = t;
      text.classList.add("inline-block");
    };

    // Event handlers for hover
    const handleEnter = (e) => {
      const t = e.target.getAttribute("data-cursor");
      if (t !== null) {
        if (t === "") {
          makeDefault();
        } else {
          makeBubble(t);
        }
      }
    };
    const handleLeave = () => {
      makeDefault();
    };

    // Attach listeners
    const els = Array.from(document.querySelectorAll("[data-cursor]"));
    els.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    // Set initial state
    makeDefault();

    return () => {
      window.removeEventListener("mousemove", move);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      els.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
      clearTimeout(timeoutRef.current);
    };
  }, []);

  // Create trail dot elements
  const trailDots = Array.from({ length: 15 }).map((_, index) => (
    <div
      key={index}
      ref={(el) => (trailRefs.current[index] = el)}
      className="hidden fixed top-0 left-0 z-[9998] pointer-events-none md:block w-3 h-3 rounded-full bg-inverse"
      style={{ transform: "translate3d(0,0,0)" }}
    />
  ));

  return (
    <>
      <div
        ref={cursorRef}
        className="hidden fixed top-0 left-0 z-[9999] pointer-events-none md:flex items-center justify-center w-3 h-3 rounded-full bg-inverse shadow-lg"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        <span
          ref={textRef}
          className="relative z-10 text-text text-xs font-medium rounded-full pointer-events-none hidden"
        />
      </div>
      {trailDots}
    </>
  );
}
