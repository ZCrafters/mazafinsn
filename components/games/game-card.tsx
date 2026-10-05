"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { OptimizedTiltCard } from "@/components/ui/optimized-tilt-card"
import { Play, Users, Star } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getDifficultyColor, type GameItem } from "./data"

export default function GameCard({ game }: { game: GameItem }) {
  const { t } = useLanguage()
  return (
    <OptimizedTiltCard className="rounded-xl">
      <Card className="h-full border-0 shadow-lg overflow-hidden bg-card rounded-xl">
        <div className="aspect-video bg-gradient-to-br from-sage-100 to-sage-200 dark:from-sage-900/40 dark:to-sage-800/40 flex items-center justify-center relative">
          <Image
            src={game.image || "/placeholder.svg"}
            alt={t(game.titleKey)}
            fill
            className="object-cover"
            priority={game.id === 0}
          />
        </div>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              {game.category}
            </Badge>
            <Badge className={`text-xs ${getDifficultyColor(game.difficulty)}`}>{game.difficulty}</Badge>
          </div>
          <CardTitle className="text-lg text-foreground font-bold">{t(game.titleKey)}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground font-medium">{t(game.descriptionKey)}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span className="font-semibold text-foreground">{game.players}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-foreground">{game.rating}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">
              {t("games.reward")}: {game.rewards}
            </span>
            {game.href ? (
              <Link href={game.href}>
                <Button size="sm" className="bg-sage-600 hover:bg-sage-700 text-white">
                  <Play className="w-4 h-4 mr-1" />
                  {t("common.play")}
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Badge className="bg-muted text-muted-foreground text-xs">{t("common.comingSoon")}</Badge>
                <Button size="sm" disabled className="bg-sage-600/50 text-white/70 cursor-not-allowed">
                  <Play className="w-4 h-4 mr-1" />
                  {t("common.play")}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </OptimizedTiltCard>
  )
}