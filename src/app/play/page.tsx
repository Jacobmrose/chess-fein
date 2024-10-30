'use client'

import { useState } from 'react'
import ChessGame from '@/app/components/ChessGame'
import GameInitializer from '@/app/components/GameInitializer'

export default function Play() {
  const [color, setColor] = useState<'white' | 'black' | null>(null)

  const handleStartGame = (selectedColor: 'white' | 'black') => {
    setColor(selectedColor)
    localStorage.setItem('playerColor', selectedColor)
  }

  return (
    <div className='flex justify-center items-center w-full h-screen p-4 mt-16'>
      <div className='relative w-full max-w-4xl flex justify-center h-full'>
        {!color ? (
          <GameInitializer onStartGame={handleStartGame} />
        ) : (
          <ChessGame color={color} />
        )}
      </div>
    </div>
  )
}
