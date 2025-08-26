"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, Calendar, DollarSign, Target } from "lucide-react"

const projections = [
  {
    title: "Emergency Fund",
    current: 15000000,
    target: 50000000,
    progress: 30,
    timeframe: "12 bulan",
    monthlyContribution: 2900000,
  },
  {
    title: "Investasi Saham",
    current: 25000000,
    target: 100000000,
    progress: 25,
    timeframe: "24 bulan",
    monthlyContribution: 3100000,
  },
  {
    title: "Dana Pensiun",
    current: 75000000,
    target: 500000000,
    progress: 15,
    timeframe: "120 bulan",
    monthlyContribution: 3500000,
  },
]

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function DashboardProjections() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Proyeksi Keuangan Anda</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lihat bagaimana investasi dan tabungan Anda akan berkembang dengan perencanaan yang tepat
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {projections.map((projection, index) => (
            <Card key={index} className="card-hover border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">{projection.title}</CardTitle>
                  <Target className="w-5 h-5 text-sage-600" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">{projection.progress}%</span>
                  </div>
                  <Progress value={projection.progress} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Saat ini</span>
                    <span className="font-medium text-gray-900">{formatCurrency(projection.current)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Target</span>
                    <span className="font-medium text-sage-600">{formatCurrency(projection.target)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Per bulan</span>
                    <span className="font-medium text-blue-600">{formatCurrency(projection.monthlyContribution)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Estimasi: {projection.timeframe}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-sage-600 to-sage-700 text-white border-0">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Total Proyeksi Kekayaan</h3>
                <p className="text-sage-100 mb-4">Dalam 10 tahun dengan konsistensi investasi</p>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-6 h-6" />
                  <span className="text-3xl font-bold">{formatCurrency(1200000000)}</span>
                  <ArrowUpRight className="w-6 h-6 text-green-300" />
                </div>
              </div>
              <div className="text-right">
                <Button variant="secondary" size="lg" className="bg-white text-sage-700 hover:bg-gray-100">
                  Lihat Detail
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
