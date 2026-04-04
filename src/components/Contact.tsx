'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="py-20 md:py-32 section-padding">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-serif text-display mb-8"
        >
          Building something
          <br />
          interesting<em className="text-accent">?</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-text-secondary text-lg max-w-md mb-12"
        >
          I&apos;m always open to conversations about products, architecture,
          and ambitious ideas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-x-10 gap-y-4 text-sm"
        >
          <a
            href="mailto:pookus7790@gmail.com"
            className="text-text-primary hover:text-accent transition-colors border-b border-text-muted pb-0.5"
          >
            pookus7790@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/pooja-kushwah-b22584137/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary hover:text-accent transition-colors border-b border-text-muted pb-0.5"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/PoojaKushwah1402"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary hover:text-accent transition-colors border-b border-text-muted pb-0.5"
          >
            GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
