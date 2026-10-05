"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import GameHeader from "./game-header"
import GameBoard from "./game-board"
import Keyboard from "./keyboard"
import HelpDialog from "./help-dialog"
import DailyStatsDialog from "./daily-stats-dialog"
import DailyModeToggle from "./daily-mode-toggle"
import {
  initializeGame,
  addLetter,
  removeLetter,
  submitRow,
  getKeyboardState,
  type GameState,
  type WordLength,
} from "../../lib/wordle-game"
import { getTodaysDailyGame, saveDailyGameProgress, hasPlayedToday } from "../../lib/daily-game"
import { isValidWord } from "../../lib/financial-words"
import { earnPoints } from "../../lib/points-system"

export default function WordleGame() {
  const router = useRouter()
  const [wordLength, setWordLength] = useState<WordLength>(5)
  const [isDailyMode, setIsDailyMode] = useState(true)
  const [gameState, setGameState] = useState<GameState>(() =>
    isDailyMode ? getTodaysDailyGame(wordLength) : initializeGame(wordLength),
  )
  const [showHelp, setShowHelp] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [revealingRow, setRevealingRow] = useState<number | undefined>()

  const keyboardState = getKeyboardState(gameState)
  const hasCompletedToday = hasPlayedToday(wordLength)

  const handleNewGame = useCallback(() => {
    if (isDailyMode) {
      setGameState(getTodaysDailyGame(wordLength))
    } else {
      setGameState(initializeGame(wordLength))
    }
    setRevealingRow(undefined)
  }, [wordLength, isDailyMode])

  const handleWordLengthChange = useCallback(
    (length: WordLength) => {
      setWordLength(length)
      if (isDailyMode) {
        setGameState(getTodaysDailyGame(length))
      } else {
        setGameState(initializeGame(length))
      }
      setRevealingRow(undefined)
    },
    [isDailyMode],
  )

  const handleModeToggle = useCallback(
    (dailyMode: boolean) => {
      setIsDailyMode(dailyMode)
      if (dailyMode) {
        setGameState(getTodaysDailyGame(wordLength))
      } else {
        setGameState(initializeGame(wordLength))
      }
      setRevealingRow(undefined)
    },
    [wordLength],
  )

  const handleKeyPress = useCallback(
    (key: string) => {
      if (gameState.gameStatus !== "playing") return
      if (isDailyMode && hasCompletedToday) return

      const newGameState = addLetter(gameState, key)
      setGameState(newGameState)

      if (isDailyMode) {
        saveDailyGameProgress(newGameState)
      }
    },
    [gameState, isDailyMode, hasCompletedToday],
  )

  const handleBackspace = useCallback(() => {
    if (gameState.gameStatus !== "playing") return
    if (isDailyMode && hasCompletedToday) return

    const newGameState = removeLetter(gameState)
    setGameState(newGameState)

    if (isDailyMode) {
      saveDailyGameProgress(newGameState)
    }
  }, [gameState, isDailyMode, hasCompletedToday])

  const handleEnter = useCallback(() => {
    if (gameState.gameStatus !== "playing") return
    if (isDailyMode && hasCompletedToday) return

    const currentRow = gameState.rows[gameState.currentRow]
    const word = currentRow.letters.map((l) => l.letter).join("")

    if (word.length !== wordLength) {
      toast({
        title: "Not enough letters",
        description: `Please enter a ${wordLength}-letter word.`,
        variant: "destructive",
      })
      return
    }

    if (!isValidWord(word)) {
      toast({
        title: "Invalid word",
        description: "Please enter a valid financial term.",
        variant: "destructive",
      })
      return
    }

    // Start revealing animation
    setRevealingRow(gameState.currentRow)

    // Submit after animation delay
    setTimeout(
      () => {
        setGameState((prev) => {
          const newState = submitRow(prev)

          if (isDailyMode) {
            saveDailyGameProgress(newState)
          }

          if (newState.gameStatus === "won") {
            // Calculate points earned
            const pointsEarned = earnPoints('fordle', {
              won: true,
              attempts: newState.guesses.length,
              perfectScore: newState.guesses.length <= 3,
              isDaily: isDailyMode
            })
            
            toast({
              title: "Congratulations!",
              description: `You guessed "${newState.targetWord}" correctly! +${pointsEarned} points earned!`,
            })
            if (isDailyMode) {
              setTimeout(() => setShowStats(true), 1500)
            }
          } else if (newState.gameStatus === "lost") {
            // Give consolation points
            const pointsEarned = earnPoints('fordle', {
              won: false,
              attempts: newState.guesses.length,
              isDaily: isDailyMode
            })
            
            toast({
              title: "Game Over",
              description: `The word was "${newState.targetWord}". +${pointsEarned} points for playing!`,
              variant: "destructive",
            })
            if (isDailyMode) {
              setTimeout(() => setShowStats(true), 1500)
            }
          }

          return newState
        })
        setRevealingRow(undefined)
      },
      wordLength * 100 + 300,
    ) // Animation duration + buffer
  }, [gameState, wordLength, isDailyMode, hasCompletedToday])

  // Keyboard event listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (showHelp || showStats) return

      const key = event.key.toUpperCase()

      if (key === "ENTER") {
        handleEnter()
      } else if (key === "BACKSPACE") {
        handleBackspace()
      } else if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleEnter, handleBackspace, handleKeyPress, showHelp, showStats])

  return (
    <div className="min-h-[100dvh] bg-background text-foreground py-8 md:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/games")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground rounded-xl"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Permainan</span>
          </Button>
        </div>

        <GameHeader
          wordLength={wordLength}
          onWordLengthChange={handleWordLengthChange}
          gameState={gameState}
          onNewGame={handleNewGame}
          onShowHelp={() => setShowHelp(true)}
          onShowStats={() => setShowStats(true)}
          isDailyMode={isDailyMode}
        />

        <div className="mb-6 flex justify-center">
          <DailyModeToggle
            wordLength={wordLength}
            isDailyMode={isDailyMode}
            onToggle={handleModeToggle}
            disabled={gameState.gameStatus === "playing" && gameState.currentRow > 0}
          />
        </div>

        <div className="space-y-6">
          <GameBoard gameState={gameState} revealingRow={revealingRow} />

          <Keyboard
            onKeyPress={handleKeyPress}
            onEnter={handleEnter}
            onBackspace={handleBackspace}
            keyboardState={keyboardState}
            disabled={
              gameState.gameStatus !== "playing" || revealingRow !== undefined || (isDailyMode && hasCompletedToday)
            }
          />
        </div>

        <HelpDialog open={showHelp} onOpenChange={setShowHelp} />

        <DailyStatsDialog
          open={showStats}
          onOpenChange={setShowStats}
          wordLength={wordLength}
          gameCompleted={gameState.gameStatus !== "playing"}
        />
      </div>
    </div>
  )
}
