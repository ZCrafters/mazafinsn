"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Trophy, Users, Star, Gamepad2, Target, Coins } from "lucide-react"

const games = [
  {
    id: 1,
    title: "Budget Master",
    description: "Kelola budget bulanan dan capai target keuangan dengan gameplay yang seru",
    category: "Strategy",
    difficulty: "Beginner",
    players: "1,234",
    rating: 4.8,
    rewards: "Coins, Badges",
    image: "/budget-management-game.png",
  },
  {
    id: 2,
    title: "Investment Tycoon",
    description: "Bangun portofolio investasi dan jadilah miliarder virtual",
    category: "Simulation",
    difficulty: "Advanced",
    players: "856",
    rating: 4.6,
    rewards: "Premium Features",
    image: "/investment-tycoon.png",
  },
  {
    id: 3,
    title: "Saving Challenge",
    description: "Tantangan menabung harian dengan reward menarik",
    category: "Casual",
    difficulty: "Easy",
    players: "2,156",
    rating: 4.9,
    rewards: "Cash Back",
    image: "/saving-challenge-game.png",
  },
  {
    id: 4,
    title: "Crypto Quest",
    description: "Jelajahi dunia cryptocurrency dengan aman dalam simulasi",
    category: "Adventure",
    difficulty: "Intermediate",
    players: "743",
    rating: 4.5,
    rewards: "Knowledge Points",
    image: "/crypto-quest-game.png",
  },
  {
    id: 5,
    title: "Debt Destroyer",
    description: "Strategi melunasi hutang dengan cara yang menyenangkan",
    category: "Puzzle",
    difficulty: "Intermediate",
    players: "567",
    rating: 4.7,
    rewards: "Debt Tips",
    image: "/debt-management-game.png",
  },
  {
    id: 6,
    title: "Financial Quiz Arena",
    description: "Uji pengetahuan finansial Anda melawan pemain lain",
    category: "Quiz",
    difficulty: "All Levels",
    players: "3,421",
    rating: 4.8,
    rewards: "Leaderboard Points",
    image: "/financial-quiz-game.png",
  },
]

const achievements = [
  { title: "First Investment", description: "Buat investasi pertama Anda", icon: Target, earned: true },
  { title: "Budget Pro", description: "Kelola budget selama 30 hari", icon: Trophy, earned: true },
  { title: "Saving Streak", description: "Menabung konsisten 7 hari", icon: Coins, earned: false },
  { title: "Quiz Master", description: "Jawab 100 pertanyaan dengan benar", icon: Star, earned: false },
]

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-800"
    case "Beginner":
      return "bg-blue-100 text-blue-800"
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800"
    case "Advanced":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function GamesContent() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Games Grid */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Game Populer</h2>
            <Button variant="outline">Lihat Semua</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card key={game.id} className="card-hover border-0 shadow-lg overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center">
                  <img src={game.image || "/placeholder.svg"} alt={game.title} className="w-full h-full object-cover" />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {game.category}
                    </Badge>
                    <Badge className={`text-xs ${getDifficultyColor(game.difficulty)}`}>{game.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-lg">{game.title}</CardTitle>
                  <CardDescription className="text-sm">{game.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{game.players}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{game.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Reward: {game.rewards}</span>
                    <Button size="sm" className="bg-sage-600 hover:bg-sage-700">
                      <Play className="w-4 h-4 mr-1" />
                      Main
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Pencapaian Anda</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <Card
                  key={index}
                  className={`text-center border-0 shadow-md ${achievement.earned ? "bg-gradient-to-br from-yellow-50 to-orange-50" : "bg-gray-50"}`}
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${achievement.earned ? "bg-yellow-100" : "bg-gray-200"}`}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${achievement.earned ? "text-yellow-600" : "text-gray-400"}`}
                      />
                    </div>
                    <h3 className={`font-semibold mb-1 ${achievement.earned ? "text-gray-900" : "text-gray-500"}`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-xs ${achievement.earned ? "text-gray-600" : "text-gray-400"}`}>
                      {achievement.description}
                    </p>
                    {achievement.earned && (
                      <Badge className="mt-2 bg-yellow-100 text-yellow-800 text-xs">Selesai</Badge>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Game Stats */}
        <section>
          <Card className="bg-gradient-to-r from-sage-600 to-sage-700 text-white border-0">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <Gamepad2 className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold mb-1">12</div>
                  <div className="text-sage-100">Game Dimainkan</div>
                </div>
                <div>
                  <Trophy className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold mb-1">2,450</div>
                  <div className="text-sage-100">Poin Terkumpul</div>
                </div>
                <div>
                  <Target className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold mb-1">8</div>
                  <div className="text-sage-100">Target Tercapai</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
