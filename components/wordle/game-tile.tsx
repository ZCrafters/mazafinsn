"use client"

import * as React from "react"
import type { LetterState } from "../../lib/wordle-game"

interface GameTileProps {
  letter: string
  state: LetterState
  isRevealing?: boolean
  revealDelay?: number
}

export default function GameTile({
  letter,
  state,
  isRevealing = false,
  revealDelay = 0,
}: GameTileProps) {
  let stateClasses = "border-border/60 bg-card text-foreground"

  if (letter && state === "empty") {
    stateClasses = "border-primary/50 bg-card text-foreground scale-[1.02]"
  } else if (state === "correct") {
    stateClasses = "border-primary bg-primary text-primary-foreground shadow-sm"
  } else if (state === "present") {
    stateClasses = "border-amber-500 bg-amber-500 text-white shadow-sm"
  } else if (state === "absent") {
    stateClasses = "border-muted bg-muted/70 text-muted-foreground opacity-60"
  }

  return (
    <div
      className={`w-12 h-12 md:w-14 md:h-14 border-2 rounded-xl flex items-center justify-center text-xl md:text-2xl font-bold font-mono uppercase transition-all duration-200 select-none ${stateClasses} ${
        isRevealing ? "animate-pulse" : ""
      }`}
      style={{
        transitionDelay: isRevealing ? `${revealDelay}ms` : undefined,
      }}
      aria-label={letter ? `${letter}, ${state}` : "Empty tile"}
    >
      {letter}
    </div>
  )
}
