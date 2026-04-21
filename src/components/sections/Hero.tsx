'use client'

import { motion } from 'framer-motion'

const LOAD = 1.7

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-end pt-24 pb-10"
    >
      {/* Main hero */}
      <div className="relative z-10 px-6 md:px-10 lg:px-16 pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: LOAD + 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display leading-[0.9] tracking-[-0.03em] text-ink max-w-[10ch] mix-blend-multiply"
        >
          <span className="block text-[clamp(64px,13vw,200px)] distort">Pooja</span>
          <span className="block text-[clamp(64px,13vw,200px)] italic text-accent mt-[-0.1em] distort">
            Kushwah.
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: LOAD + 0.6, duration: 0.8 }}
          className="mt-8 md:mt-10 max-w-xl pointer-events-auto"
        >
          <p className="font-display text-[clamp(20px,2.4vw,32px)] leading-[1.15] tracking-[-0.02em] text-ink">
            Give me a problem no one wants to touch.{' '}
            <em className="text-accent">I&apos;ll ship it.</em>
          </p>
          <p className="mt-3 font-sans text-[14px] md:text-[15px] leading-relaxed text-ink/65 max-w-md">
            7 years. 4 companies. 1 startup I co-founded. Strap in.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: LOAD + 0.9, duration: 0.6 }}
          className="mt-6 flex flex-wrap items-center gap-3 pointer-events-auto"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 bg-ink text-cream font-sans font-medium text-[13px] px-6 py-3 rounded-full hover:bg-accent transition-colors duration-300"
            data-hover
          >
            Start the ride
            <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-ink/30 hover:border-ink text-ink font-sans font-medium text-[13px] px-6 py-3 rounded-full transition-all"
            data-hover
          >
            Say hi
          </a>
        </motion.div>
      </div>

      {/* Bottom scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: LOAD + 1.2, duration: 0.6 }}
        className="relative z-10 px-6 md:px-10 lg:px-16 mt-10 flex items-end"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 text-ink/45"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
