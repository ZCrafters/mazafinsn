"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Eye, ArrowRight, TrendingUp, Clock } from "lucide-react"

const featuredNews = {
  title: "Bank Indonesia Naikkan Suku Bunga Acuan Menjadi 6.25%",
  excerpt:
    "Keputusan ini diambil untuk menjaga stabilitas nilai tukar rupiah dan mengendalikan inflasi yang masih tinggi...",
  image: "/bank-indonesia-building.png",
  category: "Monetary Policy",
  author: "Tim Redaksi",
  date: "2024-01-15",
  readTime: "5 min",
  views: "12.5K",
}

const newsCategories = [
  { name: "Pasar Saham", count: 45, color: "bg-blue-100 text-blue-800" },
  { name: "Cryptocurrency", count: 32, color: "bg-purple-100 text-purple-800" },
  { name: "Ekonomi Global", count: 28, color: "bg-green-100 text-green-800" },
  { name: "Investasi", count: 56, color: "bg-orange-100 text-orange-800" },
  { name: "Fintech", count: 23, color: "bg-pink-100 text-pink-800" },
  { name: "Perbankan", count: 34, color: "bg-indigo-100 text-indigo-800" },
]

const latestNews = [
  {
    id: 1,
    title: "Rupiah Menguat Terhadap Dolar AS di Tengah Sentimen Positif",
    excerpt: "Nilai tukar rupiah terhadap dolar AS menguat 0.5% pada perdagangan hari ini...",
    category: "Currency",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "3 min",
    views: "8.2K",
    image: "/rupiah-currency.png",
  },
  {
    id: 2,
    title: "Startup Fintech Indonesia Raih Pendanaan Seri B $50 Juta",
    excerpt: "Perusahaan fintech lokal berhasil mengumpulkan dana untuk ekspansi ke Asia Tenggara...",
    category: "Fintech",
    author: "Michael Chen",
    date: "2024-01-14",
    readTime: "4 min",
    views: "6.7K",
    image: "/fintech-startup.png",
  },
  {
    id: 3,
    title: "IHSG Ditutup Menguat 1.2% Didorong Sektor Perbankan",
    excerpt: "Indeks Harga Saham Gabungan mengakhiri perdagangan dengan penguatan signifikan...",
    category: "Stock Market",
    author: "David Wong",
    date: "2024-01-14",
    readTime: "6 min",
    views: "9.1K",
    image: "/stock-market-chart.png",
  },
  {
    id: 4,
    title: "Bitcoin Tembus $45,000, Altcoin Ikut Menguat",
    excerpt: "Pasar cryptocurrency menunjukkan tren positif dengan Bitcoin memimpin kenaikan...",
    category: "Cryptocurrency",
    author: "Lisa Park",
    date: "2024-01-13",
    readTime: "4 min",
    views: "11.3K",
    image: "/bitcoin-cryptocurrency.png",
  },
  {
    id: 5,
    title: "Inflasi Indonesia Turun ke 2.8% pada Desember 2023",
    excerpt: "Badan Pusat Statistik melaporkan penurunan tingkat inflasi yang signifikan...",
    category: "Economy",
    author: "Robert Kim",
    date: "2024-01-12",
    readTime: "5 min",
    views: "7.8K",
    image: "/inflation-statistics.png",
  },
  {
    id: 6,
    title: "Obligasi Pemerintah Diminati Investor Asing",
    excerpt: "Minat investor asing terhadap obligasi pemerintah Indonesia meningkat tajam...",
    category: "Bonds",
    author: "Emma Davis",
    date: "2024-01-11",
    readTime: "4 min",
    views: "5.4K",
    image: "/government-bonds.png",
  },
]

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function NewsContent() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Featured News */}
        <section className="mb-16">
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto">
                <img
                  src={featuredNews.image || "/placeholder.svg"}
                  alt={featuredNews.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4 bg-red-100 text-red-800">Breaking News</Badge>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {featuredNews.title}
                </h1>
                <p className="text-gray-600 mb-6 leading-relaxed">{featuredNews.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{featuredNews.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(featuredNews.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{featuredNews.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{featuredNews.views}</span>
                  </div>
                </div>
                <Button size="lg" className="w-fit bg-sage-600 hover:bg-sage-700">
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Berita Terbaru</h2>
              <Button variant="outline">Lihat Semua</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latestNews.map((news) => (
                <Card key={news.id} className="card-hover border-0 shadow-lg overflow-hidden">
                  <div className="aspect-video">
                    <img
                      src={news.image || "/placeholder.svg"}
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <Badge variant="secondary" className="w-fit text-xs mb-2">
                      {news.category}
                    </Badge>
                    <CardTitle className="text-lg leading-tight hover:text-sage-600 transition-colors">
                      {news.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{news.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        <span>{news.author}</span>
                        <span>{formatDate(news.date)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span>{news.readTime}</span>
                        <span>{news.views} views</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline">
                Muat Lebih Banyak
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Kategori Berita</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {newsCategories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <span className="font-medium text-gray-900">{category.name}</span>
                    <Badge className={`text-xs ${category.color}`}>{category.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Trending */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      1
                    </span>
                    <span className="text-sm font-medium">Kenaikan Suku Bunga BI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      2
                    </span>
                    <span className="text-sm font-medium">IPO Perusahaan Teknologi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-yellow-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      3
                    </span>
                    <span className="text-sm font-medium">Regulasi Cryptocurrency</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      4
                    </span>
                    <span className="text-sm font-medium">Investasi ESG</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      5
                    </span>
                    <span className="text-sm font-medium">Fintech Lending</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-sage-50 to-sage-100">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-gray-900 mb-2">Newsletter Harian</h3>
                <p className="text-sm text-gray-600 mb-4">Dapatkan ringkasan berita finansial langsung di email Anda</p>
                <Button className="w-full bg-sage-600 hover:bg-sage-700">Berlangganan Gratis</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
