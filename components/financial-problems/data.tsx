import { DollarSign, CreditCard, Shield, TrendingUp, PieChart, Target } from "lucide-react"
import type { CarouselItem } from "@/components/ui/carousel"

export const problems: CarouselItem[] = [
  {
    title: "Gaji Habis di Tengah Bulan?",
    description:
      "Merasa cemas saat tanggal tua mendekat karena uang sudah menipis? Gunakan metode budgeting 50/30/20 dan catat semua pengeluaran untuk mengidentifikasi pos 'bocor'.",
    id: 1,
    icon: <DollarSign className="h-[16px] w-[16px] text-white" />,
    backgroundImage: "/empty-wallet-with-coins-scattered-financial-stress.png",
  },
  {
    title: "Terlilit Utang Konsumtif",
    description:
      "Tagihan kartu kredit membengkak? Stop menambah utang baru, prioritaskan membayar utang dengan bunga tertinggi, dan cari penghasilan tambahan.",
    id: 2,
    icon: <CreditCard className="h-[16px] w-[16px] text-white" />,
    backgroundImage: "/multiple-credit-cards-debt-financial-burden.png",
  },
  {
    title: "Tak Punya Dana Darurat",
    description:
      "Satu kejadian tak terduga bisa merusak rencana keuangan. Mulai kumpulkan 3-6 kali pengeluaran bulanan di rekening terpisah khusus dana darurat.",
    id: 3,
    icon: <Shield className="h-[16px] w-[16px] text-white" />,
    backgroundImage: "/emergency-fund-piggy-bank-safety-net-financial-sec.png",
  },
  {
    title: "Bingung Memulai Investasi",
    description:
      "Takut rugi atau merasa modal kurang? Mulai dari Reksadana Pasar Uang dengan DCA (Dollar Cost Averaging). Investasi adalah maraton, bukan sprint.",
    id: 4,
    icon: <TrendingUp className="h-[16px] w-[16px] text-white" />,
    backgroundImage: "/investment-growth-chart-stocks-bonds-financial-pla.png",
  },
  {
    title: "Gaji Naik, Tabungan Stagnan",
    description:
      "Setiap kali pendapatan naik, pengeluaran gaya hidup juga naik. Saat gaji naik, naikkan tabungan/investasi terlebih dahulu sebelum lifestyle.",
    id: 5,
    icon: <PieChart className="h-[16px] w-[16px] text-white" />,
    backgroundImage: "/lifestyle-inflation-spending-habits-budget-pie-cha.png",
  },
  {
    title: "Tidak Punya Tujuan Finansial",
    description:
      "Menabung tanpa tujuan jelas membuat motivasi luntur. Tetapkan tujuan SMART dan pisahkan rekening untuk setiap tujuan finansial.",
    id: 6,
    icon: <Target className="h-[16px] w-[16px] text-white" />,
    backgroundImage: "/financial-goals-target-planning-savings-objectives.png",
  },
]