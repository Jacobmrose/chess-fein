import { Chess } from 'chess.js' // Import the Chess type
import { getGameOverDescription } from '../utils/gameUtils'

export const handleGameOverDescription = (
  game: Chess,
  setEndReason: (reason: string) => void
) => {
  const description = getGameOverDescription(game)
  setEndReason(description)
  return description
}

export const declareWinner = (
  game: Chess,
  setWinner: (winner: string) => void
) => {
  if (game.isCheckmate()) {
    setWinner(
      game.turn() === 'w'
        ? 'Black wins by checkmate!'
        : 'White wins by checkmate!'
    )
  } else if (game.isDraw()) {
    setWinner('Game ends in a draw!')
  } else if (game.isStalemate()) {
    setWinner('Draw by stalemate!')
  } else if (game.isThreefoldRepetition()) {
    setWinner('Draw by threefold repetition!')
  } else if (game.isInsufficientMaterial()) {
    setWinner('Draw by insufficient material!')
  } else {
    setWinner('Game over')
  }
}
