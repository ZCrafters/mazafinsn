import type { Metadata } from "next"
import GamesContent from "@/components/games/content"

export const metadata: Metadata = {
  title: "FinWord Games - Maza Finance",
  description: "Learn financial literacy through fun and interactive games.",
}

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-sage-50">
      <GamesContent />
    </main>
  )
}
