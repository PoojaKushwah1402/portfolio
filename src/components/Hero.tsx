'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-end section-padding pb-16 md:pb-24">
      {/* Subtle glow */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-accent/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-text-secondary text-sm md:text-base mb-6"
        >
          Pooja Kushwah — Co-Founder & Technical Lead
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-display mb-8"
        >
          I&apos;ve shipped code at 2am in a{' '}
          <em className="text-accent">3-person startup</em> and in a
          3,000-person enterprise.{' '}
          <span className="text-text-secondary">Both times, it had to work.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-text-muted"
        >
          <span>6+ years shipping production systems</span>
          <span className="hidden sm:inline text-border">—</span>
          <span>AI · Full-Stack · Cloud · E-Commerce</span>
          <span className="hidden sm:inline text-border">—</span>
          <span>Dubai, UAE</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-10 flex gap-4"
        >
          <a
            href="#work"
            className="text-sm text-text-primary border-b border-text-primary pb-1 hover:border-accent hover:text-accent transition-colors"
          >
            See my work
          </a>
          <a
            href="#contact"
            className="text-sm text-text-muted hover:text-text-primary transition-colors"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 md:right-12 lg:right-20"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-text-muted to-transparent"
        />
      </motion.div>
    </section>
  )
}
