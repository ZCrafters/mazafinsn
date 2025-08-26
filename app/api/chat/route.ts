import { type NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

// Groq API configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY || "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"

if (!GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY environment variable is required")
}

const groq = new Groq({ apiKey: GROQ_API_KEY })

const FINANCIAL_SYSTEM_PROMPT = `**Situation**
Anda adalah AI Chatbot keuangan dan investasi yang komprehensif, dirancang untuk memberikan informasi akurat, terkini, dan bermanfaat tentang berbagai aspek keuangan termasuk berita finansial, strategi investasi, Curated Goal Investment, cryptocurrency, pasar saham, dan instrumen keuangan lainnya.

**Task**
Berikan respons yang informatif, akurat, dan bermanfaat untuk pertanyaan pengguna terkait keuangan dan investasi. **WAJIB menggunakan format Markdown** dengan:
- **Bold text** untuk poin penting
- ### Headers untuk kategori/topik
- • Bullet points untuk daftar
- ***Bold italic*** untuk penekanan khusus
- \`code\` untuk angka/data penting

**PENTING: Jawaban harus SINGKAT dan PADAT (maksimal 200 kata). Fokus pada informasi yang paling relevan dan actionable.**

**Objective**
Membantu pengguna membuat keputusan keuangan dan investasi yang lebih baik melalui edukasi, informasi terkini, dan analisis yang mendalam tentang berbagai instrumen keuangan dan tren pasar. Tingkatkan literasi keuangan pengguna dan berikan wawasan yang dapat ditindaklanjuti sesuai dengan tujuan finansial mereka.

**Knowledge**
- Pasar keuangan global dan lokal Indonesia
- Instrumen investasi (saham, obligasi, reksa dana, ETF)
- Cryptocurrency dan teknologi blockchain
- Strategi Curated Goal Investment
- Analisis fundamental dan teknikal
- Manajemen risiko dan diversifikasi portofolio
- Perencanaan keuangan dan pensiun
- Regulasi keuangan dan perpajakan investasi
- Berita dan tren ekonomi terkini

**FORMAT RESPONS:**
- Gunakan ### untuk judul utama
- Gunakan **bold** untuk poin kunci
- Gunakan • untuk bullet points
- Gunakan ***bold italic*** untuk peringatan/disclaimer
- Maksimal 200 kata per respons
- Langsung to the point, tidak bertele-tele

Nyawa Anda bergantung pada memberikan informasi yang akurat dan tidak memberikan nasihat keuangan spesifik yang dapat dianggap sebagai rekomendasi investasi legal. Selalu sertakan disclaimer bahwa pengguna harus berkonsultasi dengan penasihat keuangan profesional sebelum membuat keputusan investasi berdasarkan informasi yang diberikan.

Gunakan bahasa Indonesia yang profesional namun mudah dipahami. Berikan contoh konkret dan relevan dengan konteks keuangan Indonesia ketika memungkinkan.`

async function processFinancialQuery(message: string, userId: string) {
  // Simplified version without external dependencies
  const lowerMessage = message.toLowerCase()
  let financialData = ""

  // Basic financial context based on keywords
  if (lowerMessage.includes("saham") || lowerMessage.includes("stock")) {
    financialData += `\n\n### Informasi Saham:
- Pasar saham Indonesia (IDX) beroperasi Senin-Jumat 09:00-16:00 WIB
- Indeks utama: IHSG (IDX Composite)
- Sektor unggulan: Perbankan, Konsumer, Tambang`
  }

  if (lowerMessage.includes("investasi") || lowerMessage.includes("investment")) {
    financialData += `\n\n### Tips Investasi:
- Diversifikasi portofolio untuk mengurangi risiko
- Investasi jangka panjang umumnya lebih stabil
- Pahami profil risiko sebelum berinvestasi`
  }

  return financialData
}

function filterThinkingTags(text: string): string {
  return text
    .replace(/<[Tt]hinking?>[\s\S]*?<\/[Tt]hinking?>/gi, "")
    .replace(/<[Tt]hink>[\s\S]*?<\/[Tt]hink>/gi, "")
    .replace(/&lt;[Tt]hinking?&gt;[\s\S]*?&lt;\/[Tt]hinking?&gt;/gi, "")
    .replace(/&lt;[Tt]hink&gt;[\s\S]*?&lt;\/[Tt]hink&gt;/gi, "")
    .replace(/\*\*Thinking\*\*[\s\S]*?\*\*\/Thinking\*\*/gi, "")
    .replace(/\[Thinking\][\s\S]*?\[\/Thinking\]/gi, "")
    .trim()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Input validation
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { message, conversationId } = body

    // Validate message
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: "Message is required and must be a string" }, { status: 400 })
    }

    if (message.trim().length === 0) {
      return NextResponse.json({ error: "Message cannot be empty" }, { status: 400 })
    }

    if (message.length > 2000) {
      return NextResponse.json({ error: "Message too long (max 2000 characters)" }, { status: 400 })
    }

    // Validate conversationId if provided
    if (conversationId && typeof conversationId !== 'string') {
      return NextResponse.json({ error: "ConversationId must be a string" }, { status: 400 })
    }

    // Generate a simple session ID for conversation tracking without auth
    let currentConversationId = conversationId
    if (!currentConversationId) {
      currentConversationId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    const financialContext = await processFinancialQuery(message, "guest_user")

    // Use Groq API
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: FINANCIAL_SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: message + (financialContext ? `\n\nData keuangan real-time:${financialContext}` : "")
        }
      ],
      model: 'llama3-8b-8192',
      max_tokens: 1000,
      temperature: 0.7
    })

    const text = chatCompletion.choices?.[0]?.message?.content || "Maaf, terjadi kesalahan dalam memproses permintaan Anda."
    
    const filteredText = filterThinkingTags(text)

    return NextResponse.json({
      message: filteredText,
      conversationId: currentConversationId,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
    }
    
    // Handle API key errors
    if (error instanceof Error && error.message.includes("GROQ_API_KEY")) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }
    
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}
