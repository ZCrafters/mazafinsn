"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={t("header.toggleTheme")}
      title={t("header.toggleTheme")}
      className={`text-muted-foreground hover:text-foreground ${className}`}
    >
      {/* Render statis saat SSR agar tidak hydration mismatch */}
      {!mounted || !isDark ? <Moon size={18} /> : <Sun size={18} />}
    </Button>
  )
}
