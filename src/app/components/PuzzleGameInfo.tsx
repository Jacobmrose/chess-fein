import { FaChevronLeft, FaChevronRight, FaRedoAlt } from 'react-icons/fa'
import { TbSwitch2 } from 'react-icons/tb'

interface PuzzleGameInfoProps {
  fenHistory: string[]
  currentMoveIndex: number
  navigateToMove: (index: number) => void
  onTakeBackMove: () => void
  onToggleBoardOrientation: () => void
}

const PuzzleGameInfo: React.FC<PuzzleGameInfoProps> = ({
  fenHistory,
  currentMoveIndex,
  navigateToMove,
  onTakeBackMove,
  onToggleBoardOrientation,
}) => {
  const handlePreviousMove = () =>
    navigateToMove(Math.max(currentMoveIndex - 1, 0))
  const handleNextMove = () =>
    navigateToMove(Math.min(currentMoveIndex + 1, fenHistory.length - 1))

  return (
    <div className='mt-4 p-4 w-full max-w-[75vmin] bg-purple-900 bg-opacity-90 text-white rounded-lg shadow-lg pt-16'>
      {/* Button container with consistent styles */}
      <div className='flex justify-center items-center gap-6 mb-4 w-full'>
        {/* Board Orientation Toggle */}
        <button
          onClick={onToggleBoardOrientation}
          className='flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center max-w-[120px] sm:max-w-[100px]'
          aria-label='Switch board orientation'
        >
          <TbSwitch2 className='h-5 w-5 sm:h-4 sm:w-4 -rotate-90' />
        </button>

        {/* Previous Move */}
        <button
          onClick={handlePreviousMove}
          className={`flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center max-w-[120px] sm:max-w-[100px] ${
            currentMoveIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={currentMoveIndex === 0}
          aria-label='Go to previous move'
        >
          <FaChevronLeft className='h-5 w-5 sm:h-4 sm:w-4' />
        </button>

        {/* Next Move */}
        <button
          onClick={handleNextMove}
          className={`flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center max-w-[120px] sm:max-w-[100px] ${
            currentMoveIndex >= fenHistory.length - 1
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
          disabled={currentMoveIndex >= fenHistory.length - 1}
          aria-label='Go to next move'
        >
          <FaChevronRight className='h-5 w-5 sm:h-4 sm:w-4' />
        </button>

        {/* Take Back Move */}
        <button
          onClick={onTakeBackMove}
          className='flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center max-w-[120px] sm:max-w-[100px]'
          aria-label='Take back last move'
        >
          <FaRedoAlt className='h-5 w-5 sm:h-4 sm:w-4' />
        </button>
      </div>
    </div>
  )
}

export default PuzzleGameInfo
