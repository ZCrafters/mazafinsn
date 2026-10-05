"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Loader2 } from "lucide-react";

import { Message, EnhancedAIChatbotProps } from "./types";
import { generateAnalysis } from "./prompt";
import { ChatMessageBubble } from "./parts/chat-message-bubble";
import { QuickQuestions } from "./parts/quick-questions";
import { ChatInput } from "./parts/chat-input";

export default function EnhancedAIChatbot({
  transactions,
  totalIncome,
  totalExpenses,
  currentBalance,
}: EnhancedAIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Selamat datang di **Asisten Finansial AI**!

Saya telah memproses data arus kas Anda untuk sesi ini:

**Status Keuangan Terkini:**
- Total Pendapatan: **Rp ${totalIncome.toLocaleString("id-ID")}**
- Total Pengeluaran: **Rp ${totalExpenses.toLocaleString("id-ID")}**
- Saldo Bersih: **Rp ${currentBalance.toLocaleString("id-ID")}**
- Rasio Beban Pengeluaran: **${
        totalIncome > 0 ? ((totalExpenses / totalIncome) * 100).toFixed(1) : 0
      }%**

Pilih analisis cepat di bawah atau ajukan pertanyaan spesifik terkait anggaran Anda.`,
      timestamp: new Date(),
      type: "analysis",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const analysis = generateAnalysis(
        userMessage.content,
        transactions,
        totalIncome,
        totalExpenses
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: analysis.content,
        timestamp: new Date(),
        type: analysis.type,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1200);
  };

  const sendQuickQuestion = (question: string) => {
    if (isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const analysis = generateAnalysis(
        question,
        transactions,
        totalIncome,
        totalExpenses
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: analysis.content,
        timestamp: new Date(),
        type: analysis.type,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <Card className="border border-border bg-card shadow-sm rounded-xl mb-8 overflow-hidden">
      <CardHeader className="border-b border-border/60 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold text-foreground">
                Asisten Analisis Finansial AI
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Konsultasi evaluasi arus kas dan strategi alokasi
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs border-primary/40 bg-primary/5 text-primary">
            Siap Menganalisis
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div
          ref={scrollAreaRef}
          className="h-88 max-h-[380px] overflow-y-auto p-4 space-y-3.5"
          style={{ scrollBehavior: "smooth" }}
        >
          {messages.map((message) => (
            <ChatMessageBubble key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex gap-2.5 items-center text-xs text-muted-foreground p-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span>Memproses analisis data...</span>
            </div>
          )}
        </div>

        {/* Quick Questions */}
        <QuickQuestions
          onSelectQuestion={sendQuickQuestion}
          isLoading={isLoading}
        />

        {/* Input */}
        <ChatInput
          input={input}
          setInput={setInput}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}
