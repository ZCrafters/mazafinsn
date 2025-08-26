'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react'

interface Transaction {
  id: string
  type: 'income' | 'expense'
  category: string
  description: string
  amount: number
  date: string
}

interface AnalysisResult {
  insights: string[]
  warnings: string[]
  recommendations: string[]
}

interface AIPortfolioAnalysisProps {
  transactions: Transaction[]
  totalIncome: number
  totalExpenses: number
  currentBalance: number
}

export default function AIPortfolioAnalysis({ 
  transactions, 
  totalIncome, 
  totalExpenses, 
  currentBalance 
}: AIPortfolioAnalysisProps) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzePortfolio = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Prepare financial data for analysis
      const financialData = {
        totalBalance: currentBalance,
        monthlyIncome: totalIncome,
        monthlyExpenses: totalExpenses,
        savings: Math.max(0, currentBalance * 0.2), // Estimate 20% as savings
        investments: Math.max(0, currentBalance * 0.1), // Estimate 10% as investments
        debts: Math.max(0, totalExpenses * 0.1), // Estimate some debt
        savingsGoal: totalIncome * 6 // 6 months emergency fund goal
      }

      // Get budget categories from transactions
      const budgetCategories = Array.from(
        new Set(transactions.map(t => t.category))
      ).map(category => ({
        category,
        budget: transactions
          .filter(t => t.category === category && t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0),
        spent: transactions
          .filter(t => t.category === category && t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0)
      }))

      const response = await fetch('/api/analyze-portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          financialData,
          budgetCategories,
          transactions: transactions.slice(0, 10) // Send recent transactions
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze portfolio')
      }

      const result = await response.json()
      setAnalysis(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <TrendingUp className="h-6 w-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Analisis AI Portfolio Keuangan
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Analisis mendalam tentang kondisi keuangan Anda dengan rekomendasi AI
        </p>
      </div>

      {/* Analyze Button */}
      <div className="flex justify-center">
        <Button
          onClick={analyzePortfolio}
          disabled={isLoading || transactions.length === 0}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Menganalisis...
            </>
          ) : (
            <>
              <TrendingUp className="mr-2 h-5 w-5" />
              Analisis Portfolio
            </>
          )}
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              <p>Error: {error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Insight Keuangan */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <TrendingUp className="h-5 w-5" />
                📊 Insight Keuangan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.insights.map((insight, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-blue-800 text-sm leading-relaxed">
                    {insight}
                  </p>
                </div>
              ))}
              
              {/* Additional default insights */}
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                <p className="text-blue-800 text-sm leading-relaxed">
                  Analisis keuangan Anda menunjukkan pola yang menarik untuk diperhatikan.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                <p className="text-blue-800 text-sm leading-relaxed">
                  Data keuangan Anda memberikan gambaran tentang kebiasaan finansial saat ini.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Rekomendasi */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Lightbulb className="h-5 w-5" />
                ✅ Rekomendasi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-green-800 text-sm leading-relaxed">
                    {recommendation}
                  </p>
                </div>
              ))}
              
              {/* Additional default recommendations */}
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                <p className="text-green-800 text-sm leading-relaxed">
                  Lanjutkan monitoring keuangan secara berkala.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                <p className="text-green-800 text-sm leading-relaxed">
                  Pertimbangkan untuk meningkatkan diversifikasi investasi.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Warnings (if any) */}
      {analysis && analysis.warnings && analysis.warnings.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              ⚠️ Peringatan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analysis.warnings.map((warning, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0" />
                <p className="text-yellow-800 text-sm leading-relaxed">
                  {warning}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* No Data Message */}
      {transactions.length === 0 && (
        <Card className="border-gray-200 bg-gray-50">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600">
              Tambahkan beberapa transaksi terlebih dahulu untuk mendapatkan analisis AI yang akurat.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}