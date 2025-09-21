"use client";
import { useLayoutEffect } from "react";
import {  animateButtons, animateWorkTiles } from "@/lib/gsapLib";

export default function InitGsapAnimations() {
  useLayoutEffect(() => {
    animateButtons();
    animateWorkTiles(); // 👈 ab ye call ho jayega
  }, []);

  return null;
}
