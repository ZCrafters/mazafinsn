import type { NewsArticle, NewsCategoryKey } from "./types"
import { detectCategory } from "./categories"

export const FALLBACK_NEWS: NewsArticle[] = [
  {
    id: "fallback-1",
    title: "Rupiah Menguat Terhadap Dolar AS di Tengah Sentimen Positif",
    description:
      "Nilai tukar rupiah terhadap dolar AS menguat 0.5% pada perdagangan hari ini, didorong aliran modal asing yang masuk ke pasar obligasi domestik.",
    url: "/news",
    image: "/rupiah-currency.png",
    source: "Maza Finance",
    publishedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    category: "economy",
    country: "ID",
    lang: "id",
  },
  {
    id: "fallback-2",
    title: "Startup Fintech Indonesia Raih Pendanaan Seri B $50 Juta",
    description:
      "Perusahaan fintech lokal berhasil mengumpulkan dana untuk ekspansi ke Asia Tenggara dengan fokus pada layanan keuangan inklusif.",
    url: "/news",
    image: "/fintech-startup.png",
    source: "Maza Finance",
    publishedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    category: "fintech",
    country: "ID",
    lang: "id",
  },
  {
    id: "fallback-3",
    title: "IHSG Ditutup Menguat 1.2% Didorong Sektor Perbankan",
    description:
      "Indeks Harga Saham Gabungan mengakhiri perdagangan dengan penguatan signifikan, dipimpin saham-saham perbankan dan konsumer.",
    url: "/news",
    image: "/stock-market-chart.png",
    source: "Maza Finance",
    publishedAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    category: "stock",
    country: "ID",
    lang: "id",
  },
  {
    id: "fallback-4",
    title: "Bitcoin Tembus $45,000, Altcoin Ikut Menguat",
    description:
      "Pasar cryptocurrency menunjukkan tren positif dengan Bitcoin memimpin kenaikan dan altcoin mengikuti pergerakan serupa.",
    url: "/news",
    image: "/bitcoin-cryptocurrency.png",
    source: "Maza Finance",
    publishedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    category: "crypto",
    country: "ID",
    lang: "id",
  },
  {
    id: "fallback-5",
    title: "Inflasi Indonesia Turun ke 2.8% pada Desember",
    description:
      "Badan Pusat Statistik melaporkan penurunan tingkat inflasi yang signifikan, memberikan ruang bagi kebijakan moneter yang lebih longgar.",
    url: "/news",
    image: "/inflation-statistics.png",
    source: "Maza Finance",
    publishedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    category: "economy",
    country: "ID",
    lang: "id",
  },
  {
    id: "fallback-6",
    title: "Obligasi Pemerintah Diminati Investor Asing",
    description:
      "Minat investor asing terhadap obligasi pemerintah Indonesia meningkat tajam seiring perbaikan outlook ekonomi dan stabilitas politik.",
    url: "/news",
    image: "/government-bonds.png",
    source: "Maza Finance",
    publishedAt: new Date(Date.now() - 30 * 3600 * 1000).toISOString(),
    category: "investment",
    country: "ID",
    lang: "id",
  },
]

export function getFallbackNews(category?: string, limit = 10): NewsArticle[] {
  let articles = FALLBACK_NEWS
  if (category) {
    const key = category as NewsCategoryKey
    articles = articles.filter((a) => a.category === key)
  }
  return articles.slice(0, limit)
}

export function fallbackWithCategory(articles: NewsArticle[]): NewsArticle[] {
  return articles.map((a) => ({ ...a, category: detectCategory(a.title, a.description) }))
}