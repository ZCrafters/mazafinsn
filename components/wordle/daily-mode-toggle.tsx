"use client"

import * as React from "react"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import { Badge } from "../ui/badge"
import { CheckCircle } from "lucide-react"
import { hasPlayedToday } from "../../lib/daily-game"
import { useLanguage } from "@/lib/language-context"
import type { WordLength } from "../../lib/wordle-game"

interface DailyModeToggleProps {
  wordLength: WordLength
  isDailyMode: boolean
  onToggle: (isDailyMode: boolean) => void
  disabled?: boolean
}

export default function DailyModeToggle({
  wordLength,
  isDailyMode,
  onToggle,
  disabled = false,
}: DailyModeToggleProps) {
  const { t } = useLanguage()
  const hasPlayedTodaysGame = hasPlayedToday(wordLength)

  return (
    <div className="flex items-center gap-3 bg-card border border-border px-4 py-2 rounded-xl shadow-sm">
      <div className="flex items-center space-x-2.5">
        <Switch
          id="daily-mode"
          checked={isDailyMode}
          onCheckedChange={onToggle}
          disabled={disabled}
        />
        <Label
          htmlFor="daily-mode"
          className="text-xs md:text-sm font-sans font-medium text-foreground cursor-pointer"
        >
          {t("common.dailyMode") || "Mode Harian"}
        </Label>
      </div>

      {isDailyMode && hasPlayedTodaysGame && (
        <Badge
          variant="outline"
          className="bg-primary/10 text-primary border-primary/20 text-[10px] font-sans flex items-center gap-1"
        >
          <CheckCircle className="w-3 h-3" />
          <span>Selesai Hari Ini</span>
        </Badge>
      )}
    </div>
  )
}
