"use client"

import * as React from "react"
import { Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import { getTypeIcon } from "./data"
import type { UserVoucher, Voucher } from "@/lib/points-system"

interface UserVoucherCardProps {
  userVoucher: UserVoucher
  voucher?: Voucher
}

export function UserVoucherCard({ userVoucher, voucher }: UserVoucherCardProps) {
  const { t } = useLanguage()
  if (!voucher) return null

  const IconComponent = getTypeIcon(voucher.type)
  const isExpired = new Date(userVoucher.expiryDate) < new Date()
  const daysLeft = Math.ceil(
    (new Date(userVoucher.expiryDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  )

  return (
    <Card
      className={`border border-border bg-card rounded-2xl shadow-sm flex flex-col justify-between overflow-hidden transition-opacity ${
        userVoucher.isUsed ? "opacity-60" : isExpired ? "opacity-40" : ""
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2.5">
          <Badge
            variant="secondary"
            className="text-[11px] font-sans font-medium bg-muted text-muted-foreground border-border"
          >
            {voucher.category}
          </Badge>
          {userVoucher.isUsed ? (
            <Badge
              variant="outline"
              className="bg-muted text-muted-foreground border-border text-[10px] font-sans flex items-center gap-1"
            >
              <CheckCircle className="w-3 h-3 text-primary" />
              <span>{t("points.used") || "Sudah Dipakai"}</span>
            </Badge>
          ) : isExpired ? (
            <Badge
              variant="destructive"
              className="text-[10px] font-sans flex items-center gap-1 bg-destructive/10 text-destructive border border-destructive/20"
            >
              <AlertCircle className="w-3 h-3" />
              <span>{t("points.expired") || "Kedaluwarsa"}</span>
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20 text-[10px] font-mono tabular-nums flex items-center gap-1"
            >
              <Clock className="w-3 h-3" />
              <span>
                {daysLeft} {t("points.daysLeft") || "hari tersisa"}
              </span>
            </Badge>
          )}
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
        <div className="text-xs text-muted-foreground mb-4 space-y-1 font-sans">
          <div className="flex justify-between">
            <span>Dibeli:</span>
            <span className="font-mono tabular-nums text-foreground">
              {new Date(userVoucher.purchaseDate).toLocaleDateString("id-ID")}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Kedaluwarsa:</span>
            <span className="font-mono tabular-nums text-foreground">
              {new Date(userVoucher.expiryDate).toLocaleDateString("id-ID")}
            </span>
          </div>
          {userVoucher.isUsed && userVoucher.usedDate && (
            <div className="flex justify-between">
              <span>Digunakan:</span>
              <span className="font-mono tabular-nums text-foreground">
                {new Date(userVoucher.usedDate).toLocaleDateString("id-ID")}
              </span>
            </div>
          )}
        </div>

        <Button
          size="sm"
          className="w-full font-medium rounded-xl"
          disabled={userVoucher.isUsed || isExpired}
          variant={userVoucher.isUsed || isExpired ? "outline" : "default"}
        >
          {userVoucher.isUsed
            ? t("points.alreadyUsed") || "Sudah Digunakan"
            : isExpired
            ? t("points.expired") || "Kedaluwarsa"
            : t("points.useVoucher") || "Gunakan Voucher"}
        </Button>
      </CardContent>
    </Card>
  )
}
