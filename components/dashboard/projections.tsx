"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, Calendar, DollarSign, Target } from "lucide-react";

const projections = [
  {
    title: "Emergency Fund",
    current: 15000000,
    target: 50000000,
    progress: 30,
    timeframe: "12 bulan",
    monthlyContribution: 2900000,
  },
  {
    title: "Investasi Saham",
    current: 25000000,
    target: 100000000,
    progress: 25,
    timeframe: "24 bulan",
    monthlyContribution: 3100000,
  },
  {
    title: "Dana Pensiun",
    current: 75000000,
    target: 500000000,
    progress: 15,
    timeframe: "120 bulan",
    monthlyContribution: 3500000,
  },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DashboardProjections() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-medium uppercase tracking-widest text-[#2E8B57] dark:text-[#85a37a] mb-3 block">
            Proyeksi
          </span>
          <h2 className="text-3xl font-bold text-foreground font-display tracking-tight mb-3">
            Proyeksi keuangan Anda
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Lihat bagaimana investasi dan tabungan Anda akan berkembang dengan perencanaan yang tepat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {projections.map((projection, index) => (
            <Card key={index} className="border-border bg-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-foreground">{projection.title}</CardTitle>
                  <Target className="w-5 h-5 text-[#2E8B57]" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground font-mono tabular-nums">{projection.progress}%</span>
                  </div>
                  <Progress value={projection.progress} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Saat ini</span>
                    <span className="font-medium text-foreground font-mono tabular-nums">
                      {formatCurrency(projection.current)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Target</span>
                    <span className="font-medium text-[#2E8B57] dark:text-[#85a37a] font-mono tabular-nums">
                      {formatCurrency(projection.target)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Per bulan</span>
                    <span className="font-medium text-foreground font-mono tabular-nums">
                      {formatCurrency(projection.monthlyContribution)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Estimasi: {projection.timeframe}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-[#2E8B57] to-[#236B43] text-white border-0">
          <CardContent className="p-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-2xl font-bold font-display mb-2">Total Proyeksi Kekayaan</h3>
                <p className="text-white/80 mb-4">Dalam 10 tahun dengan konsistensi investasi</p>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-6 h-6" />
                  <span className="text-3xl font-bold font-mono tabular-nums">{formatCurrency(1200000000)}</span>
                  <ArrowUpRight className="w-6 h-6 text-white/80" />
                </div>
              </div>
              <Button variant="secondary" size="lg" className="bg-white text-[#236B43] hover:bg-white/90 font-medium">
                Lihat Detail
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}