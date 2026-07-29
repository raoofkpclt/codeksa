import { useState, useEffect, useRef } from "react";
import ClientAuthService from "../../service/firebaseService/clientAuth";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [mounted, setMounted] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();

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

  const validatePassword = (pwd: string) => {
    if (/\s/.test(pwd)) {
      return "Password cannot contain spaces.";
    }
    if (pwd.length < 8) {
      return "Password must be at least 8 characters.";
    }
    return "";
  };

  const handleRegister = async () => {
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword || !trimmedConfirm) {
      setError("All fields are required.");
      return;
    }

    const passwordError = validatePassword(trimmedPassword);
    if (passwordError) {
      setError(passwordError);
      passRef.current?.focus();
      return;
    }

    if (trimmedPassword !== trimmedConfirm) {
      setError("Passwords do not match.");
      setConfirmPassword("");
      confirmRef.current?.focus();
      return;
    }

    setLoading(true);
    try {
      await ClientAuthService.register(
        trimmedName,
        trimmedEmail,
        trimmedPassword,
      );
      console.log("saved");

      navigate("/client/onboarding");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Could not create account. Try again.");
      }
      setPassword("");
      setConfirmPassword("");

      passRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      emailRef.current?.focus();
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
      confirmRef.current?.focus();
    }
  };

  const handleConfirmKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleRegister();
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-8 bg-[#0B0B0F] font-sans [font-family:'Inter',sans-serif]">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none bg-[length:40px_40px]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)",
        }}
      />

      {/* Purple ambient glow */}
      <div className="absolute pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.07)_0%,transparent_70%)]" />

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
          CLIENT ACCESS
        </div>

        {/* Title */}
        <h1 className="text-[28px] font-black text-white tracking-[-0.02em] uppercase leading-[1.1] mb-[0.4rem]">
          CODE
          <br />
          PORTAL
        </h1>

        {/* Divider */}
        <div className="h-px my-6 bg-[linear-gradient(90deg,rgba(255,255,255,0.12)_0%,transparent_100%)]" />

        {/* Company Name */}
        <div
          className={`mb-5 transition-all duration-500 delay-[50ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <label className="block text-[10px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-2">
            Company Name
          </label>

          <div
            className={`relative flex items-center border transition-colors duration-200 ${
              nameFocused
                ? "border-[#8B5CF6] bg-[#8B5CF6]/[0.04]"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <input
              ref={nameRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              onKeyDown={handleNameKeyDown}
              placeholder="Company Name"
              className="w-full bg-transparent outline-none text-white text-sm px-4 py-3 placeholder:text-white/20 placeholder:font-light"
            />
          </div>
        </div>

        {/* Email field */}
        <div
          className={`mb-5 transition-all duration-500 delay-[150ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
            className={`relative flex items-center border transition-colors duration-200 ${
              emailFocused
                ? "border-[#8B5CF6] bg-[#8B5CF6]/[0.04]"
                : "border-white/10 bg-white/[0.03]"
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
              placeholder="client@code.agency"
              autoComplete="email"
              className="flex-1 bg-transparent border-none outline-none text-white text-sm font-normal font-inherit py-3 pr-3 pl-2.5 tracking-[0.01em] placeholder:text-white/20 placeholder:font-light"
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
          className={`mb-2 transition-all duration-500 delay-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
            className={`relative flex items-center border transition-colors duration-200 ${
              passFocused
                ? "border-[#8B5CF6] bg-[#8B5CF6]/[0.04]"
                : "border-white/10 bg-white/[0.03]"
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
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPassFocused(true)}
              onBlur={() => setPassFocused(false)}
              onKeyDown={handlePassKeyDown}
              placeholder="••••••••••••"
              autoComplete="new-password"
              className="flex-1 bg-transparent border-none outline-none text-white text-sm font-normal font-inherit py-3 pr-2 pl-2.5 tracking-[0.1em] placeholder:text-white/20 placeholder:font-light"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              className="flex-shrink-0 mr-3 text-white/30 hover:text-white/60 transition-colors"
            >
              {showPassword ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" y1="2" x2="22" y2="22" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
            {passFocused && (
              <span className="text-[10px] text-white/20 tracking-[0.05em] bg-white/5 border border-white/10 px-1.5 py-0.5 font-mono mr-2.5 whitespace-nowrap flex-shrink-0">
                ↵ NEXT
              </span>
            )}
          </div>
        </div>

        {/* Confirm Password */}
        <div
          className={`mb-5 mt-5 transition-all duration-500 delay-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <label className="block text-[10px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-2">
            Confirm Password
          </label>

          <div
            className={`relative flex items-center border transition-colors duration-200 ${
              confirmFocused
                ? "border-[#8B5CF6] bg-[#8B5CF6]/[0.04]"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <input
              ref={confirmRef}
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setConfirmFocused(true)}
              onBlur={() => setConfirmFocused(false)}
              onKeyDown={handleConfirmKeyDown}
              placeholder="••••••••••••"
              autoComplete="new-password"
              className="w-full bg-transparent outline-none text-white text-sm pl-4 pr-2 py-3 tracking-[0.1em] placeholder:text-white/20 placeholder:font-light"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              tabIndex={-1}
              className="flex-shrink-0 mr-3 text-white/30 hover:text-white/60 transition-colors"
            >
              {showConfirmPassword ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" y1="2" x2="22" y2="22" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
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

        {/* Register button */}
        <button
          ref={btnRef}
          onClick={handleRegister}
          disabled={loading}
          className={`w-full mt-2 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-500/40 disabled:cursor-not-allowed text-white text-[11px] font-bold tracking-[0.15em] uppercase py-4 transition-colors duration-200 flex items-center justify-center gap-2 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
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
          {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
        </button>

        {/* Footer */}
        <div className="flex items-center gap-2 mt-6">
          <div className="w-1 h-1 rounded-full bg-[#8B5CF6] flex-shrink-0" />
        </div>
        <p className="text-center text-sm text-white/40">
          Already have an account?{" "}
          <Link
            to="/client/login"
            className="font-semibold text-violet-500 transition hover:text-violet-400"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
