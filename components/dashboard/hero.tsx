"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function DashboardHero() {
  return (
    <section className="py-16 sm:py-24 px-4 bg-background relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(46,139,87,0.14),transparent_65%)]"
      />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-widest text-[#2E8B57] dark:text-[#85a37a] mb-4 block">
            Dashboard
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground font-display tracking-tight leading-[1.05] mb-5">
            Dashboard keuangan Anda,{" "}
            <span className="text-[#2E8B57] dark:text-[#85a37a]">satu pandangan</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-9">
            Pantau pengeluaran, investasi cerdas, dan bermain menuju kebebasan finansial. Banking yang menyenangkan
            untuk generasi baru.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-[#2E8B57] hover:bg-[#236B43] text-white px-8 rounded-full font-medium">
              Mulai Investasi
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-[#2E8B57]/40 text-[#2E8B57] dark:text-[#85a37a] hover:bg-[#2E8B57]/5 px-8 rounded-full font-medium"
            >
              Lihat Laporan
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}