import { Chess, Square } from 'chess.js'
import { getGameOverDescription } from './gameUtils'
import { getPieceName, PieceType } from '../utils/pieceUtils'
import { isValidSquare } from './gameUtils'

export const makeMove = (
  fromSquare: Square,
  toSquare: Square,
  game: Chess,
  onMove: (move: string) => void,
  isGameOver: boolean,
  setPosition: Function
) => {
  if (isGameOver) return false

  // Check if the squares are valid
  if (!isValidSquare(fromSquare) || !isValidSquare(toSquare)) return false

  // Get all legal moves for the current player
  const legalMoves = game.moves({ verbose: true })

  // Check if the move is legal by comparing it against the legal moves
  const isLegalMove = legalMoves.some(
    (move) => move.from === fromSquare && move.to === toSquare
  )

  if (!isLegalMove) {
    // Do nothing if the move is not legal
    return false
  }

  // If the move is legal, apply it
  const move = game.move({ from: fromSquare, to: toSquare })
  if (move) {
    setPosition(game.fen())
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

    moveDescription += getGameOverDescription(game)
    if (!game.isGameOver() && game.inCheck()) moveDescription += ' (Check)'
    onMove(moveDescription)
    return true // Move applied successfully
  }

  return false // Return false if the move couldn't be applied for any reason
}
