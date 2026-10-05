"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getUserPoints } from "@/lib/points-system"

export default function PointsBanner() {
  const { t } = useLanguage()
  const userPoints = getUserPoints()
  const formatPoints = (points: number) => points.toLocaleString("id-ID")

  return (
    <Card className="bg-gradient-to-r from-[#2E8B57] to-[#236B43] text-white border-0">
      <CardContent className="p-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{t("games.yourPoints")}</h2>
            <div className="text-4xl font-bold mb-2 font-mono tabular-nums">
              {formatPoints(userPoints.availablePoints)}
            </div>
            <p className="text-white/80">{t("common.availableToSpend")}</p>
          </div>
          <Link href="/points-store">
            <Button size="lg" className="bg-white text-[#236B43] hover:bg-white/90">
              <Gift className="w-5 h-5 mr-2" />
              {t("games.visitStore")}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}