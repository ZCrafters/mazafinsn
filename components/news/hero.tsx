"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp } from "lucide-react"

export default function NewsHero() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-sage-600 via-sage-700 to-sage-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 border border-white/20 rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            Berita Finansial Terkini
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Stay Updated with
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
            Financial News
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-sage-100 mb-8 max-w-3xl mx-auto leading-relaxed">
          Dapatkan insight terbaru tentang pasar keuangan, investasi, dan tips finansial dari para ahli
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Cari berita, topik, atau kata kunci..."
              className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-300 focus:bg-white/20 focus:border-white/40"
            />
            <Button
              size="lg"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium"
            >
              Cari
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-sage-200">Artikel Terbaru</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">50K+</div>
            <div className="text-sage-200">Pembaca Aktif</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-sage-200">Update Realtime</div>
          </div>
        </div>
      </div>
    </section>
  )
}
