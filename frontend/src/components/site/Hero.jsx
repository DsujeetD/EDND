import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export const Hero = () => (
  <section className="max-w-[1520px] mx-auto px-5 sm:px-8 pt-8 pb-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
    <div className="lg:col-span-7 ed-rise">
      <h1 data-testid="hero-headline" className="font-display font-extrabold leading-[0.95] tracking-tight text-[13vw] sm:text-[9vw] lg:text-[7.2vw]">
        Human<em className="not-italic font-display italic text-[var(--accent)]">power</em>,
        <br />
        engineered
        <br />
        for the <em className="font-display italic font-semibold">stage</em>.
      </h1>
    </div>
    <div className="lg:col-span-4 lg:col-start-9 ed-rise ed-rise-2">
      <p className="mono-label text-[var(--ink-soft)] mb-4">Manifesto</p>
      <p data-testid="hero-manifesto" className="text-base text-[var(--ink-soft)] leading-relaxed mb-8">
        A staffing studio for events, exhibitions, surveys and brand activations. We handpick, train and deploy — so
        your project runs like it was rehearsed a hundred times.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Link to="/request-staff" data-testid="hero-book-team-btn" className="btn-ink rounded-full pl-6 pr-2 py-2 text-sm font-semibold flex items-center gap-3">
          Book a team
          <span className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center">
            <ArrowUpRight size={15} />
          </span>
        </Link>
        <a href="#services" data-testid="hero-browse-services-btn" className="btn-outline-ed rounded-full px-6 py-3 text-sm font-semibold flex items-center gap-2">
          Browse services <ArrowDownRight size={15} />
        </a>
      </div>
    </div>
  </section>
);
