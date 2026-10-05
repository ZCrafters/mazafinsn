"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Play, Star, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { games } from "./data"

function difficultyColor(difficulty: string) {
  switch (difficulty) {
    case "Beginner":
      return "bg-[#2E8B57]/15 text-[#2E8B57]"
    case "Intermediate":
      return "bg-amber-500/15 text-amber-600 dark:text-amber-400"
    default:
      return "bg-destructive/10 text-destructive"
  }
}

export default function GamificationPreview() {
  return (
    <section className="py-20 sm:py-24 px-4 bg-muted/60">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-[#2E8B57] dark:text-[#85a37a] mb-3 block">
            Belajar sambil bermain
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-display tracking-tight mb-4">
            Game edukatif yang bikin belajar keuangan terasa seru
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Main, kumpulkan poin, dan tukarkan hadiah — sambil memahami cara mengelola uang.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={index === 1 ? "md:translate-y-8" : ""}
            >
              <div className="group overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(23,26,22,0.25)]">
                <div className="relative overflow-hidden aspect-[16/9]">
                  <Image
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <span
                    className={`absolute top-4 left-4 px-2.5 py-1 rounded-md text-xs font-semibold ${difficultyColor(game.difficulty)}`}
                  >
                    {game.difficulty}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">{game.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{game.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Star className="w-4 h-4 text-[#2E8B57]" />
                        {game.points}
                      </span>
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {game.players}
                      </span>
                    </div>
                    <Link
                      href="/games"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2E8B57] dark:text-[#85a37a] hover:opacity-80 transition-opacity"
                    >
                      <Play className="w-4 h-4" />
                      Play
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 flex justify-center"
        >
          <Button size="lg" asChild className="bg-[#2E8B57] hover:bg-[#236B43] text-white px-8 rounded-full font-medium">
            <Link href="/games">
              Lihat Semua Game
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}