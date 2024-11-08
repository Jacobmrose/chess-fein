import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, Square } from 'chess.js'
import { getPieceName, Piece, PieceType } from '../utils/pieceUtils'
import { getMoveHighlightStyle } from '../utils/highlightStyles'
import { getGameOverDescription, clearSelection } from '../utils/gameUtils'
import { makeMove } from '../utils/moveUtils'
import {
  onPromotionCheck,
  onPromotionPieceSelect,
} from '../utils/promotionUtils'

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
  const [possibleMoves, setPossibleMoves] = useState<
    { square: Square; isCapture: boolean }[]
  >([])

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
    if (chessGame.current.isGameOver()) {
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
    [handleGameOverDescription, onMove, setPosition, chessGame, getPieceName]
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

  const handleSquareClick = useCallback(
    (square: Square) => {
      const game = chessGame.current
      const piece = game.get(square)
      if (selectedSquare && piece && piece.color === game.turn()) {
        setSelectedSquare(square)
        getPossibleMoves(square)
      } else if (selectedSquare) {
        const fromSquare = selectedSquare
        const toSquare = square

        const legalMoves = game.moves({ square: fromSquare, verbose: true })

        const legalMove = legalMoves.find((move) => move.to === toSquare)

        if (!legalMove) {
          return
        }

        const movingPiece = game.get(fromSquare)?.type
        const isPawn = movingPiece === 'p'
        const isBackRank =
          (game.turn() === 'w' && toSquare[1] === '8') ||
          (game.turn() === 'b' && toSquare[1] === '1')

        // Check for promotion
        if (isPawn && isBackRank) {
          // Trigger promotion dialog if the pawn reaches the back rank
          let promotionPiece = prompt(
            'Promote to (q : Queen, r : Rook, b : Bishop, n : Knight):',
            'q'
          )
          // Loop until a valid single character input is provided
          while (promotionPiece && promotionPiece.length !== 1) {
            promotionPiece = prompt(
              'Please enter only one character: (q : Queen, r : Rook, b : Bishop, n : Knight):',
              'q'
            )
          }
          // If a valid promotion piece is chosen
          if (
            promotionPiece &&
            ['q', 'r', 'b', 'n'].includes(promotionPiece.toLowerCase())
          ) {
            // Apply the promotion move
            const promotionMove = {
              from: fromSquare,
              to: toSquare,
              promotion: promotionPiece.toLowerCase() as 'q' | 'r' | 'b' | 'n',
            }
            game.move(promotionMove) // Apply the promotion move
            setPosition(game.fen()) // Update the board position after the move
            // Set the move description
            const promotionPieceName = getPieceName(
              promotionPiece.toUpperCase() as PieceType
            )
            let moveDescription = `${promotionPieceName} promoted on ${toSquare}`
            // Add any game-over state or check information
            moveDescription += handleGameOverDescription(game)
            if (!game.isGameOver() && game.inCheck()) {
              moveDescription += ' (Check)'
            }
            // Trigger the onMove callback with the move description
            onMove(moveDescription)
          }
        } else {
          // Handle regular moves (no promotion required)
          const move = game.move({ from: fromSquare, to: toSquare })
          if (move) {
            setPosition(game.fen()) // Update the board position after the move
            // Set the move description
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
            moveDescription += handleGameOverDescription(game)
            if (!game.isGameOver() && game.inCheck()) {
              moveDescription += ' (Check)'
            }
            // Trigger the onMove callback with the move description
            onMove(moveDescription)
          }
        }
        handleClearSelection()
      } else if (piece) {
        // Select the new piece if there is no selected square yet
        setSelectedSquare(square)
        getPossibleMoves(square)
      } else {
        // Clear selection if clicking on an empty square
        handleClearSelection()
      }
    },
    [
      makeMoveCallback,
      selectedSquare,
      getPossibleMoves,
      clearSelection,
      setPosition,
      handleGameOverDescription,
      onMove,
    ]
  )

  const handlePieceClick = useCallback(
    (piece: Piece, square: Square) => {
      handleSquareClick(square)
    },
    [handleSquareClick]
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
        onPromotionPieceSelect={handlePromotionSelection}
      />

      {selectedSquare &&
        highlightStyles.map((style, index) => (
          <div key={`${possibleMoves[index].square}-${index}`} style={style} />
        ))}
    </div>
  )
}

export default ChessGame
