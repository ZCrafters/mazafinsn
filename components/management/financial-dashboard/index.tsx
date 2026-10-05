"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Brain, BarChart3, Edit3, RotateCcw } from "lucide-react";

import {
  initialFinancialData,
  initialBudgetCategories,
  initialRecentTransactions,
  analyzeFinancialData,
} from "./data";
import { FinancialData, BudgetCategory, RecentTransaction, AIAnalysisResult } from "./types";
import { OverviewMetrics } from "./parts/overview-metrics";
import { BudgetTracking } from "./parts/budget-tracking";
import { RecentTransactions } from "./parts/recent-transactions";
import { SavingsAndInvestments } from "./parts/savings-and-investments";
import { DashboardDialogs } from "./parts/dashboard-dialogs";

export default function FinancialDashboard() {
  const [financialData, setFinancialData] = useState<FinancialData>(initialFinancialData);
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>(initialBudgetCategories);
  const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>(initialRecentTransactions);

  const [isManualInputOpen, setIsManualInputOpen] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isAIAnalysisOpen, setIsAIAnalysisOpen] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isProjectionOpen, setIsProjectionOpen] = useState(false);

  const [inputData, setInputData] = useState<FinancialData>(financialData);
  const [newTransaction, setNewTransaction] = useState({
    type: "expense",
    description: "",
    amount: 0,
    category: "",
  });
  const [newBudget, setNewBudget] = useState({
    name: "",
    budget: 0,
  });

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    setIsAIAnalysisOpen(true);

    const analysis = await analyzeFinancialData(
      financialData,
      budgetCategories,
      recentTransactions
    );
    setAiAnalysis(analysis);
    setIsAnalyzing(false);
  };

  const generateProjectionData = () => {
    const currentYear = new Date().getFullYear();
    const monthlyNetIncome = financialData.monthlyIncome - financialData.monthlyExpenses;
    const annualNetIncome = monthlyNetIncome * 12;

    return Array.from({ length: 5 }, (_, i) => ({
      year: currentYear + i,
      balance: financialData.totalBalance + annualNetIncome * i,
      investments: financialData.investments * Math.pow(1.08, i),
      savings: financialData.savings + monthlyNetIncome * 12 * i * 0.3,
    }));
  };

  const projectionData = generateProjectionData();

  useEffect(() => {
    const handleManualInput = () => {
      setInputData(financialData);
      setIsManualInputOpen(true);
    };

    const handleResetDialog = () => {
      setIsResetDialogOpen(true);
    };

    window.addEventListener("openManualInput", handleManualInput);
    window.addEventListener("openResetDialog", handleResetDialog);

    return () => {
      window.removeEventListener("openManualInput", handleManualInput);
      window.removeEventListener("openResetDialog", handleResetDialog);
    };
  }, [financialData]);

  const handleSaveManualInput = () => {
    setFinancialData(inputData);
    setIsManualInputOpen(false);
  };

  const handleResetAllData = () => {
    setFinancialData(initialFinancialData);
    setBudgetCategories(initialBudgetCategories);
    setRecentTransactions(initialRecentTransactions);
    setIsResetDialogOpen(false);
  };

  const handleAddTransaction = () => {
    if (!newTransaction.description || newTransaction.amount <= 0) {
      return;
    }

    const transaction: RecentTransaction = {
      id: Date.now(),
      type: newTransaction.type,
      description: newTransaction.description,
      amount:
        newTransaction.type === "income"
          ? newTransaction.amount
          : -newTransaction.amount,
      date: new Date().toISOString().split("T")[0],
      category: newTransaction.category || "Umum",
    };

    setRecentTransactions([transaction, ...recentTransactions]);

    if (newTransaction.type === "expense" && newTransaction.category) {
      setBudgetCategories((prev) =>
        prev.map((budget) =>
          budget.name.toLowerCase() === newTransaction.category.toLowerCase()
            ? { ...budget, spent: budget.spent + newTransaction.amount }
            : budget
        )
      );

      setFinancialData((prev) => ({
        ...prev,
        monthlyExpenses: prev.monthlyExpenses + newTransaction.amount,
      }));
    } else if (newTransaction.type === "income") {
      setFinancialData((prev) => ({
        ...prev,
        monthlyIncome: prev.monthlyIncome + newTransaction.amount,
        totalBalance: prev.totalBalance + newTransaction.amount,
      }));
    }

    setNewTransaction({
      type: "expense",
      description: "",
      amount: 0,
      category: "",
    });
    setIsAddTransactionOpen(false);
  };

  const handleAddBudget = () => {
    if (!newBudget.name || newBudget.budget <= 0) return;
    const budget: BudgetCategory = {
      name: newBudget.name,
      budget: newBudget.budget,
      spent: 0,
      color: "bg-primary",
    };
    setBudgetCategories([...budgetCategories, budget]);
    setNewBudget({ name: "", budget: 0 });
    setIsBudgetOpen(false);
  };

  const handleResetBudgets = () => {
    setBudgetCategories((prev) =>
      prev.map((budget) => ({ ...budget, spent: 0 }))
    );
  };

  const netWorth =
    financialData.totalBalance +
    financialData.investments -
    financialData.debts;

  const savingsRate =
    financialData.monthlyIncome > 0
      ? (financialData.savings / financialData.monthlyIncome) * 100
      : 0;

  const goalProgress =
    financialData.savingsGoal > 0
      ? (financialData.savings / financialData.savingsGoal) * 100
      : 0;

  return (
    <div className="min-h-[100dvh] bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border/70">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground">
              Dashboard Keuangan
            </h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">
              Pantau arus kas, alokasi anggaran belanja, dan pertumbuhan portofolio secara terpadu.
            </p>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              onClick={handleAIAnalysis}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm h-9"
            >
              <Brain className="w-4 h-4 mr-1.5" />
              Analisis AI
            </Button>
            <Button
              onClick={() => setIsProjectionOpen(true)}
              variant="outline"
              className="border-border text-foreground hover:bg-muted font-medium h-9"
            >
              <BarChart3 className="w-4 h-4 mr-1.5 text-primary" />
              Proyeksi 5 Tahun
            </Button>
            <Button
              onClick={() => {
                setInputData(financialData);
                setIsManualInputOpen(true);
              }}
              variant="outline"
              size="icon"
              title="Edit Data Keuangan"
              className="border-border text-muted-foreground hover:text-foreground hover:bg-muted h-9 w-9"
            >
              <Edit3 className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setIsResetDialogOpen(true)}
              variant="outline"
              size="icon"
              title="Reset Data"
              className="border-border text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-9 w-9"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* 4 Overview Metric Cards */}
        <OverviewMetrics financialData={financialData} netWorth={netWorth} />

        {/* Asymmetric 2:1 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column (2 spans) */}
          <div className="lg:col-span-2 space-y-6">
            <BudgetTracking
              budgetCategories={budgetCategories}
              onOpenAddBudget={() => setIsBudgetOpen(true)}
            />

            <RecentTransactions
              recentTransactions={recentTransactions}
              onOpenAddTransaction={() => setIsAddTransactionOpen(true)}
            />
          </div>

          {/* Sidebar Column (1 span) */}
          <div>
            <SavingsAndInvestments
              financialData={financialData}
              savingsRate={savingsRate}
              goalProgress={goalProgress}
              onOpenAddTransaction={() => setIsAddTransactionOpen(true)}
              onOpenBudget={() => setIsBudgetOpen(true)}
              onResetBudgets={handleResetBudgets}
              onOpenPortfolio={() => setIsPortfolioOpen(true)}
            />
          </div>
        </div>

        {/* Dialogs */}
        <DashboardDialogs
          financialData={financialData}
          inputData={inputData}
          setInputData={setInputData}
          isManualInputOpen={isManualInputOpen}
          setIsManualInputOpen={setIsManualInputOpen}
          handleSaveManualInput={handleSaveManualInput}
          isAddTransactionOpen={isAddTransactionOpen}
          setIsAddTransactionOpen={setIsAddTransactionOpen}
          newTransaction={newTransaction}
          setNewTransaction={setNewTransaction}
          handleAddTransaction={handleAddTransaction}
          isBudgetOpen={isBudgetOpen}
          setIsBudgetOpen={setIsBudgetOpen}
          newBudget={newBudget}
          setNewBudget={setNewBudget}
          handleAddBudget={handleAddBudget}
          isResetDialogOpen={isResetDialogOpen}
          setIsResetDialogOpen={setIsResetDialogOpen}
          handleResetAllData={handleResetAllData}
          isAIAnalysisOpen={isAIAnalysisOpen}
          setIsAIAnalysisOpen={setIsAIAnalysisOpen}
          isAnalyzing={isAnalyzing}
          aiAnalysis={aiAnalysis}
          isProjectionOpen={isProjectionOpen}
          setIsProjectionOpen={setIsProjectionOpen}
          projectionData={projectionData}
          isPortfolioOpen={isPortfolioOpen}
          setIsPortfolioOpen={setIsPortfolioOpen}
        />
      </div>
    </div>
  );
}
