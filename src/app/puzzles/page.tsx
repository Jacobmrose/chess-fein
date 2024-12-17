'use client'

import { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import PuzzleGame from '@/app/components/PuzzleGame'
import PuzzleInitializer from '@/app/components/PuzzleInitializer'
import { usePuzzles } from '../hooks/usePuzzles'
import PuzzleGameInfo from '../components/PuzzleGameInfo'

// Define the Puzzle type
type Puzzle = {
  PuzzleId: string
  FEN: string
  Moves: string
  Themes: string
}

export default function Play() {
  const { user } = useUser()
  const [filteredPuzzles, setFilteredPuzzles] = useState<Puzzle[]>([]) // Store filtered puzzles

  // Use the custom hook with the filtered puzzles
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
  } = usePuzzles(filteredPuzzles) // Pass filtered puzzles to the hook

  // Callback for when puzzles are fetched and filtered
  const handleFetchPuzzles = (puzzles: Puzzle[]) => {
    setFilteredPuzzles(puzzles) // Set the filtered puzzles
    console.log(puzzles)

    getRandomPuzzle() // Immediately load a random puzzle
  }

  return (
    <div className='flex flex-col items-center w-full h-auto p-4 mt-16'>
      <div className='relative w-full max-w-4xl flex flex-col items-center'>
        {!currentPuzzle ? (
          <PuzzleInitializer
            jsonPath='/mate_puzzles.json' // Path to your JSON file
            onFetchPuzzles={handleFetchPuzzles} // Pass filtered puzzles to this callback
            filteredPuzzles={filteredPuzzles}
            setFilteredPuzzles={setFilteredPuzzles}
          />
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
