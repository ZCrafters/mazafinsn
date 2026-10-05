"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Target, Calendar, Plus, ArrowLeft, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface SavingsGoal {
  id: string;
  title: string;
  target_amount: number;
  current_amount: number;
  target_date: string;
  category: string;
  created_at: string;
}

export default function SavingsTracker() {
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newGoal, setNewGoal] = useState({
    title: "",
    target_amount: "",
    target_date: "",
    category: "🎯 Umum",
  });

  const categories = [
    "🎯 Umum",
    "🏠 Rumah",
    "🚗 Kendaraan",
    "✈️ Liburan",
    "💍 Pernikahan",
    "🎓 Pendidikan",
    "🏥 Kesehatan",
    "📱 Gadget",
  ];

  useEffect(() => {
    loadSavingsGoals();
  }, []);

  const loadSavingsGoals = async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data } = await supabase
        .from("savings_goals")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) {
        setSavingsGoals(data);
      }
    } catch (error) {
      console.error("Error loading savings goals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addSavingsGoal = async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      await supabase.from("savings_goals").insert({
        user_id: user.id,
        title: newGoal.title,
        target_amount: Number.parseFloat(newGoal.target_amount),
        current_amount: 0,
        target_date: newGoal.target_date,
        category: newGoal.category,
      });

      setNewGoal({ title: "", target_amount: "", target_date: "", category: "🎯 Umum" });
      setIsAddingGoal(false);
      loadSavingsGoals();
    } catch (error) {
      console.error("Error adding savings goal:", error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (current: number, target: number) => {
    if (!target || target <= 0) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background text-muted-foreground gap-3">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
        <p className="text-xs">Memuat pelacak tabungan...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/70">
          <div className="flex items-center gap-4">
            <Link href="/management">
              <Button variant="outline" size="sm" className="border-border text-foreground h-9">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Kembali
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground">
                Pelacak Tabungan
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Pantau perkembangan tabungan impian dan sisa waktu target
              </p>
            </div>
          </div>

          <Button
            onClick={() => setIsAddingGoal(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-9 text-xs sm:text-sm"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Tambah Sasaran
          </Button>
        </div>

        {/* Add Goal Form */}
        {isAddingGoal && (
          <Card className="border border-border bg-card shadow-sm">
            <CardHeader className="border-b border-border/60 pb-3">
              <CardTitle className="text-base font-semibold text-foreground">
                Buat Sasaran Tabungan Baru
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Masukkan detail rencana tabungan Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="title" className="text-xs font-medium text-foreground">
                  Nama Sasaran
                </Label>
                <Input
                  id="title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="Contoh: Dana Darurat, Wisata ke Jepang"
                  className="bg-background border-border h-9 text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="amount" className="text-xs font-medium text-foreground">
                    Target Nominal (IDR)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newGoal.target_amount}
                    onChange={(e) => setNewGoal({ ...newGoal, target_amount: e.target.value })}
                    placeholder="50000000"
                    className="bg-background border-border h-9 text-xs sm:text-sm font-mono tabular-nums"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="date" className="text-xs font-medium text-foreground">
                    Batas Waktu Target
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={newGoal.target_date}
                    onChange={(e) => setNewGoal({ ...newGoal, target_date: e.target.value })}
                    className="bg-background border-border h-9 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="category" className="text-xs font-medium text-foreground">
                  Kategori
                </Label>
                <Select
                  value={newGoal.category}
                  onValueChange={(val) => setNewGoal({ ...newGoal, category: val })}
                >
                  <SelectTrigger className="bg-background border-border h-9 text-xs sm:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="text-xs sm:text-sm">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 justify-end pt-2 border-t border-border/60">
                <Button
                  onClick={() => setIsAddingGoal(false)}
                  variant="outline"
                  size="sm"
                  className="border-border text-foreground h-9 text-xs"
                >
                  Batal
                </Button>
                <Button
                  onClick={addSavingsGoal}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 text-xs font-medium"
                >
                  Simpan Sasaran
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Savings Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {savingsGoals.map((goal) => {
            const progress = calculateProgress(goal.current_amount, goal.target_amount);
            const daysRemaining = getDaysRemaining(goal.target_date);

            return (
              <Card key={goal.id} className="border border-border bg-card shadow-sm hover:border-primary/40 transition-colors">
                <CardHeader className="pb-3 border-b border-border/40">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-base font-semibold text-foreground truncate">
                      {goal.title}
                    </CardTitle>
                    <Badge variant="secondary" className="text-[11px] font-normal flex-shrink-0">
                      {goal.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono tabular-nums">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-foreground">{progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <div className="space-y-2 text-xs font-mono tabular-nums">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Terkumpul:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        {formatCurrency(goal.current_amount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Target Sasaran:</span>
                      <span className="text-foreground font-semibold">
                        {formatCurrency(goal.target_amount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sisa Dana:</span>
                      <span className="text-primary font-semibold">
                        {formatCurrency(Math.max(0, goal.target_amount - goal.current_amount))}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1 border-t border-border/60">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>
                      {daysRemaining > 0
                        ? `Sisa ${daysRemaining} hari lagi`
                        : daysRemaining === 0
                        ? "Batas target hari ini"
                        : "Batas waktu telah berlalu"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {savingsGoals.length === 0 && !isAddingGoal && (
          <Card className="border border-border bg-card text-center p-12">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1">
              Belum Ada Target Tersimpan
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-4">
              Mulai lacak kemajuan tabungan Anda dengan membuat sasaran baru sekarang.
            </p>
            <Button
              onClick={() => setIsAddingGoal(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-9 font-medium"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Buat Sasaran Tabungan
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
