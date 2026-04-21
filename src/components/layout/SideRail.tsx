'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function SideRail() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const h = document.body.scrollHeight - window.innerHeight
      const p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0
      setProgress(p)
      setVisible(window.scrollY > 120)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 pointer-events-none hidden md:flex flex-col items-center gap-4"
    >
      <span className="font-display italic text-[22px] md:text-[24px] leading-none text-ink">
        poo<span className="text-accent">.</span>
      </span>
      <div className="relative h-56 w-[3px] bg-ink/15 overflow-hidden rounded-full">
        <motion.div
          className="absolute top-0 left-0 w-full bg-accent rounded-full"
          style={{ height: `${progress * 100}%` }}
          transition={{ type: 'tween' }}
        />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(14,124,134,0.7)] ring-2 ring-cream"
          style={{ top: `calc(${progress * 100}% - 6px)` }}
        />
      </div>
      <span className="font-display italic text-[13px] text-ink/80 tabular-nums leading-none">
        {String(Math.round(progress * 100)).padStart(2, '0')}
      </span>
    </motion.aside>
  )
}
