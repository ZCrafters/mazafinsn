import { NextRequest, NextResponse } from "next/server"
import { getQuizQuestions, type QuizDifficulty } from "@/lib/games/quiz"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const rawAmount = Number.parseInt(searchParams.get("amount") || "10", 10)
  const amount = Math.min(Math.max(rawAmount || 10, 5), 20)
  const category = (searchParams.get("category") || "all").trim()
  const rawDifficulty = (searchParams.get("difficulty") || "all").trim()
  const difficulty = (["easy", "medium", "hard"].includes(rawDifficulty)
    ? rawDifficulty
    : "all") as QuizDifficulty | "all"

  try {
    const questions = await getQuizQuestions(amount, category, difficulty)
    return NextResponse.json({ questions, total: questions.length })
  } catch (error) {
    console.error("Quiz API error:", error)
    return NextResponse.json({ error: "Failed to load questions" }, { status: 500 })
  }
}