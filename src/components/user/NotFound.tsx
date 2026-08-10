import React from "react";
import { Link } from "react-router-dom";


/**
 * NotFound (404) page
 * ---------------------------------------------------------
 * Matches the CODE Operating System dark theme used across
 * the rest of the site (Space Grotesk display type, violet
 * accent, charcoal background).
 * ---------------------------------------------------------
 */
const NotFound: React.FC = () => {
  return (
    <>
     

      <div className="min-h-screen bg-[#0a0a0b] text-white font-inter selection:bg-violet-300 selection:text-black">
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
        `}</style>

        <main className="mx-auto flex min-h-screen max-w-[1440px] flex-col items-center justify-center px-8 text-center lg:px-16">
          <span className="font-['Space_Grotesk',sans-serif] text-[clamp(96px,18vw,220px)] font-light leading-none tracking-[-0.06em] text-white">
            404
          </span>

          <h1 className="mt-4 font-['Space_Grotesk',sans-serif] text-[clamp(28px,4vw,42px)] font-semibold tracking-[-0.02em] text-white">
            Page not found
          </h1>

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-neutral-500">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <Link
            to="/"
            className="mt-12 inline-flex items-center justify-center rounded-full bg-[var(--code-purple)] px-8 py-3 text-[13px] font-medium tracking-[0.02em] text-white transition-colors duration-200 hover:bg-[var(--code-electric)]"
          >
            Go home
          </Link>
        </main>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default NotFound;
