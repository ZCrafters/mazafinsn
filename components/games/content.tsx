"use client";

import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { games } from "./data";
import GameCard from "./game-card";
import PointsBanner from "./points-banner";
import Achievements from "./achievements";
import GameStats from "./game-stats";

export default function GamesContent() {
  const { t } = useLanguage();

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-medium uppercase tracking-widest text-[#2E8B57] dark:text-[#85a37a] mb-3 block">
            Game
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-display tracking-tight mb-3">
            {t("games.popular")}
          </h2>
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground leading-relaxed max-w-xl">
              Belajar literasi keuangan lewat game seru. Main, kumpulkan poin, tukar hadiah.
            </p>
            <Link href="/points-store">
              <Button variant="outline" className="hidden md:inline-flex">
                <Coins className="w-4 h-4 mr-2" />
                {t("games.pointsStore")}
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-12">
          <PointsBanner />
        </div>

        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        <Achievements />
        <GameStats />
      </div>
    </div>
  );
}