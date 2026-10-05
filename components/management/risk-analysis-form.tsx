"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";
import { Brain, Loader2 } from "lucide-react";

interface RiskAnalysisFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalysisComplete: (analysis: any) => void;
}

export default function RiskAnalysisForm({
  isOpen,
  onClose,
  onAnalysisComplete,
}: RiskAnalysisFormProps) {
  const [formData, setFormData] = useState({
    age: "",
    investmentHorizon: "",
    riskTolerance: "",
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    try {
      const supabase = createClient();

      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error("User not authenticated");
      }

      // Save or update financial profile
      const { error: profileError } = await supabase
        .from("financial_profiles")
        .upsert({
          user_id: user.id,
          age: Number.parseInt(formData.age),
          investment_horizon: Number.parseInt(formData.investmentHorizon),
          risk_tolerance: formData.riskTolerance,
        });

      if (profileError) throw profileError;

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
      });

      if (!response.ok) {
        throw new Error("Failed to analyze risk profile");
      }

      const analysis = await response.json();
      onAnalysisComplete(analysis);
      onClose();
    } catch (error) {
      console.error("Error analyzing risk profile:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card text-foreground border-border">
        <DialogHeader className="pb-3 border-b border-border/60">
          <DialogTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Brain className="w-3.5 h-3.5" />
            </div>
            Analisis Profil Risiko Investasi
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-0.5">
            Tentukan parameter risiko Anda untuk mendapatkan panduan alokasi portofolio
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label htmlFor="age" className="text-xs font-medium text-foreground">
              Usia (Tahun)
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Contoh: 28"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              className="bg-background border-border text-foreground font-mono tabular-nums h-9 text-xs sm:text-sm"
              required
              min="18"
              max="100"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="horizon" className="text-xs font-medium text-foreground">
              Horizon Waktu Investasi (Tahun)
            </Label>
            <Input
              id="horizon"
              type="text"
              placeholder="Contoh: 5, 10, 20"
              value={formData.investmentHorizon}
              onChange={(e) =>
                setFormData({ ...formData, investmentHorizon: e.target.value })
              }
              className="bg-background border-border text-foreground font-mono tabular-nums h-9 text-xs sm:text-sm"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-foreground">
              Tingkat Toleransi Risiko
            </Label>
            <Select
              value={formData.riskTolerance}
              onValueChange={(value) =>
                setFormData({ ...formData, riskTolerance: value })
              }
            >
              <SelectTrigger className="bg-background border-border text-foreground h-9 text-xs sm:text-sm">
                <SelectValue placeholder="Pilih Toleransi Risiko" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="conservative" className="text-xs sm:text-sm">
                  Konservatif (Prioritas Keamanan Modal)
                </SelectItem>
                <SelectItem value="moderate" className="text-xs sm:text-sm">
                  Moderat (Keseimbangan Imbal Hasil & Risiko)
                </SelectItem>
                <SelectItem value="aggressive" className="text-xs sm:text-sm">
                  Agresif (Pertumbuhan Maksimal Jangka Panjang)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2 pt-4 border-t border-border/60">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-border text-foreground h-9 text-xs flex-1"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isAnalyzing}
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 text-xs font-medium flex-1"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Menganalisis...
                </>
              ) : (
                <>
                  <Brain className="w-3.5 h-3.5 mr-1.5" />
                  Proses Profil Risiko
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
