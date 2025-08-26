import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import FloatingAIChatbot from "@/components/floating-ai-chatbot"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Maza Finance - Financial Freedom for New Generation",
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
    <html lang="id" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          {children}
          <Footer />
          <FloatingAIChatbot />
        </ThemeProvider>
      </body>
    </html>
  )
}
