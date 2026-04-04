'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if ('ontouchstart' in window) return

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  if (!visible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[999] mix-blend-difference"
      animate={{ x: pos.x - 4, y: pos.y - 4 }}
      transition={{ type: 'spring', stiffness: 600, damping: 30, mass: 0.3 }}
    />
  )
}
