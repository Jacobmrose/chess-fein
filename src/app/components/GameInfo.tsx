import { useState } from 'react'
import Link from 'next/link'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'

interface GameInfoProps {
  moves: string[]
  onResign: () => void
  onResetGame: () => void
  color: 'white' | 'black'
  isGameOver: boolean
}

const GameInfo: React.FC<GameInfoProps> = ({
  moves,
  onResign,
  onResetGame,
  color,
  isGameOver,
}) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isGameInfoVisible, setIsGameInfoVisible] = useState(true)

  const whiteMoves = moves.filter((_, index) => index % 2 === 0)
  const blackMoves = moves.filter((_, index) => index % 2 === 1)

  const handleResignClick = () => {
    if (!isGameOver) {
      setShowConfirm(true)
    }
  }

  const handleConfirmResign = () => {
    onResign()
    setShowConfirm(false)
  }

  const handleCancelResign = () => {
    setShowConfirm(false)
  }

  const toggleGameInfo = () => {
    setIsGameInfoVisible(!isGameInfoVisible)
  }

  return (
    <div className='mt-20 p-4 w-full max-w-[75vmin] bg-purple-900 bg-opacity-90 text-white rounded-lg shadow-lg'>
      <div className='text-center'>
        <h3
          className='text-xl sm:text-2xl md:text-3xl font-extrabold cursor-pointer pt-4 text-white'
          onClick={toggleGameInfo}
        >
          Game Info
        </h3>
        <button
          onClick={toggleGameInfo}
          className='flex items-center justify-center p-2 text-white mx-auto'
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

      {/* Buttons (only visible if game is over) */}
      {isGameOver && (
        <div className='flex flex-col sm:flex-row justify-center gap-4 mt-4 mb-4'>
          <Link href='/' passHref>
            <button className='w-full sm:w-auto bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform duration-300 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50'>
              Back to Home
            </button>
          </Link>
          <button
            onClick={onResetGame}
            className='w-full sm:w-auto bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform duration-300 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50'
          >
            Play Again
          </button>
        </div>
      )}

      {/* Game Info and Move History */}
      {isGameInfoVisible && (
        <>
          <h4 className='font-extrabold text-xl sm:text-2xl md:text-3xl text-center mt-5 mb-5 pb-4 pt-4 text-white border-b-2 border-purple-500'>
            Move History
          </h4>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
            <div className='flex flex-col items-center sm:border-r-2 sm:border-purple-500 sm:pr-4'>
              <h5 className='font-semibold text-lg sm:text-xl md:text-2xl text-center mb-2 bg-white py-2 px-4 rounded-md text-black shadow-md'>
                White Moves
              </h5>
              <div className='w-full max-w-[300px] sm:max-w-[350px] overflow-y-auto'>
                <ul className='list-none text-sm sm:text-base space-y-2 text-center pt-4'>
                  {whiteMoves.map((move, index) => (
                    <li key={index} className='text-center'>
                      <span className='font-semibold'>{index * 2 + 1}.</span>{' '}
                      {move}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='flex flex-col items-center sm:pl-4'>
              <h5 className='font-semibold text-lg sm:text-xl md:text-2xl text-center mb-2 bg-black py-2 px-4 rounded-md text-white shadow-md'>
                Black Moves
              </h5>
              <div className='w-full max-w-[300px] sm:max-w-[350px] overflow-y-auto'>
                <ul className='list-none text-sm sm:text-base space-y-2 text-center pt-4'>
                  {blackMoves.map((move, index) => (
                    <li key={index} className='text-center'>
                      <span className='font-semibold'>{index * 2 + 2}.</span>{' '}
                      {move}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Resign Button (visible if game is not over) */}
          {!isGameOver && (
            <button
              onClick={handleResignClick}
              className='w-full bg-purple-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-transform duration-300 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 mt-8'
            >
              Resign
            </button>
          )}

          {/* Confirmation Dialog */}
          {showConfirm && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white rounded-lg p-4 shadow-lg max-w-xs w-full'>
                <h4 className='text-lg font-semibold text-black'>
                  Are you sure you want to resign?
                </h4>
                <div className='flex justify-around mt-4'>
                  <button
                    onClick={handleConfirmResign}
                    className='bg-green-600 text-white font-bold py-2 px-4 rounded-lg'
                  >
                    Yes
                  </button>
                  <button
                    onClick={handleCancelResign}
                    className='bg-red-600 text-white font-bold py-2 px-4 rounded-lg'
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
