'use client'

import { useState } from 'react'
import ChessGame from '@/app/components/ChessGame'
import GameInitializer from '@/app/components/GameInitializer'
import GameInfo from '@/app/components/GameInfo'

export default function Play() {
  const [color, setColor] = useState<'white' | 'black' | null>(null)
  const [moves, setMoves] = useState<string[]>([])
  const [isGameOver, setIsGameOver] = useState(false) // State to track if the game is over

  const handleStartGame = (selectedColor: 'white' | 'black') => {
    setColor(selectedColor)
    localStorage.setItem('playerColor', selectedColor)
    setMoves([]) // Clear previous moves when starting a new game
    setIsGameOver(false) // Reset game over state
  }

  const handleMove = (move: string) => {
    setMoves((prevMoves) => [...prevMoves, move])
  }

  const handleResign = () => {
    alert('You resigned!')
    setIsGameOver(true) // Set game over state
  }

  // New reset function
  const handleResetGame = () => {
    setColor(null) // Reset color
    setMoves([]) // Clear moves
    setIsGameOver(false) // Reset game over state
  }

  // New game over handler
  const handleGameOver = () => {
    setIsGameOver(true) // Set game over state
  }

  return (
    <div className='flex flex-col items-center w-full h-auto p-4 mt-16'>
      <div className='relative w-full max-w-4xl flex flex-col items-center'>
        {!color ? (
          <GameInitializer onStartGame={handleStartGame} />
        ) : (
          <>
            <ChessGame
              color={color}
              onMove={handleMove}
              onGameOver={handleGameOver}
              isGameOver={isGameOver}
            />
            {/* Render GameInfo below the ChessGame */}
            <GameInfo
              moves={moves}
              onResign={handleResign}
              onResetGame={handleResetGame} // Pass reset function
              color={color}
              isGameOver={isGameOver} // Pass game over state
            />
          </>
        )}
      </div>
    </div>
  )
}
