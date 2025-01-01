'use client'

import React from 'react'
import {
  FaChessPawn,
  FaChessBishop,
  FaChessKing,
  FaChessQueen,
  FaChessRook,
  FaChessKnight,
} from 'react-icons/fa'

const Bishop: React.FC = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-purple-900 to-black flex flex-col items-center px-6 pt-10 pb-10'>
      {/* Chess Bishop Icon */}
      <FaChessBishop className='text-6xl mb-4' />

      {/* Page Title */}
      <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4'>
        Mastering the Bishop
      </h1>

      {/* Content Wrapper */}
      <div className='mt-12 max-w-4xl sm:max-w-5xl text-white space-y-8'>
        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Core Functionalities Section */}
        <section>
          <h2 className='text-2xl sm:text-3xl font-semibold mb-6'>
            Core Functionalities
          </h2>
          <ul className='list-disc list-inside space-y-4 text-base sm:text-lg leading-relaxed'>
            <li>
              Bishops move diagonally across the board for any number of
              squares.
            </li>
            <li>
              Each bishop remains on its starting color (light or dark squares)
              throughout the game.
            </li>
            <li>
              Bishops are long-range pieces, ideal for controlling open
              diagonals.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Tips and Tricks Section */}
        <section>
          <h2 className='text-2xl sm:text-3xl font-semibold mb-6'>
            Tips and Tricks
          </h2>
          <ul className='list-disc list-inside space-y-4 text-base sm:text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Control open diagonals:
              </span>{' '}
              Place your bishops on open diagonals to maximize their range and
              effectiveness.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Coordinate with pawns:
              </span>{' '}
              Use your pawns to create strong squares for your bishops and block
              enemy pieces.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Beware of blocked bishops:
              </span>{' '}
              Avoid placing your bishops behind your own pawns, as this reduces
              their effectiveness.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Common Strategies Section */}
        <section>
          <h2 className='text-2xl sm:text-3xl font-semibold mb-6'>
            Common Strategies
          </h2>
          <ul className='list-disc list-inside space-y-4 text-base sm:text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>Fianchetto:</span>{' '}
              Develop a bishop to b2 or g2 (for white) or b7 or g7 (for black)
              to control long diagonals.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Bishop pairs:</span>{' '}
              Retain both bishops in open positions; they work well together to
              dominate the board.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Advanced Strategies Section */}
        <section>
          <h2 className='text-2xl sm:text-3xl font-semibold mb-6'>
            Advanced Strategies
          </h2>
          <ul className='list-disc list-inside space-y-4 text-base sm:text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>Bishop Pair:</span>{' '}
              Keeping both bishops in the game often provides a huge advantage,
              particularly on an open board. They can cover more squares and
              coordinate well with each other, especially in the middle and
              endgames.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Bishop Maneuvers:
              </span>{' '}
              Bishops can be repositioned using clever maneuvering to control
              key squares. This is especially useful when the opponent has
              closed the center.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Common Mistakes to Avoid Section */}
        <section>
          <h2 className='text-2xl sm:text-3xl font-semibold mb-6'>
            Common Mistakes to Avoid
          </h2>
          <ul className='list-disc list-inside space-y-4 text-base sm:text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Neglecting the Bishop Pair:
              </span>{' '}
              Losing one bishop early in the game without good reason can weaken
              your position, especially in open positions.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Blocking Your Own Bishop:
              </span>{' '}
              Avoid placing pawns in front of your bishops, especially in the
              early and middle game, as this reduces their mobility.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Famous Bishop Tactics Section */}
        <section>
          <h2 className='text-2xl sm:text-3xl font-semibold mb-6'>
            Famous Bishop Tactics
          </h2>
          <ul className='list-disc list-inside space-y-4 text-base sm:text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>Bishop Pin:</span> Pin
              an opponent&apos;s piece (usually a knight or queen) to a more
              valuable piece (like a king or rook), making it immobile.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Bishop and Knight Checkmate:
              </span>{' '}
              A classic endgame technique where a bishop and knight work
              together to deliver checkmate.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Bishop and Pawn Endgames Section */}
        <section>
          <h2 className='text-2xl sm:text-3xl font-semibold mb-6'>
            Bishop and Pawn Endgames
          </h2>
          <ul className='list-disc list-inside space-y-4 text-base sm:text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Bishop and Passed Pawns:
              </span>{' '}
              Bishops are powerful in endgames, especially when paired with
              passed pawns. The bishop can help shepherd the pawn to promotion.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Opposite-Colored Bishop Endgames:
              </span>{' '}
              When the opponent has a bishop on the opposite color complex,
              creating a passed pawn can be a decisive advantage.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Positional Play Section */}
        <section>
          <h2 className='text-2xl sm:text-3xl font-semibold mb-6'>
            Positional Play
          </h2>
          <ul className='list-disc list-inside space-y-4 text-base sm:text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Bishop Activity:
              </span>{' '}
              Try to place your bishop on a long diagonal, where it can control
              key squares, especially in open positions.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Centralized Bishop:
              </span>{' '}
              A bishop placed in the center can exert control over many squares,
              increasing its power.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Learn About Other Pieces Section */}
        <section className='mt-16'>
          <h2 className='text-2xl sm:text-3xl font-semibold text-white mb-6 text-center'>
            Learn About Other Pieces
          </h2>
          <div className='flex flex-wrap justify-center gap-8 sm:gap-16'>
            <div
              className='cursor-pointer'
              onClick={() => (window.location.href = '/learn/pawn')}
              title='Pawn'
            >
              <FaChessPawn className='text-4xl sm:text-5xl text-white hover:text-yellow-400' />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => (window.location.href = '/learn/knight')}
              title='Knight'
            >
              <FaChessKnight className='text-4xl sm:text-5xl text-white hover:text-yellow-400' />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => (window.location.href = '/learn/rook')}
              title='Rook'
            >
              <FaChessRook className='text-4xl sm:text-5xl text-white hover:text-yellow-400' />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => (window.location.href = '/learn/queen')}
              title='Queen'
            >
              <FaChessQueen className='text-4xl sm:text-5xl text-white hover:text-yellow-400' />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => (window.location.href = '/learn/king')}
              title='King'
            >
              <FaChessKing className='text-4xl sm:text-5xl text-white hover:text-yellow-400' />
            </div>
          </div>
        </section>
        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>
      </div>
    </div>
  )
}

export default Bishop
