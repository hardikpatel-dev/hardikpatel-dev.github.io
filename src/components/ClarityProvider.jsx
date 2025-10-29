// components/ClarityProvider.jsx
"use client";
import { useEffect } from "react";
import clarity from "@microsoft/clarity";

export default function ClarityProvider() {
  useEffect(() => {
    clarity.init("twtluvv34d");
  }, []);

  return null;
}
