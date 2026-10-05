export interface UserPoints {
  totalPoints: number
  availablePoints: number
  lifetimeEarned: number
  lastUpdated: string
}

export interface PointTransaction {
  id: string
  type: 'earn' | 'spend'
  amount: number
  source: string
  description: string
  timestamp: string
  gameId?: string
  voucherId?: string
}

export interface GameReward {
  gameId: string
  gameName: string
  basePoints: number
  bonusMultiplier: number
  dailyBonus: number
  streakBonus: number
  perfectBonus?: number
}

export interface Voucher {
  id: string
  title: string
  description: string
  pointsCost: number
  value: number
  type: 'discount' | 'cashback' | 'topup' | 'premium'
  category: string
  expiryDays: number
  isActive: boolean
  imageUrl?: string
  terms?: string[]
}

export interface UserVoucher {
  id: string
  voucherId: string
  userId: string
  purchaseDate: string
  expiryDate: string
  isUsed: boolean
  usedDate?: string
}

export interface TopUpOption {
  id: string
  provider: string
  type: 'mobile' | 'game' | 'ewallet' | 'streaming'
  name: string
  pointsCost: number
  value: number
  imageUrl?: string
}

// Game reward configurations
const GAME_REWARDS: Record<string, GameReward> = {
  'fordle': {
    gameId: 'fordle',
    gameName: 'FORDLE',
    basePoints: 50,
    bonusMultiplier: 1.5,
    dailyBonus: 25,
    streakBonus: 10,
    perfectBonus: 100
  },
  'budget-master': {
    gameId: 'budget-master',
    gameName: 'Budget Master',
    basePoints: 75,
    bonusMultiplier: 1.3,
    dailyBonus: 30,
    streakBonus: 15
  },
  'investment-tycoon': {
    gameId: 'investment-tycoon',
    gameName: 'Investment Tycoon',
    basePoints: 100,
    bonusMultiplier: 2.0,
    dailyBonus: 50,
    streakBonus: 25
  },
  'saving-challenge': {
    gameId: 'saving-challenge',
    gameName: 'Saving Challenge',
    basePoints: 40,
    bonusMultiplier: 1.2,
    dailyBonus: 20,
    streakBonus: 8
  },
  'crypto-quest': {
    gameId: 'crypto-quest',
    gameName: 'Crypto Quest',
    basePoints: 80,
    bonusMultiplier: 1.8,
    dailyBonus: 40,
    streakBonus: 20
  },
  'debt-destroyer': {
    gameId: 'debt-destroyer',
    gameName: 'Debt Destroyer',
    basePoints: 60,
    bonusMultiplier: 1.4,
    dailyBonus: 25,
    streakBonus: 12
  },
  'financial-quiz': {
    gameId: 'financial-quiz',
    gameName: 'Financial Quiz Arena',
    basePoints: 30,
    bonusMultiplier: 1.1,
    dailyBonus: 15,
    streakBonus: 5
  }
}

// Available vouchers
const AVAILABLE_VOUCHERS: Voucher[] = [
  {
    id: 'discount-10',
    title: '10% Discount Voucher',
    description: 'Get 10% off on your next transaction fee',
    pointsCost: 500,
    value: 10,
    type: 'discount',
    category: 'banking',
    expiryDays: 30,
    isActive: true,
    terms: ['Valid for transaction fees only', 'Cannot be combined with other offers']
  },
  {
    id: 'cashback-25k',
    title: 'Rp 25,000 Cashback',
    description: 'Get Rp 25,000 cashback on minimum Rp 500,000 transaction',
    pointsCost: 1000,
    value: 25000,
    type: 'cashback',
    category: 'banking',
    expiryDays: 60,
    isActive: true,
    terms: ['Minimum transaction Rp 500,000', 'Valid for all payment methods']
  },
  {
    id: 'premium-1month',
    title: '1 Month Premium Access',
    description: 'Unlock premium features for 1 month',
    pointsCost: 2000,
    value: 99000,
    type: 'premium',
    category: 'subscription',
    expiryDays: 7,
    isActive: true,
    terms: ['Auto-renewal disabled', 'Access to all premium games and features']
  },
  {
    id: 'topup-50k',
    title: 'Rp 50,000 E-Wallet Top Up',
    description: 'Top up your e-wallet with Rp 50,000',
    pointsCost: 2500,
    value: 50000,
    type: 'topup',
    category: 'ewallet',
    expiryDays: 90,
    isActive: true,
    terms: ['Available for GoPay, OVO, DANA', 'Processing time 1-24 hours']
  }
]

// Top-up options
const TOPUP_OPTIONS: TopUpOption[] = [
  // Mobile Credit
  {
    id: 'telkomsel-25k',
    provider: 'Telkomsel',
    type: 'mobile',
    name: 'Pulsa Rp 25,000',
    pointsCost: 1250,
    value: 25000,
    imageUrl: '/telkomsel-logo.png'
  },
  {
    id: 'xl-25k',
    provider: 'XL',
    type: 'mobile',
    name: 'Pulsa Rp 25,000',
    pointsCost: 1250,
    value: 25000,
    imageUrl: '/xl-logo.png'
  },
  {
    id: 'indosat-25k',
    provider: 'Indosat',
    type: 'mobile',
    name: 'Pulsa Rp 25,000',
    pointsCost: 1250,
    value: 25000,
    imageUrl: '/indosat-logo.png'
  },
  // Game Credits
  {
    id: 'steam-100k',
    provider: 'Steam',
    type: 'game',
    name: 'Steam Wallet Rp 100,000',
    pointsCost: 5000,
    value: 100000,
    imageUrl: '/steam-logo.png'
  },
  {
    id: 'mobile-legends-100',
    provider: 'Mobile Legends',
    type: 'game',
    name: '100 Diamonds',
    pointsCost: 1500,
    value: 15000,
    imageUrl: '/ml-logo.png'
  },
  {
    id: 'free-fire-100',
    provider: 'Free Fire',
    type: 'game',
    name: '100 Diamonds',
    pointsCost: 1500,
    value: 15000,
    imageUrl: '/ff-logo.png'
  },
  // E-Wallet
  {
    id: 'gopay-50k',
    provider: 'GoPay',
    type: 'ewallet',
    name: 'Top Up Rp 50,000',
    pointsCost: 2500,
    value: 50000,
    imageUrl: '/gopay-logo.png'
  },
  {
    id: 'ovo-50k',
    provider: 'OVO',
    type: 'ewallet',
    name: 'Top Up Rp 50,000',
    pointsCost: 2500,
    value: 50000,
    imageUrl: '/ovo-logo.png'
  },
  {
    id: 'dana-50k',
    provider: 'DANA',
    type: 'ewallet',
    name: 'Top Up Rp 50,000',
    pointsCost: 2500,
    value: 50000,
    imageUrl: '/dana-logo.png'
  },
  // Streaming
  {
    id: 'netflix-1month',
    provider: 'Netflix',
    type: 'streaming',
    name: '1 Month Premium',
    pointsCost: 8000,
    value: 120000,
    imageUrl: '/netflix-logo.png'
  },
  {
    id: 'spotify-1month',
    provider: 'Spotify',
    type: 'streaming',
    name: '1 Month Premium',
    pointsCost: 3000,
    value: 54000,
    imageUrl: '/spotify-logo.png'
  }
]

// Storage keys
const STORAGE_KEYS = {
  USER_POINTS: 'maza-user-points',
  POINT_TRANSACTIONS: 'maza-point-transactions',
  USER_VOUCHERS: 'maza-user-vouchers',
  GAME_STREAKS: 'maza-game-streaks'
}

// Utility functions
function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue
  
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error reading from localStorage key ${key}:`, error)
    return defaultValue
  }
}

function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error writing to localStorage key ${key}:`, error)
  }
}

// Main point system functions
export function getUserPoints(): UserPoints {
  return getStorageItem(STORAGE_KEYS.USER_POINTS, {
    totalPoints: 2450, // Starting with existing points from games content
    availablePoints: 2450,
    lifetimeEarned: 2450,
    lastUpdated: new Date().toISOString()
  })
}

export function updateUserPoints(points: Partial<UserPoints>): UserPoints {
  const currentPoints = getUserPoints()
  const updatedPoints = {
    ...currentPoints,
    ...points,
    lastUpdated: new Date().toISOString()
  }
  
  setStorageItem(STORAGE_KEYS.USER_POINTS, updatedPoints)
  return updatedPoints
}

export function addPointTransaction(transaction: Omit<PointTransaction, 'id' | 'timestamp'>): PointTransaction {
  const newTransaction: PointTransaction = {
    ...transaction,
    id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString()
  }
  
  const transactions = getPointTransactions()
  transactions.unshift(newTransaction)
  
  // Keep only last 100 transactions
  if (transactions.length > 100) {
    transactions.splice(100)
  }
  
  setStorageItem(STORAGE_KEYS.POINT_TRANSACTIONS, transactions)
  return newTransaction
}

export function getPointTransactions(): PointTransaction[] {
  return getStorageItem(STORAGE_KEYS.POINT_TRANSACTIONS, [])
}

export function earnPoints(gameId: string, performance: {
  won: boolean
  attempts: number
  timeSpent?: number
  perfectScore?: boolean
  isDaily?: boolean
}): number {
  const gameReward = GAME_REWARDS[gameId]
  if (!gameReward) return 0
  
  let pointsEarned = 0
  
  if (performance.won) {
    // Base points for winning
    pointsEarned += gameReward.basePoints
    
    // Bonus for fewer attempts (for games like Wordle)
    if (performance.attempts <= 3) {
      pointsEarned += Math.floor(gameReward.basePoints * gameReward.bonusMultiplier)
    }
    
    // Perfect score bonus
    if (performance.perfectScore && gameReward.perfectBonus) {
      pointsEarned += gameReward.perfectBonus
    }
    
    // Daily bonus
    if (performance.isDaily) {
      pointsEarned += gameReward.dailyBonus
    }
    
    // Streak bonus
    const streak = getGameStreak(gameId)
    if (streak > 1) {
      pointsEarned += Math.min(streak * gameReward.streakBonus, gameReward.streakBonus * 10) // Cap at 10x
    }
  } else {
    // Consolation points for playing
    pointsEarned = Math.floor(gameReward.basePoints * 0.2)
  }
  
  // Update user points
  const currentPoints = getUserPoints()
  updateUserPoints({
    totalPoints: currentPoints.totalPoints + pointsEarned,
    availablePoints: currentPoints.availablePoints + pointsEarned,
    lifetimeEarned: currentPoints.lifetimeEarned + pointsEarned
  })
  
  // Add transaction record
  addPointTransaction({
    type: 'earn',
    amount: pointsEarned,
    source: gameId,
    description: `${gameReward.gameName} - ${performance.won ? 'Victory' : 'Participation'} Reward`
  })
  
  // Update streak
  updateGameStreak(gameId, performance.won)
  
  return pointsEarned
}

export function spendPoints(amount: number, description: string, voucherId?: string): boolean {
  const currentPoints = getUserPoints()
  
  if (currentPoints.availablePoints < amount) {
    return false
  }
  
  updateUserPoints({
    availablePoints: currentPoints.availablePoints - amount
  })
  
  addPointTransaction({
    type: 'spend',
    amount: amount,
    source: 'redemption',
    description,
    voucherId
  })
  
  return true
}

export function getGameStreak(gameId: string): number {
  const streaks = getStorageItem(STORAGE_KEYS.GAME_STREAKS, {})
  return streaks[gameId]?.current || 0
}

export function updateGameStreak(gameId: string, won: boolean): void {
  const streaks = getStorageItem(STORAGE_KEYS.GAME_STREAKS, {})
  
  if (!streaks[gameId]) {
    streaks[gameId] = { current: 0, best: 0, lastPlayed: '' }
  }
  
  const today = new Date().toDateString()
  const lastPlayed = streaks[gameId].lastPlayed
  
  if (won) {
    if (lastPlayed === today) {
      // Already played today, don't update streak
      return
    }
    
    streaks[gameId].current += 1
    streaks[gameId].best = Math.max(streaks[gameId].best, streaks[gameId].current)
  } else {
    streaks[gameId].current = 0
  }
  
  streaks[gameId].lastPlayed = today
  setStorageItem(STORAGE_KEYS.GAME_STREAKS, streaks)
}

export function getAvailableVouchers(): Voucher[] {
  return AVAILABLE_VOUCHERS.filter(v => v.isActive)
}

export function getTopUpOptions(): TopUpOption[] {
  return TOPUP_OPTIONS
}

export function purchaseVoucher(voucherId: string): boolean {
  const voucher = AVAILABLE_VOUCHERS.find(v => v.id === voucherId)
  if (!voucher || !voucher.isActive) return false
  
  const success = spendPoints(voucher.pointsCost, `Purchased ${voucher.title}`, voucherId)
  if (!success) return false
  
  // Add to user vouchers
  const userVouchers = getUserVouchers()
  const expiryDate = new Date()
  expiryDate.setDate(expiryDate.getDate() + voucher.expiryDays)
  
  const userVoucher: UserVoucher = {
    id: `uv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    voucherId: voucher.id,
    userId: 'current-user', // In real app, get from auth
    purchaseDate: new Date().toISOString(),
    expiryDate: expiryDate.toISOString(),
    isUsed: false
  }
  
  userVouchers.push(userVoucher)
  setStorageItem(STORAGE_KEYS.USER_VOUCHERS, userVouchers)
  
  return true
}

export function purchaseTopUp(topUpId: string): boolean {
  const topUp = TOPUP_OPTIONS.find(t => t.id === topUpId)
  if (!topUp) return false
  
  const success = spendPoints(topUp.pointsCost, `${topUp.provider} - ${topUp.name}`)
  return success
}

export function getUserVouchers(): UserVoucher[] {
  return getStorageItem(STORAGE_KEYS.USER_VOUCHERS, [])
}

export function useVoucher(userVoucherId: string): boolean {
  const userVouchers = getUserVouchers()
  const voucher = userVouchers.find(v => v.id === userVoucherId)
  
  if (!voucher || voucher.isUsed || new Date(voucher.expiryDate) < new Date()) {
    return false
  }
  
  voucher.isUsed = true
  voucher.usedDate = new Date().toISOString()
  
  setStorageItem(STORAGE_KEYS.USER_VOUCHERS, userVouchers)
  return true
}

export function getPointsHistory(limit: number = 10): PointTransaction[] {
  return getPointTransactions().slice(0, limit)
}

export function getGameRewards(): Record<string, GameReward> {
  return GAME_REWARDS
}

// Analytics functions
export function getPointsAnalytics() {
  const transactions = getPointTransactions()
  const earned = transactions.filter(t => t.type === 'earn')
  const spent = transactions.filter(t => t.type === 'spend')
  
  const last30Days = new Date()
  last30Days.setDate(last30Days.getDate() - 30)
  
  const recentEarned = earned.filter(t => new Date(t.timestamp) > last30Days)
  const recentSpent = spent.filter(t => new Date(t.timestamp) > last30Days)
  
  return {
    totalEarned: earned.reduce((sum, t) => sum + t.amount, 0),
    totalSpent: spent.reduce((sum, t) => sum + t.amount, 0),
    last30DaysEarned: recentEarned.reduce((sum, t) => sum + t.amount, 0),
    last30DaysSpent: recentSpent.reduce((sum, t) => sum + t.amount, 0),
    favoriteGame: getMostPlayedGame(earned),
    averagePerGame: earned.length > 0 ? Math.round(earned.reduce((sum, t) => sum + t.amount, 0) / earned.length) : 0
  }
}

function getMostPlayedGame(earnTransactions: PointTransaction[]): string {
  const gameCounts = earnTransactions.reduce((acc, t) => {
    if (t.gameId) {
      acc[t.gameId] = (acc[t.gameId] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)
  
  const entries = Object.entries(gameCounts)
  if (entries.length === 0) {
    return 'none'
  }
  
  return entries.reduce((a, b) => gameCounts[a[0]] > gameCounts[b[0]] ? a : b)[0]
}