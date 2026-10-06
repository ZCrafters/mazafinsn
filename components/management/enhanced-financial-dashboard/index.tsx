"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Database, AlertTriangle } from "lucide-react";
import { format } from "date-fns";

import AIPortfolioAnalysis from "../ai-portfolio-analysis";
import EnhancedAIChatbot from "../enhanced-ai-chatbot";

import {
  categories,
  months,
} from "./data";
import { generateYearlyTransactions } from "@/lib/dummy-transactions";
import {
  Transaction,
  TransactionFormData,
  MonthlyDataPoint,
  CategoryExpensePoint,
  ProjectionDataPoint,
} from "./types";

import { MonthlySummary } from "./parts/monthly-summary";
import { TransactionListAndPie } from "./parts/transaction-list-and-pie";
import { YearlySummary } from "./parts/yearly-summary";
import { ProjectionSummary } from "./parts/projection-summary";
import { TransactionEntryForm } from "./parts/transaction-entry-form";

export default function EnhancedFinancialDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [formData, setFormData] = useState<TransactionFormData>({
    date: new Date(),
    category: "",
    type: "expense",
    description: "",
    amount: 0,
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const loadDummyData = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    setSelectedYear(currentYear);
    setSelectedMonth(currentMonth);
    setTransactions(generateYearlyTransactions(currentYear, "normal"));
  };

  const loadOverspendingDummyData = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    setSelectedYear(currentYear);
    setSelectedMonth(currentMonth);
    setTransactions(generateYearlyTransactions(currentYear, "overspending"));
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

  // Filter transactions by selected month and year
  const filteredTransactions = transactions.filter(
    (t) =>
      t.date.getMonth() === selectedMonth &&
      t.date.getFullYear() === selectedYear
  );

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const currentBalance = totalIncome - totalExpense;

  // Alert logic for overspending
  const isOverspending = totalExpense > totalIncome && totalIncome > 0;
  const overspendingAmount = totalExpense - totalIncome;
  const overspendingPercentage =
    totalIncome > 0 ? (overspendingAmount / totalIncome) * 100 : 0;

  // Yearly data
  const yearlyData: MonthlyDataPoint[] = months.map((month, index) => {
    const monthTransactions = transactions.filter(
      (t) =>
        t.date.getMonth() === index && t.date.getFullYear() === selectedYear
    );

    const income = monthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = monthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      month: month.substring(0, 3),
      pendapatan: income,
      pengeluaran: expense,
      saldo: income - expense,
    };
  });

  // Expense by category
  const expenseByCategory: CategoryExpensePoint[] = categories.expense
    .map((category) => {
      const categoryExpenses = filteredTransactions
        .filter((t) => t.type === "expense" && t.category === category.value)
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        name: category.label.split(" ")[1] || category.label,
        value: categoryExpenses,
        fullName: category.label,
      };
    })
    .filter((item) => item.value > 0);

  // 5-year projection
  const projectionData: ProjectionDataPoint[] = Array.from({ length: 5 }, (_, i) => {
    const year = selectedYear + i;
    const avgMonthlyIncome = totalIncome || 8500000;
    const avgMonthlyExpense = totalExpense || 2000000;
    const annualIncome = avgMonthlyIncome * 12;
    const annualExpense = avgMonthlyExpense * 12;

    return {
      tahun: year,
      pendapatan: annualIncome,
      pengeluaran: annualExpense,
      pertumbuhan: i === 0 ? 0 : 5.5,
      penghematan: annualIncome - annualExpense,
      total: (annualIncome - annualExpense) * (i + 1),
    };
  });

  return (
    <div className="min-h-[100dvh] bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border/70">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground">
              Dashboard Keuangan Komprehensif
            </h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">
              Analisis terperinci riwayat arus kas, simulasi defisit, dan proyeksi multi-tahun.
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

        {/* Monthly Summary & Selectors */}
        <MonthlySummary
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          currentBalance={currentBalance}
          isOverspending={isOverspending}
          overspendingAmount={overspendingAmount}
          overspendingPercentage={overspendingPercentage}
        />

        {/* Transactions List & Pie Chart */}
        <TransactionListAndPie
          filteredTransactions={filteredTransactions}
          expenseByCategory={expenseByCategory}
        />

        {/* Yearly Summary */}
        <YearlySummary
          yearlyData={yearlyData}
          selectedYear={selectedYear}
        />

        {/* Projection Summary */}
        <ProjectionSummary projectionData={projectionData} />

        {/* Embedded AI Chatbot */}
        <EnhancedAIChatbot
          transactions={transactions.map((t) => ({
            id: t.id,
            type: t.type,
            category: t.category,
            description: t.description,
            amount: t.amount,
            date: format(t.date, "yyyy-MM-dd"),
          }))}
          totalIncome={transactions
            .filter((t) => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0)}
          totalExpenses={transactions
            .filter((t) => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0)}
          currentBalance={
            transactions
              .filter((t) => t.type === "income")
              .reduce((sum, t) => sum + t.amount, 0) -
            transactions
              .filter((t) => t.type === "expense")
              .reduce((sum, t) => sum + t.amount, 0)
          }
        />

        {/* Embedded AI Portfolio Analysis */}
        <AIPortfolioAnalysis
          transactions={transactions.map((t) => ({
            id: t.id,
            type: t.type,
            category: t.category,
            description: t.description,
            amount: t.amount,
            date: format(t.date, "yyyy-MM-dd"),
          }))}
          totalIncome={transactions
            .filter((t) => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0)}
          totalExpenses={transactions
            .filter((t) => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0)}
          currentBalance={
            transactions
              .filter((t) => t.type === "income")
              .reduce((sum, t) => sum + t.amount, 0) -
            transactions
              .filter((t) => t.type === "expense")
              .reduce((sum, t) => sum + t.amount, 0)
          }
        />

        {/* Transaction Entry Form */}
        <TransactionEntryForm
          formData={formData}
          setFormData={setFormData}
          isCalendarOpen={isCalendarOpen}
          setIsCalendarOpen={setIsCalendarOpen}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
