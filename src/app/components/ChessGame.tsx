import { useState, useRef, useEffect } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'

interface ChessGameProps {
  color: 'white' | 'black'
  onMove: (move: string) => void
  onGameOver: () => void // Add a prop to notify when the game is over
  isGameOver: boolean // New prop to indicate if the game is over
}

const ChessGame: React.FC<ChessGameProps> = ({
  color,
  onMove,
  onGameOver,
  isGameOver,
}) => {
  const chessGame = useRef(new Chess())
  const [position, setPosition] = useState(chessGame.current.fen())

  useEffect(() => {
    const game = chessGame.current

    // Check if the game is over initially when the component mounts
    if (game.isGameOver()) {
      onGameOver()
    }
  }, [onGameOver])

  const handlePieceDrop = (fromSquare: string, toSquare: string) => {
    const game = chessGame.current

    // If the game is over, do not allow any moves
    if (isGameOver) {
      return false // Prevent any further actions
    }

    const move = game.move({ from: fromSquare, to: toSquare })

    if (move) {
      setPosition(game.fen())

      // Get the piece type (like pawn, queen, etc.) and format the move description
      const pieceType = move.piece.toUpperCase() // Convert to uppercase for display
      const pieceName = getPieceName(pieceType)

      // Initialize the move description
      let moveDescription = `${pieceName} to ${toSquare}`

      // Check if a piece was captured
      if (move.captured) {
        const capturedPieceType = move.captured.toUpperCase()
        const capturedPieceName = getPieceName(capturedPieceType)

        // Update the description for a capture
        moveDescription = `${pieceName} takes ${capturedPieceName} on ${toSquare}`
      }

      // Check if the move results in a checkmate or stalemate
      if (game.isGameOver()) {
        moveDescription += ' (Game Over)'
        onGameOver() // Notify the game over state
      } else if (game.inCheck()) {
        moveDescription += ' (Check)'
      }

      onMove(moveDescription)
    }

    return move !== null
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

  return (
    <div className='flex justify-center items-center w-full h-full max-w-[75vmin] max-h-[75vmin] rounded-lg shadow-lg'>
      <Chessboard
        position={position}
        onPieceDrop={handlePieceDrop}
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
      />
    </div>
  )
}

export default ChessGame
