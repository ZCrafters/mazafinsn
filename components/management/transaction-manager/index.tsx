"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Database, AlertTriangle } from "lucide-react";

import {
  Transaction,
  TransactionFormData,
} from "./types";
import {
  getNormalDummyData,
  getOverspendingDummyData,
} from "./data";
import { SummaryCards } from "./parts/summary-cards";
import { InlineForm } from "./parts/inline-form";
import { TransactionList } from "./parts/transaction-list";

export default function TransactionManager() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [formData, setFormData] = useState<TransactionFormData>({
    date: new Date(),
    category: "",
    type: "expense",
    description: "",
    amount: 0,
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const loadDummyData = () => {
    const currentDate = new Date();
    setTransactions(
      getNormalDummyData(currentDate.getFullYear(), currentDate.getMonth())
    );
  };

  const loadOverspendingDummyData = () => {
    const currentDate = new Date();
    setTransactions(
      getOverspendingDummyData(currentDate.getFullYear(), currentDate.getMonth())
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category || !formData.description || formData.amount <= 0) {
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: formData.date,
      category: formData.category,
      type: formData.type,
      description: formData.description,
      amount: formData.amount,
    };

    setTransactions([newTransaction, ...transactions]);

    setFormData({
      date: new Date(),
      category: "",
      type: "expense",
      description: "",
      amount: 0,
    });
  };

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyTransactions = transactions.filter(
    (t) =>
      t.date.getMonth() === currentMonth && t.date.getFullYear() === currentYear
  );

  const totalIncome = monthlyTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = monthlyTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const currentBalance = totalIncome - totalExpense;

  const isOverspending = totalExpense > totalIncome && totalIncome > 0;
  const overspendingAmount = totalExpense - totalIncome;
  const overspendingPercentage =
    totalIncome > 0 ? (overspendingAmount / totalIncome) * 100 : 0;

  return (
    <div className="min-h-[100dvh] bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border/70">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground">
              Manajemen Transaksi
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Catat dan kelola riwayat arus kas harian Anda secara teratur
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              onClick={loadDummyData}
              variant="outline"
              size="sm"
              className="border-border text-foreground hover:bg-muted font-medium h-9"
            >
              <Database className="w-4 h-4 mr-1.5 text-primary" />
              Data Normal
            </Button>
            <Button
              onClick={loadOverspendingDummyData}
              variant="outline"
              size="sm"
              className="border-destructive/40 text-destructive hover:bg-destructive/10 font-medium h-9"
            >
              <AlertTriangle className="w-4 h-4 mr-1.5" />
              Simulasi Defisit
            </Button>
          </div>
        </div>

        {/* 3 Summary Cards */}
        <SummaryCards
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          currentBalance={currentBalance}
          isOverspending={isOverspending}
          overspendingAmount={overspendingAmount}
          overspendingPercentage={overspendingPercentage}
        />

        {/* Transaction Entry Form */}
        <InlineForm
          formData={formData}
          setFormData={setFormData}
          isCalendarOpen={isCalendarOpen}
          setIsCalendarOpen={setIsCalendarOpen}
          onSubmit={handleSubmit}
        />

        {/* Transaction History List */}
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}
