import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, Square } from 'chess.js'

interface ChessGameProps {
  color: 'white' | 'black'
  onMove: (move: string) => void
  onGameOver: () => void
  isGameOver: boolean
}

type PieceType =
  | 'p'
  | 'n'
  | 'b'
  | 'r'
  | 'q'
  | 'k'
  | 'P'
  | 'N'
  | 'B'
  | 'R'
  | 'Q'
  | 'K'
type Piece = `${'w' | 'b'}${PieceType}`

const pieceNames: { [key in PieceType]: string } = {
  p: 'Pawn',
  n: 'Knight',
  b: 'Bishop',
  r: 'Rook',
  q: 'Queen',
  k: 'King',
  P: 'Pawn',
  N: 'Knight',
  B: 'Bishop',
  R: 'Rook',
  Q: 'Queen',
  K: 'King',
}

const squareSize = 12.5 // Each square occupies 12.5% of the board size

const getPieceName = (pieceType: PieceType) => pieceNames[pieceType]

const ChessGame: React.FC<ChessGameProps> = ({
  color,
  onMove,
  onGameOver,
  isGameOver,
}) => {
  const chessGame = useRef(new Chess())
  const [position, setPosition] = useState(chessGame.current.fen())
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null)
  const [possibleMoves, setPossibleMoves] = useState<
    { square: Square; isCapture: boolean }[]
  >([])

  // Helper function to determine game-over condition and provide appropriate description
  const getGameOverDescription = useCallback((game: Chess): string => {
    if (game.isCheckmate()) return ' (Checkmate)'
    if (game.isStalemate()) return ' (Stalemate)'
    if (game.isThreefoldRepetition()) return ' (Threefold Repetition)'
    if (game.isInsufficientMaterial()) return ' (Insufficient Material)'
    if (game.isDraw()) return ' (Draw)'
    return ''
  }, [])

  useEffect(() => {
    if (chessGame.current.isGameOver()) {
      onGameOver()
    }
  }, [onGameOver])

  const isValidSquare = (square: string) => /^[a-h][1-8]$/.test(square)

  const clearSelection = useCallback(() => {
    setSelectedSquare(null)
    setPossibleMoves([])
  }, [])

  const makeMove = useCallback(
    (fromSquare: Square, toSquare: Square) => {
      const game = chessGame.current
      if (isGameOver) return false
      if (!isValidSquare(fromSquare) || !isValidSquare(toSquare)) return false

      try {
        const move = game.move({ from: fromSquare, to: toSquare })
        if (move) {
          setPosition(game.fen())
          clearSelection()

          const pieceType = move.piece.toUpperCase() as PieceType
          let moveDescription = `${getPieceName(pieceType)} to ${toSquare}`
          if (move.captured) {
            const capturedPieceName = getPieceName(
              move.captured.toUpperCase() as PieceType
            )
            moveDescription = `${getPieceName(
              pieceType
            )} takes ${capturedPieceName} on ${toSquare}`
          }

          moveDescription += getGameOverDescription(game)
          if (!game.isGameOver() && game.inCheck()) {
            moveDescription += ' (Check)'
          }

          onMove(moveDescription)
          return true
        }
      } catch {
        // Ignore invalid moves without logging errors
      }
      return false
    },
    [clearSelection, getGameOverDescription, isGameOver, onMove]
  )

  const handlePieceDrop = useCallback(
    (fromSquare: Square, toSquare: Square) => {
      return makeMove(fromSquare, toSquare)
    },
    [makeMove]
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
    clearSelection()
  }, [clearSelection])

  const handleSquareClick = useCallback(
    (square: Square) => {
      const piece = chessGame.current.get(square)
      if (selectedSquare && piece && piece.color === chessGame.current.turn()) {
        setSelectedSquare(square)
        getPossibleMoves(square)
      } else if (selectedSquare) {
        makeMove(selectedSquare, square)
      } else if (piece) {
        setSelectedSquare(square)
        getPossibleMoves(square)
      } else {
        clearSelection()
      }
    },
    [makeMove, selectedSquare, getPossibleMoves, clearSelection]
  )

  const handlePieceClick = useCallback(
    (piece: Piece, square: Square) => {
      handleSquareClick(square)
    },
    [handleSquareClick]
  )

  const onPromotionCheck = useCallback(
    (sourceSquare: Square, targetSquare: Square, piece: string) => {
      return (
        (piece === 'wP' &&
          sourceSquare[1] === '7' &&
          targetSquare[1] === '8') ||
        (piece === 'bP' && sourceSquare[1] === '2' && targetSquare[1] === '1')
      )
    },
    []
  )

  const onPromotionPieceSelect = useCallback(
    (
      piece: string | undefined,
      promoteFromSquare?: Square,
      promoteToSquare?: Square
    ): boolean => {
      const game = chessGame.current
      if (promoteFromSquare && promoteToSquare && piece) {
        const promotionPiece = piece.charAt(1).toLowerCase()
        const promotionMove = game.move({
          from: promoteFromSquare,
          to: promoteToSquare,
          promotion: promotionPiece,
        })

        if (promotionMove) {
          setPosition(game.fen())
          const pieceName = getPieceName(
            promotionPiece.toUpperCase() as PieceType
          )
          let moveDescription = `${pieceName} promoted on ${promoteToSquare}`
          moveDescription += getGameOverDescription(game)
          if (!game.isGameOver() && game.inCheck()) {
            moveDescription += ' (Check)'
          }

          onMove(moveDescription)
          return true
        }
      }
      return false
    },
    [getGameOverDescription, onMove]
  )

  const getMoveHighlightStyle = useMemo(
    () =>
      (square: string, isCapture: boolean): React.CSSProperties => {
        const column = square[0]
        const row = square[1]

        const top =
          color === 'white'
            ? `${100 - parseInt(row) * squareSize}%`
            : `${(parseInt(row) - 1) * squareSize}%`
        const left =
          color === 'white'
            ? `${(column.charCodeAt(0) - 'a'.charCodeAt(0)) * squareSize}%`
            : `${
                (7 - (column.charCodeAt(0) - 'a'.charCodeAt(0))) * squareSize
              }%`

        return {
          position: 'absolute',
          top,
          left,
          width: `${squareSize}%`,
          height: `${squareSize}%`,
          background: isCapture
            ? 'radial-gradient(transparent 0%, transparent 80%, rgba(0, 0, 0, 0.7) 80%)'
            : 'rgba(0, 0, 0, 0.7)',
          clipPath: isCapture ? 'none' : 'circle(13% at 50% 50%)',
          pointerEvents: 'none',
          zIndex: 10,
        }
      },
    [color]
  )

  const handleDragBegin = useCallback(
    (piece: Piece, square: Square) => {
      setSelectedSquare(square)
      getPossibleMoves(square)
    },
    [getPossibleMoves]
  )

  return (
    <div className='flex justify-center items-center w-full h-full max-w-[75vmin] max-h-[75vmin] rounded-lg shadow-lg relative'>
      <Chessboard
        position={position}
        boardOrientation={color}
        onPieceDrop={handlePieceDrop}
        onPieceDragBegin={handleDragBegin}
        onPieceDragEnd={handleDragEnd}
        onSquareClick={handleSquareClick}
        onPieceClick={handlePieceClick}
        arePiecesDraggable={!isGameOver}
        customDropSquareStyle={{
          boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.3)',
        }}
        customLightSquareStyle={{ backgroundColor: '#E0E0E0' }}
        customDarkSquareStyle={{ backgroundColor: '#6A0DAD' }}
        onPromotionCheck={onPromotionCheck}
        onPromotionPieceSelect={onPromotionPieceSelect}
      />

      {selectedSquare &&
        possibleMoves.map(({ square, isCapture }) => (
          <div key={square} style={getMoveHighlightStyle(square, isCapture)} />
        ))}
    </div>
  )
}

export default ChessGame
