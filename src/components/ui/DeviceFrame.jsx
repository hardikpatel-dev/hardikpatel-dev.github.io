"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function DeviceFrame({ type, src }) {
  const frameRef = useRef(null);

  let frameClass = "";
  if (type === "mobile") {
    frameClass = "w-28 h-58 xl:w-32 xl:h-64";
  } else if (type === "desktop") {
    frameClass = "w-85 h-48 xl:w-96 xl:h-54";
  }

  useEffect(() => {
    if (frameRef.current) {
      gsap.fromTo(
        frameRef.current,
        { opacity: 0, scale: 0.8, transformOrigin: "center" },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 1.5 + gsap.utils.random(0, 0.8),
        }
      );
    }
  }, []);


  return (
    <div
      ref={frameRef}
      className={`flex overflow-hidden items-center justify-center bg-gray-400 rounded-2xl border-5 border-current shadow-md lg:shadow-lg ${frameClass} ${
        type === "mobile"
          ? "lg:-rotate-2 translate-y-[-4px]"
          : "lg:rotate-2 translate-y-[4px]"
      }`}
    >
      {src && (
        <img
          src={src}
          alt={`${type} mockup`}
          width={100}
          height={100}
          className="w-full h-full object-cover rounded-lg"
          loading="eager"
          draggable="false"
        />
      )}
    </div>
  );
}
