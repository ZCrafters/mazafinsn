import type { Metadata } from "next"
import NewsHero from "@/components/news/hero"
import NewsContent from "@/components/news/content"
import Newsletter from "@/components/news/newsletter"

export const metadata: Metadata = {
  title: "Berita Investasi - Maza Finance",
  description:
    "Dapatkan informasi terbaru seputar dunia investasi dan keuangan untuk membantu Anda mengambil keputusan finansial yang lebih baik.",
}

export default function NewsPage() {
  return (
    <main>
      <NewsHero />
      <NewsContent />
      <Newsletter />
    </main>
  )
}
