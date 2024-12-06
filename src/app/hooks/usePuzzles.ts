import { useState, useEffect } from 'react'
import { Chess } from 'chess.js'

// Define the puzzle type
type Puzzle = {
  PuzzleId: string
  FEN: string
  Moves: string
  Rating: number
  RatingDeviation: number
  Popularity: number
  NbPlays: number
  Themes: string
  GameUrl: string
  OpeningTags: string | null
}

export function usePuzzles(jsonPath = '/lichess_db_puzzle.json') {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([])
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null)
  const [solutionHistory, setSolutionHistory] = useState<string[]>([])
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState<number>(0)
  const [isSolved, setIsSolved] = useState<boolean>(false)
  const [game, setGame] = useState(new Chess())

  // Load puzzles from JSON on mount
  useEffect(() => {
    const loadPuzzles = async () => {
      try {
        const response = await fetch(jsonPath)
        const data: Puzzle[] = await response.json()
        setPuzzles(data)
      } catch (error) {
        console.error('Failed to load puzzles:', error)
      }
    }

    loadPuzzles()
  }, [jsonPath])

  // Get a random puzzle
  const getRandomPuzzle = () => {
    if (puzzles.length > 0) {
      const randomIndex = Math.floor(Math.random() * puzzles.length)
      const puzzle = puzzles[randomIndex]
      setCurrentPuzzle(puzzle)
      setGame(new Chess(puzzle.FEN))
      setSolutionHistory(puzzle.Moves.split(' '))
      setCurrentSolutionIndex(0)
      setIsSolved(false)
    }
  }

  // Handle puzzle move
  const handlePuzzleMove = (from: string, to: string) => {
    if (!currentPuzzle || isSolved) return false

    const move = game.move({ from, to })

    if (!move) {
      // Invalid move
      return false
    }

    const expectedMove = solutionHistory[currentSolutionIndex]

    if (move.san === expectedMove) {
      // Correct move
      setCurrentSolutionIndex((prevIndex) => prevIndex + 1)

      if (currentSolutionIndex + 1 === solutionHistory.length) {
        // Puzzle is solved
        setIsSolved(true)
      }

      return true
    } else {
      // Incorrect move, undo it
      game.undo()
      return false
    }
  }

  // Reset the puzzle to its initial state
  const resetPuzzle = () => {
    if (currentPuzzle) {
      setGame(new Chess(currentPuzzle.FEN))
      setCurrentSolutionIndex(0)
      setIsSolved(false)
    }
  }

  return {
    currentPuzzle,
    getRandomPuzzle,
    handlePuzzleMove,
    resetPuzzle,
    isSolved,
    solutionHistory,
    currentSolutionIndex,
  }
}
