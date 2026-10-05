import { FinancialData, BudgetCategory, RecentTransaction, AIAnalysisResult } from "./types";

export const initialFinancialData: FinancialData = {
  totalBalance: 0,
  monthlyIncome: 0,
  monthlyExpenses: 0,
  savings: 0,
  investments: 0,
  debts: 0,
  savingsGoal: 0,
};

export const initialBudgetCategories: BudgetCategory[] = [];

export const initialRecentTransactions: RecentTransaction[] = [];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

export async function analyzeFinancialData(
  financialData: FinancialData,
  budgetCategories: BudgetCategory[],
  transactions: RecentTransaction[]
): Promise<AIAnalysisResult> {
  try {
    const response = await fetch("/api/analyze-portfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        financialData,
        budgetCategories,
        transactions,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to analyze data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error analyzing financial data:", error);
    return {
      insights: [
        "Tidak dapat menganalisis data saat ini. Silakan coba lagi nanti.",
      ],
      warnings: [],
      recommendations: [
        "Pastikan semua data keuangan telah diinput dengan benar.",
      ],
    };
  }
}
