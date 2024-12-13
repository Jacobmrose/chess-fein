'use client'

import { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import PuzzleGame from '@/app/components/PuzzleGame'
import PuzzleInitializer from '@/app/components/PuzzleInitializer'
import { usePuzzles } from '../hooks/usePuzzles'
import PuzzleGameInfo from '../components/PuzzleGameInfo'

export default function Play() {
  const { user } = useUser()
  const [theme, setTheme] = useState<string>('All') // State to hold the selected theme

  const {
    currentPuzzle,
    getRandomPuzzle,
    handlePuzzleMove,
    resetPuzzle,
    isSolved,
    solutionHistory,
    currentSolutionIndex,
    fenHistory,
    setFenHistory,
    activePlayer,
    setActivePlayer,
    playerColor,
    handleNavigateToMove,
    handleTakeBackMove,
    toggleBoardOrientation,
    boardOrientation,
    setCurrentSolutionIndex,
  } = usePuzzles('mate_puzzles.json', theme) // Pass the selected theme here

  const handleFetchPuzzles = (selectedTheme: string) => {
    setTheme(selectedTheme) // Update the theme when selected in PuzzleInitializer
    getRandomPuzzle() // Fetch a random puzzle after setting the theme
  }

  return (
    <div className='flex flex-col items-center w-full h-auto p-4 mt-16'>
      <div className='relative w-full max-w-4xl flex flex-col items-center'>
        {!currentPuzzle ? (
          <PuzzleInitializer onFetchPuzzles={handleFetchPuzzles} />
        ) : (
          <>
            <PuzzleGame
              fenHistory={fenHistory} // FEN of the current puzzle
              puzzleMoves={solutionHistory} // Solution moves
              currentMoveIndex={currentSolutionIndex}
              setCurrentMoveIndex={setCurrentSolutionIndex}
              isGameOver={isSolved} // Treat "solved" as game over for puzzles
              onMove={(from, to) => handlePuzzleMove(from, to)} // Handle moves
              onGameOver={() => {}} // Optional callback for when the puzzle is solved
              setFenHistory={setFenHistory}
              setActivePlayer={setActivePlayer}
              activePlayer={activePlayer}
              color={playerColor}
              boardOrientation={boardOrientation}
            />
            <PuzzleGameInfo
              fenHistory={fenHistory} // FEN of the current puzzle
              currentMoveIndex={currentSolutionIndex}
              navigateToMove={handleNavigateToMove}
              onTakeBackMove={handleTakeBackMove}
              onToggleBoardOrientation={toggleBoardOrientation}
            />
          </>
        )}
      </div>
    </div>
  )
}
