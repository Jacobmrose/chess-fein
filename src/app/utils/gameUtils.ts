/* eslint-disable */
import { Chess } from 'chess.js'

export const isValidSquare = (square: string): boolean =>
  /^[a-h][1-8]$/.test(square)

export const clearSelection = (
  setSelectedSquare: Function,
  setPossibleMoves: Function
) => {
  setSelectedSquare(null)
  setPossibleMoves([])
}

export const getGameOverDescription = (game: Chess): string => {
  if (game.isCheckmate()) return ' (Checkmate)'
  if (game.isStalemate()) return ' (Stalemate)'
  if (game.isThreefoldRepetition()) return ' (Threefold Repetition)'
  if (game.isInsufficientMaterial()) return ' (Insufficient Material)'
  if (game.isDraw()) return ' (Draw)'
  return ''
}
