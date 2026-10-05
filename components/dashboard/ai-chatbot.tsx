"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bot, Loader2, MessageSquare, Plus, LogIn } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/lib/language-context"
import { MessageBubble, QuickQuestions, ChatInput } from "@/components/chatbot"
import type { Message, Conversation } from "@/components/chatbot"

export default function AIChatbot() {
  const { t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  const loadConversations = useCallback(async () => {
    const { data, error } = await supabase
      .from("chat_conversations")
      .select("id, title, created_at")
      .order("updated_at", { ascending: false })
      .limit(10)

    if (!error && data) {
      setConversations(data)
    }
  }, [supabase])

  const startNewConversation = useCallback(() => {
    setMessages([
      {
        id: "welcome",
        content: t("ai.welcome"),
        role: "assistant",
        timestamp: new Date(),
      },
    ])
    setCurrentConversationId(null)
  }, [t])

  useEffect(() => {
    const initializeUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        loadConversations()
      }
    }

    initializeUser()
  }, [loadConversations, supabase.auth])

  const loadConversation = async (conversationId: string) => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true })

    if (!error && data) {
      const formattedMessages = data.map((msg) => ({
        id: msg.id,
        content: msg.content,
        role: msg.role as "user" | "assistant",
        timestamp: new Date(msg.created_at),
      }))
      setMessages(formattedMessages)
      setCurrentConversationId(conversationId)
    }
  }

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (user && conversations.length === 0 && messages.length === 0) {
      startNewConversation()
    }
  }, [user, conversations, messages.length, startNewConversation])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading || !user) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
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
          conversationId: currentConversationId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message || t("ai.error") || "Terjadi kesalahan. Silakan coba lagi.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      if (data.conversationId && !currentConversationId) {
        setCurrentConversationId(data.conversationId)
        loadConversations()
      }
    } catch (error) {
      console.error("Chat error:", error)
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: t("ai.error") || "Terjadi kesalahan. Silakan coba lagi.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, fallbackMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const sendQuickQuestion = async (question: string) => {
    if (isLoading || !user) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: question,
      role: "user",
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
          conversationId: currentConversationId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message || t("ai.error") || "Terjadi kesalahan. Silakan coba lagi.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      if (data.conversationId && !currentConversationId) {
        setCurrentConversationId(data.conversationId)
        loadConversations()
      }
    } catch (error) {
      console.error("Chat error:", error)
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: t("ai.error") || "Terjadi kesalahan. Silakan coba lagi.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, fallbackMessage])
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <section className="py-12 px-4 bg-background">
        <div className="max-w-xl mx-auto text-center">
          <Card className="p-8 bg-card border border-border rounded-2xl shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 text-primary mx-auto flex items-center justify-center mb-4">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold mb-2 text-foreground">
              {t("ai.signInTitle") || "Silakan Masuk"}
            </h3>
            <p className="text-muted-foreground text-sm font-sans mb-6">
              {t("ai.signInPrompt") || "Anda harus masuk untuk menggunakan Asisten AI Finansial."}
            </p>
            <Link href="/auth/signin">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl">
                <LogIn className="w-4 h-4 mr-2" />
                {t("header.signIn") || "Masuk"}
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2 tracking-tight">
            {t("ai.title") || "Asisten Keuangan AI"}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto font-sans text-pretty">
            {t("ai.subtitle") ||
              "Konsultasi keuangan dan investasi dengan AI yang komprehensif dan real-time"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Conversation History Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-[620px] flex flex-col bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
              <CardHeader className="p-4 border-b border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-display font-semibold text-foreground">
                    {t("ai.conversations") || "Percakapan"}
                  </CardTitle>
                  <Button
                    onClick={startNewConversation}
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 rounded-lg border-border hover:border-primary/40 hover:text-primary transition-colors"
                    aria-label={t("ai.newConversation") || "Percakapan Baru"}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-3 overflow-hidden bg-card">
                <ScrollArea className="h-full">
                  <div className="space-y-1.5 pr-2">
                    {conversations.length === 0 ? (
                      <p className="text-xs text-muted-foreground text-center py-6 font-sans">
                        {t("ai.noConversations") || "Belum ada percakapan"}
                      </p>
                    ) : (
                      conversations.map((conv) => (
                        <Button
                          key={conv.id}
                          onClick={() => loadConversation(conv.id)}
                          variant={currentConversationId === conv.id ? "secondary" : "ghost"}
                          className={`w-full justify-start text-left h-auto p-2.5 rounded-xl transition-colors ${
                            currentConversationId === conv.id
                              ? "bg-muted text-foreground font-medium border border-border"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          }`}
                        >
                          <div className="flex items-start gap-2.5 w-full min-w-0">
                            <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs truncate">{conv.title}</p>
                              <p className="text-[10px] text-muted-foreground font-mono tabular-nums">
                                {new Date(conv.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </Button>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Chat Window Area */}
          <div className="lg:col-span-3">
            <Card className="h-[620px] flex flex-col shadow-sm border border-border bg-card rounded-2xl overflow-hidden">
              {/* Chat Header */}
              <CardHeader className="bg-muted/40 border-b border-border p-4">
                <CardTitle className="flex items-center gap-2 text-sm md:text-base font-display font-semibold text-foreground">
                  <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Bot className="h-4 w-4" />
                  </div>
                  <span>{t("ai.assistantName") || "Maza Finance AI"}</span>
                  <Badge
                    variant="secondary"
                    className="ml-auto bg-primary/10 text-primary border-primary/20 text-[10px] font-mono"
                  >
                    {t("ai.realtimeBadge") || "Data Real-time"}
                  </Badge>
                </CardTitle>
              </CardHeader>

              {/* Chat Messages */}
              <CardContent className="flex-1 flex flex-col p-0 overflow-hidden bg-card">
                <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 md:p-5">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <MessageBubble key={message.id} message={message} />
                    ))}

                    {isLoading && (
                      <div className="flex gap-2.5 justify-start items-center">
                        <div className="w-8 h-8 rounded-full bg-muted border border-border text-primary flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-3 shadow-sm">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                            <span className="text-xs text-muted-foreground font-sans">
                              {t("ai.analyzing") || "AI sedang menganalisis..."}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Quick questions if 1 or 0 messages */}
                {messages.length <= 1 && (
                  <QuickQuestions
                    onSelect={sendQuickQuestion}
                    disabled={isLoading}
                    columns={2}
                  />
                )}

                {/* Input row */}
                <ChatInput
                  value={input}
                  onChange={setInput}
                  onSend={handleSendMessage}
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
