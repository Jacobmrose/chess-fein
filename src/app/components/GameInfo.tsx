import React, { useState } from 'react'
import Link from 'next/link' // Import Link for navigation

interface GameInfoProps {
  moves: string[]
  onResign: () => void
  onResetGame: () => void // Add onResetGame prop
  color: 'white' | 'black' // Add color prop
  isGameOver: boolean // Add isGameOver prop
}

const GameInfo: React.FC<GameInfoProps> = ({
  moves,
  onResign,
  onResetGame, // Destructure onResetGame
  color,
  isGameOver,
}) => {
  const [showConfirm, setShowConfirm] = useState(false) // State to control the confirmation dialog

  // Separate moves into two columns
  const whiteMoves = moves.filter((_, index) => index % 2 === 0) // Even indices for white moves
  const blackMoves = moves.filter((_, index) => index % 2 === 1) // Odd indices for black moves

  const handleResignClick = () => {
    if (!isGameOver) {
      setShowConfirm(true) // Show confirmation dialog
    }
  }

  const handleConfirmResign = () => {
    onResign() // Call the resign function
    setShowConfirm(false) // Close the confirmation dialog
  }

  const handleCancelResign = () => {
    setShowConfirm(false) // Close the confirmation dialog without resigning
  }

  return (
    <div className='mt-20 p-4 w-full max-w-[75vmin] bg-purple-900 bg-opacity-90 text-white rounded-lg shadow-lg'>
      <h3 className='text-xl font-bold text-center'>Game Info</h3>
      <h4 className='font-semibold text-center mt-5 mb-5'>Move History</h4>
      <div className='flex justify-around space-x-4'>
        {/* Column for White Moves */}
        <div className='flex flex-col'>
          <h5 className='font-semibold text-center'>White Moves</h5>
          <ul className='list-disc list-inside text-sm space-y-1 max-h-64 overflow-y-auto text-left'>
            {whiteMoves.map((move, index) => (
              <li key={index} className='text-left'>
                <span className='font-semibold'>{index * 2 + 1}.</span> {move}
              </li>
            ))}
          </ul>
        </div>

        {/* Column for Black Moves */}
        <div className='flex flex-col'>
          <h5 className='font-semibold text-center'>Black Moves</h5>
          <ul className='list-disc list-inside text-sm space-y-1 max-h-64 overflow-y-auto text-left'>
            {blackMoves.map((move, index) => (
              <li key={index} className='text-left'>
                <span className='font-semibold'>{index * 2 + 2}.</span> {move}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Resign Button, only show if the game is not over */}
      {!isGameOver && (
        <button
          onClick={handleResignClick}
          className='w-full bg-purple-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-transform duration-300 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 z-10 mt-8'
        >
          Resign
        </button>
      )}

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white rounded-lg p-4 shadow-lg'>
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

      {/* After Game Over Buttons */}
      {isGameOver && (
        <div className='flex justify-around mt-4 mb-4'>
          <Link href='/' passHref>
            <button className=' bg-purple-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-transform duration-300 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 z-10'>
              Back to Home
            </button>
          </Link>
          <button
            onClick={onResetGame} // Invoke onResetGame when Play Again is clicked
            className=' bg-purple-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-transform duration-300 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 z-10'
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}

export default GameInfo
