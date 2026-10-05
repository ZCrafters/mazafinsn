import { NextRequest, NextResponse } from "next/server"
import type { NewsArticle, NewsResponse } from "@/lib/news/types"
import { NEWS_CATEGORIES } from "@/lib/news/categories"
import { getNews } from "@/lib/news/providers"
import { getFallbackNews } from "@/lib/news/fallback"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const q = (searchParams.get("q") || "").trim()
  const category = (searchParams.get("category") || "").trim()
  const rawLimit = Number.parseInt(searchParams.get("limit") || "10", 10)
  const limit = Math.min(Math.max(rawLimit || 10, 1), 20)

  const categoryDef = NEWS_CATEGORIES.find((c) => c.key === category)
  const query = q || categoryDef?.query || "finance indonesia"

  let articles: NewsArticle[] = []
  let usedSource: "freenewsapi" | "freenewsapi-key" | "fallback" = "freenewsapi"

  try {
    articles = await getNews(query, category, limit)
  } catch {
    articles = getFallbackNews(category, limit)
    usedSource = "fallback"
  }

  if (articles.length === 0) {
    articles = getFallbackNews(category, limit)
    usedSource = "fallback"
  }

  const response: NewsResponse = {
    articles,
    total: articles.length,
    source: usedSource,
    updatedAt: new Date().toISOString(),
  }

  return NextResponse.json(response, {
    headers: {
      "Cache-Control": "s-maxage=900, stale-while-revalidate=3600",
    },
  })
}