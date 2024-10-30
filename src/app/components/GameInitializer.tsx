'use client'

import React, { useState } from 'react'

interface GameInitializerProps {
  onStartGame: (color: 'white' | 'black') => void
}

const GameInitializer: React.FC<GameInitializerProps> = ({ onStartGame }) => {
  const [selectedColor, setSelectedColor] = useState<'white' | 'black' | null>(
    null
  )
  const [timeLimit, setTimeLimit] = useState<number>(5)
  const [difficulty, setDifficulty] = useState<number>(1)

  return (
    <div className='flex flex-col items-center mt-10'>
      <div className='bg-purple-900 bg-opacity-80 p-8 rounded-lg shadow-lg space-y-6 text-center max-w-md md:max-w-lg lg:max-w-xl'>
        <h2 className='text-2xl font-bold text-white'>Create a Game</h2>

        {/* Color Selection */}
        <div className='flex flex-col items-center space-y-2'>
          <label className='text-white'>Select Your Color:</label>
          <div className='flex space-x-4'>
            <button
              onClick={() => setSelectedColor('white')}
              className={`p-4 rounded-lg transition-transform transform ${
                selectedColor === 'white'
                  ? 'bg-purple-700'
                  : 'bg-white text-black'
              } hover:scale-105`}
            >
              White
            </button>
            <button
              onClick={() => setSelectedColor('black')}
              className={`p-4 rounded-lg transition-transform transform ${
                selectedColor === 'black'
                  ? 'bg-purple-700'
                  : 'bg-black text-white'
              } hover:scale-105`}
            >
              Black
            </button>
          </div>
        </div>

        {/* Timer Selection */}
        <div className='flex flex-col items-center space-y-2'>
          <label className='text-white'>Time Limit (in minutes):</label>
          <input
            type='number'
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
            className='p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600 text-black'
            min='1'
            max='60'
            placeholder='Minutes'
          />
        </div>

        {/* Difficulty Slider */}
        <div className='flex flex-col items-center space-y-2'>
          <label className='text-white'>Difficulty (1-10): {difficulty}</label>
          <input
            type='range'
            min='1'
            max='10'
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            className='w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-600'
          />
        </div>

        {/* Create Game Button */}
        <button
          onClick={() => {
            if (selectedColor) {
              onStartGame(selectedColor)
            }
          }}
          className='w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors duration-300'
          disabled={!selectedColor}
        >
          Create Game
        </button>
      </div>
    </div>
  )
}

export default GameInitializer
