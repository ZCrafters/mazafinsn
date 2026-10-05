"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Gamepad2, Trophy, Target } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getUserPoints, getPointsAnalytics } from "@/lib/points-system"

export default function GameStats() {
  const { t } = useLanguage()
  const userPoints = getUserPoints()
  const analytics = getPointsAnalytics()
  const formatPoints = (points: number) => points.toLocaleString("id-ID")

  return (
    <Card className="bg-gradient-to-r from-[#2E8B57] to-[#236B43] text-white border-0">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <Gamepad2 className="w-8 h-8 mx-auto mb-2" />
            <div className="text-3xl font-bold mb-1 font-mono tabular-nums">
              {analytics ? Math.floor(analytics.totalEarned / analytics.averagePerGame) || 0 : 12}
            </div>
            <div className="text-white/80">{t("common.gamesPlayed")}</div>
          </div>
          <div>
            <Trophy className="w-8 h-8 mx-auto mb-2" />
            <div className="text-3xl font-bold mb-1 font-mono tabular-nums">{formatPoints(userPoints.lifetimeEarned)}</div>
            <div className="text-white/80">{t("common.pointsCollected")}</div>
          </div>
          <div>
            <Target className="w-8 h-8 mx-auto mb-2" />
            <div className="text-3xl font-bold mb-1 font-mono tabular-nums">
              {Math.floor(userPoints.lifetimeEarned / 1000)}
            </div>
            <div className="text-white/80">{t("common.milestonesReached")}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}