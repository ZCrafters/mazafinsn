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
