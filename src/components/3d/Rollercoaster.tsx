'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface RollercoasterProps {
  progressRef: React.MutableRefObject<number>
}

export default function Rollercoaster({ progressRef }: RollercoasterProps) {
  const curve = useMemo(() => {
    const points = [
      new THREE.Vector3(-9, 0, 0),
      new THREE.Vector3(-6, 1, 2),
      new THREE.Vector3(-3, 4.5, 1),
      new THREE.Vector3(0, 6, -1),
      new THREE.Vector3(2, 4, -2),
      new THREE.Vector3(4, 0.5, -1),
      new THREE.Vector3(5.5, 1.5, 1),
      new THREE.Vector3(6, 3.5, 3),
      new THREE.Vector3(4.5, 5, 4),
      new THREE.Vector3(2, 4, 4.5),
      new THREE.Vector3(-1, 2.5, 4),
      new THREE.Vector3(-4, 1, 3),
      new THREE.Vector3(-7, 0.5, 1.5),
    ]
    return new THREE.CatmullRomCurve3(points, true, 'catmullrom', 0.45)
  }, [])

  const trackGeo = useMemo(
    () => new THREE.TubeGeometry(curve, 380, 0.1, 10, true),
    [curve]
  )
  const innerGeo = useMemo(
    () => new THREE.TubeGeometry(curve, 380, 0.05, 8, true),
    [curve]
  )

  const supports = useMemo(() => {
    const items: { position: [number, number, number]; height: number }[] = []
    const n = 42
    for (let i = 0; i < n; i++) {
      const t = i / n
      const p = curve.getPointAt(t)
      if (p.y > 0.05) {
        items.push({
          position: [p.x, p.y / 2 - 1, p.z],
          height: p.y + 2,
        })
      }
    }
    return items
  }, [curve])

  const cartRef = useRef<THREE.Group>(null)
  const tmpVec = useMemo(() => new THREE.Vector3(), [])
  const tmpVec2 = useMemo(() => new THREE.Vector3(), [])
  const tmpQuat = useMemo(() => new THREE.Quaternion(), [])
  const tmpMat = useMemo(() => new THREE.Matrix4(), [])
  const upVec = useMemo(() => new THREE.Vector3(0, 1, 0), [])

  useFrame((state) => {
    if (!cartRef.current) return

    const base = progressRef.current
    const idle = state.clock.elapsedTime * 0.02
    const t = (base * 1.5 + idle) % 1

    const pos = curve.getPointAt(t, tmpVec)
    const tangent = curve.getTangentAt(t, tmpVec2).normalize()

    cartRef.current.position.copy(pos)
    cartRef.current.position.y += 0.22

    tmpMat.lookAt(
      cartRef.current.position,
      tmpVec.clone().add(tangent),
      upVec
    )
    tmpQuat.setFromRotationMatrix(tmpMat)
    cartRef.current.quaternion.slerp(tmpQuat, 0.25)
  })

  return (
    <group>
      {/* Ground — matches page bg so it disappears into the cream */}
      <mesh position={[0, -1.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#FEFAF0" />
      </mesh>

      {/* Track main */}
      <mesh geometry={trackGeo}>
        <meshStandardMaterial
          color="#0E7C86"
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      {/* Inner accent rail */}
      <mesh geometry={innerGeo}>
        <meshStandardMaterial
          color="#D9953A"
          metalness={0.5}
          roughness={0.35}
        />
      </mesh>

      {/* Support pillars */}
      {supports.map((s, i) => (
        <mesh key={i} position={s.position}>
          <cylinderGeometry args={[0.06, 0.06, s.height, 6]} />
          <meshStandardMaterial color="#5A4A38" metalness={0.25} roughness={0.7} />
        </mesh>
      ))}

      {/* Cart train */}
      <group ref={cartRef}>
        {/* Lead cart */}
        <mesh>
          <boxGeometry args={[0.55, 0.18, 0.8]} />
          <meshStandardMaterial color="#1A1008" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[0.48, 0.24, 0.7]} />
          <meshStandardMaterial color="#064A52" metalness={0.75} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.38, 0]}>
          <boxGeometry args={[0.42, 0.06, 0.62]} />
          <meshStandardMaterial color="#0E7C86" metalness={0.8} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.22, 0.4]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial
            color="#D9953A"
            emissive="#D9953A"
            emissiveIntensity={1.4}
          />
        </mesh>
        {[
          [-0.24, -0.05, 0.26],
          [0.24, -0.05, 0.26],
          [-0.24, -0.05, -0.26],
          [0.24, -0.05, -0.26],
        ].map((p, i) => (
          <mesh
            key={i}
            position={p as [number, number, number]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
            <meshStandardMaterial color="#0A0604" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}

        {/* Trailing carts */}
        {[1, 2].map((n) => (
          <group key={n} position={[0, 0, -n * 0.95]}>
            <mesh>
              <boxGeometry args={[0.52, 0.16, 0.7]} />
              <meshStandardMaterial color="#1A1008" metalness={0.85} roughness={0.25} />
            </mesh>
            <mesh position={[0, 0.2, 0]}>
              <boxGeometry args={[0.45, 0.22, 0.62]} />
              <meshStandardMaterial
                color={n === 1 ? '#0E7C86' : '#D9953A'}
                metalness={0.75}
                roughness={0.2}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}
