import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../components/site/Header";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Admin() {
  const [requests, setRequests] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [tab, setTab] = useState("requests");

  useEffect(() => {
    axios.get(`${API}/staff-requests`).then((r) => setRequests(r.data)).catch(() => {});
    axios.get(`${API}/contact`).then((r) => setContacts(r.data)).catch(() => {});
  }, []);

  const fmt = (iso) => new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div data-testid="admin-page">
      <Header />
      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 py-14">
        <p className="mono-label text-[var(--accent)] mb-4">§ Admin</p>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl mb-10">Submissions.</h1>

        <div className="flex gap-2 mb-8">
          <button data-testid="admin-tab-requests" onClick={() => setTab("requests")} className={`mono-label px-5 py-3 border transition-colors ${tab === "requests" ? "bg-[var(--ink)] text-white border-[var(--ink)]" : "border-[var(--line)]"}`}>
            Staff Requests ({requests.length})
          </button>
          <button data-testid="admin-tab-contacts" onClick={() => setTab("contacts")} className={`mono-label px-5 py-3 border transition-colors ${tab === "contacts" ? "bg-[var(--ink)] text-white border-[var(--ink)]" : "border-[var(--line)]"}`}>
            Enquiries ({contacts.length})
          </button>
        </div>

        {tab === "requests" ? (
          <div data-testid="admin-requests-table" className="overflow-x-auto border-t ed-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="mono-label text-[var(--ink-soft)] text-left">
                  {["When", "Name", "Phone", "Service", "City", "Qty", "Date", "Brief"].map((h) => (
                    <th key={h} className="py-4 pr-6 font-normal border-b ed-line">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r.id} className="border-b ed-line align-top">
                    <td className="py-4 pr-6 whitespace-nowrap text-[var(--ink-soft)]">{fmt(r.created_at)}</td>
                    <td className="py-4 pr-6 font-semibold">{r.name}</td>
                    <td className="py-4 pr-6">{r.phone}</td>
                    <td className="py-4 pr-6">{r.service}</td>
                    <td className="py-4 pr-6">{r.city}</td>
                    <td className="py-4 pr-6">{r.quantity}</td>
                    <td className="py-4 pr-6 whitespace-nowrap">{r.date}</td>
                    <td className="py-4 max-w-xs text-[var(--ink-soft)]">{r.brief || "—"}</td>
                  </tr>
                ))}
                {requests.length === 0 && (
                  <tr><td colSpan={8} className="py-10 text-center text-[var(--ink-soft)]">No staff requests yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div data-testid="admin-contacts-table" className="overflow-x-auto border-t ed-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="mono-label text-[var(--ink-soft)] text-left">
                  {["When", "Name", "Email", "Phone", "Message"].map((h) => (
                    <th key={h} className="py-4 pr-6 font-normal border-b ed-line">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id} className="border-b ed-line align-top">
                    <td className="py-4 pr-6 whitespace-nowrap text-[var(--ink-soft)]">{fmt(c.created_at)}</td>
                    <td className="py-4 pr-6 font-semibold">{c.name}</td>
                    <td className="py-4 pr-6">{c.email}</td>
                    <td className="py-4 pr-6">{c.phone || "—"}</td>
                    <td className="py-4 max-w-md text-[var(--ink-soft)]">{c.message}</td>
                  </tr>
                ))}
                {contacts.length === 0 && (
                  <tr><td colSpan={5} className="py-10 text-center text-[var(--ink-soft)]">No enquiries yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
