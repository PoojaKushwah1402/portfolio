'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'
import * as THREE from 'three'
import Rollercoaster from './Rollercoaster'

/**
 * Cinematic camera — 4 phases based on scroll progress so the user feels
 * like they're riding through a film.
 */
function CameraRig({
  progressRef,
  mouseRef,
}: {
  progressRef: React.MutableRefObject<number>
  mouseRef: React.MutableRefObject<{ x: number; y: number }>
}) {
  const target = useRef(new THREE.Vector3(6, 5, 12))
  const look = useRef(new THREE.Vector3(0, 2, 0))

  useFrame((state) => {
    const p = progressRef.current

    // 4 phases across the scroll
    if (p < 0.25) {
      const t = p / 0.25
      // Phase 1: wide overview — orbits from right to front
      target.current.set(
        8 - t * 6,
        6 - t * 1,
        10 + t * 3
      )
      look.current.set(0, 2, 0)
    } else if (p < 0.5) {
      const t = (p - 0.25) / 0.25
      // Phase 2: dive in and sweep left
      target.current.set(
        2 - t * 10,
        5 - t * 2,
        13 - t * 5
      )
      look.current.set(t * -2, 2, t * 1)
    } else if (p < 0.75) {
      const t = (p - 0.5) / 0.25
      // Phase 3: close follow — rear/side of track
      target.current.set(
        -8 + t * 4,
        3 - t * 0.5,
        8 - t * 4
      )
      look.current.set(-2 + t * 2, 2 + t, 1 + t * 2)
    } else {
      const t = (p - 0.75) / 0.25
      // Phase 4: pull back for the finale
      target.current.set(
        -4 + t * 10,
        2.5 + t * 5,
        4 + t * 14
      )
      look.current.set(0, 2, 0)
    }

    // Breathing oscillation
    const breath = Math.sin(state.clock.elapsedTime * 0.3) * 0.15

    state.camera.position.lerp(
      new THREE.Vector3(
        target.current.x + mouseRef.current.x * 0.8,
        target.current.y + mouseRef.current.y * 0.4 + breath,
        target.current.z
      ),
      0.04
    )
    state.camera.lookAt(look.current)
  })

  return null
}

export default function RollercoasterScene() {
  const progressRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onScroll = () => {
      const h = document.body.scrollHeight - window.innerHeight
      progressRef.current = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0
    }
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <Canvas
      camera={{ position: [6, 5, 12], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <color attach="background" args={['#FEFAF0']} />
        <fog attach="fog" args={['#FEFAF0', 18, 46]} />

        <hemisphereLight args={['#FFFCF6', '#F0E5CA', 1.1]} />
        <ambientLight intensity={0.75} />
        <directionalLight position={[8, 14, 6]} intensity={1.3} color="#FFF6E0" />
        <directionalLight position={[-6, 8, -4]} intensity={0.5} color="#E8F4F6" />
        <pointLight position={[-8, 4, 3]} intensity={0.7} color="#D9953A" />
        <pointLight position={[6, 2, -6]} intensity={0.55} color="#2FA0AA" />

        <CameraRig progressRef={progressRef} mouseRef={mouseRef} />
        <Rollercoaster progressRef={progressRef} />
      </Suspense>
    </Canvas>
  )
}
