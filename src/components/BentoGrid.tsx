'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const card = (delay: number) => ({
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  },
})

const stackItems = [
  { name: 'React', detail: '5+ yrs · primary' },
  { name: 'Next.js', detail: '3+ yrs · primary' },
  { name: 'NestJS', detail: '3+ yrs · primary' },
  { name: 'Node', detail: '5+ yrs · primary' },
  { name: 'TypeScript', detail: '5+ yrs · daily' },
  { name: 'Python', detail: '3+ yrs · frequent' },
  { name: 'Go', detail: '1+ yr · startup' },
  { name: 'Angular', detail: '2+ yrs · startup' },
  { name: 'AWS', detail: '4+ yrs · primary' },
  { name: 'Docker', detail: '4+ yrs · daily' },
  { name: 'K8s', detail: '2+ yrs · infra' },
  { name: 'Terraform', detail: '2+ yrs · IaC' },
  { name: 'PostgreSQL', detail: '4+ yrs · primary' },
  { name: 'LangChain', detail: '1+ yr · AI' },
  { name: 'Pinecone', detail: '1+ yr · vectors' },
  { name: 'OpenAI', detail: '2+ yrs · AI' },
]

export default function BentoGrid() {
  const [hStack, setHStack] = useState<number | null>(null)

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="grid grid-cols-4 md:grid-cols-12 gap-3 md:gap-4 p-3 md:p-4 max-w-[1440px] mx-auto"
    >
      {/* ═══════════════ HERO — spans full width, tall ═══════════════ */}
      <motion.div
        variants={card(0)}
        className="col-span-4 md:col-span-12 bg-cream-bg rounded-card p-8 md:p-14 lg:p-20 relative overflow-hidden min-h-[70vh] md:min-h-[80vh] flex flex-col justify-between"
      >
        {/* Big background name */}
        <div className="absolute top-6 right-6 md:top-10 md:right-14 lg:right-20">
          <span className="font-primary font-extrabold text-[clamp(60px,12vw,180px)] leading-none text-cream-text/[0.04] select-none whitespace-nowrap">
            POOJA
          </span>
        </div>

        <div className="relative z-10">
          <p className="font-mono text-[10px] md:text-[11px] text-gold tracking-[0.15em] uppercase mb-6">
            Co-Founder · Macro Rides · Dubai
          </p>
        </div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="font-primary font-extrabold text-[clamp(32px,5.5vw,72px)] leading-[1.05] tracking-[-0.03em] text-cream-text mb-6">
            Give me a problem
            <br />no one wants
            <br />to touch.{' '}
            <span className="text-gold italic">I&apos;ll ship it.</span>
          </h1>
          <p className="text-[15px] md:text-[17px] text-cream-muted max-w-lg mb-10 leading-relaxed">
            6+ years turning hard problems into running systems.
            Enterprise telecom → AI products → now building my own.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 bg-cream-text text-cream-bg font-primary font-bold text-[13px] px-7 py-3.5 rounded-btn hover:bg-cream-text/85 transition-colors tracking-wide uppercase"
            >
              See my work
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a
              href="mailto:pookus7790@gmail.com"
              className="inline-flex items-center gap-2 border-2 border-cream-text/20 text-cream-text font-primary font-bold text-[13px] px-7 py-3.5 rounded-btn hover:bg-cream-text hover:text-cream-bg transition-all tracking-wide uppercase"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>

        {/* Location */}
        <div className="absolute bottom-8 right-8 md:bottom-14 md:right-14 flex items-center gap-2">
          <span className="font-mono text-[10px] text-cream-muted/50">Based in Dubai, UAE</span>
        </div>
      </motion.div>

      {/* ═══════════════ ROW 2: Role + Slogan + Stats ═══════════════ */}

      {/* Role */}
      <motion.div
        variants={card(0.1)}
        className="col-span-4 md:col-span-4 bg-card border border-card-border rounded-card p-7 md:p-10 flex flex-col justify-end relative overflow-hidden min-h-[240px] md:min-h-[280px]"
      >
        <span className="vertical-label absolute top-6 left-5">Role</span>
        <h2 className="font-primary font-extrabold text-[clamp(26px,3.5vw,42px)] leading-[1.05] tracking-[-0.03em] text-txt-primary pl-5">
          Co-Founder
          <br />&amp; Technical
          <br />Lead
        </h2>
      </motion.div>

      {/* Slogan */}
      <motion.div
        variants={card(0.15)}
        className="col-span-4 md:col-span-4 bg-card border border-card-border rounded-card p-7 md:p-10 flex flex-col justify-end relative overflow-hidden min-h-[240px] md:min-h-[280px]"
      >
        <span className="vertical-label absolute top-6 left-5">Mantra</span>
        <h2 className="font-primary font-extrabold text-[clamp(26px,3.5vw,42px)] leading-[1.05] tracking-[-0.03em] text-gold pl-5">
          Ship it.
          <br />Fix it.
          <br />Scale it.
        </h2>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={card(0.2)}
        className="col-span-4 md:col-span-4 bg-card border border-card-border rounded-card p-7 md:p-10 flex flex-col justify-between min-h-[240px] md:min-h-[280px]"
      >
        <span className="font-mono text-[9px] text-txt-hint uppercase tracking-[0.12em]">Numbers</span>
        <div className="space-y-6">
          <div>
            <span className="font-primary font-extrabold text-[48px] md:text-[56px] text-gold leading-none block">4.5×</span>
            <span className="font-mono text-[10px] text-txt-muted">faster · 6.7s → 1.2s</span>
          </div>
          <div>
            <span className="font-primary font-extrabold text-[48px] md:text-[56px] text-txt-primary leading-none block">90%</span>
            <span className="font-mono text-[10px] text-txt-muted">test coverage · zero-bug releases</span>
          </div>
        </div>
      </motion.div>

      {/* ═══════════════ ROW 3: About (full width) ═══════════════ */}

      <motion.div
        variants={card(0.25)}
        className="col-span-4 md:col-span-12 bg-card border border-card-border rounded-card p-8 md:p-12 lg:p-16 relative overflow-hidden"
      >
        <div className="ghost-text-vertical">About</div>
        <div className="md:pl-14 lg:pl-20 max-w-4xl">
          <p className="text-[15px] md:text-[16px] text-txt-body leading-[1.85] mb-8">
            I solve the problems nobody wants to touch. Started at{' '}
            <strong className="text-txt-primary font-semibold">Amdocs</strong>{' '}
            building telecom for millions, moved to{' '}
            <strong className="text-txt-primary font-semibold">analytics consulting</strong>{' '}
            at Bridgei2i, then scaled{' '}
            <strong className="text-txt-primary font-semibold">European e-commerce</strong>{' '}
            at group.one in Dubai — payments, AI recommendations, multi-region
            sharding, the works. Picked up{' '}
            <strong className="text-txt-primary font-semibold">Django, Go, Angular</strong>{' '}
            at a 3-person startup where I had to figure it out or we didn&apos;t ship.
            Now I&apos;m co-founding{' '}
            <strong className="text-txt-primary font-semibold">Macro Rides</strong>{' '}
            — every technical decision, mine.
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              { name: 'LinkedIn', href: 'https://www.linkedin.com/in/pooja-kushwah-b22584137/' },
              { name: 'GitHub', href: 'https://github.com/PoojaKushwah1402' },
              { name: 'Email', href: 'mailto:pookus7790@gmail.com' },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                target={s.name !== 'Email' ? '_blank' : undefined}
                rel={s.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-pill text-txt-secondary text-[13px] hover:border-gold/20 hover:text-gold transition-all"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ═══════════════ ROW 4: Featured Projects ═══════════════ */}

      {[
        {
          tag: 'Co-founded · Current', name: 'Macro Rides',
          desc: 'Mobility startup. Built entire platform from first commit — vendor management, booking, real-time availability, payments.',
          tech: 'NestJS · PostgreSQL · AWS · BullMQ', impactBig: '0→1', impactSmall: 'Live product',
        },
        {
          tag: 'group.one · Dubai', name: 'E-Commerce Platform',
          desc: 'End-to-end webshop for European markets. AI recommendations, MCP, Stripe/PayPal, multi-region sharding.',
          tech: 'React · CockroachDB · Docker · Stripe', impactBig: '90%', impactSmall: 'Test coverage',
        },
      ].map((p, i) => (
        <motion.div
          key={p.name}
          id={i === 0 ? 'work' : undefined}
          variants={card(0.3 + i * 0.08)}
          className="col-span-4 md:col-span-6 bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-card p-7 md:p-10 gold-glow-top hover:border-[rgba(196,161,66,0.2)] hover:bg-[rgba(255,255,255,0.06)] transition-all group min-h-[260px] flex flex-col justify-between"
        >
          <div>
            <span className="font-mono text-[9px] text-gold uppercase tracking-[0.12em] block mb-4">
              {p.tag}
            </span>
            <h3 className="font-primary font-extrabold text-[clamp(24px,3vw,34px)] text-txt-primary mb-4 tracking-[-0.02em]">
              {p.name}
            </h3>
            <p className="text-[14px] text-txt-secondary leading-relaxed">
              {p.desc}
            </p>
          </div>

          <div className="border-t border-[rgba(255,255,255,0.06)] pt-5 mt-6 flex items-end justify-between">
            <span className="font-mono text-[10px] text-txt-hint">{p.tech}</span>
            <div className="text-right">
              <span className="font-primary font-extrabold text-2xl text-gold block leading-none">
                {p.impactBig}
              </span>
              <span className="font-mono text-[9px] text-txt-muted">{p.impactSmall}</span>
            </div>
          </div>
        </motion.div>
      ))}

      {/* ═══════════════ ROW 5: Compact Projects ═══════════════ */}

      {[
        { tag: 'Machine Learning', name: 'AI Recommendation Engine', desc: 'AI-driven product discovery. MCP for dynamic, context-aware features.', impactBig: '↑', impactSmall: 'Engagement' },
        { tag: 'Early-Stage Startup', name: 'Performance Overhaul', desc: 'Frontend from 6-7s to under 2s. Systematic profiling, caching, lazy loading.', impactBig: '4.5×', impactSmall: 'Faster' },
        { tag: 'Infrastructure', name: 'Proxy Email System', desc: 'Proxy email with channel manager integrations. Routing, forwarding, tracking.', impactBig: '→', impactSmall: 'Automated' },
        { tag: 'Integration', name: 'Calendar Sync (iCal)', desc: 'Bidirectional iCal sync. Eliminated double-bookings across channels.', impactBig: '0', impactSmall: 'Double-bookings' },
        { tag: 'Immersive Tech', name: 'Google VR Integration', desc: 'Google VR for immersive 360° property walkthroughs.', impactBig: 'VR', impactSmall: 'Immersive UX' },
      ].map((p, i) => (
        <motion.div
          key={p.name}
          variants={card(0.46 + i * 0.06)}
          className={`col-span-4 ${
            i < 3 ? 'md:col-span-4' : 'md:col-span-6'
          } bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-card p-6 md:p-8 gold-glow-top hover:border-[rgba(196,161,66,0.15)] hover:bg-[rgba(255,255,255,0.05)] transition-all min-h-[200px] flex flex-col justify-between`}
        >
          <div>
            <span className="font-mono text-[9px] text-gold uppercase tracking-[0.12em] block mb-3">
              {p.tag}
            </span>
            <h4 className="font-primary font-bold text-[18px] text-txt-primary mb-2 tracking-[-0.01em]">
              {p.name}
            </h4>
            <p className="text-[13px] text-txt-secondary leading-relaxed">
              {p.desc}
            </p>
          </div>
          <div className="flex items-baseline justify-between mt-4 pt-4 border-t border-[rgba(255,255,255,0.04)]">
            <span className="font-primary font-extrabold text-xl text-gold">{p.impactBig}</span>
            <span className="font-mono text-[9px] text-txt-muted">{p.impactSmall}</span>
          </div>
        </motion.div>
      ))}

      {/* ═══════════════ ROW 6: Stack + CTA ═══════════════ */}

      {/* Stack */}
      <motion.div
        variants={card(0.76)}
        className="col-span-4 md:col-span-9 bg-card border border-card-border rounded-card p-7 md:p-10"
      >
        <span className="font-mono text-[9px] text-txt-muted uppercase tracking-[0.12em] block mb-8">
          Stack — hover to explore
        </span>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {stackItems.map((item, i) => (
            <div
              key={item.name}
              className="relative px-4 py-4 cursor-default"
              onMouseEnter={() => setHStack(i)}
              onMouseLeave={() => setHStack(null)}
            >
              <span
                className={`font-primary font-bold text-[16px] block transition-colors ${
                  hStack === i ? 'text-gold' : 'text-[#8A8578]'
                }`}
              >
                {item.name}
              </span>

              <motion.div
                initial={false}
                animate={{ height: hStack === i ? 'auto' : 0, opacity: hStack === i ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <span className="font-mono text-[9px] text-txt-hint block mt-1">{item.detail}</span>
              </motion.div>

              <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-[rgba(255,255,255,0.03)] rounded-full overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{ scaleX: hStack === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gold origin-left"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA gold */}
      <motion.a
        href="mailto:pookus7790@gmail.com"
        variants={card(0.84)}
        className="col-span-4 md:col-span-3 bg-gradient-to-br from-gold via-gold-light to-gold-dark rounded-card p-7 md:p-10 flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-transform min-h-[240px]"
        whileHover={{ scale: 1.02 }}
      >
        <div>
          <h3 className="font-primary font-extrabold text-[28px] text-page leading-tight mb-3">
            Let&apos;s
            <br />build.
          </h3>
          <p className="text-[11px] text-page/50">
            pookus7790@gmail.com
          </p>
        </div>

        <div className="flex justify-end">
          <div className="w-12 h-12 rounded-full bg-page/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-page" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </motion.a>

      {/* ═══════════════ Footer ═══════════════ */}
      <motion.div
        variants={card(0.92)}
        className="col-span-4 md:col-span-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-txt-hint text-[11px]"
      >
        <span className="font-primary font-bold text-[13px] text-txt-muted">&copy; {new Date().getFullYear()} Pooja Kushwah</span>
        <div className="flex gap-8">
          <a href="mailto:pookus7790@gmail.com" className="hover:text-gold transition-colors">Email</a>
          <a href="https://www.linkedin.com/in/pooja-kushwah-b22584137/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">LinkedIn</a>
          <a href="https://github.com/PoojaKushwah1402" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">GitHub</a>
        </div>
      </motion.div>
    </motion.div>
  )
}
