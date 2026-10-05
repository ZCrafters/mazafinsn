"use client"

import { Badge } from "@/components/ui/badge"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Bell, TrendingUp, Clock, Users, CheckCircle } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"

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
  const { t } = useLanguage()
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
      <section className="py-16 px-4 bg-muted/60" id="newsletter">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-0 shadow-xl bg-card">
            <CardContent className="p-12">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">{t("newsletter.successTitle")}</h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t("newsletter.successDescription").replace("{email}", email)}
              </p>
              <div className="bg-muted rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-foreground mb-2">{t("newsletter.activeSubscriptions")}</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {selectedPlans.map((plan, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {plan}
                    </li>
                  ))}
                </ul>
              </div>
              <Button onClick={() => setIsSubscribed(false)} variant="outline" className="mr-4">
                {t("newsletter.changePlan")}
              </Button>
              <Button className="bg-sage-600 hover:bg-sage-700 text-white">{t("newsletter.backToNews")}</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-sage-50 to-blue-50 dark:from-sage-900/40 dark:to-sage-950/60" id="newsletter">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t("newsletter.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("newsletter.subtitle")}</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {newsletterFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="text-center border-0 shadow-md bg-card">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-sage-100 dark:bg-sage-900/40 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-sage-600 dark:text-sage-300" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subscription Form */}
          <Card className="border-0 shadow-xl bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Mail className="w-5 h-5 text-sage-600 dark:text-sage-300" />
                {t("newsletter.subscribeTitle")}
              </CardTitle>
              <CardDescription>{t("newsletter.subscribeDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">{t("newsletter.emailLabel")}</Label>
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
                <Label className="text-base font-medium text-foreground">{t("newsletter.choosePlans")}</Label>
                {subscriptionPlans.map((plan, index) => (
                  <div key={index} className="relative">
                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition-all bg-card ${
                        selectedPlans.includes(plan.name)
                          ? "border-sage-500 bg-sage-50 dark:bg-sage-900/30"
                          : "border-border hover:border-muted-foreground/40"
                      } ${plan.popular ? "ring-2 ring-sage-200 dark:ring-sage-800" : ""}`}
                    >
                      {plan.popular && (
                        <Badge className="absolute -top-2 left-4 bg-sage-600 text-white text-xs">{t("newsletter.popular")}</Badge>
                      )}
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedPlans.includes(plan.name)}
                          onCheckedChange={() => handlePlanToggle(plan.name)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-foreground">{plan.name}</h3>
                            <span className="text-sm text-muted-foreground">{plan.frequency}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
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
                <Label htmlFor="terms" className="text-sm text-muted-foreground">
                  {t("newsletter.termsPrefix")}{" "}
                  <a href="#" className="text-sage-600 hover:underline">
                    {t("newsletter.termsLink")}
                  </a>{" "}
                  {t("newsletter.termsAnd")}{" "}
                  <a href="#" className="text-sage-600 hover:underline">
                    {t("newsletter.privacyLink")}
                  </a>
                </Label>
              </div>

              <Button
                onClick={handleSubscribe}
                disabled={!email || selectedPlans.length === 0}
                className="w-full bg-sage-600 hover:bg-sage-700 text-white disabled:opacity-50"
                size="lg"
              >
                <Mail className="w-4 h-4 mr-2" />
                {t("newsletter.subscribeNow")}
              </Button>
            </CardContent>
          </Card>

          {/* Stats & Testimonials */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-card">
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-4">{t("newsletter.whyTitle")}</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sage-600 dark:text-sage-400 mb-1">50K+</div>
                    <div className="text-sm text-muted-foreground">{t("newsletter.ctaSubscribers")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sage-600 dark:text-sage-400 mb-1">4.8★</div>
                    <div className="text-sm text-muted-foreground">{t("newsletter.ctaRating")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sage-600 dark:text-sage-400 mb-1">95%</div>
                    <div className="text-sm text-muted-foreground">{t("newsletter.ctaOpenRate")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sage-600 dark:text-sage-400 mb-1">Free</div>
                    <div className="text-sm text-muted-foreground">{t("newsletter.ctaForever")}</div>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground italic">
                    &ldquo;Newsletter Maza Finance membantu saya tetap update dengan perkembangan pasar. Analisisnya sangat
                    mudah dipahami dan actionable.&rdquo;
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">- Sarah, Investor Retail</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-sage-600 to-sage-800 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">{t("newsletter.premiumTitle")}</h3>
                <p className="text-sage-100 text-sm mb-4">{t("newsletter.premiumDescription")}</p>
                <Button variant="secondary" className="w-full bg-white text-sage-800 hover:bg-gray-100">
                  {t("newsletter.premiumCta")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}