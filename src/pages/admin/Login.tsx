import { useState, useEffect, useRef } from "react";
import AuthService from "../../service/firebaseService/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const [mounted, setMounted] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();

  // useEffect(() => {
  //   setMounted(true);
  //   const timer = setTimeout(() => {
  //     emailRef.current?.focus();
  //   }, 650);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
  const id = requestAnimationFrame(() => {
    setMounted(true);
  });

  const timer = setTimeout(() => {
    emailRef.current?.focus();
  }, 650);

  return () => {
    cancelAnimationFrame(id);
    clearTimeout(timer);
  };
}, []);

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      const user = await AuthService.login(email, password);
      console.log("Logged In", user.user);
      navigate("/admin/home");
    } catch (err: unknown) {
      if (err instanceof Error){
      setError(err.message || "Invalid credentials. Try again.");
      }
      setPassword("");
      passRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passRef.current?.focus();
    }
  };

  const handlePassKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-8 bg-[#0B0B0F] font-['Inter',sans-serif]">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none bg-[length:40px_40px]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)",
        }}
      />

      {/* Purple ambient glow */}
      <div className="absolute pointer-events-none w-[600px] h-[600px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(139,92,246,0.07)_0%,transparent_70%)]" />

      {/* Card */}
      <div
        className={`relative w-full max-w-md bg-white/[0.03] border border-white/[0.08] p-10 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Open-corner frames — CODE brand signature */}
        <span className="absolute -top-px -left-px w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-[#8B5CF6]" />
        <span className="absolute -top-px -right-px w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-[#8B5CF6]" />
        <span className="absolute -bottom-px -left-px w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-[#8B5CF6]" />
        <span className="absolute -bottom-px -right-px w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-[#8B5CF6]" />

        {/* Tag */}
        <div className="inline-block mb-6 border border-[#8B5CF6] text-[#8B5CF6] text-[10px] font-semibold tracking-[0.15em] px-2.5 py-[3px]">
          ADMIN ACCESS
        </div>

        {/* Title */}
        <h1 className="text-[28px] font-black text-white tracking-[-0.02em] uppercase leading-[1.1] mb-1.5">
          CODE
          <br />
          PORTAL
        </h1>

        {/* Divider */}
        <div className="h-px my-6 bg-[linear-gradient(90deg,rgba(255,255,255,0.12)_0%,transparent_100%)]" />

        {/* Email field */}
        <div
          className={`mb-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[150ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <label
            htmlFor="email"
            className="block text-[10px] font-semibold tracking-[0.12em] text-white/40 uppercase mb-2"
          >
            Email address
          </label>
          <div
            className={`relative flex items-center transition-colors duration-200 ${
              emailFocused
                ? "border border-[#8B5CF6] bg-[#8B5CF6]/[0.04]"
                : "border border-white/10 bg-white/[0.03]"
            }`}
          >
            <svg
              className="flex-shrink-0 ml-3 transition-[stroke] duration-200"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={emailFocused ? "#8B5CF6" : "rgba(255,255,255,0.25)"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <input
              ref={emailRef}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              onKeyDown={handleEmailKeyDown}
              placeholder="admin@code.agency"
              autoComplete="email"
              className="flex-1 bg-transparent border-none outline-none text-white text-sm font-normal py-3 pr-3 pl-2.5 tracking-[0.01em] font-[inherit] placeholder:text-white/20 placeholder:font-light"
            />
            {emailFocused && (
              <span className="text-[10px] text-white/20 tracking-[0.05em] bg-white/5 border border-white/10 px-1.5 py-0.5 font-mono mr-2.5 whitespace-nowrap flex-shrink-0">
                ↵ ENTER
              </span>
            )}
          </div>
        </div>

        {/* Password field */}
        <div
          className={`mb-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[250ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <label
            htmlFor="password"
            className="block text-[10px] font-semibold tracking-[0.12em] text-white/40 uppercase mb-2"
          >
            Password
          </label>
          <div
            className={`relative flex items-center transition-colors duration-200 ${
              passFocused
                ? "border border-[#8B5CF6] bg-[#8B5CF6]/[0.04]"
                : "border border-white/10 bg-white/[0.03]"
            }`}
          >
            <svg
              className="flex-shrink-0 ml-3 transition-[stroke] duration-200"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={passFocused ? "#8B5CF6" : "rgba(255,255,255,0.25)"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              ref={passRef}
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPassFocused(true)}
              onBlur={() => setPassFocused(false)}
              onKeyDown={handlePassKeyDown}
              placeholder="••••••••••••"
              autoComplete="current-password"
              className="flex-1 bg-transparent border-none outline-none text-white text-sm font-normal py-3 pr-3 pl-2.5 tracking-[0.1em] font-[inherit] placeholder:text-white/20 placeholder:font-light"
            />
            {passFocused && (
              <span className="text-[10px] text-white/20 tracking-[0.05em] bg-white/5 border border-white/10 px-1.5 py-0.5 font-mono mr-2.5 whitespace-nowrap flex-shrink-0">
                ↵ LOGIN
              </span>
            )}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <p className="text-[11px] text-red-400 tracking-[0.05em] mt-3 flex items-center gap-1.5">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </p>
        )}

        {/* Login button */}
        <button
          ref={btnRef}
          onClick={handleLogin}
          disabled={loading}
          className={`w-full mt-5 border-none text-white text-[11px] font-bold tracking-[0.15em] uppercase py-4 flex items-center justify-center gap-2 transition-colors duration-200 font-[inherit] ${
            loading ? "bg-[#8B5CF6]/40 cursor-not-allowed" : "bg-[#8B5CF6] cursor-pointer hover:bg-[#7c3aed]"
          } ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {loading && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="animate-spin"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          )}
          {loading ? "AUTHENTICATING" : "AUTHENTICATE"}
        </button>

        {/* Footer */}
        <div className="flex items-center gap-2 mt-6">
          <div className="w-1 h-1 rounded-full bg-[#8B5CF6] flex-shrink-0" />
          <span className="text-[10px] text-white/20 tracking-[0.08em] uppercase">
            CODE — STRUCTURED MARKETING
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;