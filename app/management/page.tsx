import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import EnhancedFinancialDashboard from "@/components/management/enhanced-financial-dashboard";

export const metadata: Metadata = pageMetadata({
  title: "Manajemen Keuangan - Maza Finance",
  description: "Analisis mendalam keuangan dengan grafik, proyeksi, laporan transaksi, dan analisis risiko.",
  path: "/management",
});

export default function ManagementPage() {
  return (
    <main className="min-h-[100dvh] bg-background text-foreground">
      <EnhancedFinancialDashboard />
    </main>
  );
}
