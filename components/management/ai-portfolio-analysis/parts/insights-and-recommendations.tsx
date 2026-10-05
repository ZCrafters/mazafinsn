"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Lightbulb, AlertTriangle, ChevronDown, ChevronRight, Check } from "lucide-react";
import { getDetailedInsight, getDetailedRecommendation } from "../data";

interface InsightsAndRecommendationsProps {
  insights: string[];
  recommendations: string[];
  warnings: string[];
  totalIncome: number;
  totalExpenses: number;
  currentBalance: number;
  onRewardPoints: (pts: number) => void;
}

export function InsightsAndRecommendations({
  insights,
  recommendations,
  warnings,
  totalIncome,
  totalExpenses,
  currentBalance,
  onRewardPoints,
}: InsightsAndRecommendationsProps) {
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Warnings */}
      {warnings && warnings.length > 0 && (
        <Card className="border border-destructive/30 bg-destructive/10 text-destructive shadow-sm">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-4 h-4" />
              Peringatan Risiko Finansial
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1 space-y-2">
            {warnings.map((warning, index) => (
              <div key={index} className="text-xs text-foreground/90 flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-1.5 flex-shrink-0" />
                <span>{warning}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* 2-col Insights & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Insights */}
        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="border-b border-border/60 pb-3">
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Brain className="w-3.5 h-3.5" />
              </div>
              Insight Keuangan Cerdas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {insights.map((insight, index) => {
              const isSelected = selectedInsight === insight;
              return (
                <div key={index} className="space-y-2">
                  <div
                    onClick={() => setSelectedInsight(isSelected ? null : insight)}
                    className="p-3 bg-background rounded-lg border border-border/70 hover:border-primary/50 cursor-pointer transition-colors flex items-start justify-between gap-2"
                  >
                    <div className="space-y-0.5">
                      <p className="text-xs font-medium text-foreground leading-snug">
                        {insight}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Klik untuk rincian analisis
                      </p>
                    </div>
                    <div className="text-muted-foreground mt-0.5">
                      {isSelected ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="p-3 bg-muted/40 rounded-lg border border-border text-xs text-muted-foreground space-y-3">
                      <div className="whitespace-pre-line leading-relaxed">
                        {getDetailedInsight(insight, totalIncome, totalExpenses, currentBalance)}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => onRewardPoints(10)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-7 px-2.5"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Bermanfaat (+10 poin)
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="border-b border-border/60 pb-3">
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Lightbulb className="w-3.5 h-3.5" />
              </div>
              Rekomendasi Tindakan
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {recommendations.map((rec, index) => {
              const isSelected = selectedRecommendation === rec;
              return (
                <div key={index} className="space-y-2">
                  <div
                    onClick={() => setSelectedRecommendation(isSelected ? null : rec)}
                    className="p-3 bg-background rounded-lg border border-border/70 hover:border-primary/50 cursor-pointer transition-colors flex items-start justify-between gap-2"
                  >
                    <div className="space-y-0.5">
                      <p className="text-xs font-medium text-foreground leading-snug">
                        {rec}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Klik untuk panduan langkah
                      </p>
                    </div>
                    <div className="text-muted-foreground mt-0.5">
                      {isSelected ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="p-3 bg-muted/40 rounded-lg border border-border text-xs text-muted-foreground space-y-3">
                      <div className="whitespace-pre-line leading-relaxed">
                        {getDetailedRecommendation(rec, totalIncome, totalExpenses)}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => onRewardPoints(15)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-7 px-2.5"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Siap Terapkan (+15 poin)
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
