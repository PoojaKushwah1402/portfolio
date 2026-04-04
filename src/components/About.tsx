'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-20 md:py-32 section-padding">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-serif text-heading mb-12 md:mb-16"
        >
          About
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-7 space-y-5 text-text-secondary text-[15px] leading-[1.75]"
          >
            <p>
              Started in Pune, India — building telecom systems at Amdocs where I
              learned what it means to ship software that millions of people depend on.
              Enterprise taught me discipline. It also taught me I wanted to move faster.
            </p>
            <p>
              Moved to analytics consulting at Bridgei2i. Built data pipelines and
              predictive dashboards for enterprise clients. Good work, but I wanted to
              own the product, not just the pipeline.
            </p>
            <p>
              Then Dubai. group.one hired me to help scale their European e-commerce
              platform. Payment systems, AI recommendation engines, multi-region database
              sharding, frontend performance from painful to fast. This is where I learned
              what it takes to ship software that handles real money across real borders.
            </p>
            <p className="text-text-primary">
              Now I&apos;m co-founding Macro Rides. Every technical decision is mine — from
              database schema to deployment pipeline. Building a company is different from
              building features. Every line of code has to earn its place.
            </p>
          </motion.div>

          {/* Markers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-5 md:pt-2"
          >
            <div className="space-y-8">
              {[
                { when: '2019', what: 'Amdocs — enterprise telecom' },
                { when: '2021', what: 'Bridgei2i — analytics consulting' },
                { when: '2022', what: 'group.one — Dubai, e-commerce at scale' },
                { when: '2024', what: 'Macro Rides — co-founder' },
              ].map((m) => (
                <div key={m.when} className="flex gap-6 items-baseline">
                  <span className="font-mono text-xs text-accent w-10 flex-shrink-0">{m.when}</span>
                  <span className="text-text-secondary text-sm">{m.what}</span>
                </div>
              ))}
            </div>

            <div className="mt-14 pt-8 border-t border-border">
              <p className="font-serif italic text-lg text-text-secondary leading-relaxed">
                &ldquo;Ship it, measure it, fix it.
                A running system beats a perfect diagram.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
