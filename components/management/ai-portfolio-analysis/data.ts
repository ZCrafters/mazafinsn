import { AnalysisResult } from "./types";

export function createMockAnalysis(
  totalIncome: number,
  totalExpenses: number,
  currentBalance: number,
  userPoints: number
): AnalysisResult {
  return {
    insights: [
      "Pola pengeluaran Anda menunjukkan tren yang stabil dalam 30 hari terakhir",
      "Rasio tabungan Anda saat ini berada di level yang sehat untuk kategori pendapatan Anda",
      "Diversifikasi pengeluaran menunjukkan keseimbangan yang baik antara kebutuhan dan keinginan",
    ],
    warnings:
      currentBalance < 0
        ? [
            "Pengeluaran melebihi pendapatan - segera lakukan penyesuaian anggaran",
            "Risiko keuangan tinggi terdeteksi - pertimbangkan sumber pendapatan tambahan",
          ]
        : [],
    recommendations: [
      "Alokasikan 20% pendapatan untuk dana darurat",
      "Pertimbangkan investasi jangka panjang untuk pertumbuhan kekayaan",
      "Gunakan aplikasi budgeting untuk tracking yang lebih akurat",
    ],
    trustScore: Math.min(
      95,
      Math.max(60, 85 + (currentBalance > 0 ? 10 : -15))
    ),
    savingsGoals: [
      {
        id: "emergency",
        title: "Dana Darurat",
        target: totalIncome > 0 ? totalIncome * 6 : 30000000,
        current: Math.max(0, currentBalance * 0.3),
        deadline: "2025-12-31",
        category: "emergency",
      },
      {
        id: "vacation",
        title: "Liburan Impian",
        target: 15000000,
        current: Math.max(0, currentBalance * 0.1),
        deadline: "2025-08-31",
        category: "lifestyle",
      },
    ],
    tasks: [
      {
        id: "track-expenses",
        title: "Catat Pengeluaran Harian",
        description: "Catat semua pengeluaran selama 7 hari berturut-turut",
        reward: 50,
        difficulty: "easy",
        completed: false,
        category: "budgeting",
      },
      {
        id: "reduce-dining",
        title: "Kurangi Makan di Luar",
        description: "Batasi makan di restoran maksimal 2x seminggu",
        reward: 100,
        difficulty: "medium",
        completed: false,
        category: "spending",
      },
      {
        id: "emergency-fund",
        title: "Mulai Dana Darurat",
        description: "Sisihkan 10% pendapatan untuk dana darurat",
        reward: 200,
        difficulty: "hard",
        completed: false,
        category: "saving",
      },
    ],
    rewards: [
      {
        id: "bronze-saver",
        title: "Bronze Saver",
        description: "Berhasil menabung selama 1 bulan",
        points: 100,
        unlocked: userPoints >= 100,
        icon: "🥉",
      },
      {
        id: "budget-master",
        title: "Budget Master",
        description: "Berhasil mengikuti budget selama 3 bulan",
        points: 300,
        unlocked: userPoints >= 300,
        icon: "🏆",
      },
      {
        id: "investment-guru",
        title: "Investment Guru",
        description: "Mulai investasi pertama",
        points: 500,
        unlocked: userPoints >= 500,
        icon: "💎",
      },
    ],
  };
}

export function generateAIResponse(userMessage: string): string {
  const responses = [
    "Berdasarkan analisis keuangan Anda, saya merekomendasikan untuk fokus pada penghematan di kategori pengeluaran terbesar.",
    "Data menunjukkan pola pengeluaran yang baik. Pertimbangkan untuk meningkatkan alokasi investasi sebesar 5%.",
    "Saya melihat potensi penghematan di kategori hiburan. Coba batasi pengeluaran hiburan hingga 10% dari pendapatan.",
    "Kondisi keuangan Anda stabil. Saatnya mempertimbangkan diversifikasi portofolio investasi.",
    "Berdasarkan tren pengeluaran, Anda bisa menghemat hingga 15% dengan optimasi budget makanan.",
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

export function getDetailedInsight(
  insight: string,
  totalIncome: number,
  totalExpenses: number,
  currentBalance: number
): string {
  const detailedAdvice: Record<string, string> = {
    "Pola pengeluaran Anda menunjukkan tren yang stabil dalam 30 hari terakhir": `
      • Pengeluaran harian rata-rata: Rp ${Math.round(totalExpenses / 30).toLocaleString("id-ID")}
      • Kategori dominan: ${totalExpenses > totalIncome ? "Transportasi & Utilitas" : "Kebutuhan Pokok"}
      • Tren umum: ${totalExpenses > totalIncome ? "Meningkat di atas rata-rata bulan lalu" : "Terkendali sesuai rencana anggaran"}
      
      Rekomendasi Spesifik:
      • Gunakan fitur batas anggaran untuk memonitor limit bulanan secara real-time.
      • Pasang pagu harian Rp ${Math.round(totalIncome / 30).toLocaleString("id-ID")} untuk menjaga rasio tabungan.
    `,
    "Rasio tabungan Anda saat ini berada di level yang sehat untuk kategori pendapatan Anda": `
      • Rasio tabungan saat ini: ${
        totalIncome > 0
          ? Math.max(0, ((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)
          : 0
      }%
      • Target ideal rasio tabungan: 20–30% dari total pemasukan.
      • Potensi surplus dana bulanan: Rp ${Math.max(0, totalIncome - totalExpenses).toLocaleString("id-ID")}
      
      Strategi Lanjutan:
      • Terapkan sistem auto-debit tabungan segera setelah penerimaan gaji.
      • Alokasikan surplus dana likuid ke instrumen berimbal hasil stabil.
    `,
    "Diversifikasi pengeluaran menunjukkan keseimbangan yang baik antara kebutuhan dan keinginan": `
      • Estimasi alokasi kebutuhan pokok: ~60%
      • Gaya hidup & rekreasi: ~25%
      • Investasi & tabungan: ~15%
      
      Langkah Optimasi:
      • Tinjau langganan digital berulang yang jarang digunakan.
      • Pastikan dana darurat mencukupi minimal 3 bulan biaya hidup sebelum menambah alokasi instrumen berisiko.
    `,
  };

  return (
    detailedAdvice[insight] ||
    `
    Analisis AI:
    Berdasarkan data keuangan tercatat, parameter ini memerlukan evaluasi berkala.
    • Total Pemasukan: Rp ${totalIncome.toLocaleString("id-ID")}
    • Total Pengeluaran: Rp ${totalExpenses.toLocaleString("id-ID")}
    • Saldo Bersih: Rp ${currentBalance.toLocaleString("id-ID")}
  `
  );
}

export function getDetailedRecommendation(
  recommendation: string,
  totalIncome: number,
  totalExpenses: number
): string {
  const detailedAdvice: Record<string, string> = {
    "Alokasikan 20% pendapatan untuk dana darurat": `
      Target Rutin: Rp ${(totalIncome * 0.2).toLocaleString("id-ID")} per bulan.
      Plafon Sasaran: 6 kali pengeluaran bulanan (Rp ${(totalExpenses * 6).toLocaleString("id-ID")}).
      
      Langkah Tindakan:
      1. Buka kantong rekening terpisah khusus dana darurat.
      2. Terapkan pemindahan otomatis di awal bulan.
      3. Jangan gunakan dana ini kecuali untuk kondisi medis darurat atau kehilangan sumber pendapatan.
    `,
    "Pertimbangkan investasi jangka panjang untuk pertumbuhan kekayaan": `
      Saran Alokasi Awal: 10–15% pendapatan (Rp ${(totalIncome * 0.1).toLocaleString("id-ID")}).
      Komposisi Pemula: 40% reksadana pendapatan tetap, 30% SBN/obligasi negara, 30% indeks saham.
      Horizon Investasi: Minimal 3–5 tahun untuk meredam volatilitas jangka pendek.
    `,
    "Gunakan aplikasi budgeting untuk tracking yang lebih akurat": `
      Manfaat Pencatatan Disiplin:
      • Mengeliminasi kebocoran anggaran kecil yang terakumulasi.
      • Menyediakan kepastian data saat merencanakan pembelian aset besar.
      • Mempermudah pelaporan dan evaluasi pajak tahunan.
    `,
  };

  return (
    detailedAdvice[recommendation] ||
    `
    Rekomendasi Terstruktur:
    Inisiatif ini dirancang guna mengoptimalkan ketahanan finansial Anda jangka panjang. Terapkan secara bertahap dan tinjau kemajuan setiap akhir pekan.
  `
  );
}
