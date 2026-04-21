'use client'

import { motion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'

const hobbies = [
  {
    title: 'Roller coasters',
    line: 'The name of this site is not a metaphor.',
    detail:
      "If there's a track, a drop, and a chance of G-forces, I'm in line. I've ridden more coasters than I've shipped projects. Debatable whether that's a flex.",
    tint: 'teal',
  },
  {
    title: 'Trekking',
    line: 'Silence, altitude, no wifi. Perfect.',
    detail:
      'I hike to places where the notification icon finally shuts up. The best debugging happens at 3,500m where nothing connects back to Slack and the only thing pinging you is oxygen.',
    tint: 'olive',
  },
  {
    title: 'Travel',
    line: 'Mostly for the food. Let’s be honest.',
    detail:
      'Countries collected: losing count. Souvenir policy: none. Food policy: eat what the locals eat, even when my stomach files a formal objection.',
    tint: 'warm',
  },
  {
    title: 'Adventure sports',
    line: 'Rafting, paragliding, whatever has a waiver.',
    detail:
      'If I have to sign a document saying "I understand the risks", I probably want to try it. Favorite jump: Pokhara, 1,500m. Favorite raft: Rishikesh, class III.',
    tint: 'plum',
  },
]

const tintStyles: Record<string, string> = {
  teal: 'bg-accent text-cream',
  olive: 'bg-olive text-cream',
  warm: 'bg-warm text-ink',
  plum: 'bg-plum text-cream',
}

export default function OffTheClock() {
  return (
    <section id="play" className="relative px-6 md:px-10 lg:px-16 py-10 md:py-14">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex items-baseline gap-3 mb-6"
        >
          <div className="h-px w-8 bg-accent" />
          <span className="font-display italic text-[15px] text-accent lowercase">
            off the clock.
          </span>
        </motion.div>

        <h2 className="font-display text-[clamp(40px,7vw,110px)] leading-[0.9] tracking-[-0.04em] text-ink mb-3">
          <SplitText text="When I&apos;m" stagger={0.05} as="span" />
        </h2>
        <h2 className="font-display italic text-[clamp(40px,7vw,110px)] leading-[0.9] tracking-[-0.04em] text-accent mb-10 md:mb-14">
          <SplitText text="not shipping." stagger={0.07} delay={0.2} as="span" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {hobbies.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className={`group relative rounded-3xl p-6 md:p-7 overflow-hidden ${tintStyles[h.tint]}`}
              data-hover
            >
              <div className="relative">
                <h3 className="font-display text-[clamp(28px,3vw,40px)] leading-[0.95] tracking-[-0.02em] mb-3">
                  {h.title}
                </h3>

                <p className="font-display italic text-[17px] md:text-[19px] leading-[1.2] opacity-95 mb-4">
                  {h.line}
                </p>

                <p className="font-sans text-[13px] leading-relaxed opacity-80">
                  {h.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
