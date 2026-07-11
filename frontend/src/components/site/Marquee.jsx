import { MARQUEE_WORDS } from "../../data";

export const Marquee = () => (
  <div data-testid="marquee-band" className="bg-[var(--ink)] py-8 overflow-hidden">
    <div className="ed-marquee-track">
      {[0, 1].map((k) => (
        <div key={k} className="flex items-center shrink-0">
          {MARQUEE_WORDS.map((w) => (
            <span key={`${k}-${w}`} className="flex items-center">
              <span className="font-display font-bold text-white text-5xl sm:text-7xl px-8">{w}</span>
              <span className="font-display italic text-[var(--accent)] text-5xl sm:text-7xl">/</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);
