"use client"

import React from 'react'
import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLanguage, type Language } from '@/lib/language-context'

const languageOptions = [
  { code: 'id' as Language, name: 'Bahasa Indonesia', short: 'ID' },
  { code: 'en' as Language, name: 'English', short: 'EN' },
  { code: 'ms' as Language, name: 'Bahasa Melayu', short: 'MS' },
]

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  const currentLanguage = languageOptions.find(lang => lang.code === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-accent font-medium px-3 py-2 rounded-md transition-colors">
          <Globe size={16} />
          <span className="hidden sm:inline text-xs font-bold font-mono">{currentLanguage?.short}</span>
          <span className="hidden md:inline text-sm">{currentLanguage?.name}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languageOptions.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-3 cursor-pointer ${
              language === lang.code ? 'bg-accent text-primary' : ''
            }`}
          >
            <span className="text-xs font-bold font-mono w-6 text-center">{lang.short}</span>
            <span className="font-medium">{lang.name}</span>
            {language === lang.code && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}