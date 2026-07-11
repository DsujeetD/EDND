import { STATS } from "../../data";

export const Stats = () => (
  <section data-testid="stats-section" className="max-w-[1520px] mx-auto px-5 sm:px-8 pb-20">
    <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b ed-line divide-x ed-line" style={{ borderColor: "var(--line)" }}>
      {STATS.map((s) => (
        <div key={s.label} className="py-10 px-6" style={{ borderColor: "var(--line)" }}>
          <p className="font-display font-extrabold text-4xl sm:text-5xl mb-2">{s.value}</p>
          <p className="mono-label text-[var(--ink-soft)]">{s.label}</p>
        </div>
      ))}
    </div>
  </section>
);
