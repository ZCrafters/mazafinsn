import { WordLength, GameState, createEmptyGameState } from './wordle-game'

export interface DailyGameStats {
  gamesPlayed: number
  gamesWon: number
  currentStreak: number
  maxStreak: number
  winPercentage: number
  winRate: number
  guessDistribution: { [key: number]: number }
  lastPlayedDate: string
}

export interface DailyGameData {
  date: string
  wordLength: WordLength
  targetWord: string
  gameState: GameState
  completed: boolean
  won: boolean
  guessCount: number
}

// Financial-themed words for different lengths
const FINANCIAL_WORDS: Record<WordLength, string[]> = {
  4: [
    'BANK', 'LOAN', 'DEBT', 'CASH', 'BOND', 'FUND', 'RISK', 'GAIN', 'LOSS', 'RATE',
    'FEES', 'SAVE', 'COST', 'BILL', 'CARD', 'GOLD', 'EURO', 'YUAN', 'PESO', 'DIME'
  ],
  5: [
    'MONEY', 'STOCK', 'TRADE', 'ASSET', 'PRICE', 'VALUE', 'SHARE', 'YIELD', 'QUOTA',
    'LEASE', 'GRANT', 'TRUST', 'AUDIT', 'BONUS', 'WAGES', 'TAXES', 'FOREX', 'PENNY',
    'DEBIT', 'CREDIT', 'SPEND', 'BUDGET', 'PROFIT', 'EQUITY', 'BONDS', 'FUNDS'
  ],
  6: [
    'BUDGET', 'INCOME', 'PROFIT', 'MARKET', 'CREDIT', 'INVEST', 'RETURN', 'EQUITY',
    'ASSETS', 'WEALTH', 'SALARY', 'BROKER', 'MARGIN', 'OPTION', 'FUTURE', 'DOLLAR',
    'RUPIAH', 'POUNDS', 'FRANCS', 'SHARES', 'BONDS', 'MUTUAL', 'HEDGE', 'PRIME'
  ]
}

function getDateString(date: Date = new Date()): string {
  return date.toISOString().split('T')[0]
}

function getDailyWord(wordLength: WordLength, date: Date = new Date()): string {
  const dateString = getDateString(date)
  const words = FINANCIAL_WORDS[wordLength]
  
  // Use date as seed for consistent daily word
  let hash = 0
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  
  // Add word length to hash to ensure different words for different lengths on same day
  hash = hash + wordLength * 1000
  
  const index = Math.abs(hash) % words.length
  return words[index]
}

function getStorageKey(wordLength: WordLength, date?: Date): string {
  const dateString = getDateString(date)
  return `daily-game-${wordLength}-${dateString}`
}

function getStatsKey(wordLength: WordLength): string {
  return `daily-stats-${wordLength}`
}

export function getTodaysDailyGame(wordLength: WordLength): GameState {
  const today = new Date()
  const storageKey = getStorageKey(wordLength, today)
  
  // Try to load existing game
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try {
        const dailyData: DailyGameData = JSON.parse(saved)
        return dailyData.gameState
      } catch (error) {
        console.error('Error loading daily game:', error)
      }
    }
  }
  
  // Create new daily game
  const targetWord = getDailyWord(wordLength, today)
  const gameState = createEmptyGameState(wordLength, targetWord)
  
  // Save initial state
  const dailyData: DailyGameData = {
    date: getDateString(today),
    wordLength,
    targetWord,
    gameState,
    completed: false,
    won: false,
    guessCount: 0
  }
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(storageKey, JSON.stringify(dailyData))
  }
  
  return gameState
}

export function saveDailyGameProgress(gameState: GameState): void
export function saveDailyGameProgress(wordLength: WordLength, gameState: GameState): void
export function saveDailyGameProgress(gameStateOrWordLength: GameState | WordLength, gameState?: GameState): void {
  // Handle both function signatures for backward compatibility
  let actualGameState: GameState
  
  if (typeof gameStateOrWordLength === 'object') {
    // Called with just gameState
    actualGameState = gameStateOrWordLength
  } else {
    // Called with wordLength and gameState
    actualGameState = gameState!
  }
  if (typeof window === 'undefined') return
  
  const today = new Date()
  const storageKey = getStorageKey(actualGameState.wordLength, today)
  
  const dailyData: DailyGameData = {
    date: getDateString(today),
    wordLength: actualGameState.wordLength,
    targetWord: actualGameState.targetWord,
    gameState: actualGameState,
    completed: actualGameState.gameStatus !== 'playing',
    won: actualGameState.gameStatus === 'won',
    guessCount: actualGameState.guesses.length
  }
  
  localStorage.setItem(storageKey, JSON.stringify(dailyData))
  
  // Update stats if game is completed
  if (dailyData.completed) {
    updateDailyStats(actualGameState.wordLength, dailyData.won, dailyData.guessCount)
  }
}

export function hasPlayedToday(wordLength: WordLength): boolean {
  if (typeof window === 'undefined') return false
  
  const today = new Date()
  const storageKey = getStorageKey(wordLength, today)
  const saved = localStorage.getItem(storageKey)
  
  if (!saved) return false
  
  try {
    const dailyData: DailyGameData = JSON.parse(saved)
    return dailyData.completed
  } catch (error) {
    console.error('Error checking daily game status:', error)
    return false
  }
}

function updateDailyStats(wordLength: WordLength, won: boolean, guessCount: number): void {
  if (typeof window === 'undefined') return
  
  const statsKey = getStatsKey(wordLength)
  let stats: DailyGameStats
  
  const saved = localStorage.getItem(statsKey)
  if (saved) {
    try {
      stats = JSON.parse(saved)
    } catch (error) {
      stats = createEmptyStats()
    }
  } else {
    stats = createEmptyStats()
  }
  
  // Update stats
  stats.gamesPlayed++
  stats.lastPlayedDate = getDateString()
  
  if (won) {
    stats.gamesWon++
    stats.currentStreak++
    stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak)
    
    // Update guess distribution
    if (guessCount >= 1 && guessCount <= 6) {
      stats.guessDistribution[guessCount] = (stats.guessDistribution[guessCount] || 0) + 1
    }
  } else {
    stats.currentStreak = 0
  }
  
  stats.winPercentage = stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0
  stats.winRate = stats.winPercentage
  
  localStorage.setItem(statsKey, JSON.stringify(stats))
}

function createEmptyStats(): DailyGameStats {
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    winPercentage: 0,
    winRate: 0,
    guessDistribution: {},
    lastPlayedDate: ''
  }
}

export function getDailyStats(wordLength: WordLength): DailyGameStats {
  if (typeof window === 'undefined') return createEmptyStats()
  
  const statsKey = getStatsKey(wordLength)
  const saved = localStorage.getItem(statsKey)
  
  if (!saved) return createEmptyStats()
  
  try {
    return JSON.parse(saved)
  } catch (error) {
    console.error('Error loading daily stats:', error)
    return createEmptyStats()
  }
}

export function getTimeUntilNextWord(): { hours: number; minutes: number; seconds: number } {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  
  const diff = tomorrow.getTime() - now.getTime()
  
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  return { hours, minutes, seconds }
}

export function resetDailyStats(wordLength: WordLength): void {
  if (typeof window === 'undefined') return
  
  const statsKey = getStatsKey(wordLength)
  localStorage.removeItem(statsKey)
}

// Utility function to get all daily words for testing
export function getDailyWordForDate(wordLength: WordLength, date: Date): string {
  return getDailyWord(wordLength, date)
}