import React from "react";
import {
  IconArrowDownRight,
  IconBrandVscode,
  IconClick,
  IconCode,
  IconCopyright,
  IconHandClick,
  IconSparkles,
  IconWorld,
} from "@tabler/icons-react";
import Link from "next/link";
import MockupGrid from "../components/MockupGrid";
import HeroTagLineSlideUp from "../components/ui/HeroTagLineSlideUp";
import HeroBlob from "../components/ui/HeroBlob";
import FadeUpText from "@/app/animations/FadeUpTextScroll";
import FlipOnScroll from "@/app/animations/FlipOnScroll";

const Hero = () => {
  return (
    <div className="hero-section relative lg:h-[90vh] overflow-x-clip">
      <HeroBlob />
      <div className="w-full max-w-[1400px] mx-auto lg:w-[90%] py-4  lg:py-15">
        <div className="flex flex-row lg:flex-nowrap flex-wrap gap-4">
          <div className="col-span-6 flex-1 lg:flex-none px-4">
            <IconArrowDownRight
              stroke={1}
              size={40}
              className="text-text-muted"
            />
            <div className="py-10 lg:py-12 xl:py-16 text-center lg:text-start">
              <FadeUpText delay={1}>
                <h1 className="leading-tight text-[clamp(1.6rem,6vw,3.5rem)] lg:text-[clamp(1.5rem,6vw,3vw)]  font-extrabold box-border uppercase font-whyte text-text-heading text-nowrap">
                  <span className="inline-flex flex-nowrap items-center">
                    Cra
                    <FlipOnScroll delay={2.5}>
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 256 384"
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-6 sm:size-8 md:size-10 lg:size-8 xl:size-10 drop-shadow-lg mb-1 xs:mb-2 lg:mb-3 xl:mb-1"
                      >
                        <path
                          d="M128 192c0-35.346 28.654-64 64-64s64 28.654 64 64-28.654 64-64 64-64-28.654-64-64z"
                          fill="#1ABCFE"
                        />
                        <path
                          d="M0 320c0-35.346 28.654-64 64-64h64v64c0 35.346-28.654 64-64 64s-64-28.654-64-64z"
                          fill="#0ACF83"
                        />
                        <path
                          d="M128 0v128h64c35.346 0 64-28.654 64-64S227.346 0 192 0h-64z"
                          fill="#FF7262"
                        />
                        <path
                          d="M0 64c0 35.346 28.654 64 64 64h64V0H64C28.654 0 0 28.654 0 64z"
                          fill="#F24E1E"
                        />
                        <path
                          d="M0 192c0 35.346 28.654 64 64 64h64V128H64c-35.346 0-64 28.654-64 64z"
                          fill="#A259FF"
                        />
                      </svg>
                    </FlipOnScroll>
                    ting
                  </span>{" "}
                  <em className="font-serif capitalize tracking-wide">
                    Web Design
                  </em>
                  <br />
                  with{" "}
                  <em className="font-serif capitalize tracking-wide">
                    Frontend
                  </em>{" "}
                  <span className="inline-flex flex-nowrap items-center">
                    E
                    <FlipOnScroll delay={2.5}>
                      <IconBrandVscode
                        stroke={1}
                        className="drop-shadow-lg mb-[4%] md:mb-[2%] xl:mb-[4%] text-blue-500 w-6 sm:w-10 xl:w-12 h-6 sm:h-10 md:h-10 xl:h-12"
                      />
                    </FlipOnScroll>
                    pertise
                  </span>
                </h1>
              </FadeUpText>
              <div className="z-9 flex items-center justify-between sm:justify-center xs:gap-5 sm:gap-12 lg:justify-between font-medium text-[12px] xs:text-sm mt-1 text-text-muted uppercase">
                <FadeUpText delay={1.5}>
                  <span className="flex items-center gap-0.5">
                    <IconCopyright stroke={2} size={16} />{" "}
                    {new Date().getFullYear()}
                  </span>
                </FadeUpText>

                <FadeUpText delay={1.8}>
                  <span className="flex items-center gap-0.5">
                    <IconWorld stroke={2} size={16} /> Based in India
                  </span>
                </FadeUpText>

                <FadeUpText delay={2}>
                  <span className="flex items-center gap-0.5">
                    Designer <IconCode stroke={2} size={16} /> Developer
                  </span>
                </FadeUpText>
              </div>

              <div
                className="flex items-center justify-center lg:justify-start gap-4 mt-14"
                data-cursor=""
              >
                <Link
                  href="#work"
                  data-cursor=""
                  className="main-btn magnetic-hover gap-1 animate-button"
                >
                  View Work
                  <IconSparkles className="w-5 h-5 text-yellow-500" />
                </Link>
                {/* resume button */}
                <Link
                  href="/resume"
                  data-cursor=""
                  className="relative inline-flex  items-center text-sm font-medium text-text xs:px-3 px-5 py-1 lg:py-2.5 rounded-full text-shadow-lg outline-amber-300 outline lg:outline-0 hover:outline transition"
                >
                  Resume {/* on large screen click icon */}
                  <IconClick
                    className="text-text-muted md:inline-block hidden animate-pulse ms-1 mt-1"
                    aria-hidden="true"
                    stroke={1}
                  />
                  {/* on mobine screen hand icon */}
                  <IconHandClick
                    className="text-text-muted inline-block md:hidden animate-pulse mt-2"
                    aria-hidden="true"
                    stroke={1}
                  />
                </Link>
              </div>
            </div>
            <div className="relative lg:absolute bottom-10 h-15 mt-8 overflow-hidden flex items-center justify-center lg:justify-start">
              <HeroTagLineSlideUp />
            </div>
          </div>
          <div className="col-span-6 mx-auto lg:mr-0 z-2">
            <MockupGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
