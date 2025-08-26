"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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
import { Plus, ArrowLeft, PiggyBank, Calendar, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

export default function SavingsGoalsPage() {
  const [savingsGoals, setSavingsGoals] = useState([])
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [newGoal, setNewGoal] = useState({
    name: "",
    target_amount: 0,
    current_amount: 0,
    target_date: "",
    description: "",
  })

  useEffect(() => {
    loadSavingsGoals()
  }, [])

  const loadSavingsGoals = async () => {
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setIsLoading(false)
        return
      }

      const { data: goals } = await supabase
        .from("savings_goals")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (goals) {
        setSavingsGoals(goals)
      }
    } catch (error) {
      console.error("Error loading savings goals:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addSavingsGoal = async () => {
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { error } = await supabase.from("savings_goals").insert({
        user_id: user.id,
        ...newGoal,
      })

      if (!error) {
        setNewGoal({
          name: "",
          target_amount: 0,
          current_amount: 0,
          target_date: "",
          description: "",
        })
        setIsAddGoalOpen(false)
        loadSavingsGoals()
      }
    } catch (error) {
      console.error("Error adding savings goal:", error)
    }
  }

  const updateGoalProgress = async (goalId, newAmount) => {
    try {
      const supabase = createClient()

      const { error } = await supabase.from("savings_goals").update({ current_amount: newAmount }).eq("id", goalId)

      if (!error) {
        loadSavingsGoals()
      }
    } catch (error) {
      console.error("Error updating goal progress:", error)
    }
  }

  const deleteGoal = async (goalId) => {
    try {
      const supabase = createClient()

      const { error } = await supabase.from("savings_goals").delete().eq("id", goalId)

      if (!error) {
        loadSavingsGoals()
      }
    } catch (error) {
      console.error("Error deleting goal:", error)
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

  const calculateDaysRemaining = (targetDate: string) => {
    const today = new Date()
    const target = new Date(targetDate)
    const diffTime = target.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
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
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/management">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Target Tabungan
              </h1>
              <p className="text-gray-700 font-medium">Tetapkan dan capai tujuan finansial Anda</p>
            </div>
          </div>
          <Button onClick={() => setIsAddGoalOpen(true)} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Target
          </Button>
        </div>

        {/* Savings Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savingsGoals.map((goal) => {
            const progress = goal.target_amount > 0 ? (goal.current_amount / goal.target_amount) * 100 : 0
            const daysRemaining = calculateDaysRemaining(goal.target_date)

            return (
              <Card key={goal.id} className="relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteGoal(goal.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <PiggyBank className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{goal.name}</CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{formatCurrency(goal.current_amount)}</span>
                      <span>{formatCurrency(goal.target_amount)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {daysRemaining > 0
                        ? `${daysRemaining} hari lagi`
                        : daysRemaining === 0
                          ? "Target hari ini!"
                          : `Terlambat ${Math.abs(daysRemaining)} hari`}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Tambah jumlah"
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          const target = e.target as HTMLInputElement
                          const newAmount = goal.current_amount + Number.parseFloat(target.value || "0")
                          updateGoalProgress(goal.id, newAmount)
                          target.value = ""
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        const button = e.target as HTMLButtonElement
                        const input = button.parentElement?.querySelector("input") as HTMLInputElement
                        if (input) {
                          const newAmount = goal.current_amount + Number.parseFloat(input.value || "0")
                          updateGoalProgress(goal.id, newAmount)
                          input.value = ""
                        }
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {savingsGoals.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <PiggyBank className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Belum Ada Target Tabungan</h3>
              <p className="text-gray-600 mb-4">
                Mulai tetapkan tujuan finansial Anda untuk masa depan yang lebih baik
              </p>
              <Button onClick={() => setIsAddGoalOpen(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Target Pertama
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Add Goal Dialog */}
        <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Target Tabungan Baru</DialogTitle>
              <DialogDescription>Tetapkan tujuan finansial yang ingin Anda capai</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="goalName">Nama Target</Label>
                <Input
                  id="goalName"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  placeholder="Contoh: Liburan ke Bali"
                />
              </div>

              <div>
                <Label htmlFor="goalDescription">Deskripsi</Label>
                <Input
                  id="goalDescription"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  placeholder="Deskripsi singkat tentang target ini"
                />
              </div>

              <div>
                <Label htmlFor="targetAmount">Jumlah Target</Label>
                <Input
                  id="targetAmount"
                  type="number"
                  value={newGoal.target_amount}
                  onChange={(e) => setNewGoal({ ...newGoal, target_amount: Number.parseFloat(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="currentAmount">Jumlah Saat Ini</Label>
                <Input
                  id="currentAmount"
                  type="number"
                  value={newGoal.current_amount}
                  onChange={(e) => setNewGoal({ ...newGoal, current_amount: Number.parseFloat(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="targetDate">Tanggal Target</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={newGoal.target_date}
                  onChange={(e) => setNewGoal({ ...newGoal, target_date: e.target.value })}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddGoalOpen(false)}>
                Batal
              </Button>
              <Button onClick={addSavingsGoal} className="bg-green-600 hover:bg-green-700">
                Tambah Target
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
