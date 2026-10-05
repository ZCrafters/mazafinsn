export type Difficulty = "all" | "easy" | "medium" | "hard"

export const DIFFICULTIES: Difficulty[] = ["all", "easy", "medium", "hard"]

export type QuizScreen = "setup" | "playing" | "result"

export function decodeHtml(input: string): string {
  return input
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&ndash;/g, "–")
    .replace(/&eacute;/g, "é")
    .replace(/&aacute;/g, "á")
}

export function quizCategoryToNews(category: string): string {
  const map: Record<string, string> = {
    stocks: "stock",
    crypto: "crypto",
    economy: "economy",
    investment: "investment",
    fintech: "fintech",
    banking: "banking",
  }
  return map[category] || "economy"
}
