import { Chess, Square } from 'chess.js'
import { getGameOverDescription, isValidSquare } from './gameUtils'
import { getPieceName, PieceType } from '../utils/pieceUtils'

export type FenHistory = string[]

// Updated makeMove function
export const makeMove = (
  fromSquare: Square,
  toSquare: Square,
  game: Chess,
  onMove: (move: string, fen: string) => void,
  isGameOver: boolean,
  setPosition: (fen: string) => void
) => {
  if (isGameOver) return false

  if (!isValidSquare(fromSquare) || !isValidSquare(toSquare)) return false

  const legalMoves = game.moves({ verbose: true })
  const isLegalMove = legalMoves.some(
    (move) => move.from === fromSquare && move.to === toSquare
  )

  if (!isLegalMove) return false

  // Check for pawn promotion
  const movingPiece = game.get(fromSquare)?.type
  const isPawn = movingPiece === 'p'
  const isBackRank =
    (game.turn() === 'w' && toSquare[1] === '8') ||
    (game.turn() === 'b' && toSquare[1] === '1')

  let move
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
      moveDescription = ` ${promotionPieceName} promoted on ${toSquare}`
    }

    moveDescription += getGameOverDescription(game)
    if (!game.isGameOver() && game.inCheck()) moveDescription += ' (Check)'

    onMove(moveDescription, newFen)
    return true
  }

  return false
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
  onMove: (move: string, fen: string) => void,
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

    const isMoveSuccessful = makeMove(
      fromSquare,
      toSquare,
      game,
      onMove,
      game.isGameOver(),
      setPosition
    )

    if (isMoveSuccessful) {
      clearSelection()
    }
  } else if (piece) {
    setSelectedSquare(square)
    getPossibleMoves(square)
  } else {
    clearSelection()
  }
}
