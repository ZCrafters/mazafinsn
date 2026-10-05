import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Hero from "@/components/hero";
import FinancialProblems from "@/components/financial-problems";
import HowItWorks from "@/components/how-it-works";
import GamificationPreview from "@/components/gamification-preview";
import BackToTop from "@/components/back-to-top";

export const metadata: Metadata = pageMetadata({
  title: "Maza Finance - Kuasai Uangmu, Kuasai Masa Depanmu",
  description:
    "Kelola keuangan jadi mudah: catat otomatis, investasi cerdas, dan belajar lewat game seru — semua dibantu AI.",
  path: "/",
});

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Hero />
      <FinancialProblems />
      <HowItWorks />
      <GamificationPreview />
      <BackToTop />
    </main>
  );
}