import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
type TimeRange = "Last 24 Hours" | "Last 7 Days" | "Last 30 Days";

interface FlaggedRow {
  id: string;
  kioskId: string;
  location: string;
  language: string;
  langColor: string;
  timestamp: string;
  statusLabel: string;
  statusColor: string;
}

interface LangDist {
  label: string;
  pct: number;
  color: string;
}

// ── Static Data ────────────────────────────────────────────────────────────────
const BAR_HEIGHTS = [30, 45, 40, 60, 75, 85, 55, 45, 65, 90, 80, 60];
const TIME_LABELS = ["00:00", "06:00", "12:00", "18:00", "23:59"];

const LANG_DIST: LangDist[] = [
  { label: "French (CA)", pct: 45, color: "#ff8c00" },
  { label: "Mandarin",    pct: 20, color: "#fbbf24" },
  { label: "Punjabi",     pct: 20, color: "#fcd34d" },
  { label: "Others",      pct: 15, color: "#d1d5db" },
];

const FLAGGED_ROWS: FlaggedRow[] = [
  {
    id: "r1", kioskId: "YVR-004", location: "Vancouver-Robson",
    language: "Cantonese", langColor: "bg-blue-50 text-blue-700",
    timestamp: "Today, 10:23 AM",
    statusLabel: "High Latency", statusColor: "bg-red-500",
  },
  {
    id: "r2", kioskId: "YUL-012", location: "Montreal-Sainte-Catherine",
    language: "French", langColor: "bg-orange-50 text-orange-700",
    timestamp: "Today, 09:45 AM",
    statusLabel: "Low Confidence", statusColor: "bg-yellow-400",
  },
  {
    id: "r3", kioskId: "YYZ-008", location: "Toronto-Union Stn",
    language: "Punjabi", langColor: "bg-purple-50 text-purple-700",
    timestamp: "Yesterday, 11:15 PM",
    statusLabel: "Hardware Error", statusColor: "bg-slate-400",
  },
  {
    id: "r4", kioskId: "YYC-002", location: "Calgary-Airport",
    language: "Tagalog", langColor: "bg-green-50 text-green-700",
    timestamp: "Yesterday, 08:30 PM",
    statusLabel: "Translation Lag", statusColor: "bg-yellow-400",
  },
];

// Donut gradient string
function buildDonut(segments: LangDist[]) {
  let acc = 0;
  const stops = segments.map(({ pct, color }) => {
    const from = acc;
    acc += pct;
    return `${color} ${from}% ${acc}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

// ── Inline SVG Icons ───────────────────────────────────────────────────────────
const Icons = {
  Donut: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" />
    </svg>
  ),
  Bell: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Download: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  ChevronDown: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  ArrowUp: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3">
      <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
    </svg>
  ),
  Forum: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Translate: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path d="M5 8l6 6M4 14l6-6 2-3M2 5h12M9 2v3" />
      <path d="M22 22l-5-10-5 10M14 18h6" />
    </svg>
  ),
  Mood: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 13s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" strokeWidth={3} />
      <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth={3} />
    </svg>
  ),
  Payments: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  MoreVert: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <circle cx="12" cy="5"  r="1.5" /><circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  ),
};

// ── Stat Card ──────────────────────────────────────────────────────────────────
function StatCard({
  label, value, sub, subGreen, icon,
}: {
  label: string; value: React.ReactNode; sub: string; subGreen?: boolean; icon: React.ReactNode;
}) {
  return (
    <div className="bg-white p-5 rounded-xl border border-[#e7e1da] shadow-sm flex flex-col justify-between h-32">
      <div className="flex justify-between items-start">
        <p className="text-[#8d785e] text-[10px] font-bold uppercase tracking-widest">{label}</p>
        <span className="text-[#ff8c00] bg-orange-50 p-1.5 rounded-lg">{icon}</span>
      </div>
      <div>
        <div className="text-3xl font-bold leading-tight">{value}</div>
        <div className={`text-xs font-medium flex items-center gap-0.5 mt-1 ${subGreen ? "text-emerald-600" : "text-[#8d785e]"}`}>
          {subGreen && <Icons.ArrowUp />}
          {sub}
        </div>
      </div>
    </div>
  );
}

// ── Bar Chart ──────────────────────────────────────────────────────────────────
function BarChart({ heights }: { heights: number[] }) {
  return (
    <div className="relative h-64">
      {/* Grid lines */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="w-full h-px bg-slate-200 opacity-60" />
        ))}
      </div>
      {/* Bars */}
      <div className="absolute inset-0 flex items-end gap-1.5 px-1">
        {heights.map((h, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col justify-end rounded-t-sm overflow-hidden group relative cursor-pointer"
            style={{ height: "100%" }}
          >
            {/* Tooltip */}
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none"
            >
              {Math.round((h / 90) * 120)} req
            </div>
            <div
              className="w-full bg-orange-100 rounded-t-sm transition-all duration-200 group-hover:bg-orange-200 relative"
              style={{ height: `${h}%` }}
            >
              <div className="absolute bottom-0 w-full h-1 bg-[#ff8c00] rounded-t-none" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Donut Chart ────────────────────────────────────────────────────────────────
function DonutChart({ segments }: { segments: LangDist[] }) {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-center py-4">
        <div
          className="relative w-44 h-44 rounded-full"
          style={{ background: buildDonut(segments) }}
        >
          <div className="absolute inset-0 m-auto w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-slate-900">12</span>
            <span className="text-xs text-[#8d785e]">Languages</span>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-2.5">
        {segments.map(({ label, pct, color }) => (
          <div key={label} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color }} />
              <span className="text-slate-700">{label}</span>
            </div>
            <span className="font-bold text-slate-900">{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Flagged Table ──────────────────────────────────────────────────────────────
function FlaggedTable({ rows }: { rows: FlaggedRow[] }) {
  return (
    <div className="bg-white rounded-xl border border-[#e7e1da] shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-[#e7e1da] flex justify-between items-center">
        <h3 className="font-bold text-lg text-slate-900">Recent Flagged Interactions</h3>
        <button className="text-[#ff8c00] text-sm font-semibold hover:underline transition-colors">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f8f7f5] text-[#8d785e] text-[10px] font-bold uppercase tracking-widest">
            <tr>
              {["Kiosk ID", "Location", "Language", "Timestamp", "Status", "Action"].map((h, i) => (
                <th key={h} className={`px-6 py-4 ${i === 5 ? "text-right" : ""}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e7e1da]">
            {rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#fcfbf9] transition-colors group"
              >
                <td className="px-6 py-4 font-semibold text-slate-900">{row.kioskId}</td>
                <td className="px-6 py-4 text-slate-700">{row.location}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${row.langColor}`}>
                    {row.language}
                  </span>
                </td>
                <td className="px-6 py-4 text-[#8d785e]">{row.timestamp}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-2 text-slate-700">
                    <span className={`w-2 h-2 rounded-full ${row.statusColor}`} />
                    {row.statusLabel}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-300 hover:text-[#ff8c00] transition-colors p-1 rounded-lg hover:bg-orange-50">
                    <Icons.MoreVert />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function AnalyticsOverview() {
  const [timeRange, setTimeRange] = useState<TimeRange>("Last 24 Hours");
  const [activeNav, setActiveNav] = useState<"Dashboard" | "Live Kiosks" | "Analytics">("Analytics");

  const navItems = ["Dashboard", "Live Kiosks", "Analytics"] as const;

  return (
    <div
      className="flex flex-col h-screen overflow-hidden bg-[#f8f7f5]"
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.4s ease both; }
        .fade-up-1 { animation: fadeUp 0.4s 0.05s ease both; }
        .fade-up-2 { animation: fadeUp 0.4s 0.10s ease both; }
        .fade-up-3 { animation: fadeUp 0.4s 0.15s ease both; }
        .fade-up-4 { animation: fadeUp 0.4s 0.20s ease both; }
      `}</style>


      {/* ── Scrollable Body ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-7">

          {/* Page heading */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 fade-up">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Analytics Overview</h1>
              <p className="text-sm text-[#8d785e] mt-1">Real-time insights from Canadian doughnut kiosks.</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <div className="relative">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                  className="appearance-none text-sm border border-slate-200 rounded-xl bg-white py-2 pl-3 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff8c00]/30 focus:border-[#ff8c00] cursor-pointer"
                >
                  <option>Last 24 Hours</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Icons.ChevronDown />
                </span>
              </div>
              <button className="flex items-center gap-2 bg-[#ff8c00] hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm shadow-orange-200 transition-colors">
                <Icons.Download />
                Export Report
              </button>
            </div>
          </div>

          {/* ── Stat Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="fade-up-1">
              <StatCard
                label="Total Sessions" value="1,248"
                sub="12% vs last period" subGreen
                icon={<Icons.Forum />}
              />
            </div>
            <div className="fade-up-2">
              <StatCard
                label="Top Language" value="French"
                sub="Followed by Mandarin & Punjabi"
                icon={<Icons.Translate />}
              />
            </div>
            <div className="fade-up-3">
              <StatCard
                label="Avg Sentiment"
                value={<>4.8<span className="text-lg text-slate-400 font-normal">/5</span></>}
                sub="2.1% improvement" subGreen
                icon={<Icons.Mood />}
              />
            </div>
            <div className="fade-up-4">
              <StatCard
                label="Kiosk Sales" value="$12,890"
                sub="~3,200 Doughnuts"
                icon={<Icons.Payments />}
              />
            </div>
          </div>

          {/* ── Charts Row ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Bar chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-[#e7e1da] shadow-sm fade-up">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-bold text-lg text-slate-900">Live Translation Requests</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#ff8c00] rounded-full" />
                  <span className="text-xs text-[#8d785e]">Requests ({timeRange})</span>
                </div>
              </div>
              <BarChart heights={BAR_HEIGHTS} />
              <div className="flex justify-between text-xs text-[#8d785e] mt-3 px-1">
                {TIME_LABELS.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>

            {/* Donut */}
            <div className="bg-white p-6 rounded-xl border border-[#e7e1da] shadow-sm flex flex-col fade-up">
              <h3 className="font-bold text-lg text-slate-900 mb-1">Language Distribution</h3>
              <DonutChart segments={LANG_DIST} />
            </div>
          </div>

          {/* ── Flagged Table ── */}
          <div className="fade-up">
            <FlaggedTable rows={FLAGGED_ROWS} />
          </div>
        </div>
      </main>
    </div>
  );
}