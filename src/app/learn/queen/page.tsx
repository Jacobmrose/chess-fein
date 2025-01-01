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

const Queen: React.FC = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-purple-900 to-black flex flex-col items-center px-6 pt-10 pb-10'>
      {/* Chess Queen Icon */}
      <FaChessQueen className='text-6xl mb-4' />

      {/* Page Title */}
      <h1 className='text-5xl font-bold text-white mt-4'>
        Mastering the Queen
      </h1>

      {/* Content Wrapper */}
      <div className='mt-12 max-w-5xl text-white space-y-16'>
        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Core Functionalities Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Core Functionalities</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              The queen is the most powerful piece, able to move any number of
              squares vertically, horizontally, or diagonally.
            </li>
            <li>
              It captures pieces by landing on the square occupied by an
              opponent&apos;s piece.
            </li>
            <li>
              Combining the movement capabilities of both the rook and the
              bishop, the queen excels in open positions.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Tips and Tricks Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Tips and Tricks</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Centralize the queen:
              </span>{' '}
              Position the queen in the center of the board (e4, d4, e5, d5) to
              maximize its influence.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Don&apos;t bring it out too early:
              </span>{' '}
              Avoid exposing the queen in the opening, as it can become a target
              for your opponent&apos;s pieces.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Coordinate with other pieces:
              </span>{' '}
              Work with rooks, bishops, and knights to create powerful attacks.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Avoid overextension:
              </span>{' '}
              Keep the queen safe and avoid leaving it exposed to threats.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Endgame dominance:
              </span>{' '}
              Use the queen&apos;s mobility to control multiple squares and
              dominate the endgame.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Common Strategies Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Common Strategies</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Queen-king attacks:
              </span>{' '}
              Pair the queen with the king for checkmating patterns like the
              &quot;queen and king mate.&quot;
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Pin and fork:</span>{' '}
              Use the queen to pin opponent pieces or threaten forks to win
              material.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Control open files and diagonals:
              </span>{' '}
              Place the queen on open files or diagonals to apply pressure on
              the opponent&apos;s position.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Queen sacrifices:
              </span>{' '}
              Consider sacrificing the queen for a decisive attack or forced
              mate in advanced games.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Advanced Strategies Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Advanced Strategies</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Queen and rook coordination:
              </span>{' '}
              Use the queen and rook in tandem to create powerful attacks,
              especially in open files.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Queen sacrifices for checkmate:
              </span>{' '}
              Sometimes, sacrificing the queen can create an unstoppable attack
              or lead to a forced mate.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Centralization:</span>{' '}
              The queen is at its best when it controls key squares from the
              center. Avoid cornering it early.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Common Mistakes to Avoid Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>
            Common Mistakes to Avoid
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Exposing the queen too early:
              </span>{' '}
              Bringing the queen out early makes it vulnerable to attacks from
              the opponent&apos;s pieces.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Lack of coordination:
              </span>{' '}
              The queen alone is powerful, but coordinating with other pieces is
              essential for a successful attack.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Overextending:</span>{' '}
              Don&apos;t send the queen too far into enemy territory without
              sufficient backup, as it can become isolated and trapped.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Famous Queen Tactics Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Famous Queen Tactics</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>Queen forks:</span>{' '}
              Use the queen to attack two or more pieces at once, forcing the
              opponent into a difficult position.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Queen pins:</span> Pin
              an opponent&apos;s piece to their king or a more valuable piece,
              making it unable to move without consequences.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Queen sacrifice:
              </span>{' '}
              In some advanced tactics, sacrificing the queen can lead to a
              checkmate or a decisive material advantage.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Endgame Queen Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Queen Endgames</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Queen vs. Rook endgames:
              </span>{' '}
              Understanding how to checkmate with a queen against a rook is
              crucial in endgame positions.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Queen and pawn promotion:
              </span>{' '}
              A queen and a passed pawn can often dominate in the endgame.
              Protect the pawn and push for promotion.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Using the queen for checkmate:
              </span>{' '}
              Mastering queen checkmating patterns is key to winning endgames
              efficiently.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>
        {/* Learn About Other Pieces Section */}
        <section className='mt-16'>
          <h2 className='text-2xl font-semibold text-white mb-6 text-center'>
            Learn About Other Pieces
          </h2>
          <div className='flex justify-center gap-16'>
            <div
              className='cursor-pointer'
              onClick={() => (window.location.href = '/learn/pawn')}
              title='Pawn'
            >
              <FaChessPawn className='text-4xl text-white hover:text-yellow-400' />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => (window.location.href = '/learn/knight')}
              title='Knight'
            >
              <FaChessKnight className='text-4xl text-white hover:text-yellow-400' />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => (window.location.href = '/learn/bishop')}
              title='Bishop'
            >
              <FaChessBishop className='text-4xl text-white hover:text-yellow-400' />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => (window.location.href = '/learn/rook')}
              title='Rook'
            >
              <FaChessRook className='text-4xl text-white hover:text-yellow-400' />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => (window.location.href = '/learn/king')}
              title='King'
            >
              <FaChessKing className='text-4xl text-white hover:text-yellow-400' />
            </div>
          </div>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>
      </div>
    </div>
  )
}

export default Queen
