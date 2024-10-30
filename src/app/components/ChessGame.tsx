'use client'

import { useState, useRef } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'

interface ChessGameProps {
  color: 'white' | 'black'
}

const ChessGame: React.FC<ChessGameProps> = ({ color }) => {
  const chessGame = useRef(new Chess())
  const [position, setPosition] = useState(chessGame.current.fen())

  const handlePieceDrop = (fromSquare: string, toSquare: string) => {
    const game = chessGame.current
    const move = game.move({ from: fromSquare, to: toSquare })

    if (move) setPosition(game.fen())
    return move !== null
  }

  return (
    <div className='flex justify-center items-center w-full h-full max-w-[75vmin] max-h-[75vmin] rounded-lg shadow-lg'>
      <Chessboard
        position={position}
        onPieceDrop={handlePieceDrop}
        boardOrientation={color}
        customBoardStyle={{
          borderRadius: '8px',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.6)',
        }}
        customDarkSquareStyle={{
          backgroundColor: '#6A0DAD',
        }}
        customLightSquareStyle={{
          backgroundColor: '#E0E0E0',
        }}
      />
    </div>
  )
}

export default ChessGame
