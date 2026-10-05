"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bot, Loader2, X, Minimize2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/lib/language-context"
import { MessageBubble, QuickQuestions, ChatInput } from "@/components/chatbot"
import type { Message } from "@/components/chatbot"

export default function FloatingAIChatbot() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  const initializeUser = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser(user)

    if (user && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          content: t("ai.welcome"),
          role: "assistant",
          timestamp: new Date(),
        },
      ])
    }
  }, [messages.length, supabase.auth, t])

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

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
          conversationId: null,
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

      if (!isOpen) {
        setHasNewMessage(true)
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
          conversationId: null,
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

  const openChat = () => {
    setIsOpen(true)
    setIsMinimized(false)
    setHasNewMessage(false)
  }

  const closeChat = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  const minimizeChat = () => {
    setIsMinimized(true)
  }

  if (!user) {
    return null
  }

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <Button
          onClick={openChat}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl z-50 p-0 border border-primary-foreground/20 transition-all active:-translate-y-px"
          aria-label={t("header.aiChat") || "AI Chat"}
        >
          <div className="relative">
            <Bot className="h-6 w-6" />
            {hasNewMessage && (
              <div className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 bg-primary-foreground border-2 border-primary rounded-full animate-pulse" />
            )}
          </div>
        </Button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Card
            className={`w-96 max-w-[calc(100vw-2rem)] shadow-2xl border-border bg-card text-card-foreground transition-all duration-300 rounded-2xl overflow-hidden ${
              isMinimized ? "h-14" : "h-[520px]"
            }`}
          >
            {/* Header */}
            <CardHeader className="bg-primary text-primary-foreground p-3.5 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm font-display font-semibold">
                  <Bot className="h-4 w-4" />
                  <span>{t("ai.assistantName") || "Maza Finance AI"}</span>
                  <Badge
                    variant="secondary"
                    className="bg-primary-foreground/20 text-primary-foreground border-0 text-[10px] px-1.5 py-0 font-mono"
                  >
                    {t("ai.live") || "Live"}
                  </Badge>
                </CardTitle>
                <div className="flex items-center gap-1">
                  <Button
                    onClick={minimizeChat}
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-primary-foreground hover:bg-primary-foreground/15 rounded-lg"
                    aria-label="Minimize"
                  >
                    <Minimize2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    onClick={closeChat}
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-primary-foreground hover:bg-primary-foreground/15 rounded-lg"
                    aria-label="Close"
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {!isMinimized && (
              <CardContent className="flex flex-col p-0 h-[calc(520px-56px)] bg-card">
                <ScrollArea ref={scrollAreaRef} className="flex-1 p-3.5">
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <MessageBubble key={message.id} message={message} compact />
                    ))}

                    {isLoading && (
                      <div className="flex gap-2 justify-start items-center">
                        <div className="w-6 h-6 rounded-full bg-muted border border-border text-primary flex items-center justify-center">
                          <Bot className="h-3.5 w-3.5" />
                        </div>
                        <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-2.5 shadow-sm">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                            <span className="text-xs text-muted-foreground font-sans">
                              {t("ai.analyzing") || "Menganalisis..."}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {messages.length <= 1 && (
                  <QuickQuestions
                    onSelect={sendQuickQuestion}
                    disabled={isLoading}
                    compact
                    columns={1}
                    limit={2}
                  />
                )}

                <ChatInput
                  value={input}
                  onChange={setInput}
                  onSend={handleSendMessage}
                  isLoading={isLoading}
                  compact
                />
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </>
  )
}
