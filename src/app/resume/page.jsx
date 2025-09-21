"use client";
import { IconArrowDown, IconDownload } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import FadeUpTextScroll from "../animations/FadeUpTextScroll";

export default function ResumePage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = "/assets/resume.png"; // PDF page exported as high-res PNG
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center p-4 bg-primary mx-2 mb-2 rounded-md gap-6"
      data-cursor=""
    >
      {/* Download Button */}
      <FadeUpTextScroll delay={1}>
        <Link
          href="/assets/resume.pdf"
          download
          className="sticky top-18 cursor-pointer flex justify-between bg-inverse px-3 py-2 rounded-full text-inverse tracking-wider shadow-xl hover:bg-gray-900 hover:scale-105 duration-500 hover:ring-1 font-whyte w-[140px]"
        >
          Resume
          <IconArrowDown className="animate-bounce" />
        </Link>
      </FadeUpTextScroll>

      {/* PDF Viewer as canvas */}
      <canvas
        ref={canvasRef}
        className="w-full max-w-3xl border rounded-md border-gray-300"
      ></canvas>
    </div>
  );
}
