"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, PieChart, Target, Smartphone, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: TrendingUp,
    title: "Smart Investment Tracking",
    description: "Monitor your portfolio performance with AI-powered insights and real-time market data.",
    color: "text-green-600",
  },
  {
    icon: PieChart,
    title: "Expense Analytics",
    description: "Visualize your spending patterns with interactive charts and personalized recommendations.",
    color: "text-blue-600",
  },
  {
    icon: Target,
    title: "Goal Setting",
    description: "Set and track financial goals with automated savings plans and milestone celebrations.",
    color: "text-purple-600",
  },
  {
    icon: Smartphone,
    title: "Mobile Banking",
    description: "Complete banking experience in your pocket with instant transfers and payments.",
    color: "text-orange-600",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Bank-grade security with biometric authentication and fraud protection.",
    color: "text-red-600",
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    description: "Stay updated with real-time alerts for transactions, goals, and market changes.",
    color: "text-yellow-600",
  },
]

export default function DashboardFeatures() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-sage-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Fitur Unggulan Dashboard</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kelola keuangan Anda dengan mudah menggunakan fitur-fitur canggih yang dirancang khusus untuk generasi
            digital
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-3">
            Mulai Sekarang
          </Button>
        </div>
      </div>
    </section>
  )
}
