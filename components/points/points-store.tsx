"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Gift } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import {
  getUserPoints,
  getAvailableVouchers,
  getTopUpOptions,
  purchaseVoucher,
  purchaseTopUp,
  getUserVouchers,
  type Voucher,
  type TopUpOption,
  type UserVoucher,
} from "@/lib/points-system"
import { PointsBalanceCard } from "./points-balance-card"
import { VoucherCard } from "./voucher-card"
import { TopUpCard } from "./top-up-card"
import { UserVoucherCard } from "./user-voucher-card"

export default function PointsStore() {
  const { t } = useLanguage()
  const [userPoints, setUserPoints] = useState(getUserPoints())
  const [vouchers] = useState(getAvailableVouchers())
  const [topUpOptions] = useState(getTopUpOptions())
  const [userVouchers, setUserVouchers] = useState<UserVoucher[]>([])
  const [selectedItem, setSelectedItem] = useState<Voucher | TopUpOption | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    setUserVouchers(getUserVouchers())
  }, [])

  const handlePurchaseVoucher = (voucher: Voucher) => {
    if (userPoints.availablePoints < voucher.pointsCost) {
      toast({
        title: t("points.insufficientPoints") || "Poin Tidak Cukup",
        description: `Anda membutuhkan ${
          voucher.pointsCost - userPoints.availablePoints
        } poin lagi untuk membeli voucher ini.`,
        variant: "destructive",
      })
      return
    }

    const success = purchaseVoucher(voucher.id)
    if (success) {
      setUserPoints(getUserPoints())
      setUserVouchers(getUserVouchers())
      setIsDialogOpen(false)
      toast({
        title: "Voucher Berhasil Dibeli!",
        description: `${voucher.title} telah ditambahkan ke koleksi Anda.`,
      })
    } else {
      toast({
        title: "Pembelian Gagal",
        description: "Gagal membeli voucher. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  const handlePurchaseTopUp = (topUp: TopUpOption) => {
    if (userPoints.availablePoints < topUp.pointsCost) {
      toast({
        title: t("points.insufficientPoints") || "Poin Tidak Cukup",
        description: `Anda membutuhkan ${
          topUp.pointsCost - userPoints.availablePoints
        } poin lagi untuk melakukan top-up ini.`,
        variant: "destructive",
      })
      return
    }

    const success = purchaseTopUp(topUp.id)
    if (success) {
      setUserPoints(getUserPoints())
      setIsDialogOpen(false)
      toast({
        title: "Top-Up Berhasil Diajukan!",
        description: `${topUp.name} akan diproses dalam waktu 1-24 jam.`,
      })
    } else {
      toast({
        title: "Top-Up Gagal",
        description: "Gagal memproses top-up. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-8">
      {/* Points Balance Banner */}
      <PointsBalanceCard
        availablePoints={userPoints.availablePoints}
        lifetimeEarned={userPoints.lifetimeEarned}
      />

      {/* Store Tabs */}
      <Tabs defaultValue="vouchers" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted p-1 rounded-xl h-auto">
          <TabsTrigger
            value="vouchers"
            className="py-2.5 rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground font-sans font-medium text-xs md:text-sm"
          >
            {t("points.vouchers") || "Voucher"}
          </TabsTrigger>
          <TabsTrigger
            value="topup"
            className="py-2.5 rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground font-sans font-medium text-xs md:text-sm"
          >
            {t("points.topUp") || "Top-Up"}
          </TabsTrigger>
          <TabsTrigger
            value="my-vouchers"
            className="py-2.5 rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground font-sans font-medium text-xs md:text-sm"
          >
            {t("points.myVouchers") || "Voucher Saya"}
          </TabsTrigger>
        </TabsList>

        {/* Vouchers Catalog */}
        <TabsContent value="vouchers" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {vouchers.map((voucher) => (
              <VoucherCard
                key={voucher.id}
                voucher={voucher}
                availablePoints={userPoints.availablePoints}
                isDialogOpen={isDialogOpen && selectedItem?.id === voucher.id}
                onOpenChange={setIsDialogOpen}
                onSelect={() => setSelectedItem(voucher)}
                onConfirmPurchase={() => handlePurchaseVoucher(voucher)}
              />
            ))}
          </div>
        </TabsContent>

        {/* Top-Up Options */}
        <TabsContent value="topup" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topUpOptions.map((topUp) => (
              <TopUpCard
                key={topUp.id}
                topUp={topUp}
                availablePoints={userPoints.availablePoints}
                isDialogOpen={isDialogOpen && selectedItem?.id === topUp.id}
                onOpenChange={setIsDialogOpen}
                onSelect={() => setSelectedItem(topUp)}
                onConfirmTopUp={() => handlePurchaseTopUp(topUp)}
              />
            ))}
          </div>
        </TabsContent>

        {/* User Owned Vouchers */}
        <TabsContent value="my-vouchers" className="pt-4">
          {userVouchers.length === 0 ? (
            <Card className="text-center py-12 border border-border bg-card rounded-2xl shadow-sm">
              <CardContent className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 text-primary mx-auto flex items-center justify-center">
                  <Gift className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-display font-bold text-foreground">
                  {t("points.noVouchers") || "Belum Ada Voucher"}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground font-sans max-w-sm mx-auto">
                  {t("points.noVouchersDesc") || "Beli voucher untuk melihatnya di sini"}
                </p>
                <div className="pt-2">
                  <Button
                    onClick={() => {
                      const vouchersTab = document.querySelector(
                        '[value="vouchers"]'
                      ) as HTMLElement
                      vouchersTab?.click()
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl"
                  >
                    {t("points.browseVouchers") || "Jelajahi Voucher"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {userVouchers.map((userVoucher) => {
                const matchedVoucher = vouchers.find(
                  (v) => v.id === userVoucher.voucherId
                )
                return (
                  <UserVoucherCard
                    key={userVoucher.id}
                    userVoucher={userVoucher}
                    voucher={matchedVoucher}
                  />
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
