import { WordLength } from './wordle-game'

// Comprehensive list of financial words by length
const FINANCIAL_WORDS: Record<WordLength, Set<string>> = {
  4: new Set([
    // Basic financial terms
    'BANK', 'LOAN', 'DEBT', 'CASH', 'BOND', 'FUND', 'RISK', 'GAIN', 'LOSS', 'RATE',
    'FEES', 'SAVE', 'COST', 'BILL', 'CARD', 'GOLD', 'EURO', 'YUAN', 'PESO', 'DIME',
    'CENT', 'MINT', 'COIN', 'NOTE', 'WAGE', 'PAID', 'OWED', 'DUES', 'FINE', 'LEVY',
    'LEND', 'RENT', 'SELL', 'DEAL', 'SWAP', 'POOL', 'BEAR', 'BULL', 'CALL', 'PUTS',
    'TICK', 'SPOT', 'LONG', 'HOLD', 'MOVE', 'FLOW', 'FLUX', 'PEAK', 'DROP', 'RISE'
  ]),
  
  5: new Set([
    // Medium financial terms
    'MONEY', 'STOCK', 'TRADE', 'ASSET', 'PRICE', 'VALUE', 'SHARE', 'YIELD', 'QUOTA',
    'LEASE', 'GRANT', 'TRUST', 'AUDIT', 'BONUS', 'WAGES', 'TAXES', 'FOREX', 'PENNY',
    'DEBIT', 'SPEND', 'BUDGET', 'PROFIT', 'EQUITY', 'BONDS', 'FUNDS', 'LOANS', 'DEBTS',
    'COSTS', 'BILLS', 'CARDS', 'RATES', 'GAINS', 'RISKS', 'BANKS', 'SALES', 'BUYS',
    'BEARS', 'BULLS', 'CALLS', 'HEDGE', 'INDEX', 'PRIME', 'GROSS', 'TERMS', 'QUOTE',
    'ORDER', 'LIMIT', 'STOPS', 'SWING', 'TREND', 'CYCLE', 'PHASE', 'SPIKE', 'CRASH',
    'RALLY', 'SLUMP', 'SURGE', 'DIPS', 'HIGHS', 'LOWS', 'OPENS', 'CLOSE', 'SPLIT'
  ]),
  
  6: new Set([
    // Complex financial terms
    'BUDGET', 'INCOME', 'PROFIT', 'MARKET', 'CREDIT', 'INVEST', 'RETURN', 'EQUITY',
    'ASSETS', 'WEALTH', 'SALARY', 'BROKER', 'MARGIN', 'OPTION', 'FUTURE', 'DOLLAR',
    'RUPIAH', 'POUNDS', 'FRANCS', 'SHARES', 'MUTUAL', 'HEDGE', 'PRIME', 'GROWTH',
    'STABLE', 'LIQUID', 'FROZEN', 'ACTIVE', 'PASSIVE', 'SECURE', 'RISKY', 'SAFE',
    'BONDS', 'STOCKS', 'FUNDS', 'TRUSTS', 'GRANTS', 'AUDITS', 'QUOTAS', 'LEASES',
    'TRADES', 'VALUES', 'PRICES', 'YIELDS', 'DEBITS', 'SPENDS', 'PROFITS', 'EQUITIES',
    'ORDERS', 'LIMITS', 'TRENDS', 'CYCLES', 'PHASES', 'SPIKES', 'CRASHES', 'RALLIES',
    'SLUMPS', 'SURGES', 'SWINGS', 'QUOTES', 'OPENS', 'CLOSES', 'SPLITS', 'MERGER'
  ])
}

// Additional common English words that might be used in financial context
const COMMON_WORDS: Record<WordLength, Set<string>> = {
  4: new Set([
    'ABLE', 'BACK', 'BEST', 'BOTH', 'CAME', 'COME', 'EACH', 'EVEN', 'FIND', 'GIVE',
    'GOOD', 'HAND', 'HERE', 'HIGH', 'JUST', 'KEEP', 'KIND', 'KNOW', 'LAST', 'LEFT',
    'LIFE', 'LIKE', 'LIVE', 'LOOK', 'MADE', 'MAKE', 'MANY', 'MORE', 'MOST', 'MOVE',
    'MUCH', 'NAME', 'NEED', 'NEXT', 'ONLY', 'OPEN', 'OVER', 'PART', 'PLAY', 'REAL',
    'RIGHT', 'SAME', 'SEEM', 'SHOW', 'SIDE', 'SOME', 'SUCH', 'TAKE', 'TELL', 'THAN',
    'THAT', 'THEM', 'THEY', 'THIS', 'TIME', 'TURN', 'USED', 'VERY', 'WANT', 'WAYS',
    'WELL', 'WERE', 'WHAT', 'WHEN', 'WILL', 'WITH', 'WORD', 'WORK', 'YEAR', 'YOUR'
  ]),
  
  5: new Set([
    'ABOUT', 'AFTER', 'AGAIN', 'BEING', 'BELOW', 'COULD', 'EVERY', 'FIRST', 'FOUND',
    'GREAT', 'GROUP', 'HOUSE', 'LARGE', 'LIGHT', 'MIGHT', 'NEVER', 'OTHER', 'PLACE',
    'RIGHT', 'SHALL', 'SMALL', 'SOUND', 'STILL', 'THEIR', 'THERE', 'THESE', 'THINK',
    'THREE', 'UNDER', 'WATER', 'WHERE', 'WHICH', 'WHILE', 'WORLD', 'WOULD', 'WRITE',
    'YOUNG', 'ABOVE', 'ALONG', 'AMONG', 'BEGAN', 'BRING', 'BUILD', 'CARRY', 'CLEAN',
    'CLOSE', 'DOING', 'EARLY', 'EARTH', 'FIELD', 'FINAL', 'FORCE', 'FRONT', 'GIVEN',
    'GOING', 'GREEN', 'HAPPY', 'HEARD', 'HEART', 'HEAVY', 'HUMAN', 'LATER', 'LEARN',
    'LEAVE', 'LEVEL', 'LOCAL', 'MAJOR', 'MEANS', 'MUSIC', 'NIGHT', 'NORTH', 'ORDER'
  ]),
  
  6: new Set([
    'ACROSS', 'ALMOST', 'ALWAYS', 'AMOUNT', 'ANIMAL', 'ANSWER', 'AROUND', 'BECAME',
    'BECOME', 'BEFORE', 'BETTER', 'CHANGE', 'COMING', 'COMMON', 'COURSE', 'DURING',
    'ENOUGH', 'FAMILY', 'FATHER', 'FIGURE', 'FOLLOW', 'FRIEND', 'GROUND', 'HAPPEN',
    'HAVING', 'HEALTH', 'HELPED', 'HIGHER', 'INSIDE', 'ITSELF', 'LETTER', 'LITTLE',
    'LIVING', 'MAKING', 'MATTER', 'MEMBER', 'MINUTE', 'MOMENT', 'MOTHER', 'MOVING',
    'NATION', 'NATURE', 'NEEDED', 'NOTICE', 'NUMBER', 'OBJECT', 'OFFICE', 'OPENED',
    'PEOPLE', 'PERSON', 'PLAYED', 'PLEASE', 'POLICY', 'PRETTY', 'PUBLIC', 'RATHER',
    'REASON', 'RECORD', 'RESULT', 'SCHOOL', 'SECOND', 'SHOULD', 'SIMPLE', 'SINGLE'
  ])
}

/**
 * Check if a word is valid for the financial Wordle game
 * @param word - The word to validate
 * @param wordLength - The expected length of the word
 * @returns true if the word is valid, false otherwise
 */
export function isValidWord(word: string, wordLength?: WordLength): boolean {
  if (!word || typeof word !== 'string') {
    return false
  }
  
  const upperWord = word.toUpperCase().trim()
  const length = upperWord.length as WordLength
  
  // Check if length is valid
  if (wordLength && length !== wordLength) {
    return false
  }
  
  if (![4, 5, 6].includes(length)) {
    return false
  }
  
  // Check if word contains only letters
  if (!/^[A-Z]+$/.test(upperWord)) {
    return false
  }
  
  // Check if word exists in our financial words or common words
  return FINANCIAL_WORDS[length].has(upperWord) || COMMON_WORDS[length].has(upperWord)
}

/**
 * Get all valid words for a specific length
 * @param wordLength - The word length to get words for
 * @returns Array of valid words
 */
export function getValidWords(wordLength: WordLength): string[] {
  const financialWords = Array.from(FINANCIAL_WORDS[wordLength])
  const commonWords = Array.from(COMMON_WORDS[wordLength])
  return [...financialWords, ...commonWords].sort()
}

/**
 * Get only financial words for a specific length
 * @param wordLength - The word length to get words for
 * @returns Array of financial words
 */
export function getFinancialWords(wordLength: WordLength): string[] {
  return Array.from(FINANCIAL_WORDS[wordLength]).sort()
}

/**
 * Check if a word is specifically a financial term
 * @param word - The word to check
 * @param wordLength - The expected length of the word
 * @returns true if the word is a financial term, false otherwise
 */
export function isFinancialWord(word: string, wordLength?: WordLength): boolean {
  if (!word || typeof word !== 'string') {
    return false
  }
  
  const upperWord = word.toUpperCase().trim()
  const length = upperWord.length as WordLength
  
  if (wordLength && length !== wordLength) {
    return false
  }
  
  if (![4, 5, 6].includes(length)) {
    return false
  }
  
  return FINANCIAL_WORDS[length].has(upperWord)
}

/**
 * Get a random financial word of specified length
 * @param wordLength - The desired word length
 * @returns A random financial word
 */
export function getRandomFinancialWord(wordLength: WordLength): string {
  const words = Array.from(FINANCIAL_WORDS[wordLength])
  const randomIndex = Math.floor(Math.random() * words.length)
  return words[randomIndex]
}

/**
 * Get word statistics
 * @returns Object containing word counts by length
 */
export function getWordStats(): Record<WordLength, { financial: number; common: number; total: number }> {
  const stats: Record<WordLength, { financial: number; common: number; total: number }> = {
    4: { financial: 0, common: 0, total: 0 },
    5: { financial: 0, common: 0, total: 0 },
    6: { financial: 0, common: 0, total: 0 }
  }
  
  for (const length of [4, 5, 6] as WordLength[]) {
    stats[length].financial = FINANCIAL_WORDS[length].size
    stats[length].common = COMMON_WORDS[length].size
    stats[length].total = stats[length].financial + stats[length].common
  }
  
  return stats
}