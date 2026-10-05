"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { getDailyStats, getTimeUntilNextWord, type DailyGameStats } from "../../lib/daily-game"
import type { WordLength } from "../../lib/wordle-game"

interface DailyStatsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  wordLength: WordLength
  gameCompleted?: boolean
}

export default function DailyStatsDialog({
  open,
  onOpenChange,
  wordLength,
  gameCompleted = false,
}: DailyStatsDialogProps) {
  const [stats, setStats] = useState<DailyGameStats>(() => getDailyStats(wordLength))
  const [timeUntilNext, setTimeUntilNext] = useState(getTimeUntilNextWord())

  useEffect(() => {
    if (open) {
      setStats(getDailyStats(wordLength))
    }
  }, [open, wordLength, gameCompleted])

  useEffect(() => {
    if (!open) return

    const interval = setInterval(() => {
      setTimeUntilNext(getTimeUntilNextWord())
    }, 1000)

    return () => clearInterval(interval)
  }, [open])

  const maxAttempts = wordLength + 1
  const maxDistribution = Math.max(...Object.values(stats.guessDistribution), 1)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card border-border text-card-foreground rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-lg text-foreground">
            Statistik Harian ({wordLength} Huruf)
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground font-sans">
            Catatan performa Anda dalam tantangan harian
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Overall Stats */}
          <div className="grid grid-cols-4 gap-2 text-center bg-muted/40 border border-border rounded-xl p-3">
            <div>
              <div className="text-xl md:text-2xl font-bold font-mono tabular-nums text-foreground">
                {stats.gamesPlayed}
              </div>
              <div className="text-[10px] text-muted-foreground font-sans uppercase tracking-wider">
                Dimainkan
              </div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold font-mono tabular-nums text-primary">
                {stats.winRate}%
              </div>
              <div className="text-[10px] text-muted-foreground font-sans uppercase tracking-wider">
                Menang
              </div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold font-mono tabular-nums text-foreground">
                {stats.currentStreak}
              </div>
              <div className="text-[10px] text-muted-foreground font-sans uppercase tracking-wider">
                Streak
              </div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold font-mono tabular-nums text-foreground">
                {stats.maxStreak}
              </div>
              <div className="text-[10px] text-muted-foreground font-sans uppercase tracking-wider">
                Maks
              </div>
            </div>
          </div>

          {/* Guess Distribution */}
          {stats.gamesWon > 0 && (
            <Card className="border-border bg-card shadow-none">
              <CardHeader className="p-3 pb-1.5">
                <CardTitle className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Distribusi Tebakan
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 space-y-1.5">
                {Array.from({ length: maxAttempts }, (_, i) => i + 1).map((attempt) => {
                  const count = stats.guessDistribution[attempt] || 0
                  const percentage = maxDistribution > 0 ? (count / maxDistribution) * 100 : 0

                  return (
                    <div key={attempt} className="flex items-center gap-2 text-xs font-mono">
                      <div className="w-3 text-muted-foreground font-semibold">{attempt}</div>
                      <div className="flex-1">
                        <Progress value={percentage} className="h-3 rounded-full bg-muted" />
                      </div>
                      <div className="w-6 text-right tabular-nums text-foreground font-medium">
                        {count}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          )}

          {/* Next Word Countdown */}
          <Card className="border-border bg-card shadow-none">
            <CardHeader className="p-3 pb-1">
              <CardTitle className="text-xs font-semibold text-foreground uppercase tracking-wider text-center">
                Kata Harian Berikutnya
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 text-center">
              <div className="text-2xl font-mono font-bold tabular-nums text-primary tracking-wider">
                {String(timeUntilNext.hours).padStart(2, "0")}:
                {String(timeUntilNext.minutes).padStart(2, "0")}:
                {String(timeUntilNext.seconds).padStart(2, "0")}
              </div>
              <div className="text-[10px] text-muted-foreground font-sans mt-0.5">
                Jam : Menit : Detik
              </div>
            </CardContent>
          </Card>

          {/* Game Completed Message */}
          {gameCompleted && (
            <div className="text-center pt-1">
              <Badge variant="outline" className="text-xs font-sans bg-muted text-muted-foreground border-border">
                Kembali besok untuk tantangan kata {wordLength} huruf baru!
              </Badge>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
