"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Banknote, Calendar, Eye } from "lucide-react";
import { formatCurrency } from "../data";
import { FinancialData } from "../types";

interface SavingsAndInvestmentsProps {
  financialData: FinancialData;
  savingsRate: number;
  goalProgress: number;
  onOpenAddTransaction: () => void;
  onOpenBudget: () => void;
  onResetBudgets: () => void;
  onOpenPortfolio: () => void;
}

export function SavingsAndInvestments({
  financialData,
  savingsRate,
  goalProgress,
  onOpenAddTransaction,
  onOpenBudget,
  onResetBudgets,
  onOpenPortfolio,
}: SavingsAndInvestmentsProps) {
  return (
    <div className="space-y-6">
      {/* Target Tabungan */}
      <Card className="border border-border bg-card shadow-sm">
        <CardHeader className="border-b border-border/60 pb-3">
          <CardTitle className="flex items-center gap-2 text-foreground text-base">
            <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Target className="w-3.5 h-3.5" />
            </div>
            Target Tabungan
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <div className="text-center mb-5">
            <div className="text-3xl font-bold font-mono tabular-nums text-primary mb-1">
              {savingsRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              rasio tabungan terhadap pendapatan bulanan
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono tabular-nums text-muted-foreground">
              <span>Progress Capaian</span>
              <span className="font-semibold text-foreground">{goalProgress.toFixed(1)}%</span>
            </div>
            <Progress value={Math.min(goalProgress, 100)} className="h-2" />
            <div className="flex justify-between text-xs pt-1">
              <span className="text-muted-foreground">
                Terkumpul: <strong className="text-foreground font-mono">{formatCurrency(financialData.savings)}</strong>
              </span>
              <span className="text-muted-foreground">
                Target: <strong className="text-primary font-mono">{formatCurrency(financialData.savingsGoal)}</strong>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aksi Cepat */}
      <Card className="border border-border bg-card shadow-sm">
        <CardHeader className="border-b border-border/60 pb-3">
          <CardTitle className="text-foreground text-base">Aksi Cepat</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Akses langsung fungsi pencatatan utama
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 space-y-2.5">
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium justify-start h-10"
            onClick={onOpenAddTransaction}
          >
            <Banknote className="w-4 h-4 mr-2" />
            Catat Transaksi
          </Button>
          <Button
            variant="outline"
            className="w-full border-border text-foreground hover:bg-muted font-medium justify-start h-10"
            onClick={onOpenBudget}
          >
            <Target className="w-4 h-4 mr-2 text-primary" />
            Atur Pos Anggaran
          </Button>
          <Button
            variant="outline"
            className="w-full border-border text-foreground hover:bg-muted font-medium justify-start h-10"
            onClick={onResetBudgets}
          >
            <Target className="w-4 h-4 mr-2 text-muted-foreground" />
            Reset Pemakaian Budget
          </Button>
          <Button
            variant="outline"
            className="w-full border-border text-muted-foreground hover:text-foreground hover:bg-muted font-medium justify-start h-10"
            onClick={() => {}}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Jadwal Rutin
          </Button>
        </CardContent>
      </Card>

      {/* Ringkasan Investasi */}
      <Card className="border border-border bg-card shadow-sm">
        <CardHeader className="border-b border-border/60 pb-3">
          <CardTitle className="text-foreground text-base">Ringkasan Portofolio</CardTitle>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          <div className="space-y-2.5">
            <div className="flex justify-between items-center p-2.5 bg-muted/40 rounded-lg text-sm">
              <span className="text-muted-foreground text-xs">Total Investasi</span>
              <span className="font-semibold font-mono tabular-nums text-foreground">
                {formatCurrency(financialData.investments)}
              </span>
            </div>
            <div className="flex justify-between items-center p-2.5 bg-muted/40 rounded-lg text-sm">
              <span className="text-muted-foreground text-xs">Estimasi Return YTD</span>
              <span className="font-semibold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                {financialData.investments > 0 ? "+12.5%" : "0%"}
              </span>
            </div>
            <div className="flex justify-between items-center p-2.5 bg-muted/40 rounded-lg text-sm">
              <span className="text-muted-foreground text-xs">Diversifikasi</span>
              <Badge variant="secondary" className="text-xs font-medium">
                {financialData.investments > 0 ? "Baik" : "Belum Ada"}
              </Badge>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-border hover:border-primary/50 text-foreground font-medium h-10"
            onClick={onOpenPortfolio}
          >
            <Eye className="w-4 h-4 mr-2" />
            Rincian Alokasi Asset
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
