'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import {
  FaChessPawn,
  FaChessKnight,
  FaChessRook,
  FaChessBishop,
  FaChessQueen,
  FaChessKing,
  FaChessBoard,
} from 'react-icons/fa'
import {
  GiCastle,
  GiCrossedSwords,
  GiCheckMark,
  GiChessKing,
  GiPerspectiveDiceSixFacesRandom,
} from 'react-icons/gi'

const Learn: React.FC = () => {
  const router = useRouter()

  const handleNavigation = (topic: string) => {
    router.push(`/learn/${topic.toLowerCase().replace(' ', '-')}`)
  }

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-purple-900 to-black flex flex-col items-center px-4 pt-8'>
      {/* Chess Pieces Section */}
      <h1 className='text-4xl font-bold mt-16 text-white'>The Chess Pieces</h1>
      <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl'>
        {[
          {
            name: 'Pawn',
            desc: 'It moves forward one square, captures diagonally.',
            icon: <FaChessPawn />,
          },
          {
            name: 'Knight',
            desc: 'It moves in an L shape.',
            icon: <FaChessKnight />,
          },
          {
            name: 'Bishop',
            desc: 'It moves any number of squares diagonally.',
            icon: <FaChessBishop />,
          },
          {
            name: 'Rook',
            desc: 'It moves any number of squares vertically or horizontally.',
            icon: <FaChessRook />,
          },
          {
            name: 'Queen',
            desc: 'It moves any number of squares in any direction.',
            icon: <FaChessQueen />,
          },
          {
            name: 'King',
            desc: 'The most important piece. It moves one square in any direction.',
            icon: <FaChessKing />,
          },
        ].map((piece) => (
          <div
            key={piece.name}
            className='bg-purple-900 p-8 rounded-lg shadow-md hover:bg-gray-700 transition cursor-pointer flex flex-col items-center justify-center w-full h-64'
            onClick={() => handleNavigation(piece.name)}
          >
            <div className='w-20 h-20 flex items-center justify-center mb-4'>
              <piece.icon.type className='text-white w-full h-full' />
            </div>
            <h2 className='text-xl font-semibold mb-2 text-white text-center'>
              {piece.name}
            </h2>
            <p className='text-purple-300 text-center'>{piece.desc}</p>
          </div>
        ))}
      </div>

      {/* Fundamentals Section */}
      <h1 className='text-4xl font-bold mt-16 text-white'>Fundamentals</h1>
      <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl mb-24'>
        {[
          {
            name: 'En Passant',
            desc: 'A special pawn capture.',
            icon: <GiPerspectiveDiceSixFacesRandom />,
          },
          {
            name: 'Castling',
            desc: 'A king and rook move simultaneously.',
            icon: <GiCastle />,
          },
          {
            name: 'Board Setup',
            desc: 'Initial positioning of the pieces.',
            icon: <FaChessBoard />,
          },
          {
            name: 'Draws',
            desc: 'How a game can end in a tie.',
            icon: <GiCheckMark />,
          },
          {
            name: 'Checkmate',
            desc: 'Winning the game by trapping the king.',
            icon: <GiChessKing />,
          },
          {
            name: 'Tactics',
            desc: 'Special strategies to gain an advantage.',
            icon: <GiCrossedSwords />,
          },
        ].map((fundamental) => (
          <div
            key={fundamental.name}
            className='bg-purple-900 p-8 rounded-lg shadow-md hover:bg-gray-700 transition cursor-pointer flex flex-col items-center justify-center w-full h-64'
            onClick={() => handleNavigation(fundamental.name)}
          >
            <div className='w-20 h-20 flex items-center justify-center mb-4'>
              <fundamental.icon.type className='text-white w-full h-full' />
            </div>
            <h2 className='text-xl font-semibold mb-2 text-white text-center'>
              {fundamental.name}
            </h2>
            <p className='text-purple-300 text-center'>{fundamental.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Learn
