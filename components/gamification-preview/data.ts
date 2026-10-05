export interface GamePreviewItem {
  title: string
  description: string
  image: string
  difficulty: string
  points: string
  players: string
}

export const games: GamePreviewItem[] = [
  {
    title: "Budget Master Challenge",
    description: "Kelola budget bulanan dan raih skor tertinggi",
    image: "/budget-management-game-interface-with-charts-and-c.png",
    difficulty: "Beginner",
    points: "500 pts",
    players: "2.1k",
  },
  {
    title: "Investment Simulator",
    description: "Belajar investasi tanpa risiko kehilangan uang",
    image: "/stock-market-investment-game-with-graphs-and-portf.png",
    difficulty: "Intermediate",
    points: "1000 pts",
    players: "1.8k",
  },
  {
    title: "Debt Destroyer",
    description: "Strategi melunasi hutang dengan game seru",
    image: "/debt-payoff-game-with-progress-bars-and-financial-.png",
    difficulty: "Advanced",
    points: "1500 pts",
    players: "950",
  },
]