"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, TrendingUp, TrendingDown, Wallet, Database, BarChart3 } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts"
import AIPortfolioAnalysis from "./ai-portfolio-analysis"

interface Transaction {
  id: string
  date: Date
  category: string
  type: "income" | "expense"
  description: string
  amount: number
}

const categories = {
  income: [
    { value: "pendapatan", label: "💰 Pendapatan", icon: "💰" },
    { value: "gaji", label: "💼 Gaji", icon: "💼" },
    { value: "investasi", label: "📈 Investasi", icon: "📈" },
    { value: "hadiah", label: "🎁 Hadiah", icon: "🎁" },
    { value: "lain-lain", label: "💡 Lain-lain", icon: "💡" },
  ],
  expense: [
    { value: "pengeluaran", label: "💸 Pengeluaran", icon: "💸" },
    { value: "makanan-minuman", label: "🍽️ Makanan & Minuman", icon: "🍽️" },
    { value: "transportasi", label: "🚗 Transportasi", icon: "🚗" },
    { value: "tagihan", label: "💡 Tagihan (Listrik, Air, Internet)", icon: "💡" },
    { value: "hiburan", label: "🎬 Hiburan", icon: "🎬" },
    { value: "pendidikan", label: "📚 Pendidikan", icon: "📚" },
    { value: "kesehatan", label: "🏥 Kesehatan", icon: "🏥" },
    { value: "belanja", label: "🛍️ Belanja", icon: "🛍️" },
    { value: "lain-lain", label: "💡 Lain-lain", icon: "💡" },
  ]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C', '#8DD1E1']

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount))
}

const months = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
]

export default function EnhancedFinancialDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [formData, setFormData] = useState({
    date: new Date(),
    category: "",
    type: "expense" as "income" | "expense",
    description: "",
    amount: 0,
  })
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const loadDummyData = () => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    
    const dummyTransactions: Transaction[] = [
      // Current month transactions
      {
        id: "1",
        date: new Date(currentYear, 7, 25), // August
        category: "gaji",
        type: "income",
        description: "Gaji Bulanan Agustus",
        amount: 8500000,
      },
      {
        id: "2", 
        date: new Date(currentYear, 7, 24),
        category: "makanan-minuman",
        type: "expense",
        description: "Makan siang di restoran",
        amount: 75000,
      },
      {
        id: "3",
        date: new Date(currentYear, 7, 23),
        category: "transportasi",
        type: "expense", 
        description: "Bensin motor",
        amount: 50000,
      },
      {
        id: "4",
        date: new Date(currentYear, 7, 22),
        category: "investasi",
        type: "income",
        description: "Dividen saham BBCA",
        amount: 250000,
      },
      {
        id: "5",
        date: new Date(currentYear, 7, 21),
        category: "tagihan",
        type: "expense",
        description: "Bayar listrik bulanan",
        amount: 320000,
      },
      {
        id: "6",
        date: new Date(currentYear, 7, 20),
        category: "belanja",
        type: "expense",
        description: "Belanja groceries mingguan",
        amount: 450000,
      },
      {
        id: "7",
        date: new Date(currentYear, 7, 19),
        category: "hiburan",
        type: "expense",
        description: "Nonton bioskop dengan keluarga",
        amount: 120000,
      },
      {
        id: "8",
        date: new Date(currentYear, 7, 18),
        category: "hadiah",
        type: "income",
        description: "Bonus kinerja dari kantor",
        amount: 1500000,
      },
      // July transactions
      {
        id: "9",
        date: new Date(currentYear, 6, 25), // July
        category: "gaji",
        type: "income",
        description: "Gaji Bulanan Juli",
        amount: 8500000,
      },
      {
        id: "10",
        date: new Date(currentYear, 6, 15),
        category: "makanan-minuman",
        type: "expense",
        description: "Groceries bulanan",
        amount: 800000,
      },
      {
        id: "11",
        date: new Date(currentYear, 6, 10),
        category: "transportasi",
        type: "expense",
        description: "Service motor",
        amount: 200000,
      },
      {
        id: "12",
        date: new Date(currentYear, 6, 5),
        category: "hiburan",
        type: "expense",
        description: "Liburan keluarga",
        amount: 2000000,
      }
    ]
    
    setTransactions(dummyTransactions)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.category || !formData.description || formData.amount <= 0) {
      return
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: formData.date,
      category: formData.category,
      type: formData.type,
      description: formData.description,
      amount: formData.amount,
    }

    setTransactions([newTransaction, ...transactions])
    
    // Reset form
    setFormData({
      date: new Date(),
      category: "",
      type: "expense",
      description: "",
      amount: 0,
    })
  }

  // Filter transactions by selected month and year
  const filteredTransactions = transactions.filter(t => 
    t.date.getMonth() === selectedMonth && t.date.getFullYear() === selectedYear
  )
  
  const totalIncome = filteredTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)
    
  const totalExpense = filteredTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)
    
  const currentBalance = totalIncome - totalExpense

  // Generate yearly data for charts
  const yearlyData = months.map((month, index) => {
    const monthTransactions = transactions.filter(t => 
      t.date.getMonth() === index && t.date.getFullYear() === selectedYear
    )
    
    const income = monthTransactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0)
      
    const expense = monthTransactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0)
    
    return {
      month: month.substring(0, 3),
      pendapatan: income,
      pengeluaran: expense,
      saldo: income - expense
    }
  })

  // Generate expense by category data
  const expenseByCategory = categories.expense.map(category => {
    const categoryExpenses = filteredTransactions
      .filter(t => t.type === "expense" && t.category === category.value)
      .reduce((sum, t) => sum + t.amount, 0)
    
    return {
      name: category.label.split(' ')[1] || category.label, // Remove emoji
      value: categoryExpenses,
      fullName: category.label
    }
  }).filter(item => item.value > 0)

  // Generate 5-year projection data
  const projectionData = Array.from({ length: 5 }, (_, i) => {
    const year = selectedYear + i
    const avgMonthlyIncome = totalIncome || 8500000
    const avgMonthlyExpense = totalExpense || 2000000
    const annualIncome = avgMonthlyIncome * 12
    const annualExpense = avgMonthlyExpense * 12
    
    return {
      tahun: year,
      pendapatan: annualIncome,
      pengeluaran: annualExpense,
      pertumbuhan: i === 0 ? 0 : 5.5, // 5.5% growth
      penghematan: annualIncome - annualExpense,
      total: (annualIncome - annualExpense) * (i + 1)
    }
  })

  const currentCategories = categories[formData.type]

  return (
    <div className="py-8 px-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#2E8B57] to-[#1e5f3f] bg-clip-text text-transparent mb-2">
                Dashboard Keuangan Komprehensif
              </h1>
              <p className="text-gray-700 font-medium">Analisis mendalam keuangan dan proyeksi masa depan</p>
            </div>
            <Button
              onClick={loadDummyData}
              variant="outline"
              className="bg-gradient-to-r from-white to-gray-50 border-2 border-purple-500 text-purple-600 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-600 hover:text-white font-semibold transform hover:scale-105 transition-all duration-300"
            >
              <Database className="w-4 h-4 mr-2" />
              Load Dummy Data
            </Button>
          </div>
        </div>

        {/* Ringkasan Bulanan */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <BarChart3 className="w-5 h-5" />
              📊 Ringkasan Bulanan
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Year and Month Selectors */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <Label className="text-gray-700 font-medium">Tahun</Label>
                <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label className="text-gray-700 font-medium">Bulan</Label>
                <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {months.map((month, index) => (
                      <SelectItem key={index} value={index.toString()}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#2E8B57] to-[#1e5f3f] rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-green-700 font-medium">Total Pendapatan</p>
                    <p className="text-xl font-bold text-[#2E8B57]">{formatCurrency(totalIncome)}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-red-700 font-medium">Total Pengeluaran</p>
                    <p className="text-xl font-bold text-red-600">{formatCurrency(totalExpense)}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Saldo Bulan Ini</p>
                    <p className={`text-xl font-bold ${currentBalance >= 0 ? 'text-[#2E8B57]' : 'text-red-600'}`}>
                      {formatCurrency(currentBalance)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daftar Transaksi */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-t-lg">
              <CardTitle className="text-gray-900">📋 Daftar Transaksi</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredTransactions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Belum ada transaksi untuk bulan ini.</p>
                  </div>
                ) : (
                  filteredTransactions.slice(0, 10).map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-white to-gray-50 border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            transaction.type === "income"
                              ? "bg-gradient-to-br from-[#2E8B57] to-[#1e5f3f]"
                              : "bg-gradient-to-br from-red-500 to-red-600"
                          }`}
                        >
                          {transaction.type === "income" ? (
                            <TrendingUp className="w-4 h-4 text-white" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{transaction.description}</p>
                          <p className="text-xs text-gray-600">
                            {format(transaction.date, "dd MMM yyyy", { locale: id })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-bold text-sm ${
                            transaction.type === "income" ? "text-[#2E8B57]" : "text-red-600"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Grafik Pengeluaran per Kategori */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-t-lg">
              <CardTitle className="text-gray-900">📊 Grafik Pengeluaran per Kategori</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {expenseByCategory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Belum ada data pengeluaran untuk bulan ini.</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {expenseByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Ringkasan Tahunan */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm mb-8">
          <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-t-lg">
            <CardTitle className="text-gray-900">📈 Ringkasan Tahunan</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4">
              <Label className="text-gray-700 font-medium">Pilih Tahun</Label>
              <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                <SelectTrigger className="w-32 border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="h-80 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Line type="monotone" dataKey="pendapatan" stroke="#2E8B57" strokeWidth={3} name="Pendapatan" />
                  <Line type="monotone" dataKey="pengeluaran" stroke="#EF4444" strokeWidth={3} name="Pengeluaran" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly breakdown table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 text-blue-600">Bulan</th>
                    <th className="text-left p-2 text-green-600">Pendapatan</th>
                    <th className="text-left p-2 text-red-600">Pengeluaran</th>
                    <th className="text-left p-2 text-orange-600">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyData.map((data, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-2">{months[index]}</td>
                      <td className="p-2 text-green-600">{formatCurrency(data.pendapatan)}</td>
                      <td className="p-2 text-red-600">{formatCurrency(data.pengeluaran)}</td>
                      <td className={`p-2 ${data.saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(data.saldo)}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-b-2 border-gray-300 font-bold bg-gray-100">
                    <td className="p-2">TOTAL TAHUN INI</td>
                    <td className="p-2 text-green-600">
                      {formatCurrency(yearlyData.reduce((sum, data) => sum + data.pendapatan, 0))}
                    </td>
                    <td className="p-2 text-red-600">
                      {formatCurrency(yearlyData.reduce((sum, data) => sum + data.pengeluaran, 0))}
                    </td>
                    <td className="p-2 text-blue-600">
                      {formatCurrency(yearlyData.reduce((sum, data) => sum + data.saldo, 0))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Proyeksi 5 Tahun */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm mb-8">
          <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-t-lg">
            <CardTitle className="text-gray-900">🔮 Proyeksi 5 Tahun</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tahun" />
                  <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Bar dataKey="pendapatan" fill="#2E8B57" name="Pendapatan" />
                  <Bar dataKey="pengeluaran" fill="#EF4444" name="Pengeluaran" />
                  <Bar dataKey="penghematan" fill="#3B82F6" name="Saldo Tahunan" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Projection table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 text-blue-600">Tahun</th>
                    <th className="text-left p-2 text-green-600">Pendapatan</th>
                    <th className="text-left p-2 text-red-600">Pengeluaran</th>
                    <th className="text-left p-2 text-purple-600">Pertumbuhan</th>
                    <th className="text-left p-2 text-orange-600">Penghematan</th>
                    <th className="text-left p-2 text-blue-600">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {projectionData.map((data, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-medium">{data.tahun}</td>
                      <td className="p-2 text-green-600">{formatCurrency(data.pendapatan)}</td>
                      <td className="p-2 text-red-600">{formatCurrency(data.pengeluaran)}</td>
                      <td className="p-2 text-purple-600">{data.pertumbuhan.toFixed(1)}%</td>
                      <td className="p-2 text-orange-600">{formatCurrency(data.penghematan)}</td>
                      <td className="p-2 text-blue-600 font-bold">{formatCurrency(data.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* AI Portfolio Analysis */}
        <AIPortfolioAnalysis
          transactions={transactions.map(t => ({
            id: t.id,
            type: t.type,
            category: t.category,
            description: t.description,
            amount: t.amount,
            date: format(t.date, "yyyy-MM-dd")
          }))}
          totalIncome={transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0)}
          totalExpenses={transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)}
          currentBalance={transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0) - transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)}
        />

        {/* Transaction Form */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-[#2E8B57]/10 to-[#1e5f3f]/10 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <div className="w-8 h-8 bg-gradient-to-br from-[#2E8B57] to-[#1e5f3f] rounded-lg flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
              📝 Tambah Transaksi Baru
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Date Picker */}
              <div className="space-y-2">
                <Label className="text-gray-800 font-medium">📅 Tanggal</Label>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal border-gray-300 hover:border-[#2E8B57]"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(formData.date, "dd/MM/yyyy", { locale: id })}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => {
                        if (date) {
                          setFormData({ ...formData, date })
                          setIsCalendarOpen(false)
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Transaction Type */}
              <div className="space-y-2">
                <Label className="text-gray-800 font-medium">🔄 Tipe</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={formData.type === "income" ? "default" : "outline"}
                    onClick={() => setFormData({ ...formData, type: "income", category: "" })}
                    className={
                      formData.type === "income"
                        ? "bg-[#2E8B57] hover:bg-[#236B43] text-white flex-1"
                        : "border-[#2E8B57] text-[#2E8B57] hover:bg-[#2E8B57]/10 flex-1"
                    }
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Pendapatan
                  </Button>
                  <Button
                    type="button"
                    variant={formData.type === "expense" ? "default" : "outline"}
                    onClick={() => setFormData({ ...formData, type: "expense", category: "" })}
                    className={
                      formData.type === "expense"
                        ? "bg-red-500 hover:bg-red-600 text-white flex-1"
                        : "border-red-500 text-red-500 hover:bg-red-500/10 flex-1"
                    }
                  >
                    <TrendingDown className="w-4 h-4 mr-2" />
                    Pengeluaran
                  </Button>
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="space-y-2">
                <Label className="text-gray-800 font-medium">🏷️ Kategori</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="border-gray-300 focus:border-[#2E8B57]">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {currentCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-gray-800 font-medium">📝 Deskripsi</Label>
                <Input
                  placeholder="Makan siang, bayar listrik..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="border-gray-300 focus:border-[#2E8B57]"
                />
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label className="text-gray-800 font-medium">💰 Jumlah (IDR)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.amount || ""}
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                  className="border-gray-300 focus:border-[#2E8B57]"
                />
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 lg:col-span-5">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#2E8B57] to-[#1e5f3f] hover:from-[#236B43] hover:to-[#1a4d33] text-white shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold py-3"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambahkan Transaksi
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}