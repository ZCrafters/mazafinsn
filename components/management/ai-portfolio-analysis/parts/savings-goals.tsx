"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Target, Plus } from "lucide-react";
import { SavingsGoal } from "../types";

interface SavingsGoalsProps {
  savingsGoals: SavingsGoal[];
  onAddGoal: (goal: {
    title: string;
    target: number;
    deadline: string;
    category: string;
  }) => void;
}

export function SavingsGoals({ savingsGoals, onAddGoal }: SavingsGoalsProps) {
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    target: 0,
    deadline: "",
    category: "savings",
  });

  const handleSave = () => {
    if (!newGoal.title || newGoal.target <= 0 || !newGoal.deadline) return;
    onAddGoal(newGoal);
    setNewGoal({ title: "", target: 0, deadline: "", category: "savings" });
    setShowGoalForm(false);
  };

  return (
    <Card className="border border-border bg-card shadow-sm">
      <CardHeader className="border-b border-border/60 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Target className="w-3.5 h-3.5" />
              </div>
              Target Tabungan Personal
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Rencana pengumpulan dana jangka menengah dan panjang
            </CardDescription>
          </div>
          <Button
            size="sm"
            onClick={() => setShowGoalForm(!showGoalForm)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-8"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Tambah Target
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {/* Goal list */}
        <div className="space-y-3">
          {savingsGoals.map((goal) => {
            const pct = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;
            return (
              <div
                key={goal.id}
                className="p-3.5 bg-background rounded-lg border border-border/80 space-y-2"
              >
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{goal.title}</span>
                    <Badge variant="secondary" className="text-[11px] font-normal">
                      {goal.category}
                    </Badge>
                  </div>
                  <span className="text-muted-foreground text-xs font-mono">
                    Tenggat: {new Date(goal.deadline).toLocaleDateString("id-ID")}
                  </span>
                </div>

                <Progress value={Math.min(pct, 100)} className="h-2" />

                <div className="flex justify-between items-center text-xs font-mono tabular-nums">
                  <span className="text-foreground font-semibold">
                    Rp {Math.round(goal.current).toLocaleString("id-ID")}
                  </span>
                  <span className="text-muted-foreground">
                    Target: Rp {goal.target.toLocaleString("id-ID")} ({pct.toFixed(0)}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add goal inline form */}
        {showGoalForm && (
          <div className="p-4 bg-muted/40 rounded-xl border border-border space-y-3 pt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Formulir Sasaran Finansial Baru
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-foreground">Nama Target</Label>
                <Input
                  placeholder="Contoh: Beli Rumah, Laptop Kerja"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="text-xs h-9 bg-background"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-foreground">Nominal Sasaran (IDR)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newGoal.target || ""}
                  onChange={(e) => setNewGoal({ ...newGoal, target: Number(e.target.value) })}
                  className="text-xs h-9 font-mono tabular-nums bg-background"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-foreground">Batas Waktu Target</Label>
                <Input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="text-xs h-9 bg-background"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-foreground">Kategori</Label>
                <Select
                  value={newGoal.category}
                  onValueChange={(val) => setNewGoal({ ...newGoal, category: val })}
                >
                  <SelectTrigger className="text-xs h-9 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="savings" className="text-xs">Tabungan</SelectItem>
                    <SelectItem value="emergency" className="text-xs">Dana Darurat</SelectItem>
                    <SelectItem value="lifestyle" className="text-xs">Gaya Hidup</SelectItem>
                    <SelectItem value="investment" className="text-xs">Investasi</SelectItem>
                    <SelectItem value="education" className="text-xs">Pendidikan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowGoalForm(false)}
                className="text-xs h-8"
              >
                Batal
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-8"
              >
                Simpan Target (+25 Poin)
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
