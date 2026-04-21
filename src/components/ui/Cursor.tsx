'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
} from 'framer-motion'

export default function Cursor() {
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)

  // Inner dot — snappy
  const sx = useSpring(mx, { stiffness: 700, damping: 38, mass: 0.3 })
  const sy = useSpring(my, { stiffness: 700, damping: 38, mass: 0.3 })

  // Outer ring — trails slightly
  const rx = useSpring(mx, { stiffness: 170, damping: 20, mass: 0.85 })
  const ry = useSpring(my, { stiffness: 170, damping: 20, mass: 0.85 })

  // Compass rotation based on mouse velocity direction
  const rotation = useMotionValue(0)
  const prevX = useRef(0)
  const prevY = useRef(0)
  const targetRot = useRef(0)
  const idleSpin = useRef(0)

  useAnimationFrame((_, delta) => {
    const x = mx.get()
    const y = my.get()
    const dx = x - prevX.current
    const dy = y - prevY.current
    const speed = Math.sqrt(dx * dx + dy * dy)

    if (speed > 0.4) {
      targetRot.current = Math.atan2(dy, dx) * (180 / Math.PI) + 90
    } else {
      // When idle, gently drift the tick (founder-fidget)
      idleSpin.current += (delta / 1000) * 10
      targetRot.current = idleSpin.current
    }

    const current = rotation.get()
    let diff = targetRot.current - current
    while (diff > 180) diff -= 360
    while (diff < -180) diff += 360
    rotation.set(current + diff * 0.18)

    prevX.current = x
    prevY.current = y
  })

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true)
      return
    }
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      setVisible(true)
    }
    const update = () => {
      const nodes = document.querySelectorAll(
        'a, button, [data-hover], input, textarea, [role="button"]'
      )
      nodes.forEach((el) => {
        el.addEventListener('mouseenter', () => setHovering(true))
        el.addEventListener('mouseleave', () => setHovering(false))
      })
    }
    window.addEventListener('mousemove', onMove)
    update()
    const obs = new MutationObserver(update)
    obs.observe(document.body, { childList: true, subtree: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      obs.disconnect()
    }
  }, [mx, my])

  if (isTouch || !visible) return null

  return (
    <div className="custom-cursor pointer-events-none">
      {/* Outer ring with rotating compass tick */}
      <motion.div
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovering ? 1.5 : 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 20 }}
        className="fixed top-0 left-0 w-11 h-11 z-[9999]"
      >
        {/* Main ring */}
        <div
          className={`absolute inset-0 rounded-full border transition-[background-color,border-color] duration-200 ${
            hovering
              ? 'border-accent bg-accent/10'
              : 'border-ink/25 bg-cream/5'
          }`}
        />
        {/* Secondary offset ring for depth */}
        <div
          className={`absolute inset-[3px] rounded-full border border-dashed transition-opacity duration-200 ${
            hovering ? 'border-accent/40 opacity-100' : 'border-ink/10 opacity-50'
          }`}
        />
        {/* Compass tick — rotates with mouse direction */}
        <motion.div
          style={{ rotate: rotation }}
          className="absolute inset-0"
        >
          <span
            className={`absolute left-1/2 -translate-x-1/2 -top-[3.5px] w-[7px] h-[7px] rounded-full ${
              hovering ? 'bg-accent' : 'bg-accent'
            } shadow-[0_0_6px_rgba(14,124,134,0.6)]`}
          />
          {/* Opposite tick — tiny */}
          <span
            className={`absolute left-1/2 -translate-x-1/2 -bottom-[1.5px] w-[3px] h-[3px] rounded-full ${
              hovering ? 'bg-warm' : 'bg-warm/70'
            }`}
          />
        </motion.div>
      </motion.div>

      {/* Inner dot — italic serif asterisk for premium feel */}
      <motion.div
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: hovering ? 0 : 1,
          opacity: hovering ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="fixed top-0 left-0 z-[9999] flex items-center justify-center"
      >
        <span className="w-2 h-2 rounded-full bg-ink mix-blend-difference" />
      </motion.div>

      {/* Hover affordance — italic serif arrow on hover */}
      <motion.div
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: hovering ? 1 : 0,
          opacity: hovering ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        className="fixed top-0 left-0 z-[9999] flex items-center justify-center pointer-events-none"
      >
        <span className="font-display italic text-accent text-[14px] leading-none select-none">
          ↗
        </span>
      </motion.div>
    </div>
  )
}
