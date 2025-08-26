"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Send,
  Bot,
  User,
  Loader2,
  MessageSquare,
  Plus,
  TrendingUp,
  DollarSign,
  PieChart,
  Newspaper,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface Conversation {
  id: string
  title: string
  created_at: string
}

const quickQuestions = [
  { icon: TrendingUp, text: "Show me BBRI stock price", category: "stocks" },
  { icon: DollarSign, text: "USD to IDR exchange rate", category: "currency" },
  { icon: PieChart, text: "Analyze my portfolio", category: "portfolio" },
  { icon: Newspaper, text: "Latest market news", category: "news" },
]

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

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
  }, [])

  const loadConversations = async () => {
    const { data, error } = await supabase
      .from("chat_conversations")
      .select("id, title, created_at")
      .order("updated_at", { ascending: false })
      .limit(10)

    if (!error && data) {
      setConversations(data)
    }
  }

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

  const startNewConversation = () => {
    setMessages([
      {
        id: "welcome",
        content:
          "Hello! I'm your financial AI assistant powered by real-time market data. I can help you with:\n\n• Stock prices and market analysis\n• Currency exchange rates\n• Portfolio analysis and investment advice\n• Latest financial news and trends\n• Budgeting and financial planning\n• Indonesian market insights\n\nTry asking me about specific stocks (like BBRI or AAPL), currency rates, or your investment portfolio. How can I assist you today?",
        role: "assistant",
        timestamp: new Date(),
      },
    ])
    setCurrentConversationId(null)
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
  }, [user, conversations])

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
        content: data.message || "I apologize, but I encountered an error. Please try again.",
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
        content: "I'm sorry, I encountered an error. Please try again or start a new conversation.",
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

  const handleQuickQuestion = (question: string) => {
    setInput(question)
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
        content: data.message || "I apologize, but I encountered an error. Please try again.",
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
        content: "I'm sorry, I encountered an error. Please try again or start a new conversation.",
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
      <section className="py-16 px-4 bg-gradient-to-br from-sage-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-4">Please Sign In</h3>
            <p className="text-gray-600">You need to be signed in to use the AI Financial Assistant.</p>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-sage-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Financial AI Assistant</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get personalized financial advice with real-time market data, investment guidance, and comprehensive
            financial planning assistance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Conversations</CardTitle>
                  <Button
                    onClick={startNewConversation}
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-3">
                <ScrollArea className="h-full">
                  <div className="space-y-2">
                    {conversations.map((conv) => (
                      <Button
                        key={conv.id}
                        onClick={() => loadConversation(conv.id)}
                        variant={currentConversationId === conv.id ? "secondary" : "ghost"}
                        className="w-full justify-start text-left h-auto p-3"
                      >
                        <div className="flex items-start gap-2 w-full">
                          <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">{conv.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(conv.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Chat area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col shadow-lg border-sage-200">
              <CardHeader className="bg-sage-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Maza Finance AI
                  <Badge variant="secondary" className="ml-auto bg-sage-400 text-sage-900">
                    Real-time Data
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex gap-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.role === "user" ? "bg-sage-500 text-white" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                          </div>
                          <div
                            className={`rounded-lg p-3 ${
                              message.role === "user" ? "bg-sage-500 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
                      <div className="flex gap-3 justify-start">
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                            <Bot className="h-4 w-4" />
                          </div>
                          <div className="bg-gray-100 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span className="text-sm text-gray-600">Analyzing financial data...</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {messages.length <= 1 && (
                  <div className="border-t border-b p-4 bg-gray-50">
                    <p className="text-sm font-medium text-gray-700 mb-3">Quick Questions:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickQuestions.map((question, index) => (
                        <Button
                          key={index}
                          onClick={() => sendQuickQuestion(question.text)}
                          variant="outline"
                          size="sm"
                          className="justify-start text-left h-auto p-2 text-xs"
                          disabled={isLoading}
                        >
                          <question.icon className="h-3 w-3 mr-2 flex-shrink-0" />
                          <span className="truncate">{question.text}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about stocks, currencies, portfolio analysis, or financial planning..."
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isLoading}
                      className="bg-sage-500 hover:bg-sage-600"
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
