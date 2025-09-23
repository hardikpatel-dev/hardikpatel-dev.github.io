"use client";
import { useLayoutEffect } from "react";
import { animateWorkTiles } from "@/lib/gsapLib";

export default function InitGsapAnimations() {
  useLayoutEffect(() => {
    animateWorkTiles(); // 👈 ab ye call ho jayega
  }, []);

  return null;
}
