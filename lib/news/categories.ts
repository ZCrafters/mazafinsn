import type { NewsCategoryKey } from "./types"

export interface NewsCategoryDef {
  key: NewsCategoryKey
  labelKey: string
  query: string
  keywords: string[]
  gameCategory: string
}

export const NEWS_CATEGORIES: NewsCategoryDef[] = [
  {
    key: "stock",
    labelKey: "news.category.stock",
    query: "stock market indonesia ihsg saham",
    keywords: ["saham", "stock", "ihsg", "bursa", "bourse", "exchange", "equity", "market"],
    gameCategory: "stocks",
  },
  {
    key: "crypto",
    labelKey: "news.category.crypto",
    query: "bitcoin cryptocurrency crypto",
    keywords: ["bitcoin", "crypto", "cryptocurrency", "ethereum", "kripto", "blockchain"],
    gameCategory: "crypto",
  },
  {
    key: "economy",
    labelKey: "news.category.economy",
    query: "economy inflation interest rate rupiah indonesia",
    keywords: ["ekonomi", "economy", "inflasi", "inflation", "gdp", "rupiah", "interest", "suku bunga", "bi rate"],
    gameCategory: "economy",
  },
  {
    key: "investment",
    labelKey: "news.category.investment",
    query: "investment portfolio bonds mutual fund",
    keywords: ["investasi", "investment", "portfolio", "reksa dana", "obligasi", "bond", "mutual fund"],
    gameCategory: "investment",
  },
  {
    key: "fintech",
    labelKey: "news.category.fintech",
    query: "fintech digital bank e-wallet",
    keywords: ["fintech", "digital bank", "e-wallet", "pembayaran", "payment", "paylater"],
    gameCategory: "fintech",
  },
  {
    key: "banking",
    labelKey: "news.category.banking",
    query: "bank banking credit loan",
    keywords: ["bank", "banking", "kredit", "credit", "perbankan", "loan"],
    gameCategory: "banking",
  },
]

export function detectCategory(title: string, description = ""): NewsCategoryKey {
  const text = `${title} ${description}`.toLowerCase()
  let best: NewsCategoryDef | null = null
  let bestScore = 0

  for (const category of NEWS_CATEGORIES) {
    let score = 0
    for (const keyword of category.keywords) {
      if (text.includes(keyword)) score += 1
    }
    if (score > bestScore) {
      best = category
      bestScore = score
    }
  }

  return best?.key ?? "economy"
}

export function categoryLabel(key: NewsCategoryKey): string {
  return NEWS_CATEGORIES.find((c) => c.key === key)?.labelKey ?? "news.category.economy"
}