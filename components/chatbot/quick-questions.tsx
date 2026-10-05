"use client"

import * as React from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { DEFAULT_QUICK_QUESTIONS } from "./data"
import type { QuickQuestionItem } from "./types"

interface QuickQuestionsProps {
  questions?: QuickQuestionItem[]
  onSelect: (questionText: string) => void
  disabled?: boolean
  compact?: boolean
  limit?: number
  columns?: 1 | 2
}

export function QuickQuestions({
  questions = DEFAULT_QUICK_QUESTIONS,
  onSelect,
  disabled = false,
  compact = false,
  limit,
  columns = 2,
}: QuickQuestionsProps) {
  const { t } = useLanguage()
  const displayQuestions = limit ? questions.slice(0, limit) : questions

  return (
    <div className={`border-t border-border bg-muted/40 ${compact ? "p-2.5" : "p-4"}`}>
      <div className="flex items-center gap-1.5 mb-2.5">
        <Sparkles className="w-3.5 h-3.5 text-primary" />
        <p className="text-xs font-semibold tracking-wide text-foreground">
          {t("ai.quickTitle") || "Pertanyaan Cepat"}
        </p>
      </div>
      <div
        className={`grid gap-2 ${
          columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {displayQuestions.map((question, index) => {
          const Icon = question.icon
          const translatedText = t(question.translationKey) || question.text

          return (
            <Button
              key={index}
              onClick={() => onSelect(translatedText)}
              variant="outline"
              size={compact ? "sm" : "default"}
              className={`justify-start text-left bg-card hover:bg-muted border-border hover:border-primary/40 transition-colors duration-150 text-foreground font-medium rounded-xl h-auto active:-translate-y-px ${
                compact ? "p-2 text-xs" : "p-3 text-xs md:text-sm"
              }`}
              disabled={disabled}
            >
              <Icon
                className={`flex-shrink-0 text-primary ${
                  compact ? "w-3.5 h-3.5 mr-2" : "w-4 h-4 mr-2.5"
                }`}
              />
              <span className="truncate">{translatedText}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
