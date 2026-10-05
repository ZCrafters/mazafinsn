import type { Metadata } from "next"

// Placeholder brand/domain config — replace with the real values before going live.
export const siteConfig = {
  name: "Maza Finance",
  tagline: "Kuasai Uangmu, Kuasai Masa Depanmu",
  url: "https://mazafinance.example",
  locale: "id_ID",
  defaultTitle: "Maza Finance - Financial Freedom for New Generation",
  defaultDescription:
    "Banking made fun for new generation. Track expenses, invest wisely, and play your way to financial freedom with AI-powered tools.",
}

export interface PageSeoOptions {
  title: string
  description: string
  path: string
  images?: { url: string; width: number; height: number; alt: string }[]
}

export function pageMetadata({ title, description, path }: PageSeoOptions): Metadata {
  const canonical = `${siteConfig.url}${path}`
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: `${siteConfig.url}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.url}/opengraph-image`],
    },
  }
}