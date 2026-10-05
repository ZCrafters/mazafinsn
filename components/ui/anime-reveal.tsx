"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { animate, createScope, stagger } from "animejs"

interface AnimeRevealProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  from?: { opacity?: number; translateY?: number }
}

export default function AnimeReveal({
  children,
  className = "",
  staggerDelay = 90,
  from = { opacity: 0, translateY: 24 },
}: AnimeRevealProps) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return

    const scope = createScope({ root: el }).add(() => {
      animate(el.querySelectorAll(":scope > *"), {
        opacity: [from.opacity ?? 0, 1],
        translateY: [from.translateY ?? 24, 0],
        duration: 700,
        ease: "out(3)",
        delay: stagger(staggerDelay),
      })
    })

    return () => scope.revert()
  }, [staggerDelay, from.opacity, from.translateY])

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  )
}