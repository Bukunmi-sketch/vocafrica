import { useState, FormEvent } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
interface KioskFormData {
  kioskName: string;
  serialNumber: string;
  languagePack: string;
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
}

type NavItem = "dashboard" | "kiosks" | "settings";

// ── Static Data ────────────────────────────────────────────────────────────────
const PROVINCES = [
  { value: "ON", label: "Ontario" },
  { value: "QC", label: "Quebec" },
  { value: "BC", label: "British Columbia" },
  { value: "AB", label: "Alberta" },
  { value: "MB", label: "Manitoba" },
  { value: "SK", label: "Saskatchewan" },
  { value: "NS", label: "Nova Scotia" },
  { value: "NB", label: "New Brunswick" },
  { value: "NL", label: "Newfoundland and Labrador" },
  { value: "PE", label: "Prince Edward Island" },
  { value: "NT", label: "Northwest Territories" },
  { value: "NU", label: "Nunavut" },
  { value: "YT", label: "Yukon" },
];

const LANGUAGES = [
  { value: "en", label: "English (CA)" },
  { value: "fr", label: "Français (CA)" },
  { value: "zh", label: "Mandarin" },
  { value: "es", label: "Spanish" },
  { value: "pa", label: "Punjabi" },
];

// ── Inline SVG Icons ───────────────────────────────────────────────────────────
const Icons = {
  Grid: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Dashboard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  Kiosk: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <rect x="5" y="2" width="14" height="18" rx="2" opacity={0.3} />
      <rect x="7" y="4" width="10" height="7" rx="1" />
      <rect x="9" y="13" width="6" height="1.5" rx="0.75" />
      <rect x="10" y="16" width="4" height="1.5" rx="0.75" />
    </svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Logout: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Bell: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  ArrowBack: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  Storefront: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M3 9l1-6h16l1 6" />
      <path d="M3 9a2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0 2 2 2 2 0 0 0 2-2" />
      <path d="M5 21V11m14 10V11" />
      <rect x="9" y="14" width="6" height="7" rx="1" />
    </svg>
  ),
  QrCode: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="5" y="5" width="3" height="3" fill="currentColor" />
      <rect x="16" y="5" width="3" height="3" fill="currentColor" />
      <rect x="5" y="16" width="3" height="3" fill="currentColor" />
      <path d="M14 14h3v3M17 17v3h3M14 17h.01" />
    </svg>
  ),
  Translate: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M5 8h8M9 5v3M3 18l4-8 4 8M4.5 15h5" />
      <path d="M15 5l5 14M18 12h-2.5" />
    </svg>
  ),
  Location: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  ChevronDown: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  CheckCircle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Support: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth={2.5} strokeLinecap="round" />
    </svg>
  ),
};

// ── Reusable Input ─────────────────────────────────────────────────────────────
function FormInput({
  id, label, placeholder, value, onChange,
  type = "text", icon, hint, required, mono, className,
}: {
  id: string; label: string; placeholder: string; value: string;
  onChange: (v: string) => void; type?: string; icon?: React.ReactNode;
  hint?: string; required?: boolean; mono?: boolean; className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label}{required && <span className="text-[#ff8c00] ml-0.5">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
        )}
        <input
          id={id} type={type} placeholder={placeholder} value={value}
          onChange={(e) => onChange(e.target.value)} required={required}
          className={`w-full ${icon ? "pl-9" : "px-4"} pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm transition-all outline-none focus:ring-2 focus:ring-[#ff8c00]/20 focus:border-[#ff8c00] focus:bg-white placeholder:text-slate-400 ${mono ? "font-mono" : ""}`}
        />
      </div>
      {hint && <p className="mt-1.5 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

// ── Reusable Select ────────────────────────────────────────────────────────────
function FormSelect({
  id, label, value, onChange, options, placeholder, icon, className,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; placeholder?: string;
  icon?: React.ReactNode; className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">{icon}</span>
        )}
        <select
          id={id} value={value} onChange={(e) => onChange(e.target.value)}
          className={`w-full ${icon ? "pl-9" : "px-4"} pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm transition-all outline-none focus:ring-2 focus:ring-[#ff8c00]/20 focus:border-[#ff8c00] focus:bg-white appearance-none cursor-pointer ${!value ? "text-slate-400" : "text-slate-900"}`}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <Icons.ChevronDown />
        </span>
      </div>
    </div>
  );
}

// ── Location Input (compact style) ────────────────────────────────────────────
function LocationInput({
  id, label, placeholder, value, onChange, className,
}: {
  id: string; label: string; placeholder: string; value: string;
  onChange: (v: string) => void; className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      <input
        id={id} type="text" placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#ff8c00]/20 focus:border-[#ff8c00] placeholder:text-slate-300 transition-all"
      />
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function RegisterKiosk({
  onCancel,
  onSuccess,
}: {
  onCancel?: () => void;
  onSuccess?: (data: KioskFormData) => void;
}) {
  const [activeNav, setActiveNav] = useState<NavItem>("kiosks");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<KioskFormData>({
    kioskName: "",
    serialNumber: "",
    languagePack: "",
    streetAddress: "",
    city: "",
    province: "ON",
    postalCode: "",
  });

  function update(field: keyof KioskFormData) {
    return (value: string) => setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      onSuccess?.(form);
    }, 1200);
  }

  const navItems: { key: NavItem; label: string; icon: React.ReactNode }[] = [
    { key: "dashboard", label: "Dashboard", icon: <Icons.Dashboard /> },
    { key: "kiosks", label: "Kiosk Management", icon: <Icons.Kiosk /> },
    { key: "settings", label: "Settings", icon: <Icons.Settings /> },
  ];

  return (
    <div
      className="flex h-screen overflow-hidden bg-slate-50 text-slate-900"
    >
      <style>{`
        @keyframes formIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes successPop {
          0%   { transform: scale(0.85); opacity: 0; }
          60%  { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        .form-animate { animation: formIn 0.45s cubic-bezier(0.34,1.2,0.64,1) both; }
        .success-pop  { animation: successPop 0.5s cubic-bezier(0.34,1.4,0.64,1) both; }
      `}</style>


      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
      

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 flex justify-center items-start">
          {submitted ? (
            // Success State
            <div className="w-full max-w-3xl mt-8 flex flex-col items-center gap-6 success-pop">
              <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2.5} className="w-10 h-10">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Kiosk Registered!</h3>
                <p className="text-slate-500 text-sm">
                  <span className="font-semibold text-slate-700">{form.kioskName || "New Kiosk"}</span> has been successfully added to the network.
                </p>
              </div>
              <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl p-5 shadow-sm text-sm">
                {[
                  ["Kiosk Name", form.kioskName],
                  ["Serial Number", form.serialNumber],
                  ["Location", [form.streetAddress, form.city, form.province].filter(Boolean).join(", ")],
                  ["Postal Code", form.postalCode],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between py-2.5 border-b border-slate-100 last:border-0">
                    <span className="text-slate-400 font-medium">{label}</span>
                    <span className="font-semibold text-slate-800">{val || "—"}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ kioskName: "", serialNumber: "", languagePack: "", streetAddress: "", city: "", province: "ON", postalCode: "" });
                }}
                className="px-8 py-2.5 bg-[#ff8c00] text-white text-sm font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-100"
              >
                Register Another Kiosk
              </button>
            </div>
          ) : (
            // Form
            <div className="w-full max-w-3xl form-animate">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-8 pt-8 pb-6 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900">Kiosk Details</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Configure the basic settings for the new doughnut kiosk location.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="px-8 py-7 space-y-8">
                  {/* Core fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormInput
                      className="md:col-span-2"
                      id="kioskName"
                      label="Kiosk Name / ID"
                      placeholder="e.g. Toronto-Union-Station-001"
                      value={form.kioskName}
                      onChange={update("kioskName")}
                      icon={<Icons.Storefront />}
                      hint="Unique identifier for this kiosk location."
                      required
                    />
                    <FormInput
                      id="serialNumber"
                      label="Hardware Serial Number"
                      placeholder="SN-XXXX-XXXX-XXXX"
                      value={form.serialNumber}
                      onChange={update("serialNumber")}
                      icon={<Icons.QrCode />}
                      mono
                      required
                    />
                    <FormSelect
                      id="languagePack"
                      label="Initial Language Pack"
                      value={form.languagePack}
                      onChange={update("languagePack")}
                      options={LANGUAGES}
                      placeholder="Select default language"
                      icon={<Icons.Translate />}
                    />
                  </div>

                  {/* Physical Location */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <span className="text-[#ff8c00]"><Icons.Location /></span>
                      Physical Location
                    </h4>
                    <div className="bg-slate-50 rounded-xl border border-slate-100 p-5 grid grid-cols-6 gap-4">
                      <LocationInput
                        className="col-span-6"
                        id="streetAddress"
                        label="Street Address"
                        placeholder="123 Front Street West"
                        value={form.streetAddress}
                        onChange={update("streetAddress")}
                      />
                      <LocationInput
                        className="col-span-6 md:col-span-3"
                        id="city"
                        label="City"
                        placeholder="Toronto"
                        value={form.city}
                        onChange={update("city")}
                      />
                      <div className="col-span-6 md:col-span-3">
                        <label htmlFor="province" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                          Province / Territory
                        </label>
                        <div className="relative">
                          <select
                            id="province"
                            value={form.province}
                            onChange={(e) => update("province")(e.target.value)}
                            className="w-full px-4 pr-9 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#ff8c00]/20 focus:border-[#ff8c00] appearance-none cursor-pointer text-slate-900 transition-all"
                          >
                            {PROVINCES.map((p) => (
                              <option key={p.value} value={p.value}>{p.label}</option>
                            ))}
                          </select>
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            <Icons.ChevronDown />
                          </span>
                        </div>
                      </div>
                      <LocationInput
                        className="col-span-6 md:col-span-2"
                        id="postalCode"
                        label="Postal Code"
                        placeholder="M5J 2M2"
                        value={form.postalCode}
                        onChange={(v) => update("postalCode")(v.toUpperCase())}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-4 pt-5 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={onCancel}
                      className="px-6 py-2.5 text-slate-500 hover:text-slate-800 font-semibold text-sm transition-colors rounded-xl hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-[#ff8c00] hover:bg-orange-600 disabled:opacity-70 text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-orange-100 transition-all flex items-center gap-2 min-w-[160px] justify-center"
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Registering...
                        </>
                      ) : (
                        <>
                          <Icons.CheckCircle />
                          Register Kiosk
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}