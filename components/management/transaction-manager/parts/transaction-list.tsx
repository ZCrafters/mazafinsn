"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { TrendingUp, TrendingDown, ListOrdered } from "lucide-react";
import { formatCurrency } from "../data";
import { Transaction } from "../types";

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <Card className="border border-border bg-card shadow-sm">
      <CardHeader className="border-b border-border/60 pb-4">
        <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <ListOrdered className="w-3.5 h-3.5" />
          </div>
          Daftar Catatan Transaksi
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Seluruh riwayat arus kas yang tersimpan di sesi ini
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5">
        {transactions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            Belum ada transaksi tersimpan. Gunakan formulir di atas untuk menambahkan transaksi.
          </div>
        ) : (
          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {transactions.map((transaction) => {
              const isIncome = transaction.type === "income";
              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3.5 rounded-lg bg-background border border-border/80 hover:border-border transition-colors"
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
                        {format(transaction.date, "dd MMMM yyyy", { locale: id })}
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
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
