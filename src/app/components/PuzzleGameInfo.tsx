import { FaChevronLeft, FaChevronRight, FaRedoAlt } from 'react-icons/fa'
import { TbSwitch2 } from 'react-icons/tb'

interface PuzzleGameInfoProps {
  fenHistory: string[]
  currentMoveIndex: number
  navigateToMove: (index: number) => void
  onTakeBackMove: () => void
  onToggleBoardOrientation: () => void
  getNextPuzzle: () => void
  onGetHint: () => void
}

const PuzzleGameInfo: React.FC<PuzzleGameInfoProps> = ({
  fenHistory,
  currentMoveIndex,
  navigateToMove,
  onTakeBackMove,
  onToggleBoardOrientation,
  getNextPuzzle,
  onGetHint,
}) => {
  const handlePreviousMove = () =>
    navigateToMove(Math.max(currentMoveIndex - 1, 0))
  const handleNextMove = () =>
    navigateToMove(Math.min(currentMoveIndex + 1, fenHistory.length - 1))

  const handleSkipPuzzle = () => {
    if (window.confirm('Are you sure you want to skip this puzzle?')) {
      getNextPuzzle()
    }
  }

  const handleGetHint = () => {
    onGetHint()
  }

  return (
    <div className='mt-20 p-4 w-full max-w-[75vmin] bg-purple-900 bg-opacity-90 text-white rounded-lg shadow-lg'>
      {/* Horizontal Button Row */}
      <div className='flex justify-center items-center gap-4 flex-nowrap'>
        {/* Hint Button */}
        <button
          onClick={handleGetHint}
          className='flex-1 min-w-0 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 flex items-center justify-center h-12'
          aria-label='Get a hint for the current puzzle'
          title='Get a hint for the current puzzle'
        >
          Hint
        </button>

        {/* Board Orientation Toggle */}
        <button
          onClick={onToggleBoardOrientation}
          className='flex-1 min-w-0 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 flex items-center justify-center h-12'
          aria-label='Switch board orientation'
          title='Switch board orientation'
        >
          <TbSwitch2 className='h-5 w-5 -rotate-90' />
        </button>

        {/* Previous Move */}
        <button
          onClick={handlePreviousMove}
          className={`flex-1 min-w-0 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 flex items-center justify-center h-12 ${
            currentMoveIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={currentMoveIndex === 0}
          aria-label='Go to previous move'
          title='Previous move'
        >
          <FaChevronLeft className='h-5 w-5' />
        </button>

        {/* Next Move */}
        <button
          onClick={handleNextMove}
          className={`flex-1 min-w-0 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 flex items-center justify-center h-12 ${
            currentMoveIndex >= fenHistory.length - 1
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
          disabled={currentMoveIndex >= fenHistory.length - 1}
          aria-label='Go to next move'
          title='Next move'
        >
          <FaChevronRight className='h-5 w-5' />
        </button>

        {/* Take Back Move */}
        <button
          onClick={onTakeBackMove}
          className='flex-1 min-w-0 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 flex items-center justify-center h-12'
          aria-label='Take back last move'
          title='Take back last move'
        >
          <FaRedoAlt className='h-5 w-5' />
        </button>

        {/* Skip Button */}
        <button
          onClick={handleSkipPuzzle}
          className='flex-1 min-w-0 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 flex items-center justify-center h-12'
          aria-label='Skip the current puzzle'
          title='Skip the current puzzle'
        >
          Skip
        </button>
      </div>
    </div>
  )
}

export default PuzzleGameInfo
