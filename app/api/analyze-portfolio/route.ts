import { type NextRequest, NextResponse } from "next/server"

// Google Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_BASE_URL = process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Input validation
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { financialData, budgetCategories, transactions } = body

    // Validate required fields
    if (!financialData || typeof financialData !== 'object') {
      return NextResponse.json({ error: "financialData is required and must be an object" }, { status: 400 })
    }

    // Validate financial data structure
    const requiredFields = ['totalBalance', 'monthlyIncome', 'monthlyExpenses', 'savings', 'investments', 'debts', 'savingsGoal']
    for (const field of requiredFields) {
      if (financialData[field] === undefined || financialData[field] === null) {
        return NextResponse.json({ error: `financialData.${field} is required` }, { status: 400 })
      }
      if (typeof financialData[field] !== 'number' || isNaN(financialData[field])) {
        return NextResponse.json({ error: `financialData.${field} must be a valid number` }, { status: 400 })
      }
    }

    // Validate optional arrays
    if (budgetCategories && !Array.isArray(budgetCategories)) {
      return NextResponse.json({ error: "budgetCategories must be an array" }, { status: 400 })
    }

    if (transactions && !Array.isArray(transactions)) {
      return NextResponse.json({ error: "transactions must be an array" }, { status: 400 })
    }

    const analysisPrompt = `
Sebagai ahli keuangan AI, analisis data keuangan berikut dan berikan insight, peringatan, dan rekomendasi dalam bahasa Indonesia:

Data Keuangan:
- Total Saldo: ${financialData.totalBalance}
- Pendapatan Bulanan: ${financialData.monthlyIncome}
- Pengeluaran Bulanan: ${financialData.monthlyExpenses}
- Tabungan: ${financialData.savings}
- Investasi: ${financialData.investments}
- Hutang: ${financialData.debts}
- Target Tabungan: ${financialData.savingsGoal}

Budget Categories: ${JSON.stringify(budgetCategories)}
Recent Transactions: ${JSON.stringify(transactions.slice(0, 10))}

Berikan analisis dalam format JSON dengan struktur:
{
  "insights": ["insight 1", "insight 2", ...],
  "warnings": ["warning 1", "warning 2", ...],
  "recommendations": ["recommendation 1", "recommendation 2", ...]
}

Fokus pada:
1. Kesehatan keuangan secara keseluruhan
2. Rasio tabungan dan pengeluaran
3. Diversifikasi investasi
4. Manajemen hutang
5. Pencapaian target keuangan
6. Pola pengeluaran dari budget dan transaksi
`

if (!GEMINI_API_KEY) {
  return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 })
}

// Use Google Gemini API
const response = await fetch(`${GEMINI_BASE_URL}/models/gemini-2.0-flash:generateContent`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-goog-api-key': GEMINI_API_KEY,
  },
  body: JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: analysisPrompt
          }
        ]
      }
    ],
    generationConfig: {
      maxOutputTokens: 1000,
      temperature: 0.7
    }
  })
})

if (!response.ok) {
  throw new Error(`Gemini API error: ${response.status}`)
}

const data = await response.json()
const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}"

    // Parse the AI response
    let analysis
    try {
      analysis = JSON.parse(text)
    } catch (parseError) {
      // Fallback if JSON parsing fails
      analysis = {
        insights: [
          "Analisis keuangan Anda menunjukkan pola yang menarik untuk diperhatikan.",
          "Data keuangan Anda memberikan gambaran tentang kebiasaan finansial saat ini.",
        ],
        warnings: [],
        recommendations: [
          "Lanjutkan monitoring keuangan secara berkala.",
          "Pertimbangkan untuk meningkatkan diversifikasi investasi.",
        ],
      }
    }

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Error in financial analysis:", error)
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
    }
    
    // Handle API key errors
    if (error instanceof Error && error.message.includes("GEMINI_API_KEY")) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }
    
    return NextResponse.json(
      {
        insights: ["Tidak dapat menganalisis data saat ini. Silakan coba lagi nanti."],
        warnings: [],
        recommendations: ["Pastikan semua data keuangan telah diinput dengan benar."],
      },
      { status: 500 },
    )
  }
}
