import type { Metadata } from "next"
import Hero from "@/components/hero"
import FinancialProblems from "@/components/financial-problems"
import AuroraBackground from "@/components/aurora-background"
import HowItWorks from "@/components/how-it-works"
import GamificationPreview from "@/components/gamification-preview"
import BackToTop from "@/components/back-to-top"

export const metadata: Metadata = {
  title: "Maza Finance - Kuasai Uangmu, Kuasai Masa Depanmu",
  description:
    "Literasi finansial bukan lagi pilihan, tapi keharusan. Temukan masalah umum dan solusi praktis untuk membangun pondasi keuangan yang kokoh.",
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <AuroraBackground />
      <div className="relative z-10">
        <Hero />
        <FinancialProblems />
        <HowItWorks />
        <GamificationPreview />
      </div>
      <BackToTop />
    </main>
  )
}
