import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, Square } from 'chess.js'
import { getPieceName, Piece, PieceType } from '../utils/pieceUtils'
import { getMoveHighlightStyle } from '../utils/highlightStyles'
import { getGameOverDescription, clearSelection } from '../utils/gameUtils'
import { makeMove, handleSquareClick } from '../utils/moveUtils'
import {
  onPromotionCheck,
  onPromotionPieceSelect,
} from '../utils/promotionUtils'
import PlayerInfo from './PlayerInfo'

interface ChessGameProps {
  color: 'white' | 'black'
  onMove: (move: string) => void
  onGameOver: () => void
  isGameOver: boolean
  whitePlayerName: string
  blackPlayerName: string
  timeLimit: number // Time limit in seconds
  difficulty: number // AI difficulty level
}

const ChessGame: React.FC<ChessGameProps> = ({
  color,
  onMove,
  onGameOver,
  isGameOver,
  whitePlayerName,
  blackPlayerName,
  timeLimit,
  difficulty,
}) => {
  const chessGame = useRef(new Chess())
  const [position, setPosition] = useState(chessGame.current.fen())
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null)
  const [possibleMoves, setPossibleMoves] = useState<
    { square: Square; isCapture: boolean }[]
  >([])
  const [whiteTime, setWhiteTime] = useState(timeLimit)
  const [blackTime, setBlackTime] = useState(timeLimit)
  const [activePlayer, setActivePlayer] = useState<'white' | 'black'>('white') // Always start with white
  const [gameEnded, setGameEnded] = useState(false)
  const [winner, setWinner] = useState<string | null>(null) // Winner state for the banner

  const highlightStyles = useMemo(
    () =>
      possibleMoves.map(({ square, isCapture }) =>
        getMoveHighlightStyle(square, isCapture, color)
      ),
    [possibleMoves, color]
  )

  const handleClearSelection = useCallback(() => {
    clearSelection(setSelectedSquare, setPossibleMoves)
  }, [])

  const handleGameOverDescription = useCallback((game: Chess) => {
    return getGameOverDescription(game)
  }, [])

  useEffect(() => {
    if (chessGame.current.isGameOver() || gameEnded) {
      onGameOver()
    }
  }, [onGameOver])

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
        setPosition,
        getPieceName,
        handleGameOverDescription,
        onMove
      )
    },
    [handleGameOverDescription, onMove]
  )

  const makeMoveCallback = useCallback(
    (fromSquare: Square, toSquare: Square) => {
      return makeMove(
        fromSquare,
        toSquare,
        chessGame.current,
        onMove,
        isGameOver,
        setPosition
      )
    },
    [onMove, isGameOver]
  )

  const handlePieceDrop = useCallback(
    (fromSquare: Square, toSquare: Square) => {
      return makeMoveCallback(fromSquare, toSquare)
    },
    [makeMoveCallback]
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

  const handleDragEnd = useCallback(() => {
    handleClearSelection()
  }, [handleClearSelection])

  const handleSquareClickCallback = useCallback(
    (square: Square) => {
      handleSquareClick(
        square,
        chessGame,
        selectedSquare,
        setSelectedSquare,
        setPosition,
        getPossibleMoves,
        handleGameOverDescription,
        onMove,
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
    ]
  )

  const handlePieceClick = useCallback(
    (piece: Piece, square: Square) => {
      handleSquareClickCallback(square)
    },
    [handleSquareClickCallback]
  )

  const handleDragBegin = useCallback(
    (piece: Piece, square: Square) => {
      setSelectedSquare(square)
      getPossibleMoves(square)
    },
    [getPossibleMoves]
  )

  // Timer effect to handle countdown and declare a winner when time runs out
  useEffect(() => {
    if (isGameOver || gameEnded) return

    const handleTimer = () => {
      if (activePlayer === 'white') {
        setWhiteTime((prevTime) => {
          if (prevTime <= 1) {
            setGameEnded(true)
            setWinner('Black wins by time!')
            return 0
          }
          return prevTime - 1
        })
      } else {
        setBlackTime((prevTime) => {
          if (prevTime <= 1) {
            setGameEnded(true)
            setWinner('White wins by time!')
            return 0
          }
          return prevTime - 1
        })
      }
    }

    const interval = setInterval(handleTimer, 1000)

    // Clear the interval when active player changes or game ends
    return () => clearInterval(interval)
  }, [activePlayer, isGameOver, gameEnded])

  // Switch active player after each move
  useEffect(() => {
    if (!chessGame.current.isGameOver() && !gameEnded) {
      setActivePlayer(chessGame.current.turn() === 'w' ? 'white' : 'black')
    }
  }, [position, gameEnded])

  return (
    <div className='flex flex-col justify-center items-center w-full h-full max-w-[75vmin] max-h-[75vmin] rounded-lg shadow-lg relative'>
      {/* Banner for winner */}
      {winner && (
        <div className='absolute top-1/2 left-0 transform -translate-y-1/2 w-full bg-purple-300 text-black text-center p-2 font-bold z-10'>
          {winner}
        </div>
      )}

      {/* Player Info Component - Opponent */}
      <div className='flex justify-between w-full mb-4'>
        <PlayerInfo
          playerName={color === 'white' ? blackPlayerName : whitePlayerName}
          timer={color === 'white' ? blackTime : whiteTime}
          isActive={activePlayer === (color === 'white' ? 'black' : 'white')}
          position='top'
          color={color === 'white' ? 'black' : 'white'}
        />
      </div>

      {/* Chessboard */}
      <div className='flex justify-center w-full'>
        <Chessboard
          position={position}
          boardOrientation={color}
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

      {/* Player Info Component - Player */}
      <div className='flex justify-between w-full mt-4'>
        <PlayerInfo
          playerName={color === 'white' ? whitePlayerName : blackPlayerName}
          timer={color === 'white' ? whiteTime : blackTime}
          isActive={activePlayer === color}
          position='bottom'
          color={color}
        />
      </div>

      {selectedSquare &&
        highlightStyles.map((style, index) => (
          <div key={`${possibleMoves[index].square}-${index}`} style={style} />
        ))}
    </div>
  )
}

export default ChessGame
