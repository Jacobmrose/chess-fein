'use client'

import { useChessGame } from '@/app/hooks/useChessGame'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useState } from 'react'
import PuzzleGame from '@/app/components/PuzzleGame'
import PuzzleInitializer from '@/app/components/PuzzleInitializer'
import GameInfo from '@/app/components/GameInfo'

export default function Play() {
  const { user } = useUser()
  const {
    color,
    boardOrientation,
    moves,
    fenHistory,
    currentMoveIndex,
    isGameOver,
    activePlayer,
    isPlaygroundMode,
    aiEnabled,
    handleStartGame,
    handleMove,
    handleNavigateToMove,
    handleResignation,
    handleResetGame,
    toggleBoardOrientation,
    handleTakeBackMove,
    toggleAI,
    handleGameOver,
    setFenHistory,
    setActivePlayer,
  } = useChessGame(user || null)

  // Puzzle state
  const [puzzleData, setPuzzleData] = useState<null | {
    fen: string
    moves: string[]
  }>(null)

  // Function to fetch puzzles
  const handleFetchPuzzles = async (
    theme: string,
    difficultyRange: [number, number],
    maxMoves: number
  ) => {
    try {
      const response = await fetch('/api/fetch-lichess-puzzles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme, difficultyRange, maxMoves }),
      })

      const data = await response.json()

      if (data.fen && data.moves) {
        setPuzzleData(data)
        handleStartGame('white', 0, 0, true) // Initialize playground mode for puzzles
      } else {
        console.error('No puzzle data received.')
      }
    } catch (error) {
      console.error('Error fetching puzzles:', error)
    }
  }

  return (
    <div className='flex flex-col items-center w-full h-auto p-4 mt-16'>
      <div className='relative w-full max-w-4xl flex flex-col items-center'>
        {!puzzleData ? (
          <PuzzleInitializer
            onFetchPuzzles={(theme, difficulty, maxMoves) => {
              handleFetchPuzzles(theme, difficulty, maxMoves)
            }}
          />
        ) : (
          <>
            <PuzzleGame
              color='white'
              boardOrientation={boardOrientation}
              onMove={handleMove}
              onGameOver={handleGameOver}
              isGameOver={isGameOver}
              setActivePlayer={setActivePlayer}
              currentMoveIndex={currentMoveIndex}
              setFenHistory={setFenHistory}
              activePlayer={activePlayer}
              fenHistory={fenHistory}
              initialFen={puzzleData.fen} // Pass FEN for the puzzle
              puzzleMoves={puzzleData.moves} // Pass moves for the puzzle solution
            />
            <GameInfo
              moves={moves}
              fenHistory={fenHistory}
              currentMoveIndex={currentMoveIndex}
              navigateToMove={handleNavigateToMove}
              onResetGame={() => {
                handleResetGame()
                setPuzzleData(null) // Reset puzzle state when the game resets
              }}
              onTakeBackMove={handleTakeBackMove}
              onToggleBoardOrientation={toggleBoardOrientation}
              onToggleAI={toggleAI}
              isGameOver={isGameOver}
              isPlaygroundMode={isPlaygroundMode}
              aiEnabled={aiEnabled}
              onResign={handleResignation}
            />
          </>
        )}
      </div>
    </div>
  )
}
