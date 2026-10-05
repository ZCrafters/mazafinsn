import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"
import WordleGame from "../../../components/wordle/wordle-game"

export const metadata: Metadata = pageMetadata({
  title: "FORDLE - Financial Wordle - Maza Finance",
  description:
    "Main FORDLE, tebak kata finansial sambil belajar istilah keuangan dan kumpulkan poin setiap hari.",
  path: "/games/wordle",
})

export default function WordlePage() {
  return (
    <main className="min-h-screen bg-sage-50">
      <WordleGame />
    </main>
  )
}