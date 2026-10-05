import { Transaction, CategoryOption } from "./types";

export const categories: {
  income: CategoryOption[];
  expense: CategoryOption[];
} = {
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
    {
      value: "tagihan",
      label: "💡 Tagihan (Listrik, Air, Internet)",
      icon: "💡",
    },
    { value: "hiburan", label: "🎬 Hiburan", icon: "🎬" },
    { value: "pendidikan", label: "📚 Pendidikan", icon: "📚" },
    { value: "kesehatan", label: "🏥 Kesehatan", icon: "🏥" },
    { value: "belanja", label: "🛍️ Belanja", icon: "🛍️" },
    { value: "lain-lain", label: "💡 Lain-lain", icon: "💡" },
  ],
};

export const CHART_COLORS = [
  "#2E8B57", // Primary Sage
  "#4A7C59",
  "#689F77",
  "#85A37A",
  "#3B7A57",
  "#A3B899",
  "#5C8D75",
  "#7B9E87",
  "#8FAF9B",
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
}

export const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export function generateNormalDummyData(currentYear: number, currentMonth: number): Transaction[] {
  return [
    {
      id: "1",
      date: new Date(currentYear, currentMonth, 25),
      category: "gaji",
      type: "income",
      description: `Gaji Bulanan ${months[currentMonth]}`,
      amount: 8500000,
    },
    {
      id: "2",
      date: new Date(currentYear, currentMonth, 20),
      category: "makanan-minuman",
      type: "expense",
      description: "Belanja Bulanan Supermarket",
      amount: 1200000,
    },
    {
      id: "3",
      date: new Date(currentYear, currentMonth, 18),
      category: "tagihan",
      type: "expense",
      description: "Tagihan Listrik & Air",
      amount: 450000,
    },
    {
      id: "4",
      date: new Date(currentYear, currentMonth, 15),
      category: "investasi",
      type: "income",
      description: "Dividen Saham",
      amount: 350000,
    },
    {
      id: "5",
      date: new Date(currentYear, currentMonth, 12),
      category: "transportasi",
      type: "expense",
      description: "Bensin & Tol",
      amount: 300000,
    },
    {
      id: "6",
      date: new Date(currentYear, currentMonth, 10),
      category: "hiburan",
      type: "expense",
      description: "Nonton Bioskop & Makan",
      amount: 250000,
    },
    {
      id: "7",
      date: new Date(currentYear, currentMonth, 5),
      category: "kesehatan",
      type: "expense",
      description: "Vitamin & Obat-obatan",
      amount: 150000,
    },
  ];
}

export function generateOverspendingDummyData(currentYear: number, currentMonth: number): Transaction[] {
  return [
    {
      id: "os1",
      date: new Date(currentYear, currentMonth, 25),
      category: "gaji",
      type: "income",
      description: `Gaji Bulanan ${months[currentMonth]}`,
      amount: 5000000,
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
      amount: 300000,
    },
    {
      id: "os4",
      date: new Date(currentYear, currentMonth, 22),
      category: "belanja",
      type: "expense",
      description: "Shopping spree di mall",
      amount: 1500000,
    },
    {
      id: "os5",
      date: new Date(currentYear, currentMonth, 21),
      category: "hiburan",
      type: "expense",
      description: "Liburan ke Bali",
      amount: 2500000,
    },
    {
      id: "os6",
      date: new Date(currentYear, currentMonth, 20),
      category: "tagihan",
      type: "expense",
      description: "Bayar cicilan kartu kredit",
      amount: 1200000,
    },
  ];
}
