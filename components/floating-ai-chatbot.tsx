"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Loader2, X, Minimize2, TrendingUp, DollarSign, PieChart, Newspaper } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

const quickQuestions = [
  { icon: TrendingUp, text: "Show me BBRI stock price", category: "stocks" },
  { icon: DollarSign, text: "USD to IDR exchange rate", category: "currency" },
  { icon: PieChart, text: "Analyze my portfolio", category: "portfolio" },
  { icon: Newspaper, text: "Latest market news", category: "news" },
]

export default function FloatingAIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    const initializeUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user && messages.length === 0) {
        setMessages([
          {
            id: "welcome",
            content:
              "Hello! I'm your financial AI assistant. I can help you with:\n\n• Stock prices and market analysis\n• Currency exchange rates\n• Portfolio analysis and investment advice\n• Latest financial news and trends\n• Budgeting and financial planning\n\nHow can I assist you today?",
            role: "assistant",
            timestamp: new Date(),
          },
        ])
      }
    }

    initializeUser()
  }, [])

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
        content: data.message || "I apologize, but I encountered an error. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Show notification if chat is closed
      if (!isOpen) {
        setHasNewMessage(true)
      }
    } catch (error) {
      console.error("Chat error:", error)
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, fallbackMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
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
        content: data.message || "I apologize, but I encountered an error. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error. Please try again.",
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
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={openChat}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-sage-500 hover:bg-sage-600 shadow-lg z-50 p-0"
        >
          <div className="relative">
            <Bot className="h-6 w-6" />
            {hasNewMessage && (
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
            )}
          </div>
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Card
            className={`w-96 shadow-2xl border-sage-200 transition-all duration-300 ${
              isMinimized ? "h-14" : "h-[500px]"
            }`}
          >
            <CardHeader className="bg-sage-500 text-white rounded-t-lg p-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Bot className="h-4 w-4" />
                  Maza Finance AI
                  <Badge variant="secondary" className="bg-sage-400 text-sage-900 text-xs">
                    Live
                  </Badge>
                </CardTitle>
                <div className="flex items-center gap-1">
                  <Button
                    onClick={minimizeChat}
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-white hover:bg-sage-600"
                  >
                    <Minimize2 className="h-3 w-3" />
                  </Button>
                  <Button
                    onClick={closeChat}
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-white hover:bg-sage-600"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {!isMinimized && (
              <CardContent className="flex flex-col p-0 h-[calc(500px-60px)]">
                <ScrollArea ref={scrollAreaRef} className="flex-1 p-3">
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex gap-2 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.role === "user" ? "bg-sage-500 text-white" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {message.role === "user" ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                          </div>
                          <div
                            className={`rounded-lg p-2 ${
                              message.role === "user" ? "bg-sage-500 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-xs whitespace-pre-wrap">{message.content}</p>
                            <span className="text-xs opacity-70 mt-1 block">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-2 justify-start">
                        <div className="flex gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                            <Bot className="h-3 w-3" />
                          </div>
                          <div className="bg-gray-100 rounded-lg p-2">
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-3 w-3 animate-spin" />
                              <span className="text-xs text-gray-600">Analyzing...</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {messages.length <= 1 && (
                  <div className="border-t p-2 bg-gray-50">
                    <p className="text-xs font-medium text-gray-700 mb-2">Quick Questions:</p>
                    <div className="grid grid-cols-1 gap-1">
                      {quickQuestions.slice(0, 2).map((question, index) => (
                        <Button
                          key={index}
                          onClick={() => sendQuickQuestion(question.text)}
                          variant="outline"
                          size="sm"
                          className="justify-start text-left h-auto p-1.5 text-xs"
                          disabled={isLoading}
                        >
                          <question.icon className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{question.text}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t p-2">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about stocks, currencies, portfolio..."
                      className="flex-1 text-xs h-8"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isLoading}
                      size="sm"
                      className="bg-sage-500 hover:bg-sage-600 h-8 w-8 p-0"
                    >
                      {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </>
  )
}
