import type { Metadata } from "next"
import EnhancedFinancialDashboard from "@/components/management/enhanced-financial-dashboard"

export const metadata: Metadata = {
  title: "Dashboard Keuangan Komprehensif - Maza Finance",
  description: "Analisis mendalam keuangan dengan grafik, proyeksi, dan laporan lengkap.",
}

export default function ManagementPage() {
  return (
    <main className="min-h-screen">
      <EnhancedFinancialDashboard />
    </main>
  )
}
