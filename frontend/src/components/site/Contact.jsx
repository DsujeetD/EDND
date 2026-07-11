import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { CONTACT } from "../../data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const CTABlock = () => (
  <section className="max-w-[1520px] mx-auto px-5 sm:px-8 py-20">
    <div data-testid="cta-block" className="bg-[var(--ink)] text-white p-10 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-6">
        <p className="mono-label text-white/50 mb-5">§ 06 — Get started</p>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl leading-tight">
          Your event.
          <br />
          Our <em className="font-display italic font-semibold text-[var(--accent)]">people.</em>
        </h2>
      </div>
      <div className="lg:col-span-5 lg:col-start-8">
        <p className="text-sm text-white/70 leading-relaxed mb-7">
          Tell us the dates, the vibe, the headcount — we'll do the rest. Response inside 24 hours, always.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/request-staff" data-testid="cta-request-staff-btn" className="bg-[var(--accent)] text-white rounded-full px-6 py-3 text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity">
            Request Staff <ArrowUpRight size={15} />
          </Link>
          <a href="#contact" data-testid="cta-say-hello-btn" className="border border-white/25 rounded-full px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors">
            Say hello
          </a>
        </div>
      </div>
    </div>
  </section>
);

const inputCls =
  "w-full bg-transparent border-b ed-line py-3 text-base focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--ink-soft)]/60";

export const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill name, email and message.");
      return;
    }
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent. We'll reply within 24 hours.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Could not send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="max-w-[1520px] mx-auto px-5 sm:px-8 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5">
        <p className="mono-label text-[var(--ink-soft)] mb-6">§ 07 — Contact</p>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight leading-tight mb-6">
          Let's staff <em className="font-display italic font-semibold text-[var(--accent)]">your next</em>
          <br />
          project.
        </h2>
        <div className="space-y-3 text-sm">
          <a data-testid="contact-email-link" href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors">
            {CONTACT.email} <ArrowUpRight size={13} />
          </a>
          <a data-testid="contact-phone-link" href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="block text-[var(--ink-soft)] hover:text-[var(--accent)] transition-colors">
            {CONTACT.phone}
          </a>
        </div>
      </div>

      <form onSubmit={submit} data-testid="contact-form" className="lg:col-span-6 lg:col-start-7 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input data-testid="contact-name-input" className={inputCls} placeholder="Your name *" value={form.name} onChange={set("name")} />
          <input data-testid="contact-email-input" className={inputCls} type="email" placeholder="Email *" value={form.email} onChange={set("email")} />
        </div>
        <input data-testid="contact-phone-input" className={inputCls} placeholder="Phone" value={form.phone} onChange={set("phone")} />
        <textarea data-testid="contact-message-input" className={inputCls} rows={4} placeholder="Tell us about your event or requirement *" value={form.message} onChange={set("message")} />
        <button data-testid="contact-submit-btn" disabled={sending} className="btn-ink rounded-full px-8 py-3.5 text-sm font-semibold flex items-center gap-2 disabled:opacity-60">
          {sending ? "Sending…" : "Send message"} <ArrowUpRight size={15} />
        </button>
      </form>
    </section>
  );
};
