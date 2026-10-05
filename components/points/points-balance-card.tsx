"use client"

import * as React from "react"
import { Coins } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { formatPoints } from "./data"

interface PointsBalanceCardProps {
  availablePoints: number
  lifetimeEarned: number
}

export function PointsBalanceCard({
  availablePoints,
  lifetimeEarned,
}: PointsBalanceCardProps) {
  const { t } = useLanguage()

  return (
    <Card className="bg-gradient-to-r from-[#2E8B57] to-[#236B43] text-white border-0 shadow-sm rounded-2xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-sans mb-1">
              {t("points.available") || "Poin Tersedia"}
            </p>
            <div className="text-3xl md:text-4xl font-bold font-mono tabular-nums">
              {formatPoints(availablePoints)}
            </div>
          </div>
          <div className="text-right flex items-center gap-4">
            <div>
              <p className="text-white/75 text-xs md:text-sm font-sans mb-0.5">
                {t("common.lifetime") || "Akumulasi"}
              </p>
              <p className="text-lg md:text-xl font-semibold font-mono tabular-nums text-white/90">
                {formatPoints(lifetimeEarned)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white/90 flex-shrink-0">
              <Coins className="w-6 h-6" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
