// Respon dummy lokal untuk API yang membutuhkan key eksternal.
// Dipakai saat GEMINI_API_KEY tidak dikonfigurasi atau request ke
// penyedia AI gagal — aplikasi tetap berfungsi penuh dalam "mode demo".

export const DUMMY_DISCLAIMER =
  "***Edukasi, bukan nasihat investasi. Konsultasikan dengan penasihat keuangan profesional sebelum mengambil keputusan.***"

function rp(n: number): string {
  return `Rp ${(Math.round(n) || 0).toLocaleString("id-ID")}`
}

// ---------------------------------------------------------------------------
// CHAT — jawaban berbasis kata kunci, format markdown singkat
// ---------------------------------------------------------------------------

interface ChatRule {
  keys: string[]
  reply: string
}

const CHAT_RULES: ChatRule[] = [
  {
    keys: ["saham", "ihsg", "idx", "emiten", "dividen", "stock", "blue chip"],
    reply: `### Saham Indonesia (IDX)

• **Jam perdagangan:** Senin–Jumat 09:00–16:00 WIB
• **Indeks utama:** ***IHSG*** — cerminan seluruh saham tercatat
• **Mulai dari mana:** pilih ***blue chip*** (LQ45), beli bertahap tiap bulan
• **Golden rule:** jangan taruh uang kebutuhan < 3 tahun di saham

${DUMMY_DISCLAIMER}`,
  },
  {
    keys: ["investasi", "invest", "portofolio", "diversifikasi", "reksa dana", "obligasi", "deposito", "emas", "sbn", "risiko", "risk"],
    reply: `### Fondasi Investasi Sehat

• **Urutkan dulu:** dana darurat 3–6x pengeluaran → lunasi utang konsumtif → baru investasi
• **Diversifikasi:** kombinasikan ***reksa dana pasar uang + obligasi/SBN + saham/emas*** sesuai umur
• **Metode aman pemula:** ***dollar cost averaging*** — nominal tetap tiap bulan, abaikan timing pasar
• **Target realistis:** 8–12% per tahun untuk portofolio campuran moderat

${DUMMY_DISCLAIMER}`,
  },
  {
    keys: ["kripto", "crypto", "bitcoin", "btc", "ethereum", "eth", "blockchain", "nft", "koin"],
    reply: `### Kripto: Peluang & Volatilitas

• **Fakta:** Bitcoin bisa naik-turun ***20–30% dalam sebulan*** — normal di aset ini
• **Aturan aman:** maksimal ***5–10% dari total portofolio***, uang dingin saja
• **Pilih yang likuid:** fokus ke aset kapitalisasi besar & terdaftar resmi
• **Hindari:** leverage/futures kalau belum paham risikonya

${DUMMY_DISCLAIMER}`,
  },
  {
    keys: ["tabung", "menabung", "saving", "darurat", "emergency", "dana cadangan"],
    reply: `### Strategi Menabung Anti Gagal

• **Bayar diri sendiri dulu:** autodebet ***20% gaji*** di tanggal gajian
• **Dana darurat:** single 6x, menikah 9x, freelancer ***12x pengeluaran bulanan***
• **Pisahkan rekening:** tabungan ≠ belanja — beda bank lebih manjur
• **Naikkan bertahap:** tiap ada kenaikan gaji, +50% dari kenaikannya

Mau saya hitungkan target dana daruratmu? Sebutkan pengeluaran bulananmu.`,
  },
  {
    keys: ["budget", "anggaran", "atur uang", "boros", "hemat", "50/30/20", "pengeluaran", "catat"],
    reply: `### Budget 50/30/20

• **50% kebutuhan:** makan, transport, tagihan, cicilan wajib
• **30% keinginan:** hiburan, jajan, hobi
• **20% masa depan:** ***tabungan + investasi + dana darurat***
• **Kunci:** ***catat tiap transaksi*** 30 hari — kebocoran selalu ketahuan dari data

Coba buka halaman ***Manajemen*** lalu tekan **Data Normal** untuk melihat contoh arus kas setahun.`,
  },
  {
    keys: ["utang", "hutang", "pinjol", "paylater", "cicilan", "kartu kredit", "pinjaman", "kredit"],
    reply: `### Keluar dari Jerat Utang

• **Stop gali lubang:** hentikan ***paylater & pinjol baru*** hari ini juga
• **Metode avalanche:** lunasi dulu utang ***bunga tertinggi*** (pinjol > kartu kredit > KTA)
• **Batas sehat:** total cicilan ***maksimal 30% penghasilan***
• **Darurat:** negosiasi restrukturisasi ke bank/kreditur sebelum gagal bayar

${DUMMY_DISCLAIMER}`,
  },
  {
    keys: ["pensiun", "hari tua", "dana pensiun", "dapen"],
    reply: `### Dana Pensiun: Makin Cepat Makin Ringan

• **Prinsip:** ***waktu > nominal*** — mulai di usia 25 separuh beban dibanding usia 35
• **Patokan kasar:** siapkan ***25x pengeluaran tahunan*** (aturan 4%)
• **Kendaraan:** DPLK, reksa dana saham, atau SBN jangka panjang
• **Cek tahunan:** pastikan imbal hasil mengalahkan ***inflasi (~3–5%)***`,
  },
  {
    keys: ["pajak", "pph", "npwp", "lapor spt"],
    reply: `### Pajak Singkat untuk Karyawan & Investor

• **Karyawan:** PPh 21 dipotong perusahaan — tetap wajib ***lapor SPT tiap Maret***
• **Investor:** dividen & bunga deposito kena ***pajak final*** (dipotong otomatis)
• **Jual saham:** kena ***0,1% final*** dari nilai transaksi
• **Simpan bukti:** e-billing & bukti potong untuk lampiran SPT`,
  },
  {
    keys: ["asuransi", "proteksi", "asuransi jiwa", "asuransi kesehatan", "premi"],
    reply: `### Asuransi: Beli Proteksi, Bukan Investasi

• **Prioritas:** ***kesehatan → jiwa (jika ada tanggungan) → aset***
• **Uang pertanggungan jiwa:** idealnya ***10–15x penghasilan tahunan***
• **Pisahkan fungsi:** asuransi murni (term life) + investasi sendiri biasanya ***lebih murah***
• **Cek polis:** pengecualian & masa tunggu sebelum klaim`,
  },
  {
    keys: ["gaji", "penghasilan", "umr", "ump", "naik gaji", "side hustle", "tambahan", "freelance"],
    reply: `### Mengoptimalkan Penghasilan

• **Alokasi gaji baru:** terapkan ***50/30/20*** sejak hari pertama gajian
• **Naikkan income:** skill yang dibayar mahal saat ini — ***data, digital marketing, programming***
• **Side hustle realistis:** freelance 2–5 juta/bulan tanpa resign
• **Jebakan:** gaya hidup naik mengikuti gaji (***lifestyle creep***) — kunci musuhnya`,
  },
  {
    keys: ["halo", "hai", "hello", "hi", "pagi", "siang", "sore", "malam", "assalamu"],
    reply: `### Halo! Saya Maza AI 👋

Saya bisa bantu topik keuangan seperti:

• **• Saham & investasi pemula**
• **• Menabung & dana darurat**
• **• Budget 50/30/20**
• **• Utang & paylater**
• **• Pensiun, pajak & asuransi**

Tanya saja, misal: *"gimana cara mulai investasi dengan 1 juta?"*`,
  },
]

const DEFAULT_REPLY = `### Bisa saya bantu lebih spesifik?

Saya paham seputar ***saham, investasi, menabung, budget, utang, pensiun, pajak, dan asuransi*** — coba tanya dengan kata kunci itu.

Contoh: *"bagaimana cara mengatur budget bulanan?"* atau *"apa itu diversifikasi portofolio?"*

${DUMMY_DISCLAIMER}`

export function dummyChatReply(message: string): string {
  const lower = message.toLowerCase()
  for (const rule of CHAT_RULES) {
    if (rule.keys.some((k) => lower.includes(k))) return rule.reply
  }
  return DEFAULT_REPLY
}

// ---------------------------------------------------------------------------
// ANALISIS PORTOFOLIO — dihitung dari angka input pengguna
// ---------------------------------------------------------------------------

export interface FinancialSnapshot {
  totalBalance: number
  monthlyIncome: number
  monthlyExpenses: number
  savings: number
  investments: number
  debts: number
  savingsGoal: number
}

export interface PortfolioAnalysis {
  insights: string[]
  warnings: string[]
  recommendations: string[]
  source: "dummy"
}

export function dummyPortfolioAnalysis(fd: FinancialSnapshot): PortfolioAnalysis {
  const income = Math.max(fd.monthlyIncome, 1)
  const surplus = fd.monthlyIncome - fd.monthlyExpenses
  const savingsRate = (surplus / income) * 100
  const debtRatio = (fd.debts / income) * 100
  const emergencyMonths = fd.monthlyExpenses > 0 ? fd.savings / fd.monthlyExpenses : 0
  const goalProgress = fd.savingsGoal > 0 ? (fd.savings / fd.savingsGoal) * 100 : 0
  const investShare = fd.totalBalance > 0 ? (fd.investments / fd.totalBalance) * 100 : 0

  const insights: string[] = []
  const warnings: string[] = []
  const recommendations: string[] = []

  insights.push(
    `Arus kas bulanan ${surplus >= 0 ? "surplus" : "defisit"} ${rp(Math.abs(surplus))} dengan rasio tabungan ${savingsRate.toFixed(1)}%.`,
  )
  insights.push(
    `Dana darurat saat ini mencukupi ±${emergencyMonths.toFixed(1)} bulan pengeluaran.`,
  )
  insights.push(
    `Porsi investasi ${investShare.toFixed(1)}% dari total saldo ${rp(fd.totalBalance)}.`,
  )

  if (savingsRate >= 20) {
    insights.push("Rasio tabungan di atas 20% — kebiasaan finansial sangat sehat.")
  } else if (savingsRate >= 10) {
    warnings.push(`Rasio tabungan ${savingsRate.toFixed(1)}% masih di bawah ideal 20%.`)
  } else if (surplus < 0) {
    warnings.push(
      `Pengeluaran melebihi pemasukan ${rp(Math.abs(surplus))}/bulan — prioritas utama adalah memangkas pos bocor.`,
    )
  } else {
    warnings.push(`Rasio tabungan hanya ${savingsRate.toFixed(1)}% — rentan terhadap kejadian tak terduga.`)
  }

  if (debtRatio > 30) {
    warnings.push(`Beban utang ${rp(fd.debts)} setara ${debtRatio.toFixed(0)}% penghasilan — di atas batas sehat 30%.`)
  } else if (fd.debts > 0) {
    insights.push(`Utang ${rp(fd.debts)} masih dalam batas wajar, lunasi sesuai jadwal.`)
  }

  if (emergencyMonths < 3) {
    recommendations.push(
      `Bangun dana darurat hingga minimal 3x pengeluaran (${rp(fd.monthlyExpenses * 3)}) sebelum menambah investasi.`,
    )
  }

  if (goalProgress < 100 && fd.savingsGoal > 0) {
    const sisa = fd.savingsGoal - fd.savings
    recommendations.push(
      `Target tabungan tercapai ${goalProgress.toFixed(1)}% — sisihkan ${rp(sisa / 12)}/bulan agar lunas setahun.`,
    )
  }

  if (investShare < 20 && surplus > 0) {
    recommendations.push(
      `Naikkan porsi investasi bertahap — mulai ${rp(surplus * 0.5)}/bulan via autodebet reksa dana.`,
    )
  }

  recommendations.push("Review arus kas tiap akhir bulan dan sesuaikan budget kategori yang jebol.")

  return { insights, warnings, recommendations, source: "dummy" }
}

// ---------------------------------------------------------------------------
// ANALISIS PROFIL RISIKO — aturan baku berbasis umur & horizon
// ---------------------------------------------------------------------------

export interface RiskAnalysis {
  assessment: string
  allocation: { saham: number; obligasi: number; reksadana: number; emas: number }
  strategy: string[]
  warnings: string[]
  source: "dummy"
}

export function dummyRiskAnalysis(
  age: number,
  investmentHorizon: number,
  riskTolerance: string,
): RiskAnalysis {
  const level = riskTolerance.toLowerCase()
  const aggressive = level === "aggressive"
  const moderate = level === "moderate"

  const allocation = {
    saham: aggressive ? 70 : moderate ? 50 : 30,
    obligasi: aggressive ? 20 : moderate ? 35 : 50,
    reksadana: 10,
    emas: aggressive ? 0 : moderate ? 5 : 10,
  }

  const horizonLabel =
    investmentHorizon >= 10
      ? "panjang sehingga fluktuasi jangka pendek bisa ditoleransi"
      : investmentHorizon >= 5
        ? "menengah sehingga keseimbangan growth-stabilitas penting"
        : "pendek sehingga preservasi modal harus diutamakan"

  const assessment =
    `Investor usia ${age} tahun dengan horizon ${investmentHorizon} tahun (${horizonLabel}) ` +
    `dan profil ${level}. Alokasi yang sesuai: ${allocation.saham}% saham, ${allocation.obligasi}% obligasi, ` +
    `${allocation.reksadana}% reksa dana pasar uang, ${allocation.emas}% emas.`

  const strategy = [
    "Terapkan dollar cost averaging: investasi rutin nominal tetap tiap bulan.",
    "Rebalancing tiap 6–12 bulan agar alokasi kembali ke target.",
    aggressive
      ? "Manfaatkan koreksi pasar untuk akumulasi bertahap, bukan all-in."
      : "Prioritaskan instrumen pendapatan tetap dan SBN ritel sebagai jangkar.",
  ]

  const warnings =
    age > 50
      ? [
          "Di atas 50 tahun, kurangi eksposur saham bertahap menuju instrumen pendapatan tetap.",
          "Pastikan dana pensiun tidak 100% di aset volatil.",
        ]
      : investmentHorizon < 3
        ? [
            "Horizon di bawah 3 tahun tidak cocok untuk saham — gunakan deposito/SBN/obligasi pendek.",
            "Jangan kejar return tinggi dengan uang kebutuhan dekat.",
          ]
        : [
            "Manfaatkan horizon yang panjang, tapi tetap siapkan dana darurat di luar portofolio.",
            "Waspadai biaya & pajak yang menggerus return bersih.",
          ]

  return { assessment, allocation, strategy, warnings, source: "dummy" }
}
