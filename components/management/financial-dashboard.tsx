"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChartIcon,
  Target,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
  Banknote,
  Eye,
  Plus,
  Brain,
  AlertTriangle,
  TrendingUpIcon,
  BarChart3,
  Loader2,
} from "lucide-react"

const initialFinancialData = {
  totalBalance: 0,
  monthlyIncome: 0,
  monthlyExpenses: 0,
  savings: 0,
  investments: 0,
  debts: 0,
  savingsGoal: 0,
}

const initialBudgetCategories: Array<{ name: string; budget: number; spent: number; color: string }> = []

const initialRecentTransactions: Array<{
  id: number
  type: string
  description: string
  amount: number
  date: string
  category: string
}> = []

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount))
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  })
}

async function analyzeFinancialData(financialData: any, budgetCategories: any[], transactions: any[]) {
  try {
    const response = await fetch("/api/analyze-portfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        financialData,
        budgetCategories,
        transactions,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to analyze data")
    }

    return await response.json()
  } catch (error) {
    console.error("Error analyzing financial data:", error)
    return {
      insights: ["Tidak dapat menganalisis data saat ini. Silakan coba lagi nanti."],
      warnings: [],
      recommendations: ["Pastikan semua data keuangan telah diinput dengan benar."],
    }
  }
}

export default function FinancialDashboard() {
  const [financialData, setFinancialData] = useState(initialFinancialData)
  const [budgetCategories, setBudgetCategories] = useState(initialBudgetCategories)
  const [recentTransactions, setRecentTransactions] = useState(initialRecentTransactions)
  const [isManualInputOpen, setIsManualInputOpen] = useState(false)
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
  const [isBudgetOpen, setIsBudgetOpen] = useState(false)
  const [isAIAnalysisOpen, setIsAIAnalysisOpen] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isProjectionOpen, setIsProjectionOpen] = useState(false)

  const [inputData, setInputData] = useState(financialData)
  const [newTransaction, setNewTransaction] = useState({
    type: "expense",
    description: "",
    amount: 0,
    category: "",
  })
  const [newBudget, setNewBudget] = useState({
    name: "",
    budget: 0,
  })

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true)
    setIsAIAnalysisOpen(true)

    const analysis = await analyzeFinancialData(financialData, budgetCategories, recentTransactions)
    setAiAnalysis(analysis)
    setIsAnalyzing(false)
  }

  const generateProjectionData = () => {
    const currentYear = new Date().getFullYear()
    const monthlyNetIncome = financialData.monthlyIncome - financialData.monthlyExpenses
    const annualNetIncome = monthlyNetIncome * 12

    return Array.from({ length: 5 }, (_, i) => ({
      year: currentYear + i,
      balance: financialData.totalBalance + annualNetIncome * i,
      investments: financialData.investments * Math.pow(1.08, i), // 8% annual growth
      savings: financialData.savings + monthlyNetIncome * 12 * i * 0.3, // 30% of net income saved
    }))
  }

  const projectionData = generateProjectionData()

  useEffect(() => {
    const handleManualInput = () => {
      setInputData(financialData)
      setIsManualInputOpen(true)
    }

    const handleResetDialog = () => {
      setIsResetDialogOpen(true)
    }

    window.addEventListener("openManualInput", handleManualInput)
    window.addEventListener("openResetDialog", handleResetDialog)

    return () => {
      window.removeEventListener("openManualInput", handleManualInput)
      window.removeEventListener("openResetDialog", handleResetDialog)
    }
  }, [financialData])

  const handleSaveManualInput = () => {
    setFinancialData(inputData)
    setIsManualInputOpen(false)
  }

  const handleResetAllData = () => {
    setFinancialData(initialFinancialData)
    setBudgetCategories(initialBudgetCategories)
    setRecentTransactions(initialRecentTransactions)
    setIsResetDialogOpen(false)
  }

  const handleAddTransaction = () => {
    const transaction = {
      id: Date.now(),
      type: newTransaction.type,
      description: newTransaction.description,
      amount: newTransaction.type === "income" ? newTransaction.amount : -newTransaction.amount,
      date: new Date().toISOString().split("T")[0],
      category: newTransaction.category,
    }

    setRecentTransactions([transaction, ...recentTransactions])

    // Update budget categories if transaction is an expense and matches a category
    if (newTransaction.type === "expense" && newTransaction.category) {
      setBudgetCategories((prev) =>
        prev.map((budget) =>
          budget.name.toLowerCase() === newTransaction.category.toLowerCase()
            ? { ...budget, spent: budget.spent + newTransaction.amount }
            : budget,
        ),
      )

      // Update monthly expenses in financial data
      setFinancialData((prev) => ({
        ...prev,
        monthlyExpenses: prev.monthlyExpenses + newTransaction.amount,
      }))
    } else if (newTransaction.type === "income") {
      // Update monthly income in financial data
      setFinancialData((prev) => ({
        ...prev,
        monthlyIncome: prev.monthlyIncome + newTransaction.amount,
        totalBalance: prev.totalBalance + newTransaction.amount,
      }))
    }

    setNewTransaction({ type: "expense", description: "", amount: 0, category: "" })
    setIsAddTransactionOpen(false)
  }

  const handleAddBudget = () => {
    const budget = {
      name: newBudget.name,
      budget: newBudget.budget,
      spent: 0,
      color: "bg-[#2E8B57]",
    }
    setBudgetCategories([...budgetCategories, budget])
    setNewBudget({ name: "", budget: 0 })
    setIsBudgetOpen(false)
  }

  const handleResetBudgets = () => {
    setBudgetCategories((prev) => prev.map((budget) => ({ ...budget, spent: 0 })))
  }

  const netWorth = financialData.totalBalance + financialData.investments - financialData.debts
  const savingsRate = financialData.monthlyIncome > 0 ? (financialData.savings / financialData.monthlyIncome) * 100 : 0
  const goalProgress = financialData.savingsGoal > 0 ? (financialData.savings / financialData.savingsGoal) * 100 : 0

  const getTextColor = (bgColor: string) => {
    // For gradient backgrounds, use white text
    if (
      bgColor.includes("gradient") ||
      bgColor.includes("blue") ||
      bgColor.includes("green") ||
      bgColor.includes("red") ||
      bgColor.includes("purple")
    ) {
      return "text-white"
    }
    // For light backgrounds, use dark text
    return "text-gray-900"
  }

  return (
    <div className="py-8 px-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#2E8B57] to-[#1e5f3f] bg-clip-text text-transparent mb-2">
            Dashboard Keuangan
          </h1>
          <p className="text-gray-700 font-medium">Kelola dan pantau keuangan Anda dengan mudah</p>
        </div>

        {/* AI Analysis Button */}
        <div className="mb-6">
          <Button
            onClick={handleAIAnalysis}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
          >
            <Brain className="w-4 h-4 mr-2" />
            Analisis AI Portfolio
          </Button>
          <Button
            onClick={() => setIsProjectionOpen(true)}
            variant="outline"
            className="ml-3 border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white font-semibold transform hover:scale-105 transition-all duration-300"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Proyeksi 5 Tahun
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 mb-1 text-sm font-medium">Total Saldo</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(financialData.totalBalance)}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-[#2E8B57] to-[#1e5f3f] text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 mb-1 text-sm font-medium">Pendapatan Bulan Ini</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(financialData.monthlyIncome)}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-red-500 to-red-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 mb-1 text-sm font-medium">Pengeluaran Bulan Ini</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(financialData.monthlyExpenses)}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 mb-1 text-sm font-medium">Net Worth</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(netWorth)}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Budget Tracking */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl mb-8 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-[#2E8B57]/10 to-[#1e5f3f]/10 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#2E8B57] to-[#1e5f3f] rounded-lg flex items-center justify-center">
                    <PieChartIcon className="w-4 h-4 text-white" />
                  </div>
                  Budget Tracking
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Pantau pengeluaran Anda berdasarkan kategori
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {budgetCategories.length === 0 ? (
                  <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#2E8B57] to-[#1e5f3f] rounded-full flex items-center justify-center mx-auto mb-4">
                      <PieChartIcon className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-600 mb-4 font-medium">Belum ada kategori budget</p>
                    <Button
                      onClick={() => setIsBudgetOpen(true)}
                      className="bg-gradient-to-r from-[#2E8B57] to-[#1e5f3f] hover:from-[#236B43] hover:to-[#1a4d33] text-white shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Budget
                    </Button>
                  </div>
                ) : (
                  budgetCategories.map((category, index) => {
                    const percentage = (category.spent / category.budget) * 100
                    const isOverBudget = percentage > 100

                    return (
                      <div
                        key={index}
                        className="space-y-3 p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-900">{category.name}</span>
                          <div className="text-right">
                            <span className={`font-bold text-lg ${isOverBudget ? "text-red-600" : "text-gray-900"}`}>
                              {formatCurrency(category.spent)}
                            </span>
                            <span className="text-gray-500 text-sm"> / {formatCurrency(category.budget)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={Math.min(percentage, 100)} className="flex-1 h-3" />
                          <Badge
                            variant={isOverBudget ? "destructive" : "secondary"}
                            className={`text-xs font-semibold ${!isOverBudget ? "bg-[#2E8B57]/10 text-[#2E8B57]" : ""}`}
                          >
                            {percentage.toFixed(0)}%
                          </Badge>
                        </div>
                      </div>
                    )
                  })
                )}
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-white" />
                  </div>
                  Transaksi Terbaru
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentTransactions.length === 0 ? (
                    <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CreditCard className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-gray-600 mb-4 font-medium">Belum ada transaksi</p>
                      <Button
                        onClick={() => setIsAddTransactionOpen(true)}
                        className="bg-gradient-to-r from-[#2E8B57] to-[#1e5f3f] hover:from-[#236B43] hover:to-[#1a4d33] text-white shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Transaksi
                      </Button>
                    </div>
                  ) : (
                    recentTransactions.slice(0, 5).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white to-gray-50 border border-gray-200 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              transaction.type === "income"
                                ? "bg-gradient-to-br from-[#2E8B57] to-[#1e5f3f]"
                                : "bg-gradient-to-br from-red-500 to-red-600"
                            }`}
                          >
                            {transaction.type === "income" ? (
                              <ArrowUpRight className="w-6 h-6 text-white" />
                            ) : (
                              <ArrowDownRight className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{transaction.description}</p>
                            <p className="text-sm text-gray-600 font-medium">{transaction.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-bold text-lg ${transaction.type === "income" ? "text-[#2E8B57]" : "text-red-600"}`}
                          >
                            {transaction.type === "income" ? "+" : ""}
                            {formatCurrency(transaction.amount)}
                          </p>
                          <p className="text-sm text-gray-600 font-medium">{formatDate(transaction.date)}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-6 bg-gradient-to-r from-white to-gray-50 border-2 border-[#2E8B57] text-[#2E8B57] hover:bg-gradient-to-r hover:from-[#2E8B57] hover:to-[#1e5f3f] hover:text-white font-semibold transform hover:scale-105 transition-all duration-300"
                  onClick={() => setIsAddTransactionOpen(true)}
                >
                  {recentTransactions.length === 0 ? "Tambah Transaksi Pertama" : "Lihat Semua Transaksi"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Savings Rate & Goal */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-[#2E8B57]/10 to-[#1e5f3f]/10 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#2E8B57] to-[#1e5f3f] rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  Target Tabungan
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#2E8B57] to-[#1e5f3f] bg-clip-text text-transparent mb-2">
                    {savingsRate.toFixed(1)}%
                  </div>
                  <p className="text-sm text-gray-600 font-medium">tingkat tabungan bulanan</p>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-3 font-medium">
                    <span>Progress Target</span>
                    <span>{goalProgress.toFixed(1)}%</span>
                  </div>
                  <Progress value={goalProgress} className="mb-3 h-3" />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium">Saat ini: {formatCurrency(financialData.savings)}</span>
                    <span className="text-[#2E8B57] font-bold">
                      Target: {formatCurrency(financialData.savingsGoal)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-t-lg">
                <CardTitle className="text-gray-900">Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <Button
                  className="w-full bg-gradient-to-r from-[#2E8B57] to-[#1e5f3f] hover:from-[#236B43] hover:to-[#1a4d33] text-white shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
                  onClick={() => setIsAddTransactionOpen(true)}
                >
                  <Banknote className="w-4 h-4 mr-2" />
                  Tambah Transaksi
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-gradient-to-r from-white to-gray-50 border-2 border-[#2E8B57] text-[#2E8B57] hover:bg-gradient-to-r hover:from-[#2E8B57] hover:to-[#1e5f3f] hover:text-white font-semibold transform hover:scale-105 transition-all duration-300"
                  onClick={() => setIsBudgetOpen(true)}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Set Budget Baru
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-gradient-to-r from-white to-gray-50 border-2 border-orange-500 text-orange-600 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:text-white font-semibold transform hover:scale-105 transition-all duration-300"
                  onClick={handleResetBudgets}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Reset Data Budget
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-gradient-to-r from-white to-gray-50 border-2 border-purple-500 text-purple-600 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-600 hover:text-white font-semibold transform hover:scale-105 transition-all duration-300"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Jadwalkan Transfer
                </Button>
              </CardContent>
            </Card>

            {/* Investment Summary */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-t-lg">
                <CardTitle className="text-gray-900">Ringkasan Investasi</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                    <span className="text-gray-600 font-medium">Total Investasi</span>
                    <span className="font-bold text-gray-900">{formatCurrency(financialData.investments)}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                    <span className="text-gray-600 font-medium">Return YTD</span>
                    <span className="font-bold text-[#2E8B57]">{financialData.investments > 0 ? "+12.5%" : "0%"}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                    <span className="text-gray-600 font-medium">Diversifikasi</span>
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-[#2E8B57]/10 to-[#1e5f3f]/10 text-[#2E8B57] font-semibold"
                    >
                      {financialData.investments > 0 ? "Baik" : "Belum Ada"}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-6 bg-gradient-to-r from-white to-gray-50 border-2 border-orange-500 text-orange-600 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:text-white font-semibold transform hover:scale-105 transition-all duration-300"
                  onClick={() => setIsPortfolioOpen(true)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Lihat Portfolio
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Manual Input Dialog */}
        <Dialog open={isManualInputOpen} onOpenChange={setIsManualInputOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle className="text-[#2E8B57]">Input Manual Data Keuangan</DialogTitle>
              <DialogDescription>
                Masukkan data keuangan Anda secara manual untuk memperbarui dashboard
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="totalBalance">Total Saldo (IDR)</Label>
                <Input
                  id="totalBalance"
                  type="number"
                  value={inputData.totalBalance}
                  onChange={(e) => setInputData({ ...inputData, totalBalance: Number(e.target.value) })}
                  className="border-gray-300 focus:border-[#2E8B57]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">Pendapatan Bulanan (IDR)</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  value={inputData.monthlyIncome}
                  onChange={(e) => setInputData({ ...inputData, monthlyIncome: Number(e.target.value) })}
                  className="border-gray-300 focus:border-[#2E8B57]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyExpenses">Pengeluaran Bulanan (IDR)</Label>
                <Input
                  id="monthlyExpenses"
                  type="number"
                  value={inputData.monthlyExpenses}
                  onChange={(e) => setInputData({ ...inputData, monthlyExpenses: Number(e.target.value) })}
                  className="border-gray-300 focus:border-[#2E8B57]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="savings">Tabungan (IDR)</Label>
                <Input
                  id="savings"
                  type="number"
                  value={inputData.savings}
                  onChange={(e) => setInputData({ ...inputData, savings: Number(e.target.value) })}
                  className="border-gray-300 focus:border-[#2E8B57]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="investments">Investasi (IDR)</Label>
                <Input
                  id="investments"
                  type="number"
                  value={inputData.investments}
                  onChange={(e) => setInputData({ ...inputData, investments: Number(e.target.value) })}
                  className="border-gray-300 focus:border-[#2E8B57]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="debts">Hutang (IDR)</Label>
                <Input
                  id="debts"
                  type="number"
                  value={inputData.debts}
                  onChange={(e) => setInputData({ ...inputData, debts: Number(e.target.value) })}
                  className="border-gray-300 focus:border-[#2E8B57]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsManualInputOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleSaveManualInput} className="bg-[#2E8B57] hover:bg-[#236B43]">
                Simpan Data
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Transaction Dialog */}
        <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle className="text-[#2E8B57] font-semibold">Tambah Transaksi Baru</DialogTitle>
              <DialogDescription className="text-gray-700 font-medium">
                Tambahkan transaksi pendapatan atau pengeluaran
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-gray-800 font-medium">Jenis Transaksi</Label>
                <div className="flex gap-4">
                  <Button
                    variant={newTransaction.type === "income" ? "default" : "outline"}
                    onClick={() => setNewTransaction({ ...newTransaction, type: "income" })}
                    className={
                      newTransaction.type === "income"
                        ? "bg-[#2E8B57] hover:bg-[#236B43] text-white"
                        : "border-[#2E8B57] text-[#2E8B57] hover:bg-[#2E8B57]/10"
                    }
                  >
                    Pendapatan
                  </Button>
                  <Button
                    variant={newTransaction.type === "expense" ? "default" : "outline"}
                    onClick={() => setNewTransaction({ ...newTransaction, type: "expense" })}
                    className={
                      newTransaction.type === "expense"
                        ? "bg-[#2E8B57] hover:bg-[#236B43] text-white"
                        : "border-[#2E8B57] text-[#2E8B57] hover:bg-[#2E8B57]/10"
                    }
                  >
                    Pengeluaran
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-800 font-medium">
                  Deskripsi
                </Label>
                <Input
                  id="description"
                  placeholder="Masukkan deskripsi transaksi"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                  className="border-gray-300 focus:border-[#2E8B57] text-gray-900 placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-gray-800 font-medium">
                  Jumlah (IDR)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })}
                  className="border-gray-300 focus:border-[#2E8B57] text-gray-900 placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-800 font-medium">
                  Kategori
                </Label>
                <Input
                  id="category"
                  placeholder="Masukkan kategori"
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                  className="border-gray-300 focus:border-[#2E8B57] text-gray-900 placeholder:text-gray-500"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddTransactionOpen(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Batal
              </Button>
              <Button onClick={handleAddTransaction} className="bg-[#2E8B57] hover:bg-[#236B43] text-white">
                Tambah Transaksi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Budget Dialog */}
        <Dialog open={isBudgetOpen} onOpenChange={setIsBudgetOpen}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle className="text-[#2E8B57]">Tambah Budget Baru</DialogTitle>
              <DialogDescription>Buat kategori budget baru untuk melacak pengeluaran</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-6 px-2">
              <div className="space-y-3 p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
                <Label htmlFor="budgetName" className="text-emerald-800 font-semibold text-sm">
                  Nama Kategori
                </Label>
                <Input
                  id="budgetName"
                  value={newBudget.name}
                  onChange={(e) => setNewBudget({ ...newBudget, name: e.target.value })}
                  className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-200 bg-white/80 backdrop-blur-sm"
                  placeholder="Masukkan nama kategori budget"
                />
              </div>
              <div className="space-y-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                <Label htmlFor="budgetAmount" className="text-blue-800 font-semibold text-sm">
                  Budget (IDR)
                </Label>
                <Input
                  id="budgetAmount"
                  type="number"
                  value={newBudget.budget}
                  onChange={(e) => setNewBudget({ ...newBudget, budget: Number(e.target.value) })}
                  className="border-blue-300 focus:border-blue-500 focus:ring-blue-200 bg-white/80 backdrop-blur-sm"
                  placeholder="0"
                />
              </div>
            </div>
            <DialogFooter className="bg-gradient-to-r from-gray-50 to-slate-50 p-4 rounded-b-lg">
              <Button
                variant="outline"
                onClick={() => setIsBudgetOpen(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
              >
                Batal
              </Button>
              <Button
                onClick={handleAddBudget}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Tambah Budget
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-600">Reset Semua Data?</AlertDialogTitle>
              <AlertDialogDescription>
                Tindakan ini akan menghapus semua data keuangan yang telah Anda input dan mengembalikan ke data default.
                Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleResetAllData} className="bg-red-600 hover:bg-red-700">
                Ya, Reset Data
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog open={isAIAnalysisOpen} onOpenChange={setIsAIAnalysisOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle className="text-purple-600 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Analisis AI Portfolio Keuangan
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Analisis mendalam tentang kondisi keuangan Anda dengan rekomendasi AI
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {isAnalyzing ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-600 mr-3" />
                  <span className="text-gray-600">Menganalisis data keuangan Anda...</span>
                </div>
              ) : aiAnalysis ? (
                <div className="space-y-6">
                  {/* Insights */}
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                      <TrendingUpIcon className="w-5 h-5" />
                      Insight Keuangan
                    </h3>
                    <ul className="space-y-2">
                      {aiAnalysis.insights?.map((insight: string, index: number) => (
                        <li key={index} className="text-blue-700 flex items-start gap-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Warnings */}
                  {aiAnalysis.warnings?.length > 0 && (
                    <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Peringatan
                      </h3>
                      <ul className="space-y-2">
                        {aiAnalysis.warnings.map((warning: string, index: number) => (
                          <li key={index} className="text-red-700 flex items-start gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Rekomendasi
                    </h3>
                    <ul className="space-y-2">
                      {aiAnalysis.recommendations?.map((recommendation: string, index: number) => (
                        <li key={index} className="text-green-700 flex items-start gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                          {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Klik tombol analisis untuk memulai</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAIAnalysisOpen(false)}>
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isProjectionOpen} onOpenChange={setIsProjectionOpen}>
          <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle className="text-blue-600 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Proyeksi Keuangan 5 Tahun
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Visualisasi proyeksi keuangan berdasarkan data dan tren saat ini
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Line Chart for Balance Growth */}
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Proyeksi Saldo & Investasi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={projectionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        <Line type="monotone" dataKey="balance" stroke="#2E8B57" strokeWidth={3} name="Saldo" />
                        <Line type="monotone" dataKey="investments" stroke="#8B5CF6" strokeWidth={3} name="Investasi" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Bar Chart for Savings Growth */}
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Proyeksi Tabungan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={projectionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        <Bar dataKey="savings" fill="#10B981" name="Tabungan" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-blue-100 text-sm">Proyeksi Saldo 5 Tahun</p>
                      <p className="text-2xl font-bold">{formatCurrency(projectionData[4]?.balance || 0)}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-purple-100 text-sm">Proyeksi Investasi 5 Tahun</p>
                      <p className="text-2xl font-bold">{formatCurrency(projectionData[4]?.investments || 0)}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-green-100 text-sm">Proyeksi Tabungan 5 Tahun</p>
                      <p className="text-2xl font-bold">{formatCurrency(projectionData[4]?.savings || 0)}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsProjectionOpen(false)}>
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isPortfolioOpen} onOpenChange={setIsPortfolioOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle className="text-[#2E8B57]">Detail Portfolio Investasi</DialogTitle>
              <DialogDescription>Ringkasan lengkap portfolio investasi Anda</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-white">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Total Investasi</p>
                      <p className="text-xl font-bold text-[#2E8B57]">{formatCurrency(financialData.investments)}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Return YTD</p>
                      <p className="text-xl font-bold text-[#2E8B57]">
                        {financialData.investments > 0 ? "+12.5%" : "0%"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Gain/Loss</p>
                      <p className="text-xl font-bold text-[#2E8B57]">
                        {financialData.investments > 0
                          ? `+${formatCurrency(financialData.investments * 0.125)}`
                          : formatCurrency(0)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {financialData.investments > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Alokasi Asset</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Saham", allocation: 60, value: financialData.investments * 0.6, return: "+15.2%" },
                      { name: "Obligasi", allocation: 25, value: financialData.investments * 0.25, return: "+8.1%" },
                      { name: "Reksadana", allocation: 10, value: financialData.investments * 0.1, return: "+12.8%" },
                      { name: "Emas", allocation: 5, value: financialData.investments * 0.05, return: "+6.5%" },
                    ].map((asset, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-[#2E8B57] rounded-full"></div>
                          <span className="font-medium">{asset.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(asset.value)}</p>
                          <p className="text-sm text-gray-500">
                            {asset.allocation}% • {asset.return}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Belum ada data investasi</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPortfolioOpen(false)}>
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
