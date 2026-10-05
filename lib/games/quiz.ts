export type QuizDifficulty = "easy" | "medium" | "hard"
export type QuizDifficultyFilter = QuizDifficulty | "all"

export interface QuizQuestion {
  id: string
  category: string
  difficulty: QuizDifficulty
  question: string
  options: string[]
  correctIndex: number
}

export interface LocalQuestion {
  category: string
  difficulty: QuizDifficulty
  question: string
  options: string[]
  correctIndex: number
}

export const QUIZ_CATEGORIES = [
  { key: "stocks", labelKey: "news.category.stock" },
  { key: "crypto", labelKey: "news.category.crypto" },
  { key: "economy", labelKey: "news.category.economy" },
  { key: "investment", labelKey: "news.category.investment" },
  { key: "fintech", labelKey: "news.category.fintech" },
  { key: "banking", labelKey: "news.category.banking" },
] as const

export const LOCAL_QUESTIONS: LocalQuestion[] = [
  // Stocks
  { category: "stocks", difficulty: "medium", question: "Apa singkatan dari Indeks Harga Saham Gabungan?", options: ["IDX", "IHSG", "LQ45", "BEI"], correctIndex: 1 },
  { category: "stocks", difficulty: "medium", question: "Jam berapa pasar saham Indonesia (IDX) ditutup pada hari perdagangan?", options: ["14:00 WIB", "15:00 WIB", "16:00 WIB", "17:00 WIB"], correctIndex: 2 },
  { category: "stocks", difficulty: "easy", question: "Istilah untuk saham perusahaan besar dan mapan di bursa adalah?", options: ["Penny stock", "Blue chip", "Red chip", "Green stock"], correctIndex: 1 },
  { category: "stocks", difficulty: "easy", question: "Regulator pasar modal Indonesia adalah?", options: ["BI", "OJK", "KSEI", "BEI"], correctIndex: 1 },
  // Crypto
  { category: "crypto", difficulty: "easy", question: "Mata uang kripto pertama di dunia adalah?", options: ["Ethereum", "Litecoin", "Bitcoin", "Ripple"], correctIndex: 2 },
  { category: "crypto", difficulty: "medium", question: "Teknologi yang mendasari Bitcoin disebut?", options: ["Big Data", "Blockchain", "Cloud", "IoT"], correctIndex: 1 },
  { category: "crypto", difficulty: "hard", question: "Peristiwa 'halving' pada Bitcoin terjadi setiap berapa tahun?", options: ["2 tahun", "3 tahun", "4 tahun", "5 tahun"], correctIndex: 2 },
  { category: "crypto", difficulty: "medium", question: "Apa kepanjangan dari NFT?", options: ["New Financial Token", "Non-Fungible Token", "Network File Transfer", "Neutral Fund Transfer"], correctIndex: 1 },
  // Economy
  { category: "economy", difficulty: "easy", question: "Inflasi adalah?", options: ["Kenaikan harga barang dan jasa secara umum", "Penurunan nilai tukar", "Kenaikan suku bunga", "Peningkatan ekspor"], correctIndex: 0 },
  { category: "economy", difficulty: "easy", question: "Bank sentral Indonesia disebut?", options: ["OJK", "Bank Indonesia", "Bursa Efek Indonesia", "Kementerian Keuangan"], correctIndex: 1 },
  { category: "economy", difficulty: "medium", question: "BI menaikkan suku bunga acuan bertujuan untuk?", options: ["Meningkatkan impor", "Mengendalikan inflasi", "Menurunkan harga saham", "Meningkatkan konsumsi"], correctIndex: 1 },
  { category: "economy", difficulty: "hard", question: "Suku bunga acuan Bank Indonesia saat ini dikenal dengan istilah?", options: ["BI7DRR", "LIBOR", "Repo rate", "Fed rate"], correctIndex: 0 },
  // Investment
  { category: "investment", difficulty: "easy", question: "Reksa dana adalah?", options: ["Saham tunggal", "Wadah investasi kolektif yang dikelola manajer investasi", "Tabungan berjangka", "Asuransi jiwa"], correctIndex: 1 },
  { category: "investment", difficulty: "medium", question: "Diversifikasi portofolio bertujuan untuk?", options: ["Memaksimalkan keuntungan tunggal", "Mengurangi risiko investasi", "Menghindari pajak", "Meningkatkan likuiditas"], correctIndex: 1 },
  { category: "investment", difficulty: "easy", question: "Obligasi adalah?", options: ["Surat berharga kepemilikan perusahaan", "Surat utang yang diterbitkan pemerintah atau perusahaan", "Aset kripto", "Produk asuransi"], correctIndex: 1 },
  { category: "investment", difficulty: "medium", question: "Bagi hasil keuntungan perusahaan yang dibagikan kepada pemegang saham disebut?", options: ["Kupon", "Dividen", "Capital gain", "Bunga"], correctIndex: 1 },
  // Fintech
  { category: "fintech", difficulty: "easy", question: "Contoh e-wallet yang populer di Indonesia adalah?", options: ["PayPal", "GoPay/OVO/DANA", "Venmo", "WeChat Pay"], correctIndex: 1 },
  { category: "fintech", difficulty: "medium", question: "P2P lending adalah?", options: ["Pinjaman dari bank", "Platform pinjam meminjam antar individu secara online", "Kartu kredit digital", "Investasi reksa dana"], correctIndex: 1 },
  { category: "fintech", difficulty: "medium", question: "Layanan 'paylater' berarti?", options: ["Bayar dimuka", "Bayar kemudian dalam tenor", "Pinjaman tanpa bunga", "Tabungan otomatis"], correctIndex: 1 },
  { category: "fintech", difficulty: "hard", question: "Regulasi fintech lending di Indonesia diawasi oleh?", options: ["Bank Indonesia", "OJK", "KSEI", "BEI"], correctIndex: 1 },
  // Banking
  { category: "banking", difficulty: "medium", question: "Rekening 'current account' dalam perbankan dikenal sebagai?", options: ["Tabungan", "Rekening giro", "Deposito", "Kartu kredit"], correctIndex: 1 },
  { category: "banking", difficulty: "easy", question: "Imbalan yang dibayar bank untuk simpanan nasabah disebut?", options: ["Bunga tabungan", "Dividen", "Kupon", "Premium"], correctIndex: 0 },
  { category: "banking", difficulty: "medium", question: "BPR singkatan dari?", options: ["Bank Pembangunan Rakyat", "Bank Perkreditan Rakyat", "Bank Pusat Regional", "Bank Penyalur Rupiah"], correctIndex: 1 },
  { category: "banking", difficulty: "easy", question: "KPR adalah kredit untuk?", options: ["Kendaraan bermotor", "Pemilikan rumah", "Pendidikan", "Modal usaha"], correctIndex: 1 },
]

export function getLocalQuestions(
  category?: string,
  difficulty?: QuizDifficultyFilter,
  amount = 6,
): QuizQuestion[] {
  let pool = LOCAL_QUESTIONS
  if (category && category !== "all") {
    pool = pool.filter((q) => q.category === category)
  }
  if (difficulty && difficulty !== "all") {
    pool = pool.filter((q) => q.difficulty === difficulty)
  }
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(amount, shuffled.length)).map((q, i) => ({
    ...q,
    id: `local-${Date.now()}-${i}`,
  }))
}

export async function fetchFromOpenTDB(
  amount: number,
  difficulty?: QuizDifficultyFilter,
): Promise<QuizQuestion[]> {
  const params = new URLSearchParams({ amount: String(amount), type: "multiple", encode: "url3986", category: "9" })
  if (difficulty && difficulty !== "all") params.set("difficulty", difficulty)

  const res = await fetch(`https://opentdb.com/api.php?${params.toString()}`, {
    next: { revalidate: 3600 },
  })

  if (!res.ok) throw new Error(`opentdb error: ${res.status}`)

  const data = (await res.json()) as {
    response_code: number
    results?: Array<{
      question: string
      correct_answer: string
      incorrect_answers: string[]
      difficulty: string
    }>
  }

  if (data.response_code !== 0 || !data.results) {
    throw new Error("opentdb returned no results")
  }

  return data.results.map((item, i) => {
    const options = [...item.incorrect_answers, item.correct_answer]
      .map((o) => decodeURIComponent(o))
      .sort(() => Math.random() - 0.5)
    const correctIndex = options.indexOf(decodeURIComponent(item.correct_answer))
    return {
      id: `opentdb-${Date.now()}-${i}`,
      category: "general",
      difficulty: (["easy", "medium", "hard"].includes(item.difficulty) ? item.difficulty : "medium") as QuizDifficulty,
      question: decodeURIComponent(item.question),
      options,
      correctIndex,
    }
  })
}

export async function getQuizQuestions(
  amount = 10,
  category?: string,
  difficulty?: QuizDifficultyFilter,
): Promise<QuizQuestion[]> {
  // Finance-first: use the local finance bank as the primary source.
  const local = getLocalQuestions(category, difficulty, amount)
  let merged = [...local]

  // Only fall back to OpenTDB (general knowledge) to fill any remaining slots.
  if (merged.length < amount) {
    try {
      const remote = await fetchFromOpenTDB(amount - merged.length, difficulty)
      merged = [...merged, ...remote]
    } catch {
      // ignore — local questions already cover the session
    }
  }

  return merged.sort(() => Math.random() - 0.5).slice(0, amount)
}