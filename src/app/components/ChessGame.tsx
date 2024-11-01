import { useState, useRef, useEffect } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, Square } from 'chess.js'

interface ChessGameProps {
  color: 'white' | 'black'
  onMove: (move: string) => void
  onGameOver: () => void
  isGameOver: boolean
}

const ChessGame: React.FC<ChessGameProps> = ({
  color,
  onMove,
  onGameOver,
  isGameOver,
}) => {
  const chessGame = useRef(new Chess())
  const [position, setPosition] = useState(chessGame.current.fen())
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null)
  const [possibleMoves, setPossibleMoves] = useState<Square[]>([])

  useEffect(() => {
    const game = chessGame.current
    if (game.isGameOver()) {
      onGameOver()
    }
  }, [onGameOver])

  const isValidSquare = (square: string) => /^[a-h][1-8]$/.test(square)

  const handlePieceDrop = (fromSquare: Square, toSquare: Square) => {
    return makeMove(fromSquare, toSquare)
  }

  const handleSquareClick = (square: Square) => {
    const game = chessGame.current

    if (selectedSquare) {
      const moveMade = makeMove(selectedSquare, square)
      if (!moveMade) {
        if (game.get(square)) {
          selectSquare(square)
        } else {
          clearSelection()
        }
      }
    } else {
      if (game.get(square)) {
        selectSquare(square)
      }
    }
  }

  const selectSquare = (square: Square) => {
    setSelectedSquare(square)
    highlightMoves(square)
  }

  const makeMove = (fromSquare: Square, toSquare: Square) => {
    const game = chessGame.current

    if (isGameOver) return false

    if (!isValidSquare(fromSquare) || !isValidSquare(toSquare)) {
      return false
    }

    try {
      const move = game.move({ from: fromSquare, to: toSquare })
      if (move) {
        setPosition(game.fen())
        clearSelection()

        const pieceType = move.piece.toUpperCase()
        let moveDescription = `${getPieceName(pieceType)} to ${toSquare}`

        if (move.captured) {
          const capturedPieceType = move.captured.toUpperCase()
          const capturedPieceName = getPieceName(capturedPieceType)
          moveDescription = `${getPieceName(
            pieceType
          )} takes ${capturedPieceName} on ${toSquare}`
        }

        if (game.isGameOver()) {
          moveDescription += ' (Game Over)'
          onGameOver()
        } else if (game.inCheck()) {
          moveDescription += ' (Check)'
        }

        onMove(moveDescription)
        return true
      }
    } catch (error) {
      console.error(error) // Log the error for debugging
    }

    return false
  }

  const highlightMoves = (square: Square) => {
    const game = chessGame.current
    const moves = game.moves({ square, verbose: true })
    const moveSquares = moves.map((move) => move.to as Square)
    setPossibleMoves(moveSquares)
  }

  const clearSelection = () => {
    setSelectedSquare(null)
    setPossibleMoves([])
  }

  const handleDragEnd = () => {
    clearSelection()
  }

  const getPieceName = (pieceType: string) => {
    switch (pieceType) {
      case 'P':
        return 'Pawn'
      case 'N':
        return 'Knight'
      case 'B':
        return 'Bishop'
      case 'R':
        return 'Rook'
      case 'Q':
        return 'Queen'
      case 'K':
        return 'King'
      default:
        return ''
    }
  }

  // Function to check if a move results in a promotion
  const onPromotionCheck = (
    sourceSquare: Square,
    targetSquare: Square,
    piece: string
  ) => {
    return (
      (piece === 'wP' && sourceSquare[1] === '7' && targetSquare[1] === '8') ||
      (piece === 'bP' && sourceSquare[1] === '2' && targetSquare[1] === '1')
    )
  }

  // Function to handle the promotion piece selection
  const onPromotionPieceSelect = (
    piece: string | undefined,
    promoteFromSquare?: Square,
    promoteToSquare?: Square
  ): boolean => {
    const game = chessGame.current

    // Ensure valid parameters
    if (promoteFromSquare && promoteToSquare && piece) {
      // Get the piece type as a lowercase string for chess.js
      const promotionPiece = piece.charAt(1).toLowerCase() // Get the piece type ('Q', 'R', 'N', 'B' and convert to lower case)

      const promotionMove = game.move({
        from: promoteFromSquare,
        to: promoteToSquare,
        promotion: promotionPiece,
      })

      if (promotionMove) {
        setPosition(game.fen())
        const pieceName = getPieceName(promotionPiece.toUpperCase())
        const moveDescription = `${pieceName} promoted on ${promoteToSquare}`
        onMove(moveDescription)
        return true
      }
    }

    return false
  }

  return (
    <div className='flex justify-center items-center w-full h-full max-w-[75vmin] max-h-[75vmin] rounded-lg shadow-lg relative'>
      <Chessboard
        position={position}
        onPieceDrop={handlePieceDrop}
        onSquareClick={(_, square) => handleSquareClick(square as Square)}
        onPieceDragBegin={(_, square) => selectSquare(square as Square)}
        onPieceDragEnd={handleDragEnd}
        boardOrientation={color}
        customBoardStyle={{
          borderRadius: '8px',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.6)',
        }}
        customDarkSquareStyle={{
          backgroundColor: '#6A0DAD',
        }}
        customLightSquareStyle={{
          backgroundColor: '#E0E0E0',
        }}
        onPromotionCheck={onPromotionCheck}
        onPromotionPieceSelect={onPromotionPieceSelect}
      />

      {/* Render highlight squares with cutout effect */}
      {possibleMoves.map((square) => {
        const column = square[0] // e.g., 'a', 'b', ...
        const row = square[1] // e.g., '1', '2', ...

        // Calculate positioning
        const squareSize = 12.5 // 12.5% for each square
        const top = `${100 - parseInt(row) * squareSize}%`
        const left = `${
          (column.charCodeAt(0) - 'a'.charCodeAt(0)) * squareSize
        }%`

        return (
          <div
            key={square}
            style={{
              position: 'absolute',
              top: top,
              left: left,
              width: `${squareSize}%`, // Match square size
              height: `${squareSize}%`, // Match square size
              backgroundColor: 'rgb(95, 85, 100)', // White background for the overlay
              borderRadius: '8px',
              clipPath: 'circle(20% at 50% 50%)', // Circular cutout in the middle
              pointerEvents: 'none', // Prevent interaction
              zIndex: 10, // Ensure it overlays the square
            }}
          />
        )
      })}
    </div>
  )
}

export default ChessGame
