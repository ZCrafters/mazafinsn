"use client"

import { motion } from "framer-motion"
import { UserPlus, BookOpen, TrendingUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Daftar gratis dan mulai perjalanan finansialmu dalam hitungan menit",
    step: "01",
  },
  {
    icon: BookOpen,
    title: "Learn",
    description: "Pelajari konsep keuangan melalui konten interaktif dan game edukatif",
    step: "02",
  },
  {
    icon: TrendingUp,
    title: "Achieve",
    description: "Capai tujuan finansialmu dengan panduan personal dan tracking progress",
    step: "03",
  },
]

export default function HowItWorks() {
  const { t } = useLanguage()

  return (
    <section className="py-20 sm:py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-[#2E8B57] dark:text-[#85a37a] mb-3 block">
            Cara kerja
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-display tracking-tight mb-4">
            Tiga langkah menuju masa depan finansialmu
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Mulai dari pendaftaran, belajar, hingga mencapai tujuan keuanganmu.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              <div className="h-full rounded-3xl border border-border bg-card p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#2E8B57]/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-[#2E8B57]" />
                  </div>
                  <span className="font-mono text-sm font-medium text-muted-foreground">{step.step}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 flex justify-center"
        >
          <Button size="lg" className="bg-[#2E8B57] hover:bg-[#236B43] text-white px-8 rounded-full font-medium">
            {t("header.getStarted")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}