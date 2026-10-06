"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, LayoutDashboard, TrendingUp, Gamepad2, Bot, Newspaper, Coins } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import LanguageSwitcher from "@/components/language-switcher"
import ThemeToggle from "@/components/theme-toggle"

const navLinks = [
  { href: "/", label: "header.home", icon: null },
  { href: "/dashboard", label: "header.dashboard", icon: LayoutDashboard },
  { href: "/management", label: "header.management", icon: TrendingUp },
  { href: "/games", label: "header.games", icon: Gamepad2 },
  { href: "/points-store", label: "header.pointsStore", icon: Coins },
  { href: "/ai-chatbot", label: "header.aiChat", icon: Bot },
  { href: "/news", label: "header.news", icon: Newspaper },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
    <header
      className={`border-b border-border sticky top-0 z-50 transition-colors ${
        isMenuOpen ? "bg-background" : "bg-background/80 backdrop-blur-md"
      }`}
    >
      <div className="w-full pl-4 sm:pl-6 pr-0">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group" onClick={() => setIsMenuOpen(false)}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2E8B57] to-[#236B43] flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-300 overflow-hidden shadow-sm">
              <Image
                src="/images/maza-logo.jpg"
                alt="MAZA Finance Logo"
                width={36}
                height={36}
                className="w-9 h-9 object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-foreground tracking-tight leading-tight font-display">
                {t("header.title")}
              </span>
              <span className="text-xs text-muted-foreground font-medium tracking-wide leading-none">
                {t("header.subtitle")}
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "text-[#2E8B57] dark:text-[#85a37a] bg-sage-soft/60"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {link.icon && <link.icon size={17} />}
                  {t(link.label)}
                </Link>
              )
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground font-medium px-5">
              {t("header.signIn")}
            </Button>
            <Button className="bg-[#2E8B57] hover:bg-[#236B43] text-white font-medium px-6 shadow-sm">
              {t("header.getStarted")}
            </Button>
          </div>

          <div className="flex lg:hidden items-center gap-1">
            <ThemeToggle />
            <button
              className="p-3 text-foreground hover:bg-accent rounded-lg transition-colors"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Open main menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="py-4 pr-4 sm:pr-6">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link, index) => {
                  const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, rotateX: -90 }}
                      animate={{ opacity: 1, rotateX: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut", rotateX: { duration: 0.3, delay: index * 0.05 } }}
                    >
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                          active
                            ? "text-[#2E8B57] dark:text-[#85a37a] bg-sage-soft/60"
                            : "text-foreground hover:bg-accent"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.icon && <link.icon size={18} />}
                        {t(link.label)}
                      </Link>
                    </motion.div>
                  )
                })}
                <div className="flex flex-col gap-3 pt-6 border-t border-border">
                  <div className="px-4 pb-3">
                    <LanguageSwitcher />
                  </div>
                  <Button variant="ghost" className="text-foreground justify-start font-medium">
                    {t("header.signIn")}
                  </Button>
                  <Button className="bg-[#2E8B57] hover:bg-[#236B43] text-white justify-start font-medium">
                    {t("header.getStarted")}
                  </Button>
                </div>
              </nav>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}