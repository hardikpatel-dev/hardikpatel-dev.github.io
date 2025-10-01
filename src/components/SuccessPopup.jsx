"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import FadeUpTextScroll from "@/app/animations/FadeUpTextScroll";

export default function SuccessPopup({ message, onClose }) {
  const popupRef = useRef(null);

  useEffect(() => {
    // Animate in: fade in and scale up
    gsap.fromTo(
      popupRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
    );

    // Auto-close after 5 seconds with fade out
    const timer = setTimeout(() => {
      gsap.to(popupRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
        onComplete: onClose,
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-xs  bg-opacity-50">
      <div
        ref={popupRef}
        className="bg-white sm:py-15 py-10 px-10 rounded-xl shadow-2xl max-w-xl w-full text-center"
      >
        <FadeUpTextScroll delay={0.4}>
          <h3 className="text-5xl font-bold text-green-600 mb-4 italic font-serif">
            Success!
          </h3>
        </FadeUpTextScroll>
        <p className="text-lg text-gray-700 mb-4">{message}</p>
        <p className="text-sm text-gray-500">
          I will strive to contact you at the earliest convenience.
        </p>
      </div>
    </div>
  );
}
