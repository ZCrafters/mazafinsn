"use client"

import { Component as Carousel } from "@/components/ui/carousel"
import { FiDollarSign, FiCreditCard, FiShield, FiTrendingUp, FiTarget, FiPieChart } from "react-icons/fi"

const problems = [
  {
    title: "Gaji Habis di Tengah Bulan?",
    description:
      "Merasa cemas saat tanggal tua mendekat karena uang sudah menipis? Gunakan metode budgeting 50/30/20 dan catat semua pengeluaran untuk mengidentifikasi pos 'bocor'.",
    id: 1,
    icon: <FiDollarSign className="h-[16px] w-[16px] text-white" />,
    backgroundImage: "/empty-wallet-with-coins-scattered-financial-stress.png",
  },
  {
    title: "Terlilit Utang Konsumtif",
    description:
      "Tagihan kartu kredit membengkak? Stop menambah utang baru, prioritaskan membayar utang dengan bunga tertinggi, dan cari penghasilan tambahan.",
    id: 2,
    icon: <FiCreditCard className="h-[16px] w-[16px] text-white" />,
    backgroundImage: "/multiple-credit-cards-debt-financial-burden.png",
  },
  {
    title: "Tak Punya Dana Darurat",
    description:
      "Satu kejadian tak terduga bisa merusak rencana keuangan. Mulai kumpulkan 3-6 kali pengeluaran bulanan di rekening terpisah khusus dana darurat.",
    id: 3,
    icon: <FiShield className="h-[16px] w-[16px] text-white" />,
    backgroundImage: "/emergency-fund-piggy-bank-safety-net-financial-sec.png",
  },
  {
    title: "Bingung Memulai Investasi",
    description:
      "Takut rugi atau merasa modal kurang? Mulai dari Reksadana Pasar Uang dengan DCA (Dollar Cost Averaging). Investasi adalah maraton, bukan sprint.",
    id: 4,
    icon: <FiTrendingUp className="h-[16px] w-[16px] text-white" />,
    backgroundImage: "/investment-growth-chart-stocks-bonds-financial-pla.png",
  },
  {
    title: "Gaji Naik, Tabungan Stagnan",
    description:
      "Setiap kali pendapatan naik, pengeluaran gaya hidup juga naik. Saat gaji naik, naikkan tabungan/investasi terlebih dahulu sebelum lifestyle.",
    id: 5,
    icon: <FiPieChart className="h-[16px] w-[16px] text-white" />,
    backgroundImage: "/lifestyle-inflation-spending-habits-budget-pie-cha.png",
  },
  {
    title: "Tidak Punya Tujuan Finansial",
    description:
      "Menabung tanpa tujuan jelas membuat motivasi luntur. Tetapkan tujuan SMART dan pisahkan rekening untuk setiap tujuan finansial.",
    id: 6,
    icon: <FiTarget className="h-[16px] w-[16px] text-white" />,
    backgroundImage: "/financial-goals-target-planning-savings-objectives.png",
  },
]

export default function FinancialProblems() {
  return (
    <section className="py-20 backdrop-blur-sm relative overflow-hidden bg-gradient-to-br from-[#1a5f3f] via-[#2E8B57] to-[#228B22]">
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/25 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-white/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/15 rounded-full blur-md animate-pulse delay-2000"></div>
        <div className="absolute top-1/3 right-1/3 w-10 h-10 bg-white/10 rounded-full blur-lg animate-pulse delay-3000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white font-serif tracking-tight mb-6">
            Masalah Keuangan Umum & Solusinya
          </h2>
          <p className="text-white/95 max-w-4xl mx-auto text-xl leading-relaxed">
            Kenali masalah finansial yang sering dihadapi dan temukan solusi praktis untuk mengatasinya melalui carousel
            interaktif 3D
          </p>
        </div>

        <div className="flex justify-center items-center py-8">
          <div className="w-full max-w-6xl mx-auto">
            <Carousel
              items={problems}
              baseWidth={650}
              autoplay={true}
              autoplayDelay={4000}
              pauseOnHover={true}
              loop={true}
              round={false}
            />
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/90 text-base font-medium leading-relaxed">
            💡 Drag atau klik dot untuk navigasi • Hover untuk pause otomatis
          </p>
        </div>
      </div>
    </section>
  )
}