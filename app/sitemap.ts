import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1, frequency: "weekly" },
    { path: "/dashboard", priority: 0.7, frequency: "weekly" },
    { path: "/management", priority: 0.7, frequency: "weekly" },
    { path: "/portfolio", priority: 0.7, frequency: "weekly" },
    { path: "/savings-goals", priority: 0.6, frequency: "weekly" },
    { path: "/savings-tracker", priority: 0.6, frequency: "weekly" },
    { path: "/games", priority: 0.8, frequency: "weekly" },
    { path: "/games/wordle", priority: 0.7, frequency: "daily" },
    { path: "/games/quiz", priority: 0.7, frequency: "daily" },
    { path: "/news", priority: 0.9, frequency: "daily" },
    { path: "/points-store", priority: 0.5, frequency: "weekly" },
    { path: "/ai-chatbot", priority: 0.6, frequency: "monthly" },
  ] as const

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.frequency,
    priority: route.priority,
  }))
}