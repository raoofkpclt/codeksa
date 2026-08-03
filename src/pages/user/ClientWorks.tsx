import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import UserWorkService from '../../service/firebaseService/userWorkService'
import type { Work } from '../../utils/types'
import NavbarNew from '../../components/user/NavbarNew'
import Footer from '../../components/user/Footer'
import Conversation from '../../components/user/Conversation'
import clientService from '../../service/firebaseService/clientService'

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
   WorkCard — same visual treatment as the Works grid, but no
   client attribution footer since every card here is one client
--------------------------------------------------------- */
const WorkCard = ({ work }: { work: Work & { id: string } }) => {
  const [imgFailed, setImgFailed] = useState(false)

  const cover = coverOf(work)
  const isVideo = cover?.fileType?.startsWith('video/')

  return (
    <div className="group mb-6 break-inside-avoid cursor-default">
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
          <h3 className="text-lg font-light text-white truncate">
            {work.postName}
          </h3>
          {work.postingDate && (
            <span className="text-xs text-white/50">
              {formatDate(work.postingDate)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

const CardSkeleton = () => (
  <div className="mb-6 break-inside-avoid aspect-[4/5] border border-white/10 bg-white/[0.02] animate-pulse" />
)

const ClientWorks: React.FC = () => {
  const { clientId } = useParams()
  const [works, setWorks] = useState<(Work & { id: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [activeType, setActiveType] = useState('All')
  const [client, setClient] = useState<{
  name: string;
  logo?: string;
} | null>(null);
useEffect(() => {
  if (!clientId) return;

  const loadClient = async () => {
    const data = await clientService.getClient(clientId);

    if (data) {
      setClient({
        name: data.name,
        logo: data.logo,
      });
    }
  };

  loadClient();
}, [clientId]);

  useEffect(() => {
    if (!clientId) return
    let cancelled = false

    const loadWorks = async () => {
      setLoading(true)
      setErrorMsg(null)

      try {
        const data = await UserWorkService.getWorksByClient(clientId)

        const visible = (data as any[])
          .filter((w) => w.active === true && w.isDisplay === true)
          .sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt))

        if (!cancelled) setWorks(visible as (Work & { id: string })[])
      } catch (error) {
        console.error('Load Client Works:', error)
        if (!cancelled) setErrorMsg('Unable to load works.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadWorks()
    return () => {
      cancelled = true
    }
  }, [clientId])

  const clientName = client?.name
  const clientLogo = client?.logo

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
            <Link to="/" className="hover-glow uppercase transition-colors duration-200">
              HOME
            </Link>
            <span>/</span>
            <Link to="/clients" className="hover-glow uppercase transition-colors duration-200">
              CLIENTS
            </Link>
            <span>/</span>
            <span className="text-white/70">
              {loading ? '...' : client?.name.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            {!loading && clientLogo ? (
              <img
                src={clientLogo}
                alt={clientName}
                className="w-10 h-10 object-contain shrink-0"
              />
            ) : !loading ? (
              <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs font-light text-white/60 shrink-0">
                {initialsOf(clientName)}
              </span>
            ) : null}
            <p className="text-xs tracking-[0.3em] text-white/40">
              {loading ? client?.name.toUpperCase() : client?.name.toUpperCase()}
            </p>
          </div>

          <h1 className="max-w-[1400px] font-['Space_Grotesk',sans-serif] text-[clamp(72px,10vw,160px)] font-light leading-[0.9] tracking-[-0.06em] text-[var(--code-white)]">
  {loading ? (
    "Loading engagement."
  ) : (
    <>
      <span className="font-light">{clientName},</span>
   
      <span className="font-bold  text-white
    transition-all
    duration-500
    ease-out
   hover:text-[#8a6dff]
    hover:scale-[1.01]
    hover:drop-shadow-[0_0_10px_rgba(184,166,255,0.45)]
    hover:drop-shadow-[0_0_24px_rgba(167,139,250,0.45)]">in system.</span>
    </>
  )}
</h1>

          <p className="mt-10 max-w-xl text-white/50 text-lg leading-relaxed">
            Every piece of work delivered for this engagement: the format,
            the date and the outcome shipped.
          </p>

          <Link
            to="/clients"
            className="mt-10 inline-flex items-center gap-3 text-xs tracking-[0.2em] text-white/50 hover:text-white/80 transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
            BACK TO CLIENTS
          </Link>
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

export default ClientWorks
