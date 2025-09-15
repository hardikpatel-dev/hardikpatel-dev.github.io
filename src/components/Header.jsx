"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Logo from "./ui/Logo";
import ThemeToggle from "./ThemeToggle";
import { initMagneticHover } from "../lib/initMagneticHover";
import { IconCircleFilled, IconMenu3, IconX } from "@tabler/icons-react";
import useRollingLinks from "@/lib/useRollingLinks";
import ScrollToTop from "./ScrollToTop";
import TransitionLink from "./TranstionLinks";

export default function Header() {
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeLink, setActiveLink] = useState("home");

  useRollingLinks();

  useEffect(() => {
    initMagneticHover();
  }, []);

  // nav links data
  const navLinks = [
    { id: "home", label: "Home", href: "/" },
    { id: "work", label: "Work", href: "/#work" },
    { id: "tech-stack", label: "Tech Stack", href: "#tech-stack" },
    { id: "about", label: "About", href: "/#about" },
    { id: "testimonials", label: "Testimonials", href: "/#testimonials" },
    { id: "connect", label: "Connect", href: "/contact" },
  ];

  // Toggle menu
  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsAnimating(true); // show for open
      setIsMenuOpen(true);
    } else {
      // close with animation
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(true),
      });

      tl.set(".mobile-menu", { pointerEvents: "auto" });

      tl.fromTo(
        ".mobile-menu",
        { clipPath: "ellipse(0% 100% at 100% 50%)" },
        {
          clipPath: "ellipse(150% 100% at 100% 50%)",
          duration: 1.4,
          ease: "power3.out",
        }
      );

      tl.fromTo(
        ".mobile-menu .nav-link",
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=1"
      );
      // socials in
      tl.from(
        ".mobile-menu .social-links li",
        {
          y: -20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.inOut",
        },
        "-=0.6"
      );
    } else if (isAnimating) {
      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false), // hide only after anim completes
      });

      tl.to(".mobile-menu .nav-link", {
        x: 40,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power3.in",
      });

      tl.to(
        ".mobile-menu .social-links li",
        {
          y: -20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power3.in",
        },
        "<"
      );

      tl.to(
        ".mobile-menu",
        {
          clipPath: "ellipse(0% 100% at 100% 50%)",
          duration: 1.4,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(".mobile-menu", { pointerEvents: "none" });
          },
        },
        "-=0.4"
      );
    }
  }, [isMenuOpen]);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 50 && lastScroll <= 50) {
        // shrink
        gsap.to(headerRef.current, {
          paddingTop: "0.50rem", // py-2
          paddingBottom: "0.50rem",
          duration: 0.6,
          ease: "power2.out",
        });
      } else if (currentScroll <= 50 && lastScroll > 50) {
        // expand back
        gsap.to(headerRef.current, {
          paddingTop: "1.2rem", // py-4
          paddingBottom: "1.2rem",
          duration: 0.6,
          ease: "power2.out",
          
        });
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="w-full navbar text-dark sticky py-4 top-0 z-[9]"
      >
        <nav className="flex justify-between items-center container-fluid">
          {/* Brand Name */}
          <Logo />

          {/* Desktop Menu */}
          <ul className="hidden  gap-6 items-center font-primary">
            {navLinks.map((link) => (
              <li key={link.id}>
                <TransitionLink
                  href={link.href}
                  label={link.label}
                  onClick={() => setActiveLink(link.id)}
                  className={`nav-link relative overflow-hidden inline-block ${
                    activeLink === link.id ? "uppercase" : ""
                  }`}
                >
                  <span className="block">{link.label}</span>
                  <span className="block absolute top-full left-0 text-yellow-400">
                    {link.label}
                  </span>
                </TransitionLink>
              </li>
            ))}
          </ul>

          <div className="flex item-center gap-4">
            <div className="hidden sm:block">
              <TransitionLink label="Connect" href="contact" className="main-btn magnetic-hover">
                Connect
              </TransitionLink>
            </div>
            {/* Mobile Menu Button */}
            <button
              className=" text-xs md:text-md bg-gray-500 px-2 sm:py-0 py-2 border-2 border-amber-200  rounded-full text-white focus:outline-none z-99 cursor-pointer magnetic-hover"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {" "}
              Menu
              <IconMenu3
                size={18}
                stroke={2}
                className="inline ms-1 md:hidden"
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Theme Toggle Button */}
      <ThemeToggle />
      {/* scroll to top button */}
      <ScrollToTop />

      {/* Mobile Menu */}
      {(isMenuOpen || isAnimating) && (
        <div className="fixed bg-primary text-text top-0 right-0 h-screen w-full sm:w-2/4 md:w-3/4 lg:w-2/6 p-4 flex flex-col gap-4 font-primary z-[99] mobile-menu justify-between shadow-gray-500 shadow-2xl">
          <div className="flex justify-between items-center py-3 border-b border-gray-400">
            <p className="uppercase text-text-muted">Navigation</p>
            <button
              className="focus:outline-none"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <IconX size={30} className=" cursor-pointer" />
            </button>
          </div>

          {/* Mobile Nav Links */}
          <div className="py-6 lg:py-12 flex flex-col gap-4 flex-1">
            {navLinks.map((link) => (
              <div
                key={link.id}
                className={`text-2xl flex justify-between items-center py-2 ${
                  activeLink === link.id &&
                  "border-b border-dashed border-current"
                }`}
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Link
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.id);
                    toggleMenu();
                  }}
                  className={`nav-link block ${
                    activeLink === link.id ? "font-bold uppercase" : "text-text"
                  }`}
                >
                  {link.label}
                </Link>
                {(hoveredLink === link.id || activeLink === link.id) && (
                  <IconCircleFilled size={10} className="text-amber-400" />
                )}
              </div>
            ))}
          </div>

          {/* Socials */}
          <div className="text-sm border-t-1 text-text-muted mb-30">
            <p className="text-text-muted my-3">SOCIALS</p>
            <ul className="flex justify-start gap-4 items-center social-links">
              <li>
                <Link
                  href="https://www.linkedin.com/in/hardik-kumar-patel-564798227"
                  target="_blank"
                  className="font-bold text-text border-b border-current"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/hardikpatel-dev"
                  target="_blank"
                  className="font-bold text-text border-b border-current"
                >
                  Github
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
