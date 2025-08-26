"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, LayoutDashboard, TrendingUp, Gamepad2, Bot, Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full pl-4 sm:pl-6 pr-0">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2E8B57] to-[#236B43] flex items-center justify-center mr-4 group-hover:scale-105 group-hover:shadow-lg transition-all duration-300 overflow-hidden shadow-md">
              <img src="/images/maza-logo.jpg" alt="MAZA Finance Logo" className="w-10 h-10 object-cover rounded-xl" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-tight">
                MAZA FINANCE
              </span>
              <span className="text-xs text-gray-500 font-medium tracking-wide leading-none">Financial Solutions</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <Link
              href="/management"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              <TrendingUp size={18} />
              Management
            </Link>
            <Link
              href="/games"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              <Gamepad2 size={18} />
              Games
            </Link>
            <Link
              href="/ai-chatbot"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              <Bot size={18} />
              AI Chat
            </Link>
            <Link
              href="/news"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              <Newspaper size={18} />
              News
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" className="text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50 font-medium px-6">
              Sign In
            </Button>
            <Button className="bg-[#2E8B57] hover:bg-[#236B43] text-white font-medium px-6 shadow-lg hover:shadow-xl transition-all duration-200">
              Get Started
            </Button>
          </div>

          <button
            className="lg:hidden p-3 text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 pr-4 sm:pr-6">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="flex items-center gap-3 text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50 transition-all duration-200 px-4 py-3 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50 transition-all duration-200 px-4 py-3 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <Link
                href="/management"
                className="flex items-center gap-3 text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50 transition-all duration-200 px-4 py-3 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <TrendingUp size={18} />
                Management
              </Link>
              <Link
                href="/games"
                className="flex items-center gap-3 text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50 transition-all duration-200 px-4 py-3 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Gamepad2 size={18} />
                Games
              </Link>
              <Link
                href="/ai-chatbot"
                className="flex items-center gap-3 text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50 transition-all duration-200 px-4 py-3 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Bot size={18} />
                AI Chat
              </Link>
              <Link
                href="/news"
                className="flex items-center gap-3 text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50 transition-all duration-200 px-4 py-3 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Newspaper size={18} />
                News
              </Link>
              <div className="flex flex-col gap-3 pt-6 border-t border-gray-200">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-[#2E8B57] hover:bg-gray-50 justify-start font-medium"
                >
                  Sign In
                </Button>
                <Button className="bg-[#2E8B57] hover:bg-[#236B43] text-white justify-start font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
