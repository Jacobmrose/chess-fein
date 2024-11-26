import { Chess, Square } from 'chess.js'
import { getGameOverDescription, isValidSquare } from './gameUtils'
import { getPieceName, PieceType } from '../utils/pieceUtils'

export type FenHistory = string[]

// Updated makeMove function
export const makeMove = (
  fromSquare: Square,
  toSquare: Square,
  game: Chess,
  onMove: (
    moveDescription: string,
    newFen: string,
    lastMove: { from: string; to: string }
  ) => void,
  isGameOver: boolean,
  setPosition: (fen: string) => void
): boolean => {
  // Return type is now boolean
  if (isGameOver) return false // If the game is over, the move is not valid

  if (!isValidSquare(fromSquare) || !isValidSquare(toSquare)) return false // Invalid squares

  const legalMoves = game.moves({ verbose: true })
  const isLegalMove = legalMoves.some(
    (move) => move.from === fromSquare && move.to === toSquare
  )

  if (!isLegalMove) return false // If not a legal move, return false

  let move
  const movingPiece = game.get(fromSquare)?.type
  const isPawn = movingPiece === 'p'
  const isBackRank =
    (game.turn() === 'w' && toSquare[1] === '8') ||
    (game.turn() === 'b' && toSquare[1] === '1')

  // Handle pawn promotion
  if (isPawn && isBackRank) {
    let promotionPiece = prompt(
      'Promote to (q: Queen, r: Rook, b: Bishop, n: Knight):',
      'q'
    )
    while (
      promotionPiece &&
      !['q', 'r', 'b', 'n'].includes(promotionPiece.toLowerCase())
    ) {
      promotionPiece = prompt(
        'Invalid input. Please enter one of q, r, b, n:',
        'q'
      )
    }
    move = game.move({
      from: fromSquare,
      to: toSquare,
      promotion: promotionPiece?.toLowerCase() as 'q' | 'r' | 'b' | 'n',
    })
  } else {
    move = game.move({ from: fromSquare, to: toSquare })
  }

  if (move) {
    const newFen = game.fen()
    setPosition(newFen)

    let moveDescription = `${getPieceName(
      move.piece.toUpperCase() as PieceType
    )} to ${toSquare}`

    if (move.captured) {
      const capturedPieceName = getPieceName(
        move.captured.toUpperCase() as PieceType
      )
      moveDescription = `${getPieceName(
        move.piece.toUpperCase() as PieceType
      )} takes ${capturedPieceName} on ${toSquare}`
    }

    if (isPawn && isBackRank && move.promotion) {
      const promotionPieceName = getPieceName(
        move.promotion.toUpperCase() as PieceType
      )
      moveDescription = `${promotionPieceName} promoted on ${toSquare}`
    }

    moveDescription += getGameOverDescription(game)
    if (!game.isGameOver() && game.inCheck()) moveDescription += ' (Check)'

    onMove(moveDescription, newFen, { from: fromSquare, to: toSquare })

    return true // Successfully made the move
  }

  return false // If no move was made, return false
}

// Function to navigate to a specific move
export const navigateToMove = (
  fenHistory: FenHistory,
  moveIndex: number,
  game: Chess,
  setPosition: (fen: string) => void
) => {
  if (moveIndex < 0 || moveIndex >= fenHistory.length) return

  const fen = fenHistory[moveIndex]
  game.load(fen)
  setPosition(fen)
}

export const handleSquareClick = (
  square: Square,
  chessGame: React.MutableRefObject<Chess>,
  selectedSquare: Square | null,
  setSelectedSquare: React.Dispatch<React.SetStateAction<Square | null>>,
  setPosition: React.Dispatch<React.SetStateAction<string>>,
  getPossibleMoves: (square: Square) => void,
  handleGameOverDescription: (game: Chess) => string,
  onMove: (
    move: string,
    fen: string,
    lastMove: { from: string; to: string }
  ) => void, // Pass the lastMove object to parent
  clearSelection: () => void
) => {
  const game = chessGame.current
  const piece = game.get(square)

  if (selectedSquare && piece && piece.color === game.turn()) {
    setSelectedSquare(square)
    getPossibleMoves(square)
  } else if (selectedSquare) {
    const fromSquare = selectedSquare
    const toSquare = square

    const moveDetails = makeMove(
      fromSquare,
      toSquare,
      game,
      (moveDescription, newFen, lastMove) => {
        onMove(moveDescription, newFen, lastMove) // Pass the last move details
      },
      game.isGameOver(),
      setPosition
    )

    if (moveDetails) {
      clearSelection()
    }
  } else if (piece) {
    setSelectedSquare(square)
    getPossibleMoves(square)
  } else {
    clearSelection()
  }
}
