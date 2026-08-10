import { useEffect, useState } from "react";
import clientAuth from "../../service/firebaseService/clientAuth";
import { useNavigate } from "react-router-dom";

import {
  doc,
  onSnapshot,
} from "firebase/firestore";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  auth,
  db,
} from "../../config/firebase/firebase";

const labelBase = "text-xs tracking-[0.2em] text-white/40";
const glowSpan =
  "font-semibold text-white transition-all duration-500 ease-out hover:text-[#8468FF] hover:scale-[1.01] hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)] hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]";

const Onboarding = () => {
  const navigate = useNavigate();

  const [checking, setChecking] =
    useState(true);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    let unsubscribeClient:
      | (() => void)
      | undefined;

    // Wait until Firebase Auth is ready
    const unsubscribeAuth =
      onAuthStateChanged(
        auth,
        (user) => {
          if (!user) {
            navigate(
              "/client/login",
              { replace: true }
            );

            return;
          }

          // Listen to current client document
          const clientRef = doc(
            db,
            "clients",
            user.uid
          );

          unsubscribeClient =
            onSnapshot(
              clientRef,
              (snapshot) => {
                setChecking(false);

                if (!snapshot.exists()) {
                  console.error(
                    "Client document not found"
                  );

                  return;
                }

                const client =
                  snapshot.data();

                console.log(
                  "Client status updated:",
                  client
                );

                // Admin approved client
                if (
                  client.active === true &&
                  client.onboarding === true
                ) {
                  navigate(
                    "/client/home",
                    { replace: true }
                  );
                }
              },
              (error) => {
                setChecking(false);

                console.error(
                  "Client listener error:",
                  error
                );
              }
            );
        }
      );

    return () => {
      unsubscribeAuth();

      if (unsubscribeClient) {
        unsubscribeClient();
      }
    };
  }, [navigate]);

  const handleLogout = async () => {
    await clientAuth.logout();

    navigate(
      "/client/login",
      { replace: true }
    );
  };

  if (checking) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-black text-white">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
          * { font-family: 'Space Grotesk', sans-serif; font-synthesis: none; }
        `}</style>

        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#8468FF]" />

          <p className={`mt-4 ${labelBase}`}>
            CHECKING ACCOUNT STATUS
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-black text-white px-6 md:px-10 lg:px-16 py-16 sm:py-20 md:py-28">
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
        <p className={`${labelBase} mb-4`}>CLIENT PORTAL</p>

        {/* Headline */}
        <h1 className="font-['Space_Grotesk',sans-serif] font-light text-[clamp(2.25rem,5.5vw,3.25rem)] leading-[1.05] tracking-[-0.03em] mb-6">
          Account under
          <br />
          <span className={glowSpan}>review.</span>
        </h1>

        {/* Subtext */}
        <p className="font-['Space_Grotesk',sans-serif] text-white/50 text-base leading-relaxed mb-10 max-w-sm">
          Your account has been created successfully. It's currently being
          reviewed by the administrator — you'll get access as soon as it's
          approved.
        </p>

        {/* Status icon */}
        <div className="mb-10 flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-[#8468FF]/40 bg-[#8468FF]/[0.06]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8468FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 8v4l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <div>
            <p className="text-sm font-medium text-white">
              Waiting for approval
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />

              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-amber-400">
                Live approval check
              </span>
            </div>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="w-full border border-red-500/40 py-4 text-xs font-medium uppercase tracking-[0.2em] text-red-400 transition-colors duration-200 hover:bg-red-500/10 hover:text-red-300"
        >
          Logout
        </button>

        {/* Footer */}
        <p className={`${labelBase} mt-8`}>
          CODE &middot; STRUCTURED MARKETING
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
