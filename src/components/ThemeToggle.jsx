"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
    
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setIsDark(newTheme === "dark");
  };

  return (
    <div className="w-[60px] h-[46px] fixed -right-2 z-[1000] bottom-20 ">
      <label
        className={`relative w-full h-full rounded-l-full rounded-r-0 cursor-pointer overflow-hidden block border ${
          isDark ? "border-black/10" : "border-white/10"
        } shadow-md`}
        aria-label={isDark ? "Switch To Day" : "Switch To Night"}
        title={isDark ? "Switch To Day" : "Switch To Night"}
      >
        {/* Hidden Checkbox */}
        <input
          type="checkbox"
          checked={isDark}
          onChange={toggleTheme}
          className="hidden"
        />

        {/* Background */}
        <span
          className={`absolute w-full h-full  transition-colors duration-500 
            ${
              isDark
                ? "bg-gradient-to-br from-[#e5d0ff] to-[#220041] "
                : "bg-yellow-300"
            }
          `}
        ></span>

        {/* Icon (fixed center) */}
        <span
          className={`text-shadow-md md:text-shadow-none magnetic-hover absolute inset-0 flex items-center justify-center text-3xl transition-transform duration-500
            ${isDark ? "rotate-360" : "rotate-0"}
          `}
        >
          {isDark ? "🌚" : "🌞"}
        </span>
      </label>
    </div>
  );
}
