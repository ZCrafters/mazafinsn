export type WordLength = 4 | 5 | 6

export type TileState = 'empty' | 'filled' | 'correct' | 'present' | 'absent'

export type LetterState = 'empty' | 'filled' | 'correct' | 'present' | 'absent' | 'unused'

export type KeyState = 'unused' | 'correct' | 'present' | 'absent'

export interface Tile {
  letter: string
  state: TileState
}

export interface Letter {
  letter: string
  state: TileState
}

export interface Row {
  letters: Letter[]
}

export interface GameState {
  board: Tile[][]
  rows: Row[]
  currentRow: number
  currentCol: number
  gameStatus: 'playing' | 'won' | 'lost'
  targetWord: string
  wordLength: WordLength
  guesses: string[]
  isHardMode: boolean
  maxAttempts: number
}

export interface KeyboardState {
  [key: string]: KeyState
}

// Helper function to convert board to rows format
function boardToRows(board: Tile[][]): Row[] {
  return board.map(row => ({
    letters: row.map(tile => ({ letter: tile.letter, state: tile.state }))
  }))
}

export function createEmptyGameState(wordLength: WordLength, targetWord: string): GameState {
  const maxGuesses = wordLength + 1
  const board: Tile[][] = Array(maxGuesses).fill(null).map(() =>
    Array(wordLength).fill(null).map(() => ({
      letter: '',
      state: 'empty' as TileState
    }))
  )

  return {
    board,
    rows: boardToRows(board),
    currentRow: 0,
    currentCol: 0,
    gameStatus: 'playing',
    targetWord: targetWord.toUpperCase(),
    wordLength,
    guesses: [],
    isHardMode: false,
    maxAttempts: maxGuesses
  }
}

export function getKeyboardState(gameState: GameState): KeyboardState {
  const keyboardState: KeyboardState = {}
  
  // Initialize all keys as unused
  const allKeys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  allKeys.forEach(key => {
    keyboardState[key] = 'unused'
  })

  // Update based on guesses
  gameState.guesses.forEach((guess, rowIndex) => {
    const row = gameState.board[rowIndex]
    guess.split('').forEach((letter, colIndex) => {
      const tile = row[colIndex]
      const currentState = keyboardState[letter.toUpperCase()]
      
      // Priority: correct > present > absent > unused
      if (tile.state === 'correct') {
        keyboardState[letter.toUpperCase()] = 'correct'
      } else if (tile.state === 'present' && currentState !== 'correct') {
        keyboardState[letter.toUpperCase()] = 'present'
      } else if (tile.state === 'absent' && currentState === 'unused') {
        keyboardState[letter.toUpperCase()] = 'absent'
      }
    })
  })

  return keyboardState
}

export function evaluateGuess(guess: string, targetWord: string): TileState[] {
  const result: TileState[] = new Array(guess.length).fill('absent')
  const targetLetters = targetWord.split('')
  const guessLetters = guess.split('')
  
  // First pass: mark correct letters
  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      result[i] = 'correct'
      targetLetters[i] = '' // Mark as used
      guessLetters[i] = '' // Mark as processed
    }
  }
  
  // Second pass: mark present letters
  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] && targetLetters.includes(guessLetters[i])) {
      result[i] = 'present'
      const targetIndex = targetLetters.indexOf(guessLetters[i])
      targetLetters[targetIndex] = '' // Mark as used
    }
  }
  
  return result
}

export function makeGuess(gameState: GameState, guess: string): GameState {
  if (gameState.gameStatus !== 'playing' || guess.length !== gameState.wordLength) {
    return gameState
  }

  const newGameState = { ...gameState }
  const evaluation = evaluateGuess(guess, gameState.targetWord)
  
  // Update the board
  const currentRow = newGameState.board[newGameState.currentRow]
  guess.split('').forEach((letter, index) => {
    currentRow[index] = {
      letter: letter.toUpperCase(),
      state: evaluation[index]
    }
  })
  
  // Update rows alias
  newGameState.rows = boardToRows(newGameState.board)
  
  // Add to guesses
  newGameState.guesses = [...newGameState.guesses, guess.toUpperCase()]
  
  // Check win condition
  if (guess.toUpperCase() === gameState.targetWord) {
    newGameState.gameStatus = 'won'
  } else if (newGameState.currentRow >= newGameState.board.length - 1) {
    newGameState.gameStatus = 'lost'
  } else {
    newGameState.currentRow++
    newGameState.currentCol = 0
  }
  
  return newGameState
}

export function addLetter(gameState: GameState, letter: string): GameState {
  if (gameState.gameStatus !== 'playing' || gameState.currentCol >= gameState.wordLength) {
    return gameState
  }

  const newGameState = { ...gameState }
  const currentTile = newGameState.board[newGameState.currentRow][newGameState.currentCol]
  
  currentTile.letter = letter.toUpperCase()
  currentTile.state = 'filled'
  newGameState.currentCol++
  newGameState.rows = boardToRows(newGameState.board) // Update rows alias
  
  return newGameState
}

export function removeLetter(gameState: GameState): GameState {
  if (gameState.gameStatus !== 'playing' || gameState.currentCol <= 0) {
    return gameState
  }

  const newGameState = { ...gameState }
  newGameState.currentCol--
  
  const currentTile = newGameState.board[newGameState.currentRow][newGameState.currentCol]
  currentTile.letter = ''
  currentTile.state = 'empty'
  newGameState.rows = boardToRows(newGameState.board) // Update rows alias
  
  return newGameState
}

export function getCurrentWord(gameState: GameState): string {
  const currentRow = gameState.board[gameState.currentRow]
  return currentRow.map(tile => tile.letter).join('')
}

export function isGameComplete(gameState: GameState): boolean {
  return gameState.gameStatus === 'won' || gameState.gameStatus === 'lost'
}

export function initializeGame(wordLength: WordLength, targetWord?: string): GameState {
  // For non-daily games, we can use a random word or let the caller provide one
  const word = targetWord || getRandomWord(wordLength)
  return createEmptyGameState(wordLength, word)
}

export function submitRow(gameState: GameState): GameState {
  if (gameState.gameStatus !== 'playing') {
    return gameState
  }

  const currentRow = gameState.board[gameState.currentRow]
  const word = currentRow.map(tile => tile.letter).join('')
  
  if (word.length !== gameState.wordLength) {
    return gameState
  }

  return makeGuess(gameState, word)
}

// Helper function to get a random word (for non-daily games)
function getRandomWord(wordLength: WordLength): string {
  const words = {
    4: ['BANK', 'LOAN', 'DEBT', 'CASH', 'BOND'],
    5: ['MONEY', 'STOCK', 'TRADE', 'ASSET', 'PRICE'],
    6: ['BUDGET', 'INCOME', 'PROFIT', 'MARKET', 'CREDIT']
  }
  
  const wordList = words[wordLength]
  return wordList[Math.floor(Math.random() * wordList.length)]
}