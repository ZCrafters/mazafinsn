"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import SplitText from "@/components/ui/split-text"
import { ArrowRight, TrendingUp, PiggyBank, Target } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden">
      {/* Ambient sage glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(46,139,87,0.16),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-32 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(165,195,165,0.22),transparent_65%)]"
      />

      <div className="container mx-auto px-4 py-20 sm:py-28 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Copy */}
          <div className="lg:col-span-7 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#2E8B57] dark:text-[#85a37a] mb-6">
              <PiggyBank size={14} />
              {t("header.subtitle")}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground font-display leading-[1.05] tracking-tight mb-6">
              <SplitText
                text={t("landing.hero.title")}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground font-display leading-[1.05] tracking-tight"
                delay={60}
                duration={0.7}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.2}
                textAlign="left"
              />
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-9">
              {t("landing.hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button size="lg" className="bg-[#2E8B57] hover:bg-[#236B43] text-white px-8 rounded-full font-medium">
                {t("landing.hero.ctaPrimary")}
              </Button>
              <Link
                href="/games"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-3"
              >
                {t("landing.hero.ctaSecondary")}
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl border border-border bg-card p-6 shadow-[0_24px_60px_-24px_rgba(23,26,22,0.28)]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t("dashboard.expenses")} / bulan</p>
                  <p className="text-3xl font-bold text-foreground font-mono tabular-nums">Rp 3.850.000</p>
                </div>
                <div className="w-11 h-11 rounded-full bg-[#2E8B57]/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#2E8B57]" />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>{t("common.budget")}</span>
                  <span>78%</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[78%] rounded-full bg-[#2E8B57]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-muted p-4">
                  <Target className="w-4 h-4 text-[#2E8B57] mb-2" />
                  <p className="text-lg font-semibold text-foreground font-mono tabular-nums">Rp 10,5 jt</p>
                  <p className="text-xs text-muted-foreground">Dana darurat</p>
                </div>
                <div className="rounded-2xl bg-[#2E8B57] p-4 text-white">
                  <PiggyBank className="w-4 h-4 mb-2 opacity-90" />
                  <p className="text-lg font-semibold font-mono tabular-nums">Rp 2,1 jt</p>
                  <p className="text-xs opacity-80">{t("common.earned")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}