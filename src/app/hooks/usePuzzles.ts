import { useState, useEffect } from 'react'
import { Chess } from 'chess.js'

// Define the simplified puzzle type
type Puzzle = {
  PuzzleId: string
  FEN: string
  Moves: string
  Themes: string // Used for filtering by theme
}

export function usePuzzles(initialPuzzles: Puzzle[]) {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([])
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState<number>(0)
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null)
  const [solutionHistory, setSolutionHistory] = useState<string[]>([])
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState<number>(0)
  const [isSolved, setIsSolved] = useState<boolean>(false)
  const [game] = useState(new Chess())
  const [fenHistory, setFenHistory] = useState<string[]>([]) // Track FEN history
  const [activePlayer, setActivePlayer] = useState<'white' | 'black'>('white')
  const [playerColor, setPlayerColor] = useState<'white' | 'black'>('white')
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>(
    'white'
  )
  const [gameStarted, setGameStarted] = useState(false)

  // Update puzzles when `initialPuzzles` changes
  useEffect(() => {
    if (!gameStarted) {
      setPuzzles(initialPuzzles)
    }
  }, [initialPuzzles, gameStarted])

  // Start the game and load the first puzzle
  useEffect(() => {
    if (gameStarted && puzzles.length > 0) {
      loadPuzzleByIndex(0)
    }
  }, [gameStarted]) // Remove puzzles from dependencies

  // Update active player and player color whenever FEN changes
  useEffect(() => {
    if (fenHistory.length > 0) {
      const currentFEN = fenHistory[fenHistory.length - 1]
      const sideToMove = currentFEN.split(' ')[1] // Second part of FEN indicates active side ('w' or 'b')
      setActivePlayer(sideToMove === 'w' ? 'white' : 'black')

      if (fenHistory.length === 1) {
        setPlayerColor(sideToMove === 'w' ? 'white' : 'black')
      }
    }
  }, [fenHistory])

  // Load a puzzle by its index
  const loadPuzzleByIndex = (index: number, forceReload = false) => {
    if (index === currentPuzzleIndex && !forceReload) {
      console.log('Puzzle already loaded:', index)
      return
    }

    if (index >= 0 && index < puzzles.length) {
      const puzzle = puzzles[index]
      setCurrentPuzzle(puzzle)
      setCurrentPuzzleIndex(index)
      game.load(puzzle.FEN)
      setFenHistory([puzzle.FEN])
      setSolutionHistory(puzzle.Moves.split(' '))
      setCurrentSolutionIndex(0)
      setIsSolved(false)

      const startingSide = puzzle.FEN.split(' ')[1]
      setBoardOrientation(startingSide === 'b' ? 'white' : 'black')

      console.log('Loaded Puzzle:', puzzle)
    }
  }

  // Fetch a random puzzle
  const getRandomPuzzle = () => {
    if (puzzles.length === 0) return

    let randomIndex = Math.floor(Math.random() * puzzles.length)

    // Avoid reloading the same puzzle
    while (randomIndex === currentPuzzleIndex && puzzles.length > 1) {
      randomIndex = Math.floor(Math.random() * puzzles.length)
    }

    loadPuzzleByIndex(randomIndex)
  }

  // Fetch the next puzzle sequentially
  const getNextPuzzle = () => {
    if (currentPuzzleIndex < puzzles.length - 1) {
      loadPuzzleByIndex(currentPuzzleIndex + 1)
    } else {
      alert(
        'You finished all of the puzzles available in this theme! Redirecting you back to the theme selection screen...'
      )

      // Redirect immediately to /puzzles
      if (typeof window !== 'undefined') {
        window.location.href = '/puzzles'
      }
    }
  }

  // Handle a move during the puzzle
  const handlePuzzleMove = (from: string, to: string) => {
    if (!currentPuzzle || isSolved) return false

    const move = game.move({ from, to })
    if (move) {
      const newFEN = game.fen()
      setFenHistory((prev) => [...prev, newFEN])

      if (solutionHistory[currentSolutionIndex] === move.san) {
        setCurrentSolutionIndex((prev) => prev + 1)
      } else {
        game.undo()
      }
      return true
    }
    return false
  }

  // Reset the current puzzle
  const resetPuzzle = () => {
    if (currentPuzzle) {
      loadPuzzleByIndex(currentPuzzleIndex, true) // Reload the puzzle
      setIsSolved(false)
    }
  }

  // Undo the last move
  const handleTakeBackMove = () => {
    if (isSolved || currentSolutionIndex === 0) return
    setFenHistory((prev) => prev.slice(0, -1))
    setCurrentSolutionIndex((prev) => prev - 1)
    game.undo()
  }

  // Toggle the board orientation
  const toggleBoardOrientation = () => {
    setBoardOrientation((prev) => (prev === 'white' ? 'black' : 'white'))
  }

  // Navigate to a specific move
  const handleNavigateToMove = (index: number) => {
    if (index >= 0 && index < fenHistory.length) {
      setCurrentSolutionIndex(index)
    }
  }

  // Detect when a puzzle is solved
  useEffect(() => {
    if (
      solutionHistory.length > 0 && // Ensure the solution history is populated
      currentSolutionIndex === solutionHistory.length
    ) {
      setIsSolved(true)
      console.log('Puzzle solved!')
    }
  }, [currentSolutionIndex, solutionHistory])

  return {
    currentPuzzle,
    getRandomPuzzle,
    getNextPuzzle, // Expose this new function
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
    toggleBoardOrientation,
    handleTakeBackMove,
    boardOrientation,
    setCurrentSolutionIndex,
    handleNavigateToMove,
    gameStarted,
    setGameStarted,
  }
}
