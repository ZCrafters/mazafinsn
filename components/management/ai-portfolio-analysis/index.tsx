"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, TrendingUp, Target, Trophy, Bot } from "lucide-react";

import {
  AIPortfolioAnalysisProps,
  AnalysisResult,
  SavingsGoal,
} from "./types";
import { createMockAnalysis, generateAIResponse } from "./data";
import { HeaderAndTrust } from "./parts/header-and-trust";
import { SavingsGoals } from "./parts/savings-goals";
import { MoneyTasks } from "./parts/money-tasks";
import { RewardsGrid } from "./parts/rewards-grid";
import { InsightsAndRecommendations } from "./parts/insights-and-recommendations";

export default function AIPortfolioAnalysis({
  transactions,
  totalIncome,
  totalExpenses,
  currentBalance,
}: AIPortfolioAnalysisProps) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userPoints, setUserPoints] = useState(150);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "ai"; message: string }[]
  >([]);

  const analyzePortfolio = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const financialData = {
        totalBalance: currentBalance,
        monthlyIncome: totalIncome,
        monthlyExpenses: totalExpenses,
        savings: Math.max(0, currentBalance * 0.2),
        investments: Math.max(0, currentBalance * 0.1),
        debts: Math.max(0, totalExpenses * 0.1),
        savingsGoal: totalIncome > 0 ? totalIncome * 6 : 30000000,
      };

      const budgetCategories = Array.from(
        new Set(transactions.map((t) => t.category))
      ).map((category) => ({
        category,
        budget: transactions
          .filter((t) => t.category === category && t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0),
        spent: transactions
          .filter((t) => t.category === category && t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0),
      }));

      const mockAnalysis = createMockAnalysis(
        totalIncome,
        totalExpenses,
        currentBalance,
        userPoints
      );

      try {
        const response = await fetch("/api/analyze-portfolio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            financialData,
            budgetCategories,
            transactions: transactions.slice(0, 10),
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setAnalysis({ ...mockAnalysis, ...result });
        } else {
          setAnalysis(mockAnalysis);
        }
      } catch {
        setAnalysis(mockAnalysis);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan analisis");
    } finally {
      setIsLoading(false);
    }
  };

  const completeTask = (taskId: string) => {
    if (!completedTasks.includes(taskId) && analysis) {
      const task = analysis.tasks.find((t) => t.id === taskId);
      if (task) {
        setCompletedTasks([...completedTasks, taskId]);
        setUserPoints((prev) => prev + task.reward);
        setAnalysis({
          ...analysis,
          tasks: analysis.tasks.map((t) =>
            t.id === taskId ? { ...t, completed: true } : t
          ),
        });
      }
    }
  };

  const sendChatMessage = (message: string) => {
    setChatMessages((prev) => [
      ...prev,
      { role: "user", message },
      { role: "ai", message: generateAIResponse(message) },
    ]);
  };

  const addCustomGoal = (goal: {
    title: string;
    target: number;
    deadline: string;
    category: string;
  }) => {
    const customGoal: SavingsGoal = {
      id: `custom-${Date.now()}`,
      title: goal.title,
      target: goal.target,
      current: 0,
      deadline: goal.deadline,
      category: goal.category,
    };

    if (analysis) {
      setAnalysis({
        ...analysis,
        savingsGoals: [...analysis.savingsGoals, customGoal],
      });
    }

    setUserPoints((prev) => prev + 25);
  };

  return (
    <div className="space-y-6 pt-4">
      {/* Header & Trust */}
      <HeaderAndTrust
        analysis={analysis}
        isLoading={isLoading}
        userPoints={userPoints}
        transactionsCount={transactions.length}
        onAnalyze={analyzePortfolio}
        chatMessages={chatMessages}
        onSendMessage={sendChatMessage}
      />

      {/* Error Notice */}
      {error && (
        <Card className="border-destructive/30 bg-destructive/10 text-destructive p-4">
          <div className="flex items-center gap-2 text-xs font-medium">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <p>Terjadi kendala: {error}</p>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {!analysis && transactions.length === 0 && (
        <Card className="border border-border bg-card p-8 text-center">
          <Bot className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-60" />
          <h3 className="text-sm font-semibold text-foreground mb-1">
            Menunggu Data Arus Kas
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Catat beberapa transaksi terlebih dahulu untuk memicu kalkulasi dan rekomendasi portofolio dari AI.
          </p>
        </Card>
      )}

      {/* Analysis Results View */}
      {analysis && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-card rounded-xl border border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Status Keuangan</p>
                <p className="text-base font-bold text-foreground">
                  {currentBalance >= 0 ? "Kondisi Sehat" : "Defisit"}
                </p>
              </div>
            </div>

            <div className="p-4 bg-card rounded-xl border border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Target Tabungan</p>
                <p className="text-base font-bold font-mono tabular-nums text-foreground">
                  {analysis.savingsGoals.length} Pos Aktif
                </p>
              </div>
            </div>

            <div className="p-4 bg-card rounded-xl border border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Misi Tersedia</p>
                <p className="text-base font-bold font-mono tabular-nums text-foreground">
                  {analysis.tasks.filter((t) => !t.completed).length} Misi
                </p>
              </div>
            </div>
          </div>

          {/* Savings Goals */}
          <SavingsGoals
            savingsGoals={analysis.savingsGoals}
            onAddGoal={addCustomGoal}
          />

          {/* Money Tasks */}
          <MoneyTasks
            tasks={analysis.tasks}
            onCompleteTask={completeTask}
          />

          {/* Rewards System */}
          <RewardsGrid rewards={analysis.rewards} />

          {/* Insights & Recommendations */}
          <InsightsAndRecommendations
            insights={analysis.insights}
            recommendations={analysis.recommendations}
            warnings={analysis.warnings}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            currentBalance={currentBalance}
            onRewardPoints={(pts) => setUserPoints((prev) => prev + pts)}
          />
        </div>
      )}
    </div>
  );
}
