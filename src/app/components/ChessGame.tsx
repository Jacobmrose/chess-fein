import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, Square } from 'chess.js'
import { getPieceName, Piece } from '../utils/pieceUtils'
import {
  getMoveHighlightStyle,
  getLastMoveHighlightStyle,
} from '../utils/highlightStyles'
import { clearSelection } from '../utils/gameUtils'
import { makeMove, handleSquareClick } from '../utils/moveUtils'
import {
  onPromotionCheck,
  onPromotionPieceSelect,
} from '../utils/promotionUtils'
import PlayerInfo from './PlayerInfo'
import {
  handleGameOverDescription,
  declareWinner,
} from '../utils/gameOverUtils'
import { startTimer } from '../utils/timerUtils'
import { pieceValues } from '../utils/pieceUtils'
import { useStockfish } from '../hooks/useStockfish'
import {
  calculateMaterialDifference,
  getMaterialDifferences,
} from '../utils/calculateMaterialDifference'

interface ChessGameProps {
  color: 'white' | 'black'
  boardOrientation: 'white' | 'black'
  onMove: (move: string, fen: string) => void
  onGameOver: () => void
  isGameOver: boolean
  isResigned: boolean
  whitePlayerName: string
  blackPlayerName: string
  timeLimit: number
  difficulty: number
  onResign: () => void
  currentMoveIndex: number
  activePlayer: 'white' | 'black'
  setActivePlayer: (player: 'white' | 'black') => void
  fenHistory: string[]
  setFenHistory: React.Dispatch<React.SetStateAction<string[]>>
  aiEnabled: boolean
  isPlaygroundMode: boolean
}

const ChessGame: React.FC<ChessGameProps> = ({
  color,
  boardOrientation,
  onMove,
  onGameOver,
  isGameOver,
  isResigned,
  whitePlayerName,
  blackPlayerName,
  timeLimit,
  difficulty,
  currentMoveIndex,
  activePlayer,
  setActivePlayer,
  fenHistory,
  setFenHistory,
  aiEnabled,
  isPlaygroundMode,
}) => {
  const chessGame = useRef(new Chess())
  const [position, setPosition] = useState(chessGame.current.fen())
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null)
  const [possibleMoves, setPossibleMoves] = useState<
    {
      square: Square
      isCapture: boolean
    }[]
  >([])
  const [whiteTime, setWhiteTime] = useState(timeLimit)
  const [blackTime, setBlackTime] = useState(timeLimit)
  const [gameEnded, setGameEnded] = useState(false)
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

    // Check for 3-fold repetition

    const extractBoardState = (fen: string) => fen.split(' ')[0]

    // Check for threefold repetition by comparing the board state
    const currentBoardState = extractBoardState(position)
    const repetitionCount = fenHistory.filter(
      (fen) => extractBoardState(fen) === currentBoardState
    ).length

    if (repetitionCount >= 3 && !gameEnded) {
      setGameEnded(true)
      setWinner('Draw by threefold repetition!')
      onGameOver()
    }

    // Check for game over
    if (!gameEnded && chessGame.current.isGameOver()) {
      handleGameOverDescription(chessGame.current, setEndReason)
      setGameEnded(true)
      declareWinner(chessGame.current, setWinner)
      onGameOver()
    }
  }, [position, gameEnded, onGameOver, fenHistory, setEndReason])

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
  }, [fenHistory, currentMoveIndex, setActivePlayer])

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

  const makeMoveCallback = useCallback(
    (fromSquare: Square, toSquare: Square) => {
      return makeMove(
        fromSquare,
        toSquare,
        chessGame.current,
        (move) => {
          setLastMove({ from: fromSquare, to: toSquare })
          onMove(move, chessGame.current.fen())
        },
        isGameOver,
        (newFen) => {
          setPosition(newFen)
          setFenHistory((prevHistory: string[]) => [...prevHistory, newFen])
        }
      )
    },
    [onMove, isGameOver]
  )

  const handlePieceDrop = useCallback(
    (fromSquare: Square, toSquare: Square) => {
      if (!isAtCurrentMove) return false

      return makeMoveCallback(fromSquare, toSquare)
    },
    [makeMoveCallback, isAtCurrentMove]
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

  const handleDragEnd = useCallback(
    () => handleClearSelection(),
    [handleClearSelection]
  )

  const handleSquareClickCallback = useCallback(
    (square: Square) => {
      if (!isAtCurrentMove) return

      // Check if there's a piece at the square and if it's an opponent's piece
      const pieceAtSquare = chessGame.current.get(square)
      if (
        pieceAtSquare &&
        !isPlaygroundMode &&
        pieceColor(pieceAtSquare.color) !== color
      ) {
        return
      }

      handleSquareClick(
        square,
        chessGame,
        selectedSquare,
        setSelectedSquare,
        (newFen) => {
          setPosition(newFen)
          setFenHistory((prevHistory: any) => [...prevHistory, newFen])
        },
        getPossibleMoves,
        (game) => handleGameOverDescription(game, setEndReason),
        (move: string, fen: string, lastMove: { from: string; to: string }) => {
          onMove(move, fen)
          setLastMove(lastMove)
        },
        handleClearSelection
      )
    },
    [
      chessGame,
      selectedSquare,
      getPossibleMoves,
      handleGameOverDescription,
      onMove,
      handleClearSelection,
      setEndReason,
      isAtCurrentMove,
      isPlaygroundMode,
      color,
    ]
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
    // Handle resignation
    if (isResigned) {
      const losingPlayer = color !== 'white' ? 'Black' : 'White'
      setWinner(`${losingPlayer} loses by resignation!`)
      setGameEnded(true)
      onGameOver()
    }

    // Handle timer for active player
    if (!isGameOver && !gameEnded) {
      const stopTimer = startTimer(
        activePlayer,
        whiteTime,
        blackTime,
        setWhiteTime,
        setBlackTime,
        setGameEnded,
        setWinner,
        onGameOver
      )
      return stopTimer
    }
  }, [
    isResigned,
    color,
    isGameOver,
    gameEnded,
    activePlayer,
    whiteTime,
    blackTime,
    onGameOver,
  ])

  useEffect(() => {
    if (!chessGame.current.isGameOver() && !gameEnded) {
      setActivePlayer(chessGame.current.turn() === 'w' ? 'white' : 'black')
    }
  }, [position, gameEnded])

  const { getBestMove } = useStockfish({
    position,
    onMove: (from, to) => makeMoveCallback(from, to),
    difficulty,
    enabled: aiEnabled, // Respect AI toggle
  })

  useEffect(() => {
    if (aiEnabled && activePlayer !== color && !gameEnded && isAtCurrentMove) {
      const timer = setTimeout(getBestMove, 1000)
      return () => clearTimeout(timer)
    }
  }, [aiEnabled, activePlayer, color, gameEnded, getBestMove, isAtCurrentMove])

  return (
    <div className='flex flex-col justify-center items-center w-full h-full max-w-[65vmin] max-h-[65vmin] rounded-lg shadow-lg relative'>
      {winner && (
        <div className='absolute top-1/2 left-0 transform -translate-y-1/2 w-full bg-purple-300 text-black text-center p-2 font-bold z-10'>
          {winner} {endReason}
        </div>
      )}

      <div className='flex justify-between w-full mb-4'>
        <PlayerInfo
          playerName={color === 'white' ? blackPlayerName : whitePlayerName}
          timer={color === 'white' ? blackTime : whiteTime}
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
          arePiecesDraggable={
            !isGameOver && (isPlaygroundMode || activePlayer === color)
          }
          customDropSquareStyle={{
            boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.3)',
          }}
          customLightSquareStyle={{ backgroundColor: '#E0E0E0' }}
          customDarkSquareStyle={{ backgroundColor: '#6A0DAD' }}
          onPromotionCheck={onPromotionCheck}
          onPromotionPieceSelect={handlePromotionSelection}
          arePremovesAllowed={true}
        />
      </div>

      <div className='flex justify-between w-full mt-4'>
        <PlayerInfo
          playerName={color === 'white' ? whitePlayerName : blackPlayerName}
          timer={color === 'white' ? whiteTime : blackTime}
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

      {isAtCurrentMove && lastMove && (
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

export default ChessGame
