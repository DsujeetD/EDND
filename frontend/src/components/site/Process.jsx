import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PROCESS, CLIENTS } from "../../data";

export const Process = () => (
  <section data-testid="process-section" className="max-w-[1520px] mx-auto px-5 sm:px-8 py-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
    <div className="lg:col-span-4">
      <p className="mono-label text-[var(--ink-soft)] mb-6">§ 04 — Process</p>
      <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight leading-tight mb-4">
        Three moves.
        <br />
        <em className="font-display italic font-semibold text-[var(--accent)]">One team.</em>
      </h2>
      <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-6">
        No layers. No fluff. From brief to boots-on-ground in under a week.
      </p>
      <Link to="/request-staff" data-testid="process-start-brief-link" className="mono-label inline-flex items-center gap-2 hover:text-[var(--accent)] transition-colors">
        Start a brief <ArrowUpRight size={13} />
      </Link>
    </div>

    <div className="lg:col-span-7 lg:col-start-6 space-y-4">
      {PROCESS.map((p) => (
        <div key={p.n} data-testid={`process-step-${p.n}`} className="card-cream p-7 flex gap-6 items-start">
          <span className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--accent)]">{p.n}</span>
          <div>
            <h3 className="font-display font-bold text-2xl mb-1.5">{p.title}</h3>
            <p className="text-sm text-[var(--ink-soft)] mb-4">{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="mono-label text-[9px] border ed-line rounded-full px-3 py-1.5">{t}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export const ClientsMarquee = () => (
  <section data-testid="clients-marquee" className="border-t border-b ed-line py-10 overflow-hidden relative">
    <div className="max-w-[1520px] mx-auto px-5 sm:px-8 flex justify-between mono-label text-[var(--ink-soft)] mb-8">
      <span>§ 05 — Trusted by</span>
      <span>50+ clients</span>
    </div>
    <div className="ed-marquee-track" style={{ animationDuration: "40s" }}>
      {[0, 1].map((k) => (
        <div key={k} className="flex items-center shrink-0">
          {CLIENTS.map((c) => (
            <span key={`${k}-${c}`} className="flex items-center">
              <span className="font-display font-bold text-3xl sm:text-4xl text-[var(--ink-soft)] px-10">{c}</span>
              <span className="text-[var(--accent)] text-3xl">✱</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </section>
);
