import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"
import NewsPageClient from "@/components/news/news-page"

export const metadata: Metadata = pageMetadata({
  title: "Berita Investasi & Pasar - Maza Finance",
  description:
    "Berita pasar saham, cryptocurrency, ekonomi, dan investasi Indonesia terkini untuk membantu Anda mengambil keputusan finansial yang lebih baik.",
  path: "/news",
})

export default function NewsPage() {
  return <NewsPageClient />
}