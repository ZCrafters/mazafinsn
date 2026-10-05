import { type NextRequest, NextResponse } from "next/server"

// Google Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_BASE_URL = process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta"

export async function POST(request: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 })
  }
  try {
    const body = await request.json()
    
    // Input validation
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { age, investmentHorizon, riskTolerance } = body

    // Validate age
    if (!age || typeof age !== 'number' || isNaN(age)) {
      return NextResponse.json({ error: "Age is required and must be a valid number" }, { status: 400 })
    }

    if (age < 18 || age > 100) {
      return NextResponse.json({ error: "Age must be between 18 and 100" }, { status: 400 })
    }

    // Validate investment horizon
    if (!investmentHorizon || typeof investmentHorizon !== 'number' || isNaN(investmentHorizon)) {
      return NextResponse.json({ error: "Investment horizon is required and must be a valid number" }, { status: 400 })
    }

    if (investmentHorizon < 1 || investmentHorizon > 50) {
      return NextResponse.json({ error: "Investment horizon must be between 1 and 50 years" }, { status: 400 })
    }

    // Validate risk tolerance
    if (!riskTolerance || typeof riskTolerance !== 'string') {
      return NextResponse.json({ error: "Risk tolerance is required and must be a string" }, { status: 400 })
    }

    const validRiskLevels = ['conservative', 'moderate', 'aggressive']
    if (!validRiskLevels.includes(riskTolerance.toLowerCase())) {
      return NextResponse.json({
        error: `Risk tolerance must be one of: ${validRiskLevels.join(', ')}`
      }, { status: 400 })
    }

    const prompt = `
    Analyze this investment profile and provide recommendations in Indonesian:
    
    Age: ${age} years
    Investment Horizon: ${investmentHorizon} years  
    Risk Tolerance: ${riskTolerance}
    
    Please provide:
    1. Risk profile assessment
    2. Recommended asset allocation
    3. Investment strategy recommendations
    4. Specific warnings or considerations
    
    Format the response as JSON with keys: assessment, allocation, strategy, warnings
    `

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
                text: prompt
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

    // Parse the AI response or provide fallback
    let analysis
    try {
      analysis = JSON.parse(text)
    } catch {
      analysis = {
        assessment: `Berdasarkan usia ${age} tahun dan horizon investasi ${investmentHorizon} tahun dengan toleransi risiko ${riskTolerance}, profil Anda menunjukkan karakteristik investor yang perlu mempertimbangkan keseimbangan antara pertumbuhan dan stabilitas.`,
        allocation: {
          saham: riskTolerance === "aggressive" ? 70 : riskTolerance === "moderate" ? 50 : 30,
          obligasi: riskTolerance === "aggressive" ? 20 : riskTolerance === "moderate" ? 35 : 50,
          reksadana: 10,
          emas: riskTolerance === "conservative" ? 20 : 10,
        },
        strategy: [
          "Diversifikasi portfolio untuk mengurangi risiko",
          "Investasi rutin dengan dollar cost averaging",
          "Review dan rebalancing portfolio secara berkala",
        ],
        warnings:
          age > 50
            ? [
                "Pertimbangkan untuk mengurangi eksposur risiko tinggi",
                "Fokus pada preservasi modal dan income generation",
              ]
            : [
                "Manfaatkan horizon investasi yang panjang untuk pertumbuhan",
                "Jangan panik dengan volatilitas jangka pendek",
              ],
      }
    }

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Error analyzing risk profile:", error)
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
    }
    
    // Handle API key errors
    if (error instanceof Error && error.message.includes("GEMINI_API_KEY")) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }
    
    return NextResponse.json({ error: "Failed to analyze risk profile" }, { status: 500 })
  }
}
