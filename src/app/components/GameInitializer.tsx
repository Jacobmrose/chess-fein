import { useState } from 'react'

interface GameInitializerProps {
  onStartGame: (
    color: 'white' | 'black',
    timeLimit: number,
    difficulty: number,
    isPlaygroundMode: boolean
  ) => void
}

const GameInitializer: React.FC<GameInitializerProps> = ({ onStartGame }) => {
  const [selectedColor, setSelectedColor] = useState<'white' | 'black' | null>(
    'white'
  )
  const [timeLimit, setTimeLimit] = useState<number>(10) // In minutes
  const [difficulty, setDifficulty] = useState<number>(1320)
  const [isPlaygroundMode, setIsPlaygroundMode] = useState<boolean>(false) // Playground mode state

  return (
    <div className='flex flex-col items-center mt-10 w-full'>
      <div className='bg-purple-900 bg-opacity-80 p-8 rounded-lg shadow-lg space-y-6 text-center w-full max-w-3xl'>
        <h2 className='text-2xl lg:text-3xl font-bold text-white'>
          Create a Game
        </h2>

        {/* Color Selection */}
        <div className='flex flex-col items-center space-y-2'>
          <label className='text-white text-base lg:text-lg'>
            Select Your Color:
          </label>
          <div className='flex space-x-4'>
            <button
              onClick={() => setSelectedColor('white')}
              className={`p-4 lg:p-6 rounded-lg transition-transform transform ${
                selectedColor === 'white'
                  ? 'bg-purple-700'
                  : 'bg-white text-black'
              } text-sm lg:text-lg hover:scale-105`}
            >
              White
            </button>
            <button
              onClick={() => setSelectedColor('black')}
              className={`p-4 lg:p-6 rounded-lg transition-transform transform ${
                selectedColor === 'black'
                  ? 'bg-purple-700'
                  : 'bg-black text-white'
              } text-sm lg:text-lg hover:scale-105`}
            >
              Black
            </button>
          </div>
        </div>

        {/* Timer Selection */}
        <div className='flex flex-col items-center space-y-2'>
          <label className='text-white text-base lg:text-lg'>
            Time Limit (in minutes):
          </label>
          <input
            type='number'
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
            className='p-2 lg:p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600 text-black text-sm lg:text-lg'
            min='1'
            max='60'
            placeholder='Minutes'
          />
        </div>

        {/* Difficulty Slider */}
        <div className='flex flex-col items-center space-y-2'>
          <label className='text-white text-base lg:text-lg'>
            Elo (1320-3190): {difficulty}
          </label>
          <input
            type='range'
            min='1320'
            max='3190'
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            className='w-full h-2 lg:h-3 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-600'
          />
        </div>

        {/* Playground Mode Checkbox */}
        <div className='flex flex-col items-center space-y-2'>
          <div className='flex items-center space-x-3'>
            <input
              type='checkbox'
              id='playgroundMode'
              checked={isPlaygroundMode}
              onChange={() => setIsPlaygroundMode((prev) => !prev)}
              className='w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2'
            />
            <label
              htmlFor='playgroundMode'
              className='text-white text-base lg:text-lg'
            >
              Playground Mode
            </label>
          </div>
        </div>

        {/* Create Game Button */}
        <button
          onClick={() => {
            if (selectedColor) {
              onStartGame(
                selectedColor,
                timeLimit,
                difficulty,
                isPlaygroundMode
              )
            }
          }}
          className='w-full bg-purple-600 text-white py-2 lg:py-3 rounded-md hover:bg-gray-700 transition-colors duration-300 text-base lg:text-lg'
          disabled={!selectedColor}
        >
          Create Game
        </button>
      </div>
    </div>
  )
}

export default GameInitializer
