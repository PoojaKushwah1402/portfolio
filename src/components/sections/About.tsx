'use client'

import { motion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const timeline = [
  { year: '2019', label: 'Amdocs', detail: 'Telecom, CRM, billing' },
  { year: '2021', label: 'Bridgei2i', detail: 'Analytics dashboards' },
  { year: '2022', label: 'group.one', detail: 'European e-commerce' },
  { year: '2024', label: 'Macro Rides', detail: 'Co-founder & CTO' },
  { year: '2025', label: 'Livjaza', detail: 'Senior FS' },
]

const stats = [
  { to: 7, suffix: '', label: 'Years shipping' },
  { to: 8, suffix: '×', label: 'Faster · 7s to 1s' },
  { to: 90, suffix: '%', label: 'Test coverage' },
  { to: 5, suffix: '', label: 'Industries' },
]

export default function About() {
  return (
    <section id="about" className="relative px-6 md:px-10 lg:px-16 py-10 md:py-14">
      <div className="max-w-6xl mx-auto">
        <div className="bg-cream/75 backdrop-blur-md rounded-3xl p-6 md:p-10 lg:p-12 shadow-2xl shadow-ink/5 border border-ink/5">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="flex items-baseline gap-3 mb-6"
          >
            <div className="h-px w-8 bg-accent" />
            <span className="font-display italic text-[15px] text-accent lowercase">
              about the driver.
            </span>
          </motion.div>

          <h2 className="font-display text-[clamp(28px,4.5vw,64px)] leading-[1.05] tracking-[-0.03em] text-ink mb-10 max-w-4xl">
            <SplitText
              text="I build what other engineers don&apos;t want to touch."
              stagger={0.045}
              as="span"
            />
            <span className="block italic text-accent mt-2">
              <SplitText text="Then I ship it." stagger={0.06} delay={0.2} as="span" />
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="md:col-span-7 space-y-5 text-[15px] md:text-[16px] leading-[1.75] text-ink/75 font-sans"
            >
              <p>
                I&apos;ve shipped e-commerce to{' '}
                <span className="text-ink font-semibold">hundreds of thousands</span>{' '}
                of European shoppers, taken a frontend from{' '}
                <span className="text-ink font-semibold">7 seconds to under 1</span>,
                and built a ride-hailing platform that ran{' '}
                <span className="text-accent font-semibold">real rides on real riders</span>{' '}
                in Delhi.
              </p>
              <p>
                I picked up <span className="text-ink font-semibold">Go and Django</span>{' '}
                at Livjaza on the job. Not because I knew them. Because someone had to.
                At Macro Rides I write the rider app, argue with Cashfree support,
                interview candidates, and pitch investors. CTO is a job title that means{' '}
                <em className="font-display text-[17px] md:text-[18px]">does everything</em>.
              </p>
              <p className="text-ink">
                AI tooling to move faster, deliberately, not as a crutch.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="md:col-span-5 grid grid-cols-2 gap-6 md:gap-8 border-l border-ink/15 md:pl-10"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <div className="font-display text-[clamp(38px,5.5vw,74px)] leading-none tracking-[-0.02em] text-accent">
                    <AnimatedCounter to={s.to} suffix={s.suffix} duration={1.6} />
                  </div>
                  <div className="font-sans text-[12px] text-ink/55 mt-3">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="relative pt-8 border-t border-ink/15"
          >
            <div className="flex items-baseline gap-3 mb-8">
              <div className="h-px w-6 bg-accent" />
              <span className="font-display italic text-[13px] text-ink/55 lowercase">
                trajectory.
              </span>
            </div>

            <div className="relative">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-[9px] left-0 right-0 h-px bg-ink/15 origin-left"
              />

              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6 relative">
                {timeline.map((t, i) => (
                  <motion.div
                    key={t.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                    className="relative"
                  >
                    <div className="relative mb-4 h-5">
                      <motion.div
                        animate={{
                          scale: [1, 1.8, 1],
                          opacity: [0.6, 0, 0.6],
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                        className="absolute top-0 left-0 w-5 h-5 bg-accent rounded-full"
                      />
                      <div className="relative w-3 h-3 bg-accent rounded-full blob" />
                    </div>

                    <div className="font-display italic text-[14px] text-accent mb-1">
                      {t.year}
                    </div>
                    <div className="font-display text-lg md:text-xl text-ink mb-1">
                      {t.label}
                    </div>
                    <div className="text-[12px] text-ink/55 font-sans">{t.detail}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
