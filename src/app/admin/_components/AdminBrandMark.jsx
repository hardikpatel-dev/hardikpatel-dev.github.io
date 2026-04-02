"use client";

export default function AdminBrandMark({ className = "", size = "md" }) {
  const sizeClasses = {
    sm: "h-10 w-10 rounded-xl",
    md: "h-12 w-12 rounded-xl",
    lg: "h-14 w-14 rounded-[1rem]",
  };

  return (
    <div
      className={`${sizeClasses[size] || sizeClasses.md} overflow-hidden bg-[#181818] p-[2px] shadow-[0_14px_34px_rgba(0,0,0,0.34),0_0_0_1px_rgba(255,255,255,0.06),0_0_20px_rgba(255,255,255,0.12)] ${className}`}
    >
      <video
        src="/assets/emoji.webm"
        autoPlay
        loop
        muted
        preload="metadata"
        poster="/favicon.ico"
        playsInline
        className="h-full w-full rounded-[calc(0.75rem-2px)] object-cover"
      />
    </div>
  );
}
