import { useState, FormEvent } from "react";

function VocaLogo() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-[#ff8c00]">
      <g clipPath="url(#clip0_reg)">
        <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor"/>
      </g>
      <defs><clipPath id="clip0_reg"><rect width="48" height="48" fill="white"/></clipPath></defs>
    </svg>
  );
}

interface FormState {
  firstName: string; lastName: string; email: string;
  organization: string; role: string;
  password: string; confirmPassword: string;
  agreed: boolean;
}
interface Errors { [key: string]: string }

function StrengthBar({ password }: { password: string }) {
  const checks = [password.length >= 8, /[A-Z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)];
  const score = checks.filter(Boolean).length;
  const colors = ["bg-slate-200","bg-red-400","bg-amber-400","bg-blue-400","bg-emerald-500"];
  const labels = ["","Weak","Fair","Good","Strong"];
  if (!password) return null;
  return (
    <div className="space-y-1.5 mt-2">
      <div className="flex gap-1">
        {[0,1,2,3].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < score ? colors[score] : "bg-slate-200"}`}/>
        ))}
      </div>
      <p className={`text-xs font-medium ${["","text-red-500","text-amber-500","text-blue-500","text-emerald-600"][score]}`}>{labels[score]}</p>
    </div>
  );
}

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>({ firstName:"", lastName:"", email:"", organization:"", role:"", password:"", confirmPassword:"", agreed:false });
  const [errors, setErrors] = useState<Errors>({});
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function set(field: keyof FormState) {
    return (val: string | boolean) => { setForm((f) => ({...f, [field]: val})); setErrors((e) => ({...e, [field]: ""})); };
  }

  function validate(): boolean {
    const e: Errors = {};
    if (!form.firstName.trim()) e.firstName = "Required.";
    if (!form.lastName.trim()) e.lastName = "Required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email address.";
    if (!form.organization.trim()) e.organization = "Organization is required.";
    if (!form.role) e.role = "Please select a role.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 8) e.password = "At least 8 characters required.";
    if (!form.confirmPassword) e.confirmPassword = "Please confirm your password.";
    else if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match.";
    if (!form.agreed) e.agreed = "You must agree to the terms.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setSuccess(true);
  }

  const inputBase = "w-full h-11 px-4 rounded-xl border bg-white text-slate-900 placeholder:text-slate-300 text-sm outline-none transition-all";
  const inputOk = "border-slate-200 focus:ring-2 focus:ring-[#ff8c00]/20 focus:border-[#ff8c00]";
  const inputErr = "border-red-300 focus:ring-2 focus:ring-red-100";

  const roles = ["Super Admin", "Regional Admin", "Kiosk Operator", "Support Staff", "Analyst"];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: "linear-gradient(155deg,#faf8f5 0%,#f3ede4 100%)", fontFamily: "'DM Sans','Inter',system-ui,sans-serif" }}>
      <style>{`
        @keyframes cardIn { from{opacity:0;transform:translateY(28px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes bounceIn { 0%{transform:scale(0)} 60%{transform:scale(1.15)} 80%{transform:scale(.92)} 100%{transform:scale(1)} }
        .card-in{animation:cardIn .5s cubic-bezier(.34,1.46,.64,1) both}
        .bounce-in{animation:bounceIn .5s cubic-bezier(.34,1.56,.64,1) both}
      `}</style>

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full opacity-35" style={{background:"radial-gradient(circle,rgba(255,140,0,.2) 0%,transparent 70%)",filter:"blur(90px)"}}/>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-25" style={{background:"radial-gradient(circle,rgba(255,140,0,.12) 0%,transparent 70%)",filter:"blur(90px)"}}/>
      </div>

      <div className="card-in w-full max-w-[500px] bg-white rounded-2xl overflow-hidden"
        style={{boxShadow:"0 2px 4px rgba(255,140,0,.04),0 16px 48px rgba(255,140,0,.1)",border:"1px solid rgba(255,140,0,.1)"}}>

        <div className="pt-8 pb-5 px-8 flex flex-col items-center gap-1">
          <div className="flex items-center gap-2.5 mb-1"><VocaLogo/><h1 className="text-2xl font-black tracking-tight text-[#ff8c00] uppercase">VOCAAFRICA</h1></div>
          {!success && <p className="text-sm text-slate-400 font-medium">Create your admin account</p>}
        </div>

        {success ? (
          <div className="px-8 pb-10 flex flex-col items-center gap-4 text-center">
            <div className="bounce-in w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2.5} className="w-8 h-8">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Account Created!</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Welcome, <span className="font-semibold text-slate-700">{form.firstName} {form.lastName}</span>!<br/>
              Your admin account is pending approval. We'll notify you at <span className="font-semibold text-slate-700">{form.email}</span>.
            </p>
            <button onClick={() => setSuccess(false)} className="mt-2 w-full h-12 bg-[#ff8c00] hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-200 text-sm">
              Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="px-8 pb-8 space-y-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">First Name</label>
                <input value={form.firstName} onChange={(e) => set("firstName")(e.target.value)} placeholder="John"
                  className={`${inputBase} ${errors.firstName ? inputErr : inputOk}`}/>
                {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Last Name</label>
                <input value={form.lastName} onChange={(e) => set("lastName")(e.target.value)} placeholder="Doe"
                  className={`${inputBase} ${errors.lastName ? inputErr : inputOk}`}/>
                {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Email Address</label>
              <input type="email" value={form.email} onChange={(e) => set("email")(e.target.value)} placeholder="name@company.com"
                className={`${inputBase} ${errors.email ? inputErr : inputOk}`}/>
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* Organization */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Organization</label>
              <input value={form.organization} onChange={(e) => set("organization")(e.target.value)} placeholder="e.g. Tim Hortons — Downtown Toronto"
                className={`${inputBase} ${errors.organization ? inputErr : inputOk}`}/>
              {errors.organization && <p className="text-xs text-red-500">{errors.organization}</p>}
            </div>

            {/* Role */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Admin Role</label>
              <div className="relative">
                <select value={form.role} onChange={(e) => set("role")(e.target.value)}
                  className={`${inputBase} appearance-none pr-9 cursor-pointer ${errors.role ? inputErr : inputOk} ${!form.role ? "text-slate-300" : "text-slate-900"}`}>
                  <option value="" disabled>Select a role</option>
                  {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
              {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={form.password} onChange={(e) => set("password")(e.target.value)}
                  placeholder="Min. 8 characters" className={`${inputBase} pr-11 ${errors.password ? inputErr : inputOk}`}/>
                <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  {showPw
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  }
                </button>
              </div>
              <StrengthBar password={form.password}/>
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            {/* Confirm password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Confirm Password</label>
              <div className="relative">
                <input type={showConfirm ? "text" : "password"} value={form.confirmPassword} onChange={(e) => set("confirmPassword")(e.target.value)}
                  placeholder="Repeat password" className={`${inputBase} pr-11 ${errors.confirmPassword ? inputErr : inputOk}`}/>
                <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  {showConfirm
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  }
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className={`mt-0.5 w-5 h-5 flex-shrink-0 rounded-md border-2 flex items-center justify-center transition-all
                  ${form.agreed ? "bg-[#ff8c00] border-[#ff8c00]" : errors.agreed ? "border-red-400" : "border-slate-300 group-hover:border-[#ff8c00]/50"}`}
                  onClick={() => set("agreed")(!form.agreed)}>
                  {form.agreed && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="w-3 h-3"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <span className="text-xs text-slate-500 leading-relaxed">
                  I agree to the <span className="text-[#ff8c00] font-semibold hover:underline cursor-pointer">Terms of Service</span> and{" "}
                  <span className="text-[#ff8c00] font-semibold hover:underline cursor-pointer">Privacy Policy</span>
                </span>
              </label>
              {errors.agreed && <p className="text-xs text-red-500 mt-1">{errors.agreed}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full h-12 bg-[#ff8c00] hover:bg-orange-600 disabled:opacity-70 text-white font-bold rounded-xl transition-all active:scale-[.98] shadow-lg shadow-orange-200 flex items-center justify-center gap-2 text-sm">
              {loading ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> : null}
              {loading ? "Creating Account…" : "Create Admin Account"}
            </button>

            <p className="text-center text-sm text-slate-400">
              Already have an account?{" "}
              <button type="button" className="font-semibold text-[#ff8c00] hover:text-orange-700 transition-colors">Sign In</button>
            </p>
          </form>
        )}

        <div className="h-1" style={{background:"linear-gradient(to right,rgba(255,140,0,.12),#ff8c00,rgba(255,140,0,.12))"}}/>
      </div>
    </div>
  );
}