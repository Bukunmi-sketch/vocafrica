import { useState } from "react";
import { Link } from "react-router";

// ── Shared sidebar types ───────────────────────────────────────────────────────
type SettingsTab = "profile" | "security" | "notifications" | "kiosks" | "languages" | "team" | "billing";

// ── Toggle component ──────────────────────────────────────────────────────────
function Toggle({ checked, onChange, disabled = false }: { checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button type="button" onClick={() => !disabled && onChange(!checked)} disabled={disabled}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-all duration-200 focus:outline-none
        ${checked ? "bg-[#ff8c00]" : "bg-slate-200"} ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}>
      <span className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`}/>
    </button>
  );
}

// ── Section header ─────────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="pb-4 border-b border-slate-100 mb-6">
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
  );
}

// ── Row wrapper ────────────────────────────────────────────────────────────────
function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6 py-4 border-b border-slate-50 last:border-0">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        {description && <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{description}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

// ── Input ──────────────────────────────────────────────────────────────────────
function Input({ value, onChange, placeholder, type = "text", className = "" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string; className?: string }) {
  return (
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className={`h-10 px-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm outline-none transition-all focus:ring-2 focus:ring-[#ff8c00]/20 focus:border-[#ff8c00] placeholder:text-slate-300 ${className}`}/>
  );
}

// ── Save button ────────────────────────────────────────────────────────────────
function SaveButton({ onClick, saved }: { onClick: () => void; saved: boolean }) {
  return (
    <button onClick={onClick}
      className={`h-10 px-6 rounded-xl font-bold text-sm transition-all active:scale-[.98] flex items-center gap-2
        ${saved ? "bg-emerald-500 text-white" : "bg-[#ff8c00] hover:bg-orange-600 text-white shadow-lg shadow-orange-200"}`}>
      {saved ? (
        <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>Saved!</>
      ) : "Save Changes"}
    </button>
  );
}

// ── Tab content components ─────────────────────────────────────────────────────

function ProfileTab() {
  const [form, setForm] = useState({ firstName: "Admin", lastName: "Toronto", email: "admin@voca.ca", phone: "+1 416 000 0000", org: "VOCAAFRICA — Canada Operations", timezone: "America/Toronto" });
  const [saved, setSaved] = useState(false);
  function save() { setSaved(true); setTimeout(() => setSaved(false), 2500); }
  const s = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="space-y-8">
      <SectionHeader title="Profile Information" subtitle="Update your admin profile details and contact information."/>

      {/* Avatar */}
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-300 to-amber-500 flex items-center justify-center text-white text-2xl font-black flex-shrink-0">AT</div>
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-1">Profile Photo</p>
          <button className="text-xs font-semibold text-[#ff8c00] hover:text-orange-700 transition-colors border border-orange-200 hover:border-orange-400 px-3 py-1.5 rounded-lg">Upload Photo</button>
          <p className="text-xs text-slate-400 mt-1">JPG, PNG up to 2MB</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase tracking-wide">First Name</label><Input value={form.firstName} onChange={s("firstName")} className="w-full"/></div>
        <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Last Name</label><Input value={form.lastName} onChange={s("lastName")} className="w-full"/></div>
        <div className="space-y-1.5 col-span-2"><label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email Address</label><Input value={form.email} onChange={s("email")} type="email" className="w-full"/></div>
        <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Phone</label><Input value={form.phone} onChange={s("phone")} className="w-full"/></div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Timezone</label>
          <div className="relative">
            <select value={form.timezone} onChange={(e) => s("timezone")(e.target.value)}
              className="w-full h-10 px-3.5 pr-9 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm outline-none transition-all focus:ring-2 focus:ring-[#ff8c00]/20 focus:border-[#ff8c00] appearance-none cursor-pointer">
              <option value="America/Toronto">Eastern Time (ET)</option>
              <option value="America/Vancouver">Pacific Time (PT)</option>
              <option value="America/Winnipeg">Central Time (CT)</option>
              <option value="America/Halifax">Atlantic Time (AT)</option>
            </select>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
        <div className="space-y-1.5 col-span-2"><label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Organization</label><Input value={form.org} onChange={s("org")} className="w-full"/></div>
      </div>

      <div className="flex justify-end"><SaveButton onClick={save} saved={saved}/></div>
    </div>
  );
}

function SecurityTab() {
  const [mfa, setMfa] = useState(true);
  const [sessionAlert, setSessionAlert] = useState(true);
  const [loginNotif, setLoginNotif] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [pw, setPw] = useState({ current: "", newPw: "", confirm: "" });

  const sessions = [
    { device: "MacBook Pro — Chrome", location: "Toronto, ON", time: "Active now", current: true },
    { device: "iPhone 15 — Safari", location: "Toronto, ON", time: "2 hours ago", current: false },
    { device: "Windows PC — Edge", location: "Vancouver, BC", time: "3 days ago", current: false },
  ];

  function save() { setSaved(true); setTimeout(() => setSaved(false), 2500); }

  return (
    <div className="space-y-8">
      <SectionHeader title="Password" subtitle="Change your password to keep your account secure."/>
      <div className="grid grid-cols-1 gap-4 max-w-md">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Current Password</label>
          <div className="relative">
            <input type={showCurrent ? "text" : "password"} value={pw.current} onChange={(e) => setPw((p) => ({...p, current: e.target.value}))}
              placeholder="••••••••" className="w-full h-10 px-3.5 pr-11 rounded-xl border border-slate-200 bg-white text-sm outline-none transition-all focus:ring-2 focus:ring-[#ff8c00]/20 focus:border-[#ff8c00] placeholder:text-slate-300"/>
            <button type="button" onClick={() => setShowCurrent((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">New Password</label>
          <div className="relative">
            <input type={showNew ? "text" : "password"} value={pw.newPw} onChange={(e) => setPw((p) => ({...p, newPw: e.target.value}))}
              placeholder="Min. 8 characters" className="w-full h-10 px-3.5 pr-11 rounded-xl border border-slate-200 bg-white text-sm outline-none transition-all focus:ring-2 focus:ring-[#ff8c00]/20 focus:border-[#ff8c00] placeholder:text-slate-300"/>
            <button type="button" onClick={() => setShowNew((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Confirm New Password</label>
          <input type="password" value={pw.confirm} onChange={(e) => setPw((p) => ({...p, confirm: e.target.value}))}
            placeholder="Repeat new password" className="w-full h-10 px-3.5 rounded-xl border border-slate-200 bg-white text-sm outline-none transition-all focus:ring-2 focus:ring-[#ff8c00]/20 focus:border-[#ff8c00] placeholder:text-slate-300"/>
        </div>
        <button onClick={save} className="self-start h-10 px-6 rounded-xl bg-[#ff8c00] hover:bg-orange-600 text-white font-bold text-sm transition-all shadow-lg shadow-orange-200">
          Update Password
        </button>
      </div>

      <SectionHeader title="Security Settings" subtitle="Control additional security layers for your account."/>
      <div className="bg-slate-50 rounded-xl p-1">
        <SettingRow label="Two-Factor Authentication" description="Require OTP verification on every login."><Toggle checked={mfa} onChange={setMfa}/></SettingRow>
        <SettingRow label="New Session Alerts" description="Get notified when your account is accessed from a new device."><Toggle checked={sessionAlert} onChange={setSessionAlert}/></SettingRow>
        <SettingRow label="Login Notifications" description="Receive an email for every successful login."><Toggle checked={loginNotif} onChange={setLoginNotif}/></SettingRow>
      </div>

      <SectionHeader title="Active Sessions" subtitle="Manage devices currently logged into your account."/>
      <div className="space-y-2">
        {sessions.map((s) => (
          <div key={s.device} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.current ? "bg-emerald-500" : "bg-slate-300"}`}/>
              <div>
                <p className="text-sm font-semibold text-slate-800">{s.device}</p>
                <p className="text-xs text-slate-400">{s.location} · {s.time}</p>
              </div>
            </div>
            {s.current ? (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Current</span>
            ) : (
              <button className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors">Revoke</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsTab() {
  const [settings, setSettings] = useState({
    kioskOffline: true, highLatency: true, newSession: false,
    weeklyReport: true, translationAlert: true, systemUpdates: false,
    emailDigest: true, pushEnabled: false, smsEnabled: false,
  });
  const [saved, setSaved] = useState(false);
  function toggle(k: keyof typeof settings) { setSettings((s) => ({...s, [k]: !s[k]})); }
  function save() { setSaved(true); setTimeout(() => setSaved(false), 2500); }

  const groups = [
    { title: "Kiosk Alerts", items: [
      { key: "kioskOffline", label: "Kiosk Offline", desc: "Alert when a kiosk loses connection." },
      { key: "highLatency", label: "High Latency Warning", desc: "Alert when latency exceeds 100ms." },
      { key: "translationAlert", label: "Translation Failure", desc: "Alert on failed translation attempts." },
    ]},
    { title: "Account Notifications", items: [
      { key: "newSession", label: "New Login", desc: "Notify on new session from unknown device." },
      { key: "systemUpdates", label: "System Updates", desc: "Platform maintenance and update notices." },
    ]},
    { title: "Reports & Digests", items: [
      { key: "weeklyReport", label: "Weekly Analytics Report", desc: "Summary of kiosk performance sent every Monday." },
    ]},
  ];

  return (
    <div className="space-y-8">
      {groups.map((g) => (
        <div key={g.title}>
          <SectionHeader title={g.title}/>
          <div className="bg-slate-50 rounded-xl p-1">
            {g.items.map((item) => (
              <SettingRow key={item.key} label={item.label} description={item.desc}>
                <Toggle checked={settings[item.key as keyof typeof settings] as boolean} onChange={() => toggle(item.key as keyof typeof settings)}/>
              </SettingRow>
            ))}
          </div>
        </div>
      ))}

      <SectionHeader title="Delivery Channels"/>
      <div className="bg-slate-50 rounded-xl p-1">
        <SettingRow label="Email Digest" description="Receive all alerts consolidated in a daily email."><Toggle checked={settings.emailDigest} onChange={() => toggle("emailDigest")}/></SettingRow>
        <SettingRow label="Push Notifications" description="Browser / app push for real-time alerts."><Toggle checked={settings.pushEnabled} onChange={() => toggle("pushEnabled")}/></SettingRow>
        <SettingRow label="SMS Alerts" description="Critical alerts via text message (additional charges apply)."><Toggle checked={settings.smsEnabled} onChange={() => toggle("smsEnabled")}/></SettingRow>
      </div>

      <div className="flex justify-end"><SaveButton onClick={save} saved={saved}/></div>
    </div>
  );
}

function KioskSettingsTab() {
  const [autoReconnect, setAutoReconnect] = useState(true);
  const [heartbeat, setHeartbeat] = useState("30");
  const [timeout, setTimeout_] = useState("120");
  const [saved, setSaved] = useState(false);
  function save() { setSaved(true); setSaved(true); window.setTimeout(() => setSaved(false), 2500); }

  return (
    <div className="space-y-8">
      <SectionHeader title="Kiosk Connectivity" subtitle="Configure global connection settings for all managed kiosks."/>
      <div className="bg-slate-50 rounded-xl p-1">
        <SettingRow label="Auto-Reconnect" description="Automatically attempt reconnection when a kiosk goes offline."><Toggle checked={autoReconnect} onChange={setAutoReconnect}/></SettingRow>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Heartbeat Interval (s)</label>
          <Input value={heartbeat} onChange={setHeartbeat} placeholder="30" className="w-full"/>
          <p className="text-xs text-slate-400">How often kiosks ping the server.</p>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Session Timeout (s)</label>
          <Input value={timeout} onChange={setTimeout_} placeholder="120" className="w-full"/>
          <p className="text-xs text-slate-400">Idle time before kiosk session resets.</p>
        </div>
      </div>

      <SectionHeader title="Hardware Defaults" subtitle="Default settings applied when registering new kiosks."/>
      <div className="grid grid-cols-2 gap-4 max-w-md">
        {[["Default Volume", "75"], ["Screen Brightness", "80"], ["Mic Sensitivity", "65"], ["Speaker Output", "70"]].map(([label, def]) => {
          const [val, setVal] = useState(def);
          return (
            <div key={label} className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label}</label>
                <span className="text-xs font-bold text-[#ff8c00]">{val}%</span>
              </div>
              <input type="range" min="0" max="100" value={val} onChange={(e) => setVal(e.target.value)}
                className="w-full accent-[#ff8c00] cursor-pointer"/>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end"><SaveButton onClick={save} saved={saved}/></div>
    </div>
  );
}

function LanguagesTab() {
  const langs = [
    { code: "fr", name: "French (CA)", flag: "🇫🇷", active: true, coverage: 95 },
    { code: "en", name: "English (CA)", flag: "🇨🇦", active: true, coverage: 100 },
    { code: "zh", name: "Mandarin",     flag: "🇨🇳", active: true, coverage: 88 },
    { code: "pa", name: "Punjabi",      flag: "🇮🇳", active: true, coverage: 82 },
    { code: "es", name: "Spanish",      flag: "🇪🇸", active: false, coverage: 70 },
    { code: "yo", name: "Yoruba",       flag: "🇳🇬", active: false, coverage: 65 },
    { code: "sw", name: "Swahili",      flag: "🇰🇪", active: false, coverage: 60 },
    { code: "tl", name: "Tagalog",      flag: "🇵🇭", active: true, coverage: 78 },
  ];
  const [active, setActive] = useState(langs.map((l) => l.active));

  return (
    <div className="space-y-8">
      <SectionHeader title="Language Packs" subtitle="Enable or disable language support across all kiosks."/>
      <div className="space-y-2">
        {langs.map((lang, i) => (
          <div key={lang.code} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-orange-50/50 transition-colors">
            <span className="text-2xl w-8 text-center flex-shrink-0">{lang.flag}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800">{lang.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#ff8c00] rounded-full transition-all" style={{width:`${lang.coverage}%`}}/>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0">{lang.coverage}% coverage</span>
              </div>
            </div>
            <Toggle checked={active[i]} onChange={(v) => setActive((a) => { const n=[...a]; n[i]=v; return n; })}/>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamTab() {
  const members = [
    { name: "Sarah Chen",     email: "s.chen@voca.ca",     role: "Super Admin",    avatar: "SC", color: "from-blue-300 to-blue-500" },
    { name: "Marc Tremblay",  email: "m.tremblay@voca.ca", role: "Regional Admin", avatar: "MT", color: "from-purple-300 to-purple-500" },
    { name: "Priya Sharma",   email: "p.sharma@voca.ca",   role: "Analyst",        avatar: "PS", color: "from-pink-300 to-pink-500" },
    { name: "James Okafor",   email: "j.okafor@voca.ca",   role: "Support Staff",  avatar: "JO", color: "from-emerald-300 to-emerald-500" },
    { name: "Admin Toronto",  email: "admin@voca.ca",      role: "Super Admin",    avatar: "AT", color: "from-orange-300 to-amber-500" },
  ];
  const [invite, setInvite] = useState("");

  return (
    <div className="space-y-8">
      <SectionHeader title="Team Members" subtitle="Manage admin accounts that have access to this platform."/>

      <div className="flex gap-3">
        <Input value={invite} onChange={setInvite} placeholder="colleague@company.com" type="email" className="flex-1"/>
        <button className="h-10 px-5 rounded-xl bg-[#ff8c00] hover:bg-orange-600 text-white font-bold text-sm transition-all shadow-lg shadow-orange-200 flex-shrink-0">
          Invite Admin
        </button>
      </div>

      <div className="space-y-2">
        {members.map((m) => (
          <div key={m.email} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>{m.avatar}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800">{m.name}</p>
              <p className="text-xs text-slate-400 truncate">{m.email}</p>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0
              ${m.role === "Super Admin" ? "bg-orange-50 text-orange-600" :
                m.role === "Regional Admin" ? "bg-blue-50 text-blue-600" :
                m.role === "Analyst" ? "bg-purple-50 text-purple-600" :
                "bg-slate-100 text-slate-600"}`}>{m.role}</span>
            {m.email !== "admin@voca.ca" && (
              <button className="text-slate-300 hover:text-red-500 transition-colors ml-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  <path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BillingTab() {
  return (
    <div className="space-y-8">
      <SectionHeader title="Current Plan" subtitle="Manage your VOCAAFRICA subscription."/>
      <div className="p-6 rounded-2xl border-2 border-[#ff8c00] bg-orange-50/50 relative overflow-hidden">
        <div className="absolute top-4 right-4 text-xs font-black text-[#ff8c00] bg-orange-100 px-2.5 py-1 rounded-full uppercase tracking-wide">Active</div>
        <p className="text-xs font-black text-[#ff8c00] uppercase tracking-widest mb-1">Enterprise Plan</p>
        <p className="text-3xl font-black text-slate-900">$299<span className="text-base font-normal text-slate-400">/month</span></p>
        <p className="text-sm text-slate-500 mt-1">Up to 200 kiosks · Unlimited languages · Priority support</p>
        <div className="mt-4 flex gap-3">
          <button className="text-sm font-semibold text-[#ff8c00] hover:text-orange-700 transition-colors border border-orange-200 hover:border-orange-400 px-4 py-2 rounded-xl">Change Plan</button>
          <button className="text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors px-4 py-2">Cancel Plan</button>
        </div>
      </div>

      <SectionHeader title="Payment Method"/>
      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
        <div className="w-12 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} className="w-6 h-6"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
        </div>
        <div className="flex-1"><p className="text-sm font-semibold text-slate-800">Visa ending in 4242</p><p className="text-xs text-slate-400">Expires 08/27</p></div>
        <button className="text-xs font-semibold text-[#ff8c00] hover:text-orange-700 transition-colors">Update</button>
      </div>

      <SectionHeader title="Recent Invoices"/>
      <div className="space-y-2">
        {[["Dec 2025","$299.00","Paid"],["Nov 2025","$299.00","Paid"],["Oct 2025","$299.00","Paid"]].map(([date, amount, status]) => (
          <div key={date} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div><p className="text-sm font-semibold text-slate-800">{date}</p><p className="text-xs text-slate-400">Enterprise Plan</p></div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-900">{amount}</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">{status}</span>
              <button className="text-slate-400 hover:text-[#ff8c00] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Nav items ──────────────────────────────────────────────────────────────────
const TABS: { key: SettingsTab; label: string; icon: React.ReactNode }[] = [
  { key: "profile", label: "Profile", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { key: "security", label: "Security", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { key: "notifications", label: "Notifications", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> },
  { key: "kiosks", label: "Kiosk Settings", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><rect x="5" y="2" width="14" height="18" rx="2" opacity={.3}/><rect x="7" y="4" width="10" height="7" rx="1"/></svg> },
  { key: "languages", label: "Languages", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4"><path d="M5 8l6 6M4 14l6-6 2-3M2 5h12M9 2v3"/><path d="M22 22l-5-10-5 10M14 18h6"/></svg> },
  { key: "team", label: "Team", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { key: "billing", label: "Billing", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
];

const TAB_CONTENT: Record<SettingsTab, React.ReactNode> = {
  profile: <ProfileTab/>,
  security: <SecurityTab/>,
  notifications: <NotificationsTab/>,
  kiosks: <KioskSettingsTab/>,
  languages: <LanguagesTab/>,
  team: <TeamTab/>,
  billing: <BillingTab/>,
};

// ── Main ──────────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [tab, setTab] = useState<SettingsTab>("profile");

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f7f5]"
      >
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}} .fade-in{animation:fadeIn .25s ease both}`}</style>

      {/* ── Sidebar ── */}
      <aside className="w-60 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-5 pb-6">
          <div className="flex items-center gap-2.5 mb-7">
            <div className="w-9 h-9 bg-[#ff8c00] rounded-xl flex items-center justify-center text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight uppercase text-slate-900">VOCAAFRICA</h1>
              <p className="text-[9px] text-slate-400 font-bold tracking-widest uppercase">Management Suite</p>
            </div>
          </div>

          {/* Back to dashboard */}
          <Link to={"/admin/dashboard"}>
          <button className="group w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all mb-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to Dashboard
          </button>
          </Link>

          <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 px-3 mb-2">Settings</p>
          <nav className="space-y-0.5">
            {TABS.map(({ key, label, icon }) => (
              <button key={key} onClick={() => setTab(key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${tab === key ? "bg-[#ff8c00]/10 text-[#ff8c00] font-semibold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"}`}>
                {icon}{label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-5 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-300 to-amber-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">AT</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Admin Toronto</p>
              <p className="text-xs text-slate-400 truncate">admin@voca.ca</p>
            </div>
            <button className="text-slate-300 hover:text-red-500 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{TABS.find((t) => t.key === tab)?.label}</h2>
            <p className="text-xs text-slate-400">Manage your {TABS.find((t) => t.key === tab)?.label.toLowerCase()} preferences</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"/>
            </button>
            <div className="h-5 w-px bg-slate-200"/>
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-[#ff8c00] flex items-center justify-center text-white text-[10px] font-bold">AT</div>
              <span className="text-xs font-bold text-slate-700">Admin Toronto</span>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl fade-in" key={tab}>
            {TAB_CONTENT[tab]}
          </div>
        </div>
      </main>
    </div>
  );
}