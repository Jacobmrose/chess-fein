'use client'

import { useState, useCallback } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import ChessGame from '@/app/components/ChessGame'
import GameInitializer from '@/app/components/GameInitializer'
import GameInfo from '@/app/components/GameInfo'
import { Chess } from 'chess.js'

export default function Play() {
  const { user } = useUser()
  const [color, setColor] = useState<'white' | 'black' | null>(null)
  const [moves, setMoves] = useState<string[]>([])
  const [fenHistory, setFenHistory] = useState<string[]>([new Chess().fen()]) // Initialize with starting position
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(0)
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
    setMoves([])
    setFenHistory([new Chess().fen()]) // Start fenHistory with initial board setup
    setCurrentMoveIndex(0)
    setIsGameOver(false)
    setIsResigned(false)
  }

  const handleMove = (move: string, fen: string) => {
    setMoves((prevMoves) => [...prevMoves, move])
    setFenHistory((prevFens) => [...prevFens, fen])
    setCurrentMoveIndex((prevIndex) => prevIndex + 1)
  }

  const handleNavigateToMove = (index: number) => {
    setCurrentMoveIndex(index)
  }

  const handleResetGame = () => {
    setColor(null)
    setMoves([])
    setFenHistory([new Chess().fen()]) // Reset fenHistory to initial position
    setCurrentMoveIndex(0)
    setIsGameOver(false)
    setIsResigned(false)
  }

  const handleGameOver = () => {
    setIsGameOver(true)
  }

  const getPlayerName = (side: 'white' | 'black') =>
    side === color
      ? user?.name || `${side.charAt(0).toUpperCase() + side.slice(1)} Player`
      : `Stockfish Level ${difficulty}`

  const whitePlayerName = getPlayerName('white')
  const blackPlayerName = getPlayerName('black')

  return (
    <div className='flex flex-col items-center w-full h-auto p-4 mt-16'>
      <div className='relative w-full max-w-4xl flex flex-col items-center'>
        {!color ? (
          <GameInitializer onStartGame={handleStartGame} />
        ) : (
          <>
            <ChessGame
              color={color}
              onMove={(move, fen) => handleMove(move, fen)}
              onGameOver={handleGameOver}
              isGameOver={isGameOver}
              isResigned={isResigned}
              whitePlayerName={whitePlayerName}
              blackPlayerName={blackPlayerName}
              timeLimit={timeLimit * 60}
              difficulty={difficulty}
              onResign={handleResignation}
              currentMoveIndex={currentMoveIndex}
            />
            <GameInfo
              moves={moves}
              fenHistory={fenHistory}
              currentMoveIndex={currentMoveIndex}
              navigateToMove={handleNavigateToMove}
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
