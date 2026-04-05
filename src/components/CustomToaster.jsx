"use client";

import { Toaster } from "sonner";

/**
 * CustomToaster — Clean white toast with colored icons only.
 * No colored backgrounds — pure white bg with subtle border/shadow.
 */
export default function CustomToaster() {
  return (
    <Toaster
      position="top-right"
      theme="light"
      expand
      closeButton
      visibleToasts={5}
      gap={8}
      duration={4000}
      offset={20}
      toastOptions={{
        style: {
          fontFamily: "var(--font-primary)",
          fontSize: "14px",
          fontWeight: 500,
          borderRadius: "12px",
          padding: "14px 16px",
          gap: "12px",
          alignItems: "center",
          background: "#ffffff",
          color: "#1a1a1a",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)",
          minWidth: "320px",
          maxWidth: "420px",
        },
      }}
    />
  );
}
