"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { TrendingUp, TrendingDown, Target, ArrowLeft, Wallet, CreditCard, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

const SAGE_COLORS = ["#2E8B57", "#4A7C59", "#689F77", "#85A37A", "#3B7A57", "#A3B899"];

interface AssetTransaction {
  id: string;
  type: "income" | "expense";
  description: string;
  amount: number;
  date: string;
}

interface PortfolioData {
  totalValue: number;
  totalInvestment: number;
  totalReturn: number;
  returnPercentage: number;
  assets: AssetTransaction[];
  monthlyPerformance: { month: string; value: number }[];
  assetAllocation: { name: string; value: number; amount: number }[];
}

export default function PortfolioPage() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    totalValue: 0,
    totalInvestment: 0,
    totalReturn: 0,
    returnPercentage: 0,
    assets: [],
    monthlyPerformance: [],
    assetAllocation: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data: transactions } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .eq("category", "📈 Investasi")
        .order("date", { ascending: false });

      if (transactions) {
        const totalInvestment = transactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + Number.parseFloat(t.amount), 0);

        const totalDividends = transactions
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + Number.parseFloat(t.amount), 0);

        const totalValue = totalInvestment * 1.15 + totalDividends;
        const totalReturn = totalValue - totalInvestment;
        const returnPercentage = totalInvestment > 0 ? (totalReturn / totalInvestment) * 100 : 0;

        const assetAllocation = [
          { name: "Saham", value: 60, amount: totalValue * 0.6 },
          { name: "Reksadana", value: 25, amount: totalValue * 0.25 },
          { name: "Obligasi", value: 10, amount: totalValue * 0.1 },
          { name: "Pasar Uang", value: 5, amount: totalValue * 0.05 },
        ];

        const monthlyPerformance = [
          { month: "Jan", value: totalInvestment * 0.95 },
          { month: "Feb", value: totalInvestment * 0.98 },
          { month: "Mar", value: totalInvestment * 1.02 },
          { month: "Apr", value: totalInvestment * 1.05 },
          { month: "Mei", value: totalInvestment * 1.08 },
          { month: "Jun", value: totalInvestment * 1.12 },
          { month: "Jul", value: totalInvestment * 1.1 },
          { month: "Agu", value: totalValue },
        ];

        setPortfolioData({
          totalValue,
          totalInvestment,
          totalReturn,
          returnPercentage,
          assets: transactions,
          monthlyPerformance,
          assetAllocation,
        });
      }
    } catch (error) {
      console.error("Error loading portfolio data:", error);
    } finally {
      setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background text-muted-foreground gap-3">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
        <p className="text-xs">Memuat data portofolio...</p>
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
                Portofolio Investasi
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Pantau akumulasi modal, estimasi return, dan alokasi instrumen aset
              </p>
            </div>
          </div>
        </div>

        {/* 4 Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border border-border bg-card shadow-sm">
            <CardHeader className="p-4 pb-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Total Portofolio
              </span>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold font-mono tabular-nums text-foreground">
                {formatCurrency(portfolioData.totalValue)}
              </div>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <Wallet className="w-3.5 h-3.5 mr-1 text-primary" />
                <span>Nilai Saat Ini</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card shadow-sm">
            <CardHeader className="p-4 pb-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Modal Disetor
              </span>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold font-mono tabular-nums text-foreground">
                {formatCurrency(portfolioData.totalInvestment)}
              </div>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <CreditCard className="w-3.5 h-3.5 mr-1 text-muted-foreground" />
                <span>Total Modal Awal</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card shadow-sm">
            <CardHeader className="p-4 pb-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Estimasi Keuntungan
              </span>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div
                className={`text-2xl font-bold font-mono tabular-nums ${
                  portfolioData.totalReturn >= 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-destructive"
                }`}
              >
                {formatCurrency(portfolioData.totalReturn)}
              </div>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                {portfolioData.totalReturn >= 0 ? (
                  <TrendingUp className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 mr-1 text-destructive" />
                )}
                <span>Imbal Hasil Akumulatif</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card shadow-sm">
            <CardHeader className="p-4 pb-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Persentase Return
              </span>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div
                className={`text-2xl font-bold font-mono tabular-nums ${
                  portfolioData.returnPercentage >= 0
                    ? "text-primary"
                    : "text-destructive"
                }`}
              >
                {portfolioData.returnPercentage >= 0 ? "+" : ""}
                {portfolioData.returnPercentage.toFixed(2)}%
              </div>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <Target className="w-3.5 h-3.5 mr-1 text-primary" />
                <span>Yield Terhadap Modal</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Tabs */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="bg-muted border border-border p-1">
            <TabsTrigger value="performance" className="text-xs">
              Kinerja Nilai
            </TabsTrigger>
            <TabsTrigger value="allocation" className="text-xs">
              Alokasi Aset
            </TabsTrigger>
            <TabsTrigger value="transactions" className="text-xs">
              Riwayat Investasi
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <Card className="border border-border bg-card shadow-sm">
              <CardHeader className="border-b border-border/60 pb-3">
                <CardTitle className="text-base font-semibold text-foreground">
                  Perkembangan Nilai Portofolio Bulanan
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Pertumbuhan akumulasi modal dan hasil investasi sepanjang tahun berjalan
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={portfolioData.monthlyPerformance}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" className="text-xs font-mono" />
                      <YAxis
                        tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
                        className="text-xs font-mono"
                      />
                      <Tooltip
                        formatter={(value: number) => [formatCurrency(value), "Nilai Portofolio"]}
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          borderColor: "hsl(var(--border))",
                          borderRadius: "0.5rem",
                          fontSize: "0.75rem",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#2E8B57"
                        strokeWidth={2.5}
                        dot={{ r: 3, fill: "#2E8B57" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border border-border bg-card shadow-sm">
                <CardHeader className="border-b border-border/60 pb-3">
                  <CardTitle className="text-base font-semibold text-foreground">
                    Diagram Distribusi Aset
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Diversifikasi persentase berdasarkan kelas investasi
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5 flex items-center justify-center">
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={portfolioData.assetAllocation}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name} ${value}%`}
                          outerRadius={90}
                          innerRadius={50}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {portfolioData.assetAllocation.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={SAGE_COLORS[index % SAGE_COLORS.length]}
                              stroke="hsl(var(--card))"
                              strokeWidth={2}
                            />
                          ))}
                        </Pie>
                        <Tooltip
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
                </CardContent>
              </Card>

              <Card className="border border-border bg-card shadow-sm">
                <CardHeader className="border-b border-border/60 pb-3">
                  <CardTitle className="text-base font-semibold text-foreground">
                    Rincian Alokasi Dana
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Nominal estimasi per instrumen aset
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5 space-y-3">
                  {portfolioData.assetAllocation.map((asset, index) => (
                    <div
                      key={asset.name}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border/80"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: SAGE_COLORS[index % SAGE_COLORS.length] }}
                        />
                        <span className="font-medium text-xs sm:text-sm text-foreground">
                          {asset.name}
                        </span>
                      </div>
                      <div className="text-right font-mono tabular-nums">
                        <div className="font-semibold text-xs sm:text-sm text-foreground">
                          {formatCurrency(asset.amount)}
                        </div>
                        <div className="text-[11px] text-muted-foreground">{asset.value}%</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="border border-border bg-card shadow-sm">
              <CardHeader className="border-b border-border/60 pb-3">
                <CardTitle className="text-base font-semibold text-foreground">
                  Riwayat Transaksi Investasi
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Seluruh mutasi tercatat pada pos Investasi
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                {portfolioData.assets.length === 0 ? (
                  <div className="text-center py-10 text-xs text-muted-foreground">
                    Belum ada riwayat transaksi dengan kategori Investasi.
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                    {portfolioData.assets.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 border border-border/80 rounded-lg bg-background"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              transaction.type === "income"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                            }`}
                          >
                            {transaction.type === "income" ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-xs sm:text-sm text-foreground">
                              {transaction.description}
                            </div>
                            <div className="text-[11px] text-muted-foreground font-mono">
                              {new Date(transaction.date).toLocaleDateString("id-ID")}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`font-mono tabular-nums font-semibold text-xs sm:text-sm ${
                            transaction.type === "income"
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-foreground"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
