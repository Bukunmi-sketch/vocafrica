import { useState } from "react";
import { Icons } from "@/components/icons";

// ── Types ──────────────────────────────────────────────────────────────────────
type KioskStatus = "online" | "offline";
type ViewMode = "grid" | "list";

interface Kiosk {
  id: string;
  name: string;
  location: string;
  status: KioskStatus;
  uptime: string;
  lastSync: string;
  imageBg: string; // tailwind gradient fallback
  error?: string;
}

type NavItem = "dashboard" | "kiosks" | "settings";

// ── Static Data ────────────────────────────────────────────────────────────────
const INITIAL_KIOSKS: Kiosk[] = [
  {
    id: "k-001",
    name: "Toronto-Front-St",
    location: "Toronto, ON",
    status: "online",
    uptime: "14 days, 3h",
    lastSync: "2 mins ago",
    imageBg: "from-orange-200 to-yellow-100",
  },
  {
    id: "k-002",
    name: "Vancouver-Robson",
    location: "Vancouver, BC",
    status: "online",
    uptime: "28 days, 1h",
    lastSync: "5 mins ago",
    imageBg: "from-sky-200 to-blue-100",
  },
  {
    id: "k-003",
    name: "Montreal-Sainte-Catherine",
    location: "Montreal, QC",
    status: "online",
    uptime: "3 days, 12h",
    lastSync: "Just now",
    imageBg: "from-emerald-200 to-teal-100",
  },
  {
    id: "k-004",
    name: "Calgary-Stephen-Ave",
    location: "Calgary, AB",
    status: "offline",
    uptime: "—",
    lastSync: "3h ago",
    imageBg: "from-slate-300 to-slate-200",
    error: "Connection lost: Power instability detected in region.",
  },
];

// ── Icons (inline SVG to avoid external deps) ─────────────────────────────────

// ── Location image placeholders (colored gradient backgrounds) ─────────────────
function KioskImagePlaceholder({ kiosk }: { kiosk: Kiosk }) {
  const patterns: Record<string, string> = {
    "k-001": "🏙️",
    "k-002": "🌿",
    "k-003": "🏛️",
    "k-004": "⚡",
  };
  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${kiosk.imageBg} flex items-end justify-start p-0 relative`}
    >
      <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-20 select-none">
        {patterns[kiosk.id]}
      </div>
    </div>
  );
}

// ── Kiosk Card ─────────────────────────────────────────────────────────────────
function KioskCard({
  kiosk,
  onDelete,
  viewMode,
}: {
  kiosk: Kiosk;
 onDelete: (kiosk: Kiosk) => void;
  viewMode: ViewMode;
}) {
  const isOffline = kiosk.status === "offline";

  if (viewMode === "list") {
    return (
      <div
        className={`bg-white rounded-xl border flex items-center gap-4 px-5 py-4 shadow-sm hover:shadow-md transition-shadow ${
          isOffline ? "border-amber-200" : "border-slate-200"
        }`}
      >
        {/* Color dot */}
        <div
          className={`w-10 h-10 rounded-xl flex-shrink-0 bg-gradient-to-br ${kiosk.imageBg} flex items-center justify-center text-lg`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-0.5">
            <h4 className="font-bold text-slate-900 text-sm truncate">{kiosk.name}</h4>
            <StatusBadge status={kiosk.status} />
          </div>
          <p className="text-xs text-slate-400">{kiosk.location}</p>
        </div>
        <div className="hidden sm:flex items-center gap-8 text-xs">
          <div>
            <p className="text-slate-400 mb-0.5">Uptime</p>
            <p className="font-semibold text-slate-700">{kiosk.uptime}</p>
          </div>
          <div>
            <p className="text-slate-400 mb-0.5">Last Sync</p>
            <p className="font-semibold text-slate-700">{kiosk.lastSync}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isOffline
                ? "bg-amber-500 text-white hover:bg-amber-600"
                : "bg-slate-100 hover:bg-[#ff8c00] hover:text-white"
            }`}
          >
            {isOffline ? "View Details" : "Connect"}
          </button>
          <button
            onClick={() => onDelete(kiosk)}
            className="p-1.5 rounded-full text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <Icons.Trash />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative ${
        isOffline ? "border-amber-200" : "border-slate-200"
      }`}
    >
      {/* Delete */}
      <button
        onClick={() => onDelete(kiosk)}
        className="absolute top-2 right-2 z-20 bg-white/90 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-full transition-colors shadow-sm backdrop-blur-sm"
        aria-label="Delete kiosk"
      >
        <Icons.Trash />
      </button>

      {/* Image */}
      <div className="h-32 relative overflow-hidden">
        <div
          className={`absolute inset-0 ${
            isOffline ? "bg-amber-500/10" : "bg-[#ff8c00]/10"
          }`}
        />
        <div
          className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${
            isOffline ? "opacity-40 grayscale" : "opacity-70"
          }`}
        >
          <KioskImagePlaceholder kiosk={kiosk} />
        </div>
        {/* Location label */}
        <div
          className={`absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
            isOffline
              ? "bg-amber-500 text-white"
              : "bg-white/90 text-slate-800 backdrop-blur-sm"
          }`}
        >
          {kiosk.location}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-4 gap-2">
          <h4 className="font-bold text-slate-900 text-sm leading-tight">{kiosk.name}</h4>
          <StatusBadge status={kiosk.status} />
        </div>

        {isOffline && kiosk.error ? (
          <div className="p-2.5 bg-amber-50 rounded-lg mb-4 border border-amber-100">
            <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
              {kiosk.error}
            </p>
          </div>
        ) : (
          <div className="space-y-2 mb-5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Uptime</span>
              <span className="font-semibold text-slate-700">{kiosk.uptime}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Last Sync</span>
              <span className="font-semibold text-slate-700">{kiosk.lastSync}</span>
            </div>
          </div>
        )}

        <button
          className={`w-full py-2 rounded-lg text-sm font-bold transition-all ${
            isOffline
              ? "bg-amber-500 text-white hover:bg-amber-600"
              : "bg-slate-100 hover:bg-[#ff8c00] hover:text-white"
          }`}
        >
          {isOffline ? "View Details" : "Connect"}
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: KioskStatus }) {
  return status === "online" ? (
    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-bold flex-shrink-0">
      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
      Online
    </div>
  ) : (
    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full text-[11px] font-bold flex-shrink-0">
      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
      Offline
    </div>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon,
  iconBg,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-5 shadow-sm">
      <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-400">{label}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      </div>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function KioskManagement() {
  const [activeNav, setActiveNav] = useState<NavItem>("kiosks");
  const [kiosks, setKiosks] = useState<Kiosk[]>(INITIAL_KIOSKS);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [kioskToDelete, setKioskToDelete] = useState<Kiosk | null>(null);

  const filtered = kiosks.filter(
    (k) =>
      k.name.toLowerCase().includes(search.toLowerCase()) ||
      k.location.toLowerCase().includes(search.toLowerCase())
  );

  const totalOnline = kiosks.filter((k) => k.status === "online").length;
  const totalAlerts = kiosks.filter((k) => k.status === "offline").length;

  // function deleteKiosk(id: string) {
  //   setKiosks((prev) => prev.filter((k) => k.id !== id));
  // }


  function requestDelete(kiosk: Kiosk) {
  setKioskToDelete(kiosk);
}

function confirmDelete() {
  if (!kioskToDelete) return;

  setKiosks((prev) => prev.filter((k) => k.id !== kioskToDelete.id));
  setKioskToDelete(null);
}

function cancelDelete() {
  setKioskToDelete(null);
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
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .kiosk-card { animation: fadeSlideIn 0.3s ease both; }
      `}</style>

     

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col min-w-0 max-w-7xl mx-auto overflow-hidden">
       

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              label="Total Kiosks"
              value={kiosks.length}
              iconBg="bg-blue-50 text-blue-600"
              icon={<Icons.Devices />}
            />
            <StatCard
              label="Online Now"
              value={totalOnline}
              iconBg="bg-emerald-50 text-emerald-600"
              icon={<Icons.Wifi />}
            />
            <StatCard
              label="System Alerts"
              value={totalAlerts}
              iconBg="bg-amber-50 text-amber-600"
              icon={<Icons.Warning />}
            />
          </div>

          {/* Section header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Active Kiosks</h3>
              <p className="text-sm text-slate-400">
                Monitoring real-time hardware status across all regions
              </p>
            </div>
            <div className="flex bg-white border border-slate-200 rounded-xl p-1 gap-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-slate-100 text-slate-700"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <Icons.Grid />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-slate-100 text-slate-700"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <Icons.List />
              </button>
            </div>
          </div>

          {/* Kiosk grid / list */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((kiosk, i) => (
                <div
                  key={kiosk.id}
                  className="kiosk-card"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <KioskCard kiosk={kiosk} onDelete={requestDelete} viewMode="grid" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((kiosk, i) => (
                <div
                  key={kiosk.id}
                  className="kiosk-card"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <KioskCard kiosk={kiosk} onDelete={requestDelete} viewMode="list" />
                </div>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-semibold">No kiosks found</p>
              <p className="text-sm mt-1">Try adjusting your search query</p>
            </div>
          )}

          {/* Load more */}
          {filtered.length > 0 && (
            <div className="flex flex-col items-center pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-400 mb-3">
                Showing {filtered.length} of 128 kiosks
              </p>
              <button className="px-6 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                Load More Kiosks
              </button>
            </div>
          )}


          { kioskToDelete && (
  <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-fadeIn">
      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
          <Icons.Trash />
        </div>
        <h3 className="text-lg font-bold text-slate-900">
          Delete Kiosk
        </h3>
      </div>

      <p className="text-sm text-slate-600 mb-6">
        Are you sure you want to delete{" "}
        <span className="font-semibold text-slate-900">
          {kioskToDelete.name}
        </span>
        ?  
        This action <span className="text-red-600 font-semibold">cannot be undone</span>.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={cancelDelete}
          className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          onClick={confirmDelete}
          className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
        </div>
      </main>
    </div>
  );
}