import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, Square } from 'chess.js'
import { getPieceName, Piece } from '../utils/pieceUtils'
import { getMoveHighlightStyle } from '../utils/highlightStyles'
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

interface ChessGameProps {
  color: 'white' | 'black'
  boardOrientation: 'white' | 'black' // Add this prop
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
  activePlayer: 'white' | 'black' // New prop
  setActivePlayer: (player: 'white' | 'black') => void // New function prop
  fenHistory: string[] // Accept fenHistory as a prop
  setFenHistory: React.Dispatch<React.SetStateAction<string[]>> // Make sure this is correct
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

  useEffect(() => {
    const newMaterialDifference = calculateMaterialDifference()
    setMaterialDifference(newMaterialDifference)
  }, [position])

  useEffect(() => {
    if (!chessGame.current.isGameOver() && !gameEnded) {
      setActivePlayer(chessGame.current.turn() === 'w' ? 'white' : 'black')
    }
  }, [position, gameEnded, currentMoveIndex])

  useEffect(() => {
    chessGame.current.load(position)
    setActivePlayer(chessGame.current.turn() === 'w' ? 'white' : 'black')
  }, [position])

  const isAtCurrentMove = useMemo(
    () => position === fenHistory[fenHistory.length - 1],
    [position, fenHistory]
  )

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('fenHistory') || '[]')
    if (savedHistory.length) {
      setFenHistory(savedHistory)
      setPosition(savedHistory[savedHistory.length - 1])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('fenHistory', JSON.stringify(fenHistory))
  }, [fenHistory])

  useEffect(() => {
    if (currentMoveIndex >= 0 && currentMoveIndex < fenHistory.length) {
      setPosition(fenHistory[currentMoveIndex])
      chessGame.current.load(fenHistory[currentMoveIndex])
      setActivePlayer(chessGame.current.turn() === 'w' ? 'white' : 'black')
    }
  }, [currentMoveIndex, fenHistory])

  const calculateMaterialDifference = () => {
    const board = chessGame.current.board()
    let whiteMaterial = 0
    let blackMaterial = 0

    board.forEach((row) => {
      row.forEach((piece) => {
        if (piece) {
          const value = pieceValues[piece.type]
          if (piece.color === 'w') {
            whiteMaterial += value
          } else {
            blackMaterial += value
          }
        }
      })
    })

    return whiteMaterial - blackMaterial
  }

  const whiteMaterialDifference = calculateMaterialDifference() // Positive for white advantage.
  const blackMaterialDifference = -whiteMaterialDifference // Opposite for black.

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

  useEffect(() => {
    if (gameEnded) return

    if (chessGame.current.isGameOver()) {
      handleGameOverDescription(chessGame.current, setEndReason)
      setGameEnded(true)
      declareWinner(chessGame.current, setWinner)
      onGameOver()
    }
  }, [position, onGameOver, gameEnded, setEndReason])

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
        (move) => onMove(move, chessGame.current.fen()),
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

      return makeMoveCallback(fromSquare, toSquare) || false
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

      handleSquareClick(
        square,
        chessGame,
        selectedSquare,
        setSelectedSquare,
        (newFen) => {
          setPosition(newFen)
          setFenHistory((prevHistory: any) => {
            return [...prevHistory, newFen]
          })
        },
        getPossibleMoves,
        (game) => handleGameOverDescription(game, setEndReason),
        (move) => onMove(move, chessGame.current.fen()),
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
    if (isResigned) {
      const losingPlayer = color !== 'white' ? 'Black' : 'White'
      setWinner(`${losingPlayer} loses by resignation!`)
      setGameEnded(true)
      onGameOver()
    }
  }, [isResigned, color, onGameOver])

  useEffect(() => {
    if (isGameOver || gameEnded) return

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
  }, [activePlayer, isGameOver, gameEnded, whiteTime, blackTime])

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

      {isAtCurrentMove &&
        selectedSquare &&
        highlightStyles.map((style, index) => (
          <div key={`${possibleMoves[index].square}-${index}`} style={style} />
        ))}
    </div>
  )
}

export default ChessGame
