"use client";
import { useEffect } from "react";

export default function TitleChanger() {
  useEffect(() => {
    let toggle = true;
    let interval = null;

    const tick = () => {
      document.title = toggle
        ? "👋Hey, Glad You’re Here"
        : "Hardik Patel | FrontEnd Developer & Web Designer";
      toggle = !toggle;
    };

    const start = () => {
      if (interval || document.hidden) return;
      interval = setInterval(tick, 10000);
    };

    const stop = () => {
      if (!interval) return;
      clearInterval(interval);
      interval = null;
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        tick();
        start();
      }
    };

    tick();
    start();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return null;
}
