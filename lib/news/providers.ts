import type { NewsArticle } from "./types"
import { detectCategory } from "./categories"
import { getFallbackNews } from "./fallback"

const FREEDNEWS_URL = "https://freenewsapi.ai/v1/search"

interface FreeNewsRaw {
  total?: number
  results?: Array<{
    id?: string
    url?: string
    title?: string
    description?: string
    published_at?: string
    image?: string | null
    sitename?: string
    host?: string
    country?: string
    lang?: string
  }>
}

interface FreeNewsRawKeyed {
  data?: Array<{
    id?: string
    url?: string
    title?: string
    description?: string
    image?: string
    source?: { name?: string } | string
    publishedAt?: string
    pubDate?: string
  }>
}

function normalizeFreeNews(raw: FreeNewsRaw, limit: number): NewsArticle[] {
  if (!raw.results?.length) return []
  return raw.results.slice(0, limit).map((item, index) => {
    const title = item.title?.trim() || "Untitled"
    const description = item.description?.trim() || ""
    return {
      id: item.id || `freenews-${index}`,
      title,
      description,
      url: item.url || "/news",
      image: item.image || null,
      source: item.sitename || item.host || "News",
      publishedAt: item.published_at || new Date().toISOString(),
      category: detectCategory(title, description),
      country: item.country || "",
      lang: item.lang || "en",
    }
  })
}

function normalizeKeyedNews(raw: FreeNewsRawKeyed, limit: number): NewsArticle[] {
  const list = raw.data || []
  return list.slice(0, limit).map((item, index) => {
    const title = item.title?.trim() || "Untitled"
    const description = item.description?.trim() || ""
    const source =
      typeof item.source === "object" && item.source?.name
        ? item.source.name
        : typeof item.source === "string"
          ? item.source
          : "News"
    return {
      id: item.id || `keyed-${index}`,
      title,
      description,
      url: item.url || "/news",
      image: item.image || null,
      source,
      publishedAt: item.publishedAt || item.pubDate || new Date().toISOString(),
      category: detectCategory(title, description),
      country: "",
      lang: "en",
    }
  })
}

export async function fetchFromFreeNewsAPI(query: string, limit = 10): Promise<NewsArticle[]> {
  const url = `${FREEDNEWS_URL}?q=${encodeURIComponent(query)}&date=today&size=${limit}`
  const res = await fetch(url, {
    headers: {
      "User-Agent": "MazaFinance/1.0 (financial education platform)",
      "X-Agent": "maza-finance/nextjs",
    },
    next: { revalidate: 900 },
  })

  if (!res.ok) throw new Error(`freenewsapi error: ${res.status}`)
  const data = (await res.json()) as FreeNewsRaw
  return normalizeFreeNews(data, limit)
}

export async function fetchFromKeyedNewsAPI(query: string, limit = 10): Promise<NewsArticle[]> {
  const apiKey = process.env.FREENEWS_API_KEY
  if (!apiKey) throw new Error("FREENEWS_API_KEY not configured")

  const url = `https://api.freenewsapi.io/v1/news?title=${encodeURIComponent(query)}&limit=${limit}`
  const res = await fetch(url, {
    headers: { "X-API-Key": apiKey },
    next: { revalidate: 900 },
  })

  if (!res.ok) throw new Error(`freenewsapi.io error: ${res.status}`)
  const data = (await res.json()) as FreeNewsRawKeyed
  return normalizeKeyedNews(data, limit)
}

export async function getNews(query: string, category?: string, limit = 10): Promise<NewsArticle[]> {
  let articles: NewsArticle[] = []

  try {
    articles = await fetchFromFreeNewsAPI(query, limit)
  } catch {
    articles = []
  }

  if (articles.length === 0 && process.env.FREENEWS_API_KEY) {
    try {
      articles = await fetchFromKeyedNewsAPI(query, limit)
    } catch {
      articles = []
    }
  }

  if (articles.length === 0) {
    articles = getFallbackNews(category, limit)
  }

  return articles
}