import React from 'react'

const Conversation :React.FC= () => {
  return (
    <div>
      {/* CTASection */}
      <section className="border-t border-[var(--steel)]">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-16 md:py-32">
          <span className="mb-8 block font-['Space_Grotesk',sans-serif] text-[11px] font-medium uppercase tracking-[0.30em] text-[var(--slate-muted)]">
            Start a Conversation
          </span>

          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <h2 className="max-w-[640px] font-['Space_Grotesk',sans-serif] text-[clamp(34px,5vw,56px)] font-light leading-[1.15] text-[var(--code-white)]">
              Let&rsquo;s clarify what your business needs
            </h2>
            <span className="font-['Space_Grotesk',sans-serif] text-[clamp(56px,9vw,120px)] font-bold leading-none text-[var(--code-white)]">
              next.
            </span>
          </div>

          <p className="mt-10 max-w-[560px] font-['Space_Grotesk',sans-serif] text-[16px] leading-[1.6] text-[var(--mist)]">
            Start with a conversation about the challenge, the required
            outcome and the right place to begin.
          </p>

          <a
            href="/start-a-conversation"
            className="mt-12 inline-flex items-center gap-2 rounded-[4px] border border-[var(--code-purple)] bg-[var(--charcoal)] px-6 py-4 font-['Space_Grotesk',sans-serif] text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--code-white)] transition-all duration-200 hover:border-[var(--violet-glow)] hover:shadow-[0_0_0_3px_rgba(139,92,246,0.25)]"
          >
            Start a Conversation
          </a>
        </div>
      </section>
    </div>
  )
}

export default Conversation
