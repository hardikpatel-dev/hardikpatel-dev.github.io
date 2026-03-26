"use client";
import { IconArrowDown } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import FadeUpTextScroll from "../animations/FadeUpTextScroll";

export default function ResumePage() {
  return (
    <div
      className="flex flex-col items-center p-4 bg-primary mx-2 mb-2 rounded-md gap-6"
      data-cursor=""
    >
      {/* Download Button */}
      <Link
        href="/assets/hardik-resume.pdf"
        download
        className="sticky top-18 cursor-pointer flex justify-between bg-inverse px-3 py-2 rounded-full text-inverse tracking-wider shadow-xl hover:bg-gray-900 hover:scale-105 duration-500 hover:ring-1 font-whyte w-[140px]"
      >
        <FadeUpTextScroll delay={1}>Resume</FadeUpTextScroll>
        <IconArrowDown className="animate-bounce" />
      </Link>

      {/* Resume Image */}
      <Image
        src="/assets/hardik-resume.jpg"
        alt="Hardik Patel Resume"
        width={800}
        height={1100}
        quality={85}
        priority
        className="w-full max-w-3xl border rounded-md border-gray-300"
      />
    </div>
  );
}

