"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { TrendingUp, TrendingDown, Target, ArrowLeft, Wallet, CreditCard } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export default function PortfolioPage() {
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 0,
    totalInvestment: 0,
    totalReturn: 0,
    returnPercentage: 0,
    assets: [],
    monthlyPerformance: [],
    assetAllocation: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPortfolioData()
  }, [])

  const loadPortfolioData = async () => {
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setIsLoading(false)
        return
      }

      // Load investment transactions
      const { data: transactions } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .eq("category", "📈 Investasi")
        .order("date", { ascending: false })

      if (transactions) {
        // Calculate portfolio summary
        const totalInvestment = transactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + Number.parseFloat(t.amount), 0)

        const totalDividends = transactions
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + Number.parseFloat(t.amount), 0)

        // Simulate current portfolio value (in real app, this would come from market data)
        const totalValue = totalInvestment * 1.15 + totalDividends // 15% growth simulation
        const totalReturn = totalValue - totalInvestment
        const returnPercentage = totalInvestment > 0 ? (totalReturn / totalInvestment) * 100 : 0

        // Generate asset allocation data
        const assetAllocation = [
          { name: "Saham", value: 60, amount: totalValue * 0.6 },
          { name: "Reksadana", value: 25, amount: totalValue * 0.25 },
          { name: "Obligasi", value: 10, amount: totalValue * 0.1 },
          { name: "Cash", value: 5, amount: totalValue * 0.05 },
        ]

        // Generate monthly performance data
        const monthlyPerformance = [
          { month: "Jan", value: totalInvestment * 0.95 },
          { month: "Feb", value: totalInvestment * 0.98 },
          { month: "Mar", value: totalInvestment * 1.02 },
          { month: "Apr", value: totalInvestment * 1.05 },
          { month: "May", value: totalInvestment * 1.08 },
          { month: "Jun", value: totalInvestment * 1.12 },
          { month: "Jul", value: totalInvestment * 1.1 },
          { month: "Aug", value: totalValue },
        ]

        setPortfolioData({
          totalValue,
          totalInvestment,
          totalReturn,
          returnPercentage,
          assets: transactions,
          monthlyPerformance,
          assetAllocation,
        })
      }
    } catch (error) {
      console.error("Error loading portfolio data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="py-8 px-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/management">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Portfolio Investasi
            </h1>
            <p className="text-gray-700 font-medium">Pantau performa investasi Anda</p>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(portfolioData.totalValue)}</div>
              <div className="flex items-center mt-2">
                <Wallet className="w-4 h-4 mr-1" />
                <span className="text-sm opacity-90">Nilai Saat Ini</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Investasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(portfolioData.totalInvestment)}</div>
              <div className="flex items-center mt-2">
                <CreditCard className="w-4 h-4 mr-1" />
                <span className="text-sm opacity-90">Modal Awal</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Return</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(portfolioData.totalReturn)}</div>
              <div className="flex items-center mt-2">
                {portfolioData.totalReturn >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                <span className="text-sm opacity-90">Keuntungan</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Return %</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {portfolioData.returnPercentage >= 0 ? "+" : ""}
                {portfolioData.returnPercentage.toFixed(2)}%
              </div>
              <div className="flex items-center mt-2">
                <Target className="w-4 h-4 mr-1" />
                <span className="text-sm opacity-90">Persentase</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analysis */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="performance">Performa</TabsTrigger>
            <TabsTrigger value="allocation">Alokasi Aset</TabsTrigger>
            <TabsTrigger value="transactions">Transaksi</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performa Portfolio Bulanan</CardTitle>
                <CardDescription>Perkembangan nilai portfolio dalam 8 bulan terakhir</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={portfolioData.monthlyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip formatter={(value) => [formatCurrency(value), "Nilai Portfolio"]} />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alokasi Aset</CardTitle>
                  <CardDescription>Distribusi investasi berdasarkan jenis aset</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={portfolioData.assetAllocation}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name} ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {portfolioData.assetAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Detail Alokasi</CardTitle>
                  <CardDescription>Nilai investasi per kategori aset</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {portfolioData.assetAllocation.map((asset, index) => (
                    <div key={asset.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium">{asset.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(asset.amount)}</div>
                        <div className="text-sm text-gray-500">{asset.value}%</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Transaksi Investasi</CardTitle>
                <CardDescription>Semua transaksi investasi Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData.assets.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            transaction.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                          }`}
                        >
                          {transaction.type === "income" ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString("id-ID")}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
