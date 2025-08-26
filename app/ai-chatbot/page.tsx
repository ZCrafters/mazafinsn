"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Bot, User } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AIChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Halo! Saya adalah AI Chatbot keuangan dan investasi MAZA FINANCE. Saya siap membantu Anda dengan pertanyaan seputar keuangan, investasi, cryptocurrency, pasar saham, dan strategi investasi. Bagaimana saya bisa membantu Anda hari ini?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
      console.log("[v0] Sending message to API:", userMessage.content)

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

      console.log("[v0] API response status:", response.status)

      if (!response.ok) {
        const errorData = await response.text()
        console.log("[v0] API error response:", errorData)
        throw new Error(`API Error: ${response.status} - ${errorData}`)
      }

      const data = await response.json()
      console.log("[v0] API response data:", data)

      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId)
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("[v0] Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Maaf, terjadi kesalahan: ${error instanceof Error ? error.message : "Unknown error"}. Silakan coba lagi.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-sage-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-sage-900 mb-4">AI Chatbot Keuangan</h1>
          <p className="text-sage-600 text-lg">Konsultasi keuangan dan investasi dengan AI yang komprehensif</p>
        </div>

        <Card className="h-[70vh] max-h-[600px] min-h-[500px] flex flex-col bg-white shadow-lg">
          <CardHeader className="border-b border-sage-200 flex-shrink-0 bg-sage-50">
            <CardTitle className="flex items-center gap-2 text-sage-900">
              <Bot className="w-5 h-5 text-sage-600" />
              MAZA Finance AI Assistant
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden bg-white">
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4 max-h-full"
              style={{ scrollBehavior: "smooth" }}
              ref={(el) => {
                if (el && !isLoading) {
                  el.scrollTop = el.scrollHeight
                }
              }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-sage-200 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-sage-600" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-sage-600 text-white" : "bg-sage-100 text-sage-900"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none prose-headings:text-sage-900 prose-strong:text-sage-800 prose-code:text-sage-700 prose-code:bg-sage-200 prose-code:px-1 prose-code:rounded">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                    <p className={`text-xs mt-1 ${message.role === "user" ? "text-sage-200" : "text-sage-500"}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-sage-300 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-sage-700" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-sage-200 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-sage-600" />
                  </div>
                  <div className="bg-sage-100 text-sage-900 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-sage-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-sage-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-sage-200 p-4 flex-shrink-0">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tanyakan tentang keuangan, investasi, cryptocurrency..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !input.trim()} className="bg-sage-600 hover:bg-sage-700">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <p className="text-xs text-sage-500 mt-2">
                Disclaimer: Informasi yang diberikan hanya untuk edukasi. Konsultasikan dengan penasihat keuangan
                profesional sebelum membuat keputusan investasi.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
