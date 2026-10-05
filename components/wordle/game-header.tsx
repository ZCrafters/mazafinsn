"use client"

import * as React from "react"
import { BarChart3, HelpCircle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import type { WordLength, GameState } from "../../lib/wordle-game"

interface GameHeaderProps {
  wordLength: WordLength
  onWordLengthChange: (length: WordLength) => void
  gameState: GameState
  onNewGame: () => void
  onShowHelp: () => void
  onShowStats: () => void
  isDailyMode?: boolean
}

export default function GameHeader({
  wordLength,
  onWordLengthChange,
  gameState,
  onNewGame,
  onShowHelp,
  onShowStats,
  isDailyMode = false,
}: GameHeaderProps) {
  const { t } = useLanguage()
  const isGameActive = gameState.gameStatus === "playing" && gameState.currentRow > 0

  return (
    <Card className="border border-border bg-card rounded-2xl shadow-sm mb-6">
      <CardContent className="p-5 md:p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-foreground">
              FinanceWordle
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground font-sans mt-0.5">
              Tebak istilah finansial dalam{" "}
              <span className="font-mono tabular-nums font-semibold text-foreground">
                {gameState.maxAttempts}
              </span>{" "}
              kesempatan
              {isDailyMode && (
                <span className="ml-2 text-primary font-medium">• Mode Harian</span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Word length selectors */}
            <div className="flex gap-1 bg-muted p-1 rounded-xl border border-border">
              {([4, 5, 6] as WordLength[]).map((length) => (
                <Button
                  key={length}
                  variant="ghost"
                  size="sm"
                  onClick={() => onWordLengthChange(length)}
                  disabled={isGameActive}
                  className={`w-8 h-8 p-0 rounded-lg font-mono tabular-nums font-bold text-xs transition-all ${
                    wordLength === length
                      ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {length}
                </Button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={onShowStats}
                className="h-9 w-9 p-0 rounded-xl border-border hover:bg-muted text-foreground"
                aria-label={t("common.stats") || "Statistik"}
              >
                <BarChart3 className="w-4 h-4 text-primary" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onShowHelp}
                className="h-9 w-9 p-0 rounded-xl border-border hover:bg-muted text-foreground"
                aria-label={t("common.help") || "Bantuan"}
              >
                <HelpCircle className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onNewGame}
                className="h-9 px-3 rounded-xl border-border hover:bg-muted text-foreground font-medium text-xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t("common.newGame") || "Game Baru"}</span>
              </Button>
            </div>
          </div>
        </div>

        {gameState.gameStatus !== "playing" && (
          <div className="mt-4 pt-3 border-t border-border text-center">
            {gameState.gameStatus === "won" ? (
              <Badge
                variant="outline"
                className="bg-primary/10 border-primary/20 text-primary font-sans text-xs py-1 px-3"
              >
                Selamat! Anda berhasil menebak &quot;
                <strong className="font-mono font-bold tracking-wider">
                  {gameState.targetWord}
                </strong>
                &quot;
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-destructive/10 border-destructive/20 text-destructive font-sans text-xs py-1 px-3"
              >
                Game Selesai! Kata yang benar adalah &quot;
                <strong className="font-mono font-bold tracking-wider">
                  {gameState.targetWord}
                </strong>
                &quot;
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
