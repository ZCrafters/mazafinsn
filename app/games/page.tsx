import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { pageMetadata } from "@/lib/seo"
import GamesContent from "@/components/games/content"

const ShaderBackground = dynamic(() => import("@/components/three/shader-background"), {
  ssr: false,
  loading: () => null,
})

export const metadata: Metadata = pageMetadata({
  title: "Game Edukasi Finansial - Maza Finance",
  description:
    "Belajar literasi keuangan lewat game seru: FORDLE, FinQuiz Arena, dan tantangan finansial lainnya. Main, kumpulkan poin, tukar hadiah.",
  path: "/games",
})

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <ShaderBackground className="w-full h-full" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-background/85 via-background/60 to-background/90"
      />
      <GamesContent />
    </main>
  )
}
