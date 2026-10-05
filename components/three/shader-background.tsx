"use client"

import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react"

interface ShaderBackgroundProps {
  className?: string
  reducedMotion?: boolean
}

export default function ShaderBackground({ className = "" }: ShaderBackgroundProps) {
  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden ${className}`}>
      <ShaderGradientCanvas
        style={{ position: "absolute", inset: 0 }}
        pixelDensity={1}
        fov={45}
        lazyLoad
        threshold={0}
      >
        <ShaderGradient
          type="plane"
          control="props"
          animate="on"
          color1="#2E8B57"
          color2="#658657"
          color3="#d3decd"
          cDistance={4.2}
          cPolarAngle={100}
          cAzimuthAngle={0}
          brightness={0.95}
          lightType="3d"
          grain="off"
          uSpeed={0.12}
          uFrequency={2.4}
          uStrength={0.55}
          enableTransition={false}
        />
      </ShaderGradientCanvas>
    </div>
  )
}