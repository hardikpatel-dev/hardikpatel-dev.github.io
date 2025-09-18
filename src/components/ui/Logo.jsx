
import { IconCircleFilled } from "@tabler/icons-react";
import TransitionLink from "../TranstionLinks";

export default function Logo() {
  return (
    <TransitionLink
      href="/"
      className=" flex items-center justify-center gap-2 logo"
    >
      <video
        src="/assets/emoji.webm"
        autoPlay
        loop
        muted
        preload="metadata"
        poster="@src/app/favicon.ico"
        playsInline
        className="w-12 h-12 rounded-xl object-cover shadow-[0_4px_20px_-8px_var(--shadow-color)] magnetic-hover"
      />{" "}
      <div className="flex flex-col gap-1">
        <span className="text-xs tracking-wide font-whyte uppercase font-extrabold leading-none">
          Hardik Patel
        </span>
        <span className=" text-[10px] text-text leading-none font-primary  flex items-center justify-start gap-1">
          <b className="text-text">Open to</b> Work{" "}
          <IconCircleFilled
            size={10}
            stroke={1}
            className="text-green-600 animate-pulse"
          />
        </span>
      </div>
    </TransitionLink>
  );
}
