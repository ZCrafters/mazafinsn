"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, PieChart, Target, Smartphone, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Smart Investment Tracking",
    description:
      "Monitor portofolio dengan insight AI dan data pasar real-time.",
  },
  {
    icon: PieChart,
    title: "Expense Analytics",
    description:
      "Visualisasikan pola pengeluaran dengan grafik interaktif dan rekomendasi personal.",
  },
  {
    icon: Target,
    title: "Goal Setting",
    description:
      "Tetapkan dan lacak tujuan finansial dengan rencana tabungan otomatis.",
  },
  {
    icon: Smartphone,
    title: "Mobile Banking",
    description:
      "Pengalaman banking lengkap di genggaman: transfer dan pembayaran instan.",
  },
  {
    icon: Shield,
    title: "Security First",
    description:
      "Keamanan setara bank dengan autentikasi biometrik dan proteksi fraud.",
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    description:
      "Alert real-time untuk transaksi, target, dan perubahan pasar.",
  },
];

export default function DashboardFeatures() {
  return (
    <section className="py-16 px-4 bg-muted/60">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-medium uppercase tracking-widest text-[#2E8B57] dark:text-[#85a37a] mb-3 block">
            Fitur
          </span>
          <h2 className="text-3xl font-bold text-foreground font-display tracking-tight mb-3">
            Fitur unggulan dashboard
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Kelola keuangan dengan fitur yang dirancang untuk generasi digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className={`card-hover border-border bg-card ${
                  index === 1 || index === 4 ? "lg:translate-y-6" : ""
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2E8B57]/10 flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-[#2E8B57]" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}