"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { createClient } from "@/lib/supabase/client"
import { Plus } from "lucide-react"

const categories = [
  { value: "gaji", label: "💰 Gaji", emoji: "💰" },
  { value: "investasi", label: "📈 Investasi", emoji: "📈" },
  { value: "pangan", label: "🍽️ Pangan", emoji: "🍽️" },
  { value: "lain-lain", label: "✨ Lain-lain", emoji: "✨" },
  { value: "pengeluaran", label: "💸 Pengeluaran", emoji: "💸" },
  { value: "makanan-minuman", label: "🍔 Makanan & Minuman", emoji: "🍔" },
  { value: "transportasi", label: "🚗 Transportasi", emoji: "🚗" },
  { value: "tagihan", label: "💡 Tagihan (Listrik, Air, Internet)", emoji: "💡" },
  { value: "hiburan", label: "🎬 Hiburan", emoji: "🎬" },
  { value: "pendidikan", label: "🎓 Pendidikan", emoji: "🎓" },
  { value: "kesehatan", label: "🏥 Kesehatan", emoji: "🏥" },
  { value: "belanja", label: "🛍️ Belanja", emoji: "🛍️" },
  { value: "lain-lain-expense", label: "✨ Lain-lain", emoji: "✨" },
]

interface TransactionFormProps {
  isOpen: boolean
  onClose: () => void
  onTransactionAdded: () => void
}

export default function TransactionForm({ isOpen, onClose, onTransactionAdded }: TransactionFormProps) {
  const [formData, setFormData] = useState({
    type: "expense",
    category: "",
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()

      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()
      if (userError || !user) {
        throw new Error("User not authenticated")
      }

      // Insert transaction
      const { error } = await supabase.from("transactions").insert({
        user_id: user.id,
        type: formData.type,
        category: formData.category,
        description: formData.description,
        amount: Number.parseFloat(formData.amount),
        date: formData.date,
      })

      if (error) throw error

      // Reset form
      setFormData({
        type: "expense",
        category: "",
        description: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
      })

      onTransactionAdded()
      onClose()
    } catch (error) {
      console.error("Error adding transaction:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredCategories = categories.filter((cat) => {
    if (formData.type === "income") {
      return ["gaji", "investasi", "lain-lain"].includes(cat.value)
    } else {
      return !["gaji", "investasi"].includes(cat.value)
    }
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-slate-800 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">📝 Catat Transaksi Baru</DialogTitle>
          <DialogDescription className="text-slate-300">
            Tambahkan transaksi baru ke dalam catatan keuangan Anda
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date" className="text-slate-200">
              📅 Tanggal
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-200">⚡ Tipe</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value, category: "" })}
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Pilih Tipe" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="income" className="text-white hover:bg-slate-600">
                  Pemasukan
                </SelectItem>
                <SelectItem value="expense" className="text-white hover:bg-slate-600">
                  Pengeluaran
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-200">🏷️ Kategori</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600 max-h-60">
                {filteredCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value} className="text-white hover:bg-slate-600">
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-200">
              📝 Deskripsi
            </Label>
            <Textarea
              id="description"
              placeholder="Makan siang, bayar listrik..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-slate-200">
              💰 Jumlah
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white"
              required
              min="0"
              step="0.01"
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambahkan Transaksi
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
