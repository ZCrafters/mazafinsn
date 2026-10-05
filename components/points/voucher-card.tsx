"use client"

import * as React from "react"
import { Coins, Clock } from "lucide-react"
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
import type { Voucher } from "@/lib/points-system"

interface VoucherCardProps {
  voucher: Voucher
  availablePoints: number
  isDialogOpen: boolean
  onOpenChange: (open: boolean) => void
  onSelect: () => void
  onConfirmPurchase: () => void
}

export function VoucherCard({
  voucher,
  availablePoints,
  isDialogOpen,
  onOpenChange,
  onSelect,
  onConfirmPurchase,
}: VoucherCardProps) {
  const { t } = useLanguage()
  const IconComponent = getTypeIcon(voucher.type)
  const isInsufficient = availablePoints < voucher.pointsCost

  return (
    <Card className="border border-border bg-card rounded-2xl shadow-sm hover:border-primary/40 transition-colors flex flex-col justify-between overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2.5">
          <Badge
            variant="secondary"
            className="text-[11px] font-sans font-medium bg-muted text-muted-foreground border-border"
          >
            {voucher.category}
          </Badge>
          <div className="flex items-center gap-1.5 text-primary font-mono tabular-nums font-semibold text-xs md:text-sm">
            <Coins className="w-4 h-4" />
            <span>{formatPoints(voucher.pointsCost)}</span>
          </div>
        </div>
        <CardTitle className="text-base md:text-lg flex items-center gap-2 text-foreground font-display font-bold">
          <IconComponent className="w-5 h-5 text-primary flex-shrink-0" />
          <span className="truncate">{voucher.title}</span>
        </CardTitle>
        <CardDescription className="text-xs md:text-sm text-muted-foreground font-sans line-clamp-2">
          {voucher.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1 font-sans">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-mono tabular-nums">{voucher.expiryDays}</span>
            <span>{t("points.validity") || "hari masa berlaku"}</span>
          </div>
          <div className="text-primary font-bold text-sm md:text-base font-mono tabular-nums">
            {voucher.type === "discount"
              ? `${voucher.value}% OFF`
              : formatCurrency(voucher.value)}
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
                : t("points.purchase") || "Beli Voucher"}
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-card border-border text-card-foreground rounded-2xl sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display font-bold text-lg text-foreground">
                {t("points.confirmPurchase") || "Konfirmasi Pembelian"}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground font-sans">
                Apakah Anda yakin ingin menukar {voucher.title} seharga{" "}
                <strong className="font-mono tabular-nums text-foreground">
                  {formatPoints(voucher.pointsCost)} poin
                </strong>
                ?
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              {voucher.terms && voucher.terms.length > 0 && (
                <div className="bg-muted/50 border border-border p-3.5 rounded-xl">
                  <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider mb-2">
                    Syarat & Ketentuan:
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1.5 font-sans">
                    {voucher.terms.map((term, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-2.5 pt-2">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1 rounded-xl border-border hover:bg-muted text-foreground"
                >
                  {t("common.cancel") || "Batal"}
                </Button>
                <Button
                  onClick={onConfirmPurchase}
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
