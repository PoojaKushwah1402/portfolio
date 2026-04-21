'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const sx = useSpring(mx, { stiffness: 500, damping: 30, mass: 0.3 })
  const sy = useSpring(my, { stiffness: 500, damping: 30, mass: 0.3 })
  const rx = useSpring(mx, { stiffness: 200, damping: 22, mass: 0.8 })
  const ry = useSpring(my, { stiffness: 200, damping: 22, mass: 0.8 })

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
      <motion.div
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="fixed top-0 left-0 w-2 h-2 bg-ink rounded-full z-[9999] mix-blend-difference"
      />
      <motion.div
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: hovering ? 1.6 : 1,
          opacity: hovering ? 1 : 0.6,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="fixed top-0 left-0 w-10 h-10 border border-accent rounded-full z-[9999]"
      />
    </div>
  )
}
