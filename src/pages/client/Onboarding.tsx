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

const Onboarding = () => {
  const navigate = useNavigate();

  const [checking, setChecking] =
    useState(true);

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
      <div className="flex min-h-screen items-center justify-center bg-[#0B0B0F]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-violet-500" />

          <p className="mt-4 text-xs uppercase tracking-[0.15em] text-white/40">
            Checking Account Status
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0B0F] p-8">

      {/* Grid Background */}
      <div
        className="absolute inset-0 bg-[length:40px_40px]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)",
        }}
      />

      {/* Purple Glow */}
      <div className="absolute h-[650px] w-[650px] rounded-full bg-violet-600/10 blur-[120px]" />

      {/* Card */}
      <div className="relative w-full max-w-lg border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">

        {/* Corner Borders */}
        <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-violet-500" />

        <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-violet-500" />

        <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-violet-500" />

        <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-violet-500" />

        {/* Badge */}
        <span className="inline-block border border-violet-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-400">
          Client Portal
        </span>

        {/* Title */}
        <h1 className="mt-6 text-3xl font-black uppercase tracking-tight text-white">
          Account Under Review
        </h1>

        <div className="mt-4 h-[2px] w-20 bg-violet-500" />

        {/* Icon */}
        <div className="mt-10 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-violet-500 bg-violet-500/10">

            <svg
              className="h-10 w-10 text-violet-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

          </div>
        </div>

        {/* Message */}
        <h2 className="mt-8 text-center text-xl font-bold text-white">
          Waiting for Approval
        </h2>

        <p className="mt-4 text-center text-sm leading-7 text-white/50">
          Your account has been created successfully.
          <br />
          It is currently under review by the administrator.
          <br />
          You'll receive access once your account has been approved.
        </p>

        {/* Live Status */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-400">
            Live Approval Check
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-10 w-full border border-red-500 py-3 text-sm font-bold uppercase tracking-[0.15em] text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white"
        >
          Logout
        </button>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="h-1 w-1 rounded-full bg-violet-500" />

          <span className="text-[10px] uppercase tracking-[0.15em] text-white/30">
            CODE • Structured Marketing
          </span>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;