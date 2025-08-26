"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { PiggyBank, Calendar, Plus, Edit } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface SavingsGoal {
  id: string
  title: string
  target_amount: number
  current_amount: number
  target_date: string
  category: string
  created_at: string
}

export default function SavingsTracker() {
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([])
  const [isAddingGoal, setIsAddingGoal] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: "",
    target_amount: "",
    target_date: "",
    category: "🎯 Umum",
  })

  const categories = [
    "🎯 Umum",
    "🏠 Rumah",
    "🚗 Kendaraan",
    "✈️ Liburan",
    "💍 Pernikahan",
    "🎓 Pendidikan",
    "🏥 Kesehatan",
    "📱 Gadget",
  ]

  useEffect(() => {
    loadSavingsGoals()
  }, [])

  const loadSavingsGoals = async () => {
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data } = await supabase
        .from("savings_goals")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (data) {
        setSavingsGoals(data)
      }
    } catch (error) {
      console.error("Error loading savings goals:", error)
    }
  }

  const addSavingsGoal = async () => {
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      await supabase.from("savings_goals").insert({
        user_id: user.id,
        title: newGoal.title,
        target_amount: Number.parseFloat(newGoal.target_amount),
        current_amount: 0,
        target_date: newGoal.target_date,
        category: newGoal.category,
      })

      setNewGoal({ title: "", target_amount: "", target_date: "", category: "🎯 Umum" })
      setIsAddingGoal(false)
      loadSavingsGoals()
    } catch (error) {
      console.error("Error adding savings goal:", error)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const getDaysRemaining = (targetDate: string) => {
    const today = new Date()
    const target = new Date(targetDate)
    const diffTime = target.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <PiggyBank className="w-10 h-10 text-blue-400" />
            Savings Tracker
          </h1>
          <p className="text-slate-300">Track your savings goals and achieve your financial dreams</p>
        </div>

        {/* Add New Goal Button */}
        <div className="mb-6">
          <Button
            onClick={() => setIsAddingGoal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Savings Goal
          </Button>
        </div>

        {/* Add Goal Form */}
        {isAddingGoal && (
          <Card className="mb-6 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Create New Savings Goal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-slate-300">
                  Goal Title
                </Label>
                <Input
                  id="title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="e.g., Emergency Fund, Vacation to Bali"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount" className="text-slate-300">
                    Target Amount (IDR)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newGoal.target_amount}
                    onChange={(e) => setNewGoal({ ...newGoal, target_amount: e.target.value })}
                    placeholder="50000000"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="date" className="text-slate-300">
                    Target Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={newGoal.target_date}
                    onChange={(e) => setNewGoal({ ...newGoal, target_date: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="category" className="text-slate-300">
                  Category
                </Label>
                <select
                  id="category"
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <Button onClick={addSavingsGoal} className="bg-green-600 hover:bg-green-700">
                  Create Goal
                </Button>
                <Button
                  onClick={() => setIsAddingGoal(false)}
                  variant="outline"
                  className="border-slate-600 text-slate-300"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Savings Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savingsGoals.map((goal) => {
            const progress = calculateProgress(goal.current_amount, goal.target_amount)
            const daysRemaining = getDaysRemaining(goal.target_date)

            return (
              <Card key={goal.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">{goal.title}</CardTitle>
                    <Badge variant="outline" className="border-blue-400 text-blue-400">
                      {goal.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-slate-300 mb-2">
                      <span>Progress</span>
                      <span>{progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current:</span>
                      <span className="text-green-400 font-semibold">{formatCurrency(goal.current_amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Target:</span>
                      <span className="text-blue-400 font-semibold">{formatCurrency(goal.target_amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Remaining:</span>
                      <span className="text-orange-400 font-semibold">
                        {formatCurrency(goal.target_amount - goal.current_amount)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {daysRemaining > 0 ? `${daysRemaining} days remaining` : "Target date passed"}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600 text-slate-300 flex-1 bg-transparent"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Money
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {savingsGoals.length === 0 && (
          <Card className="bg-slate-800/50 border-slate-700 text-center py-12">
            <CardContent>
              <PiggyBank className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Savings Goals Yet</h3>
              <p className="text-slate-400 mb-4">Start your savings journey by creating your first goal!</p>
              <Button
                onClick={() => setIsAddingGoal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Goal
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
