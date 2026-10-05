"use client"

import * as React from "react"
import { Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/lib/language-context"

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  isLoading?: boolean
  disabled?: boolean
  placeholder?: string
  compact?: boolean
  showDisclaimer?: boolean
}

export function ChatInput({
  value,
  onChange,
  onSend,
  isLoading = false,
  disabled = false,
  placeholder,
  compact = false,
  showDisclaimer = false,
}: ChatInputProps) {
  const { t } = useLanguage()

  const defaultPlaceholder =
    placeholder || t("ai.placeholder") || "Tanyakan tentang keuangan, investasi, portfolio..."

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (value.trim() && !isLoading && !disabled) {
        onSend()
      }
    }
  }

  return (
    <div className={`border-t border-border bg-card ${compact ? "p-2.5" : "p-4"}`}>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={defaultPlaceholder}
          className={`flex-1 bg-background border-border focus-visible:ring-1 focus-visible:ring-primary text-foreground placeholder:text-muted-foreground transition-colors ${
            compact ? "h-9 text-xs rounded-lg" : "h-11 text-xs md:text-sm rounded-xl"
          }`}
          disabled={isLoading || disabled}
        />
        <Button
          onClick={onSend}
          disabled={!value.trim() || isLoading || disabled}
          size={compact ? "sm" : "default"}
          className={`bg-primary hover:bg-primary/90 text-primary-foreground font-medium flex-shrink-0 transition-transform active:-translate-y-px ${
            compact ? "h-9 w-9 p-0 rounded-lg" : "h-11 px-4 rounded-xl"
          }`}
          aria-label={t("common.send") || "Kirim"}
        >
          {isLoading ? (
            <Loader2 className={compact ? "w-3.5 h-3.5 animate-spin" : "w-4 h-4 animate-spin"} />
          ) : (
            <Send className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
          )}
        </Button>
      </div>

      {showDisclaimer && (
        <p className="text-[11px] text-muted-foreground text-center mt-2.5 leading-normal">
          <strong className="font-semibold text-foreground">Disclaimer: </strong>
          {t("common.disclaimer")}
        </p>
      )}
    </div>
  )
}
