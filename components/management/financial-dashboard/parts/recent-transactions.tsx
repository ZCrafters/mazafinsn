"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowUpRight, ArrowDownRight, Plus } from "lucide-react";
import { formatCurrency, formatDate } from "../data";
import { RecentTransaction } from "../types";

interface RecentTransactionsProps {
  recentTransactions: RecentTransaction[];
  onOpenAddTransaction: () => void;
}

export function RecentTransactions({
  recentTransactions,
  onOpenAddTransaction,
}: RecentTransactionsProps) {
  return (
    <Card className="border border-border bg-card shadow-sm">
      <CardHeader className="border-b border-border/60 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-foreground text-lg">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
              Transaksi Terbaru
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-1">
              Daftar arus kas pemasukan dan pengeluaran terkini
            </CardDescription>
          </div>
          <Button
            size="sm"
            onClick={onOpenAddTransaction}
            className="bg-primary hover:bg-primary/90 text-primary-foreground min-h-[36px]"
          >
            <Plus className="w-4 h-4 mr-1" />
            Tambah
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-3">
        {recentTransactions.length === 0 ? (
          <div className="text-center py-10 bg-muted/30 rounded-xl border border-dashed border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">
              <CreditCard className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">
              Belum ada transaksi
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Catat pemasukan atau pengeluaran harian Anda
            </p>
            <Button
              onClick={onOpenAddTransaction}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Tambah Transaksi Pertama
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {recentTransactions.slice(0, 5).map((transaction) => {
              const isIncome = transaction.type === "income";
              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-background border border-border/70 hover:border-border transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        isIncome
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {isIncome ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground leading-snug">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.category}
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
                    <p className="text-[11px] text-muted-foreground font-mono">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
