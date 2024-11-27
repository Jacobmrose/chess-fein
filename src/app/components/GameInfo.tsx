import { useState } from 'react'
import Link from 'next/link'
import {
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaChevronUp,
  FaChevronDown,
  FaRedoAlt,
} from 'react-icons/fa'
import { TbSwitch2 } from 'react-icons/tb'
import { FaFishFins } from 'react-icons/fa6'

interface GameInfoProps {
  moves: string[]
  fenHistory: string[]
  currentMoveIndex: number
  navigateToMove: (index: number) => void
  onResign: () => void
  onResetGame: () => void
  isGameOver: boolean
  onToggleBoardOrientation: () => void
  onTakeBackMove: () => void
  aiEnabled: boolean
  onToggleAI: () => void
  isPlaygroundMode: boolean
}

const GameInfo: React.FC<GameInfoProps> = ({
  moves,
  fenHistory,
  currentMoveIndex,
  navigateToMove,
  onResign,
  onResetGame,
  isGameOver,
  onToggleBoardOrientation,
  onTakeBackMove,
  aiEnabled,
  onToggleAI,
  isPlaygroundMode,
}) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isGameInfoVisible, setIsGameInfoVisible] = useState(true)

  const whiteMoves = moves.filter((_, index) => index % 2 === 0)
  const blackMoves = moves.filter((_, index) => index % 2 === 1)

  const handleResignClick = () => {
    if (!isGameOver) setShowConfirm(true)
  }

  const handleConfirmResign = () => {
    onResign()
    setShowConfirm(false)
  }

  const handleCancelResign = () => {
    setShowConfirm(false)
  }

  const handleFirstMove = () => navigateToMove(0)
  const handlePreviousMove = () =>
    navigateToMove(Math.max(currentMoveIndex - 1, 0))
  const handleNextMove = () =>
    navigateToMove(Math.min(currentMoveIndex + 1, fenHistory.length - 1))
  const handleCurrentMove = () => navigateToMove(fenHistory.length - 1)

  const toggleGameInfo = () => {
    setIsGameInfoVisible(!isGameInfoVisible)
  }

  const handleTakeBackMove = () => {
    onTakeBackMove()
  }

  return (
    <div className='mt-20 p-4 w-full max-w-[75vmin] bg-purple-900 bg-opacity-90 text-white rounded-lg shadow-lg'>
      {isPlaygroundMode && (
        <div className='flex justify-center mb-4'>
          <button
            onClick={onToggleAI}
            className={`p-3 rounded-full flex items-center justify-center ${
              aiEnabled
                ? 'bg-green-700 hover:bg-green-800'
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
            title={aiEnabled ? 'Disable AI' : 'Enable AI'}
            aria-label={aiEnabled ? 'Disable AI' : 'Enable AI'}
          >
            <FaFishFins className='h-6 w-6 text-white' />
          </button>
        </div>
      )}

      <div className='flex justify-center items-center gap-2 mb-2'>
        {/* Move navigation buttons */}
        <button
          onClick={onToggleBoardOrientation}
          className='flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center max-w-[120px] sm:max-w-[100px]'
          aria-label='Switch board orientation'
        >
          <TbSwitch2 className='h-5 w-5 sm:h-4 sm:w-4 -rotate-90' />
        </button>
        <button
          onClick={handleFirstMove}
          className='flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center max-w-[120px] sm:max-w-[100px]'
          disabled={currentMoveIndex === 0}
          aria-label='Go to first move'
        >
          <FaAngleDoubleLeft className='h-5 w-5 sm:h-4 sm:w-4' />
        </button>
        <button
          onClick={handlePreviousMove}
          className='flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center max-w-[120px] sm:max-w-[100px]'
          disabled={currentMoveIndex === 0}
          aria-label='Go to previous move'
        >
          <FaChevronLeft className='h-5 w-5 sm:h-4 sm:w-4' />
        </button>
        <button
          onClick={handleNextMove}
          className='flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center max-w-[120px] sm:max-w-[100px]'
          disabled={currentMoveIndex >= fenHistory.length - 1}
          aria-label='Go to next move'
        >
          <FaChevronRight className='h-5 w-5 sm:h-4 sm:w-4' />
        </button>
        <button
          onClick={handleCurrentMove}
          className='flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center max-w-[120px] sm:max-w-[100px]'
          disabled={currentMoveIndex >= fenHistory.length - 1}
          aria-label='Go to current game state'
        >
          <FaAngleDoubleRight className='h-5 w-5 sm:h-4 sm:w-4' />
        </button>
        <button
          onClick={handleTakeBackMove}
          className={`flex-1 bg-purple-600 text-white py-2 rounded-lg flex items-center justify-center max-w-[120px] sm:max-w-[100px] ${
            isGameOver ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'
          }`}
          aria-label='Take back last move'
          disabled={isGameOver}
        >
          <FaRedoAlt className='h-5 w-5 sm:h-4 sm:w-4' />
        </button>
      </div>

      {/* Toggle button centered below navigation buttons */}
      <div className='flex justify-center mb-4'>
        <button
          onClick={toggleGameInfo}
          className='flex items-center justify-center p-2 text-white'
          aria-label='Toggle game info'
          aria-expanded={isGameInfoVisible ? 'true' : 'false'}
        >
          {isGameInfoVisible ? (
            <FaChevronDown className='h-4 w-4' />
          ) : (
            <FaChevronUp className='h-4 w-4' />
          )}
        </button>
      </div>

      {isGameOver && (
        <div className='flex flex-col sm:flex-row justify-center gap-4 mt-4 mb-4'>
          <Link href='/' passHref>
            <button className='w-full sm:w-auto bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-purple-700'>
              Back to Home
            </button>
          </Link>
          <button
            onClick={onResetGame}
            className='w-full sm:w-auto bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-purple-700'
          >
            Play Again
          </button>
        </div>
      )}

      {isGameInfoVisible && (
        <>
          <h4 className='font-extrabold text-xl sm:text-2xl text-center mt-5 mb-5 pb-4 pt-4 text-white border-b-2 border-purple-500'>
            Move History
          </h4>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
            <div className='flex flex-col items-center sm:border-r-2 sm:border-purple-500 sm:pr-4'>
              <h5 className='font-semibold text-lg bg-white py-2 px-4 rounded-md text-black'>
                White Moves
              </h5>
              <ul className='list-none text-sm space-y-2 text-center pt-4'>
                {whiteMoves.map((move, index) => (
                  <li key={index}>
                    <button
                      className={`block w-full text-left py-1 px-2 ${
                        currentMoveIndex === index * 2 + 1
                          ? 'bg-purple-700'
                          : ''
                      }`}
                      onClick={() => navigateToMove(index * 2 + 1)}
                    >
                      <span>{index * 2 + 1}.</span> {move}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex flex-col items-center sm:pl-4'>
              <h5 className='font-semibold text-lg bg-black py-2 px-4 rounded-md text-white'>
                Black Moves
              </h5>
              <ul className='list-none text-sm space-y-2 text-center pt-4'>
                {blackMoves.map((move, index) => (
                  <li key={index}>
                    <button
                      className={`block w-full text-left py-1 px-2 ${
                        currentMoveIndex === index * 2 + 2
                          ? 'bg-purple-700'
                          : ''
                      }`}
                      onClick={() => navigateToMove(index * 2 + 2)}
                    >
                      <span>{index * 2 + 2}.</span> {move}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {!isGameOver && (
            <button
              onClick={handleResignClick}
              className='w-full bg-purple-600 text-white font-bold py-4 px-8 rounded-lg mt-8 hover:bg-purple-700'
            >
              Resign
            </button>
          )}

          {showConfirm && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white rounded-lg p-4 shadow-lg max-w-xs w-full'>
                <h4 className='text-lg text-center font-semibold text-black'>
                  Are you sure you want to resign?
                </h4>
                <div className='flex justify-around mt-4'>
                  <button
                    onClick={handleConfirmResign}
                    className='bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700'
                  >
                    Yes
                  </button>
                  <button
                    onClick={handleCancelResign}
                    className='bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700'
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default GameInfo
