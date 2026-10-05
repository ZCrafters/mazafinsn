"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import { decodeHtml } from "./quiz-helpers"
import type { QuizQuestion } from "@/lib/games/quiz"

interface QuizQuestionCardProps {
  question: QuizQuestion
  currentIndex: number
  totalQuestions: number
  score: number
  selected: number | null
  revealed: boolean
  onAnswer: (index: number) => void
  onNext: () => void
}

export function QuizQuestionCard({
  question,
  currentIndex,
  totalQuestions,
  score,
  selected,
  revealed,
  onAnswer,
  onNext,
}: QuizQuestionCardProps) {
  const { t } = useLanguage()

  return (
    <Card className="border border-border shadow-sm bg-card rounded-2xl overflow-hidden">
      <CardContent className="p-6 md:p-8">
        {/* Header with question counter and score */}
        <div className="flex items-center justify-between mb-4">
          <Badge
            variant="secondary"
            className="text-xs font-mono tabular-nums bg-muted text-muted-foreground border-border"
          >
            {t("quiz.question")} {currentIndex + 1} {t("quiz.of")} {totalQuestions}
          </Badge>
          <div className="text-xs md:text-sm font-semibold font-mono tabular-nums text-foreground">
            {t("common.score")}: <span className="text-primary">{score}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-1.5 mb-6 overflow-hidden">
          <div
            className="bg-primary h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Question Title */}
        <h2 className="text-lg md:text-xl font-display font-bold text-foreground mb-6 leading-snug text-balance">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-2.5">
          {question.options.map((option, index) => {
            let stateClass = "border-border hover:border-primary/50 hover:bg-muted/40 text-foreground"
            if (revealed) {
              if (index === question.correctIndex) {
                stateClass = "border-emerald-600/70 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold"
              } else if (index === selected) {
                stateClass = "border-destructive/70 bg-destructive/10 text-destructive font-semibold"
              } else {
                stateClass = "border-border opacity-50 text-muted-foreground"
              }
            }

            return (
              <button
                key={index}
                onClick={() => onAnswer(index)}
                disabled={revealed}
                className={`w-full text-left border rounded-xl p-3.5 md:p-4 text-sm font-sans transition-all flex items-center ${stateClass} ${
                  revealed ? "cursor-default" : "cursor-pointer active:-translate-y-px"
                }`}
              >
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-muted text-xs font-mono font-bold mr-3 flex-shrink-0 border border-border">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{decodeHtml(option)}</span>
              </button>
            )
          })}
        </div>

        {/* Revealed feedback and next button */}
        {revealed && (
          <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs md:text-sm font-sans">
              {selected === question.correctIndex ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  ✓ {t("quiz.correctAnswer")}
                </span>
              ) : (
                <span className="text-destructive font-medium">
                  ✗ {t("quiz.wrongAnswer")} {decodeHtml(question.options[question.correctIndex])}
                </span>
              )}
            </div>
            <Button
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-transform active:-translate-y-px"
              onClick={onNext}
            >
              {currentIndex + 1 >= totalQuestions ? t("quiz.completed") : t("quiz.next")}
              <ChevronRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
