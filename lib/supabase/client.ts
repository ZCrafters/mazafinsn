// Dummy local database — pengganti Supabase.
// Semua data disimpan di localStorage (client-side) dan seed statis.
// Aman dipanggil saat SSR/prerender: tidak membaca storage di server,
// tidak melempar error saat environment variable tidak ada.

type Row = Record<string, any>

const NS = "maza_dummy_v1:"
const DUMMY_USER = {
  id: "demo-user",
  email: "demo@maza.id",
  user_metadata: { name: "Demo User" },
}

const SEEDS: Record<string, Row[]> = {
  savings_goals: [
    {
      id: "sg-1",
      user_id: DUMMY_USER.id,
      name: "Dana Darurat",
      title: "Dana Darurat",
      target_amount: 60000000,
      current_amount: 24500000,
      target_date: "2026-12-31",
      description: "Minimal 3x pengeluaran bulanan",
      category: "💰 Umum",
      created_at: "2026-09-20T08:00:00.000Z",
    },
    {
      id: "sg-2",
      user_id: DUMMY_USER.id,
      name: "Liburan Bali",
      title: "Liburan Bali",
      target_amount: 15000000,
      current_amount: 4750000,
      target_date: "2027-04-01",
      description: "Tabungan liburan akhir tahun",
      category: "🌴 Liburan",
      created_at: "2026-10-01T09:30:00.000Z",
    },
    {
      id: "sg-3",
      user_id: DUMMY_USER.id,
      name: "DP Rumah",
      title: "DP Rumah",
      target_amount: 250000000,
      current_amount: 68000000,
      target_date: "2028-06-30",
      description: "DP 20% rumah pertama",
      category: "🏠 Rumah",
      created_at: "2026-10-03T14:00:00.000Z",
    },
  ],
  transactions: [
    {
      id: "tx-1",
      user_id: DUMMY_USER.id,
      type: "expense",
      category: "📈 Investasi",
      description: "Beli reksa dana pasar uang",
      amount: 12000000,
      date: "2026-08-15",
    },
    {
      id: "tx-2",
      user_id: DUMMY_USER.id,
      type: "expense",
      category: "📈 Investasi",
      description: "Beli SBN Ritel",
      amount: 8500000,
      date: "2026-09-05",
    },
    {
      id: "tx-3",
      user_id: DUMMY_USER.id,
      type: "expense",
      category: "📈 Investasi",
      description: "Top up emas digital",
      amount: 5000000,
      date: "2026-09-22",
    },
    {
      id: "tx-4",
      user_id: DUMMY_USER.id,
      type: "income",
      category: "📈 Investasi",
      description: "Dividen saham",
      amount: 1750000,
      date: "2026-09-30",
    },
    {
      id: "tx-5",
      user_id: DUMMY_USER.id,
      type: "income",
      category: "📈 Investasi",
      description: "Imbal hasil reksa dana",
      amount: 620000,
      date: "2026-10-04",
    },
  ],
  chat_conversations: [
    {
      id: "cv-1",
      user_id: DUMMY_USER.id,
      title: "Tips menabung",
      created_at: "2026-10-01T10:00:00.000Z",
      updated_at: "2026-10-01T10:05:00.000Z",
    },
    {
      id: "cv-2",
      user_id: DUMMY_USER.id,
      title: "Budget 50/30/20",
      created_at: "2026-10-03T08:00:00.000Z",
      updated_at: "2026-10-03T08:12:00.000Z",
    },
    {
      id: "cv-3",
      user_id: DUMMY_USER.id,
      title: "Investasi untuk pemula",
      created_at: "2026-10-05T13:00:00.000Z",
      updated_at: "2026-10-05T13:20:00.000Z",
    },
  ],
  chat_messages: [
    {
      id: "cm-1",
      conversation_id: "cv-1",
      role: "user",
      content: "Gimana cara mulai menabung?",
      created_at: "2026-10-01T10:00:00.000Z",
    },
    {
      id: "cm-2",
      conversation_id: "cv-1",
      role: "assistant",
      content:
        "Mulai dari 20% gaji, sisihkan di awal bulan sebelum dipakai. Mau saya buatkan rencana menabung?",
      created_at: "2026-10-01T10:01:00.000Z",
    },
    {
      id: "cm-3",
      conversation_id: "cv-2",
      role: "user",
      content: "Apa itu aturan 50/30/20?",
      created_at: "2026-10-03T08:00:00.000Z",
    },
    {
      id: "cm-4",
      conversation_id: "cv-2",
      role: "assistant",
      content:
        "50% kebutuhan, 30% keinginan, 20% tabungan & investasi. Angka ini boleh disesuaikan dengan kondisimu.",
      created_at: "2026-10-03T08:01:00.000Z",
    },
    {
      id: "cm-5",
      conversation_id: "cv-3",
      role: "user",
      content: "Mau mulai investasi, modal 1 juta boleh?",
      created_at: "2026-10-05T13:00:00.000Z",
    },
    {
      id: "cm-6",
      conversation_id: "cv-3",
      role: "assistant",
      content:
        "Boleh banget. Mulai dari reksa dana pasar uang atau emas digital, lalu naikkan porsi secara bertahap.",
      created_at: "2026-10-05T13:01:00.000Z",
    },
  ],
  financial_profiles: [],
}

function readTable(table: string): Row[] {
  if (typeof window === "undefined") {
    return (SEEDS[table] ?? []).map((row) => ({ ...row }))
  }
  try {
    const raw = localStorage.getItem(NS + table)
    if (raw) return JSON.parse(raw)
  } catch {
    // storage tidak tersedia — pakai seed
  }
  const seed = (SEEDS[table] ?? []).map((row) => ({ ...row }))
  writeTable(table, seed)
  return seed
}

function writeTable(table: string, rows: Row[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(NS + table, JSON.stringify(rows))
  } catch {
    // kuota penuh / mode privat — abaikan
  }
}

function normalizeRow(table: string, row: Row): Row {
  const out: Row = {
    id: `${table.slice(0, 2)}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    created_at: new Date().toISOString(),
    user_id: DUMMY_USER.id,
    ...row,
  }
  // tabel savings_goals dipakai dua halaman (name vs title)
  if (table === "savings_goals") {
    if (!out.name && out.title) out.name = out.title
    if (!out.title && out.name) out.title = out.name
    if (out.description == null) out.description = ""
    if (out.category == null) out.category = "💰 Umum"
  }
  return out
}

type OrderSpec = { col: string; ascending: boolean }

class DummyQuery implements PromiseLike<{ data: any; error: any }> {
  private op: "select" | "insert" | "update" | "upsert" | "delete" = "select"
  private payload: Row | Row[] | null = null
  private filters: Array<[string, any]> = []
  private orderSpec: OrderSpec | null = null
  private limitN: number | null = null

  constructor(private table: string) {}

  select(_columns?: string) {
    if (this.op === "select") this.op = "select"
    return this
  }

  insert(values: Row | Row[]) {
    this.op = "insert"
    this.payload = values
    return this
  }

  update(values: Row) {
    this.op = "update"
    this.payload = values
    return this
  }

  upsert(values: Row) {
    this.op = "upsert"
    this.payload = values
    return this
  }

  delete() {
    this.op = "delete"
    return this
  }

  eq(column: string, value: any) {
    this.filters.push([column, value])
    return this
  }

  order(column: string, options?: { ascending?: boolean }) {
    this.orderSpec = { col: column, ascending: options?.ascending !== false }
    return this
  }

  limit(n: number) {
    this.limitN = n
    return this
  }

  private matches(row: Row) {
    return this.filters.every(([col, val]) => row[col] === val)
  }

  private execute(): { data: any; error: any } {
    try {
      const rows = readTable(this.table)

      if (this.op === "select") {
        let out = rows.filter((row) => this.matches(row))
        if (this.orderSpec) {
          const { col, ascending } = this.orderSpec
          out = [...out].sort((a, b) => {
            const av = a[col]
            const bv = b[col]
            if (av === bv) return 0
            if (av == null) return 1
            if (bv == null) return -1
            const cmp = av < bv ? -1 : 1
            return ascending ? cmp : -cmp
          })
        }
        if (this.limitN != null) out = out.slice(0, this.limitN)
        return { data: out, error: null }
      }

      if (this.op === "insert") {
        const items = Array.isArray(this.payload) ? this.payload : [this.payload!]
        const next = [...rows, ...items.map((item) => normalizeRow(this.table, item))]
        writeTable(this.table, next)
        return { data: items, error: null }
      }

      if (this.op === "update") {
        const values = this.payload as Row
        const next = rows.map((row) => (this.matches(row) ? { ...row, ...values } : row))
        writeTable(this.table, next)
        return { data: null, error: null }
      }

      if (this.op === "upsert") {
        const values = this.payload as Row
        const matched = rows.some((row) => this.matches(row))
        const next = matched
          ? rows.map((row) => (this.matches(row) ? { ...row, ...values } : row))
          : [...rows, normalizeRow(this.table, values)]
        writeTable(this.table, next)
        return { data: null, error: null }
      }

      // delete
      const next = rows.filter((row) => !this.matches(row))
      writeTable(this.table, next)
      return { data: null, error: null }
    } catch (error: any) {
      return { data: null, error: error?.message ?? "dummy db error" }
    }
  }

  then<TResult1 = { data: any; error: any }, TResult2 = never>(
    onfulfilled?: ((value: { data: any; error: any }) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
  ): PromiseLike<TResult1 | TResult2> {
    return Promise.resolve().then(() => this.execute()).then(onfulfilled, onrejected)
  }
}

export function createClient() {
  return {
    auth: {
      async getUser() {
        return { data: { user: DUMMY_USER }, error: null }
      },
      async getSession() {
        return {
          data: { session: { user: DUMMY_USER, access_token: "dummy" } },
          error: null,
        }
      },
    },
    from(table: string) {
      return new DummyQuery(table)
    },
  }
}