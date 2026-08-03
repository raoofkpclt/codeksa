import React from "react";
import { Link } from 'react-router-dom'

// const accentLine =
//   "w-6 h-px bg-gradient-to-r from-fuchsia-400 to-violet-500 inline-block";

const Conversation: React.FC = () => {
  return (
    <div>
      {/* CTASection */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-16 sm:py-24 md:py-36">
  <div className="group max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-12">
    <div>
      <p className="text-xs tracking-[0.2em] text-white/40 mb-8 sm:mb-10">
        START A CONVERSATION
      </p>

      <Link to="/contact">
        <h2
          className="
            max-w-[1400px]
            font-['Space_Grotesk',sans-serif]
            text-[clamp(72px,10vw,130px)]
            font-light
            leading-[0.9]
            tracking-[-0.06em]
            text-white
            transition-all
            duration-500
            group-hover:text-[#8a6dff]
            group-hover:scale-[1.01]
            group-hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]
          "
        >
          <span>Let&apos;s clarify</span>
          <br />
          <span>what your business needs</span>
        </h2>
      </Link>

      <p className="mt-8 sm:mt-10 max-w-md text-white/50 text-base sm:text-lg leading-relaxed">
        Start with a conversation about the challenge, the required outcome
        and the right place to begin.
      </p>
    </div>

    <div className="md:pt-2">
      <Link
        to="/contact"
        className="
          inline-block
          font-bold
          text-[clamp(3.5rem,13vw,6rem)]
          leading-none
          text-white
          transition-all
          duration-500
          group-hover:text-[#8a6dff]
          group-hover:scale-[1.01]
          group-hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]
        "
      >
        next.
      </Link>
    </div>
  </div>
</section>
    </div>
  );
};

export default Conversation;
