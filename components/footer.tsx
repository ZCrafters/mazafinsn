"use client"

import Link from "next/link"
import { PiggyBank } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="bg-background border-t border-border py-14">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#2E8B57] flex items-center justify-center mr-3">
                <PiggyBank className="text-white" size={16} />
              </div>
              <h3 className="text-lg font-bold text-foreground font-display">MAZA FINANCE</h3>
            </div>
            <p className="text-muted-foreground max-w-xs mb-6">{t("footer.tagline")}</p>
            <div className="flex space-x-5 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">
                Instagram
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                TikTok
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Twitter
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold text-foreground mb-4">{t("footer.features")}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  {t("footer.expenseTracking")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  {t("footer.aiAssistant")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  {t("footer.investmentGames")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  {t("footer.financialProjections")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold text-foreground mb-4">{t("footer.resources")}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  {t("footer.blog")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  {t("footer.tutorials")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  {t("footer.financialTips")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  {t("footer.helpCenter")}
                </Link>
              </li>
            </ul>
          </div>

          {/* App */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold text-foreground mb-4">{t("footer.download")}</h4>
            <p className="text-sm text-muted-foreground mb-4">{t("footer.getApp")}</p>
            <div className="flex flex-col space-y-2">
              <button className="bg-muted hover:bg-accent px-4 py-2 rounded-lg text-left text-sm font-medium text-foreground transition-colors">
                {t("footer.appStore")}
              </button>
              <button className="bg-muted hover:bg-accent px-4 py-2 rounded-lg text-left text-sm font-medium text-foreground transition-colors">
                {t("footer.playStore")}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>{t("footer.copyright")}</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}