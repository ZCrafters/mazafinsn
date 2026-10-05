"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight, TrendingUp, Newspaper, BrainCircuit, ExternalLink, Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { NEWS_CATEGORIES, categoryLabel } from "@/lib/news/categories"
import type { NewsArticle } from "@/lib/news/types"

interface NewsContentProps {
  query: string
  category: string
  onCategoryChange: (category: string) => void
}

function formatDate(dateString: string) {
  try {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  } catch {
    return dateString
  }
}

export default function NewsContent({ query, category, onCategoryChange }: NewsContentProps) {
  const { t } = useLanguage()
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(false)

    const params = new URLSearchParams({ limit: "12" })
    if (query) params.set("q", query)
    if (category) params.set("category", category)

    fetch(`/api/news?${params.toString()}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("bad response"))))
      .then((data) => {
        if (!cancelled) {
          setArticles(Array.isArray(data?.articles) ? data.articles : [])
        }
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [query, category])

  const featured = articles[0]
  const latest = articles.slice(1)

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Featured News */}
        <section className="mb-16">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">{t("common.loading")}</p>
            </div>
          ) : error || !featured ? (
            <Card className="border-0 shadow-xl">
              <CardContent className="p-12 text-center">
                <Newspaper className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-bold text-foreground mb-2">{t("news.noResults")}</h2>
                <Button variant="outline" onClick={() => onCategoryChange("")}>
                  {t("common.viewAll")}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-xl overflow-hidden bg-card">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto relative bg-muted">
                  {featured.image ? (
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <Newspaper className="w-16 h-16 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="w-fit bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200">
                      {t("news.breaking")}
                    </Badge>
                    <Badge variant="secondary" className="w-fit text-xs">
                      {t(categoryLabel(featured.category))}
                    </Badge>
                  </div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 leading-tight">
                    {featured.title}
                  </h1>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{featured.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span>{featured.source}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(featured.publishedAt)}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button size="lg" asChild>
                      <a href={featured.url} target="_blank" rel="noopener noreferrer">
                        {t("common.readMore")}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/games/quiz">
                        <BrainCircuit className="w-4 h-4 mr-2" />
                        {t("news.takeQuiz")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                {query ? t("news.searchResults") : t("news.latest")}
              </h2>
              <Badge variant="secondary">{articles.length}</Badge>
            </div>

            {!loading && latest.length === 0 && !error && (
              <p className="text-muted-foreground text-center py-16">{t("news.noResults")}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latest.map((news) => (
                <Card key={news.id} className="card-hover border-0 shadow-lg overflow-hidden bg-card">
                  <div className="aspect-video relative bg-muted">
                    {news.image ? (
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <Newspaper className="w-10 h-10 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-3">
                    <Badge variant="secondary" className="w-fit text-xs mb-2">
                      {t(categoryLabel(news.category))}
                    </Badge>
                    <CardTitle className="text-lg leading-tight text-foreground">{news.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{news.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span>{news.source}</span>
                      <span>{formatDate(news.publishedAt)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Button size="sm" variant="outline" asChild>
                        <a href={news.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3.5 h-3.5 mr-1" />
                          {t("common.readMore")}
                        </a>
                      </Button>
                      <Button size="sm" className="bg-sage-600 hover:bg-sage-700 text-white" asChild>
                        <Link href="/games/quiz">
                          <BrainCircuit className="w-3.5 h-3.5 mr-1" />
                          {t("news.takeQuiz")}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <Card className="border-0 shadow-lg bg-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">{t("news.categories")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {NEWS_CATEGORIES.map((item) => {
                  const active = category === item.key
                  const count = articles.filter((a) => a.category === item.key).length
                  return (
                    <button
                      key={item.key}
                      onClick={() => onCategoryChange(active ? "" : item.key)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                        active ? "bg-sage-100 dark:bg-sage-900/40 text-sage-900 dark:text-sage-200" : "hover:bg-muted"
                      }`}
                    >
                      <span className="font-medium text-foreground">{t(item.labelKey)}</span>
                      <Badge variant={active ? "default" : "secondary"} className="text-xs">
                        {count}
                      </Badge>
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Trending */}
            <Card className="border-0 shadow-lg bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  {t("news.trending")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {NEWS_CATEGORIES.slice(0, 5).map((item, index) => (
                  <button
                    key={item.key}
                    onClick={() => onCategoryChange(item.key)}
                    className="w-full flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <span
                      className={`w-6 h-6 text-white text-xs font-bold rounded-full flex items-center justify-center ${
                        ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-blue-500"][index]
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-foreground">{t(item.labelKey)}</span>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter CTA */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-sage-50 to-sage-100 dark:from-sage-900/40 dark:to-sage-800/40">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-foreground mb-2">{t("news.newsletter.title")}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t("news.newsletter.description")}</p>
                <Button className="w-full bg-sage-600 hover:bg-sage-700 text-white" asChild>
                  <a href="#newsletter">{t("common.subscribe")}</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}