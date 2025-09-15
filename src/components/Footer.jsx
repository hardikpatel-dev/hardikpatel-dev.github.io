"use client";
import useLocalTime from "@/lib/useLocalTime";
import { IconArrowDownLeftCircle } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 👈 to detect the current page
import React from "react";
import TransitionLink from "./TranstionLinks";

const Footer = () => {
  const time = useLocalTime();
  const pathname = usePathname(); // current route
  const isContactPage = pathname === "/contact"; // check if it's contact page

  return (
    <div className="bg-olive text-blue-50 ">
      <div className="container-fluid">
        {!isContactPage && (
          <>
            <div className="flex items-end sm:items-center justify-between relative wrapper border-b-gray-500 border-b">
              <div className="text-4xl sm:text-[5vw] font-whyte font-bold tracking-tight">
                <video
                  src="/assets/emoji.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-18 h-18 mb-2 rounded-full object-cover magnetic-hover"
                />{" "}
                Let’s work <br /> together
              </div>
              <IconArrowDownLeftCircle size={50} stroke={1} />
            </div>
            <div className="flex relative">
              <div className="stripe block w-full h-[1px] bg-gray-700 "></div>
              <div className="absolute top-0 right-0 transform -translate-x-1/3 sm:-translate-x-1/2 -translate-y-1/2">
                <TransitionLink
                  label="Get in Touch"
                  href="contact"
                  className="magnetic-hover inline-flex  w-30 sm:w-40 h-30 sm:h-40 justify-center items-center rounded-full bg-white text-black text-shadow-lg"
                >
                  Get in Touch
                </TransitionLink>
              </div>
            </div>
            <div className="flex items-center wrapper gap-6 flex-wrap">
              <Link
                href="mailto:hkpatelofficial69@gmail.com"
                className="relative inline-flex items-center justify-center p-3 sm:p-6 rounded-full border border-gray-500 text-white overflow-hidden group magnetic-hover"
              >
                <span className="relative z-10">
                  hkpatelofficial69@gmail.com
                </span>
                {/* background fluid */}
                <span
                  className="absolute bottom-0 left-0 w-full h-full bg-amber-400 rounded-full
               transform translate-y-full group-hover:translate-y-0
               transition-transform duration-500 ease-in-out"
                ></span>
              </Link>

              <Link
                href="tel:+916386921922"
                className="relative inline-flex items-center justify-center p-3 sm:p-6 rounded-full border border-gray-500 text-white overflow-hidden group magnetic-hover"
              >
                <span className="relative z-10">+91 6386 921 922</span>
                <span
                  className="absolute bottom-0 left-0 w-full h-full bg-amber-400 rounded-full
               transform translate-y-full group-hover:translate-y-0
               transition-transform duration-500 ease-in-out"
                ></span>
              </Link>
            </div>
          </>
        )}
        <div className=" flex flex-row items-center justify-between flex-wrap gap-6 py-6">
          {/* Left - Version */}
          <div className="flex flex-col  gap-4">
            <span className="uppercase text-xs tracking-widest text-text-muted">
              Version
            </span>
            <span className="text-white text-sm">
              {new Date().getFullYear()} © Edition
            </span>
          </div>

          {/* Center - Local Time */}
          <div className="flex flex-col gap-4">
            <span className="uppercase text-xs tracking-widest text-text-muted">
              Local Time
            </span>
            <span className="text-white text-sm">{time}</span>
          </div>

          {/* Right - Social */}
          <div className="flex flex-col gap-4">
            <span className="uppercase text-xs tracking-widest text-text-muted">
              Socials
            </span>
            <div className="flex gap-6  text-sm">
              <Link
                href="tel:+916386921922"
                className="hover:text-white transition-all hover:underline"
              >
                Whatsapp
              </Link>
              <Link
                href="https://www.linkedin.com/in/hardik-kumar-patel-564798227"
                target="_blank"
                className="hover:text-white transition-colors hover:underline"
              >
                LinkedIn
              </Link>
              <Link
                href="https://github.com/hardikpatel-dev"
                target="_blank"
                className="hover:text-white transition-colors hover:underline"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
