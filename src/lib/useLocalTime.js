import { useEffect, useState } from "react";

export default function useLocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        // second: "2-digit",
        hour12: true,
        timeZoneName: "shortOffset",
      };
      setTime(now.toLocaleTimeString([], options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}
