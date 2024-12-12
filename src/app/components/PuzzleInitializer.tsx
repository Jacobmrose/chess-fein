import { useState } from 'react'

interface PuzzleInitializerProps {
  onFetchPuzzles: (theme: string) => void
}

const PuzzleInitializer: React.FC<PuzzleInitializerProps> = ({
  onFetchPuzzles,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('All')

  return (
    <div className='flex flex-col items-center mt-10 w-full'>
      <div className='bg-purple-900 bg-opacity-80 p-8 rounded-lg shadow-lg space-y-6 text-center w-full max-w-3xl'>
        <h2 className='text-2xl lg:text-3xl font-bold text-white'>
          Select Puzzle Theme
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
            <option value='Matein1'>Mate in 1</option>
            <option value='Matein2'>Mate in 2</option>
            <option value='Matein3'>Mate in 3</option>
            <option value='Matein4'>Mate in 4</option>
            <option value='Discovery'>Discovery</option>
            {/* Add more themes as needed */}
          </select>
        </div>

        {/* Fetch Puzzles Button */}
        <button
          onClick={() => onFetchPuzzles(selectedTheme)}
          className='w-full bg-purple-600 text-white py-2 lg:py-3 rounded-md hover:bg-purple-700 transition-colors duration-300 text-base lg:text-lg'
        >
          Fetch Puzzles
        </button>
      </div>
    </div>
  )
}

export default PuzzleInitializer
