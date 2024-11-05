import { useState, useRef, useEffect, useCallback } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, Square } from 'chess.js'

interface ChessGameProps {
  color: 'white' | 'black'
  onMove: (move: string) => void
  onGameOver: () => void
  isGameOver: boolean
}

type PieceType = 'P' | 'N' | 'B' | 'R' | 'Q' | 'K'

const pieceNames: { [key in PieceType]: string } = {
  P: 'Pawn',
  N: 'Knight',
  B: 'Bishop',
  R: 'Rook',
  Q: 'Queen',
  K: 'King',
}

const squareSize = 12.5 // Each square occupies 12.5% of the board size

const ChessGame: React.FC<ChessGameProps> = ({
  color,
  onMove,
  onGameOver,
  isGameOver,
}) => {
  const chessGame = useRef(new Chess()) // Initialize the chess game instance
  const [position, setPosition] = useState(chessGame.current.fen()) // Current position as FEN string
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null)
  const [possibleMoves, setPossibleMoves] = useState<
    { square: Square; isCapture: boolean }[]
  >([])

  // Helper function to determine game-over condition and provide appropriate description
  const getGameOverDescription = (game: Chess): string => {
    if (game.isCheckmate()) {
      onGameOver()
      return ' (Checkmate)'
    } else if (game.isStalemate()) {
      onGameOver()
      return ' (Stalemate)'
    } else if (game.isThreefoldRepetition()) {
      onGameOver()
      return ' (Threefold Repetition)'
    } else if (game.isInsufficientMaterial()) {
      onGameOver()
      return ' (Insufficient Material)'
    } else if (game.isDraw()) {
      onGameOver()
      return ' (Draw)'
    }
    return ''
  }

  useEffect(() => {
    if (chessGame.current.isGameOver()) {
      onGameOver() // Trigger game over if chess.js detects end of game
    }
  }, [onGameOver])

  // Checks if the given square string is valid, e.g., "a1", "e5"
  const isValidSquare = (square: string) => /^[a-h][1-8]$/.test(square)

  const clearSelection = useCallback(() => {
    setSelectedSquare(null) // Clear any selected square
    setPossibleMoves([]) // Reset possible moves
  }, [])

  const getPieceName = (pieceType: PieceType) => pieceNames[pieceType]

  // Main function to execute a move if it is valid
  const makeMove = useCallback(
    (fromSquare: Square, toSquare: Square) => {
      const game = chessGame.current
      if (isGameOver) return false // Block moves if the game is already over
      if (!isValidSquare(fromSquare) || !isValidSquare(toSquare)) return false

      try {
        const move = game.move({ from: fromSquare, to: toSquare }) // Attempt the move
        if (move) {
          setPosition(game.fen()) // Update board position to reflect the move
          clearSelection() // Clear selected square and possible moves

          // Get the name of the piece and build a move description
          const pieceType = move.piece.toUpperCase() as PieceType
          let moveDescription = `${getPieceName(pieceType)} to ${toSquare}`
          if (move.captured) {
            // If capture, update description to show which piece was captured
            const capturedPieceName = getPieceName(
              move.captured.toUpperCase() as PieceType
            )
            moveDescription = `${getPieceName(
              pieceType
            )} takes ${capturedPieceName} on ${toSquare}`
          }

          // Use helper function to add game-over description, if applicable
          moveDescription += getGameOverDescription(game)
          if (!game.isGameOver() && game.inCheck()) {
            moveDescription += ' (Check)' // Indicate check if applicable
          }

          onMove(moveDescription) // Notify parent component of the move
          return true
        }
      } catch {
        // Ignore invalid moves without logging errors
      }
      return false
    },
    [clearSelection, isGameOver, onMove, onGameOver]
  )

  const handlePieceDrop = useCallback(
    (fromSquare: Square, toSquare: Square) => {
      return makeMove(fromSquare, toSquare) // Make move on drop
    },
    [makeMove]
  )

  // Get possible moves for the selected piece and set them in state
  const getPossibleMoves = (square: Square) => {
    const game = chessGame.current
    const moves = game.moves({ square, verbose: true }) // Fetch possible moves for the selected square
    const moveSquares = moves.map((move) => ({
      square: move.to as Square, // Destination square
      isCapture: !!move.captured, // Whether the move is a capture
    }))
    setPossibleMoves(moveSquares) // Store possible moves in state
  }

  const handleDragEnd = useCallback(() => {
    clearSelection() // Clear selection when dragging ends
  }, [clearSelection])

  // Check if a pawn has reached the last rank and requires promotion
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

  // Handle the actual promotion process once the promotion piece is selected
  const onPromotionPieceSelect = (
    piece: string | undefined,
    promoteFromSquare?: Square,
    promoteToSquare?: Square
  ): boolean => {
    const game = chessGame.current
    if (promoteFromSquare && promoteToSquare && piece) {
      const promotionPiece = piece.charAt(1).toLowerCase() // Get piece type in lowercase (e.g., 'q' for queen)
      const promotionMove = game.move({
        from: promoteFromSquare,
        to: promoteToSquare,
        promotion: promotionPiece,
      })

      if (promotionMove) {
        setPosition(game.fen()) // Update board position for promotion
        const pieceName = getPieceName(
          promotionPiece.toUpperCase() as PieceType
        )
        let moveDescription = `${pieceName} promoted on ${promoteToSquare}`

        // Append game-over description if applicable
        moveDescription += getGameOverDescription(game)
        if (!game.isGameOver() && game.inCheck()) {
          moveDescription += ' (Check)'
        }

        onMove(moveDescription)
        return true
      }
    }
    return false
  }

  // Styling for the move highlights based on board orientation and capture status
  const getMoveHighlightStyle = (
    square: string,
    isCapture: boolean
  ): React.CSSProperties => {
    const column = square[0] // Get column (letter)
    const row = square[1] // Get row (number)

    // Calculate position based on color; for white, row 8 is at the top, and for black, row 1 is at the top
    const top =
      color === 'white'
        ? `${100 - parseInt(row) * squareSize}%`
        : `${(parseInt(row) - 1) * squareSize}%`
    const left =
      color === 'white'
        ? `${(column.charCodeAt(0) - 'a'.charCodeAt(0)) * squareSize}%`
        : `${(7 - (column.charCodeAt(0) - 'a'.charCodeAt(0))) * squareSize}%`

    return {
      position: 'absolute',
      top,
      left,
      width: `${squareSize}%`,
      height: `${squareSize}%`,
      background: isCapture
        ? 'radial-gradient(transparent 0%, transparent 80%, rgba(0, 0, 0, 0.7) 80%)'
        : 'rgba(0, 0, 0, 0.7)',
      clipPath: isCapture ? 'none' : 'circle(13% at 50% 50%)', // Capture highlight uses full square; non-capture uses a circle
      pointerEvents: 'none',
      zIndex: 10,
    }
  }

  // Begin dragging a piece; set the selected square and calculate possible moves
  const handleDragBegin = useCallback((piece: string, square: Square) => {
    setSelectedSquare(square)
    getPossibleMoves(square)
  }, [])

  return (
    <div className='flex justify-center items-center w-full h-full max-w-[75vmin] max-h-[75vmin] rounded-lg shadow-lg relative'>
      <Chessboard
        position={position}
        onPieceDrop={handlePieceDrop}
        onPieceDragBegin={handleDragBegin}
        onPieceDragEnd={handleDragEnd}
        areArrowsAllowed={false}
        arePiecesDraggable={!isGameOver}
        customDropSquareStyle={{
          boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.3)',
        }}
        customLightSquareStyle={{ backgroundColor: '#E0E0E0' }}
        customDarkSquareStyle={{ backgroundColor: '#6A0DAD' }}
      />

      {/* Highlight possible moves */}
      {selectedSquare &&
        possibleMoves.map(({ square, isCapture }) => (
          <div key={square} style={getMoveHighlightStyle(square, isCapture)} />
        ))}
    </div>
  )
}

export default ChessGame
