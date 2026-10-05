"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Bot, Shield, Star, Zap, Loader2, MessageCircle, Send } from "lucide-react";
import { AnalysisResult } from "../types";

interface HeaderAndTrustProps {
  analysis: AnalysisResult | null;
  isLoading: boolean;
  userPoints: number;
  transactionsCount: number;
  onAnalyze: () => void;
  chatMessages: { role: "user" | "ai"; message: string }[];
  onSendMessage: (msg: string) => void;
}

export function HeaderAndTrust({
  analysis,
  isLoading,
  userPoints,
  transactionsCount,
  onAnalyze,
  chatMessages,
  onSendMessage,
}: HeaderAndTrustProps) {
  const [showChatbot, setShowChatbot] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage.trim());
      setInputMessage("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border/70">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-foreground">
              Analisis Portofolio & Penasihat AI
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Evaluasi kesehatan finansial cerdas, panduan alokasi anggaran, dan target terarah
          </p>
        </div>

        {/* Indicators & Points */}
        <div className="flex items-center gap-2.5">
          {analysis && (
            <Badge variant="outline" className="border-primary/40 bg-primary/5 text-primary text-xs py-1 px-3">
              <Shield className="w-3.5 h-3.5 mr-1" />
              Skor Percaya: <span className="font-mono tabular-nums ml-1 font-bold">{analysis.trustScore}%</span>
            </Badge>
          )}
          <Badge variant="outline" className="border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs py-1 px-3">
            <Star className="w-3.5 h-3.5 mr-1" />
            Poin: <span className="font-mono tabular-nums ml-1 font-bold">{userPoints}</span>
          </Badge>
        </div>
      </div>

      {/* Action Triggers */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          onClick={onAnalyze}
          disabled={isLoading || transactionsCount === 0}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-10 px-5 text-sm"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menganalisis Data...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Mulai Analisis Portofolio
            </>
          )}
        </Button>

        <Button
          onClick={() => setShowChatbot(!showChatbot)}
          variant="outline"
          className="border-border text-foreground hover:bg-muted font-medium h-10 px-4 text-sm"
        >
          <MessageCircle className="mr-2 h-4 w-4 text-primary" />
          {showChatbot ? "Tutup Asisten Chat" : "Tanya Asisten Keuangan"}
        </Button>
      </div>

      {/* Embedded Assistant Box */}
      {showChatbot && (
        <Card className="border border-border bg-card shadow-sm rounded-xl">
          <CardHeader className="p-4 border-b border-border/60">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Bot className="w-4 h-4 text-primary" />
              Asisten AI Interaktif
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="h-44 overflow-y-auto bg-background rounded-lg border border-border p-3 space-y-2">
              {chatMessages.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  Halo! Saya asisten finansial Anda. Tanyakan tips penghematan, rasio tabungan, atau strategi alokasi dana.
                </p>
              ) : (
                chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-md px-3 py-1.5 rounded-lg text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Ajukan pertanyaan keuangan..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                className="text-xs h-9"
              />
              <Button size="sm" onClick={handleSend} className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-3">
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
