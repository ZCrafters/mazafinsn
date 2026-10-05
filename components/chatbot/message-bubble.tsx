"use client"

import * as React from "react"
import { Bot, User, Sparkles } from "lucide-react"
import ReactMarkdown from "react-markdown"
import type { Message } from "./types"

interface MessageBubbleProps {
  message: Message
  enableMarkdown?: boolean
  compact?: boolean
}

export function MessageBubble({
  message,
  enableMarkdown = false,
  compact = false,
}: MessageBubbleProps) {
  const isUser = message.role === "user"

  return (
    <div
      className={`flex gap-2.5 md:gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex gap-2.5 max-w-[88%] md:max-w-[80%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div
          className={`rounded-full flex items-center justify-center flex-shrink-0 ${
            compact ? "w-6 h-6" : "w-8 h-8"
          } ${
            isUser
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted border border-border text-foreground"
          }`}
          aria-hidden="true"
        >
          {isUser ? (
            <User className={compact ? "w-3 h-3" : "w-4 h-4"} />
          ) : (
            <Bot className={compact ? "w-3.5 h-3.5" : "w-4 h-4 text-primary"} />
          )}
        </div>

        {/* Content bubble */}
        <div
          className={`rounded-2xl transition-colors shadow-sm ${
            compact ? "p-2.5 text-xs" : "p-3.5 text-sm"
          } ${
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-card border border-border text-foreground rounded-tl-sm"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap leading-relaxed font-sans">
              {message.content}
            </p>
          ) : enableMarkdown ? (
            <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-li:text-foreground prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono text-xs md:text-sm">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          ) : (
            <p className="whitespace-pre-wrap leading-relaxed font-sans text-foreground">
              {message.content}
            </p>
          )}

          <div
            className={`flex items-center justify-between gap-2 mt-1.5 pt-1 text-[10px] font-mono tabular-nums ${
              isUser
                ? "text-primary-foreground/75 border-t border-primary-foreground/15"
                : "text-muted-foreground border-t border-border/40"
            }`}
          >
            <span>
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {!isUser && (
              <span className="inline-flex items-center gap-1 text-[10px] font-sans font-medium text-primary">
                <Sparkles className="w-2.5 h-2.5" />
                AI
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
