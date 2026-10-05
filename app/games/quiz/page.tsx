import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"
import QuizGame from "@/components/games/quiz/quiz-game"

export const metadata: Metadata = pageMetadata({
  title: "FinQuiz Arena - Maza Finance",
  description:
    "Uji pengetahuan finansialmu dalam kuis serba cepat, kumpulkan poin, dan tukarkan hadiah di Points Store.",
  path: "/games/quiz",
})

export default function QuizPage() {
  return <QuizGame />
}