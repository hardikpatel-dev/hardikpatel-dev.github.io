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

    const getMsToNextMinute = () => {
      const now = new Date();
      return (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    };

    updateTime();

    let minuteInterval = null;
    const timeout = setTimeout(() => {
      updateTime();
      minuteInterval = setInterval(updateTime, 60000);
    }, getMsToNextMinute());

    return () => {
      clearTimeout(timeout);
      if (minuteInterval) clearInterval(minuteInterval);
    };
  }, []);

  return time;
}
