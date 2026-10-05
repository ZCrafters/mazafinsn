"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Smartphone, CreditCard, Zap } from "lucide-react";
import { useState } from "react";

export default function QRPayment() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const quickAmounts = [50000, 100000, 250000, 500000];

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return (
    <section className="py-16 px-4 bg-muted/60">
      <div className="max-w-4xl mx-auto">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-medium uppercase tracking-widest text-[#2E8B57] dark:text-[#85a37a] mb-3 block">
            Pembayaran
          </span>
          <h2 className="text-3xl font-bold text-foreground font-display tracking-tight mb-3">
            Pembayaran QR Code
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Terima pembayaran dengan mudah menggunakan QR Code. Cepat, aman, dan praktis untuk bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* QR Code Generator */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <QrCode className="w-5 h-5 text-[#2E8B57]" />
                Generate QR Code
              </CardTitle>
              <CardDescription>Buat QR Code untuk menerima pembayaran</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-foreground">
                  Jumlah Pembayaran
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Masukkan jumlah"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(quickAmount.toString())}
                    className="text-muted-foreground hover:text-foreground font-mono tabular-nums"
                  >
                    {formatCurrency(quickAmount)}
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground">
                  Deskripsi (Opsional)
                </Label>
                <Input
                  id="description"
                  placeholder="Contoh: Pembayaran produk"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <Button className="w-full bg-[#2E8B57] hover:bg-[#236B43] text-white">
                <QrCode className="w-4 h-4 mr-2" />
                Generate QR Code
              </Button>
            </CardContent>
          </Card>

          {/* QR Code Display */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">QR Code Anda</CardTitle>
              <CardDescription>Show QR Code ini kepada pelanggan</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="w-48 h-48 mx-auto bg-muted border border-border rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <QrCode className="w-16 h-16 mx-auto mb-2" />
                  <p className="text-sm">QR Code akan muncul di sini</p>
                </div>
              </div>

              {amount && (
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-foreground font-mono tabular-nums">
                    {formatCurrency(Number.parseInt(amount) || 0)}
                  </p>
                  {description && <p className="text-muted-foreground">{description}</p>}
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 text-muted-foreground hover:text-foreground">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="flex-1 text-muted-foreground hover:text-foreground">
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center border-border bg-card">
            <CardContent className="p-6">
              <Zap className="w-8 h-8 text-[#2E8B57] mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Instan</h3>
              <p className="text-sm text-muted-foreground">Pembayaran langsung masuk ke rekening Anda</p>
            </CardContent>
          </Card>

          <Card className="text-center border-border bg-card">
            <CardContent className="p-6">
              <CreditCard className="w-8 h-8 text-[#2E8B57] mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Aman</h3>
              <p className="text-sm text-muted-foreground">Dilindungi dengan enkripsi bank-grade</p>
            </CardContent>
          </Card>

          <Card className="text-center border-border bg-card">
            <CardContent className="p-6">
              <Smartphone className="w-8 h-8 text-[#2E8B57] mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Mudah</h3>
              <p className="text-sm text-muted-foreground">Tidak perlu cash atau kartu fisik</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}