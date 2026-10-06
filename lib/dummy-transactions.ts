// Generator data dummy transaksi SETAHUN PENUH untuk halaman manajemen.
// Deterministik (seeded PRNG) supaya hasil stabil di setiap render/klik.
// Dipakai oleh transaction-manager dan enhanced-financial-dashboard.

export interface YearlyTransaction {
  id: string
  date: Date
  category: string
  type: "income" | "expense"
  description: string
  amount: number
}

export type DummyScenario = "normal" | "overspending"

// PRNG deterministik — hasil sama untuk (year, scenario) yang sama.
function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const MONTH_NAMES = [
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
]

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

const MEALS = [
  "Makan siang",
  "Jajan sore",
  "Makan malam bersama",
  "Bubur ayam",
  "Sate padang",
  "Nasi goreng tek-tek",
  "Bakso & es teh",
  "Ayam geprek",
]

export function generateYearlyTransactions(
  year: number,
  scenario: DummyScenario = "normal",
): YearlyTransaction[] {
  const rand = mulberry32(year * 31 + (scenario === "normal" ? 7 : 999))
  // integer acak kelipatan `step` dalam [min, max]
  const ri = (min: number, max: number, step = 5000) =>
    Math.round((min + rand() * (max - min)) / step) * step
  const pickDay = (m: number) => 1 + Math.floor(rand() * daysInMonth(year, m))

  const out: YearlyTransaction[] = []
  let n = 0
  const add = (
    m: number,
    day: number,
    category: string,
    type: "income" | "expense",
    description: string,
    amount: number,
  ) => {
    n += 1
    out.push({
      id: `${scenario}-${year}-${m}-${n}`,
      date: new Date(year, m, Math.min(day, daysInMonth(year, m))),
      category,
      type,
      description,
      amount,
    })
  }

  if (scenario === "normal") {
    // Gaji naik tiap kuartal — bikin grafik tahunan hidup
    const salary = [8.5, 8.5, 8.5, 8.7, 8.7, 8.7, 8.9, 8.9, 8.9, 9.2, 9.2, 9.2].map(
      (jt) => jt * 1_000_000,
    )
    for (let m = 0; m < 12; m++) {
      add(m, 25, "gaji", "income", `Gaji Bulanan ${MONTH_NAMES[m]}`, salary[m])
      if (m === 5) add(m, 20, "pendapatan", "income", "Bonus tengah tahun", 4_000_000)
      if (m === 11) add(m, 20, "pendapatan", "income", "Bonus akhir tahun", 6_000_000)

      // Rutin mingguan: supermarket 4x
      for (const d of [3, 10, 17, 24]) {
        add(m, d, "makanan-minuman", "expense", "Belanja Supermarket", ri(280_000, 480_000, 10_000))
      }
      // Makan & jajan 4x
      for (let i = 0; i < 4; i++) {
        add(m, pickDay(m), "makanan-minuman", "expense", MEALS[Math.floor(rand() * MEALS.length)], ri(25_000, 120_000, 5_000))
      }
      // Kopi 3x
      for (let i = 0; i < 3; i++) {
        add(m, pickDay(m), "makanan-minuman", "expense", "Kopi & roti", ri(18_000, 45_000, 1_000))
      }
      // Transportasi
      add(m, 8, "transportasi", "expense", "Bensin motor", ri(100_000, 180_000, 5_000))
      add(m, 22, "transportasi", "expense", "Bensin mobil", ri(120_000, 200_000, 5_000))
      for (let i = 0; i < 3; i++) {
        add(m, pickDay(m), "transportasi", "expense", "Ojek online", ri(15_000, 45_000, 1_000))
      }
      // Tagihan
      const hot = m >= 3 && m <= 8
      add(m, 20, "tagihan", "expense", "Listrik & air", ri(hot ? 420_000 : 380_000, hot ? 520_000 : 460_000, 5_000))
      add(m, 1, "tagihan", "expense", "Internet rumah", 350_000)
      add(m, 1, "tagihan", "expense", "Pulsa & kuota", 75_000)
      add(m, 7, "hiburan", "expense", "Langganan streaming", 199_000)

      // Investasi: top-up rutin + dividen kuartalan
      add(m, 5, "investasi", "expense", "Top up reksa dana", 1_000_000)
      if ([2, 5, 8, 11].includes(m)) {
        add(m, 15, "investasi", "income", "Dividen saham", ri(250_000, 400_000, 10_000))
      }
      // Kesehatan
      if (m % 2 === 0) add(m, 12, "kesehatan", "expense", "Vitamin & suplemen", 150_000)
      // Hiburan
      add(m, pickDay(m), "hiburan", "expense", "Nonton bioskop", ri(80_000, 250_000, 5_000))
      // Donasi rutin
      add(m, 2, "lain-lain", "expense", "Donasi & sedekah", 100_000)

      // Momen khusus setahun
      if (m === 0) add(m, 10, "lain-lain", "expense", "Premi asuransi tahunan", 1_200_000)
      if (m === 1) {
        add(m, 14, "pendapatan", "income", "Angpao & hadiah", 750_000)
        add(m, 18, "pendidikan", "expense", "Kursus online", ri(300_000, 800_000, 10_000))
      }
      if (m === 2) add(m, 9, "belanja", "expense", "Belanja pakaian baru", ri(400_000, 700_000, 10_000))
      if (m === 3) add(m, 16, "transportasi", "expense", "Servis motor", 350_000)
      if (m === 4) {
        add(m, 11, "belanja", "expense", "Beli headphone baru", 1_800_000)
        add(m, 19, "pendidikan", "expense", "Kursus online", ri(300_000, 800_000, 10_000))
      }
      if (m === 5) add(m, 21, "hiburan", "expense", "Liburan tengah tahun", 2_500_000)
      if (m === 6) {
        add(m, 5, "transportasi", "expense", "Pajak kendaraan tahunan", 500_000)
        add(m, 13, "pendidikan", "expense", "Buku & alat tulis", 120_000)
      }
      if (m === 7) {
        add(m, 17, "pendapatan", "income", "Hadiah ulang tahun", 500_000)
        add(m, 22, "pendidikan", "expense", "Kursus online", ri(300_000, 800_000, 10_000))
      }
      if (m === 8) add(m, 9, "belanja", "expense", "Belanja pakaian baru", ri(400_000, 700_000, 10_000))
      if (m === 9) {
        add(m, 14, "kesehatan", "expense", "Periksa gigi", 600_000)
        add(m, 16, "transportasi", "expense", "Servis motor", 350_000)
      }
      if (m === 10) add(m, 19, "pendidikan", "expense", "Kursus online", ri(300_000, 800_000, 10_000))
      if (m === 11) {
        add(m, 21, "hiburan", "expense", "Liburan akhir tahun", 3_500_000)
        add(m, 23, "kesehatan", "expense", "Medical check-up", 850_000)
        add(m, 24, "lain-lain", "expense", "Kado & oleh-oleh", 400_000)
      }
      // Buku awal tahun
      if (m === 0) add(m, 13, "pendidikan", "expense", "Buku & alat tulis", 120_000)
    }
  } else {
    // Skenario boros: gaji kecil, gaya hidup besar — defisit hampir tiap bulan
    for (let m = 0; m < 12; m++) {
      add(m, 25, "gaji", "income", `Gaji Bulanan ${MONTH_NAMES[m]}`, 5_000_000)
      add(m, 24, "makanan-minuman", "expense", "Makan di restoran mewah", ri(600_000, 900_000, 10_000))
      add(m, 12, "makanan-minuman", "expense", "Fine dining akhir pekan", ri(500_000, 800_000, 10_000))
      add(m, 22, "belanja", "expense", "Shopping spree di mall", ri(1_200_000, 1_800_000, 10_000))
      add(m, 15, "hiburan", "expense", "Nongkrong & karaoke", ri(400_000, 800_000, 10_000))
      add(m, 18, "tagihan", "expense", "Cicilan kartu kredit", 1_200_000)
      add(m, 20, "tagihan", "expense", "Listrik & air", ri(400_000, 500_000, 5_000))
      add(m, 1, "tagihan", "expense", "Internet & pulsa", 425_000)
      for (let i = 0; i < 6; i++) {
        add(m, pickDay(m), "makanan-minuman", "expense", "Kopi kekinian", ri(45_000, 65_000, 1_000))
      }
      for (let i = 0; i < 4; i++) {
        add(m, pickDay(m), "transportasi", "expense", "Taksi online", ri(30_000, 80_000, 1_000))
      }
      add(m, 8, "transportasi", "expense", "Bensin mobil", 150_000)
      add(m, 7, "hiburan", "expense", "Langganan streaming", 199_000)

      if ([2, 5, 8, 11].includes(m)) {
        add(m, 21, "hiburan", "expense", "Liburan dadakan", ri(2_000_000, 2_800_000, 50_000))
      }
      if (m === 2) add(m, 23, "transportasi", "expense", "DP motor baru", 2_500_000)
      if (m === 7) add(m, 11, "belanja", "expense", "Gadget flagship baru", 3_200_000)
      if (m === 11) add(m, 24, "belanja", "expense", "Belanja akhir tahun", 2_000_000)
    }
  }

  // Terbaru dulu — konsisten dengan transaksi yang ditambah manual
  return out.sort((a, b) => b.date.getTime() - a.date.getTime())
}
