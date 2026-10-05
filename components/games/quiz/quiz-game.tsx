"use client"

import { useState } from "react"
import type { QuizQuestion } from "@/lib/games/quiz"
import { earnPoints } from "@/lib/points-system"
import { decodeHtml, type Difficulty, type QuizScreen } from "./quiz-helpers"
import { QuizSetup } from "./quiz-setup"
import { QuizQuestionCard } from "./quiz-question-card"
import { QuizResultCard } from "./quiz-result-card"

export default function QuizGame() {
  const [screen, setScreen] = useState<QuizScreen>("setup")
  const [category, setCategory] = useState("all")
  const [difficulty, setDifficulty] = useState<Difficulty>("all")
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [pointsEarned, setPointsEarned] = useState(0)

  const startQuiz = async () => {
    setLoading(true)
    setError(false)
    setScreen("playing")

    const params = new URLSearchParams({ amount: "10", category, difficulty })
    try {
      const res = await fetch(`/api/quiz?${params.toString()}`)
      if (!res.ok) throw new Error("bad response")
      const data = await res.json()
      if (!Array.isArray(data?.questions) || data.questions.length === 0) {
        throw new Error("no questions")
      }
      setQuestions(
        data.questions.map((q: QuizQuestion) => ({
          ...q,
          question: decodeHtml(q.question),
        }))
      )
      setCurrent(0)
      setSelected(null)
      setRevealed(false)
      setScore(0)
      setPointsEarned(0)
    } catch {
      setError(true)
      setScreen("setup")
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (index: number) => {
    if (revealed) return
    setSelected(index)
    setRevealed(true)
    const question = questions[current]
    if (index === question.correctIndex) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      const correct = score
      const total = questions.length
      const won = correct >= Math.ceil(total * 0.6)
      const pts = earnPoints("financial-quiz", {
        won,
        attempts: total,
        perfectScore: correct === total,
        isDaily: false,
      })
      setPointsEarned(pts)
      setScreen("result")
    } else {
      setCurrent((prev) => prev + 1)
      setSelected(null)
      setRevealed(false)
    }
  }

  const currentQuestion = questions[current]

  return (
    <div className="min-h-[100dvh] bg-background py-12 md:py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {screen === "setup" && (
          <QuizSetup
            category={category}
            difficulty={difficulty}
            loading={loading}
            error={error}
            onSelectCategory={setCategory}
            onSelectDifficulty={setDifficulty}
            onStartQuiz={startQuiz}
          />
        )}

        {screen === "playing" && currentQuestion && (
          <QuizQuestionCard
            question={currentQuestion}
            currentIndex={current}
            totalQuestions={questions.length}
            score={score}
            selected={selected}
            revealed={revealed}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        )}

        {screen === "result" && (
          <QuizResultCard
            score={score}
            totalQuestions={questions.length}
            pointsEarned={pointsEarned}
            category={questions[0]?.category}
            onPlayAgain={() => setScreen("setup")}
          />
        )}
      </div>
    </div>
  )
}