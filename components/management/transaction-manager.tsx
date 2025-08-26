"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, TrendingUp, TrendingDown, Wallet, Database } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"

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

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount))
}

export default function TransactionManager() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
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
    const currentMonth = currentDate.getMonth()
    
    const dummyTransactions: Transaction[] = [
      {
        id: "1",
        date: new Date(currentYear, currentMonth, 25),
        category: "gaji",
        type: "income",
        description: "Gaji Bulanan Agustus",
        amount: 8500000,
      },
      {
        id: "2",
        date: new Date(currentYear, currentMonth, 24),
        category: "makanan-minuman",
        type: "expense",
        description: "Makan siang di restoran",
        amount: 75000,
      },
      {
        id: "3",
        date: new Date(currentYear, currentMonth, 23),
        category: "transportasi",
        type: "expense",
        description: "Bensin motor",
        amount: 50000,
      },
      {
        id: "4",
        date: new Date(currentYear, currentMonth, 22),
        category: "investasi",
        type: "income",
        description: "Dividen saham BBCA",
        amount: 250000,
      },
      {
        id: "5",
        date: new Date(currentYear, currentMonth, 21),
        category: "tagihan",
        type: "expense",
        description: "Bayar listrik bulanan",
        amount: 320000,
      },
      {
        id: "6",
        date: new Date(currentYear, currentMonth, 20),
        category: "belanja",
        type: "expense",
        description: "Belanja groceries mingguan",
        amount: 450000,
      },
      {
        id: "7",
        date: new Date(currentYear, currentMonth, 19),
        category: "hiburan",
        type: "expense",
        description: "Nonton bioskop dengan keluarga",
        amount: 120000,
      },
      {
        id: "8",
        date: new Date(currentYear, currentMonth, 18),
        category: "hadiah",
        type: "income",
        description: "Bonus kinerja dari kantor",
        amount: 1500000,
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

  // Calculate monthly summary
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  const monthlyTransactions = transactions.filter(t => 
    t.date.getMonth() === currentMonth && t.date.getFullYear() === currentYear
  )
  
  const totalIncome = monthlyTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)
    
  const totalExpense = monthlyTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)
    
  const currentBalance = totalIncome - totalExpense

  const currentCategories = categories[formData.type]

  return (
    <div className="py-8 px-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#2E8B57] to-[#1e5f3f] bg-clip-text text-transparent mb-2">
                Manajemen Transaksi
              </h1>
              <p className="text-gray-700 font-medium">Catat dan kelola transaksi keuangan Anda</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transaction Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-[#2E8B57]/10 to-[#1e5f3f]/10 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#2E8B57] to-[#1e5f3f] rounded-lg flex items-center justify-center">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  📝 Catat Transaksi Baru
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
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
                    <div className="flex gap-4">
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
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#2E8B57] to-[#1e5f3f] hover:from-[#236B43] hover:to-[#1a4d33] text-white shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold py-3"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambahkan Transaksi
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Summary */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-t-lg">
                <CardTitle className="text-gray-900">📊 Ringkasan Bulanan</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* Total Income */}
                <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between">
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
                </div>

                {/* Total Expense */}
                <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
                  <div className="flex items-center justify-between">
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
                </div>

                {/* Current Balance */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between">
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

            {/* Recent Transactions */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-t-lg">
                <CardTitle className="text-gray-900">📋 Transaksi Terbaru</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {transactions.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>Belum ada transaksi</p>
                    </div>
                  ) : (
                    transactions.slice(0, 5).map((transaction) => (
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
                              {format(transaction.date, "dd MMM", { locale: id })}
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
          </div>
        </div>
      </div>
    </div>
  )
}