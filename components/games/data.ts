export interface GameItem {
  id: number
  titleKey: string
  descriptionKey: string
  category: string
  difficulty: string
  players: string
  rating: number
  rewards: string
  image: string
  href?: string
}

export const games: GameItem[] = [
  {
    id: 0,
    titleKey: "games.forcle",
    descriptionKey: "games.forcle.desc",
    category: "Word Game",
    difficulty: "All Levels",
    players: "1,847",
    rating: 4.9,
    rewards: "Vocabulary Points",
    image: "/financial-quiz-game.png",
    href: "/games/wordle",
  },
  {
    id: 1,
    titleKey: "games.budgetMaster",
    descriptionKey: "games.budgetMaster.desc",
    category: "Strategy",
    difficulty: "Beginner",
    players: "1,234",
    rating: 4.8,
    rewards: "Coins, Badges",
    image: "/budget-management-game.png",
  },
  {
    id: 2,
    titleKey: "games.investmentTycoon",
    descriptionKey: "games.investmentTycoon.desc",
    category: "Simulation",
    difficulty: "Advanced",
    players: "856",
    rating: 4.6,
    rewards: "Premium Features",
    image: "/investment-tycoon.png",
  },
  {
    id: 3,
    titleKey: "games.savingChallenge",
    descriptionKey: "games.savingChallenge.desc",
    category: "Casual",
    difficulty: "Easy",
    players: "2,156",
    rating: 4.9,
    rewards: "Cash Back",
    image: "/saving-challenge-game.png",
  },
  {
    id: 4,
    titleKey: "games.cryptoQuest",
    descriptionKey: "games.cryptoQuest.desc",
    category: "Adventure",
    difficulty: "Intermediate",
    players: "743",
    rating: 4.5,
    rewards: "Knowledge Points",
    image: "/crypto-quest-game.png",
  },
  {
    id: 5,
    titleKey: "games.debtDestroyer",
    descriptionKey: "games.debtDestroyer.desc",
    category: "Puzzle",
    difficulty: "Intermediate",
    players: "567",
    rating: 4.7,
    rewards: "Debt Tips",
    image: "/debt-management-game.png",
  },
  {
    id: 6,
    titleKey: "games.quizArena",
    descriptionKey: "games.quizArena.desc",
    category: "Quiz",
    difficulty: "All Levels",
    players: "3,421",
    rating: 4.8,
    rewards: "Leaderboard Points",
    image: "/financial-quiz-game.png",
    href: "/games/quiz",
  },
]

export interface AchievementItem {
  titleKey: string
  descriptionKey: string
  icon: "target" | "trophy" | "coins" | "star"
  earned: boolean
}

export const achievements: AchievementItem[] = [
  { titleKey: "games.achievement.firstInvestment", descriptionKey: "games.achievement.firstInvestment.desc", icon: "target", earned: true },
  { titleKey: "games.achievement.budgetPro", descriptionKey: "games.achievement.budgetPro.desc", icon: "trophy", earned: true },
  { titleKey: "games.achievement.savingStreak", descriptionKey: "games.achievement.savingStreak.desc", icon: "coins", earned: false },
  { titleKey: "games.achievement.quizMaster", descriptionKey: "games.achievement.quizMaster.desc", icon: "star", earned: false },
]

export function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
    case "Beginner":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
    case "Intermediate":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200"
    case "Advanced":
      return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
    default:
      return "bg-muted text-muted-foreground"
  }
}