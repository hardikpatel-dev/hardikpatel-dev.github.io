"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function DeviceFrame({ type, src }) {
  const frameRef = useRef(null);

  let frameClass = "";
  if (type === "mobile") {
    frameClass = "w-28 h-58";
  } else if (type === "desktop") {
    frameClass = "w-85 h-48";
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
          ? "lg:-rotate-0 translate-y-[-4px]"
          : "lg:rotate-0 translate-y-[4px]"
      }`}
    >
      {src && (
        <Image
          src={src}
          alt={`${type} mockup`}
          width={85}
          height={52}
          className="w-full h-full object-cover rounded-lg"
          quality={100}
          loading="lazy"
        />
      )}
    </div>
  );
}
