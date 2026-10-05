"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { BarChart3 } from "lucide-react";
import { formatCurrency } from "../data";
import { ProjectionDataPoint } from "../types";

interface ProjectionSummaryProps {
  projectionData: ProjectionDataPoint[];
}

export function ProjectionSummary({ projectionData }: ProjectionSummaryProps) {
  return (
    <Card className="border border-border bg-card shadow-sm mb-8">
      <CardHeader className="border-b border-border/60 pb-4">
        <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <BarChart3 className="w-3.5 h-3.5" />
          </div>
          Proyeksi Akumulasi 5 Tahun
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Simulasi pertumbuhan tabungan berdasarkan rasio pengeluaran saat ini
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5 space-y-6">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="tahun" className="text-xs font-mono" />
              <YAxis
                tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
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
              <Bar dataKey="pendapatan" fill="#2E8B57" name="Pendapatan" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pengeluaran" fill="#d97706" name="Pengeluaran" radius={[4, 4, 0, 0]} />
              <Bar dataKey="penghematan" fill="#85a37a" name="Saldo Tahunan" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Projection table */}
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-xs">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-3 font-semibold text-foreground">Tahun</th>
                <th className="text-right p-3 font-semibold text-foreground">Pendapatan</th>
                <th className="text-right p-3 font-semibold text-foreground">Pengeluaran</th>
                <th className="text-right p-3 font-semibold text-foreground">Pertumbuhan</th>
                <th className="text-right p-3 font-semibold text-foreground">Saldo Tahunan</th>
                <th className="text-right p-3 font-semibold text-foreground">Akumulasi Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projectionData.map((data, index) => (
                <tr key={index} className="hover:bg-muted/30 transition-colors">
                  <td className="p-2.5 font-medium font-mono text-foreground">{data.tahun}</td>
                  <td className="p-2.5 text-right font-mono tabular-nums text-foreground">
                    {formatCurrency(data.pendapatan)}
                  </td>
                  <td className="p-2.5 text-right font-mono tabular-nums text-muted-foreground">
                    {formatCurrency(data.pengeluaran)}
                  </td>
                  <td className="p-2.5 text-right font-mono tabular-nums text-primary font-medium">
                    {data.pertumbuhan.toFixed(1)}%
                  </td>
                  <td className="p-2.5 text-right font-mono tabular-nums text-foreground">
                    {formatCurrency(data.penghematan)}
                  </td>
                  <td className="p-2.5 text-right font-mono tabular-nums font-semibold text-primary">
                    {formatCurrency(data.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
