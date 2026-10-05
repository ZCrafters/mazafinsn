"use client";

import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import { analysisQuestions } from "../prompt";

interface QuickQuestionsProps {
  onSelectQuestion: (question: string) => void;
  isLoading: boolean;
}

export function QuickQuestions({ onSelectQuestion, isLoading }: QuickQuestionsProps) {
  return (
    <div className="border-t border-border/70 p-4 bg-muted/30">
      <p className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
        <BarChart3 className="w-3.5 h-3.5 text-primary" />
        Pilihan Analisis Cepat:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {analysisQuestions.map((question, index) => {
          const Icon = question.icon;
          return (
            <Button
              key={index}
              onClick={() => onSelectQuestion(question.text)}
              variant="outline"
              className="justify-start text-left h-auto py-2.5 px-3 bg-background hover:bg-muted border-border text-foreground font-normal text-xs"
              disabled={isLoading}
            >
              <Icon className="w-3.5 h-3.5 mr-2 text-primary flex-shrink-0" />
              <span className="truncate">{question.text}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
