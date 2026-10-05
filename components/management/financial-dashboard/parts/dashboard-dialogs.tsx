"use client";

import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Brain, BarChart3, Loader2, TrendingUpIcon, AlertTriangle, Target } from "lucide-react";
import { formatCurrency } from "../data";
import { FinancialData, AIAnalysisResult } from "../types";

interface DashboardDialogsProps {
  financialData: FinancialData;
  inputData: FinancialData;
  setInputData: Dispatch<SetStateAction<FinancialData>>;
  isManualInputOpen: boolean;
  setIsManualInputOpen: (open: boolean) => void;
  handleSaveManualInput: () => void;

  isAddTransactionOpen: boolean;
  setIsAddTransactionOpen: (open: boolean) => void;
  newTransaction: {
    type: string;
    description: string;
    amount: number;
    category: string;
  };
  setNewTransaction: Dispatch<
    SetStateAction<{
      type: string;
      description: string;
      amount: number;
      category: string;
    }>
  >;
  handleAddTransaction: () => void;

  isBudgetOpen: boolean;
  setIsBudgetOpen: (open: boolean) => void;
  newBudget: {
    name: string;
    budget: number;
  };
  setNewBudget: Dispatch<
    SetStateAction<{
      name: string;
      budget: number;
    }>
  >;
  handleAddBudget: () => void;

  isResetDialogOpen: boolean;
  setIsResetDialogOpen: (open: boolean) => void;
  handleResetAllData: () => void;

  isAIAnalysisOpen: boolean;
  setIsAIAnalysisOpen: (open: boolean) => void;
  isAnalyzing: boolean;
  aiAnalysis: AIAnalysisResult | null;

  isProjectionOpen: boolean;
  setIsProjectionOpen: (open: boolean) => void;
  projectionData: Array<{
    year: number;
    balance: number;
    investments: number;
    savings: number;
  }>;

  isPortfolioOpen: boolean;
  setIsPortfolioOpen: (open: boolean) => void;
}

export function DashboardDialogs({
  financialData,
  inputData,
  setInputData,
  isManualInputOpen,
  setIsManualInputOpen,
  handleSaveManualInput,
  isAddTransactionOpen,
  setIsAddTransactionOpen,
  newTransaction,
  setNewTransaction,
  handleAddTransaction,
  isBudgetOpen,
  setIsBudgetOpen,
  newBudget,
  setNewBudget,
  handleAddBudget,
  isResetDialogOpen,
  setIsResetDialogOpen,
  handleResetAllData,
  isAIAnalysisOpen,
  setIsAIAnalysisOpen,
  isAnalyzing,
  aiAnalysis,
  isProjectionOpen,
  setIsProjectionOpen,
  projectionData,
  isPortfolioOpen,
  setIsPortfolioOpen,
}: DashboardDialogsProps) {
  return (
    <>
      {/* Manual Input Dialog */}
      <Dialog open={isManualInputOpen} onOpenChange={setIsManualInputOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground text-lg">
              Input Data Keuangan Mandiri
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Perbarui ringkasan saldo, pendapatan, dan alokasi dana secara langsung
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">
            <div className="space-y-1.5">
              <Label htmlFor="totalBalance" className="text-xs font-medium text-foreground">
                Total Saldo (IDR)
              </Label>
              <Input
                id="totalBalance"
                type="number"
                value={inputData.totalBalance || ""}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    totalBalance: Number(e.target.value),
                  })
                }
                className="font-mono tabular-nums border-border focus:ring-primary"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="monthlyIncome" className="text-xs font-medium text-foreground">
                Pendapatan Bulanan (IDR)
              </Label>
              <Input
                id="monthlyIncome"
                type="number"
                value={inputData.monthlyIncome || ""}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    monthlyIncome: Number(e.target.value),
                  })
                }
                className="font-mono tabular-nums border-border focus:ring-primary"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="monthlyExpenses" className="text-xs font-medium text-foreground">
                Pengeluaran Bulanan (IDR)
              </Label>
              <Input
                id="monthlyExpenses"
                type="number"
                value={inputData.monthlyExpenses || ""}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    monthlyExpenses: Number(e.target.value),
                  })
                }
                className="font-mono tabular-nums border-border focus:ring-primary"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="savings" className="text-xs font-medium text-foreground">
                Tabungan (IDR)
              </Label>
              <Input
                id="savings"
                type="number"
                value={inputData.savings || ""}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    savings: Number(e.target.value),
                  })
                }
                className="font-mono tabular-nums border-border focus:ring-primary"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="investments" className="text-xs font-medium text-foreground">
                Investasi (IDR)
              </Label>
              <Input
                id="investments"
                type="number"
                value={inputData.investments || ""}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    investments: Number(e.target.value),
                  })
                }
                className="font-mono tabular-nums border-border focus:ring-primary"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="debts" className="text-xs font-medium text-foreground">
                Hutang / Kewajiban (IDR)
              </Label>
              <Input
                id="debts"
                type="number"
                value={inputData.debts || ""}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    debts: Number(e.target.value),
                  })
                }
                className="font-mono tabular-nums border-border focus:ring-primary"
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsManualInputOpen(false)}
              className="border-border text-foreground"
            >
              Batal
            </Button>
            <Button
              onClick={handleSaveManualInput}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Transaction Dialog */}
      <Dialog
        open={isAddTransactionOpen}
        onOpenChange={setIsAddTransactionOpen}
      >
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground text-lg">
              Tambah Transaksi Baru
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Catat mutasi arus kas masuk atau keluar
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-3">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-foreground">
                Tipe Transaksi
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={newTransaction.type === "income" ? "default" : "outline"}
                  onClick={() =>
                    setNewTransaction({ ...newTransaction, type: "income" })
                  }
                  className={
                    newTransaction.type === "income"
                      ? "bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }
                >
                  Pemasukan (+)
                </Button>
                <Button
                  type="button"
                  variant={newTransaction.type === "expense" ? "default" : "outline"}
                  onClick={() =>
                    setNewTransaction({ ...newTransaction, type: "expense" })
                  }
                  className={
                    newTransaction.type === "expense"
                      ? "bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }
                >
                  Pengeluaran (-)
                </Button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-xs font-medium text-foreground">
                Keterangan
              </Label>
              <Input
                id="description"
                placeholder="Contoh: Gaji bulanan, Kopi, Belanja"
                value={newTransaction.description}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    description: e.target.value,
                  })
                }
                className="border-border text-foreground focus:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="amount" className="text-xs font-medium text-foreground">
                Nominal (IDR)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0"
                value={newTransaction.amount || ""}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    amount: Number(e.target.value),
                  })
                }
                className="font-mono tabular-nums border-border text-foreground focus:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="category" className="text-xs font-medium text-foreground">
                Kategori
              </Label>
              <Input
                id="category"
                placeholder="Contoh: Makanan, Transport, Investasi"
                value={newTransaction.category}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    category: e.target.value,
                  })
                }
                className="border-border text-foreground focus:ring-primary"
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsAddTransactionOpen(false)}
              className="border-border text-foreground"
            >
              Batal
            </Button>
            <Button
              onClick={handleAddTransaction}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Simpan Transaksi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Budget Dialog */}
      <Dialog open={isBudgetOpen} onOpenChange={setIsBudgetOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground text-lg">
              Tambah Alokasi Budget Baru
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Tentukan batas alokasi pengeluaran per bulan
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-3">
            <div className="space-y-1.5">
              <Label htmlFor="budgetName" className="text-xs font-medium text-foreground">
                Nama Kategori
              </Label>
              <Input
                id="budgetName"
                value={newBudget.name}
                onChange={(e) =>
                  setNewBudget({ ...newBudget, name: e.target.value })
                }
                className="border-border text-foreground focus:ring-primary"
                placeholder="Contoh: Kebutuhan Pokok, Hiburan"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="budgetAmount" className="text-xs font-medium text-foreground">
                Batas Anggaran (IDR)
              </Label>
              <Input
                id="budgetAmount"
                type="number"
                value={newBudget.budget || ""}
                onChange={(e) =>
                  setNewBudget({
                    ...newBudget,
                    budget: Number(e.target.value),
                  })
                }
                className="font-mono tabular-nums border-border text-foreground focus:ring-primary"
                placeholder="0"
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsBudgetOpen(false)}
              className="border-border text-foreground"
            >
              Batal
            </Button>
            <Button
              onClick={handleAddBudget}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Simpan Pos Budget
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Confirmation Dialog */}
      <AlertDialog
        open={isResetDialogOpen}
        onOpenChange={setIsResetDialogOpen}
      >
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive text-lg">
              Reset Semua Data Keuangan?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-sm">
              Tindakan ini akan mengembalikan semua data ringkasan, riwayat transaksi, dan anggaran kembali ke kondisi awal.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border text-foreground">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleResetAllData}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Ya, Reset Data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* AI Analysis Dialog */}
      <Dialog open={isAIAnalysisOpen} onOpenChange={setIsAIAnalysisOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground text-lg flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Brain className="w-4 h-4" />
              </div>
              Analisis Portofolio & Keuangan AI
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Evaluasi kondisi keuangan menyeluruh berbasis pola arus kas
            </DialogDescription>
          </DialogHeader>

          <div className="py-3">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-3">
                <Loader2 className="w-7 h-7 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground font-medium">
                  Menganalisis data portofolio dan tren transaksi...
                </span>
              </div>
            ) : aiAnalysis ? (
              <div className="space-y-4">
                {/* Insights */}
                <div className="p-4 rounded-lg bg-muted/40 border border-border/80 space-y-2">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <TrendingUpIcon className="w-4 h-4 text-primary" />
                    Insight Keuangan
                  </h3>
                  <ul className="space-y-1.5 text-sm text-muted-foreground pl-1">
                    {aiAnalysis.insights?.map((insight: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Warnings */}
                {aiAnalysis.warnings && aiAnalysis.warnings.length > 0 && (
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 space-y-2">
                    <h3 className="text-sm font-semibold text-destructive flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Peringatan Risiko
                    </h3>
                    <ul className="space-y-1.5 text-sm text-destructive/90 pl-1">
                      {aiAnalysis.warnings.map((warning: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0" />
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-2">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Rekomendasi Tindakan
                  </h3>
                  <ul className="space-y-1.5 text-sm text-foreground/90 pl-1">
                    {aiAnalysis.recommendations?.map(
                      (recommendation: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>{recommendation}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-sm text-muted-foreground">
                Klik tombol analisis untuk memproses evaluasi.
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAIAnalysisOpen(false)}
              className="border-border text-foreground"
            >
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 5-Year Projection Dialog */}
      <Dialog open={isProjectionOpen} onOpenChange={setIsProjectionOpen}>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground text-lg flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <BarChart3 className="w-4 h-4" />
              </div>
              Simulasi Proyeksi Keuangan 5 Tahun
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Visualisasi estimasi akumulasi saldo, investasi, dan tabungan
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Line Chart */}
              <Card className="bg-background border-border">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-medium text-foreground">
                    Proyeksi Saldo & Investasi
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={projectionData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="year" className="text-xs font-mono" />
                      <YAxis
                        tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                        className="text-xs font-mono"
                      />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      <Line
                        type="monotone"
                        dataKey="balance"
                        stroke="#2E8B57"
                        strokeWidth={2.5}
                        name="Saldo"
                      />
                      <Line
                        type="monotone"
                        dataKey="investments"
                        stroke="#85a37a"
                        strokeWidth={2}
                        name="Investasi"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Bar Chart */}
              <Card className="bg-background border-border">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-medium text-foreground">
                    Akumulasi Tabungan
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={projectionData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="year" className="text-xs font-mono" />
                      <YAxis
                        tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                        className="text-xs font-mono"
                      />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      <Bar dataKey="savings" fill="#2E8B57" name="Tabungan" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Summary Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-lg bg-muted/40 border border-border">
                <p className="text-xs text-muted-foreground mb-1">
                  Proyeksi Saldo (Tahun ke-5)
                </p>
                <p className="text-xl font-bold font-mono tabular-nums text-foreground">
                  {formatCurrency(projectionData[4]?.balance || 0)}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/40 border border-border">
                <p className="text-xs text-muted-foreground mb-1">
                  Proyeksi Investasi (Tahun ke-5)
                </p>
                <p className="text-xl font-bold font-mono tabular-nums text-primary">
                  {formatCurrency(projectionData[4]?.investments || 0)}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/40 border border-border">
                <p className="text-xs text-muted-foreground mb-1">
                  Proyeksi Tabungan (Tahun ke-5)
                </p>
                <p className="text-xl font-bold font-mono tabular-nums text-foreground">
                  {formatCurrency(projectionData[4]?.savings || 0)}
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsProjectionOpen(false)}
              className="border-border text-foreground"
            >
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Portfolio Detail Dialog */}
      <Dialog open={isPortfolioOpen} onOpenChange={setIsPortfolioOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground text-lg">
              Detail Alokasi Portofolio Investasi
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Distribusi aset dan simulasi return tahunan
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-lg bg-muted/40 border border-border">
                <p className="text-xs text-muted-foreground">Total Investasi</p>
                <p className="text-lg font-bold font-mono tabular-nums text-foreground mt-0.5">
                  {formatCurrency(financialData.investments)}
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-muted/40 border border-border">
                <p className="text-xs text-muted-foreground">Return YTD</p>
                <p className="text-lg font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {financialData.investments > 0 ? "+12.5%" : "0%"}
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-muted/40 border border-border">
                <p className="text-xs text-muted-foreground">Gain / Loss Nominal</p>
                <p className="text-lg font-bold font-mono tabular-nums text-primary mt-0.5">
                  {financialData.investments > 0
                    ? `+${formatCurrency(financialData.investments * 0.125)}`
                    : formatCurrency(0)}
                </p>
              </div>
            </div>

            {financialData.investments > 0 ? (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Daftar Kelas Aset
                </h4>
                <div className="space-y-2">
                  {[
                    {
                      name: "Saham",
                      allocation: 60,
                      value: financialData.investments * 0.6,
                      return: "+15.2%",
                    },
                    {
                      name: "Obligasi",
                      allocation: 25,
                      value: financialData.investments * 0.25,
                      return: "+8.1%",
                    },
                    {
                      name: "Reksadana",
                      allocation: 10,
                      value: financialData.investments * 0.1,
                      return: "+12.8%",
                    },
                    {
                      name: "Emas",
                      allocation: 5,
                      value: financialData.investments * 0.05,
                      return: "+6.5%",
                    },
                  ].map((asset, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                        <span className="font-medium text-sm text-foreground">
                          {asset.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-mono tabular-nums text-sm font-semibold text-foreground">
                          {formatCurrency(asset.value)}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {asset.allocation}% • {asset.return}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-sm text-muted-foreground">
                Belum ada aset investasi terdaftar.
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPortfolioOpen(false)}
              className="border-border text-foreground"
            >
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
