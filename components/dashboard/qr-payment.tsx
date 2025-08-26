"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QrCode, Smartphone, CreditCard, Zap } from "lucide-react"
import { useState } from "react"

export default function QRPayment() {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")

  const quickAmounts = [50000, 100000, 250000, 500000]

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pembayaran QR Code</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Terima pembayaran dengan mudah menggunakan QR Code. Cepat, aman, dan praktis untuk bisnis Anda
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QR Code Generator */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-blue-600" />
                Generate QR Code
              </CardTitle>
              <CardDescription>Buat QR Code untuk menerima pembayaran</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Jumlah Pembayaran</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Masukkan jumlah"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(quickAmount.toString())}
                    className="text-sm"
                  >
                    {formatCurrency(quickAmount)}
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi (Opsional)</Label>
                <Input
                  id="description"
                  placeholder="Contoh: Pembayaran produk"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <QrCode className="w-4 h-4 mr-2" />
                Generate QR Code
              </Button>
            </CardContent>
          </Card>

          {/* QR Code Display */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>QR Code Anda</CardTitle>
              <CardDescription>Tunjukkan QR Code ini kepada pelanggan</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <QrCode className="w-16 h-16 mx-auto mb-2" />
                  <p className="text-sm">QR Code akan muncul di sini</p>
                </div>
              </div>

              {amount && (
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(Number.parseInt(amount) || 0)}</p>
                  {description && <p className="text-gray-600">{description}</p>}
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center border-0 shadow-md">
            <CardContent className="p-6">
              <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Instan</h3>
              <p className="text-sm text-gray-600">Pembayaran langsung masuk ke rekening Anda</p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-md">
            <CardContent className="p-6">
              <CreditCard className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Aman</h3>
              <p className="text-sm text-gray-600">Dilindungi dengan enkripsi bank-grade</p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-md">
            <CardContent className="p-6">
              <Smartphone className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Mudah</h3>
              <p className="text-sm text-gray-600">Tidak perlu cash atau kartu fisik</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
