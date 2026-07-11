import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SERVICES } from "../../data";

export const DeployList = () => (
  <section id="services" data-testid="services-section" className="max-w-[1520px] mx-auto px-5 sm:px-8 py-24">
    <p className="mono-label text-[var(--ink-soft)] mb-6">§ 02 — Services</p>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
      <h2 className="lg:col-span-7 font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight">
        What we <em className="font-display italic font-semibold text-[var(--accent)]">deploy</em>.
      </h2>
      <p className="lg:col-span-4 lg:col-start-9 text-sm text-[var(--ink-soft)] leading-relaxed">
        Eight core disciplines. One dedicated coordinator.
        <br />
        Trained staff, uniformed, on-time, on-brand.
      </p>
    </div>

    <div className="border-t ed-line">
      {SERVICES.map((s) => (
        <Link
          key={s.n}
          to={`/request-staff?service=${encodeURIComponent(s.title)}`}
          data-testid={`service-row-${s.n}`}
          className="group grid grid-cols-12 items-center gap-4 py-7 border-b ed-line transition-colors duration-300 hover:bg-[var(--ink)] hover:text-white px-2 sm:px-4"
        >
          <span className="col-span-2 sm:col-span-1 mono-label text-[var(--ink-soft)] group-hover:text-[var(--accent)]">{s.n}</span>
          <h3 className="col-span-10 sm:col-span-4 font-display font-bold text-2xl sm:text-3xl lg:text-4xl">{s.title}</h3>
          <p className="col-span-10 col-start-3 sm:col-span-5 sm:col-start-6 text-sm text-[var(--ink-soft)] group-hover:text-white/70">{s.desc}</p>
          <span className="col-span-2 justify-self-end mono-label flex items-center gap-2 group-hover:text-white">
            Book <ArrowUpRight size={13} className="group-hover:hidden" /><ArrowRight size={13} className="hidden group-hover:block" />
          </span>
        </Link>
      ))}
    </div>
  </section>
);
