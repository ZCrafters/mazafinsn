export interface Transaction {
  id: string;
  date: Date;
  category: string;
  type: "income" | "expense";
  description: string;
  amount: number;
}

export interface TransactionFormData {
  date: Date;
  category: string;
  type: "income" | "expense";
  description: string;
  amount: number;
}
