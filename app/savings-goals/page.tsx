"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, ArrowLeft, Target, Calendar, Trash2, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface SavingsGoalItem {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  target_date: string;
  description: string;
}

export default function SavingsGoalsPage() {
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoalItem[]>([]);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newGoal, setNewGoal] = useState({
    name: "",
    target_amount: 0,
    current_amount: 0,
    target_date: "",
    description: "",
  });

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

      const { data: goals } = await supabase
        .from("savings_goals")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (goals) {
        setSavingsGoals(goals);
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

      const { error } = await supabase.from("savings_goals").insert({
        user_id: user.id,
        ...newGoal,
      });

      if (!error) {
        setNewGoal({
          name: "",
          target_amount: 0,
          current_amount: 0,
          target_date: "",
          description: "",
        });
        setIsAddGoalOpen(false);
        loadSavingsGoals();
      }
    } catch (error) {
      console.error("Error adding savings goal:", error);
    }
  };

  const updateGoalProgress = async (goalId: string, newAmount: number) => {
    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("savings_goals")
        .update({ current_amount: newAmount })
        .eq("id", goalId);

      if (!error) {
        loadSavingsGoals();
      }
    } catch (error) {
      console.error("Error updating goal progress:", error);
    }
  };

  const deleteGoal = async (goalId: string) => {
    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("savings_goals")
        .delete()
        .eq("id", goalId);

      if (!error) {
        loadSavingsGoals();
      }
    } catch (error) {
      console.error("Error deleting goal:", error);
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

  const calculateDaysRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background text-muted-foreground gap-3">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
        <p className="text-xs">Memuat target tabungan...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
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
                Target Tabungan
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Tetapkan pos tujuan masa depan dan catat setoran berkala
              </p>
            </div>
          </div>

          <Button
            onClick={() => setIsAddGoalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-9 text-xs sm:text-sm"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Tambah Target Baru
          </Button>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {savingsGoals.map((goal) => {
            const progress = goal.target_amount > 0 ? (goal.current_amount / goal.target_amount) * 100 : 0;
            const daysRemaining = calculateDaysRemaining(goal.target_date);

            return (
              <Card key={goal.id} className="border border-border bg-card shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-3 right-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteGoal(goal.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    title="Hapus Target"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <CardHeader className="pb-3 pr-10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold text-foreground leading-snug">
                        {goal.name}
                      </CardTitle>
                      {goal.description && (
                        <CardDescription className="text-xs text-muted-foreground line-clamp-1">
                          {goal.description}
                        </CardDescription>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-1">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono tabular-nums">
                      <span className="text-muted-foreground">Progress Capaian</span>
                      <span className="font-semibold text-foreground">{progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={Math.min(progress, 100)} className="h-2" />
                    <div className="flex justify-between text-xs font-mono tabular-nums text-muted-foreground pt-0.5">
                      <span className="text-foreground font-semibold">
                        {formatCurrency(goal.current_amount)}
                      </span>
                      <span>Target: {formatCurrency(goal.target_amount)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>
                      {daysRemaining > 0
                        ? `Sisa ${daysRemaining} hari lagi`
                        : daysRemaining === 0
                        ? "Batas waktu hari ini"
                        : `Lewat ${Math.abs(daysRemaining)} hari`}
                    </span>
                  </div>

                  {/* Add Money inline input */}
                  <div className="flex gap-2 pt-2 border-t border-border/60">
                    <Input
                      type="number"
                      placeholder="Setor tabungan (IDR)"
                      className="h-8 text-xs font-mono tabular-nums bg-background"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const target = e.target as HTMLInputElement;
                          const val = Number.parseFloat(target.value || "0");
                          if (val > 0) {
                            updateGoalProgress(goal.id, goal.current_amount + val);
                            target.value = "";
                          }
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs border-border text-foreground hover:bg-muted"
                      onClick={(e) => {
                        const btn = e.currentTarget;
                        const input = btn.parentElement?.querySelector("input") as HTMLInputElement;
                        if (input) {
                          const val = Number.parseFloat(input.value || "0");
                          if (val > 0) {
                            updateGoalProgress(goal.id, goal.current_amount + val);
                            input.value = "";
                          }
                        }
                      }}
                    >
                      Setor
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {savingsGoals.length === 0 && (
          <Card className="border border-border bg-card p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1">
              Belum Ada Target Tabungan
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-4">
              Mulai perjalanan menabung terencana dengan menetapkan target pertama Anda.
            </p>
            <Button
              onClick={() => setIsAddGoalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs h-9"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Buat Target Pertama
            </Button>
          </Card>
        )}

        {/* Add Goal Dialog */}
        <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
          <DialogContent className="max-w-md bg-card text-foreground border-border">
            <DialogHeader className="pb-3 border-b border-border/60">
              <DialogTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Tambah Target Tabungan
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Tentukan nama, nominal sasaran, dan batas waktu target Anda
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-foreground">Nama Target</Label>
                <Input
                  placeholder="Contoh: Dana Rumah, Liburan"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  className="bg-background border-border h-9 text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-foreground">Target Nominal (IDR)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newGoal.target_amount || ""}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, target_amount: Number(e.target.value) })
                  }
                  className="bg-background border-border h-9 text-xs sm:text-sm font-mono tabular-nums"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-foreground">Batas Waktu (Target Date)</Label>
                <Input
                  type="date"
                  value={newGoal.target_date}
                  onChange={(e) => setNewGoal({ ...newGoal, target_date: e.target.value })}
                  className="bg-background border-border h-9 text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-foreground">Keterangan Tambahan</Label>
                <Input
                  placeholder="Contoh: Tabungan rutin tiap tanggal 25"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  className="bg-background border-border h-9 text-xs sm:text-sm"
                />
              </div>
            </div>

            <DialogFooter className="gap-2 pt-4 border-t border-border/60">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddGoalOpen(false)}
                className="border-border text-foreground h-9 text-xs flex-1"
              >
                Batal
              </Button>
              <Button
                size="sm"
                onClick={addSavingsGoal}
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 text-xs font-medium flex-1"
              >
                Simpan Target
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
