export type NewsCategoryKey = "stock" | "crypto" | "economy" | "investment" | "fintech" | "banking"

export interface NewsArticle {
  id: string
  title: string
  description: string
  url: string
  image: string | null
  source: string
  publishedAt: string
  category: NewsCategoryKey
  country: string
  lang: string
}

export interface NewsResponse {
  articles: NewsArticle[]
  total: number
  source: "freenewsapi" | "freenewsapi-key" | "fallback"
  updatedAt: string
}