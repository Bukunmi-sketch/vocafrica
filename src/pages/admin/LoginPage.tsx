import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";

// ── Logo SVG ───────────────────────────────────────────────────────────────────
function VocaLogo() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#ff8c00]">
      <g clipPath="url(#clip0_login)">
        <path
          d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_login">
          <rect width="48" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

// ── Eye icons ──────────────────────────────────────────────────────────────────
function EyeOpen() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-[18px] h-[18px]">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeClosed() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-[18px] h-[18px]">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

// ── Spinner ────────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [emailErr, setEmailErr]         = useState("");
  const [passwordErr, setPasswordErr]   = useState("");
  const [shakeKey, setShakeKey]         = useState(0);
  const navigate = useNavigate();

  function validate(): boolean {
    let ok = true;
    setEmailErr("");
    setPasswordErr("");

    if (!email.trim()) {
      setEmailErr("Email address is required.");
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErr("Please enter a valid email address.");
      ok = false;
    }

    if (!password) {
      setPasswordErr("Password is required.");
      ok = false;
    }

    return ok;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) {
      setShakeKey((k) => k + 1);
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    navigate('/admin/dashboard');

    // Demo: treat all credentials as invalid
    // setPasswordErr("Invalid email or password. Please try again.");
    setShakeKey((k) => k + 1);
  }

  const inputBase =
    "w-full h-12 px-4 rounded-xl border bg-white text-slate-900 placeholder:text-slate-300 text-sm outline-none transition-all duration-200";
  const inputOk   = "border-slate-200 focus:ring-2 focus:ring-[#ff8c00]/20 focus:border-[#ff8c00]";
  const inputErr  = "border-red-300 focus:ring-2 focus:ring-red-100 focus:border-red-400";

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(155deg, #faf8f5 0%, #f3ede4 100%)",
      }}
    >
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          15%     { transform: translateX(-7px); }
          30%     { transform: translateX(7px); }
          45%     { transform: translateX(-5px); }
          60%     { transform: translateX(5px); }
          75%     { transform: translateX(-3px); }
          90%     { transform: translateX(3px); }
        }
        .card-in { animation: cardIn 0.5s cubic-bezier(0.34,1.46,0.64,1) both; }
        .do-shake { animation: shake 0.45s ease both; }
      `}</style>

      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div
          className="absolute top-[-12%] left-[-12%] w-[45%] h-[45%] rounded-full opacity-35"
          style={{ background: "radial-gradient(circle, rgba(255,140,0,0.22) 0%, transparent 70%)", filter: "blur(90px)" }}
        />
        <div
          className="absolute bottom-[-12%] right-[-12%] w-[40%] h-[40%] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, rgba(255,140,0,0.15) 0%, transparent 70%)", filter: "blur(90px)" }}
        />
      </div>

      {/* Card — key forces re-render + re-trigger cardIn on first mount; shakeKey triggers shake */}
      <div
        key={shakeKey}
        className={`card-in ${shakeKey > 0 ? "do-shake" : ""} w-full max-w-[440px] bg-white rounded-2xl overflow-hidden`}
        style={{
          boxShadow: "0 2px 4px rgba(255,140,0,0.04), 0 16px 48px rgba(255,140,0,0.10), 0 1px 0 rgba(255,140,0,0.10)",
          border: "1px solid rgba(255,140,0,0.10)",
        }}
      >
        {/* ── Logo ── */}
        <div className="pt-10 pb-7 px-8 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <VocaLogo />
            <h1 className="text-2xl font-black tracking-tight text-[#ff8c00] uppercase">VOCAAFRICA</h1>
          </div>
          <p className="text-slate-400 text-sm font-medium">Please enter your details to sign in</p>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} noValidate className="px-8 pb-10 space-y-5">

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailErr(""); }}
              placeholder="name@company.com"
              autoComplete="email"
              className={`${inputBase} ${emailErr ? inputErr : inputOk}`}
            />
            {emailErr && <p className="text-xs text-red-500 font-medium">{emailErr}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                Password
              </label>
              <button
                type="button"
                className="text-xs font-semibold text-[#ff8c00] hover:text-orange-700 transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordErr(""); }}
                placeholder="••••••••"
                autoComplete="current-password"
                className={`${inputBase} pr-12 ${passwordErr ? inputErr : inputOk}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg"
              >
                {showPassword ? <EyeOpen /> : <EyeClosed />}
              </button>
            </div>
            {passwordErr && <p className="text-xs text-red-500 font-medium">{passwordErr}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#ff8c00] hover:bg-orange-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-orange-200 flex items-center justify-center gap-2 text-sm tracking-wide"
          >
            {loading ? (
              <>
                <Spinner />
                Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Divider */}
          <div className="relative flex items-center py-0.5">
            <div className="flex-grow border-t border-slate-100" />
            <span className="mx-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">or</span>
            <div className="flex-grow border-t border-slate-100" />
          </div>

          {/* Create account */}
          <div className="text-center">
            <button
              type="button"
              className="group text-sm font-semibold text-slate-500 hover:text-[#ff8c00] transition-colors inline-flex items-center gap-1.5"
            >
              Create Admin Account
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </form>

        {/* Bottom accent gradient */}
        <div
          className="h-1"
          style={{
            background:
              "linear-gradient(to right, rgba(255,140,0,0.12), #ff8c00, rgba(255,140,0,0.12))",
          }}
        />
      </div>
    </div>
  );
}