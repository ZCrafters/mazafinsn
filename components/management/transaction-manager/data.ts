import { Transaction } from "./types";

export const categories = {
  income: [
    { value: "pendapatan", label: "💰 Pendapatan", icon: "💰" },
    { value: "gaji", label: "💼 Gaji", icon: "💼" },
    { value: "investasi", label: "📈 Investasi", icon: "📈" },
    { value: "hadiah", label: "🎁 Hadiah", icon: "🎁" },
    { value: "lain-lain", label: "💡 Lain-lain", icon: "💡" },
  ],
  expense: [
    { value: "pengeluaran", label: "💸 Pengeluaran", icon: "💸" },
    { value: "makanan-minuman", label: "🍽️ Makanan & Minuman", icon: "🍽️" },
    { value: "transportasi", label: "🚗 Transportasi", icon: "🚗" },
    { value: "tagihan", label: "💡 Tagihan (Listrik, Air, Internet)", icon: "💡" },
    { value: "hiburan", label: "🎬 Hiburan", icon: "🎬" },
    { value: "pendidikan", label: "📚 Pendidikan", icon: "📚" },
    { value: "kesehatan", label: "🏥 Kesehatan", icon: "🏥" },
    { value: "belanja", label: "🛍️ Belanja", icon: "🛍️" },
    { value: "lain-lain", label: "💡 Lain-lain", icon: "💡" },
  ],
};

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
}

export function getNormalDummyData(currentYear: number, currentMonth: number): Transaction[] {
  return [
    {
      id: "1",
      date: new Date(currentYear, currentMonth, 25),
      category: "gaji",
      type: "income",
      description: "Gaji Bulanan",
      amount: 8500000,
    },
    {
      id: "2",
      date: new Date(currentYear, currentMonth, 24),
      category: "makanan-minuman",
      type: "expense",
      description: "Makan siang di restoran",
      amount: 75000,
    },
    {
      id: "3",
      date: new Date(currentYear, currentMonth, 23),
      category: "transportasi",
      type: "expense",
      description: "Bensin motor",
      amount: 50000,
    },
    {
      id: "4",
      date: new Date(currentYear, currentMonth, 22),
      category: "investasi",
      type: "income",
      description: "Dividen saham BBCA",
      amount: 250000,
    },
    {
      id: "5",
      date: new Date(currentYear, currentMonth, 21),
      category: "tagihan",
      type: "expense",
      description: "Bayar listrik bulanan",
      amount: 320000,
    },
    {
      id: "6",
      date: new Date(currentYear, currentMonth, 20),
      category: "belanja",
      type: "expense",
      description: "Belanja groceries mingguan",
      amount: 450000,
    },
  ];
}

export function getOverspendingDummyData(currentYear: number, currentMonth: number): Transaction[] {
  return [
    {
      id: "os1",
      date: new Date(currentYear, currentMonth, 25),
      category: "gaji",
      type: "income",
      description: "Gaji Bulanan",
      amount: 4000000,
    },
    {
      id: "os2",
      date: new Date(currentYear, currentMonth, 24),
      category: "makanan-minuman",
      type: "expense",
      description: "Makan di restoran mewah",
      amount: 800000,
    },
    {
      id: "os3",
      date: new Date(currentYear, currentMonth, 23),
      category: "transportasi",
      type: "expense",
      description: "Beli motor baru (DP)",
      amount: 2500000,
    },
    {
      id: "os4",
      date: new Date(currentYear, currentMonth, 22),
      category: "belanja",
      type: "expense",
      description: "Shopping spree di mall",
      amount: 1200000,
    },
    {
      id: "os5",
      date: new Date(currentYear, currentMonth, 21),
      category: "hiburan",
      type: "expense",
      description: "Liburan singkat",
      amount: 1800000,
    },
  ];
}
