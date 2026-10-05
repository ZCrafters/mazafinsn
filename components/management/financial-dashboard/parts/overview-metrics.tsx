"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, DollarSign } from "lucide-react";
import { formatCurrency } from "../data";
import { FinancialData } from "../types";

interface OverviewMetricsProps {
  financialData: FinancialData;
  netWorth: number;
}

export function OverviewMetrics({ financialData, netWorth }: OverviewMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Saldo */}
      <Card className="bg-card border border-border shadow-sm hover:border-primary/40 transition-colors">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Total Saldo
              </p>
              <p className="text-2xl font-bold font-mono tabular-nums text-foreground">
                {formatCurrency(financialData.totalBalance)}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pendapatan Bulan Ini */}
      <Card className="bg-card border border-border shadow-sm hover:border-primary/40 transition-colors">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Pendapatan Bulan Ini
              </p>
              <p className="text-2xl font-bold font-mono tabular-nums text-foreground">
                {formatCurrency(financialData.monthlyIncome)}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pengeluaran Bulan Ini */}
      <Card className="bg-card border border-border shadow-sm hover:border-primary/40 transition-colors">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Pengeluaran Bulan Ini
              </p>
              <p className="text-2xl font-bold font-mono tabular-nums text-foreground">
                {formatCurrency(financialData.monthlyExpenses)}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Net Worth */}
      <Card className="bg-card border border-border shadow-sm hover:border-primary/40 transition-colors">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Kekayaan Bersih (Net Worth)
              </p>
              <p className="text-2xl font-bold font-mono tabular-nums text-foreground">
                {formatCurrency(netWorth)}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
