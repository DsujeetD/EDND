import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowUpRight, ArrowLeft, ArrowRight, Minus, Plus, Check } from "lucide-react";
import { toast } from "sonner";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";
import { SERVICES, CITIES } from "../data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const STEPS = ["Service", "City", "Quantity", "Date", "Submit"];

const inputCls =
  "w-full bg-transparent border-b ed-line py-3 text-base focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--ink-soft)]/60";

export default function RequestStaff() {
  const [params] = useSearchParams();
  const preset = params.get("service");
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    service: preset && SERVICES.some((s) => s.title === preset) ? preset : "",
    city: "",
    quantity: 5,
    date: "",
    name: "",
    phone: "",
    email: "",
    brief: "",
  });

  const canNext = () => {
    if (step === 0) return !!form.service;
    if (step === 1) return !!form.city;
    if (step === 2) return form.quantity > 0;
    if (step === 3) return !!form.date;
    return form.name.trim() && form.phone.trim();
  };

  const submit = async () => {
    setSending(true);
    try {
      await axios.post(`${API}/staff-requests`, { ...form, quantity: Number(form.quantity) });
      setDone(true);
    } catch {
      toast.error("Could not submit. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div data-testid="request-staff-page">
      <Header />
      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-6 ed-rise">
            <p className="mono-label text-[var(--accent)] mb-5">§ Staff request</p>
            <h1 data-testid="wizard-headline" className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight leading-[1.02] mb-5">
              Get a staff estimate
              <br />
              in <em className="font-display italic font-semibold text-[var(--accent)]">30 seconds.</em>
            </h1>
            <p className="text-sm text-[var(--ink-soft)] leading-relaxed max-w-md">
              A guided request experience for quick manpower planning. Select the basics and our team will take it from there.
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 bg-[var(--ink)] text-white p-8 ed-rise ed-rise-2 self-start">
            <h3 className="font-display font-bold text-2xl mb-4">What happens next?</h3>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              We review your requirement, confirm availability, share pricing and prepare the right trained team for your location.
            </p>
            <p className="mono-label text-[var(--accent)]">Fast · Simple · 24h response</p>
          </div>
        </div>

        {done ? (
          <div data-testid="wizard-success" className="card-cream p-12 text-center max-w-2xl mx-auto">
            <span className="w-14 h-14 rounded-full bg-[var(--accent)] text-white flex items-center justify-center mx-auto mb-6">
              <Check size={26} />
            </span>
            <h2 className="font-display font-extrabold text-4xl mb-3">Request received.</h2>
            <p className="text-sm text-[var(--ink-soft)] mb-8">
              {form.quantity} × {form.service} in {form.city} on {form.date}. Our coordinator will call {form.phone} within 24 hours.
            </p>
            <Link to="/" data-testid="wizard-back-home-btn" className="btn-ink rounded-full px-7 py-3 text-sm font-semibold inline-flex items-center gap-2">
              Back to index <ArrowUpRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-2 mb-10">
                {STEPS.map((s, i) => (
                  <button
                    key={s}
                    data-testid={`wizard-step-tab-${i + 1}`}
                    onClick={() => i < step && setStep(i)}
                    className={`mono-label px-4 py-3 border transition-colors ${
                      i === step
                        ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                        : i < step
                        ? "bg-[var(--ink)] text-white border-[var(--ink)]"
                        : "border-[var(--line)] text-[var(--ink-soft)]"
                    }`}
                  >
                    {i + 1} {s}
                  </button>
                ))}
              </div>

              {step === 0 && (
                <div data-testid="wizard-step-service" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((s) => (
                    <button
                      key={s.n}
                      data-testid={`wizard-service-${s.n}`}
                      onClick={() => setForm({ ...form, service: s.title })}
                      className={`text-left p-5 border transition-colors ${
                        form.service === s.title ? "bg-[var(--ink)] text-white border-[var(--ink)]" : "border-[var(--line)] hover:border-[var(--ink)]"
                      }`}
                    >
                      <span className={`mono-label ${form.service === s.title ? "text-[var(--accent)]" : "text-[var(--ink-soft)]"}`}>{s.n}</span>
                      <span className="block font-display font-bold text-xl mt-1">{s.title}</span>
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div data-testid="wizard-step-city" className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      data-testid={`wizard-city-${c.replace(/\s/g, "-").toLowerCase()}`}
                      onClick={() => setForm({ ...form, city: c })}
                      className={`p-5 border font-display font-bold text-lg transition-colors ${
                        form.city === c ? "bg-[var(--ink)] text-white border-[var(--ink)]" : "border-[var(--line)] hover:border-[var(--ink)]"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div data-testid="wizard-step-quantity" className="card-cream p-10 flex flex-col items-center gap-6">
                  <p className="mono-label text-[var(--ink-soft)]">How many staff do you need?</p>
                  <div className="flex items-center gap-8">
                    <button
                      data-testid="wizard-qty-minus"
                      onClick={() => setForm({ ...form, quantity: Math.max(1, form.quantity - 1) })}
                      className="w-12 h-12 rounded-full border ed-line flex items-center justify-center hover:border-[var(--ink)] transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span data-testid="wizard-qty-value" className="font-display font-extrabold text-7xl w-32 text-center">{form.quantity}</span>
                    <button
                      data-testid="wizard-qty-plus"
                      onClick={() => setForm({ ...form, quantity: Math.min(500, form.quantity + 1) })}
                      className="w-12 h-12 rounded-full border ed-line flex items-center justify-center hover:border-[var(--ink)] transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    {[5, 10, 25, 50, 100].map((q) => (
                      <button key={q} data-testid={`wizard-qty-preset-${q}`} onClick={() => setForm({ ...form, quantity: q })} className="mono-label border ed-line rounded-full px-4 py-2 hover:border-[var(--ink)] transition-colors">
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div data-testid="wizard-step-date" className="card-cream p-10">
                  <p className="mono-label text-[var(--ink-soft)] mb-6">When does the project start?</p>
                  <input
                    data-testid="wizard-date-input"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="bg-transparent border-b ed-line py-3 text-2xl font-display font-bold focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
              )}

              {step === 4 && (
                <div data-testid="wizard-step-submit" className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input data-testid="wizard-name-input" className={inputCls} placeholder="Your name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <input data-testid="wizard-phone-input" className={inputCls} placeholder="Phone *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <input data-testid="wizard-email-input" className={inputCls} type="email" placeholder="Email (optional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <textarea data-testid="wizard-brief-input" className={inputCls} rows={4} placeholder="Tell us about timing, role, uniform or reporting needs" value={form.brief} onChange={(e) => setForm({ ...form, brief: e.target.value })} />
                </div>
              )}

              <div className="flex items-center justify-between mt-10">
                <button
                  data-testid="wizard-back-btn"
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="mono-label flex items-center gap-2 disabled:opacity-30 hover:text-[var(--accent)] transition-colors"
                >
                  <ArrowLeft size={13} /> Back
                </button>
                {step < 4 ? (
                  <button
                    data-testid="wizard-next-btn"
                    onClick={() => setStep(step + 1)}
                    disabled={!canNext()}
                    className="btn-ink rounded-full px-7 py-3 text-sm font-semibold flex items-center gap-2 disabled:opacity-40"
                  >
                    Continue <ArrowRight size={15} />
                  </button>
                ) : (
                  <button
                    data-testid="wizard-submit-btn"
                    onClick={submit}
                    disabled={!canNext() || sending}
                    className="bg-[var(--accent)] text-white rounded-full px-8 py-3.5 text-sm font-semibold flex items-center gap-2 disabled:opacity-40 hover:opacity-90 transition-opacity"
                  >
                    {sending ? "Submitting…" : "Submit request"} <ArrowUpRight size={15} />
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <div data-testid="wizard-summary" className="bg-[var(--ink)] text-white p-8 sticky top-24">
                <h3 className="font-display font-bold text-2xl mb-6">Your request includes</h3>
                <dl className="space-y-4 text-sm">
                  {[
                    ["Service", form.service || "—"],
                    ["City", form.city || "—"],
                    ["Quantity", form.quantity ? `${form.quantity} staff` : "—"],
                    ["Start date", form.date || "—"],
                    ["Contact", form.name || "—"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-white/10 pb-3">
                      <dt className="mono-label text-white/50">{k}</dt>
                      <dd data-testid={`summary-${k.toLowerCase().replace(/\s/g, "-")}`} className="text-right font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mono-label text-[var(--accent)] mt-6">No payment · No commitment</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
