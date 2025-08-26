"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { createClient } from "@/lib/supabase/client"
import { Brain, Loader2 } from "lucide-react"

interface RiskAnalysisFormProps {
  isOpen: boolean
  onClose: () => void
  onAnalysisComplete: (analysis: any) => void
}

export default function RiskAnalysisForm({ isOpen, onClose, onAnalysisComplete }: RiskAnalysisFormProps) {
  const [formData, setFormData] = useState({
    age: "",
    investmentHorizon: "",
    riskTolerance: "",
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnalyzing(true)

    try {
      const supabase = createClient()

      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()
      if (userError || !user) {
        throw new Error("User not authenticated")
      }

      // Save or update financial profile
      const { error: profileError } = await supabase.from("financial_profiles").upsert({
        user_id: user.id,
        age: Number.parseInt(formData.age),
        investment_horizon: Number.parseInt(formData.investmentHorizon),
        risk_tolerance: formData.riskTolerance,
      })

      if (profileError) throw profileError

      // Generate AI analysis
      const response = await fetch("/api/analyze-risk-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: Number.parseInt(formData.age),
          investmentHorizon: Number.parseInt(formData.investmentHorizon),
          riskTolerance: formData.riskTolerance,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze risk profile")
      }

      const analysis = await response.json()
      onAnalysisComplete(analysis)
      onClose()
    } catch (error) {
      console.error("Error analyzing risk profile:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-slate-800 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">👤 Analisis Profil Risiko</DialogTitle>
          <DialogDescription className="text-slate-300">
            Dapatkan rekomendasi investasi berdasarkan profil risiko Anda
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="age" className="text-slate-200">
              Usia Anda
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Masukkan usia Anda"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white"
              required
              min="18"
              max="100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="horizon" className="text-slate-200">
              Horizon Investasi (tahun)
            </Label>
            <Input
              id="horizon"
              type="text"
              placeholder="Contoh: 5, 10, 20"
              value={formData.investmentHorizon}
              onChange={(e) => setFormData({ ...formData, investmentHorizon: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-200">Toleransi Risiko</Label>
            <Select
              value={formData.riskTolerance}
              onValueChange={(value) => setFormData({ ...formData, riskTolerance: value })}
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Pilih Toleransi Risiko" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="conservative" className="text-white hover:bg-slate-600">
                  Konservatif
                </SelectItem>
                <SelectItem value="moderate" className="text-white hover:bg-slate-600">
                  Moderat
                </SelectItem>
                <SelectItem value="aggressive" className="text-white hover:bg-slate-600">
                  Agresif
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menganalisis...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Analisis Profil Risiko
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
