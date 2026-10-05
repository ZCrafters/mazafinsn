export interface Transaction {
  id: string;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: number;
  date: string;
}

export interface SavingsGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
  category: string;
}

export interface MoneyTask {
  id: string;
  title: string;
  description: string;
  reward: number;
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
  category: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  unlocked: boolean;
  icon: string;
}

export interface AnalysisResult {
  insights: string[];
  warnings: string[];
  recommendations: string[];
  trustScore: number;
  savingsGoals: SavingsGoal[];
  tasks: MoneyTask[];
  rewards: Reward[];
}

export interface AIPortfolioAnalysisProps {
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  currentBalance: number;
}
