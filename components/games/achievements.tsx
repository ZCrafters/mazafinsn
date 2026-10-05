"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Trophy, Coins, Star } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { achievements } from "./data"

const ICONS = { target: Target, trophy: Trophy, coins: Coins, star: Star }

export default function Achievements() {
  const { t } = useLanguage()

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-foreground font-display tracking-tight mb-8">{t("games.achievements")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((achievement, index) => {
          const IconComponent = ICONS[achievement.icon]
          return (
            <Card
              key={index}
              className={`text-center border-0 shadow-md ${
                achievement.earned
                  ? "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30"
                  : "bg-card border border-border"
              }`}
            >
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                    achievement.earned ? "bg-amber-100 dark:bg-amber-900/50" : "bg-muted"
                  }`}
                >
                  <IconComponent
                    className={`w-6 h-6 ${
                      achievement.earned ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"
                    }`}
                  />
                </div>
                <h3
                  className={`font-semibold mb-1 ${
                    achievement.earned ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {t(achievement.titleKey)}
                </h3>
                <p className={`text-xs ${achievement.earned ? "text-muted-foreground" : "text-muted-foreground/70"}`}>
                  {t(achievement.descriptionKey)}
                </p>
                {achievement.earned && (
                  <Badge className="mt-2 bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 text-xs">
                    {t("games.done")}
                  </Badge>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}