"use client";
import { useEffect } from "react";

const ORIGINAL_TITLE = "Hardik Patel | FrontEnd Developer & Web Designer";
const AWAY_TITLE = "👋Hey, Glad You're Here";

export default function TitleChanger() {
  useEffect(() => {
    const onVisibilityChange = () => {
      document.title = document.hidden ? AWAY_TITLE : ORIGINAL_TITLE;
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.title = ORIGINAL_TITLE;
    };
  }, []);

  return null;
}
