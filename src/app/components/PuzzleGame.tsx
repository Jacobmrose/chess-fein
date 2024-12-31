import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, Square } from 'chess.js'
import { Piece } from '../utils/pieceUtils'
import {
  getMoveHighlightStyle,
  getLastMoveHighlightStyle,
  getHintHighlightStyle,
  getInvalidMoveHighlightStyle,
} from '../utils/highlightStyles'
import { clearSelection } from '../utils/gameUtils'
import PlayerInfo from './PlayerInfo'
import {
  handleGameOverDescription,
  declareWinner,
} from '../utils/gameOverUtils'
import { pieceValues } from '../utils/pieceUtils'
import {
  calculateMaterialDifference,
  getMaterialDifferences,
} from '../utils/calculateMaterialDifference'

interface PuzzleGameProps {
  color: 'white' | 'black'
  boardOrientation: 'white' | 'black'
  onGameOver: () => void
  isGameOver: boolean
  currentMoveIndex: number
  activePlayer: 'white' | 'black'
  setActivePlayer: (player: 'white' | 'black') => void
  fenHistory: string[]
  setFenHistory: React.Dispatch<React.SetStateAction<string[]>>
  puzzleMoves: string[]
  setCurrentMoveIndex: React.Dispatch<React.SetStateAction<number>>
  resetPuzzle: () => void
  getNextPuzzle: () => void
  hint: string | null
  clearHint: () => void
}

const PuzzleGame: React.FC<PuzzleGameProps> = ({
  boardOrientation,
  onGameOver,
  isGameOver,
  currentMoveIndex,
  activePlayer,
  setActivePlayer,
  fenHistory,
  setFenHistory,
  puzzleMoves,
  setCurrentMoveIndex,
  resetPuzzle,
  getNextPuzzle,
  hint,
  clearHint,
}) => {
  const chessGame = useRef(new Chess())
  const [position, setPosition] = useState<string>(chessGame.current.fen())
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null)
  const [possibleMoves, setPossibleMoves] = useState<
    {
      square: Square
      isCapture: boolean
    }[]
  >([])
  const [highlightedSquares, setHighlightedSquares] = useState<Square[]>([])

  const [gameEnded, setGameEnded] = useState(false)
  const [moveProcessed, setMoveProcessed] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const [endReason, setEndReason] = useState<string | null>(null)
  const [materialDifference, setMaterialDifference] = useState(0)
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(
    null
  )
  const [whiteMaterialDifference, setWhiteMaterialDifference] = useState(0)
  const [blackMaterialDifference, setBlackMaterialDifference] = useState(0)
  const [invalidMoveSquares, setInvalidMoveSquares] = useState<string[]>([])

  const prevFenHistory = useRef<string[]>([])

  useEffect(() => {
    // Update material differences when the position changes
    const board = chessGame.current.board()
    const materialDiff = calculateMaterialDifference(board, pieceValues)
    const { whiteMaterialDifference, blackMaterialDifference } =
      getMaterialDifferences(board)
    setMaterialDifference(materialDiff)
    setWhiteMaterialDifference(whiteMaterialDifference)
    setBlackMaterialDifference(blackMaterialDifference)

    // Update the active player if the game is not over
    if (!chessGame.current.isGameOver() && !gameEnded) {
      setActivePlayer(chessGame.current.turn() === 'w' ? 'white' : 'black')
    }

    // Check for game over
    if (!gameEnded && chessGame.current.isGameOver()) {
      handleGameOverDescription(chessGame.current, setEndReason)
      setGameEnded(true)
      declareWinner(chessGame.current, setWinner)
      onGameOver()
    }
  }, [position, gameEnded, onGameOver, setEndReason])

  useEffect(() => {
    // Handle changes to fenHistory and position
    if (fenHistory.length < prevFenHistory.current.length) {
      setLastMove(null) // Clear last move if history has been shortened
    }

    if (currentMoveIndex >= 0 && currentMoveIndex < fenHistory.length) {
      const newFen = fenHistory[currentMoveIndex]
      setPosition(newFen)
      chessGame.current.load(newFen)
      setActivePlayer(chessGame.current.turn() === 'w' ? 'white' : 'black')
    }

    // Save fenHistory to local storage
    localStorage.setItem('fenHistory', JSON.stringify(fenHistory))

    // Load previous fenHistory on initial render
    if (prevFenHistory.current.length === 0) {
      const savedHistory = JSON.parse(
        localStorage.getItem('fenHistory') || '[]'
      )
      if (savedHistory.length) {
        setFenHistory(savedHistory)
        setPosition(savedHistory[savedHistory.length - 1])
      }
    }

    prevFenHistory.current = fenHistory
  }, [fenHistory, currentMoveIndex])

  const isAtCurrentMove = useMemo(
    () => position === fenHistory[fenHistory.length - 1],
    [position, fenHistory]
  )

  const highlightStyles = useMemo(
    () =>
      isAtCurrentMove
        ? possibleMoves.map(({ square, isCapture }) =>
            getMoveHighlightStyle(square, isCapture, boardOrientation)
          )
        : [],
    [possibleMoves, boardOrientation, isAtCurrentMove]
  )

  const handleClearSelection = useCallback(() => {
    clearSelection(setSelectedSquare, setPossibleMoves)
  }, [])

  const getPossibleMoves = useCallback((square: Square) => {
    const game = chessGame.current
    const moves = game.moves({ square, verbose: true })
    const moveSquares = moves.map((move) => ({
      square: move.to as Square,
      isCapture: !!move.captured,
    }))
    setPossibleMoves(moveSquares)
  }, [])

  const makeMoveCallback = useCallback(
    (fromSquare: Square, toSquare: Square) => {
      const game = chessGame.current

      const expectedMove = puzzleMoves[currentMoveIndex]
      if (!expectedMove) {
        console.error('No more moves in the puzzle.')
        return false
      }

      const expectedFrom = expectedMove.slice(0, 2)
      const expectedTo = expectedMove.slice(2, 4)

      // Check if the move is legal
      const legalMoves = game.moves({ square: fromSquare, verbose: true })
      const isMoveLegal = legalMoves.some((m) => m.to === toSquare)

      if (!isMoveLegal) {
        console.error(`Illegal move from ${fromSquare} to ${toSquare}`)
        return false // No invalid highlighting for illegal moves
      }

      // Check if the move matches the puzzle's expected move
      if (fromSquare !== expectedFrom || toSquare !== expectedTo) {
        console.error(
          `Invalid move. Expected: ${expectedFrom} to ${expectedTo}, got: ${fromSquare} to ${toSquare}`
        )
        setInvalidMoveSquares([toSquare]) // Highlight invalid square
        setTimeout(() => setInvalidMoveSquares([]), 500) // Clear after 1 second
        return false
      }

      // Perform the move
      const move = game.move({ from: fromSquare, to: toSquare })
      if (move) {
        const currentFen = game.fen()
        setPosition(currentFen)
        setFenHistory((prevHistory) => [...prevHistory, currentFen])
        setLastMove({ from: move.from, to: move.to })
        setCurrentMoveIndex((prevIndex) => prevIndex + 1)
        setActivePlayer(game.turn() === 'w' ? 'white' : 'black')
        setHighlightedSquares([])
        clearHint()
        return true
      }

      return false
    },
    [
      puzzleMoves,
      currentMoveIndex,
      setPosition,
      setFenHistory,
      setLastMove,
      setCurrentMoveIndex,
      setActivePlayer,
    ]
  )

  const handleSquareClickCallback = useCallback(
    (square: Square) => {
      if (!isAtCurrentMove) return

      const game = chessGame.current
      const pieceAtSquare = game.get(square)

      // Case 1: A piece is already selected
      if (selectedSquare) {
        const fromSquare = selectedSquare

        // Case 1a: Clicking on a different piece of the same color
        if (
          pieceAtSquare &&
          pieceAtSquare.color === game.turn() &&
          !isComputerTurn
        ) {
          setSelectedSquare(square)
          getPossibleMoves(square)
          return
        }

        // Case 1b: Clicking on the same square (deselect)
        if (fromSquare === square) {
          handleClearSelection()
          return
        }

        // Case 1c: Attempt to move to the square
        const toSquare = square

        // Delegate move validation and execution to makeMoveCallback
        const moveSuccessful = makeMoveCallback(fromSquare, toSquare)
        if (moveSuccessful) {
          handleClearSelection() // Clear selection only after a successful move
        } else {
        }

        return
      }

      // Case 2: No piece is selected yet
      if (pieceAtSquare) {
        // Select the piece and highlight its moves
        if (pieceAtSquare.color === game.turn() && !isComputerTurn) {
          setSelectedSquare(square)
          getPossibleMoves(square)
        } else {
          // Clear selection if the piece doesn't belong to the current player
          handleClearSelection()
        }
      } else {
        // No piece on the clicked square; clear selection
        handleClearSelection()
      }
    },
    [
      chessGame,
      selectedSquare,
      setSelectedSquare,
      getPossibleMoves,
      handleClearSelection,
      makeMoveCallback,
      isAtCurrentMove,
    ]
  )

  const handlePieceDrop = useCallback(
    (fromSquare: Square, toSquare: Square) => {
      if (!isAtCurrentMove) return false

      return makeMoveCallback(fromSquare, toSquare)
    },
    [makeMoveCallback, isAtCurrentMove]
  )

  const handleDragEnd = useCallback(
    () => handleClearSelection(),
    [handleClearSelection]
  )

  const handlePieceClick = useCallback(
    (piece: Piece, square: Square) => handleSquareClickCallback(square),
    [handleSquareClickCallback]
  )

  const handleDragBegin = useCallback(
    (piece: Piece, square: Square) => {
      setSelectedSquare(square)
      getPossibleMoves(square)
    },
    [getPossibleMoves]
  )

  const handleSquareRightClick = useCallback((square: Square) => {
    setHighlightedSquares(
      (prev) =>
        prev.includes(square)
          ? prev.filter((s) => s !== square) // Remove square if already highlighted
          : [...prev, square] // Add square if not highlighted
    )
  }, [])

  const customSquareStyles = useMemo(() => {
    return highlightedSquares.reduce((acc, square) => {
      acc[square] = { backgroundColor: 'rgb(255, 5, 5, 0.25)' } // Correctly type the styles
      return acc
    }, {} as Record<string, Record<string, string | number>>) // Match the expected type
  }, [highlightedSquares])

  const resetPuzzleHandler = useCallback(() => {
    chessGame.current = new Chess() // Reset the chess game instance
    resetPuzzle() // Clear the current puzzle state
    setCurrentMoveIndex(0) // Reset the move index
    setMoveProcessed(false) // Reset move processing state
    setGameEnded(false) // Reset the game-ended state
  }, [resetPuzzle, setFenHistory, setCurrentMoveIndex])

  const getNextPuzzleHandler = useCallback(() => {
    chessGame.current = new Chess() // Reset the chess game instance
    setCurrentMoveIndex(0) // Reset the move index
    setMoveProcessed(false) // Reset move processing state
    setGameEnded(false) // Reset the game-ended state
    getNextPuzzle() // Proceed to the next puzzle
  }, [setFenHistory, setCurrentMoveIndex, getNextPuzzle])

  const isComputerTurn = currentMoveIndex % 2 === 0

  useEffect(() => {
    // Ensure computer only moves at the latest position
    if (gameEnded) return // Exit if the game has ended
    if (!isComputerTurn || moveProcessed) return // Exit if not the computer's turn or move already processed

    // Check if we're at the end of the move history
    const isAtCurrentMove = currentMoveIndex === fenHistory.length - 1
    if (!isAtCurrentMove) return // Prevent move execution if not at the latest move

    const move = puzzleMoves[currentMoveIndex]
    if (move) {
      const fromSquare = move.slice(0, 2) as Square
      const toSquare = move.slice(2, 4) as Square

      const delay = setTimeout(() => {
        const moveResult = makeMoveCallback(fromSquare, toSquare)
        if (moveResult) {
          setMoveProcessed(true) // Mark move as processed only after success
        }
      }, 2000) // 2-second delay for move execution

      return () => clearTimeout(delay) // Cleanup timeout on re-render or dependency change
    }
  }, [
    currentMoveIndex,
    fenHistory.length, // Track changes in fenHistory length
    puzzleMoves,
    gameEnded,
    isComputerTurn,
    makeMoveCallback,
    moveProcessed,
  ])

  useEffect(() => {
    // Reset moveProcessed only after the player's turn is processed
    if (currentMoveIndex % 2 !== 0 && moveProcessed) {
      setMoveProcessed(false)
    }
  }, [currentMoveIndex, moveProcessed])

  useEffect(() => {
    if (!chessGame.current.isGameOver() && !gameEnded) {
      setActivePlayer(chessGame.current.turn() === 'w' ? 'white' : 'black')
    }
  }, [position, gameEnded])

  return (
    <div className='flex flex-col justify-center items-center w-full h-full max-w-[65vmin] max-h-[65vmin] rounded-lg shadow-lg relative'>
      {isGameOver && (
        <div className='absolute top-1/2 left-0 transform -translate-y-1/2 w-full bg-purple-300 text-black text-center p-2 font-bold z-10'>
          {'Puzzle Solved!'}
          <div className='mt-4 flex justify-center gap-4'>
            <button
              className='bg-purple-600 text-white px-4 py-2 rounded hover:bg-gray-700'
              onClick={() => {
                resetPuzzleHandler()
              }}
            >
              Repeat Puzzle
            </button>
            <button
              className='bg-purple-600 text-white px-4 py-2 rounded hover:bg-gray-700'
              onClick={() => {
                getNextPuzzleHandler()
              }}
            >
              Next Puzzle
            </button>
          </div>
        </div>
      )}

      <div className='flex justify-between w-full mb-4'>
        {/* Top Player */}
        <PlayerInfo
          playerName={`Opponent`}
          isActive={
            activePlayer === (boardOrientation === 'white' ? 'black' : 'white')
          }
          position='top'
          color={boardOrientation === 'white' ? 'black' : 'white'}
          materialDifference={
            boardOrientation === 'white'
              ? blackMaterialDifference // Show black's material difference at the top
              : whiteMaterialDifference // Show white's material difference at the top
          }
        />
      </div>

      <div className='flex justify-center w-full'>
        <Chessboard
          position={position}
          boardOrientation={boardOrientation}
          onPieceDrop={handlePieceDrop}
          onPieceDragBegin={handleDragBegin}
          onPieceDragEnd={handleDragEnd}
          onSquareClick={
            !isComputerTurn && gameEnded ? undefined : handleSquareClickCallback
          }
          onPieceClick={
            !isComputerTurn && gameEnded ? undefined : handlePieceClick
          }
          onSquareRightClick={handleSquareRightClick}
          arePiecesDraggable={!isComputerTurn && !gameEnded}
          customDropSquareStyle={{
            boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.3)',
          }}
          customLightSquareStyle={{ backgroundColor: '#E0E0E0' }}
          customDarkSquareStyle={{ backgroundColor: '#6A0DAD' }}
          customSquareStyles={customSquareStyles}
          arePremovesAllowed={true}
        />
      </div>

      <div className='flex justify-between w-full mt-4'>
        {/* Bottom Player */}
        <PlayerInfo
          playerName={`Player`}
          isActive={
            activePlayer === (boardOrientation === 'white' ? 'white' : 'black')
          }
          position='bottom'
          color={boardOrientation === 'white' ? 'white' : 'black'}
          materialDifference={
            boardOrientation === 'white'
              ? whiteMaterialDifference // Show white's material difference at the bottom
              : blackMaterialDifference // Show black's material difference at the bottom
          }
        />
      </div>

      {lastMove && isAtCurrentMove && (
        <>
          <div
            style={getLastMoveHighlightStyle(lastMove.from, boardOrientation)}
          />
          <div
            style={getLastMoveHighlightStyle(lastMove.to, boardOrientation)}
          />
        </>
      )}

      {hint && isAtCurrentMove && !isComputerTurn && (
        <div style={getHintHighlightStyle(hint, boardOrientation)} />
      )}

      {isAtCurrentMove &&
        selectedSquare &&
        highlightStyles.map((style, index) => (
          <div key={`${possibleMoves[index].square}-${index}`} style={style} />
        ))}
      {invalidMoveSquares.map((square) => (
        <div
          key={square}
          style={getInvalidMoveHighlightStyle(square, boardOrientation)}
        >
          ❌
        </div>
      ))}
    </div>
  )
}

export default PuzzleGame
