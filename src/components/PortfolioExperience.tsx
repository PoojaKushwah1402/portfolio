'use client'

import MountainJourney from '@/components/3d/MountainJourney'
import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

/* ─── palette + type ─── */
const BG = '#08090C'
const INK = '#EAEEF3'
const MUTE = '#7C8695'
const ACCENT = '#22B8E6'
const disp = "'Anton', 'Arial Narrow', sans-serif"
const grot = "'Space Grotesk Variable', 'Inter Variable', sans-serif"
const sans = "'Inter Variable', system-ui, sans-serif"
const ease = [0.16, 1, 0.3, 1] as const
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const MEGA: React.CSSProperties = { fontFamily: disp, textTransform: 'uppercase', letterSpacing: '-0.005em', lineHeight: 0.84, margin: 0, fontWeight: 400 }
const label: React.CSSProperties = { fontFamily: grot, fontWeight: 600, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase' }

/* ─── content, from the résumé ─── */
const PROJECTS = [
  {
    n: '01', t: 'Macro Rides', r: 'Co-founder & CTO', p: '2025 → now', b: '0 → 1', stat: '0→1',
    grad: 'linear-gradient(135deg,#0EA5E9 0%,#1D3B8B 100%)',
    tag: 'e-rickshaw ride-hailing · DPIIT recognised · Delhi',
    d: 'India-focused e-rickshaw ride-hailing, built and shipped from absolute zero.',
    hi: [
      'Full MVP: React Native rider + driver apps on Node.js / PostgreSQL',
      'Real-time WebSocket dispatch, Redis caching, deployed on AWS',
      'Delhi Mobility Intelligence, a public dashboard on real transit data',
      'Cashfree, Maps API, SMS OTP; validated with real riders before any funding',
    ],
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'WebSocket', 'AWS'],
  },
  {
    n: '02', t: 'group.one', r: 'Software Engineer', p: '2022 → 2025', b: '500K+ users', stat: '500K+',
    grad: 'linear-gradient(135deg,#22D3EE 0%,#2557D6 100%)',
    tag: 'AI-powered SaaS · website builder + e-commerce · Europe',
    d: 'AI-powered website builder and e-commerce serving European markets at scale.',
    hi: [
      'React + TypeScript apps for 500K+ users across Europe (SSR / SSG)',
      'LLM APIs + Model Context Protocol (MCP) for context-aware AI, in prod',
      'Payments (Stripe, PayPal), inventory, tax engine, automation',
      'Zero-bug release cycle with TDD; grew Jest coverage to 90%',
    ],
    tech: ['React', 'TypeScript', 'MCP', 'Stripe', 'Jest'],
  },
  {
    n: '03', t: 'Livjaza', r: 'Senior Full Stack', p: '2026 → now', b: '7-8s → <500ms', stat: '<500ms',
    grad: 'linear-gradient(135deg,#38BDF8 0%,#4132C4 100%)',
    tag: 'hospitality tech · property + channel management · Dubai',
    d: 'A property and channel-management platform, rebuilt for speed and AI.',
    hi: [
      'Cut page load from 7-8s to under 500ms via SSR, code splitting, profiling',
      'AI property search: LLM APIs into a Next.js SSR frontend',
      'AI-driven dynamic pricing dashboard in React + Recharts',
      'ForumPay crypto payments; led cloud migration Azure → AWS',
    ],
    tech: ['Next.js', 'Node.js', 'Go', 'Django', 'AWS'],
  },
  {
    n: '04', t: 'Delhi Mobility', r: 'Independent build', p: 'Macro Rides', b: 'live', stat: 'LIVE',
    grad: 'linear-gradient(135deg,#06B6D4 0%,#5B21B6 100%)',
    tag: 'mobility.macrorides.in · public AI dashboard',
    d: 'A public AI dashboard on real Delhi government transit data, built solo end to end.',
    hi: [
      'Interactive public data dashboard, designed and shipped end to end',
      'React + Mapbox GL with H3.js spatial indexing over real transit data',
      'Gemini AI on top for natural-language mobility insight',
    ],
    tech: ['React', 'Mapbox GL', 'H3.js', 'Gemini AI'],
  },
  {
    n: '05', t: 'BRIDGEi2i', r: 'Software Engineer', p: '2021 → 2022', b: 'analytics', stat: 'DATA',
    grad: 'linear-gradient(135deg,#0891B2 0%,#1E293B 100%)',
    tag: 'AI-driven analytics consulting · India',
    d: 'Data-heavy dashboards and interactive visualisations for enterprise clients.',
    hi: [
      'Data-heavy React dashboards and interactive visualisations',
      'Analytics pipelines with permission-driven data access',
    ],
    tech: ['React', 'D3.js', 'Analytics'],
  },
] as const

const TRAJECTORY: [string, string, string][] = [
  ['19', 'Amdocs', 'Telecom · React + Node'],
  ['21', 'BRIDGEi2i', 'AI analytics'],
  ['22', 'group.one', 'AI SaaS · Europe'],
  ['25', 'Macro Rides', 'Co-founder & CTO'],
  ['26', 'Livjaza', 'Senior Full Stack'],
]

const ACHIEVEMENTS: [string, string][] = [
  ['TOP 5', 'ELITE React.js Challenge · 200+ companies'],
  ['GSF', "Founders Academy · 2026 cohort"],
  ['DPIIT', 'Recognised startup · Amity incubator'],
  ['DAILY', 'Claude Code + Cursor, in the loop'],
]

const LEAD: [string, string][] = [
  ['0 → 1 product', 'MVP to real users, no funding needed first'],
  ['Engineering leadership', 'direction, standards, delivery'],
  ['System architecture', 'design end-to-end, own the calls'],
  ['AI in production', 'LLMs + MCP shipped, not demoed'],
  ['Speed', '7-8s → <500ms; rapid prototyping'],
  ['Full ownership', 'architecture through to deployment'],
]

const CATS: [string, string[]][] = [
  ['Frontend', ['React', 'Next.js', 'TypeScript', 'Redux', 'Zustand', 'TanStack Query', 'React Native']],
  ['Backend', ['Node.js', 'Express', 'NestJS', 'Django', 'Go', 'GraphQL', 'WebSockets']],
  ['AI / LLMs', ['OpenAI', 'LangChain', 'MCP', 'Gemini', 'Pinecone', 'Claude Code', 'Cursor']],
  ['Data viz', ['D3.js', 'Recharts', 'Chart.js', 'Mapbox GL', 'H3.js', 'Real-time']],
  ['Databases', ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'DynamoDB']],
  ['Cloud / DevOps', ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD']],
]
const CORE = new Set(['React', 'Next.js', 'TypeScript', 'Node.js', 'Go', 'MCP', 'OpenAI', 'Gemini', 'PostgreSQL', 'AWS', 'React Native', 'Mapbox GL'])
const FLOW = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Go', 'MCP', 'OpenAI', 'Gemini', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'Mapbox GL', 'React Native', 'Stripe']

const PLAY = [
  { img: 'https://picsum.photos/id/1018/1100/1400', tag: 'Outdoors', meta: 'trekking · long walks', title: 'Outdoors', desc: "I'm happiest outdoors. Trekking, long walks, altitude with no signal. It's where I actually switch off and end up thinking the clearest." },
  { img: 'https://picsum.photos/id/1036/1100/1400', tag: 'Explorer', meta: '11 countries so far', title: 'Explore', desc: 'Endlessly curious. I love travelling and exploring new places, mostly chasing food and the feeling of not knowing what is around the next corner.' },
  { img: 'https://picsum.photos/id/1043/1100/1400', tag: 'Adrenaline', meta: 'coasters · skydive · dive', title: 'Adventurous', desc: 'If it has a waiver, I probably want to try it. Roller coasters, skydiving, scuba, whatever the next one turns out to be. The adrenaline is the point.' },
  { img: 'https://picsum.photos/id/1062/1100/1400', tag: 'Recharge', meta: 'sleep · reset', title: 'Recharge', desc: 'And when none of the above? I genuinely love to sleep. Free time well spent is a long, guilt-free nap and coming back sharper.' },
]

const NAV: [string, string][] = [['Work', 'work'], ['About', 'about'], ['Stack', 'stack'], ['Play', 'play'], ['Say hi', 'contact']]

/* ─── motion helpers ─── */
function Reveal({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.92, y: 34 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: '-12% 0px' }} transition={{ duration: 0.85, ease, delay }} style={style}>
      {children}
    </motion.div>
  )
}
function FromRight({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div initial={{ opacity: 0, x: 130 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 0.9, ease, delay }} style={style}>
      {children}
    </motion.div>
  )
}

/* clean, human eyebrow — small cyan dot + sentence case (no tracked caps) */
function Tag({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, ...style }}>
      <span style={{ width: 7, height: 7, borderRadius: 999, background: ACCENT, flexShrink: 0 }} />
      <span style={{ fontFamily: grot, fontWeight: 600, fontSize: 13.5, color: 'rgba(234,238,243,0.74)' }}>{children}</span>
    </div>
  )
}

function LinkedInIcon() {
  return (<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>)
}
function GitHubIcon() {
  return (<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58l-.01-2.03c-3.34.72-4.04-1.62-4.04-1.62-.55-1.38-1.34-1.75-1.34-1.75-1.08-.75.09-.73.09-.73 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5.99.1-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22l-.01 3.29c0 .32.21.7.82.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"/></svg>)
}

/* ─── custom cursor ─── */
function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, hover = false, raf = 0
    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; hover = !!(e.target as HTMLElement).closest('a,button,[data-hover]') }
    const loop = () => {
      rx = lerp(rx, mx, 0.2); ry = lerp(ry, my, 0.2)
      if (dot.current) dot.current.style.transform = `translate(${mx - 3}px,${my - 3}px)`
      if (ring.current) { ring.current.style.transform = `translate(${rx - 18}px,${ry - 18}px) scale(${hover ? 1.8 : 1})`; ring.current.style.opacity = hover ? '1' : '0.4' }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    window.addEventListener('mousemove', move, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', move) }
  }, [])
  return (
    <>
      <div ref={ring} className="custom-cursor" style={{ position: 'fixed', top: 0, left: 0, width: 36, height: 36, borderRadius: 999, border: `1.5px solid ${ACCENT}`, pointerEvents: 'none', zIndex: 200, transition: 'opacity .3s' }} />
      <div ref={dot} className="custom-cursor" style={{ position: 'fixed', top: 0, left: 0, width: 6, height: 6, borderRadius: 999, background: ACCENT, pointerEvents: 'none', zIndex: 200 }} />
    </>
  )
}

/* ─── nav ─── */
function Nav({ goto, active }: { goto: (id: string) => void; active: string }) {
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'clamp(16px,2.4vh,26px) clamp(20px,4vw,60px)', pointerEvents: 'none' }}>
      <button onClick={() => goto('top')} data-hover style={{ pointerEvents: 'auto', background: 'none', border: 0, cursor: 'pointer', fontFamily: grot, fontWeight: 700, fontSize: 14, letterSpacing: '0.05em', color: INK }}>
        POOJA <span style={{ color: ACCENT }}>KUSHWAH</span>
      </button>
      <div style={{ pointerEvents: 'auto', display: 'flex', gap: 'clamp(18px,2vw,36px)', alignItems: 'center' }}>
        {NAV.map(([l, id]) => (
          <button key={id} onClick={() => goto(id)} data-hover style={{ position: 'relative', background: 'none', border: 0, cursor: 'pointer', fontFamily: grot, fontWeight: 600, fontSize: 13, color: active === id ? ACCENT : 'rgba(234,238,243,0.82)', padding: '4px 1px', transition: 'color .3s' }}>
            {l}
            {active === id && <motion.span layoutId="nav-underline" style={{ position: 'absolute', left: 0, right: 0, bottom: -3, height: 2, borderRadius: 2, background: ACCENT }} transition={{ duration: 0.35, ease }} />}
          </button>
        ))}
      </div>
    </nav>
  )
}

/* ─── hero ─── */
function Hero() {
  return (
    <section id="top" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 clamp(20px,4vw,60px)' }}>
      <div style={{ position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }} style={{ marginBottom: 'clamp(10px,1.6vh,18px)', marginLeft: 4 }}>
          <Tag>Based in Dubai, open to new roles</Tag>
        </motion.div>
        <div style={{ overflow: 'hidden' }}>
          <motion.h1 initial={{ y: '108%' }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay: 0.15 }} style={{ ...MEGA, fontSize: 'clamp(78px,18vw,300px)' }}>Pooja</motion.h1>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <motion.h1 initial={{ y: '108%' }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay: 0.3 }} className="pk-sheen" style={{ ...MEGA, fontSize: 'clamp(78px,18vw,300px)', color: ACCENT }}>Kushwah</motion.h1>
        </div>
      </div>

      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} style={{ marginTop: 'clamp(18px,2.6vh,30px)', marginLeft: 4, maxWidth: '30ch', fontFamily: sans, fontSize: 'clamp(17px,1.7vw,24px)', fontWeight: 500, lineHeight: 1.3, color: INK }}>
        Give me a problem no one wants to touch. <span style={{ color: ACCENT }}>I&apos;ll ship it.</span>
      </motion.p>

    </section>
  )
}

/* ─── kinetic marquee ─── */
function Marquee({ items, accent = false, dur = 30 }: { items: string[]; accent?: boolean; dur?: number }) {
  return (
    <div style={{ position: 'relative', borderTop: '1px solid rgba(234,238,243,0.1)', borderBottom: '1px solid rgba(234,238,243,0.1)', padding: 'clamp(10px,1.8vh,20px) 0', overflow: 'hidden', background: accent ? ACCENT : 'rgba(9,12,18,0.55)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
      <div style={{ display: 'inline-flex', whiteSpace: 'nowrap', animation: `pk-marquee ${dur}s linear infinite` }}>
        {[0, 1].map((k) => (
          <span key={k} aria-hidden={k === 1} style={{ display: 'inline-flex', flexShrink: 0 }}>
            {items.map((w, i) => (
              <span key={`${k}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
                <span style={{ ...MEGA, fontSize: 'clamp(22px,4vw,52px)', color: accent ? BG : INK, padding: '0 clamp(16px,2.4vw,38px)' }}>{w}</span>
                <span style={{ color: accent ? BG : ACCENT, fontSize: 'clamp(12px,1.4vw,20px)' }}>✦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── work: horizontal filmstrip ─── */
function WorkPanel({ p, i, n, progress }: { p: (typeof PROJECTS)[number]; i: number; n: number; progress: MotionValue<number> }) {
  const c = n > 1 ? i / (n - 1) : 0
  const step = n > 1 ? 1 / (n - 1) : 1
  const scale = useTransform(progress, [c - step, c, c + step], [0.9, 1, 0.9])
  const [hover, setHover] = useState(false)
  return (
    <motion.article
      onHoverStart={() => setHover(true)} onHoverEnd={() => setHover(false)} data-hover
      style={{ scale, position: 'relative', flexShrink: 0, width: '62vw', maxWidth: 1000, height: '74vh', marginRight: '4vw', borderRadius: 22, overflow: 'hidden', background: p.grad, color: '#fff', boxShadow: '0 40px 90px -40px rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.16)' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 85% 8%, rgba(255,255,255,0.2), transparent 55%)' }} />
      <div aria-hidden style={{ position: 'absolute', right: '-2%', bottom: '-14%', ...MEGA, fontSize: 'clamp(240px,30vw,500px)', color: 'rgba(255,255,255,0.1)', lineHeight: 0.7, pointerEvents: 'none' }}>{p.n}</div>

      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'clamp(26px,3vw,50px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ ...label, fontSize: 12, color: 'rgba(255,255,255,0.92)' }}>{p.r} · {p.p}</div>
          <div style={{ ...MEGA, fontSize: 'clamp(26px,2.8vw,48px)', color: '#fff', textShadow: '0 2px 30px rgba(0,0,0,0.3)' }}>{p.stat}</div>
        </div>

        <div>
          <h3 style={{ ...MEGA, fontSize: 'clamp(40px,6vw,116px)', marginBottom: 12 }}>{p.t}</h3>
          <div style={{ ...label, fontSize: 11, color: 'rgba(255,255,255,0.82)', marginBottom: 14 }}>{p.tag}</div>
          <p style={{ fontFamily: sans, fontSize: 'clamp(14px,1.3vw,19px)', fontWeight: 500, lineHeight: 1.4, color: 'rgba(255,255,255,0.96)', maxWidth: '40ch', margin: 0 }}>{p.d}</p>

          {/* key points — always visible so the content reads without hovering */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.26)', marginTop: 16, paddingTop: 14 }}>
            {p.hi.slice(0, hover ? p.hi.length : 2).map((h) => (
              <div key={h} style={{ display: 'flex', gap: 10, padding: '4px 0', fontFamily: sans, fontSize: 'clamp(12.5px,1vw,15px)', lineHeight: 1.4, color: 'rgba(255,255,255,0.94)' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>·</span>{h}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 14 }}>
            {p.tech.map((tt) => <span key={tt} style={{ ...label, fontSize: 10, letterSpacing: '0.1em', color: '#fff', border: '1px solid rgba(255,255,255,0.42)', padding: '5px 11px', borderRadius: 999 }}>{tt}</span>)}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function Work() {
  const track = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.max(0, Math.min(PROJECTS.length - 1, Math.round(v * (PROJECTS.length - 1))))))
  const n = PROJECTS.length
  const pitch = 66, startX = 19
  const endX = -((n - 1) * pitch) + startX
  const x = useTransform(scrollYProgress, [0, 1], [`${startX}vw`, `${endX}vw`])
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="work" ref={track} style={{ position: 'relative', height: `${n * 55}vh`, background: 'rgba(8,10,15,0.5)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: 'clamp(74px,10vh,104px)', left: 'clamp(20px,4vw,60px)', right: 'clamp(20px,4vw,60px)', zIndex: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
          <div>
            <Tag style={{ marginBottom: 8 }}>Selected work</Tag>
            <div style={{ ...MEGA, fontSize: 'clamp(30px,4.6vw,64px)' }}>The receipts</div>
          </div>
          <span style={{ fontFamily: grot, fontWeight: 600, fontSize: 13, color: MUTE }}>scroll to move&nbsp;&nbsp;{String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
        </div>

        <motion.div style={{ display: 'flex', alignItems: 'center', x, willChange: 'transform' }}>
          {PROJECTS.map((p, i) => <WorkPanel key={p.t} p={p} i={i} n={n} progress={scrollYProgress} />)}
        </motion.div>

        <div style={{ position: 'absolute', bottom: 'clamp(30px,5vh,52px)', left: 'clamp(20px,4vw,60px)', right: 'clamp(20px,4vw,60px)', zIndex: 5 }}>
          <div style={{ height: 3, background: 'rgba(234,238,243,0.12)', borderRadius: 3, overflow: 'hidden' }}>
            <motion.div style={{ width: bar, height: '100%', background: ACCENT }} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── about: zoom statement + slide-in ─── */
function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.55], [0.82, 1.14])
  const x = useTransform(scrollYProgress, [0, 0.55], ['0vw', '-3vw'])

  return (
    <section id="about" ref={ref} style={{ position: 'relative', padding: 'clamp(70px,11vh,120px) clamp(20px,4vw,60px)', background: 'rgba(9,12,18,0.6)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', overflow: 'hidden' }}>
      <Reveal><Tag style={{ marginBottom: 'clamp(14px,2vh,24px)' }}>The driver</Tag></Reveal>

      {/* zooming statement — grows from the left as you scroll through */}
      <motion.h2 style={{ scale, x, transformOrigin: 'left center', ...MEGA, fontSize: 'clamp(46px,10vw,220px)' }}>
        I build what<br />engineers <span style={{ color: ACCENT }}>avoid.</span>
      </motion.h2>

      {/* content that flies in from the right */}
      <div style={{ position: 'relative', marginTop: 'clamp(34px,6vh,72px)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(28px,5vw,80px)', alignItems: 'start' }}>
        <Reveal>
          <p style={{ fontFamily: sans, fontSize: 'clamp(17px,1.7vw,26px)', fontWeight: 500, lineHeight: 1.5, color: INK, maxWidth: '24ch', margin: 0 }}>
            Then I <span style={{ color: ACCENT }}>ship it.</span> E-commerce to 500K+ European shoppers. A frontend from 7-8 seconds to under half a second. An e-rickshaw platform running real rides in Delhi before a rupee of funding.
          </p>
        </Reveal>
        <FromRight>
          <Tag style={{ marginBottom: 16 }}>The trajectory</Tag>
          {TRAJECTORY.map(([y, l, s]) => (
            <motion.div key={l} whileHover={{ x: 6 }} transition={{ duration: 0.3, ease }} style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: 'clamp(11px,1.6vh,16px) 0', borderTop: '1px solid rgba(234,238,243,0.12)' }}>
              <span style={{ fontFamily: grot, fontWeight: 700, fontSize: 'clamp(14px,1.2vw,18px)', color: ACCENT }}>&rsquo;{y}</span>
              <span style={{ ...MEGA, fontSize: 'clamp(22px,2.4vw,42px)' }}>{l}</span>
              <span style={{ ...label, fontSize: 10, color: MUTE, marginLeft: 'auto', textAlign: 'right', letterSpacing: '0.12em' }}>{s}</span>
            </motion.div>
          ))}
        </FromRight>
      </div>

      {/* achievements band */}
      <div style={{ marginTop: 'clamp(40px,7vh,80px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 1, background: 'rgba(234,238,243,0.1)', border: '1px solid rgba(234,238,243,0.1)' }}>
        {ACHIEVEMENTS.map(([t, s], i) => (
          <motion.div key={t} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: i * 0.08 }} whileHover={{ backgroundColor: 'rgba(34,184,230,0.06)' }} style={{ background: BG, padding: 'clamp(22px,3.6vh,40px) clamp(20px,2.4vw,34px)' }}>
            <div style={{ ...MEGA, fontSize: 'clamp(32px,3.6vw,60px)', color: ACCENT }}>{t}</div>
            <div style={{ fontFamily: sans, fontSize: 13, lineHeight: 1.4, color: 'rgba(234,238,243,0.66)', marginTop: 8 }}>{s}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ─── stack: interactive split — hover a category, its tools appear large ─── */
function Stack() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const headScale = useTransform(scrollYProgress, [0, 0.35], [0.86, 1.06])
  const headX = useTransform(scrollYProgress, [0, 0.35], ['0vw', '-2vw'])
  const [act, setAct] = useState(0)
  const items = CATS[act][1]

  return (
    <section id="stack" ref={ref} style={{ position: 'relative', padding: 'clamp(70px,11vh,120px) clamp(20px,4vw,60px)', background: 'linear-gradient(180deg, rgba(9,12,18,0.58), rgba(11,20,32,0.72))', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', overflow: 'hidden' }}>
      <Reveal><Tag style={{ marginBottom: 12 }}>What I bring</Tag></Reveal>
      <motion.h2 style={{ scale: headScale, x: headX, transformOrigin: 'left center', ...MEGA, fontSize: 'clamp(48px,9vw,180px)' }}>Lead. Architect. <span style={{ color: ACCENT }}>Ship.</span></motion.h2>

      {/* interactive split: category list ↔ its tools shown large */}
      <div style={{ marginTop: 'clamp(34px,6vh,64px)', display: 'grid', gridTemplateColumns: 'minmax(0,0.85fr) minmax(0,1.15fr)', gap: 'clamp(24px,4vw,72px)', alignItems: 'start' }}>
        <div>
          {CATS.map(([cat], i) => {
            const on = act === i
            return (
              <button key={cat} onMouseEnter={() => setAct(i)} onFocus={() => setAct(i)} onClick={() => setAct(i)} data-hover
                style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', textAlign: 'left', background: 'none', border: 0, borderTop: '1px solid rgba(234,238,243,0.12)', padding: 'clamp(12px,1.8vh,20px) 0', cursor: 'pointer' }}>
                <span style={{ fontFamily: grot, fontWeight: 700, fontSize: 12, color: on ? ACCENT : MUTE, width: 22 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ ...MEGA, fontSize: 'clamp(26px,3.4vw,54px)', color: on ? INK : 'rgba(234,238,243,0.3)', transition: 'color .3s' }}>{cat}</span>
                <motion.span animate={{ opacity: on ? 1 : 0, x: on ? 0 : -10 }} transition={{ duration: 0.25 }} style={{ marginLeft: 'auto', color: ACCENT, fontSize: 22 }}>→</motion.span>
              </button>
            )
          })}
        </div>

        <div style={{ minHeight: 'clamp(240px,42vh,380px)' }}>
          <AnimatePresence mode="wait">
            <motion.div key={act} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.4, ease }}>
              <div style={{ fontFamily: grot, fontWeight: 600, fontSize: 13, color: MUTE, marginBottom: 'clamp(16px,2.4vh,26px)' }}>{items.length} tools, in production</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(10px,1.4vw,18px) clamp(16px,2vw,30px)' }}>
                {items.map((tt, k) => (
                  <motion.span key={tt} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + k * 0.04, duration: 0.4, ease }}
                    style={{ ...MEGA, fontSize: 'clamp(22px,2.8vw,46px)', color: CORE.has(tt) ? ACCENT : 'rgba(234,238,243,0.9)', lineHeight: 1 }}>{tt}</motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* how I lead — clean editorial columns, no boxes */}
      <div style={{ marginTop: 'clamp(44px,8vh,88px)' }}>
        <Reveal><Tag style={{ marginBottom: 20 }}>How I lead</Tag></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 'clamp(18px,2.4vw,40px)' }}>
          {LEAD.map(([t, s], i) => (
            <Reveal key={t} delay={(i % 3) * 0.05}>
              <div style={{ borderTop: `1.5px solid ${ACCENT}55`, paddingTop: 14 }}>
                <div style={{ fontFamily: grot, fontWeight: 700, fontSize: 12, color: ACCENT, marginBottom: 8 }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ ...MEGA, fontSize: 'clamp(19px,1.7vw,27px)', marginBottom: 6 }}>{t}</div>
                <div style={{ fontFamily: sans, fontSize: 13, lineHeight: 1.45, color: 'rgba(234,238,243,0.6)' }}>{s}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── play: image cards; hover fills the whole image with the story ─── */
function PlayCard({ item }: { item: (typeof PLAY)[number] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const pill: React.CSSProperties = { fontFamily: grot, fontWeight: 600, fontSize: 12, color: ACCENT, background: 'rgba(8,9,12,0.5)', padding: '6px 12px', borderRadius: 999, backdropFilter: 'blur(4px)' }
  return (
    <Reveal>
      <motion.div ref={ref} initial="r" whileHover="h" animate="r" data-hover style={{ position: 'relative', overflow: 'hidden', borderRadius: 18, height: 'clamp(440px,66vh,660px)', border: '1px solid rgba(234,238,243,0.1)' }}>
        {/* image (parallax on scroll, zoom on hover) */}
        <motion.img src={item.img} alt={item.title} variants={{ r: { scale: 1.03 }, h: { scale: 1.14 } }} transition={{ duration: 0.9, ease }} style={{ position: 'absolute', inset: '-8% 0', width: '100%', height: '116%', objectFit: 'cover', y }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,9,12,0.12) 30%, rgba(8,9,12,0.88) 100%)' }} />

        {/* default: tag + title */}
        <motion.div variants={{ r: { opacity: 1 }, h: { opacity: 0 } }} transition={{ duration: 0.3, ease }} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'clamp(20px,2vw,30px)', zIndex: 2 }}>
          <span style={{ ...pill, alignSelf: 'flex-start' }}>{item.tag}</span>
          <div style={{ ...MEGA, fontSize: 'clamp(40px,4.4vw,72px)' }}>{item.title}</div>
        </motion.div>

        {/* hover: full-cover story */}
        <motion.div variants={{ r: { opacity: 0 }, h: { opacity: 1 } }} transition={{ duration: 0.45, ease }}
          style={{ position: 'absolute', inset: 0, zIndex: 3, padding: 'clamp(24px,2.6vw,40px)', background: 'linear-gradient(155deg, rgba(9,22,34,0.94), rgba(8,11,18,0.97))', backdropFilter: 'blur(3px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <span style={{ ...pill }}>{item.tag}</span>
            <span style={{ fontFamily: grot, fontWeight: 600, fontSize: 12, color: ACCENT }}>{item.meta}</span>
          </div>
          <div>
            <motion.div variants={{ r: { y: 18 }, h: { y: 0 } }} transition={{ duration: 0.5, ease }} style={{ ...MEGA, fontSize: 'clamp(40px,4.4vw,72px)', color: ACCENT, marginBottom: 16 }}>{item.title}</motion.div>
            <motion.p variants={{ r: { y: 18, opacity: 0 }, h: { y: 0, opacity: 1 } }} transition={{ duration: 0.5, ease, delay: 0.05 }} style={{ fontFamily: sans, fontSize: 'clamp(15px,1.3vw,19px)', lineHeight: 1.55, color: 'rgba(234,238,243,0.92)', margin: 0, maxWidth: '42ch' }}>{item.desc}</motion.p>
          </div>
        </motion.div>
      </motion.div>
    </Reveal>
  )
}

function Play() {
  return (
    <section id="play" style={{ position: 'relative', padding: 'clamp(70px,11vh,130px) clamp(20px,4vw,60px)', background: 'rgba(9,12,18,0.58)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}>
      <Reveal>
        <Tag style={{ marginBottom: 14 }}>Off the clock</Tag>
        <h2 style={{ ...MEGA, fontSize: 'clamp(44px,9vw,170px)', marginBottom: 'clamp(10px,2vh,18px)' }}>Who I am when<br />I&apos;m <span style={{ color: ACCENT }}>not shipping.</span></h2>
        <p style={{ fontFamily: sans, fontSize: 'clamp(14px,1.2vw,17px)', lineHeight: 1.5, color: 'rgba(234,238,243,0.6)', maxWidth: '48ch', marginBottom: 'clamp(28px,5vh,52px)' }}>The work keeps me busy, the rest keeps me sane. Hover any of these to read more.</p>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: 'clamp(14px,1.6vw,22px)' }}>
        {PLAY.map((item) => <PlayCard key={item.title} item={item} />)}
      </div>
    </section>
  )
}

/* ─── contact ─── */
const INFO: [string, string][] = [
  ['Based in', 'Dubai, UAE'],
  ['Open to', 'Founding · Senior · Remote'],
  ['Fuelled by', 'The hard, undone problems'],
  ['Reply time', 'usually same day'],
]
function Contact() {
  return (
    <section id="contact" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(90px,12vh,140px) clamp(20px,4vw,60px)' }}>
      <div style={{ width: '100%', maxWidth: 1500, margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'clamp(14px,2.4vh,26px)' }}>
            <span style={{ position: 'relative', width: 8, height: 8 }}>
              <span className="status-pulse" style={{ position: 'absolute', inset: 0, borderRadius: 999, background: ACCENT, opacity: 0.6 }} />
              <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: ACCENT }} />
            </span>
            <span style={{ fontFamily: grot, fontWeight: 600, fontSize: 13.5, color: 'rgba(234,238,243,0.8)' }}>Available for work</span>
          </div>
        </Reveal>

        {/* headline — reliable reveal, no overflow clip */}
        <Reveal delay={0.05}>
          <h2 className="pk-sheen" style={{ ...MEGA, fontSize: 'clamp(88px,20vw,340px)', color: ACCENT, lineHeight: 0.8 }}>Say hi</h2>
        </Reveal>

        {/* pitch + CTAs, left-aligned and grouped */}
        <div style={{ marginTop: 'clamp(26px,4.5vh,52px)', display: 'grid', gridTemplateColumns: 'minmax(0,1.15fr) minmax(0,0.85fr)', gap: 'clamp(30px,5vw,80px)', alignItems: 'end' }}>
          <div>
            <Reveal delay={0.1}>
              <p style={{ fontFamily: sans, fontSize: 'clamp(19px,2.2vw,32px)', fontWeight: 500, lineHeight: 1.32, color: INK, maxWidth: '20ch', margin: 0 }}>
                Building something interesting? I&apos;m open to founding and senior roles, and always up for a good problem.
              </p>
            </Reveal>
            <Reveal delay={0.15} style={{ marginTop: 'clamp(24px,3.5vh,40px)', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="mailto:pookus7790@gmail.com" data-hover style={{ fontFamily: grot, fontWeight: 700, fontSize: 14, color: BG, background: ACCENT, padding: '15px 26px', borderRadius: 999, textDecoration: 'none' }}>pookus7790@gmail.com →</a>
              <motion.a href="https://www.linkedin.com/in/poojakushwah1402/" target="_blank" rel="noreferrer" data-hover whileHover={{ borderColor: ACCENT, color: ACCENT }} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: grot, fontWeight: 600, fontSize: 13.5, color: INK, textDecoration: 'none', border: '1px solid rgba(234,238,243,0.22)', padding: '12px 18px', borderRadius: 999 }}><LinkedInIcon />LinkedIn</motion.a>
              <motion.a href="https://github.com/PoojaKushwah1402" target="_blank" rel="noreferrer" data-hover whileHover={{ borderColor: ACCENT, color: ACCENT }} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: grot, fontWeight: 600, fontSize: 13.5, color: INK, textDecoration: 'none', border: '1px solid rgba(234,238,243,0.22)', padding: '12px 18px', borderRadius: 999 }}><GitHubIcon />GitHub</motion.a>
            </Reveal>
          </div>

          {/* facts as a clean aligned strip */}
          <FromRight delay={0.2}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(234,238,243,0.1)', border: '1px solid rgba(234,238,243,0.12)', borderRadius: 14, overflow: 'hidden' }}>
              {INFO.map(([k, v]) => (
                <div key={k} style={{ background: 'rgba(11,13,19,0.9)', padding: 'clamp(16px,1.8vw,24px)' }}>
                  <div style={{ fontFamily: grot, fontWeight: 600, fontSize: 12, color: MUTE, marginBottom: 8 }}>{k}</div>
                  <div style={{ fontFamily: grot, fontWeight: 600, fontSize: 'clamp(14px,1.2vw,17px)', color: INK }}>{v}</div>
                </div>
              ))}
            </div>
          </FromRight>
        </div>

        <div style={{ marginTop: 'clamp(40px,7vh,84px)', paddingTop: 22, borderTop: '1px solid rgba(234,238,243,0.12)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: grot, fontWeight: 600, fontSize: 12, color: MUTE }}>© 2026 Pooja Kushwah · Dubai, UAE</span>
          <span style={{ fontFamily: grot, fontWeight: 600, fontSize: 12, color: MUTE }}>Built with Next.js · Three.js · Framer Motion</span>
        </div>
      </div>
    </section>
  )
}

/* ─── orchestrator ─── */
export default function PortfolioExperience() {
  const lenisRef = useRef<Lenis | null>(null)
  const [active, setActive] = useState('top')

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, touchMultiplier: 1.6 })
    lenisRef.current = lenis
    let raf = 0
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); lenisRef.current = null }
  }, [])

  useEffect(() => {
    const ids = ['top', 'work', 'about', 'stack', 'play', 'contact']
    const obs = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }) }, { rootMargin: '-45% 0px -45% 0px' })
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const goto = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: 0 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ position: 'relative', background: BG, color: INK, fontFamily: sans }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}><MountainJourney /></div>
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(90deg, rgba(8,9,12,0.82) 0%, rgba(8,9,12,0.34) 52%, rgba(8,9,12,0.06) 100%)' }} />

      <Nav goto={goto} active={active} />
      <Cursor />

      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <Work />
        <About />
        <Marquee items={FLOW} accent dur={42} />
        <Stack />
        <Play />
        <Contact />
      </main>
    </div>
  )
}
