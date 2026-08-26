import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import NavbarNew from '../../components/user/NavbarNew'
import Footer from '../../components/user/Footer'
import Conversation from '../../components/user/Conversation'

const industryOptions = [
  'Automotive',
  'Hospitality',
  'Retail',
  'Professional Services',
  'Real Estate',
  'Healthcare',
  'Construction',
  'Industrial',
  'Growing Businesses',
  'Other',
]

const pathwayOptions = ['Not sure yet' ,'Strategy & Growth', 'Brand & Creative', 'Digital & Performance', 'Marketing Operations & Systems']

const engagementOptions = ['Not sure yet' ,'CODE Essentials', 'Foundation', 'Growth', 'Partnership']

const contactMethodOptions = ['Email', 'WhatsApp', 'Phone call']

interface FormState {
  name: string
  company: string
  jobTitle: string
  businessEmail: string
  mobileNumber: string
  country: string
  industry: string
  relevantPathway: string
  preferredEngagement: string
  preferredContactMethod: string
  businessChallenge: string
  shortMessage: string
}

const initialState: FormState = {
  name: '',
  company: '',
  jobTitle: '',
  businessEmail: '',
  mobileNumber: '',
  country: '',
  industry: '',
  relevantPathway: '',
  preferredEngagement: '',
  preferredContactMethod: '',
  businessChallenge: '',
  shortMessage: '',
}

const fieldBase =
  'w-full bg-transparent border-b border-white/15 focus:border-white/60 outline-none py-3 text-white placeholder:text-white/25 transition-colors'

const labelBase = 'text-xs tracking-[0.2em] text-white/40'

const WHATSAPP_URL = 'https://wa.me/966555922650'
const PHONE_TEL = 'tel:+966555922650'
const PHONE_DISPLAY = '+966 55 592 2650'

// From your EmailJS dashboard (dashboard.emailjs.com) — sends every
// submission straight to whatever inbox your EmailJS service points to.
const EMAILJS_SERVICE_ID = 'service_dcquaqo'
const EMAILJS_TEMPLATE_ID = 'template_rn53zyf'
const EMAILJS_PUBLIC_KEY = 'urNmRjYaYle3QpZ9Q' // Account > General in the EmailJS dashboard
// const ENQUIRY_RECEIVING_EMAIL = 'info@codeksaofficial.com'
const ENQUIRY_RECEIVING_EMAIL = 'codeksaofficila@gmail.com'

/* ---------------------------------------------------------
   ContactChoiceModal — lets the visitor pick WhatsApp or a
   phone call before leaving the site
--------------------------------------------------------- */
const ContactChoiceModal = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) => {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-5 sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-choice-title"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-sm bg-[var(--graphite)] border border-white/10 px-6 py-8 sm:px-8 sm:py-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-white/40 hover:text-white transition-colors text-xl leading-none"
        >
          &times;
        </button>

        <p className={labelBase}>CONTACT</p>
        <h3
          id="contact-choice-title"
          className="mt-4 text-2xl sm:text-3xl font-light text-white"
        >
          How should we talk?
        </h3>
        <p className="mt-2 text-sm text-white/50 leading-relaxed">
          Choose WhatsApp or a phone call — same number either way.
        </p>

        <div className="mt-8 space-y-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-between border border-white/15 px-5 py-4 text-white hover:border-white/40 hover:bg-white/[0.03] transition-colors"
          >
            <span>
              <span className="block text-xs tracking-[0.2em] text-white/40 mb-1">
                WHATSAPP
              </span>
              <span className="block text-base sm:text-lg">{PHONE_DISPLAY}</span>
            </span>
            <span className="text-violet-400 text-lg">&rarr;</span>
          </a>

          <a
            href={PHONE_TEL}
            onClick={onClose}
            className="flex items-center justify-between border border-white/15 px-5 py-4 text-white hover:border-white/40 hover:bg-white/[0.03] transition-colors"
          >
            <span>
              <span className="block text-xs tracking-[0.2em] text-white/40 mb-1">
                CALL
              </span>
              <span className="block text-base sm:text-lg">{PHONE_DISPLAY}</span>
            </span>
            <span className="text-violet-400 text-lg">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  )
}

const StartAConversation: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          ...form,
          // Common EmailJS template variable for the "Reply To" field
          reply_to: form.businessEmail,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )

      setStatus('success')
      setForm(initialState)
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
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
      <NavbarNew />

      {/* Hero */}
      <section className="px-5 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16 md:px-10 md:pt-40 md:pb-20 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-xs tracking-[0.2em] text-white/40 mb-8 sm:mb-12 md:mb-24">
            <span>HOME</span>
            <span>/</span>
            <span className="text-white/70">START A CONVERSATION</span>
          </div>

          <p className="text-xs tracking-[0.3em] text-white/40 mb-5 sm:mb-6">
            START A CONVERSATION
          </p>

          <h1 className="max-w-[1050px] font-['Space_Grotesk',sans-serif] text-[40px] font-light leading-[1.05] tracking-[-0.02em] text-[var(--code-white)] sm:text-[64px] sm:leading-[0.95] sm:tracking-[-0.04em] md:text-[clamp(72px,10vw,160px)] md:leading-[0.9] md:tracking-[-0.06em]">
  <span className="font-light">
    Let&rsquo;s clarify what your
  </span>
 
  <span className="font-light">
    business needs <span className="font-bold  text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">next.</span>
  </span>
</h1>

          <p className="mt-6 sm:mt-8 md:mt-10 max-w-[700px] text-white/50 text-sm leading-relaxed sm:text-base md:text-lg">
            Start with a conversation about the challenge, the required outcome
            and the right place to begin.
          </p>
        </div>
      </section>

      {/* Quick contact row */}
      <section className="">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2">
          <div className="px-5 py-8 sm:px-6 sm:py-10  md:px-10 lg:px-16 border-white/10">
            <span className="inline-block w-6 h-px bg-[#8468FF] mb-4" />
            <p className={labelBase}>EMAIL</p>
            <a
              href="mailto:info@codeksaofficial.com"
              className="mt-3 block text-base break-words hover:text-white/70 transition-colors sm:text-lg md:text-xl"
            >
              info@codeksaofficial.com
            </a>
          </div>

          <div className="px-5 py-8 sm:px-6 sm:py-10 md:px-10 lg:px-16">
            <span className="inline-block w-6 h-px bg-[#8468FF] mb-4" />
            <p className={labelBase}>WHATSAPP / CALL</p>
            <button
              type="button"
              onClick={() => setContactModalOpen(true)}
              className="mt-3 flex items-center gap-3 text-base hover:text-white/70 transition-colors sm:text-lg md:text-xl"
            >
              {PHONE_DISPLAY}
              <span className="text-violet-400 text-base sm:text-lg">&rarr;</span>
            </button>
          </div>
        </div>
      </section>

      <ContactChoiceModal
        open={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      {/* Contact info + Form */}
      <section className=" border-white/10 px-5 py-16 sm:px-6 sm:py-24 md:px-10 md:py-32 lg:px-16">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,320px)_1fr] gap-10 sm:gap-12 md:gap-24">
          {/* Left: static contact card */}
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            <div>
              <p className={labelBase}>CONTACT</p>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] text-white/40 mb-3">CODE</p>
              <p className="text-base sm:text-lg">Client Enquiries</p>
              <p className="text-white/50 text-sm sm:text-base">Saudi Arabia &middot; MENA</p>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] text-white/40 mb-3">EMAIL</p>
              <a
                href="mailto:info@codeksaofficial.com"
                className="text-base sm:text-lg hover:text-white/70 transition-colors break-words"
              >
                info@codeksaofficial.com
              </a>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] text-white/40 mb-3">
                PHONE / WHATSAPP
              </p>
              <p className="text-base sm:text-lg">{PHONE_DISPLAY}</p>
              <button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="text-white/50 hover:text-white/80 transition-colors text-sm sm:text-base"
              >
                WhatsApp or call &rarr;
              </button>
            </div>
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-12 md:space-y-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 sm:gap-y-10">
              <div>
                <label className={labelBase} htmlFor="name">
                  NAME <span className="text-purple-400">*</span>
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={handleChange('name')}
                  className={`${fieldBase} mt-3`}
                />
              </div>

              <div>
                <label className={labelBase} htmlFor="company">
                  COMPANY <span className="text-purple-400">*</span>
                </label>
                <input
                  id="company"
                  required
                  value={form.company}
                  onChange={handleChange('company')}
                  className={`${fieldBase} mt-3`}
                />
              </div>

              <div>
                <label className={labelBase} htmlFor="jobTitle">
                  JOB TITLE
                </label>
                <input
                  id="jobTitle"
                  value={form.jobTitle}
                  onChange={handleChange('jobTitle')}
                  className={`${fieldBase} mt-3`}
                />
              </div>

              <div>
                <label className={labelBase} htmlFor="businessEmail">
                  BUSINESS EMAIL <span className="text-purple-400">*</span>
                </label>
                <input
                  id="businessEmail"
                  type="email"
                  required
                  value={form.businessEmail}
                  onChange={handleChange('businessEmail')}
                  className={`${fieldBase} mt-3`}
                />
              </div>

              <div>
                <label className={labelBase} htmlFor="mobileNumber">
                  MOBILE NUMBER
                </label>
                <input
                  id="mobileNumber"
                  value={form.mobileNumber}
                  onChange={handleChange('mobileNumber')}
                  className={`${fieldBase} mt-3`}
                />
              </div>

              <div>
                <label className={labelBase} htmlFor="country">
                  COUNTRY
                </label>
                <input
                  id="country"
                  value={form.country}
                  onChange={handleChange('country')}
                  className={`${fieldBase} mt-3`}
                />
              </div>

              <div>
                <label className={labelBase} htmlFor="industry">
                  INDUSTRY
                </label>
                <input
                  id="industry"
                  list="industry-options"
                  value={form.industry}
                  onChange={handleChange('industry')}
                  className={`${fieldBase} mt-3`}
                />
                <datalist id="industry-options">
                  {industryOptions.map((option) => (
                    <option key={option} value={option} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className={labelBase} htmlFor="relevantPathway">
                  RELEVANT PATHWAY
                </label>
                <select
                  id="relevantPathway"
                  value={form.relevantPathway}
                  onChange={handleChange('relevantPathway')}
                  className={`${fieldBase} mt-3 appearance-none cursor-pointer`}
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  {pathwayOptions.map((option) => (
                    <option key={option} value={option} className="bg-black">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelBase} htmlFor="preferredEngagement">
                  PREFERRED ENGAGEMENT
                </label>
                <select
                  id="preferredEngagement"
                  value={form.preferredEngagement}
                  onChange={handleChange('preferredEngagement')}
                  className={`${fieldBase} mt-3 appearance-none cursor-pointer`}
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  {engagementOptions.map((option) => (
                    <option key={option} value={option} className="bg-black">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelBase} htmlFor="preferredContactMethod">
                  PREFERRED CONTACT METHOD
                </label>
                <select
                  id="preferredContactMethod"
                  value={form.preferredContactMethod}
                  onChange={handleChange('preferredContactMethod')}
                  className={`${fieldBase} mt-3 appearance-none cursor-pointer`}
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  {contactMethodOptions.map((option) => (
                    <option key={option} value={option} className="bg-black">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelBase} htmlFor="businessChallenge">
                BUSINESS CHALLENGE <span className="text-purple-400">*</span>
              </label>
              <textarea
                id="businessChallenge"
                required
                rows={4}
                value={form.businessChallenge}
                onChange={handleChange('businessChallenge')}
                className={`${fieldBase} mt-3 resize-y`}
              />
            </div>

            <div>
              <label className={labelBase} htmlFor="shortMessage">
                SHORT MESSAGE
              </label>
              <textarea
                id="shortMessage"
                rows={4}
                value={form.shortMessage}
                onChange={handleChange('shortMessage')}
                className={`${fieldBase} mt-3 resize-y`}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex items-center gap-3 text-xs tracking-[0.2em] text-white/80 hover:text-white transition-colors group disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'SENDING…' : 'SEND ENQUIRY'}
                <span className="w-8 h-px bg-[#8468FF] group-hover:w-12 transition-all duration-300 ease-out" />
              </button>

              {status === 'success' && (
                <p className="mt-4 text-sm text-emerald-400/90">
                  Thanks — your enquiry is on its way. We&rsquo;ll be in touch shortly.
                </p>
              )}

              {status === 'error' && (
                <p className="mt-4 text-sm text-red-400/90">
                  Something went wrong sending that. Please try again, or email us
                  directly at{' '}
                  <a
                    href={`mailto:${ENQUIRY_RECEIVING_EMAIL}`}
                    className="underline hover:text-white transition-colors"
                  >
                    {ENQUIRY_RECEIVING_EMAIL}
                  </a>
                  .
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
               <Conversation/>   
      <Footer />
    </div>
  )
}

export default StartAConversation
