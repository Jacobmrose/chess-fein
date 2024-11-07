import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, Square } from 'chess.js'
import { getPieceName, Piece, PieceType } from '../utils/pieceUtils'

interface ChessGameProps {
  color: 'white' | 'black'
  onMove: (move: string) => void
  onGameOver: () => void
  isGameOver: boolean
}

const squareSize = 12.5 // Each square occupies 12.5% of the board size

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

  const onPromotionCheck = useCallback(
    (sourceSquare: Square, targetSquare: Square, piece: string) => {
      // For white pawn: it reaches the 8th rank from 7th
      const isWhitePawnPromotion =
        piece === 'wP' && sourceSquare[1] === '7' && targetSquare[1] === '8'

      // For black pawn: it reaches the 1st rank from 2nd
      const isBlackPawnPromotion =
        piece === 'bP' && sourceSquare[1] === '2' && targetSquare[1] === '1'

      return isWhitePawnPromotion || isBlackPawnPromotion
    },
    []
  )

  const onPromotionPieceSelect = useCallback(
    (
      piece: string | undefined,
      promoteFromSquare?: Square,
      promoteToSquare?: Square
    ) => {
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

  const makeMove = useCallback(
    (fromSquare: Square, toSquare: Square, promotionPiece?: string) => {
      const game = chessGame.current
      if (isGameOver) return false
      if (!isValidSquare(fromSquare) || !isValidSquare(toSquare)) return false

      try {
        const move = game.move({
          from: fromSquare,
          to: toSquare,
          promotion: promotionPiece,
        })
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
      const game = chessGame.current
      const piece = game.get(square)

      // If there's a selected square and clicking on a new piece of the same color, change selection
      if (selectedSquare && piece && piece.color === game.turn()) {
        setSelectedSquare(square)
        getPossibleMoves(square)
      } else if (selectedSquare) {
        // Attempt to move if there is a selected square
        const fromSquare = selectedSquare
        const toSquare = square

        // Get the list of legal moves for the selected piece
        const legalMoves = game.moves({ square: fromSquare, verbose: true })

        // Find the move object corresponding to the target square
        const legalMove = legalMoves.find((move) => move.to === toSquare)

        // If the move is not in the legal moves, do nothing
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
            moveDescription += getGameOverDescription(game)
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

            moveDescription += getGameOverDescription(game)
            if (!game.isGameOver() && game.inCheck()) {
              moveDescription += ' (Check)'
            }

            // Trigger the onMove callback with the move description
            onMove(moveDescription)
          }
        }
        clearSelection()
      } else if (piece) {
        // Select the new piece if there is no selected square yet
        setSelectedSquare(square)
        getPossibleMoves(square)
      } else {
        // Clear selection if clicking on an empty square
        clearSelection()
      }
    },
    [
      makeMove,
      selectedSquare,
      getPossibleMoves,
      clearSelection,
      setPosition,
      getGameOverDescription,
      onMove,
    ]
  )

  const handlePieceClick = useCallback(
    (piece: Piece, square: Square) => {
      handleSquareClick(square)
    },
    [handleSquareClick]
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
        possibleMoves.map(({ square, isCapture }, index) => (
          <div
            key={`${square}-${index}`}
            style={getMoveHighlightStyle(square, isCapture)}
          />
        ))}
    </div>
  )
}

export default ChessGame
