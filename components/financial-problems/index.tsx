"use client"

import { Component as Carousel } from "@/components/ui/carousel"
import { problems } from "./data"

export default function FinancialProblems() {
  return (
    <section className="py-20 sm:py-24 px-4 bg-muted/60 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-medium uppercase tracking-widest text-[#2E8B57] dark:text-[#85a37a] mb-3 block">
            Masalah umum
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-display tracking-tight mb-4">
            Masalah keuangan yang sering kita hadapi
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Kenali masalah finansial yang sering dihadapi dan temukan solusi praktis untuk mengatasinya.
          </p>
        </div>

        <div className="flex justify-center items-center py-6">
          <div className="w-full">
            <Carousel
              items={problems}
              baseWidth={560}
              autoplay={true}
              autoplayDelay={5000}
              pauseOnHover={true}
              loop={true}
              round={false}
            />
          </div>
        </div>

        <p className="text-center text-muted-foreground text-sm mt-10">
          Drag atau klik dot untuk navigasi • Hover untuk pause otomatis
        </p>
      </div>
    </section>
  )
}