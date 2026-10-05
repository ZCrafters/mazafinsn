"use client"

import * as React from "react"
import { BrainCircuit, Loader2, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { QUIZ_CATEGORIES } from "@/lib/games/quiz"
import { DIFFICULTIES, type Difficulty } from "./quiz-helpers"

interface QuizSetupProps {
  category: string
  difficulty: Difficulty
  loading: boolean
  error: boolean
  onSelectCategory: (category: string) => void
  onSelectDifficulty: (difficulty: Difficulty) => void
  onStartQuiz: () => void
}

export function QuizSetup({
  category,
  difficulty,
  loading,
  error,
  onSelectCategory,
  onSelectDifficulty,
  onStartQuiz,
}: QuizSetupProps) {
  const { t } = useLanguage()

  return (
    <Card className="border border-border shadow-sm bg-card rounded-2xl overflow-hidden">
      <CardHeader className="text-center pb-4 pt-8">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3 text-primary">
          <BrainCircuit className="w-7 h-7" />
        </div>
        <CardTitle className="text-2xl md:text-3xl font-display font-bold text-foreground">
          {t("quiz.title")}
        </CardTitle>
        <p className="text-muted-foreground text-sm font-sans mt-1 max-w-md mx-auto">
          {t("quiz.subtitle")}
        </p>
      </CardHeader>

      <CardContent className="space-y-6 p-6 md:p-8">
        {/* Category selector */}
        <div>
          <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">
            {t("quiz.selectCategory")}
          </h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={category === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => onSelectCategory("all")}
              className={`rounded-xl transition-all ${
                category === "all"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border-border hover:bg-muted text-foreground"
              }`}
            >
              {t("quiz.anyCategory")}
            </Button>
            {QUIZ_CATEGORIES.map((c) => (
              <Button
                key={c.key}
                variant={category === c.key ? "default" : "outline"}
                size="sm"
                onClick={() => onSelectCategory(c.key)}
                className={`rounded-xl transition-all ${
                  category === c.key
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-border hover:bg-muted text-foreground"
                }`}
              >
                {t(c.labelKey)}
              </Button>
            ))}
          </div>
        </div>

        {/* Difficulty selector */}
        <div>
          <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">
            {t("quiz.selectDifficulty")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {DIFFICULTIES.map((d) => (
              <Button
                key={d}
                variant={difficulty === d ? "default" : "outline"}
                size="sm"
                onClick={() => onSelectDifficulty(d)}
                className={`rounded-xl capitalize transition-all ${
                  difficulty === d
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-border hover:bg-muted text-foreground"
                }`}
              >
                {d === "all" ? t("quiz.anyCategory") : t(`quiz.difficulty.${d}`)}
              </Button>
            ))}
          </div>
        </div>

        {/* Action button */}
        <Button
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-transform active:-translate-y-px"
          onClick={onStartQuiz}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t("quiz.loadingQuestions")}
            </>
          ) : (
            <>
              {t("quiz.start")}
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>

        {error && (
          <p className="text-center text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl p-3 font-sans">
            {t("quiz.errorLoad")}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
