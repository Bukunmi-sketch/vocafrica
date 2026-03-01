import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

// ── Types ──────────────────────────────────────────────────────────────────────
type MessageSender = "kiosk" | "command";

interface Message {
  id: string;
  sender: MessageSender;
  time: string;
  text?: string;
  translated?: string;
  original?: string;
  originalLang?: string;
  isAudio?: boolean;
  audioDuration?: string;
}

// ── Seed messages ──────────────────────────────────────────────────────────────
const SEED_MESSAGES: Message[] = [
  {
    id: "m1",
    sender: "kiosk",
    time: "10:42 AM",
    isAudio: true,
    audioDuration: "0:04",
    translated: "Hello, do you have any maple doughnuts today?",
    original: "Bonjour, est-ce que vous avez des beignets à l'érable aujourd'hui ?",
    originalLang: "FRENCH",
  },
  {
    id: "m2",
    sender: "command",
    time: "10:43 AM",
    text: "Yes, we have fresh Maple Glazed and Maple Bacon doughnuts available! Would you like a half-dozen?",
  },
];

const WAVE_HEIGHTS = [2, 4, 6, 3, 5, 8, 4, 2, 6, 7, 4, 3, 5, 2, 6, 4];

// ── Icons (inline SVG) ────────────────────────────────────────────────────────
const Icons = {
  Globe: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Bell: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  LocationPin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Translate: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M5 8l6 6M4 14l6-6 2-3M2 5h12M9 2v3" />
      <path d="M22 22l-5-10-5 10M14 18h6" />
    </svg>
  ),
  Clock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  History: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-4.98" /><polyline points="12 7 12 12 15 15" />
    </svg>
  ),
  Group: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  PhoneOff: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
      <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 2 2 0 0 1-.35-3.06z" />
      <line x1="23" y1="1" x2="1" y2="23" />
    </svg>
  ),
  Mic: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <line x1="12" y1="18" x2="12" y2="22" /><line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  ),
  Keyboard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10" />
    </svg>
  ),
  Paperclip: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  ),
  Emoji: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 13s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth={3} />
      <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth={3} />
    </svg>
  ),
  Wave: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
      <path d="M2 12h2l3-8 4 16 3-8 2 4h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

// ── Waveform components ────────────────────────────────────────────────────────
function StaticWave({ heights }: { heights: number[] }) {
  return (
    <div className="flex items-end gap-[2px] h-8 flex-1">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-[3px] bg-[#ff8c00] rounded-full flex-shrink-0"
          style={{ height: `${h * 4}px` }}
        />
      ))}
    </div>
  );
}

function LiveWave() {
  return (
    <div className="flex items-end gap-[3px] h-8">
      {[4, 6, 3, 5, 7, 4].map((h, i) => (
        <div
          key={i}
          className="w-[3px] bg-[#ff8c00] rounded-full"
          style={{
            height: `${h * 4}px`,
            animation: `liveWave ${0.7 + i * 0.12}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.08}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Message components ─────────────────────────────────────────────────────────
function KioskMessage({ msg }: { msg: Message }) {
  return (
    <div className="flex flex-col gap-2.5 max-w-2xl" style={{ animation: "msgIn 0.3s ease both" }}>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#8d785e]">
          Kiosk User
        </span>
        <span className="text-[10px] text-[#8d785e]">{msg.time}</span>
      </div>

      {msg.isAudio && (
        <div className="bg-white border border-[#e7e1da] rounded-xl shadow-sm p-4 flex items-center gap-4 max-w-sm">
          <div className="bg-orange-50 p-2 rounded-full text-[#ff8c00] flex-shrink-0">
            <Icons.Wave />
          </div>
          <StaticWave heights={WAVE_HEIGHTS} />
          <span className="text-xs font-bold text-[#ff8c00] flex-shrink-0">{msg.audioDuration}</span>
        </div>
      )}

      {msg.translated && (
        <div className="bg-[#ff8c00] text-white p-4 rounded-xl rounded-tl-none shadow-lg max-w-lg">
          <p className="text-[10px] opacity-70 font-black mb-1.5 uppercase tracking-widest">
            Translated (English)
          </p>
          <p className="text-base font-medium leading-relaxed">{msg.translated}</p>
        </div>
      )}

      {msg.original && (
        <div className="bg-white border border-[#e7e1da] rounded-xl p-3 max-w-xs opacity-55 text-sm italic">
          <span className="text-[10px] font-black block mb-1 not-italic uppercase tracking-widest text-[#8d785e]">
            Original ({msg.originalLang})
          </span>
          {msg.original}
        </div>
      )}
    </div>
  );
}

function CommandMessage({ msg }: { msg: Message }) {
  return (
    <div
      className="flex flex-col gap-2.5 max-w-2xl ml-auto items-end"
      style={{ animation: "msgIn 0.3s ease both" }}
    >
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-[#8d785e]">{msg.time}</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#ff8c00]">
          Command Center
        </span>
      </div>
      <div className="bg-white border border-[#e7e1da] rounded-xl rounded-tr-none shadow-sm p-4 max-w-lg">
        <p className="text-base leading-relaxed text-slate-800">{msg.text}</p>
      </div>
    </div>
  );
}

function ListeningIndicator() {
  return (
    <div className="flex flex-col gap-2.5 max-w-2xl" style={{ animation: "msgIn 0.3s ease both" }}>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#8d785e]">Kiosk User</span>
        <span className="text-[10px] text-[#8d785e] flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 bg-[#ff8c00] rounded-full inline-block"
            style={{ animation: "dotPulse 1s ease-in-out infinite" }}
          />
          Listening...
        </span>
      </div>
      <div className="bg-white/60 border-2 border-dashed border-orange-200 rounded-xl p-4 flex items-center justify-center min-h-[60px]">
        <LiveWave />
      </div>
    </div>
  );
}

// ── Live session timer ─────────────────────────────────────────────────────────
function useSessionTimer(initialSeconds: number) {
  const [secs, setSecs] = useState(initialSeconds);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function LiveKioskIntervention() {
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [activeNav, setActiveNav] = useState<"Dashboard" | "Live Kiosks" | "Analytics">("Live Kiosks");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const sessionTime = useSessionTimer(4 * 60 + 22);
  const navigate = useNavigate();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function getTime() {
    return new Date().toLocaleTimeString("en-CA", {
      hour: "numeric", minute: "2-digit", hour12: true,
    });
  }

  function sendText() {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { id: `m${Date.now()}`, sender: "command", time: getTime(), text: trimmed },
    ]);
    setInputText("");
  }

  function sendVoice() {
    setMessages((prev) => [
      ...prev,
      { id: `m${Date.now()}`, sender: "command", time: getTime(), text: "🎙️ [Voice message sent]" },
    ]);
  }

  const navItems = ["Dashboard", "Live Kiosks", "Analytics"] as const;

  return (
    <div
      className="flex flex-col h-screen overflow-hidden bg-[#f8f7f5]"
    >
      <style>{`
        @keyframes liveWave {
          from { transform: scaleY(0.35); }
          to   { transform: scaleY(1.3); }
        }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(1.5); }
        }
        @keyframes pingAnim {
          75%,100% { transform:scale(2.2); opacity:0; }
        }
      `}</style>

      {/* ── Header ── */}
      <header className="flex items-center justify-between border-b border-[#e7e1da] bg-white px-6 py-3 flex-shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <span className="text-[#ff8c00]"><Icons.Globe /></span>
          <h2 className="text-base font-black tracking-tight text-slate-900 uppercase">VOCAAFRICA</h2>
          <div className="h-5 w-px bg-[#e7e1da] mx-1" />
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                style={{ animation: "pingAnim 1.5s cubic-bezier(0,0,0.2,1) infinite" }}
              />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <span className="text-sm text-slate-600">
              Connected to:{" "}
              <span className="font-bold text-slate-900">Kiosk Toronto-Front St</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-5">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => navigate(`/admin/dashboard`)}
                className={`text-sm font-medium transition-colors ${
                  activeNav === item
                    ? "text-[#ff8c00] font-bold"
                    : "text-slate-600 hover:text-[#ff8c00]"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-600">
              <Icons.Bell />
            </button>
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-[#ff8c00] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                AT
              </div>
              <span className="text-xs font-bold text-slate-700">Admin Toronto</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Body row ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left sidebar */}
        <aside className="hidden lg:flex w-72 flex-shrink-0 border-r border-[#e7e1da] bg-white flex-col p-6 overflow-y-auto">
          <div className="mb-8">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#8d785e] mb-5">
              Kiosk Metadata
            </h3>
            <div className="space-y-5">
              {[
                { label: "Location",          value: "Toronto Front St",        icon: <Icons.LocationPin /> },
                { label: "Detected Language", value: "French (Auto-detected)",  icon: <Icons.Translate />  },
                { label: "Session Time",      value: `${sessionTime} active`,   icon: <Icons.Clock />      },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-[10px] text-[#8d785e] font-medium">{label}</span>
                  <div className="flex items-center gap-2 text-[#ff8c00]">
                    {icon}
                    <span className="text-sm font-semibold text-slate-800">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-[#e7e1da]">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#8d785e] mb-4">
              System Status
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Latency</span>
                <span className="text-emerald-600 font-bold">24ms</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#ff8c00] h-full rounded-full" style={{ width: "95%" }} />
              </div>
              <p className="text-[10px] text-[#8d785e]">AI Engine: VOCA-Neural-v2.4</p>
            </div>
          </div>
        </aside>

        {/* Chat */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Messages scroll area */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7">
            {messages.map((msg) =>
              msg.sender === "kiosk" ? (
                <KioskMessage key={msg.id} msg={msg} />
              ) : (
                <CommandMessage key={msg.id} msg={msg} />
              )
            )}
            <ListeningIndicator />
            <div ref={chatEndRef} />
          </div>

          {/* Input bar */}
          <div className="flex-shrink-0 bg-white border-t border-[#e7e1da] p-5">
            <div className="max-w-4xl mx-auto flex flex-col gap-3">
              {/* Text field */}
              <div className="relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendText();
                    }
                  }}
                  placeholder="Type your response here..."
                  className="w-full bg-[#f8f7f5] border border-transparent rounded-xl px-5 py-3.5 pr-24 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8c00]/30 focus:border-[#ff8c00] transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button className="p-1.5 text-[#8d785e] hover:text-[#ff8c00] transition-colors rounded-lg hover:bg-orange-50">
                    <Icons.Paperclip />
                  </button>
                  <button className="p-1.5 text-[#8d785e] hover:text-[#ff8c00] transition-colors rounded-lg hover:bg-orange-50">
                    <Icons.Emoji />
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={sendVoice}
                  className="flex items-center justify-center gap-3 bg-[#ff8c00] hover:bg-orange-600 text-white py-3.5 px-6 rounded-xl font-bold text-base transition-all shadow-lg shadow-orange-200 active:scale-[0.98]"
                >
                  <Icons.Mic />
                  Reply via Voice
                </button>
                <button
                  onClick={sendText}
                  className="flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white py-3.5 px-6 rounded-xl font-bold text-base transition-all active:scale-[0.98]"
                >
                  <Icons.Keyboard />
                  Reply via Text
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Right icon strip */}
        <aside className="w-14 flex-shrink-0 border-l border-[#e7e1da] bg-white flex flex-col items-center py-6 gap-4">
          {[
            { icon: <Icons.Settings />, label: "Settings" },
            { icon: <Icons.History />,  label: "History"  },
            { icon: <Icons.Group />,    label: "Agents"   },
          ].map(({ icon, label }) => (
            <button
              key={label}
              title={label}
              className="p-2 rounded-xl text-[#8d785e] hover:text-[#ff8c00] hover:bg-orange-50 transition-all"
            >
              {icon}
            </button>
          ))}
          <div className="mt-auto">
            <button
              title="End Call"
              className="w-10 h-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
            >
              <Icons.PhoneOff />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}