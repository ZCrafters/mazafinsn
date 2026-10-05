"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { TrendingUp } from "lucide-react";
import { formatCurrency, months } from "../data";
import { MonthlyDataPoint } from "../types";

interface YearlySummaryProps {
  yearlyData: MonthlyDataPoint[];
  selectedYear: number;
}

export function YearlySummary({ yearlyData, selectedYear }: YearlySummaryProps) {
  const totalYearIncome = yearlyData.reduce((sum, d) => sum + d.pendapatan, 0);
  const totalYearExpense = yearlyData.reduce((sum, d) => sum + d.pengeluaran, 0);
  const totalYearBalance = totalYearIncome - totalYearExpense;

  return (
    <Card className="border border-border bg-card shadow-sm mb-8">
      <CardHeader className="border-b border-border/60 pb-4">
        <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          Tren Tahunan ({selectedYear})
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Perbandingan pendapatan dan pengeluaran tiap bulan sepanjang tahun
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5 space-y-6">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" className="text-xs font-mono" />
              <YAxis
                tickFormatter={(val) => `${(val / 1000000).toFixed(0)}M`}
                className="text-xs font-mono"
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "0.5rem",
                  fontSize: "0.75rem",
                }}
              />
              <Line
                type="monotone"
                dataKey="pendapatan"
                stroke="#2E8B57"
                strokeWidth={2.5}
                name="Pendapatan"
              />
              <Line
                type="monotone"
                dataKey="pengeluaran"
                stroke="#d97706"
                strokeWidth={2}
                name="Pengeluaran"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Breakdown table */}
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-xs">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-3 font-semibold text-foreground">Bulan</th>
                <th className="text-right p-3 font-semibold text-foreground">Pendapatan</th>
                <th className="text-right p-3 font-semibold text-foreground">Pengeluaran</th>
                <th className="text-right p-3 font-semibold text-foreground">Saldo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {yearlyData.map((data, index) => (
                <tr key={index} className="hover:bg-muted/30 transition-colors">
                  <td className="p-2.5 font-medium text-foreground">{months[index]}</td>
                  <td className="p-2.5 text-right font-mono tabular-nums text-foreground">
                    {formatCurrency(data.pendapatan)}
                  </td>
                  <td className="p-2.5 text-right font-mono tabular-nums text-muted-foreground">
                    {formatCurrency(data.pengeluaran)}
                  </td>
                  <td
                    className={`p-2.5 text-right font-mono tabular-nums font-semibold ${
                      data.saldo >= 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-destructive"
                    }`}
                  >
                    {formatCurrency(data.saldo)}
                  </td>
                </tr>
              ))}
              <tr className="bg-muted/60 font-bold border-t border-border">
                <td className="p-3 text-foreground">Total Tahunan</td>
                <td className="p-3 text-right font-mono tabular-nums text-foreground">
                  {formatCurrency(totalYearIncome)}
                </td>
                <td className="p-3 text-right font-mono tabular-nums text-muted-foreground">
                  {formatCurrency(totalYearExpense)}
                </td>
                <td
                  className={`p-3 text-right font-mono tabular-nums ${
                    totalYearBalance >= 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-destructive"
                  }`}
                >
                  {formatCurrency(totalYearBalance)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
