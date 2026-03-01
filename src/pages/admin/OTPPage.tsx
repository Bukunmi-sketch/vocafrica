import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from "react";

function VocaLogo() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-[#ff8c00]">
      <g clipPath="url(#clip0_otp)">
        <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor"/>
      </g>
      <defs><clipPath id="clip0_otp"><rect width="48" height="48" fill="white"/></clipPath></defs>
    </svg>
  );
}

const OTP_LENGTH = 6;

export default function OTPPage() {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    refs.current[0]?.focus();
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(timer); setCanResend(true); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function handleChange(index: number, val: string) {
    const ch = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = ch;
    setDigits(next);
    setError("");
    if (ch && index < OTP_LENGTH - 1) refs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) refs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) refs.current[index + 1]?.focus();
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const next = [...digits];
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1);
    refs.current[focusIdx]?.focus();
  }

  async function handleVerify() {
    const code = digits.join("");
    if (code.length < OTP_LENGTH) { setError("Please enter all 6 digits."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    if (code === "123456") { setVerified(true); }
    else { setError("Incorrect code. Please try again."); setDigits(Array(OTP_LENGTH).fill("")); refs.current[0]?.focus(); }
  }

  function handleResend() {
    if (!canResend) return;
    setDigits(Array(OTP_LENGTH).fill(""));
    setError("");
    setCountdown(59);
    setCanResend(false);
    refs.current[0]?.focus();
    const timer = setInterval(() => {
      setCountdown((c) => { if (c <= 1) { clearInterval(timer); setCanResend(true); return 0; } return c - 1; });
    }, 1000);
  }

  const filled = digits.filter(Boolean).length;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: "linear-gradient(155deg,#faf8f5 0%,#f3ede4 100%)", fontFamily: "'DM Sans','Inter',system-ui,sans-serif" }}>
      <style>{`
        @keyframes cardIn { from{opacity:0;transform:translateY(28px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes bounceIn { 0%{transform:scale(0)} 60%{transform:scale(1.15)} 80%{transform:scale(.92)} 100%{transform:scale(1)} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-7px)} 40%{transform:translateX(7px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
        .card-in{animation:cardIn .5s cubic-bezier(.34,1.46,.64,1) both}
        .bounce-in{animation:bounceIn .5s cubic-bezier(.34,1.56,.64,1) both}
        .do-shake{animation:shake .45s ease both}
      `}</style>

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full opacity-35" style={{background:"radial-gradient(circle,rgba(255,140,0,.2) 0%,transparent 70%)",filter:"blur(90px)"}}/>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-25" style={{background:"radial-gradient(circle,rgba(255,140,0,.12) 0%,transparent 70%)",filter:"blur(90px)"}}/>
      </div>

      <div className={`card-in w-full max-w-[420px] bg-white rounded-2xl overflow-hidden ${error ? "do-shake" : ""}`}
        key={error}
        style={{boxShadow:"0 2px 4px rgba(255,140,0,.04),0 16px 48px rgba(255,140,0,.1)",border:"1px solid rgba(255,140,0,.1)"}}>

        <div className="pt-10 pb-7 px-8 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2.5 mb-2"><VocaLogo /><h1 className="text-2xl font-black tracking-tight text-[#ff8c00] uppercase">VOCAAFRICA</h1></div>

          {verified ? (
            <div className="flex flex-col items-center gap-3 py-4">
              <div className="bounce-in w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2.5} className="w-8 h-8">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <p className="text-lg font-bold text-slate-900">Verified!</p>
              <p className="text-sm text-slate-400 text-center">Your identity has been confirmed successfully.</p>
            </div>
          ) : (
            <>
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="#ff8c00" strokeWidth={1.8} className="w-7 h-7">
                  <rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
                  <circle cx="12" cy="16" r="1" fill="#ff8c00"/>
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900">Check your email</h2>
              <p className="text-sm text-slate-400 text-center leading-relaxed">
                We sent a 6-digit code to<br/>
                <span className="font-semibold text-slate-600">admin@voca.ca</span>
              </p>
            </>
          )}
        </div>

        {!verified && (
          <div className="px-8 pb-10 space-y-6">
            {/* OTP inputs */}
            <div className="flex gap-2.5 justify-center">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => { refs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  className={`w-11 h-13 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all duration-200
                    ${error ? "border-red-300 bg-red-50" : d ? "border-[#ff8c00] bg-orange-50 text-[#ff8c00]" : "border-slate-200 bg-slate-50 text-slate-900"}
                    focus:border-[#ff8c00] focus:bg-orange-50 focus:ring-2 focus:ring-[#ff8c00]/20`}
                  style={{height:"52px"}}
                />
              ))}
            </div>

            {error && <p className="text-xs text-red-500 font-medium text-center">{error}</p>}

            {/* Progress hint */}
            <div className="flex justify-center gap-1.5">
              {digits.map((d, i) => (
                <div key={i} className={`h-0.5 w-6 rounded-full transition-all duration-300 ${i < filled ? "bg-[#ff8c00]" : "bg-slate-200"}`}/>
              ))}
            </div>

            <button
              onClick={handleVerify}
              disabled={loading || filled < OTP_LENGTH}
              className="w-full h-12 bg-[#ff8c00] hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all active:scale-[.98] shadow-lg shadow-orange-200 flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              ) : null}
              {loading ? "Verifying…" : "Verify Code"}
            </button>

            <p className="text-center text-sm text-slate-400">
              Didn't receive it?{" "}
              {canResend ? (
                <button onClick={handleResend} className="font-semibold text-[#ff8c00] hover:text-orange-700 transition-colors">
                  Resend code
                </button>
              ) : (
                <span className="font-semibold text-slate-400">
                  Resend in 0:{countdown.toString().padStart(2,"0")}
                </span>
              )}
            </p>

            <p className="text-center text-xs text-slate-300">Demo: use code <span className="font-bold text-slate-400">123456</span></p>
          </div>
        )}

        <div className="h-1" style={{background:"linear-gradient(to right,rgba(255,140,0,.12),#ff8c00,rgba(255,140,0,.12))"}}/>
      </div>
    </div>
  );
}