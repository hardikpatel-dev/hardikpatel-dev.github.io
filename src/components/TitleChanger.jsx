"use client";
import { useEffect } from "react";

export default function TitleChanger() {
  useEffect(() => {
    let toggle = true;
    const interval = setInterval(() => {
      document.title = toggle
        ? "👋Hey, Glad You’re Here"
        : "Hardik Patel | FrontEnd Developer & Web Designer";
      toggle = !toggle;
    }, 2000); // har 2 sec me change hoga

    return () => clearInterval(interval);
  }, []);

  return null;
}
