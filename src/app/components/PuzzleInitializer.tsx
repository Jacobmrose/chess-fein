import { useState } from 'react'

interface PuzzleInitializerProps {
  onFetchPuzzles: (
    theme: string,
    difficultyRange: [number, number],
    maxMoves: number
  ) => void
}

const PuzzleInitializer: React.FC<PuzzleInitializerProps> = ({
  onFetchPuzzles,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('All')
  const [difficultyRange, setDifficultyRange] = useState<[number, number]>([
    1000, 2000,
  ])
  const [maxMoves, setMaxMoves] = useState<number>(5)

  return (
    <div className='flex flex-col items-center mt-10 w-full'>
      <div className='bg-purple-900 bg-opacity-80 p-8 rounded-lg shadow-lg space-y-6 text-center w-full max-w-3xl'>
        <h2 className='text-2xl lg:text-3xl font-bold text-white'>
          Configure Puzzle Settings
        </h2>

        {/* Puzzle Theme Selection */}
        <div className='flex flex-col items-center space-y-2'>
          <label className='text-white text-base lg:text-lg'>
            Puzzle Theme:
          </label>
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className='p-2 lg:p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600 text-black text-sm lg:text-lg'
          >
            <option value='All'>All</option>
            <option value='Mate'>Mate</option>
            <option value='Pin'>Pin</option>
            <option value='Fork'>Fork</option>
            <option value='Skewer'>Skewer</option>
            <option value='Discovery'>Discovery</option>
            {/* Add more themes as needed */}
          </select>
        </div>

        {/* Difficulty Range Slider */}
        <div className='flex flex-col items-center space-y-2'>
          <label className='text-white text-base lg:text-lg'>
            Difficulty Range: {difficultyRange[0]} - {difficultyRange[1]}
          </label>
          <div className='flex space-x-4'>
            <input
              type='number'
              min='400'
              max='3000'
              value={difficultyRange[0]}
              onChange={(e) =>
                setDifficultyRange([Number(e.target.value), difficultyRange[1]])
              }
              className='p-2 lg:p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600 text-black text-sm lg:text-lg'
              placeholder='Min'
            />
            <input
              type='number'
              min='400'
              max='3000'
              value={difficultyRange[1]}
              onChange={(e) =>
                setDifficultyRange([difficultyRange[0], Number(e.target.value)])
              }
              className='p-2 lg:p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600 text-black text-sm lg:text-lg'
              placeholder='Max'
            />
          </div>
        </div>

        {/* Maximum Moves Input */}
        <div className='flex flex-col items-center space-y-2'>
          <label className='text-white text-base lg:text-lg'>
            Maximum Moves:
          </label>
          <input
            type='number'
            value={maxMoves}
            onChange={(e) => setMaxMoves(Number(e.target.value))}
            className='p-2 lg:p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600 text-black text-sm lg:text-lg'
            min='1'
            max='10'
            placeholder='Max Moves'
          />
        </div>

        {/* Fetch Puzzles Button */}
        <button
          onClick={() =>
            onFetchPuzzles(selectedTheme, difficultyRange, maxMoves)
          }
          className='w-full bg-purple-600 text-white py-2 lg:py-3 rounded-md hover:bg-purple-700 transition-colors duration-300 text-base lg:text-lg'
        >
          Fetch Puzzles
        </button>
      </div>
    </div>
  )
}

export default PuzzleInitializer
