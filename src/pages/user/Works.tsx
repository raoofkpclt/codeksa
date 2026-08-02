import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import UserWorkService from '../../service/firebaseService/userWorkService'
import type { Work } from '../../utils/types'
import NavbarNew from '../../components/user/NavbarNew'
import Footer from '../../components/user/Footer'
import Conversation from '../../components/user/Conversation'

/* ---------------------------------------------------------
   Reveal — subtle fade-up on scroll entry
--------------------------------------------------------- */
const Reveal = ({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  as?: React.ElementType
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}



/* ---------------------------------------------------------
   Helpers
--------------------------------------------------------- */
const initialsOf = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

const toMillis = (ts: any) => {
  if (!ts) return 0
  if (typeof ts.toMillis === 'function') return ts.toMillis()
  if (typeof ts.seconds === 'number') return ts.seconds * 1000
  return 0
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const coverOf = (work: Work) => {
  const media = Array.isArray(work.media) ? work.media : []
  const firstImage = media.find((m) => m.fileType?.startsWith('image/'))
  return firstImage || media[0] || null
}

/* ---------------------------------------------------------
   WorkCard — cover media, reveal-on-hover attribution
--------------------------------------------------------- */
const WorkCard = ({ work }: { work: Work & { id: string } }) => {
  const [imgFailed, setImgFailed] = useState(false)
  const [logoFailed, setLogoFailed] = useState(false)

  const cover = coverOf(work)
  const isVideo = cover?.fileType?.startsWith('video/')
  const href = `/works/${work.clientId}`

  return (
    <Link
      to={href}
      className="group block mb-6 break-inside-avoid"
    >
      <div className="relative overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors">
        {cover && !imgFailed ? (
          isVideo ? (
            <video
              src={cover.url}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <img
              src={cover.url}
              alt={work.postName}
              onError={() => setImgFailed(true)}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )
        ) : (
          <div className="aspect-[4/5] flex items-center justify-center bg-white/[0.03] text-white/30">
            No Preview
          </div>
        )}

        {work.postType && (
          <span className="absolute top-4 left-4 text-xs tracking-[0.2em] text-white/70 bg-black/60 border border-white/10 px-3 py-1">
            {work.postType.toUpperCase()}
          </span>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute bottom-0 left-0 right-0 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 px-5 py-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-lg font-light text-white truncate">
                {work.postName}
              </h3>
              {work.postingDate && (
                <span className="text-xs text-white/50">
                  {formatDate(work.postingDate)}
                </span>
              )}
            </div>
            <span className="text-violet-400 text-lg shrink-0 transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2.5 pt-4 border-t border-white/10">
            <div className="w-6 h-6 shrink-0 flex items-center justify-center">
              {work.clientLogo && !logoFailed ? (
                <img
                  src={work.clientLogo}
                  alt={work.clientName}
                  className="w-full h-full object-contain"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[9px] font-light text-white/60">
                  {initialsOf(work.clientName)}
                </span>
              )}
            </div>
            <span className="text-xs text-white/50 truncate">
              {work.clientName}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

const CardSkeleton = () => (
  <div className="mb-6 break-inside-avoid aspect-[4/5] border border-white/10 bg-white/[0.02] animate-pulse" />
)

const WorksPage: React.FC = () => {
  const [works, setWorks] = useState<(Work & { id: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [activeType, setActiveType] = useState('All')

  useEffect(() => {
    let cancelled = false

    const loadWorks = async () => {
      setLoading(true)
      setErrorMsg(null)

      try {
        const data = await UserWorkService.getWorks()

        const visible = data
          .filter((w: any) => w.active === true && w.isDisplay === true)
          .sort((a: any, b: any) => toMillis(b.createdAt) - toMillis(a.createdAt))

        if (!cancelled) setWorks(visible as (Work & { id: string })[])
      } catch (error) {
        console.error('Load Works:', error)
        if (!cancelled) setErrorMsg('Unable to load works.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadWorks()
    return () => {
      cancelled = true
    }
  }, [])

  const types = [
    'All',
    ...Array.from(new Set(works.map((w: any) => w.postType).filter(Boolean))),
  ]
  const filtered =
    activeType === 'All'
      ? works
      : works.filter((w: any) => w.postType === activeType)

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
            <a href="/" className="hover-glow uppercase transition-colors duration-200">
            <span className=''>HOME</span>
            </a>
            
            <span>/</span>
            <span className="text-white/70">WORKS</span>
          </div>

          <p className="text-xs tracking-[0.3em] text-white/40 mb-6">WORKS</p>

          <h1 className="max-w-[1400px] font-['Space_Grotesk',sans-serif] text-[clamp(72px,10vw,160px)] font-light leading-[0.9] tracking-[-0.06em] text-[var(--code-white)]">
  <span className="font-light">
    Systems,
  </span>{" "}
  <span className="font-bold">
    shipped.
  </span>
</h1>

          <p className="mt-10 max-w-xl text-white/50 text-lg leading-relaxed">
            Every engagement, across every client: the problem, the system
            built and the result.
          </p>
        </div>
      </section>

      {/* Type filter + grid */}
      <section className="border-t border-white/10 px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto">
          {types.length > 1 && !loading && !errorMsg && (
            <Reveal className="flex flex-wrap gap-x-8 gap-y-4 mb-16">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  className={`text-xs tracking-[0.2em] transition-colors pb-2 border-b ${
                    activeType === t
                      ? 'text-white border-violet-400'
                      : 'text-white/40 border-transparent hover:text-white/70'
                  }`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </Reveal>
          )}

          {errorMsg && (
            <Reveal className="border border-white/10 py-16 text-center">
              <p className="text-white/50">{errorMsg}</p>
            </Reveal>
          )}

          {!errorMsg && loading && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          )}

          {!errorMsg && !loading && filtered.length === 0 && (
            <Reveal className="border border-white/10 py-16 text-center">
              <p className="text-white/50">
                No works found{activeType !== 'All' ? ` in ${activeType}` : ''}.
              </p>
            </Reveal>
          )}

          {!errorMsg && !loading && filtered.length > 0 && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
              {filtered.map((work, i) => (
                <Reveal key={work.id} delay={(i % 6) * 40}>
                  <WorkCard work={work} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <Conversation/>

      <Footer />
    </div>
  )
}

export default WorksPage
