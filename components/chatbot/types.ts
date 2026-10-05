import type { LucideIcon } from "lucide-react"

export interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export interface QuickQuestionItem {
  icon: LucideIcon
  text: string
  translationKey: string
  category: "stocks" | "currency" | "portfolio" | "news"
}

export interface Conversation {
  id: string
  title: string
  created_at: string
}
