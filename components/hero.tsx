"use client"

import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg font-serif">
            Kuasai Uangmu, Kuasai Masa Depanmu
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-sage-100 mb-8">
            Literasi finansial bukan lagi pilihan, tapi keharusan. Temukan masalah umum dan solusi praktis untuk
            membangun pondasi keuangan yang kokoh.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-3 rounded-full font-medium">
              Mulai Sekarang
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-sage-300 text-sage-100 hover:bg-sage-100 hover:text-sage-800 px-8 py-3 rounded-full font-medium bg-transparent"
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
