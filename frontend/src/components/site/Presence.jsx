import { PRESENCE } from "../../data";

export const Presence = () => (
  <section id="studio" data-testid="presence-section" className="max-w-[1520px] mx-auto px-5 sm:px-8 py-24">
    <p className="mono-label text-[var(--ink-soft)] mb-6">§ 03 — Presence</p>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
      <h2 className="lg:col-span-6 font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.02]">
        On the ground,
        <br />
        <em className="font-display italic font-semibold text-[var(--accent)]">everywhere.</em>
      </h2>
      <p className="lg:col-span-4 lg:col-start-8 text-sm text-[var(--ink-soft)] leading-relaxed">
        Headquartered in Belapur. Trained squads on standby across nine Indian metros — deploy within 48 hours.
      </p>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {PRESENCE.map((c) => (
        <div key={c.n} data-testid={`presence-card-${c.n}`} className="group relative overflow-hidden rounded-sm h-[260px] sm:h-[380px]">
          <img
            src={c.img}
            alt={c.city}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          <span className="absolute top-4 left-4 mono-label text-white/80">{c.n}</span>
          <div className="absolute bottom-4 left-4">
            <h3 className="font-display font-bold text-white text-2xl sm:text-3xl">{c.city}</h3>
            <p className="mono-label text-white/80 flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" /> Squad ready
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);
