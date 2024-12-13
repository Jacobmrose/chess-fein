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
  const [activePlayer, setActivePlayer] = useState<'white' | 'black'>('white')
  const [playerColor, setPlayerColor] = useState<'white' | 'black'>('white')
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

      if (fenHistory.length === 1) {
        setPlayerColor(sideToMove === 'w' ? 'white' : 'black')
      }

      console.log('Active Player:', sideToMove === 'w' ? 'white' : 'black')
    }
  }, [fenHistory])

  // Get random puzzle
  const getRandomPuzzle = () => {
    if (puzzles.length > 0) {
      const randomIndex = Math.floor(Math.random() * puzzles.length)
      const puzzle = puzzles[randomIndex]

      setCurrentPuzzle(puzzle)
      game.load(puzzle.FEN)
      setFenHistory([puzzle.FEN])
      setSolutionHistory(puzzle.Moves.split(' '))
      setCurrentSolutionIndex(0)
      setIsSolved(false)

      const startingSide = puzzle.FEN.split(' ')[1]
      setBoardOrientation(startingSide === 'b' ? 'black' : 'white')

      console.log('Loaded Puzzle:', puzzle)
    }
  }

  // Compare displayed FEN with Chess.js FEN during moves
  const handlePuzzleMove = (from: string, to: string) => {
    console.log('Received move:', { from, to })

    if (!from.match(/^[a-h][1-8]$/) || !to.match(/^[a-h][1-8]$/)) {
      console.warn('Invalid square format:', { from, to })
      return false
    }

    if (!currentPuzzle || isSolved) return false

    const currentFEN = fenHistory[fenHistory.length - 1]
    console.log('Current FEN from fenHistory before move:', currentFEN)
    console.log('Chess.js FEN before move:', game.fen())

    if (game.fen() !== currentFEN) {
      game.load(currentFEN)
      console.log('Synced Chess.js FEN with fenHistory:', currentFEN)
    }

    const move = game.move({ from, to })

    if (!move) {
      console.warn('Invalid move:', from, to)
      return false
    }

    const expectedMove = solutionHistory[currentSolutionIndex]
    console.log('Player Move:', move.san, 'Expected Move:', expectedMove)

    if (move.san === expectedMove) {
      const newFEN = game.fen()
      setFenHistory((prev) => [...prev, newFEN])
      setCurrentSolutionIndex((prevIndex) => prevIndex + 1)

      if (currentSolutionIndex + 1 === solutionHistory.length) {
        setIsSolved(true)
        console.log('Puzzle Solved!')
      }

      console.log('New FEN after move:', newFEN)
      return true
    } else {
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

  // Check if the game is over or the puzzle is solved
  useEffect(() => {
    if (currentSolutionIndex === solutionHistory.length) {
      setIsSolved(true)
      console.log('Puzzle completed successfully!')
    } else if (game.isGameOver()) {
      setIsSolved(true)
      console.log(
        'Game over due to checkmate, stalemate, or other end conditions.'
      )
    }
  }, [currentSolutionIndex, solutionHistory, game])

  // Handle taking back a move
  const handleTakeBackMove = () => {
    if (isSolved || currentSolutionIndex === 0) {
      console.error('Cannot take back moves: either solved or at the start.')
      return
    }

    if (currentSolutionIndex > 0) {
      const updatedFenHistory = fenHistory.slice(0, -1)
      setFenHistory(updatedFenHistory)
      setCurrentSolutionIndex((prev) => prev - 1)

      game.undo()

      localStorage.setItem('fenHistory', JSON.stringify(updatedFenHistory))
      console.log('Move taken back successfully.')
    }
  }

  // Toggle board orientation
  const toggleBoardOrientation = () => {
    setBoardOrientation((prev) => (prev === 'white' ? 'black' : 'white'))
  }

  const handleNavigateToMove = (index: number) => {
    if (index >= 0 && index < fenHistory.length) {
      setCurrentSolutionIndex(index)
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
    toggleBoardOrientation,
    handleTakeBackMove,
    boardOrientation,
    setCurrentSolutionIndex,
    handleNavigateToMove,
  }
}
