'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface RollercoasterProps {
  progressRef: React.MutableRefObject<number>
}

const RAIL_OFFSET = 0.22
const RAIL_RADIUS = 0.08
const SCENE_SCALE = 1.18

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

  // Build two parallel rails and a set of cross-tie transforms
  const { leftRailCurve, rightRailCurve, ties, spine } = useMemo(() => {
    const worldUp = new THREE.Vector3(0, 1, 0)
    const railSegments = 260
    const leftPts: THREE.Vector3[] = []
    const rightPts: THREE.Vector3[] = []

    for (let i = 0; i < railSegments; i++) {
      const t = i / railSegments
      const p = curve.getPointAt(t)
      const tangent = curve.getTangentAt(t).normalize()
      const bin = new THREE.Vector3().crossVectors(worldUp, tangent)
      if (bin.lengthSq() < 1e-4) bin.set(1, 0, 0)
      bin.normalize()
      leftPts.push(p.clone().addScaledVector(bin, RAIL_OFFSET))
      rightPts.push(p.clone().addScaledVector(bin, -RAIL_OFFSET))
    }

    // Cross-ties
    const tieCount = 90
    const tiesArr: {
      position: [number, number, number]
      quaternion: [number, number, number, number]
    }[] = []
    const mat = new THREE.Matrix4()
    for (let i = 0; i < tieCount; i++) {
      const t = i / tieCount
      const p = curve.getPointAt(t)
      const tangent = curve.getTangentAt(t).normalize()
      const bin = new THREE.Vector3().crossVectors(worldUp, tangent)
      if (bin.lengthSq() < 1e-4) bin.set(1, 0, 0)
      bin.normalize()
      const correctedUp = new THREE.Vector3()
        .crossVectors(tangent, bin)
        .normalize()
      mat.makeBasis(bin, correctedUp, tangent)
      const q = new THREE.Quaternion().setFromRotationMatrix(mat)
      tiesArr.push({
        position: [p.x, p.y, p.z],
        quaternion: [q.x, q.y, q.z, q.w],
      })
    }

    return {
      leftRailCurve: new THREE.CatmullRomCurve3(
        leftPts,
        true,
        'catmullrom',
        0.45
      ),
      rightRailCurve: new THREE.CatmullRomCurve3(
        rightPts,
        true,
        'catmullrom',
        0.45
      ),
      ties: tiesArr,
      spine: curve,
    }
  }, [curve])

  const leftRailGeo = useMemo(
    () => new THREE.TubeGeometry(leftRailCurve, 380, RAIL_RADIUS, 12, true),
    [leftRailCurve]
  )
  const rightRailGeo = useMemo(
    () => new THREE.TubeGeometry(rightRailCurve, 380, RAIL_RADIUS, 12, true),
    [rightRailCurve]
  )
  const spineGeo = useMemo(
    () => new THREE.TubeGeometry(spine, 380, 0.04, 8, true),
    [spine]
  )

  // Supports
  const supports = useMemo(() => {
    const items: { position: [number, number, number]; height: number }[] = []
    const n = 22
    for (let i = 0; i < n; i++) {
      const t = i / n
      const p = curve.getPointAt(t)
      if (p.y > 0.6) {
        items.push({
          position: [p.x, p.y / 2 - 1, p.z],
          height: p.y + 2,
        })
      }
    }
    return items
  }, [curve])

  // Cart motion
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
    cartRef.current.position.y += 0.28

    tmpMat.lookAt(
      cartRef.current.position,
      tmpVec.clone().add(tangent),
      upVec
    )
    tmpQuat.setFromRotationMatrix(tmpMat)
    cartRef.current.quaternion.slerp(tmpQuat, 0.25)
  })

  return (
    <group scale={SCENE_SCALE}>
      {/* Ground */}
      <mesh position={[0, -1.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#FEFAF0" />
      </mesh>

      {/* Left rail */}
      <mesh geometry={leftRailGeo} castShadow receiveShadow>
        <meshStandardMaterial
          color="#2FA0AA"
          emissive="#0E7C86"
          emissiveIntensity={0.12}
          metalness={0.7}
          roughness={0.22}
        />
      </mesh>

      {/* Right rail */}
      <mesh geometry={rightRailGeo} castShadow receiveShadow>
        <meshStandardMaterial
          color="#2FA0AA"
          emissive="#0E7C86"
          emissiveIntensity={0.12}
          metalness={0.7}
          roughness={0.22}
        />
      </mesh>

      {/* Central spine beam — thin gold, adds a structural accent */}
      <mesh geometry={spineGeo}>
        <meshStandardMaterial
          color="#E8A94A"
          emissive="#D9953A"
          emissiveIntensity={0.2}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Cross-ties */}
      {ties.map((tie, i) => (
        <mesh
          key={i}
          position={tie.position}
          quaternion={tie.quaternion}
          castShadow
        >
          <boxGeometry args={[0.58, 0.045, 0.08]} />
          <meshStandardMaterial
            color="#5E5240"
            metalness={0.25}
            roughness={0.75}
          />
        </mesh>
      ))}

      {/* Support pillars */}
      {supports.map((s, i) => (
        <mesh key={i} position={s.position} castShadow>
          <cylinderGeometry args={[0.045, 0.05, s.height, 8]} />
          <meshStandardMaterial
            color="#5E5240"
            metalness={0.25}
            roughness={0.7}
          />
        </mesh>
      ))}

      {/* Cart train */}
      <group ref={cartRef}>
        {/* Lead cart — chassis */}
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.2, 0.88]} />
          <meshStandardMaterial color="#1F2530" metalness={0.5} roughness={0.35} />
        </mesh>
        {/* Body */}
        <mesh position={[0, 0.24, 0]} castShadow>
          <boxGeometry args={[0.52, 0.26, 0.76]} />
          <meshStandardMaterial color="#0E7C86" metalness={0.55} roughness={0.25} />
        </mesh>
        {/* Roof accent */}
        <mesh position={[0, 0.41, 0]} castShadow>
          <boxGeometry args={[0.46, 0.07, 0.68]} />
          <meshStandardMaterial color="#2FA0AA" metalness={0.7} roughness={0.2} />
        </mesh>
        {/* Headlight */}
        <mesh position={[0, 0.24, 0.44]}>
          <sphereGeometry args={[0.075, 14, 14]} />
          <meshStandardMaterial
            color="#FFE8B8"
            emissive="#D9953A"
            emissiveIntensity={2.4}
          />
        </mesh>
        {/* Wheels */}
        {[
          [-0.26, -0.05, 0.28],
          [0.26, -0.05, 0.28],
          [-0.26, -0.05, -0.28],
          [0.26, -0.05, -0.28],
        ].map((p, i) => (
          <mesh
            key={i}
            position={p as [number, number, number]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.09, 0.09, 0.06, 16]} />
            <meshStandardMaterial color="#1F2530" metalness={0.6} roughness={0.35} />
          </mesh>
        ))}

        {/* Trailing carts */}
        {[1, 2].map((n) => (
          <group key={n} position={[0, 0, -n * 1.02]}>
            <mesh castShadow>
              <boxGeometry args={[0.56, 0.18, 0.76]} />
              <meshStandardMaterial color="#1F2530" metalness={0.5} roughness={0.35} />
            </mesh>
            <mesh position={[0, 0.22, 0]} castShadow>
              <boxGeometry args={[0.48, 0.24, 0.68]} />
              <meshStandardMaterial
                color={n === 1 ? '#D9953A' : '#0E7C86'}
                metalness={0.55}
                roughness={0.25}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}
