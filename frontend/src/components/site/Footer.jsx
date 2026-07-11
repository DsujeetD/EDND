import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { CONTACT } from "../../data";

const HireMarquee = () => (
  <div data-testid="hire-marquee" className="bg-[var(--ink)] border-b border-white/10 py-6 overflow-hidden">
    <div className="ed-marquee-track" style={{ animationDuration: "22s" }}>
      {[0, 1].map((k) => (
        <div key={k} className="flex items-center shrink-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={`${k}-${i}`} className="flex items-baseline whitespace-nowrap">
              <span className="font-display font-bold text-white text-4xl sm:text-5xl px-4">Available Now</span>
              <span className="font-display italic text-[var(--accent)] text-4xl sm:text-5xl">for hire</span>
              <span className="text-white/50 text-3xl px-4">·</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const SITEMAP = [
  { label: "Index", href: "/" },
  { label: "Studio", href: "/#studio" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];
const SOCIAL = ["Instagram", "LinkedIn", "WhatsApp", "X / Twitter"];

export const Footer = () => (
  <footer data-testid="site-footer">
    <HireMarquee />
    <div className="bg-[var(--ink)] text-white">
      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          <div className="lg:col-span-5">
            <p className="mono-label text-white/50 mb-5">§ Get in touch</p>
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight mb-6">
              Let's staff <em className="font-display italic font-semibold text-[var(--accent)]">your next</em>
              <br />
              project.
            </h3>
            <a data-testid="footer-email-link" href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-sm hover:text-[var(--accent)] transition-colors mb-2">
              {CONTACT.email} <ArrowUpRight size={13} />
            </a>
            <a data-testid="footer-phone-link" href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="text-sm text-white/60 hover:text-[var(--accent)] transition-colors">
              {CONTACT.phone}
            </a>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <p className="mono-label text-white/50 mb-5">Sitemap</p>
            <ul className="space-y-2.5 text-sm">
              {SITEMAP.map((l) => (
                <li key={l.label}>
                  <a href={l.href} data-testid={`footer-link-${l.label.toLowerCase()}`} className="text-white/80 hover:text-[var(--accent)] transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="mono-label text-white/50 mb-5">Social</p>
            <ul className="space-y-2.5 text-sm">
              {SOCIAL.map((s) => (
                <li key={s} className="text-white/80 hover:text-[var(--accent)] transition-colors cursor-pointer">{s}</li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="mono-label text-white/50 mb-5">Office</p>
            <p className="text-sm text-white/80 leading-relaxed">
              {CONTACT.address.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </p>
            <p className="mono-label text-white/50 mt-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" /> Open · Mon—Sat · 9—7
            </p>
          </div>
        </div>

        <h2 className="font-display font-extrabold text-[26vw] lg:text-[20vw] leading-[0.85] tracking-tight text-white select-none pt-10 -mb-4 lg:-mb-8">
          EDND
        </h2>

        <div className="flex flex-col sm:flex-row justify-between gap-2 pt-8 mono-label text-white/40">
          <span>© 2026 EDND Services · Manpower · Est. 2018</span>
          <Link to="/admin" data-testid="footer-admin-link" className="hover:text-white/70 transition-colors">Admin</Link>
          <span>Navi Mumbai — India</span>
        </div>
      </div>
    </div>
  </footer>
);
