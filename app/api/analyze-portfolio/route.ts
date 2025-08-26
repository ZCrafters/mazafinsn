import { type NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

// Groq API configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY || "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"

if (!GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY environment variable is required")
}

const groq = new Groq({ apiKey: GROQ_API_KEY })

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

    // Use Groq API
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: analysisPrompt
        }
      ],
      model: 'llama3-8b-8192',
      max_tokens: 1000,
      temperature: 0.7
    })

    const text = chatCompletion.choices?.[0]?.message?.content || "{}"

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
    if (error instanceof Error && error.message.includes("GROQ_API_KEY")) {
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
