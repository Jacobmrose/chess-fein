'use client'

import { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import ChessGame from '@/app/components/ChessGame'
import GameInitializer from '@/app/components/GameInitializer'
import GameInfo from '@/app/components/GameInfo'

export default function Play() {
  const { user } = useUser() // Get user data from Auth0
  const [color, setColor] = useState<'white' | 'black' | null>(null)
  const [moves, setMoves] = useState<string[]>([])
  const [isGameOver, setIsGameOver] = useState(false)
  const [computerOpponent, setComputerOpponent] = useState(true)
  const [timeLimit, setTimeLimit] = useState<number>(5) // Default time limit in minutes
  const [difficulty, setDifficulty] = useState<number>(1) // Default AI difficulty

  // Dynamically set player names based on Auth0 or fallback to Stockfish for AI
  const whitePlayerName =
    color === 'white'
      ? user?.name || 'White Player'
      : `Stockfish Level ${difficulty}`

  const blackPlayerName =
    color === 'black'
      ? user?.name || 'Black Player'
      : `Stockfish Level ${difficulty}`

  const handleStartGame = (
    selectedColor: 'white' | 'black',
    selectedTimeLimit: number,
    selectedDifficulty: number
  ) => {
    setColor(selectedColor)
    setTimeLimit(selectedTimeLimit)
    setDifficulty(selectedDifficulty)
    localStorage.setItem('playerColor', selectedColor)
    setMoves([]) // Clear previous moves when starting a new game
    setIsGameOver(false) // Reset game over state
  }

  const handleMove = (move: string) => {
    setMoves((prevMoves) => [...prevMoves, move])
  }

  const handleResign = () => {
    alert('You resigned!')
    setIsGameOver(true)
  }

  const handleResetGame = () => {
    setColor(null)
    setMoves([])
    setIsGameOver(false)
  }

  const handleGameOver = () => {
    setIsGameOver(true)
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
              whitePlayerName={whitePlayerName}
              blackPlayerName={blackPlayerName}
              timeLimit={timeLimit * 60} // Convert minutes to seconds
              difficulty={difficulty}
            />
            <GameInfo
              moves={moves}
              onResign={handleResign}
              onResetGame={handleResetGame}
              color={color}
              isGameOver={isGameOver}
            />
          </>
        )}
      </div>
    </div>
  )
}
