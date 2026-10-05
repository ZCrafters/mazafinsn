"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Sparkles, Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { MessageBubble, QuickQuestions, ChatInput } from "@/components/chatbot"
import type { Message } from "@/components/chatbot"

export default function EnhancedBubbleChatbot() {
  const { t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: t("ai.welcome"),
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationId: conversationId,
        }),
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()

      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId)
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message || t("ai.error") || "Terjadi kesalahan. Silakan coba lagi.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: t("ai.error") || "Terjadi kesalahan. Silakan coba lagi.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const sendQuickQuestion = async (question: string) => {
    if (isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
          conversationId: conversationId,
        }),
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()

      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId)
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message || t("ai.error") || "Terjadi kesalahan. Silakan coba lagi.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: t("ai.error") || "Terjadi kesalahan. Silakan coba lagi.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[100dvh] bg-background text-foreground py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Editorial Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-1.5 shadow-sm mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs md:text-sm font-medium text-foreground">
              {t("ai.poweredBy") || "Ditenagai AI Canggih"}
            </span>
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 text-[10px] font-mono"
            >
              {t("ai.live") || "Live"}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-foreground mb-3 text-balance">
            {t("ai.title") || "Asisten Keuangan AI"}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto font-sans leading-relaxed text-pretty">
            {t("ai.subtitle") ||
              "Konsultasi keuangan dan investasi dengan AI yang komprehensif dan real-time"}
          </p>
        </div>

        {/* Main Chat Interface */}
        <Card className="h-[75vh] max-h-[720px] min-h-[580px] flex flex-col bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <CardHeader className="bg-muted/40 border-b border-border p-4 md:p-5">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center text-primary">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base md:text-lg font-display font-bold text-foreground">
                    {t("ai.assistantName") || "MAZA Finance AI"}
                  </h2>
                  <p className="text-muted-foreground text-xs font-sans">
                    {t("ai.assistantDesc") || "Asisten Kecerdasan Finansial"}
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20 text-xs font-mono"
              >
                {t("ai.online") || "Online"}
              </Badge>
            </CardTitle>
          </CardHeader>

          {/* Chat Body */}
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden bg-card">
            <div
              ref={scrollAreaRef}
              className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4"
              style={{ scrollBehavior: "smooth" }}
            >
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  enableMarkdown={true}
                />
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start items-center">
                  <div className="w-8 h-8 rounded-full bg-muted border border-border text-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-3.5 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <span className="text-xs md:text-sm text-muted-foreground font-sans">
                        {t("ai.analyzing") || "AI sedang menganalisis..."}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Questions on initial conversation */}
            {messages.length <= 1 && (
              <QuickQuestions
                onSelect={sendQuickQuestion}
                disabled={isLoading}
                columns={2}
              />
            )}

            {/* Input Form with Disclaimer */}
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={handleSendMessage}
              isLoading={isLoading}
              showDisclaimer={true}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
