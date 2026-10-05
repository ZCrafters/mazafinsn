import { TrendingUp, DollarSign, PieChart, Newspaper } from "lucide-react"
import type { QuickQuestionItem } from "./types"

export const DEFAULT_QUICK_QUESTIONS: QuickQuestionItem[] = [
  {
    icon: TrendingUp,
    text: "Analisis saham BBRI terbaru",
    translationKey: "ai.quick.stocks",
    category: "stocks",
  },
  {
    icon: DollarSign,
    text: "Kurs USD ke IDR hari ini",
    translationKey: "ai.quick.currency",
    category: "currency",
  },
  {
    icon: PieChart,
    text: "Strategi diversifikasi portfolio",
    translationKey: "ai.quick.portfolio",
    category: "portfolio",
  },
  {
    icon: Newspaper,
    text: "Berita pasar modal terkini",
    translationKey: "ai.quick.news",
    category: "news",
  },
]
