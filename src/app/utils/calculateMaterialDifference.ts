import { Chess } from 'chess.js'
import { pieceValues } from './pieceUtils'

export const calculateMaterialDifference = (
  board: ReturnType<Chess['board']>,
  pieceValues: Record<string, number>
) => {
  let whiteMaterial = 0
  let blackMaterial = 0

  board.forEach((row) => {
    row.forEach((piece) => {
      if (piece) {
        const pieceValue = pieceValues[piece.type]
        if (piece.color === 'w') {
          whiteMaterial += pieceValue
        } else {
          blackMaterial += pieceValue
        }
      }
    })
  })

  return whiteMaterial - blackMaterial // Positive value favors white, negative favors black
}

export const getMaterialDifferences = (board: ReturnType<Chess['board']>) => {
  const whiteMaterialDifference = calculateMaterialDifference(
    board,
    pieceValues
  )
  const blackMaterialDifference = -whiteMaterialDifference

  return { whiteMaterialDifference, blackMaterialDifference }
}
