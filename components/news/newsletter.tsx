"use client"

import { Badge } from "@/components/ui/badge"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Bell, TrendingUp, Clock, Users, CheckCircle } from "lucide-react"
import { useState } from "react"

const newsletterFeatures = [
  {
    icon: TrendingUp,
    title: "Market Updates",
    description: "Analisis pasar harian dan pergerakan saham terkini",
  },
  {
    icon: Bell,
    title: "Breaking News",
    description: "Berita penting yang mempengaruhi pasar finansial",
  },
  {
    icon: Clock,
    title: "Weekly Summary",
    description: "Ringkasan mingguan trend dan peluang investasi",
  },
  {
    icon: Users,
    title: "Expert Insights",
    description: "Tips dan strategi dari para ahli keuangan",
  },
]

const subscriptionPlans = [
  {
    name: "Daily Brief",
    description: "Ringkasan berita harian",
    frequency: "Setiap hari",
    features: ["Top 5 berita finansial", "Pergerakan pasar utama", "Kalender ekonomi"],
    popular: false,
  },
  {
    name: "Weekly Digest",
    description: "Analisis mendalam mingguan",
    frequency: "Setiap minggu",
    features: ["Analisis trend pasar", "Rekomendasi investasi", "Interview eksklusif", "Research report"],
    popular: true,
  },
  {
    name: "Breaking News",
    description: "Alert berita penting",
    frequency: "Real-time",
    features: ["Notifikasi instant", "Analisis dampak pasar", "Trading signals"],
    popular: false,
  },
]

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [selectedPlans, setSelectedPlans] = useState<string[]>(["Weekly Digest"])
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handlePlanToggle = (planName: string) => {
    setSelectedPlans((prev) => (prev.includes(planName) ? prev.filter((p) => p !== planName) : [...prev, planName]))
  }

  const handleSubscribe = () => {
    if (email && selectedPlans.length > 0) {
      setIsSubscribed(true)
    }
  }

  if (isSubscribed) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Berhasil Berlangganan!</h2>
              <p className="text-lg text-gray-600 mb-6">
                Terima kasih telah berlangganan newsletter kami. Email konfirmasi telah dikirim ke{" "}
                <strong>{email}</strong>
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Langganan Aktif:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {selectedPlans.map((plan, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {plan}
                    </li>
                  ))}
                </ul>
              </div>
              <Button onClick={() => setIsSubscribed(false)} variant="outline" className="mr-4">
                Ubah Langganan
              </Button>
              <Button className="bg-sage-600 hover:bg-sage-700">Kembali ke Berita</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-sage-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Newsletter Finansial</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dapatkan insight terbaru tentang pasar keuangan, tips investasi, dan berita finansial langsung di inbox Anda
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {newsletterFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="text-center border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-sage-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subscription Form */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-sage-600" />
                Berlangganan Newsletter
              </CardTitle>
              <CardDescription>Pilih jenis newsletter yang ingin Anda terima</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-base"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">Pilih Newsletter:</Label>
                {subscriptionPlans.map((plan, index) => (
                  <div key={index} className="relative">
                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedPlans.includes(plan.name)
                          ? "border-sage-500 bg-sage-50"
                          : "border-gray-200 hover:border-gray-300"
                      } ${plan.popular ? "ring-2 ring-sage-200" : ""}`}
                    >
                      {plan.popular && (
                        <Badge className="absolute -top-2 left-4 bg-sage-600 text-white text-xs">Populer</Badge>
                      )}
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedPlans.includes(plan.name)}
                          onCheckedChange={() => handlePlanToggle(plan.name)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                            <span className="text-sm text-gray-500">{plan.frequency}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                          <ul className="text-xs text-gray-500 space-y-1">
                            {plan.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm text-gray-600">
                  Saya setuju dengan{" "}
                  <a href="#" className="text-sage-600 hover:underline">
                    syarat dan ketentuan
                  </a>{" "}
                  serta{" "}
                  <a href="#" className="text-sage-600 hover:underline">
                    kebijakan privasi
                  </a>
                </Label>
              </div>

              <Button
                onClick={handleSubscribe}
                disabled={!email || selectedPlans.length === 0}
                className="w-full bg-sage-600 hover:bg-sage-700 disabled:opacity-50"
                size="lg"
              >
                <Mail className="w-4 h-4 mr-2" />
                Berlangganan Sekarang
              </Button>
            </CardContent>
          </Card>

          {/* Stats & Testimonials */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Mengapa Berlangganan?</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sage-600 mb-1">50K+</div>
                    <div className="text-sm text-gray-600">Subscriber Aktif</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sage-600 mb-1">4.8★</div>
                    <div className="text-sm text-gray-600">Rating Newsletter</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sage-600 mb-1">95%</div>
                    <div className="text-sm text-gray-600">Open Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sage-600 mb-1">Free</div>
                    <div className="text-sm text-gray-600">Selamanya</div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 italic">
                    &ldquo;Newsletter Maza Finance membantu saya tetap update dengan perkembangan pasar. Analisisnya sangat
                    mudah dipahami dan actionable.&rdquo;
                  </p>
                  <div className="mt-2 text-xs text-gray-500">- Sarah, Investor Retail</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Premium Newsletter</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Upgrade ke premium untuk mendapatkan analisis eksklusif, research report, dan akses ke webinar bulanan
                </p>
                <Button variant="secondary" className="w-full bg-white text-blue-700 hover:bg-gray-100">
                  Pelajari Premium
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
