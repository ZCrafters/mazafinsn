import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  PieChart,
  Calculator,
  Target,
} from "lucide-react";
import { Message, Transaction } from "./types";

export const analysisQuestions = [
  {
    icon: BarChart3,
    text: "Analisis pengeluaran bulanan saya",
    category: "expense-analysis",
  },
  {
    icon: TrendingUp,
    text: "Bagaimana tren keuangan saya?",
    category: "trend-analysis",
  },
  {
    icon: PieChart,
    text: "Breakdown kategori pengeluaran",
    category: "category-breakdown",
  },
  {
    icon: AlertTriangle,
    text: "Identifikasi area penghematan",
    category: "savings-opportunities",
  },
  {
    icon: Calculator,
    text: "Proyeksi keuangan 6 bulan ke depan",
    category: "projection",
  },
  {
    icon: Target,
    text: "Rekomendasi target tabungan",
    category: "savings-target",
  },
];

export function generateAnalysis(
  question: string,
  transactions: Transaction[],
  totalIncome: number,
  totalExpenses: number
): { content: string; type: Message["type"] } {
  const lowerQuestion = question.toLowerCase();

  if (
    lowerQuestion.includes("pengeluaran") ||
    lowerQuestion.includes("expense")
  ) {
    const expenseCategories = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    const topCategories = Object.entries(expenseCategories)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    return {
      content: `**Analisis Pengeluaran Mendalam**

**Top 5 Kategori Pengeluaran:**
${
  topCategories.length > 0
    ? topCategories
        .map(
          ([cat, amount], i) =>
            `${i + 1}. **${
              cat.charAt(0).toUpperCase() + cat.slice(1)
            }**: Rp ${amount.toLocaleString("id-ID")} (${(
              (amount / (totalExpenses || 1)) *
              100
            ).toFixed(1)}%)`
        )
        .join("\n")
    : "Belum ada catatan pos pengeluaran."
}

**Insights:**
${
  totalExpenses > totalIncome
    ? `⚠️ **Peringatan**: Pengeluaran melebihi pendapatan sebesar Rp ${(
        totalExpenses - totalIncome
      ).toLocaleString("id-ID")}`
    : `✅ **Terkendali**: Anda berhasil menghemat Rp ${(
        totalIncome - totalExpenses
      ).toLocaleString("id-ID")} bulan ini`
}

**Saran Optimasi:**
- Fokus pada pos pengeluaran terbesar untuk efisiensi instan
- Tetapkan pagu belanja per pos kategori
- Evaluasi rutin arus kas mingguan`,
      type: "analysis",
    };
  }

  if (lowerQuestion.includes("tren") || lowerQuestion.includes("trend")) {
    const savingsRate =
      totalIncome > 0
        ? ((totalIncome - totalExpenses) / totalIncome) * 100
        : 0;

    return {
      content: `**Analisis Tren Rasio Tabungan**

**Performa Saat Ini:**
- Tingkat Tabungan: **${savingsRate.toFixed(1)}%**
- Evaluasi: ${
        savingsRate >= 20
          ? "Sangat Baik (Di atas standar 20%)"
          : savingsRate >= 10
          ? "Cukup Baik (Memenuhi batas minimal 10%)"
          : "Perlu Peningkatan Rasio"
      }

**Proyeksi 12 Bulan:**
${
  savingsRate > 0
    ? `Dengan disiplin alokasi saat ini, dalam 12 bulan potensi akumulasi saldo mencapai: **Rp ${(
        (totalIncome - totalExpenses) *
        12
      ).toLocaleString("id-ID")}**`
    : `Pola pengeluaran saat ini berpotensi menggerus cadangan dana likuid.`
}

**Rekomendasi:**
1. Pertahankan rasio simpanan di angka 15–20%
2. Aktifkan debet otomatis sesaat setelah penerimaan gaji
3. Tinjau kembali pos pengeluaran sekunder`,
      type: "analysis",
    };
  }

  if (
    lowerQuestion.includes("kategori") ||
    lowerQuestion.includes("breakdown")
  ) {
    const expenseByCategory = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    return {
      content: `**Rincian Kategori Pengeluaran**

${
  Object.keys(expenseByCategory).length > 0
    ? Object.entries(expenseByCategory)
        .sort(([, a], [, b]) => b - a)
        .map(([category, amount]) => {
          const percentage = ((amount / (totalExpenses || 1)) * 100).toFixed(1);
          return `• **${category}**: ${percentage}% — Rp ${amount.toLocaleString("id-ID")}`;
        })
        .join("\n")
    : "Belum ada rincian pos pengeluaran."
}

**Catatan Distribusi:**
- ${Object.keys(expenseByCategory).length} pos kategori aktif
- Rekomendasi: Pantau 3 pos teratas secara ketat untuk mencegah kebocoran anggaran`,
      type: "analysis",
    };
  }

  if (
    lowerQuestion.includes("penghematan") ||
    lowerQuestion.includes("savings")
  ) {
    return {
      content: `**Identifikasi Peluang Penghematan**

**Area Dampak Tinggi:**
1. **Langganan Berkala**: Tinjau akun berlangganan digital yang jarang dipakai (hemat ~Rp 150.000/bln)
2. **Katering / Konsumsi Luar**: Siapkan bekal mandiri 2x seminggu (hemat ~Rp 400.000/bln)
3. **Efisiensi Energi**: Bijak menggunakan pendingin udara dan peralatan listrik (hemat ~Rp 100.000/bln)

**Strategi Jangka Menengah:**
- Kebutuhan belanja pokok secara grosir bulanan
- Alokasi dana darurat hingga 3–6 bulan biaya hidup`,
      type: "recommendation",
    };
  }

  if (
    lowerQuestion.includes("proyeksi") ||
    lowerQuestion.includes("projection")
  ) {
    const monthlyBalance = totalIncome - totalExpenses;

    return {
      content: `**Proyeksi Arus Kas 6 Bulan Mendatang**

**Parameter Awal:**
- Pemasukan Bulanan: Rp ${totalIncome.toLocaleString("id-ID")}
- Pengeluaran Bulanan: Rp ${totalExpenses.toLocaleString("id-ID")}
- Saldo Bersih Bulanan: Rp ${monthlyBalance.toLocaleString("id-ID")}

**Estimasi Akumulasi Saldo:**
- Bulan ke-1: Rp ${(monthlyBalance * 1).toLocaleString("id-ID")}
- Bulan ke-3: Rp ${(monthlyBalance * 3).toLocaleString("id-ID")}
- Bulan ke-6: Rp ${(monthlyBalance * 6).toLocaleString("id-ID")}

**Kesimpulan:**
${
  monthlyBalance > 0
    ? "Arus kas positif! Disarankan membagi saldo bersih ke tabungan darurat dan instrumen investasi."
    : "Perlu efisiensi biaya segera guna memulihkan surplus arus kas bulanan."
}`,
      type: "analysis",
    };
  }

  if (
    lowerQuestion.includes("target") ||
    lowerQuestion.includes("tabungan")
  ) {
    const currentSavingsRate =
      totalIncome > 0
        ? ((totalIncome - totalExpenses) / totalIncome) * 100
        : 0;

    return {
      content: `**Panduan Target Tabungan Bertahap**

**Kapasitas Saat Ini:**
- Rasio Tabungan Aktual: ${currentSavingsRate.toFixed(1)}%
- Kapasitas Simpanan: Rp ${Math.max(0, totalIncome - totalExpenses).toLocaleString("id-ID")}/bulan

**Rekomendasi Skala Capaian:**
1. **Fase 1 (Pemula - 3 Bulan)**: Sisihkan 10% pendapatan (Rp ${Math.round(totalIncome * 0.1).toLocaleString("id-ID")}/bln)
2. **Fase 2 (Menengah - 6 Bulan)**: Sisihkan 15% pendapatan (Rp ${Math.round(totalIncome * 0.15).toLocaleString("id-ID")}/bln)
3. **Fase 3 (Lanjutan - 12 Bulan)**: Sisihkan 20% pendapatan (Rp ${Math.round(totalIncome * 0.2).toLocaleString("id-ID")}/bln)`,
      type: "recommendation",
    };
  }

  return {
    content: `Sebagai Asisten Keuangan AI, saya siap menganalisis mutasi arus kas, pola belanja, dan simulasi tabungan Anda.

Silakan pilih salah satu pertanyaan cepat di bawah atau tuliskan pertanyaan spesifik Anda!`,
    type: "normal",
  };
}
