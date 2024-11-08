export const squareSize = 12.5

export const getMoveHighlightStyle = (
  square: string,
  isCapture: boolean,
  color: 'white' | 'black'
): React.CSSProperties => {
  const column = square[0]
  const row = square[1]
  const top =
    color === 'white'
      ? `${100 - parseInt(row) * squareSize}%`
      : `${(parseInt(row) - 1) * squareSize}%`
  const left =
    color === 'white'
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
