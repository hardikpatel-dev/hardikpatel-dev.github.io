"use client";

import {
  IconArrowUpRight,
  IconChevronLeft,
  IconChevronRight,
  IconCopy,
  IconLock,
  IconPlus,
  IconReload,
  IconShare2,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const WorkTile = ({ project }) => {
  const {
    id,
    order,
    name,
    link,
    favicon,
    thumbnail,
    video,
    industry,
    published,
    description,
  } = project;

  const videoRef = useRef(null);
  const [isVisibleMobile, setIsVisibleMobile] = useState(false);

  // 📱 Mobile autoplay (scroll observer)
  useEffect(() => {
    if (!video || window.innerWidth >= 768) return; // only mobile

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const middle = window.innerHeight / 2;

        if (
          entry.isIntersecting &&
          rect.top > middle - 100 &&
          rect.top < window.innerHeight - 100
        ) {
          setIsVisibleMobile(true);
          videoRef.current?.play();
        } else {
          setIsVisibleMobile(false);
          videoRef.current?.pause();
          if (videoRef.current) videoRef.current.currentTime = 0;
        }
      },
      { threshold: [0.25, 0.5, 0.75] }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, [video]);

  return (
    <div className="flex flex-col md:flex-row gap-4 lg:gap-1">
      {/* Browser Mockup */}
      <Link
        href={link}
        target="_blank"
        // hover:drop-shadow-[-8px_8px_5px_rgba(0,0,0,0.10)] hover:-translate-y-0.5
        // ${order % 2 === 0 ? "hover:-rotate-1" : "hover:-rotate-1"}
        className={`group block md:basis-[60%] browser-mockup aspect-16/9 rounded-xl lg:rounded-md shadow-lg lg:shadow-none
         mb-5 transition-all duration-300 overflow-hidden lg:overflow-visible  border-5 border-current lg:border-0`}
      >
        <div className="bg-secondary border-b border-gray-200 h-8 flex items-center justify-between px-4 rounded-t-lg">
          {/* Left controls */}
          <div className="flex space-x-4 items-center">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex space-x-1 items-center text-text-muted">
              <IconChevronLeft size={16} />
              <IconChevronRight size={16} />
            </div>
          </div>

          {/* Middle URL bar */}
          <div className="flex items-center justify-between space-x-2 text-text-muted bg-primary px-2 py-0.5 w-1/2 rounded-sm">
            <IconLock size={10} />
            <span className="text-[10px] truncate">
              {link.replace(/^https?:\/\//, "")}
            </span>
            <IconReload size={10} />
          </div>

          {/* Right controls */}
          <div className="flex space-x-2 text-text-muted">
            <IconShare2 size={12} />
            <IconPlus size={12} />
            <IconCopy size={12} />
          </div>
        </div>

        <div className="relative w-full bg-primary h-full lg:overflow-hidden">
          {/* Thumbnail */}
          <Image
            width={1920}
            height={1080}
            priority
            quality={90}
            src={thumbnail}
            alt={name}
            className={`
              absolute inset-0 w-full h-full object-cover transition-all duration-300
              ${isVisibleMobile ? "opacity-0" : "opacity-100"}
              ${video ? "md:group-hover:opacity-0" : ""}
            `}
          />

          {/* Video */}
          {video && (
            <video
              ref={videoRef}
              src={video}
              muted
              loop
              preload="metadata"
              poster={thumbnail}
              playsInline
              className={`
                absolute inset-0 w-full h-full object-cover transition-all duration-300 z-10
                ${isVisibleMobile ? "opacity-100" : "opacity-0"}
                md:group-hover:opacity-100
              `}
              onMouseEnter={(e) => {
                if (window.innerWidth >= 768) e.currentTarget.play();
              }}
              onMouseLeave={(e) => {
                if (window.innerWidth >= 768) {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }
              }}
            />
          )}
        </div>
      </Link>

      {/* Work details below */}
      <div className="mb-6 md:basis-[40%] flex flex-col gap-8 justify-between">
        <div className="flex gap-2 flex-col">
          {/* Logo + Name */}
          <div className="flex gap-2 items-center">
            <div className="h-10 w-10 rounded-full bg-secondary overflow-hidden">
              <Image
              width={40}
              height={40}
              loading="lazy"
                src={favicon}
                alt={`${name} favicon`}
                className="w-full h-full object-contain rounded-full bg-white p-0.5"
              />
            </div>
            <span className="font-serif tracking-wider font-bold text-xl">
              {name}
            </span>
          </div>
          {/* Description */}
          <div className="w-full sm:w-[60%] md:w-full lg:w-[80%]">
            <p className="text-[12px] text-text-muted">{description}</p>
          </div>
        </div>

        {/* Industry, Link, Published */}
        <div className="flex gap-2 flex-wrap items-center justify-between">
          <p className="text-xs">
            <span className="text-text-muted">
              Industry <br />
            </span>
            <span className="font-medium text-sm tracking-tight">
              {industry}
            </span>
          </p>
          <p className="text-xs">
            <span className="text-text-muted">
              Live Site <br />
            </span>
            <span
              onClick={() => window.open(link, "_blank")}
              className="font-medium text-sm tracking-tight cursor-pointer flex items-center gap-0.5 group"
            >
              {/* Arrow (hidden by default, shows on hover) */}
              <IconArrowUpRight
                size={14}
                className="opacity-0  transition-all duration-200 group-hover:opacity-100 "
              />
              <span className="transition-all duration-200 -translate-x-4 group-hover:translate-x-0 ">
                {link.replace(/^https?:\/\//, "")}
              </span>
            </span>
          </p>
          <p className="text-xs">
            <span className="text-text-muted">
              Published <br />
            </span>
            <span className="font-medium text-sm tracking-tight">
              {published}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkTile;
