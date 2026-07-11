import { useEffect, useState } from "react";

export const Ticker = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false });
      setTime(t);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div data-testid="ticker-bar" className="max-w-[1520px] mx-auto px-5 sm:px-8 py-4 flex items-center justify-between mono-label text-[var(--ink-soft)]">
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" /> Live · Booking Q3 2025
      </span>
      <span className="hidden sm:block" data-testid="ticker-clock">Navi Mumbai · {time} IST</span>
      <span>Ed. 07 / Vol. II</span>
    </div>
  );
};
