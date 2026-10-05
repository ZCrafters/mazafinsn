"use client";

import { Badge } from "@/components/ui/badge";
import { Bot, User, BarChart3, TrendingUp, AlertTriangle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Message } from "../types";

interface ChatMessageBubbleProps {
  message: Message;
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isAssistant = message.role === "assistant";

  const getBadgeVariant = (type?: Message["type"]) => {
    switch (type) {
      case "analysis":
        return "border-primary/40 text-primary";
      case "recommendation":
        return "border-emerald-500/40 text-emerald-600 dark:text-emerald-400";
      case "alert":
        return "border-destructive/40 text-destructive";
      default:
        return "border-border text-muted-foreground";
    }
  };

  const getIcon = (type?: Message["type"]) => {
    switch (type) {
      case "analysis":
        return <BarChart3 className="w-3.5 h-3.5 text-primary" />;
      case "recommendation":
        return <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
      case "alert":
        return <AlertTriangle className="w-3.5 h-3.5 text-destructive" />;
      default:
        return <Bot className="w-3.5 h-3.5 text-primary" />;
    }
  };

  return (
    <div className={`flex gap-3 ${isAssistant ? "justify-start" : "justify-end"}`}>
      {isAssistant && (
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
          {getIcon(message.type)}
        </div>
      )}

      <div
        className={`max-w-[85%] rounded-xl p-3.5 text-xs sm:text-sm leading-relaxed border ${
          isAssistant
            ? "bg-card border-border text-foreground shadow-xs"
            : "bg-primary text-primary-foreground border-primary shadow-xs"
        }`}
      >
        {isAssistant ? (
          <div className="prose prose-xs max-w-none text-foreground prose-headings:text-foreground prose-strong:text-foreground prose-p:text-foreground prose-li:text-foreground">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}

        <div className="flex items-center justify-between gap-3 mt-2.5 pt-1.5 border-t border-border/40 text-[11px] text-muted-foreground">
          <span className="font-mono">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {isAssistant && message.type && message.type !== "normal" && (
            <Badge variant="outline" className={`text-[10px] py-0 px-1.5 capitalize font-mono ${getBadgeVariant(message.type)}`}>
              {message.type}
            </Badge>
          )}
        </div>
      </div>

      {!isAssistant && (
        <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-1 text-muted-foreground">
          <User className="w-3.5 h-3.5" />
        </div>
      )}
    </div>
  );
}
