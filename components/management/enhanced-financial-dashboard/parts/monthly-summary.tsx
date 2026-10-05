"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BarChart3, TrendingUp, TrendingDown, Wallet, AlertTriangle, Calendar } from "lucide-react";
import { formatCurrency, months } from "../data";

interface MonthlySummaryProps {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  totalIncome: number;
  totalExpense: number;
  currentBalance: number;
  isOverspending: boolean;
  overspendingAmount: number;
  overspendingPercentage: number;
}

export function MonthlySummary({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  totalIncome,
  totalExpense,
  currentBalance,
  isOverspending,
  overspendingAmount,
  overspendingPercentage,
}: MonthlySummaryProps) {
  return (
    <div className="space-y-6 mb-8">
      {/* Overspending Alert */}
      {isOverspending && (
        <Alert className="border border-destructive/30 bg-destructive/10 text-destructive rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div className="flex-1 text-sm">
              <strong className="font-semibold block text-foreground">
                Peringatan Defisit Pengeluaran
              </strong>
              <AlertDescription className="text-muted-foreground mt-1 text-xs sm:text-sm">
                Pengeluaran melampaui pemasukan sebesar{" "}
                <strong className="font-mono text-destructive">
                  {formatCurrency(overspendingAmount)}
                </strong>{" "}
                ({overspendingPercentage.toFixed(1)}% di atas pendapatan). Evaluasi pos biaya tidak mendesak untuk menjaga arus kas tetap sehat.
              </AlertDescription>
            </div>
          </div>
        </Alert>
      )}

      {/* Main Filter & Summary Card */}
      <Card className="border border-border bg-card shadow-sm">
        <CardHeader className="border-b border-border/60 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <BarChart3 className="w-4 h-4" />
                </div>
                Ringkasan Arus Kas Bulanan
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-1">
                Filter periode untuk melihat kinerja pendapatan, belanja, dan saldo bersih
              </CardDescription>
            </div>

            {/* Year & Month Selectors */}
            <div className="flex items-center gap-2">
              <div className="w-28 sm:w-32">
                <Select
                  value={selectedMonth.toString()}
                  onValueChange={(val) => setSelectedMonth(parseInt(val))}
                >
                  <SelectTrigger className="h-9 text-xs border-border bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {months.map((month, idx) => (
                      <SelectItem key={idx} value={idx.toString()} className="text-xs">
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-24 sm:w-28">
                <Select
                  value={selectedYear.toString()}
                  onValueChange={(val) => setSelectedYear(parseInt(val))}
                >
                  <SelectTrigger className="h-9 text-xs border-border bg-background font-mono">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {Array.from(
                      { length: 5 },
                      (_, i) => new Date().getFullYear() - 2 + i
                    ).map((yr) => (
                      <SelectItem key={yr} value={yr.toString()} className="text-xs font-mono">
                        {yr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total Income */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Total Pendapatan
                </span>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-bold font-mono tabular-nums text-foreground">
                {formatCurrency(totalIncome)}
              </p>
            </div>

            {/* Total Expense */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
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
            </div>

            {/* Current Balance */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Saldo Bersih
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
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
