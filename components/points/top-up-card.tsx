"use client"

import * as React from "react"
import { Coins, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useLanguage } from "@/lib/language-context"
import { getTypeIcon, formatPoints, formatCurrency } from "./data"
import type { TopUpOption } from "@/lib/points-system"

interface TopUpCardProps {
  topUp: TopUpOption
  availablePoints: number
  isDialogOpen: boolean
  onOpenChange: (open: boolean) => void
  onSelect: () => void
  onConfirmTopUp: () => void
}

export function TopUpCard({
  topUp,
  availablePoints,
  isDialogOpen,
  onOpenChange,
  onSelect,
  onConfirmTopUp,
}: TopUpCardProps) {
  const { t } = useLanguage()
  const IconComponent = getTypeIcon(topUp.type)
  const isInsufficient = availablePoints < topUp.pointsCost

  return (
    <Card className="border border-border bg-card rounded-2xl shadow-sm hover:border-primary/40 transition-colors flex flex-col justify-between overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2.5">
          <Badge
            variant="secondary"
            className="text-[11px] font-sans font-medium capitalize bg-muted text-muted-foreground border-border"
          >
            {topUp.type}
          </Badge>
          <div className="flex items-center gap-1.5 text-primary font-mono tabular-nums font-semibold text-xs md:text-sm">
            <Coins className="w-4 h-4" />
            <span>{formatPoints(topUp.pointsCost)}</span>
          </div>
        </div>
        <CardTitle className="text-base md:text-lg flex items-center gap-2 text-foreground font-display font-bold">
          <IconComponent className="w-5 h-5 text-primary flex-shrink-0" />
          <span className="truncate">{topUp.provider}</span>
        </CardTitle>
        <CardDescription className="text-xs md:text-sm text-muted-foreground font-sans truncate">
          {topUp.name}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-xs md:text-sm mb-4">
          <div className="text-primary font-bold text-sm md:text-base font-mono tabular-nums">
            {formatCurrency(topUp.value)}
          </div>
          <div className="text-xs text-muted-foreground font-sans flex items-center gap-1">
            <Zap className="w-3 h-3 text-primary" />
            <span>{t("points.processingTime") || "Proses: 1-24 jam"}</span>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className={`w-full font-medium rounded-xl transition-transform active:-translate-y-px ${
                isInsufficient
                  ? "bg-muted text-muted-foreground hover:bg-muted cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
              }`}
              onClick={onSelect}
              disabled={isInsufficient}
            >
              {isInsufficient
                ? t("points.insufficientPoints") || "Poin Tidak Cukup"
                : t("points.topUp") || "Top-Up"}
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-card border-border text-card-foreground rounded-2xl sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display font-bold text-lg text-foreground">
                {t("points.confirmTopUp") || "Konfirmasi Top-Up"}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground font-sans">
                Tukar {formatPoints(topUp.pointsCost)} poin untuk {topUp.name}?
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              <div className="bg-muted/50 border border-border p-3.5 rounded-xl space-y-2 text-xs md:text-sm font-sans">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Provider:</span>
                  <span className="font-semibold text-foreground">{topUp.provider}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Nominal:</span>
                  <span className="font-mono tabular-nums font-bold text-primary">
                    {formatCurrency(topUp.value)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Waktu Proses:</span>
                  <span className="text-foreground">1-24 jam</span>
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1 rounded-xl border-border hover:bg-muted text-foreground"
                >
                  {t("common.cancel") || "Batal"}
                </Button>
                <Button
                  onClick={onConfirmTopUp}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl"
                >
                  {t("common.submit") || "Konfirmasi"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
