import { Metadata } from 'next'
import { pageMetadata } from "@/lib/seo"
import EnhancedBubbleChatbot from '@/components/enhanced-bubble-chatbot'

export const metadata: Metadata = pageMetadata({
  title: 'AI Chatbot Keuangan - MAZA Finance',
  description: 'Chat dengan asisten AI finansial untuk saran investasi personal, analisis pasar, dan perencanaan keuangan.',
  path: '/ai-chatbot',
})

export default function AIChatbotPage() {
  return <EnhancedBubbleChatbot />
}