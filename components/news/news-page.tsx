"use client"

import { useState } from "react"
import NewsHero from "@/components/news/hero"
import NewsContent from "@/components/news/content"
import Newsletter from "@/components/news/newsletter"

export default function NewsPageClient() {
  const [query, setQuery] = useState("")
  const [submittedQuery, setSubmittedQuery] = useState("")
  const [category, setCategory] = useState("")

  return (
    <main>
      <NewsHero value={query} onChange={setQuery} onSearch={() => setSubmittedQuery(query.trim())} />
      <NewsContent query={submittedQuery} category={category} onCategoryChange={setCategory} />
      <Newsletter />
    </main>
  )
}