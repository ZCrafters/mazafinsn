"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sparkles } from "@react-three/drei"
import * as THREE from "three"

function FloatingShape({
  position,
  color,
  geometry,
  speed = 0.4,
}: {
  position: [number, number, number]
  color: string
  geometry: "icosahedron" | "octahedron" | "torus"
  speed?: number
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.x = t * speed * 0.3
    ref.current.rotation.y = t * speed * 0.5
    ref.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.15
  })

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={position}>
        {geometry === "icosahedron" && <icosahedronGeometry args={[0.9, 0]} />}
        {geometry === "octahedron" && <octahedronGeometry args={[0.8, 0]} />}
        {geometry === "torus" && <torusGeometry args={[0.5, 0.2, 16, 48]} />}
        <meshStandardMaterial
          color={color}
          roughness={0.25}
          metalness={0.35}
          flatShading={geometry !== "torus"}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#85a37a" />

      <FloatingShape position={[-2.4, 0.6, 0]} color="#658657" geometry="icosahedron" />
      <FloatingShape position={[2.2, 0.2, -0.5]} color="#2E8B57" geometry="octahedron" />
      <FloatingShape position={[0, -0.9, -0.8]} color="#85a37a" geometry="torus" />
      <FloatingShape position={[-0.8, 1.4, -1.2]} color="#aec4a5" geometry="icosahedron" />
      <FloatingShape position={[1.4, -1.1, -0.3]} color="#4f6a45" geometry="octahedron" />

      <Sparkles count={90} scale={8} size={2.2} speed={0.35} color="#aec4a5" opacity={0.7} />
    </>
  )
}

export default function SageScene({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 1.5]}>
        <Scene />
      </Canvas>
    </div>
  )
}