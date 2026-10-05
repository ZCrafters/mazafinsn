import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DashboardHero from "@/components/dashboard/hero";
import DashboardFeatures from "@/components/dashboard/features";
import DashboardProjections from "@/components/dashboard/projections";
import QRPayment from "@/components/dashboard/qr-payment";
import AIChatbot from "@/components/dashboard/ai-chatbot";
import PointsDashboard from "@/components/points/points-dashboard";

export const metadata: Metadata = pageMetadata({
  title: "Dashboard Keuangan - Maza Finance",
  description:
    "Pantau pengeluaran, investasi, proyeksi keuangan, dan asisten AI dalam satu dashboard untuk kebebasan finansial.",
  path: "/dashboard",
});

export default function DashboardPage() {
  return (
    <main className="bg-background min-h-screen">
      <DashboardHero />
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-medium uppercase tracking-widest text-[#2E8B57] dark:text-[#85a37a] mb-3 block">
              Poin & reward
            </span>
            <h2 className="text-3xl font-bold text-foreground font-display tracking-tight mb-3">
              Poin & reward Anda
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Lacak pencapaian gaming dan tukarkan poin untuk hadiah menarik.
            </p>
          </div>
          <PointsDashboard />
        </div>
      </section>
      <DashboardFeatures />
      <DashboardProjections />
      <AIChatbot />
      <QRPayment />
    </main>
  );
}