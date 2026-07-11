import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const NAV = [
  { n: "01", label: "Index", to: "/", hash: "" },
  { n: "02", label: "Studio", to: "/#studio", hash: "#studio" },
  { n: "03", label: "Services", to: "/#services", hash: "#services" },
  { n: "04", label: "Contact", to: "/#contact", hash: "#contact" },
];

export const Header = () => {
  const { pathname } = useLocation();
  return (
    <header data-testid="site-header" className="sticky top-0 z-50 border-b ed-line" style={{ background: "rgba(239,234,224,0.92)", backdropFilter: "blur(12px)" }}>
      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" data-testid="header-logo" className="flex items-center gap-3">
          <span className="relative w-9 h-9 rounded-full bg-[var(--ink)] text-white font-display font-bold flex items-center justify-center text-lg">
            E<span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
          </span>
          <span className="leading-tight">
            <span className="block font-display font-bold text-lg">EDND Services</span>
            <span className="block mono-label text-[9px] text-[var(--ink-soft)]">Manpower · Est. 2018</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.n}
              href={item.to}
              data-testid={`nav-${item.label.toLowerCase()}`}
              className="text-sm font-medium hover:text-[var(--accent)] transition-colors"
            >
              <span className={`mono-label text-[9px] mr-1.5 ${item.n === "01" && pathname === "/" ? "text-[var(--accent)]" : "text-[var(--ink-soft)]"}`}>{item.n}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <span className="hidden lg:block mono-label text-[var(--ink-soft)]">Mumbai — IN</span>
          <Link
            to="/request-staff"
            data-testid="header-request-staff-btn"
            className="btn-outline-ed rounded-full px-5 py-2.5 text-sm font-semibold flex items-center gap-2 bg-transparent"
          >
            Request Staff <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </header>
  );
};
