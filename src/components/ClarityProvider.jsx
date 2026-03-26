// components/ClarityProvider.jsx
"use client";
import { useEffect } from "react";
import clarity from "@microsoft/clarity";

export default function ClarityProvider() {
  useEffect(() => {
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
    if (clarityId) {
      clarity.init(clarityId);
    }
  }, []);

  return null;
}
