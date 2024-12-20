import { useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaRedoAlt } from 'react-icons/fa'
import { TbSwitch2 } from 'react-icons/tb'
import ConfirmationDialog from './ConfirmationDialog'

interface PuzzleGameInfoProps {
  fenHistory: string[]
  currentMoveIndex: number
  navigateToMove: (index: number) => void
  onTakeBackMove: () => void
  onToggleBoardOrientation: () => void
  getNextPuzzle: () => void
  onGetHint: () => void
  showConfirmationBox: boolean
  handleConfirm: () => void
}

const PuzzleGameInfo: React.FC<PuzzleGameInfoProps> = ({
  fenHistory,
  currentMoveIndex,
  navigateToMove,
  onTakeBackMove,
  onToggleBoardOrientation,
  getNextPuzzle,
  onGetHint,
  showConfirmationBox,
  handleConfirm,
}) => {
  const [showSkipConfirm, setShowSkipConfirm] = useState(false)

  const handleSkipClick = () => {
    setShowSkipConfirm(true)
  }

  const handleConfirmSkip = () => {
    setShowSkipConfirm(false)
    getNextPuzzle()
  }

  const handleCancelSkip = () => {
    setShowSkipConfirm(false)
  }

  const handlePreviousMove = () =>
    navigateToMove(Math.max(currentMoveIndex - 1, 0))
  const handleNextMove = () =>
    navigateToMove(Math.min(currentMoveIndex + 1, fenHistory.length - 1))

  const handleGetHint = () => {
    onGetHint()
  }

  return (
    <div className='mt-20 p-4 w-full max-w-[65vmin] bg-purple-900 bg-opacity-90 text-white rounded-lg shadow-lg overflow-hidden'>
      {/* Horizontal Button Row */}
      <div className='flex justify-center items-center gap-2 mb-2'>
        {/* Hint Button */}
        <button
          onClick={handleGetHint}
          className='flex-1 bg-purple-600 text-white py-2 h-12 rounded-lg hover:bg-gray-700 flex items-center justify-center max-w-[120px] sm:max-w-[100px]'
          aria-label='Get a hint for the current puzzle'
        >
          Hint
        </button>

        {/* Board Orientation Toggle */}
        <button
          onClick={onToggleBoardOrientation}
          className='flex-1 bg-purple-600 text-white py-2 h-12 rounded-lg hover:bg-gray-700 flex items-center justify-center max-w-[120px] sm:max-w-[100px]'
          aria-label='Switch board orientation'
        >
          <TbSwitch2 className='h-5 w-5 sm:h-4 sm:w-4 -rotate-90' />
        </button>

        {/* Previous Move */}
        <button
          onClick={handlePreviousMove}
          className={`flex-1 bg-purple-600 text-white py-2 h-12 rounded-lg hover:bg-gray-700 flex items-center justify-center max-w-[120px] sm:max-w-[100px] ${
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
          className={`flex-1 bg-purple-600 text-white py-2 h-12 rounded-lg hover:bg-gray-700 flex items-center justify-center max-w-[120px] sm:max-w-[100px] ${
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
          className={`flex-1 bg-purple-600 text-white py-2 h-12 rounded-lg flex items-center justify-center max-w-[120px] sm:max-w-[100px] ${
            currentMoveIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label='Take back last move'
        >
          <FaRedoAlt className='h-5 w-5 sm:h-4 sm:w-4' />
        </button>

        {/* Skip Button */}
        <button
          onClick={handleSkipClick}
          className='flex-1 bg-purple-600 text-white py-2 h-12 rounded-lg hover:bg-gray-700 flex items-center justify-center max-w-[120px] sm:max-w-[100px]'
          aria-label='Skip the current puzzle'
          title='Skip the current puzzle'
        >
          Skip
        </button>
      </div>

      {/* Skip Confirmation Dialog */}
      {showSkipConfirm && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white rounded-lg p-4 shadow-lg max-w-xs w-full'>
            <h4 className='text-lg text-center font-semibold text-black'>
              Are you sure you want to skip this puzzle?
            </h4>
            <div className='flex justify-around mt-4'>
              <button
                onClick={handleConfirmSkip}
                className='bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700'
              >
                Yes
              </button>
              <button
                onClick={handleCancelSkip}
                className='bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700'
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <ConfirmationDialog
        show={showConfirmationBox}
        onConfirm={handleConfirm}
      />
    </div>
  )
}

export default PuzzleGameInfo
