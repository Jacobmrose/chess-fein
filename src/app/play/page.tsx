'use client'

import { useState, useCallback } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import ChessGame from '@/app/components/ChessGame'
import GameInitializer from '@/app/components/GameInitializer'
import GameInfo from '@/app/components/GameInfo'

export default function Play() {
  const { user } = useUser()
  const [color, setColor] = useState<'white' | 'black' | null>(null)
  const [moves, setMoves] = useState<string[]>([])
  const [isGameOver, setIsGameOver] = useState(false)
  const [isResigned, setIsResigned] = useState(false)
  const [timeLimit, setTimeLimit] = useState<number>(5)
  const [difficulty, setDifficulty] = useState<number>(1)

  const handleResignation = useCallback(() => {
    setIsResigned(true)
    handleGameOver()
  }, [])

  const handleStartGame = (
    selectedColor: 'white' | 'black',
    selectedTimeLimit: number,
    selectedDifficulty: number
  ) => {
    setColor(selectedColor)
    setTimeLimit(selectedTimeLimit)
    setDifficulty(selectedDifficulty)
    localStorage.setItem('playerColor', selectedColor)
    setMoves([])
    setIsGameOver(false)
    setIsResigned(false)
  }

  const handleMove = (move: string) => {
    setMoves((prevMoves) => [...prevMoves, move])
  }

  const handleResetGame = () => {
    setColor(null)
    setMoves([])
    setIsGameOver(false)
    setIsResigned(false)
  }

  const handleGameOver = () => {
    setIsGameOver(true)
  }

  const whitePlayerName =
    color === 'white'
      ? user?.name || 'White Player'
      : `Stockfish Level ${difficulty}`
  const blackPlayerName =
    color === 'black'
      ? user?.name || 'Black Player'
      : `Stockfish Level ${difficulty}`

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
              isResigned={isResigned}
              whitePlayerName={whitePlayerName}
              blackPlayerName={blackPlayerName}
              timeLimit={timeLimit * 60}
              difficulty={difficulty}
              onResign={handleResignation}
            />
            <GameInfo
              moves={moves}
              onResign={handleResignation}
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
