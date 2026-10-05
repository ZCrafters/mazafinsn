"use client"

import * as React from "react"
import type { LetterState } from "../../lib/wordle-game"

interface KeyboardProps {
  onKeyPress: (key: string) => void
  onEnter: () => void
  onBackspace: () => void
  keyboardState: Record<string, LetterState>
  disabled?: boolean
}

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
]

export default function Keyboard({
  onKeyPress,
  onEnter,
  onBackspace,
  keyboardState,
  disabled = false,
}: KeyboardProps) {
  const handleKeyClick = (key: string) => {
    if (disabled) return

    if (key === "ENTER") {
      onEnter()
    } else if (key === "BACKSPACE") {
      onBackspace()
    } else {
      onKeyPress(key)
    }
  }

  return (
    <div className="flex flex-col gap-1.5 p-2 md:p-4 max-w-lg mx-auto select-none">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 md:gap-1.5 justify-center">
          {row.map((key) => {
            const state = keyboardState[key] || "empty"
            const isSpecial = key === "ENTER" || key === "BACKSPACE"

            let stateClasses = "bg-muted/80 hover:bg-muted text-foreground border border-border/80"

            if (state === "correct") {
              stateClasses = "bg-primary hover:bg-primary/90 text-primary-foreground border-primary"
            } else if (state === "present") {
              stateClasses = "bg-amber-500 hover:bg-amber-600 text-white border-amber-500"
            } else if (state === "absent") {
              stateClasses = "bg-muted/40 text-muted-foreground border-transparent opacity-40 hover:opacity-50"
            }

            return (
              <button
                key={key}
                onClick={() => handleKeyClick(key)}
                disabled={disabled}
                className={`h-11 md:h-12 rounded-lg font-mono font-semibold text-xs md:text-sm flex items-center justify-center transition-all duration-150 active:-translate-y-px ${
                  isSpecial
                    ? "px-2.5 md:px-4 text-[10px] md:text-xs font-sans font-medium"
                    : "w-8 md:w-10"
                } ${stateClasses} ${
                  disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }`}
                aria-label={key === "BACKSPACE" ? "Backspace" : key}
              >
                {key === "BACKSPACE" ? "⌫" : key}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
