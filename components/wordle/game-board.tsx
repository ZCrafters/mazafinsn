import GameTile from "./game-tile"
import type { GameState } from "../../lib/wordle-game"

interface GameBoardProps {
  gameState: GameState
  revealingRow?: number
}

export default function GameBoard({ gameState, revealingRow }: GameBoardProps) {
  return (
    <div className="grid gap-2 p-4">
      {gameState.rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 justify-center">
          {row.letters.map((letter, letterIndex) => (
            <GameTile
              key={letterIndex}
              letter={letter.letter}
              state={letter.state}
              isRevealing={revealingRow === rowIndex}
              revealDelay={letterIndex * 100}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
