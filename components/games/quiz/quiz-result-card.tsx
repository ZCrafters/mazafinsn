"use client"

import * as React from "react"
import Link from "next/link"
import { Trophy, RotateCcw, Newspaper, Coins } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { quizCategoryToNews } from "./quiz-helpers"

interface QuizResultCardProps {
  score: number
  totalQuestions: number
  pointsEarned: number
  category?: string
  onPlayAgain: () => void
}

export function QuizResultCard({
  score,
  totalQuestions,
  pointsEarned,
  category = "economy",
  onPlayAgain,
}: QuizResultCardProps) {
  const { t } = useLanguage()

  return (
    <Card className="border border-border shadow-sm bg-card text-center rounded-2xl overflow-hidden">
      <CardContent className="p-8 md:p-12">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5 text-primary">
          <Trophy className="w-8 h-8" />
        </div>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          {t("quiz.completed")}
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mb-6 font-sans">
          {score} {t("quiz.of")} {totalQuestions} {t("quiz.correctCount")}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3.5 max-w-sm mx-auto mb-8">
          <div className="bg-muted/50 border border-border rounded-xl p-4">
            <div className="text-2xl md:text-3xl font-bold font-mono tabular-nums text-foreground">
              {score}
            </div>
            <div className="text-xs text-muted-foreground font-sans mt-0.5">
              {t("quiz.correctCount")}
            </div>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
            <div className="text-2xl md:text-3xl font-bold font-mono tabular-nums text-primary flex items-center justify-center gap-1">
              <Coins className="w-5 h-5" />
              <span>+{pointsEarned}</span>
            </div>
            <div className="text-xs text-muted-foreground font-sans mt-0.5">
              {t("quiz.pointsEarned")}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-transform active:-translate-y-px"
            onClick={onPlayAgain}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            {t("quiz.playAgain")}
          </Button>
          <Button size="lg" variant="outline" asChild className="rounded-xl border-border hover:bg-muted text-foreground">
            <Link href={`/news?category=${quizCategoryToNews(category)}`}>
              <Newspaper className="w-4 h-4 mr-2 text-primary" />
              {t("quiz.relatedNews")}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
