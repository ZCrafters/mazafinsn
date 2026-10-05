"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export function ChatInput({ input, setInput, onSubmit, isLoading }: ChatInputProps) {
  return (
    <div className="border-t border-border/70 p-4 bg-card">
      <form onSubmit={onSubmit} className="flex gap-2.5">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanyakan analisis arus kas, rasio tabungan, atau peluang efisiensi..."
          className="flex-1 h-10 rounded-lg border-border text-xs sm:text-sm bg-background"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="h-10 px-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </form>
    </div>
  );
}
