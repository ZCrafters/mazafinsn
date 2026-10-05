import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono, Outfit, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/language-context"
import FloatingAIChatbot from "@/components/floating-ai-chatbot"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/lib/seo"

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Maza Finance - Financial Freedom for New Generation",
    template: "%s | Maza Finance",
  },
  description:
    "Banking made fun for new generation. Track expenses, invest wisely, and play your way to financial freedom with AI-powered tools.",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${outfit.variable} ${jetbrainsMono.variable} ${jakarta.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <JsonLd />
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header />
            {children}
            <Footer />
            <FloatingAIChatbot />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
