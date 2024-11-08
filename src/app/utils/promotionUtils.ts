// utils/promotionUtils.ts
import { Square } from 'chess.js'
import { PieceType } from './pieceUtils'

export const onPromotionCheck = (
  sourceSquare: Square,
  targetSquare: Square,
  piece: string
) => {
  const isWhitePawnPromotion =
    piece === 'wP' && sourceSquare[1] === '7' && targetSquare[1] === '8'
  const isBlackPawnPromotion =
    piece === 'bP' && sourceSquare[1] === '2' && targetSquare[1] === '1'
  return isWhitePawnPromotion || isBlackPawnPromotion
}

export const onPromotionPieceSelect = (
  piece: string | undefined,
  promoteFromSquare: Square | undefined,
  promoteToSquare: Square | undefined,
  game: any,
  setPosition: (fen: string) => void,
  getPieceName: (pieceType: PieceType) => string,
  handleGameOverDescription: (game: any) => string,
  onMove: (description: string) => void
) => {
  if (promoteFromSquare && promoteToSquare && piece) {
    const promotionPiece = piece.charAt(1).toLowerCase()
    const promotionMove = game.move({
      from: promoteFromSquare,
      to: promoteToSquare,
      promotion: promotionPiece,
    })

    if (promotionMove) {
      setPosition(game.fen())
      const pieceName = getPieceName(promotionPiece.toUpperCase() as PieceType)
      let moveDescription = `${pieceName} promoted on ${promoteToSquare}`
      moveDescription += handleGameOverDescription(game)

      if (!game.isGameOver() && game.inCheck()) {
        moveDescription += ' (Check)'
      }

      onMove(moveDescription)
      return true
    }
  }
  return false
}
