import { useState, useEffect, useRef } from "react";
import ClientAuthService from "../../service/firebaseService/clientAuth";
import { Link, useNavigate } from "react-router-dom";

const labelBase = "text-xs tracking-[0.2em] text-white/40";
// const accentLine = "w-6 h-px bg-[#8468FF] inline-block";
const glowSpan =
  "font-semibold text-white transition-all duration-500 ease-out hover:text-[#8468FF] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [mounted, setMounted] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
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
      nameRef.current?.focus();
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
    const trimmedCompany = company.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (
      !trimmedName ||
      !trimmedCompany ||
      !trimmedEmail ||
      !trimmedPassword ||
      !trimmedConfirm
    ) {
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
      // NOTE: passing company as the 4th argument — adjust the order/name
      // here to match whatever signature you just updated
      // ClientAuthService.register to accept (e.g. it may expect an object
      // like { name, email, password, company } instead of positional args).
      await ClientAuthService.register(
        trimmedName,
        trimmedEmail,
        trimmedPassword,
        trimmedCompany,
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
      companyRef.current?.focus();
    }
  };

  const handleCompanyKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    <div className="relative flex items-center justify-center min-h-screen bg-black text-white overflow-x-hidden px-6 md:px-10 lg:px-16 py-16 sm:py-20 md:py-28">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        :root {
          --charcoal: #151518;
          --graphite: #1E1F24;
          --steel: #2B2C31;
          --slate-muted: #7D7D86;
          --mist: #D8D8DE;
          --code-white: #FFFFFF;
          --code-purple: #6F4BFF;
          --code-electric: #8468FF;
          --violet-glow: #9B83FF;
        }

        body {
          font-family: 'Space Grotesk', sans-serif;
        }

        * { font-synthesis: none; }

        .hover-glow:hover {
          color: var(--violet-glow) !important;
          text-shadow: 0 0 14px rgba(155, 131, 255, 0.55);
        }

        .glow-text {
          color: var(--violet-glow);
          text-shadow: 0 0 22px rgba(155, 131, 255, 0.55);
        }
      `}</style>

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none bg-[length:40px_40px]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(132,104,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(132,104,255,0.05) 1px, transparent 1px)",
        }}
      />

      <div
        className={`relative max-w-lg transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Logo / wordmark */}
        <div className="flex items-center gap-2.5 mb-16">
          <div className="w-7 h-7 flex items-center justify-center border border-white/15 text-white text-sm font-semibold font-['Space_Grotesk',sans-serif]">
            C
          </div>
          <span className="text-white text-[13px] font-medium tracking-[0.08em] font-['Space_Grotesk',sans-serif]">
            CODE HUB
            <sup className="text-[8px] ml-0.5">™</sup>
          </span>
        </div>

        {/* Tag */}
        <p className={`${labelBase} mb-4`}>REQUEST ACCESS</p>

        {/* Headline */}
        <h1 className="font-['Space_Grotesk',sans-serif] font-light text-[clamp(2.5rem,6vw,3.5rem)] leading-[1.05] tracking-[-0.03em] mb-6">
          Create your
          <br />
          <span className={glowSpan}>account.</span>
        </h1>

        {/* Subtext */}
        <p className="font-['Space_Grotesk',sans-serif] text-white/50 text-base leading-relaxed mb-10 max-w-sm">
          CODE Hub&trade; is where work is shared, reviewed and approved.
        </p>

        {/* Name field */}
        <div className="mb-6">
          <label htmlFor="name" className={`block ${labelBase} mb-2`}>
            NAME <span className="text-[#8468FF]">*</span>
          </label>
          <input
            ref={nameRef}
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleNameKeyDown}
            autoComplete="name"
            className="w-full bg-transparent border border-white/15 outline-none text-white text-sm font-normal font-['Space_Grotesk',sans-serif] py-3.5 px-4 tracking-[0.01em] focus:border-[#8468FF] transition-colors duration-200"
          />
        </div>

        {/* Company field */}
        <div className="mb-6">
          <label htmlFor="company" className={`block ${labelBase} mb-2`}>
            COMPANY <span className="text-[#8468FF]">*</span>
          </label>
          <input
            ref={companyRef}
            id="company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            onKeyDown={handleCompanyKeyDown}
            autoComplete="organization"
            className="w-full bg-transparent border border-white/15 outline-none text-white text-sm font-normal font-['Space_Grotesk',sans-serif] py-3.5 px-4 tracking-[0.01em] focus:border-[#8468FF] transition-colors duration-200"
          />
        </div>

        {/* Email field */}
        <div className="mb-6">
          <label htmlFor="email" className={`block ${labelBase} mb-2`}>
            EMAIL <span className="text-[#8468FF]">*</span>
          </label>
          <input
            ref={emailRef}
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleEmailKeyDown}
            autoComplete="email"
            className="w-full bg-transparent border border-white/15 outline-none text-white text-sm font-normal font-['Space_Grotesk',sans-serif] py-3.5 px-4 tracking-[0.01em] focus:border-[#8468FF] transition-colors duration-200"
          />
        </div>

        {/* Password field */}
        <div className="mb-6">
          <label htmlFor="password" className={`block ${labelBase} mb-2`}>
            PASSWORD <span className="text-[#8468FF]">*</span>
          </label>
          <div className="relative flex items-center border border-white/15 focus-within:border-[#8468FF] transition-colors duration-200">
            <input
              ref={passRef}
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handlePassKeyDown}
              autoComplete="new-password"
              className="w-full bg-transparent outline-none text-white text-sm font-normal font-['Space_Grotesk',sans-serif] py-3.5 px-4 tracking-[0.1em]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              className="flex-shrink-0 mr-4 text-white/30 hover:text-white/60 transition-colors"
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
          </div>
        </div>

        {/* Confirm Password field */}
        <div className="mb-8">
          <label htmlFor="confirmPassword" className={`block ${labelBase} mb-2`}>
            CONFIRM PASSWORD <span className="text-[#8468FF]">*</span>
          </label>
          <div className="relative flex items-center border border-white/15 focus-within:border-[#8468FF] transition-colors duration-200">
            <input
              ref={confirmRef}
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={handleConfirmKeyDown}
              autoComplete="new-password"
              className="w-full bg-transparent outline-none text-white text-sm font-normal font-['Space_Grotesk',sans-serif] py-3.5 px-4 tracking-[0.1em]"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              tabIndex={-1}
              className="flex-shrink-0 mr-4 text-white/30 hover:text-white/60 transition-colors"
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
          <p className="text-[11px] text-red-400 tracking-[0.05em] -mt-4 mb-6 flex items-center gap-1.5 font-['Space_Grotesk',sans-serif]">
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
          className={`w-full border-none text-white font-['Space_Grotesk',sans-serif] text-xs font-medium tracking-[0.2em] uppercase py-4 flex items-center justify-center gap-2 transition-colors duration-200 ${
            loading
              ? "bg-[#8468FF]/40 cursor-not-allowed"
              : "bg-[#8468FF] hover:bg-[#6F4BFF] cursor-pointer"
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
          {loading ? "Creating account" : "Create account"}
        </button>

        {/* Footer */}
        <p className={`${labelBase} mt-8`}>
          ALREADY HAVE ACCESS?{" "}
          <Link
            to="/client/login"
            className="hover-glow text-white/70 transition-colors duration-200"
          >
            SIGN IN
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
