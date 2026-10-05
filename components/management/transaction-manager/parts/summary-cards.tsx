"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingUp, TrendingDown, Wallet, AlertTriangle } from "lucide-react";
import { formatCurrency } from "../data";

interface SummaryCardsProps {
  totalIncome: number;
  totalExpense: number;
  currentBalance: number;
  isOverspending: boolean;
  overspendingAmount: number;
  overspendingPercentage: number;
}

export function SummaryCards({
  totalIncome,
  totalExpense,
  currentBalance,
  isOverspending,
  overspendingAmount,
  overspendingPercentage,
}: SummaryCardsProps) {
  return (
    <div className="space-y-6">
      {/* Deficit Alert */}
      {isOverspending && (
        <Alert className="border border-destructive/30 bg-destructive/10 text-destructive rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div className="flex-1 text-sm">
              <strong className="font-semibold block text-foreground">
                Peringatan Defisit Pengeluaran
              </strong>
              <AlertDescription className="text-muted-foreground mt-1 text-xs sm:text-sm">
                Pengeluaran bulan ini melebihi pendapatan sebesar{" "}
                <strong className="font-mono text-destructive">
                  {formatCurrency(overspendingAmount)}
                </strong>{" "}
                ({overspendingPercentage.toFixed(1)}%). Segera evaluasi pos pengeluaran sekunder.
              </AlertDescription>
            </div>
          </div>
        </Alert>
      )}

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Income */}
        <Card className="border border-border bg-card shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Total Pemasukan
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold font-mono tabular-nums text-foreground">
              {formatCurrency(totalIncome)}
            </p>
          </CardContent>
        </Card>

        {/* Total Expense */}
        <Card className="border border-border bg-card shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Total Pengeluaran
              </span>
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <TrendingDown className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold font-mono tabular-nums text-foreground">
              {formatCurrency(totalExpense)}
            </p>
          </CardContent>
        </Card>

        {/* Current Balance */}
        <Card className="border border-border bg-card shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Saldo Bulan Ini
              </span>
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <p
              className={`text-2xl font-bold font-mono tabular-nums ${
                currentBalance >= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-destructive"
              }`}
            >
              {formatCurrency(currentBalance)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
