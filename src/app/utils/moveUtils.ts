import { Chess, Square } from 'chess.js'
import { getGameOverDescription, isValidSquare } from './gameUtils'
import { getPieceName, PieceType } from '../utils/pieceUtils'

export type FenHistory = string[]

// Updated makeMove function
export const makeMove = (
  fromSquare: Square,
  toSquare: Square,
  game: Chess,
  onMove: (move: string, fen: string) => void, // Updated to include FEN in onMove
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

  const move = game.move({ from: fromSquare, to: toSquare })
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

    moveDescription += getGameOverDescription(game)
    if (!game.isGameOver() && game.inCheck()) moveDescription += ' (Check)'

    onMove(moveDescription, newFen) // Pass move description and FEN
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

// Updated handleSquareClick function
export const handleSquareClick = (
  square: Square,
  chessGame: React.MutableRefObject<Chess>,
  selectedSquare: Square | null,
  setSelectedSquare: React.Dispatch<React.SetStateAction<Square | null>>,
  setPosition: React.Dispatch<React.SetStateAction<string>>,
  getPossibleMoves: (square: Square) => void,
  handleGameOverDescription: (game: Chess) => string,
  onMove: (move: string, fen: string) => void, // Include FEN
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

    const legalMoves = game.moves({ square: fromSquare, verbose: true })
    const legalMove = legalMoves.find((move) => move.to === toSquare)

    if (!legalMove) return

    const move = game.move({ from: fromSquare, to: toSquare })
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

      moveDescription += handleGameOverDescription(game)
      if (!game.isGameOver() && game.inCheck()) {
        moveDescription += ' (Check)'
      }

      onMove(moveDescription, newFen) // Update FEN and move description
    }
    clearSelection()
  } else if (piece) {
    setSelectedSquare(square)
    getPossibleMoves(square)
  } else {
    clearSelection()
  }
}
