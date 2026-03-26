"use client";
import { useEffect } from "react";
import { animateWorkTiles } from "@/lib/gsapLib";

export default function InitGsapAnimations() {
  useEffect(() => {
    animateWorkTiles(); // 👈 ab ye call ho jayega
  }, []);

  return null;
}
