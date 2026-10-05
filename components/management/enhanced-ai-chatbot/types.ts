export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type?: "analysis" | "recommendation" | "alert" | "normal";
}

export interface Transaction {
  id: string;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: number;
  date: string;
}

export interface EnhancedAIChatbotProps {
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  currentBalance: number;
}
