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

export interface CategoryOption {
  value: string;
  label: string;
  icon: string;
}

export interface MonthlyDataPoint {
  month: string;
  pendapatan: number;
  pengeluaran: number;
  saldo: number;
}

export interface CategoryExpensePoint {
  name: string;
  value: number;
  fullName: string;
}

export interface ProjectionDataPoint {
  tahun: number;
  pendapatan: number;
  pengeluaran: number;
  pertumbuhan: number;
  penghematan: number;
  total: number;
}
