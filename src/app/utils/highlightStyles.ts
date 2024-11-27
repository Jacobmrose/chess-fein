export const squareSize = 12.5

export const getMoveHighlightStyle = (
  square: string,
  isCapture: boolean,
  boardOrientation: 'white' | 'black'
): React.CSSProperties => {
  const column = square[0]
  const row = square[1]
  const top =
    boardOrientation === 'white'
      ? `${100 - parseInt(row) * squareSize}%`
      : `${(parseInt(row) - 1) * squareSize}%`
  const left =
    boardOrientation === 'white'
      ? `${(column.charCodeAt(0) - 'a'.charCodeAt(0)) * squareSize}%`
      : `${(7 - (column.charCodeAt(0) - 'a'.charCodeAt(0))) * squareSize}%`

  return {
    position: 'absolute',
    top,
    left,
    width: `${squareSize}%`,
    height: `${squareSize}%`,
    background: isCapture
      ? 'radial-gradient(transparent 0%, transparent 80%, rgba(0, 0, 0, 0.7) 80%)'
      : 'rgba(0, 0, 0, 0.7)',
    clipPath: isCapture ? 'none' : 'circle(13% at 50% 50%)',
    pointerEvents: 'none',
    zIndex: 10,
  }
}

export const getLastMoveHighlightStyle = (
  square: string,
  boardOrientation: 'white' | 'black'
): React.CSSProperties => {
  const column = square[0]
  const row = square[1]
  const top =
    boardOrientation === 'white'
      ? `${100 - parseInt(row) * squareSize}%`
      : `${(parseInt(row) - 1) * squareSize}%`
  const left =
    boardOrientation === 'white'
      ? `${(column.charCodeAt(0) - 'a'.charCodeAt(0)) * squareSize}%`
      : `${(7 - (column.charCodeAt(0) - 'a'.charCodeAt(0))) * squareSize}%`

  return {
    position: 'absolute',
    top,
    left,
    width: `${squareSize}%`,
    height: `${squareSize}%`,
    background: 'rgba(125, 172, 201, 0.4)', // Highlight color for last move
    pointerEvents: 'none',
    zIndex: 9,
  }
}
