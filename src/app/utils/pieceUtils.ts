// Define types here if they are only used for pieces
export type PieceType =
  | 'p'
  | 'n'
  | 'b'
  | 'r'
  | 'q'
  | 'k'
  | 'P'
  | 'N'
  | 'B'
  | 'R'
  | 'Q'
  | 'K'

export type Piece = `${'w' | 'b'}${PieceType}`

// Mapping of piece types to names
const pieceNames: { [key in PieceType]: string } = {
  p: 'Pawn',
  n: 'Knight',
  b: 'Bishop',
  r: 'Rook',
  q: 'Queen',
  k: 'King',
  P: 'Pawn',
  N: 'Knight',
  B: 'Bishop',
  R: 'Rook',
  Q: 'Queen',
  K: 'King',
}

// Function to get the name of a piece based on its type
export const getPieceName = (pieceType: PieceType): string =>
  pieceNames[pieceType]
