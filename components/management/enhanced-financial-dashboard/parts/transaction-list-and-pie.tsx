"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { TrendingUp, TrendingDown, ListOrdered, PieChart as PieChartIcon } from "lucide-react";
import { formatCurrency, CHART_COLORS } from "../data";
import { Transaction, CategoryExpensePoint } from "../types";

interface TransactionListAndPieProps {
  filteredTransactions: Transaction[];
  expenseByCategory: CategoryExpensePoint[];
}

export function TransactionListAndPie({
  filteredTransactions,
  expenseByCategory,
}: TransactionListAndPieProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Daftar Transaksi */}
      <Card className="border border-border bg-card shadow-sm flex flex-col">
        <CardHeader className="border-b border-border/60 pb-4">
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <ListOrdered className="w-3.5 h-3.5" />
            </div>
            Daftar Transaksi Periode Ini
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Riwayat arus kas masuk dan keluar yang tercatat pada bulan aktif
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 flex-1">
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm">
                Belum ada transaksi tercatat untuk bulan ini.
              </div>
            ) : (
              filteredTransactions.slice(0, 15).map((transaction) => {
                const isIncome = transaction.type === "income";
                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-background border border-border/70 hover:border-border transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isIncome
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {isIncome ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground leading-snug">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(transaction.date, "dd MMM yyyy", { locale: id })}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className={`font-mono tabular-nums font-semibold text-sm ${
                          isIncome
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-foreground"
                        }`}
                      >
                        {isIncome ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Grafik Pengeluaran per Kategori */}
      <Card className="border border-border bg-card shadow-sm flex flex-col">
        <CardHeader className="border-b border-border/60 pb-4">
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <PieChartIcon className="w-3.5 h-3.5" />
            </div>
            Distribusi Pengeluaran
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Komposisi biaya berdasarkan pos pengeluaran
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 flex-1 flex flex-col items-center justify-center">
          {expenseByCategory.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              Belum ada data pengeluaran untuk bulan ini.
            </div>
          ) : (
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={95}
                    innerRadius={55}
                    dataKey="value"
                    paddingAngle={3}
                  >
                    {expenseByCategory.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                        stroke="hsl(var(--card))"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "0.5rem",
                      fontSize: "0.75rem",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
