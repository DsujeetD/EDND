import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { ROSTER } from "../../data";

export const FeaturedGrid = () => {
  const [active, setActive] = useState(5);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % ROSTER.length), 4000);
    return () => clearInterval(id);
  }, []);
  const slide = ROSTER[active];

  return (
    <section className="max-w-[1520px] mx-auto px-5 sm:px-8 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div data-testid="featured-carousel" className="lg:col-span-7 relative overflow-hidden rounded-sm h-[340px] sm:h-[440px] ed-rise ed-rise-2">
        {ROSTER.map((s, i) => (
          <img
            key={s.n}
            src={s.img}
            alt={s.title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: i === active ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
        <span className="absolute top-5 left-5 mono-label text-white/90">Featured — {slide.n}</span>
        <div className="absolute bottom-6 left-6 right-6">
          <h3 data-testid="featured-title" className="font-display font-bold text-white text-3xl sm:text-5xl mb-1">{slide.title}</h3>
          <p className="text-white/80 text-sm">{slide.desc}</p>
        </div>
        <div className="absolute bottom-6 right-6 flex gap-1.5">
          {ROSTER.map((_, i) => (
            <button
              key={i}
              data-testid={`carousel-dot-${i}`}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === active ? "bg-[var(--accent)]" : "bg-white/40"}`}
              aria-label={`slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 ed-rise ed-rise-3">
        {ROSTER.map((s, i) => {
          const dark = s.n === "06";
          return (
            <Link
              key={s.n}
              to={`/request-staff?service=${encodeURIComponent(s.title)}`}
              data-testid={`roster-card-${s.n}`}
              onMouseEnter={() => setActive(i)}
              className={`card-cream p-5 flex flex-col justify-between min-h-[130px] ${dark ? "!bg-[var(--ink)] text-white" : ""}`}
            >
              <span className={`mono-label ${dark ? "text-[var(--accent)]" : "text-[var(--ink-soft)]"}`}>{s.n}</span>
              <div>
                <h4 className="font-display font-bold text-lg mb-2">{s.title}</h4>
                <span className={`mono-label flex items-center gap-1 ${dark ? "text-white/70" : "text-[var(--ink-soft)]"}`}>
                  View <Plus size={11} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
