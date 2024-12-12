import { useState, useEffect } from 'react'
import { Chess } from 'chess.js'

// Define the simplified puzzle type
type Puzzle = {
  PuzzleId: string
  FEN: string
  Moves: string
  Themes: string // Now explicitly used for filtering by theme
}

export function usePuzzles(
  jsonPath = 'public/mate_puzzles.json',
  theme: string
) {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([])
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null)
  const [solutionHistory, setSolutionHistory] = useState<string[]>([])
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState<number>(0)
  const [isSolved, setIsSolved] = useState<boolean>(false)
  const [game] = useState(new Chess())
  const [fenHistory, setFenHistory] = useState<string[]>([]) // Track FEN history
  const [activePlayer, setActivePlayer] = useState<'white' | 'black'>('white') // Active player with setter
  const [playerColor, setPlayerColor] = useState<'white' | 'black'>('white') // Player's color in the puzzle
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>(
    'white'
  )

  const [moves, setMoves] = useState<string[]>([])

  // Load puzzles from JSON on mount and filter by theme
  useEffect(() => {
    const loadPuzzles = async () => {
      try {
        const response = await fetch(jsonPath)
        const data: Puzzle[] = await response.json()

        // Filter puzzles by selected theme
        const filteredPuzzles =
          theme === 'All'
            ? data
            : data.filter((puzzle) => puzzle.Themes.includes(theme))

        setPuzzles(filteredPuzzles)
      } catch (error) {
        console.error('Failed to load puzzles:', error)
      }
    }

    loadPuzzles()
  }, [jsonPath, theme])

  // Update active player and player color whenever FEN changes
  useEffect(() => {
    if (fenHistory.length > 0) {
      const currentFEN = fenHistory[fenHistory.length - 1]
      const sideToMove = currentFEN.split(' ')[1] // Second part of FEN indicates active side ('w' or 'b')
      setActivePlayer(sideToMove === 'w' ? 'white' : 'black')

      // Set player color based on the starting FEN's active player
      if (fenHistory.length === 1) {
        setPlayerColor(sideToMove === 'w' ? 'white' : 'black')
      }

      console.log('Active Player:', sideToMove === 'w' ? 'white' : 'black')
    }
  }, [fenHistory])

  // Sync Chess.js game instance with FEN history
  useEffect(() => {
    if (fenHistory.length > 0) {
      const currentFEN = fenHistory[fenHistory.length - 1]
      if (game.fen() !== currentFEN) {
        game.load(currentFEN)
        console.log('Game FEN Updated:', currentFEN)
      }
    }
  }, [fenHistory, game])

  // Get random puzzle
  const getRandomPuzzle = () => {
    if (puzzles.length > 0) {
      const randomIndex = Math.floor(Math.random() * puzzles.length)
      const puzzle = puzzles[randomIndex]

      setCurrentPuzzle(puzzle)
      game.load(puzzle.FEN) // Update the game state
      setFenHistory([puzzle.FEN]) // Initialize FEN history with the puzzle's starting position
      setSolutionHistory(puzzle.Moves.split(' '))
      setCurrentSolutionIndex(0)
      setIsSolved(false)

      // Determine active player's perspective from the starting FEN string
      const startingSide = puzzle.FEN.split(' ')[1] // Extract the 'w' or 'b' value
      setBoardOrientation(startingSide === 'b' ? 'black' : 'white') // Set the initial view accordingly

      console.log('Loaded Puzzle:', puzzle)
    }
  }

  const handlePuzzleMove = (from: string, to: string) => {
    console.log('Received move:', { from, to })

    // Validate input format
    if (!from.match(/^[a-h][1-8]$/) || !to.match(/^[a-h][1-8]$/)) {
      console.warn('Invalid square format:', { from, to })
      return false
    }

    if (!currentPuzzle || isSolved) return false

    const currentFEN = fenHistory[fenHistory.length - 1]
    if (game.fen() !== currentFEN) {
      game.load(currentFEN) // Load the current FEN into the Chess instance
    }

    const move = game.move({ from, to }) // Attempt the move

    if (!move) {
      console.warn('Invalid move:', from, to)
      return false
    }

    const expectedMove = solutionHistory[currentSolutionIndex]
    console.log('Player Move:', move.san, 'Expected Move:', expectedMove)

    if (move.san === expectedMove) {
      // Correct move
      const newFEN = game.fen()
      setFenHistory((prev) => [...prev, newFEN]) // Add the new FEN to the history
      setCurrentSolutionIndex((prevIndex) => prevIndex + 1)

      if (currentSolutionIndex + 1 === solutionHistory.length) {
        // Puzzle is solved
        setIsSolved(true)
        console.log('Puzzle Solved!')
      }

      return true
    } else {
      // Incorrect move, undo it
      game.undo()
      console.warn('Incorrect move. Move undone.')
      return false
    }
  }

  // Reset the puzzle to its initial state
  const resetPuzzle = () => {
    if (currentPuzzle) {
      game.load(currentPuzzle.FEN)
      setFenHistory([currentPuzzle.FEN])
      setCurrentSolutionIndex(0)
      setIsSolved(false)
      console.log('Puzzle Reset:', currentPuzzle)
    }
  }

  const handleNavigateToMove = (index: number) => {
    if (index >= 0 && index < fenHistory.length) {
      setCurrentSolutionIndex(index)
    }
  }

  // Toggle board orientation
  const toggleBoardOrientation = () => {
    setBoardOrientation((prev) => (prev === 'white' ? 'black' : 'white'))
  }

  // Handle taking back a move
  const handleTakeBackMove = () => {
    if (currentSolutionIndex > 0) {
      const updatedMoves = moves.slice(0, -1)
      const updatedFenHistory = fenHistory.slice(0, -1)
      setMoves(updatedMoves)
      setFenHistory(updatedFenHistory)
      setCurrentSolutionIndex((prev) => prev - 1)

      // Save to localStorage
      localStorage.setItem('fenHistory', JSON.stringify(updatedFenHistory))
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
    fenHistory,
    setFenHistory,
    activePlayer,
    setActivePlayer,
    playerColor,
    handleNavigateToMove,
    toggleBoardOrientation,
    handleTakeBackMove,
    boardOrientation,
  }
}
