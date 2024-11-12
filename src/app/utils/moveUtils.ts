import { Chess, Square } from 'chess.js'
import { getGameOverDescription, isValidSquare } from './gameUtils'
import { getPieceName, PieceType } from '../utils/pieceUtils'

// Existing makeMove function
export const makeMove = (
  fromSquare: Square,
  toSquare: Square,
  game: Chess,
  onMove: (move: string) => void,
  isGameOver: boolean,
  setPosition: Function
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
    return true
  }

  return false
}

// New handleSquareClick function
export const handleSquareClick = (
  square: Square,
  chessGame: React.MutableRefObject<Chess>,
  selectedSquare: Square | null,
  setSelectedSquare: React.Dispatch<React.SetStateAction<Square | null>>,
  setPosition: React.Dispatch<React.SetStateAction<string>>,
  getPossibleMoves: (square: Square) => void,
  handleGameOverDescription: (game: Chess) => string,
  onMove: (move: string) => void,
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

    const movingPiece = game.get(fromSquare)?.type
    const isPawn = movingPiece === 'p'
    const isBackRank =
      (game.turn() === 'w' && toSquare[1] === '8') ||
      (game.turn() === 'b' && toSquare[1] === '1')

    if (isPawn && isBackRank) {
      let promotionPiece = prompt(
        'Promote to (q : Queen, r : Rook, b : Bishop, n : Knight):',
        'q'
      )
      while (promotionPiece && promotionPiece.length !== 1) {
        promotionPiece = prompt(
          'Please enter only one character: (q : Queen, r : Rook, b : Bishop, n : Knight):',
          'q'
        )
      }

      if (
        promotionPiece &&
        ['q', 'r', 'b', 'n'].includes(promotionPiece.toLowerCase())
      ) {
        const promotionMove = {
          from: fromSquare,
          to: toSquare,
          promotion: promotionPiece.toLowerCase() as 'q' | 'r' | 'b' | 'n',
        }
        game.move(promotionMove)
        setPosition(game.fen())

        const promotionPieceName = getPieceName(
          promotionPiece.toUpperCase() as PieceType
        )
        let moveDescription = `${promotionPieceName} promoted on ${toSquare}`
        moveDescription += handleGameOverDescription(game)
        if (!game.isGameOver() && game.inCheck()) {
          moveDescription += ' (Check)'
        }
        onMove(moveDescription)
      }
    } else {
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
        moveDescription += handleGameOverDescription(game)
        if (!game.isGameOver() && game.inCheck()) {
          moveDescription += ' (Check)'
        }
        onMove(moveDescription)
      }
    }
    clearSelection()
  } else if (piece) {
    setSelectedSquare(square)
    getPossibleMoves(square)
  } else {
    clearSelection()
  }
}
