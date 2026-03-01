import { useState, useEffect, useRef } from "react";

type Language = "yoruba" | "swahili";

interface AdminMessage {
  id: number;
  native: string;
  translation: string;
  lang: Language;
}

const MESSAGES: AdminMessage[] = [
  {
    id: 1,
    lang: "yoruba",
    native: "Ẹ n lẹ! Bawo ni gbogbo nkan? A ti gba iṣẹ rẹ.",
    translation: "Hello! How is everything? We have received your message.",
  },
  {
    id: 2,
    lang: "swahili",
    native: "Habari! Ujumbe wako umepokewa. Tutakujibu hivi karibuni.",
    translation: "Hello! Your message has been received. We will reply soon.",
  },
];

const LANG_CONFIG = {
  yoruba: {
    flag: "🇳🇬",
    label: "Yoruba",
    subtitle: "Bẹrẹ sii sọrọ",
    fullSubtitle: "Bẹrẹ sii sọrọ / Anza kuongea",
  },
  swahili: {
    flag: "🇰🇪",
    label: "Swahili",
    subtitle: "Anza kuongea",
    fullSubtitle: "Bẹrẹ sii sọrọ / Anza kuongea",
  },
};

export default function VocaAfrica() {
  const [lang, setLang] = useState<Language>("yoruba");
  const [recording, setRecording] = useState(false);
  const [showResponse, setShowResponse] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const currentMessage = MESSAGES.find((m) => m.lang === lang)!;
  const langConfig = LANG_CONFIG[lang];

  function handleMicPress() {
    setRecording(true);
    setRippleKey((k) => k + 1);
  }

  function handleMicRelease() {
    setRecording(false);
    // Simulate receiving a response
    setTimeout(() => setShowResponse(true), 600);
  }

  function handlePlay() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentMessage.native);
      utterance.lang = lang === "yoruba" ? "yo" : "sw";
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }

  useEffect(() => {
    setShowResponse(false);
    const t = setTimeout(() => setShowResponse(true), 300);
    return () => clearTimeout(t);
  }, [lang]);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden select-none"
      style={{
        background: "linear-gradient(145deg, #faf8f5 0%, #f5f0e8 100%)",
        fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Background decorative ring */}
      <div
        className="pointer-events-none fixed inset-0 flex items-center justify-center -z-10"
        aria-hidden
      >
        <div
          className="w-[700px] h-[700px] rounded-full border-[90px]"
          style={{ borderColor: "rgba(255,140,0,0.04)" }}
        />
      </div>

      {/* Floating ambient blobs */}
      <div
        className="pointer-events-none fixed top-0 right-0 -z-10 opacity-20"
        aria-hidden
      >
        <div
          style={{
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,180,60,0.4) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
      </div>
      <div
        className="pointer-events-none fixed bottom-0 left-0 -z-10 opacity-15"
        aria-hidden
      >
        <div
          style={{
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,140,0,0.5) 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
        />
      </div>

      <div className="relative flex min-h-screen flex-col items-center px-6 py-8 lg:py-12">
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-light transition-all duration-200 hover:scale-105 active:scale-95 z-20"
          style={{
            background: "rgba(0,0,0,0.08)",
            color: "#6b5e4e",
            backdropFilter: "blur(8px)",
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <header className="flex flex-col items-center gap-6 w-full max-w-2xl mb-8">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
              style={{ background: "rgba(255,140,0,0.12)" }}
            >
              🌐
            </div>
            <h1
              className="text-3xl font-black tracking-tight uppercase"
              style={{
                color: "#1a1209",
                letterSpacing: "0.06em",
              }}
            >
              VOCAAFRICA
            </h1>
          </div>

          {/* Language Selector */}
          <div
            className="flex w-full h-20 rounded-2xl p-1.5 shadow-lg"
            style={{
              background: "white",
              border: "1.5px solid rgba(255,140,0,0.12)",
              boxShadow: "0 8px 32px rgba(255,140,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            {(["yoruba", "swahili"] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="flex-1 flex items-center justify-center gap-3 rounded-xl transition-all duration-300 font-bold text-xl uppercase tracking-wide"
                style={
                  lang === l
                    ? {
                        background:
                          "linear-gradient(135deg, #ff9a00 0%, #ff6a00 100%)",
                        color: "white",
                        boxShadow: "0 4px 16px rgba(255,120,0,0.35)",
                      }
                    : { color: "#9c8870" }
                }
              >
                <span className="text-3xl">{LANG_CONFIG[l].flag}</span>
                <span>{LANG_CONFIG[l].label}</span>
              </button>
            ))}
          </div>
        </header>

        {/* Main mic area */}
        <main className="flex-1 flex flex-col items-center justify-center relative w-full">
          {/* Ripple rings */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden
          >
            {[0, 1, 2].map((i) => (
              <div
                key={`${rippleKey}-${i}`}
                className="absolute rounded-full"
                style={{
                  width: recording ? 420 : 340,
                  height: recording ? 420 : 340,
                  border: `3px solid rgba(255,140,0,${recording ? 0.4 : 0.2})`,
                  animation: `vocaRipple ${recording ? 1.5 : 3}s ease-out infinite`,
                  animationDelay: `${i * (recording ? 0.5 : 1)}s`,
                  transition: "all 0.4s ease",
                }}
              />
            ))}
          </div>

          <style>{`
            @keyframes vocaRipple {
              0%   { transform: scale(0.75); opacity: 0.6; }
              100% { transform: scale(1.4);  opacity: 0; }
            }
            @keyframes micPulse {
              0%, 100% { transform: scale(1); }
              50%       { transform: scale(1.04); }
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(20px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes waveBar {
              0%, 100% { height: 8px; }
              50%       { height: 32px; }
            }
          `}</style>

          {/* Mic Button */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            <button
              ref={buttonRef}
              onMouseDown={handleMicPress}
              onMouseUp={handleMicRelease}
              onTouchStart={handleMicPress}
              onTouchEnd={handleMicRelease}
              className="relative w-64 h-64 lg:w-72 lg:h-72 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: recording
                  ? "linear-gradient(145deg, #ff6a00 0%, #ff4500 100%)"
                  : "linear-gradient(145deg, #ff9a00 0%, #ff6a00 100%)",
                boxShadow: recording
                  ? "0 0 0 12px rgba(255,100,0,0.15), 0 24px 60px rgba(255,80,0,0.45)"
                  : "0 0 0 8px rgba(255,140,0,0.12), 0 20px 50px rgba(255,140,0,0.35)",
                animation: recording ? "none" : "micPulse 2.5s ease-in-out infinite",
                transform: recording ? "scale(0.96)" : undefined,
              }}
              aria-label="Push to Talk"
            >
              {/* Inner highlight */}
              <div
                className="absolute top-4 left-8 w-16 h-8 rounded-full opacity-30"
                style={{ background: "white", filter: "blur(6px)" }}
              />
              {/* Mic icon SVG */}
              <svg
                width="88"
                height="88"
                viewBox="0 0 24 24"
                fill="white"
                style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))" }}
              >
                <rect x="9" y="2" width="6" height="11" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" />
                <line x1="12" y1="18" x2="12" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="8" y1="22" x2="16" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>

              {/* Wave bars when recording */}
              {recording && (
                <div className="absolute bottom-8 flex items-end gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 rounded-full bg-white opacity-80"
                      style={{
                        height: 8,
                        animation: `waveBar 0.6s ease-in-out infinite`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </button>

            <div className="text-center">
              <h2
                className="text-3xl font-black uppercase tracking-widest mb-1"
                style={{
                  color: "#ff7800",
                  letterSpacing: "0.18em",
                  textShadow: "0 2px 12px rgba(255,140,0,0.2)",
                }}
              >
                {recording ? "Listening..." : "Push to Talk"}
              </h2>
              <p
                className="text-lg font-medium"
                style={{ color: "#9c8870" }}
              >
                {langConfig.fullSubtitle}
              </p>
            </div>
          </div>
        </main>

        {/* Response Card */}
        <footer className="w-full max-w-3xl mt-8 pb-4">
          {showResponse && (
            <div
              className="flex items-center gap-6 rounded-3xl p-6 lg:p-8"
              style={{
                background: "white",
                borderLeft: "10px solid #ff8c00",
                boxShadow:
                  "0 16px 48px rgba(255,140,0,0.1), 0 4px 16px rgba(0,0,0,0.06)",
                animation: "slideUp 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
              }}
            >
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2"
                  style={{ color: "#ff8c00" }}
                >
                  <span>🤖</span> Admin Response
                </p>
                <p
                  className="text-2xl lg:text-3xl font-bold leading-snug mb-2 break-words"
                  style={{ color: "#1a1209" }}
                >
                  {currentMessage.native}
                </p>
                <p
                  className="text-base font-medium italic"
                  style={{ color: "#9c8870" }}
                >
                  ({currentMessage.translation})
                </p>
              </div>

              {/* Play Button */}
              <button
                onClick={handlePlay}
                className="flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: speaking
                    ? "rgba(255,140,0,0.2)"
                    : "rgba(255,140,0,0.08)",
                  color: "#ff8c00",
                  border: speaking
                    ? "1.5px solid rgba(255,140,0,0.4)"
                    : "1.5px solid rgba(255,140,0,0.12)",
                }}
                aria-label="Play audio"
              >
                {speaking ? (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="#ff8c00">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="#ff8c00">
                    <path d="M11 5.056c0-.896 1.008-1.396 1.728-.832l8 6.222a1 1 0 0 1 0 1.564l-8 6.222C12.008 18.796 11 18.296 11 17.4V5.056z" />
                    <path d="M3 5.056c0-.896 1.008-1.396 1.728-.832l8 6.222a1 1 0 0 1 0 1.564l-8 6.222C4.008 18.796 3 18.296 3 17.4V5.056z" opacity="0.4" />
                  </svg>
                )}
                <span
                  className="text-xs font-black uppercase"
                  style={{ color: "#ff8c00", letterSpacing: "0.1em" }}
                >
                  {speaking ? "Stop" : "Play"}
                </span>
              </button>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}