import type { Metadata } from "next"
import DashboardHero from "@/components/dashboard/hero"
import DashboardFeatures from "@/components/dashboard/features"
import DashboardProjections from "@/components/dashboard/projections"
import QRPayment from "@/components/dashboard/qr-payment"
import AIChatbot from "@/components/dashboard/ai-chatbot"

export const metadata: Metadata = {
  title: "Dashboard - Maza Finance",
  description:
    "Banking Made Fun for New Generation. Track expenses, invest wisely, and play your way to financial freedom.",
}

export default function DashboardPage() {
  return (
    <main>
      <DashboardHero />
      <DashboardFeatures />
      <DashboardProjections />
      <AIChatbot />
      <QRPayment />
    </main>
  )
}
