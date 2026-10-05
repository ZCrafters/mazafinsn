export interface FinancialData {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savings: number;
  investments: number;
  debts: number;
  savingsGoal: number;
}

export interface BudgetCategory {
  name: string;
  budget: number;
  spent: number;
  color?: string;
}

export interface RecentTransaction {
  id: number;
  type: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface AIAnalysisResult {
  insights?: string[];
  warnings?: string[];
  recommendations?: string[];
}
