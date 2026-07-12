'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const FOG = '#243a4f'
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

type ScrollRef = React.MutableRefObject<number>
type PtrRef = React.MutableRefObject<{ x: number; y: number }>

/* ── value-noise fbm terrain ── */
function hash(x: number, z: number) { const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453; return s - Math.floor(s) }
function vnoise(x: number, z: number) {
  const xi = Math.floor(x), zi = Math.floor(z), xf = x - xi, zf = z - zi
  const u = xf * xf * (3 - 2 * xf), v = zf * zf * (3 - 2 * zf)
  const a = hash(xi, zi), b = hash(xi + 1, zi), c = hash(xi, zi + 1), d = hash(xi + 1, zi + 1)
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v
}
function fbm(x: number, z: number) { let f = 0, amp = 0.5, freq = 1; for (let i = 0; i < 4; i++) { f += amp * vnoise(x * freq, z * freq); freq *= 2.03; amp *= 0.5 } return f }
function heightAt(x: number, z: number) {
  const base = Math.pow(fbm(x * 0.012 + 10, z * 0.012 + 5), 1.25)
  const valley = THREE.MathUtils.clamp(Math.abs(x) / 62, 0, 1) // 0 = flight path, 1 = mountain sides
  return base * THREE.MathUtils.lerp(5, 62, valley)
}

function Terrain() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(360, 780, 140, 280)
    g.rotateX(-Math.PI / 2)
    const pos = g.attributes.position as THREE.BufferAttribute
    const colors = new Float32Array(pos.count * 3)
    const low = new THREE.Color('#1e3245'), rock = new THREE.Color('#44617c'), snow = new THREE.Color('#e6eff7')
    const c = new THREE.Color()
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i)
      const h = heightAt(x, z)
      pos.setY(i, h)
      const t = THREE.MathUtils.clamp(h / 56, 0, 1)
      c.copy(low).lerp(rock, THREE.MathUtils.smoothstep(t, 0.08, 0.44)).lerp(snow, THREE.MathUtils.smoothstep(t, 0.5, 0.9))
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b
    }
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    g.computeVertexNormals()
    return g
  }, [])
  return (
    <mesh geometry={geo} position={[0, 0, -280]}>
      <meshStandardMaterial vertexColors flatShading roughness={0.96} metalness={0} />
    </mesh>
  )
}

function Snow() {
  const ref = useRef<THREE.Points>(null)
  const N = 2200
  const tex = useMemo(() => {
    const c = document.createElement('canvas'); c.width = c.height = 32
    const g = c.getContext('2d')!
    const rg = g.createRadialGradient(16, 16, 0, 16, 16, 16)
    rg.addColorStop(0, 'rgba(255,255,255,1)'); rg.addColorStop(0.35, 'rgba(255,255,255,0.55)'); rg.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = rg; g.fillRect(0, 0, 32, 32)
    return new THREE.CanvasTexture(c)
  }, [])
  const { pos, spd } = useMemo(() => {
    const pos = new Float32Array(N * 3), spd = new Float32Array(N)
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() * 2 - 1) * 135
      pos[i * 3 + 1] = Math.random() * 100
      pos[i * 3 + 2] = (Math.random() * 2 - 1) * 175
      spd[i] = 2.2 + Math.random() * 5
    }
    return { pos, spd }
  }, [])
  useFrame((s, dt) => {
    const p = ref.current
    if (!p) return
    const arr = p.geometry.attributes.position as THREE.BufferAttribute
    const d = Math.min(dt, 0.05)
    for (let i = 0; i < N; i++) {
      let y = arr.getY(i) - spd[i] * d
      if (y < 0) y = 100
      arr.setY(i, y)
      arr.setX(i, arr.getX(i) + Math.sin(s.clock.elapsedTime * 0.4 + i) * 0.014)
    }
    arr.needsUpdate = true
    p.position.x = s.camera.position.x
    p.position.z = s.camera.position.z
  })
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[pos, 3]} /></bufferGeometry>
      <pointsMaterial map={tex} color="#eef5fb" size={0.62} sizeAttenuation transparent opacity={0.9} depthWrite={false} />
    </points>
  )
}

function SkyDome() {
  const mat = useMemo(() => new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { top: { value: new THREE.Color('#0a1522') }, bot: { value: new THREE.Color('#2f4a63') } },
    vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: 'varying vec3 vP; uniform vec3 top; uniform vec3 bot; void main(){ float h = normalize(vP).y * 0.5 + 0.5; vec3 c = mix(bot, top, smoothstep(0.0, 0.72, h)); gl_FragColor = vec4(c, 1.0); }',
  }), [])
  return <mesh scale={600}><sphereGeometry args={[1, 32, 16]} /><primitive object={mat} attach="material" /></mesh>
}

function Rig({ scroll, ptr }: { scroll: ScrollRef; ptr: PtrRef }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 40, 75),
    new THREE.Vector3(11, 27, -20),
    new THREE.Vector3(-13, 18, -125),
    new THREE.Vector3(8, 13, -240),
    new THREE.Vector3(-4, 17, -340),
    new THREE.Vector3(3, 31, -420), // rise toward the summit vista
    new THREE.Vector3(0, 42, -500),
  ]), [])
  useFrame((s) => {
    const sp = THREE.MathUtils.clamp(scroll.current, 0, 1)
    const t = s.clock.elapsedTime
    const pT = sp * 0.86
    const p = curve.getPoint(pT)
    const ahead = curve.getPoint(Math.min(pT + 0.06, 1))
    s.camera.position.x = lerp(s.camera.position.x, p.x + Math.sin(t * 0.22) * 1.8 + ptr.current.x * 3, 0.05)
    s.camera.position.y = lerp(s.camera.position.y, p.y + Math.sin(t * 0.35) * 0.7, 0.05)
    s.camera.position.z = lerp(s.camera.position.z, p.z, 0.05)
    s.camera.lookAt(ahead.x + ptr.current.x * 5, ahead.y - 5 + ptr.current.y * 2.5, ahead.z)
  })
  return null
}

export default function MountainJourney() {
  const scroll = useRef(0)
  const ptr = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onScroll = () => { const m = document.documentElement.scrollHeight - window.innerHeight; scroll.current = m > 0 ? Math.min(1, Math.max(0, window.scrollY / m)) : 0 }
    const onMove = (e: MouseEvent) => { ptr.current.x = (e.clientX / window.innerWidth) * 2 - 1; ptr.current.y = -((e.clientY / window.innerHeight) * 2 - 1) }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); window.removeEventListener('mousemove', onMove) }
  }, [])
  return (
    <Canvas camera={{ position: [0, 42, 70], fov: 58, near: 0.1, far: 1400 }} gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }} dpr={[1, 1.5]}
      onCreated={({ gl }) => { gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.05 }}>
      <fog attach="fog" args={[FOG, 55, 540]} />
      <hemisphereLight args={['#9fc0dc', '#16222e', 0.72]} />
      <directionalLight position={[-60, 90, 40]} intensity={1.25} color="#dbe8f4" />
      <directionalLight position={[75, 22, -50]} intensity={0.5} color="#f0c79c" />
      <ambientLight intensity={0.22} />
      <Suspense fallback={null}>
        <SkyDome />
        <Terrain />
        <Snow />
        <Rig scroll={scroll} ptr={ptr} />
        <EffectComposer>
          <Bloom intensity={0.35} luminanceThreshold={0.65} luminanceSmoothing={0.35} mipmapBlur />
          <Vignette offset={0.32} darkness={0.62} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}
