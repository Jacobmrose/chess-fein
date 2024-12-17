import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, Square } from 'chess.js'
import { getPieceName, Piece } from '../utils/pieceUtils'
import {
  getMoveHighlightStyle,
  getLastMoveHighlightStyle,
} from '../utils/highlightStyles'
import { clearSelection } from '../utils/gameUtils'
import {
  onPromotionCheck,
  onPromotionPieceSelect,
} from '../utils/promotionUtils'
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
  onMove: (move: string, fen: string) => void
  onGameOver: () => void
  isGameOver: boolean
  currentMoveIndex: number
  activePlayer: 'white' | 'black'
  setActivePlayer: (player: 'white' | 'black') => void
  fenHistory: string[]
  setFenHistory: React.Dispatch<React.SetStateAction<string[]>>
  initialFen?: string
  puzzleMoves: string[]
  setCurrentMoveIndex: React.Dispatch<React.SetStateAction<number>>
}

const PuzzleGame: React.FC<PuzzleGameProps> = ({
  color,
  boardOrientation,
  onMove,
  onGameOver,
  isGameOver,
  currentMoveIndex,
  activePlayer,
  setActivePlayer,
  fenHistory,
  setFenHistory,
  initialFen,
  puzzleMoves,
  setCurrentMoveIndex,
}) => {
  const chessGame = useRef(new Chess())
  const [position, setPosition] = useState<string>(
    initialFen || chessGame.current.fen()
  )
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null)
  const [possibleMoves, setPossibleMoves] = useState<
    {
      square: Square
      isCapture: boolean
    }[]
  >([])
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

  const prevFenHistory = useRef<string[]>([])
  const pieceColor = (piece: string) =>
    piece.startsWith('w') ? 'white' : 'black'

  useEffect(() => {
    if (initialFen) {
      chessGame.current.load(initialFen) // Load the initial FEN into the engine
      setPosition(initialFen) // Set the initial position on the board
      setFenHistory([initialFen]) // Initialize fenHistory with the initial FEN
    }
  }, [initialFen, setFenHistory])

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

  const handlePromotionSelection = useCallback(
    (
      piece: string | undefined,
      promoteFromSquare?: Square,
      promoteToSquare?: Square
    ) => {
      const game = chessGame.current
      return onPromotionPieceSelect(
        piece,
        promoteFromSquare,
        promoteToSquare,
        game,
        (newFen) => {
          setPosition(newFen)
          setFenHistory((prevHistory: string[]) => [...prevHistory, newFen])
        },
        getPieceName,
        (game) => handleGameOverDescription(game, setEndReason),
        (move) => onMove(move, chessGame.current.fen())
      )
    },
    [handleGameOverDescription, onMove, setEndReason]
  )
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

      // Step 1: Retrieve the expected move from the puzzle
      const expectedMove = puzzleMoves[currentMoveIndex]
      if (!expectedMove) {
        console.error('No more moves in the puzzle.')
        return false
      }

      const expectedFrom = expectedMove.slice(0, 2)
      const expectedTo = expectedMove.slice(2, 4)

      // Step 2: Validate the move matches the puzzle's expected move
      if (fromSquare !== expectedFrom || toSquare !== expectedTo) {
        console.error(
          `Invalid move. Expected: ${expectedFrom} to ${expectedTo}, got: ${fromSquare} to ${toSquare}`
        )
        return false
      }

      // Step 3: Check if the move is legal
      const legalMoves = game.moves({ square: fromSquare, verbose: true })
      const isMoveLegal = legalMoves.some((m) => m.to === toSquare)

      if (!isMoveLegal) {
        console.error(`Illegal move from ${fromSquare} to ${toSquare}`)
        return false
      }

      // Step 4: Make the move
      const move = game.move({ from: fromSquare, to: toSquare })
      if (move) {
        const currentFen = game.fen()

        // Update state
        setPosition(currentFen)
        setFenHistory((prevHistory) => [...prevHistory, currentFen])
        setLastMove({ from: move.from, to: move.to })
        setCurrentMoveIndex((prevIndex) => prevIndex + 1)
        setActivePlayer(game.turn() === 'w' ? 'white' : 'black')

        return true
      } else {
        return false
      }
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
        if (pieceAtSquare && pieceAtSquare.color === game.turn()) {
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
        if (pieceAtSquare.color === game.turn()) {
          setSelectedSquare(square)
          getPossibleMoves(square)
        } else {
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

  useEffect(() => {
    if (gameEnded || chessGame.current.isGameOver()) return // Stop if the game is over

    const isComputerTurn = currentMoveIndex % 2 === 0

    if (isComputerTurn && !moveProcessed) {
      const move = puzzleMoves[currentMoveIndex]
      if (move) {
        const fromSquare = move.slice(0, 2) as Square
        const toSquare = move.slice(2, 4) as Square

        console.log('Computer attempting move:', { fromSquare, toSquare })

        const delay = setTimeout(() => {
          const moveResult = makeMoveCallback(fromSquare, toSquare)
          if (moveResult) {
            console.log('Computer move accepted:', { fromSquare, toSquare })
            setMoveProcessed(true) // Mark as processed
          } else {
            console.warn('Move rejected by Chess.js:', { fromSquare, toSquare })
          }
        }, 2000) // 2-second delay for move execution

        return () => clearTimeout(delay)
      }
    }
  }, [
    currentMoveIndex,
    puzzleMoves,
    gameEnded,
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
    <div className='flex flex-col justify-center items-center w-full h-full max-w-[75vmin] max-h-[75vmin] rounded-lg shadow-lg relative'>
      {winner && (
        <div className='absolute top-1/2 left-0 transform -translate-y-1/2 w-full bg-purple-300 text-black text-center p-2 font-bold z-10'>
          {winner} {endReason}
        </div>
      )}

      <div className='flex justify-between w-full mb-4'>
        <PlayerInfo
          playerName={`Puzzle Mode`}
          isActive={activePlayer === (color === 'white' ? 'black' : 'white')}
          position='top'
          color={color === 'white' ? 'black' : 'white'}
          materialDifference={
            color === 'white'
              ? blackMaterialDifference
              : whiteMaterialDifference
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
          onSquareClick={isGameOver ? undefined : handleSquareClickCallback}
          onPieceClick={isGameOver ? undefined : handlePieceClick}
          arePiecesDraggable={!isGameOver}
          customDropSquareStyle={{
            boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.3)',
          }}
          customLightSquareStyle={{ backgroundColor: '#E0E0E0' }}
          customDarkSquareStyle={{ backgroundColor: '#6A0DAD' }}
          onPromotionCheck={onPromotionCheck}
          onPromotionPieceSelect={handlePromotionSelection}
        />
      </div>

      <div className='flex justify-between w-full mt-4'>
        <PlayerInfo
          playerName={`Puzzle Mode`}
          isActive={activePlayer === color}
          position='bottom'
          color={color}
          materialDifference={
            color === 'white'
              ? whiteMaterialDifference
              : blackMaterialDifference
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

      {isAtCurrentMove &&
        selectedSquare &&
        highlightStyles.map((style, index) => (
          <div key={`${possibleMoves[index].square}-${index}`} style={style} />
        ))}
    </div>
  )
}

export default PuzzleGame
