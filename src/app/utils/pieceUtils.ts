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

// Mapping of piece types to values
export const pieceValues: { [key in PieceType]: number } = {
  p: 1, // Pawn
  n: 3, // Knight
  b: 3, // Bishop
  r: 5, // Rook
  q: 9, // Queen
  k: 0, // King (not used in material calculation)
  P: 1, // Pawn (uppercase handled for completeness)
  N: 3, // Knight
  B: 3, // Bishop
  R: 5, // Rook
  Q: 9, // Queen
  K: 0, // King
}

// Function to get the name of a piece based on its type
export const getPieceName = (pieceType: PieceType): string =>
  pieceNames[pieceType]

// Optional utility function to get the value of a piece
export const getPieceValue = (pieceType: PieceType): number =>
  pieceValues[pieceType]
