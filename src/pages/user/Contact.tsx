import React, { useState } from 'react'
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

const StartAConversation: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState)

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: wire up submission endpoint
    console.log(form)
  }

  return (
    <div className="bg-black text-white">
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
      <section className="px-6 md:px-10 lg:px-16 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3 text-xs tracking-[0.2em] text-white/40 mb-16 md:mb-24">
            <span>HOME</span>
            <span>/</span>
            <span className="text-white/70">START A CONVERSATION</span>
          </div>

          <p className="text-xs tracking-[0.3em] text-white/40 mb-6">
            START A CONVERSATION
          </p>

          <h1 className="max-w-[1050px] font-['Space_Grotesk',sans-serif] text-[clamp(72px,10vw,160px)] font-light leading-[0.9] tracking-[-0.06em] text-[var(--code-white)]">
  <span className="font-light">
    Let&rsquo;s clarify what your
  </span>
 
  <span className="font-light">
    business needs <span className="font-bold">next.</span>
  </span>
</h1>

          <p className="mt-10 max-w-[700px] text-white/50 text-lg leading-relaxed">
            Start with a conversation about the challenge, the required outcome
            and the right place to begin.
          </p>
        </div>
      </section>

      {/* Quick contact row */}
      <section className="border-t border-white/10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3">
          <div className="px-6 md:px-10 lg:px-16 py-10 md:border-r border-white/10">
            <span className="w-6 h-px bg-gradient-to-r from-fuchsia-400 to-violet-500 inline-block mb-4" />
            <p className={labelBase}>EMAIL</p>
            <a
              href="mailto:info@codeksaofficial.com"
              className="mt-3 block text-lg md:text-xl hover:text-white/70 transition-colors"
            >
              info@codeksaofficial.com
            </a>
          </div>

          <div className="px-6 md:px-10 lg:px-16 py-10 md:border-r border-white/10">
            <span className="w-6 h-px bg-gradient-to-r from-fuchsia-400 to-violet-500 inline-block mb-4" />
            <p className={labelBase}>WHATSAPP</p>
            <a
              href="https://wa.me/966555922650"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-lg md:text-xl hover:text-white/70 transition-colors"
            >
              +966 55 592 2650
            </a>
          </div>

          <div className="px-6 md:px-10 lg:px-16 py-10">
            <span className="w-6 h-px bg-gradient-to-r from-fuchsia-400 to-violet-500 inline-block mb-4" />
            <p className={labelBase}>CALL</p>
            <a
              href="tel:+966555922650"
              className="mt-3 block text-lg md:text-xl hover:text-white/70 transition-colors"
            >
              +966 55 592 2650
            </a>
          </div>
        </div>
      </section>

      {/* Contact info + Form */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,320px)_1fr] gap-16 md:gap-24">
          {/* Left: static contact card */}
          <div className="space-y-12">
            <div>
              <p className={labelBase}>CONTACT</p>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] text-white/40 mb-3">CODE</p>
              <p className="text-lg">Client Enquiries</p>
              <p className="text-white/50">Saudi Arabia &middot; MENA</p>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] text-white/40 mb-3">EMAIL</p>
              <a
                href="mailto:info@codeksaofficial.com"
                className="text-lg hover:text-white/70 transition-colors"
              >
                info@codeksaofficial.com
              </a>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] text-white/40 mb-3">
                PHONE / WHATSAPP
              </p>
              <p className="text-lg">+966 55 592 2650</p>
              <a
                href="https://wa.me/966555922650"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white/80 transition-colors"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} className="space-y-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div>
                <label className={labelBase} htmlFor="name">
                  NAME <span className="text-fuchsia-400">*</span>
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
                  COMPANY <span className="text-fuchsia-400">*</span>
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
                  BUSINESS EMAIL <span className="text-fuchsia-400">*</span>
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
                BUSINESS CHALLENGE <span className="text-fuchsia-400">*</span>
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

            <button
              type="submit"
              className="flex items-center gap-3 text-xs tracking-[0.2em] text-white/80 hover:text-white transition-colors group"
            >
              SEND ENQUIRY
              <span className="w-8 h-px bg-gradient-to-r from-fuchsia-400 to-violet-500 group-hover:w-12 transition-all" />
            </button>
          </form>
        </div>
      </section>
               <Conversation/>   
      <Footer />
    </div>
  )
}

export default StartAConversation
