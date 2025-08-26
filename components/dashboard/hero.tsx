"use client"

import { Button } from "@/components/ui/button"

export default function DashboardHero() {
  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-br from-sage-50 to-sage-100">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-sage-800 font-serif">Dashboard Keuangan Anda</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-sage-600 mb-8">
            Pantau pengeluaran, investasi cerdas, dan bermain menuju kebebasan finansial. Banking yang menyenangkan
            untuk generasi baru.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-3 rounded-full font-medium">
              Mulai Investasi
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-sage-600 text-sage-600 hover:bg-sage-600 hover:text-white px-8 py-3 rounded-full font-medium bg-transparent"
            >
              Lihat Laporan
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
