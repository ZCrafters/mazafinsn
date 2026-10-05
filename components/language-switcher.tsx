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
  { code: 'id' as Language, name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'ms' as Language, name: 'Bahasa Melayu', flag: '🇲🇾' },
]

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  const currentLanguage = languageOptions.find(lang => lang.code === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50 font-medium px-3 py-2 rounded-md transition-colors">
          <Globe size={16} />
          <span className="hidden sm:inline">{currentLanguage?.flag}</span>
          <span className="hidden md:inline text-sm">{currentLanguage?.name}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languageOptions.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-3 cursor-pointer ${
              language === lang.code ? 'bg-gray-100 text-[#2E8B57]' : ''
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
            {language === lang.code && (
              <span className="ml-auto text-[#2E8B57]">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}