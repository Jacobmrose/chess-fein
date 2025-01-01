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

const Knight: React.FC = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-purple-900 to-black flex flex-col items-center px-6 pt-10 pb-10'>
      {/* Chess Knight Icon */}
      <FaChessKnight className='text-6xl mb-4' />

      {/* Page Title */}
      <h1 className='text-5xl font-bold text-white mt-4'>
        Mastering the Knight
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
              Knights move in an &quot;L&quot; shape: two squares in one
              direction and one in a perpendicular direction.
            </li>
            <li>
              Knights are the only pieces that can &quot;jump&quot; over other
              pieces.
            </li>
            <li>
              Knights attack the eight squares around them in their
              &quot;L&quot; pattern.
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
                Centralize your knights:
              </span>{' '}
              Knights are most powerful in the center of the board, where they
              can control up to eight squares.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Outpost squares:
              </span>{' '}
              Place knights on squares that cannot be attacked by enemy pawns
              (e.g., d5 or e5).
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Knights in closed positions:
              </span>{' '}
              Use knights effectively in positions with locked pawns, as they
              excel in maneuverability.
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
              <span className='font-bold text-yellow-400'>Forks:</span> Knights
              can attack two or more pieces simultaneously, creating tactical
              opportunities.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Blockading pawns:
              </span>{' '}
              Use knights to block advanced enemy pawns, as their flexibility
              makes them ideal for this role.
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
                Knight Maneuvers:
              </span>{' '}
              Use knights to jump to key squares, often maneuvering them around
              pawns to gain tactical advantages.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Knight Pair:</span>{' '}
              When both knights remain on the board, they can work well
              together, controlling many squares and offering great tactical
              flexibility.
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
                Misplacing Knights:
              </span>{' '}
              Avoid moving your knights to the edge of the board, where they
              have fewer options and less influence.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Delayed Development:
              </span>{' '}
              Don’t delay knight development too much; knights should be brought
              into play early to help control the center.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Famous Knight Tactics Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Famous Knight Tactics</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>Knight Fork:</span> A
              powerful tactic where the knight attacks two or more pieces at
              once, often leading to material gain.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Knight Checkmate:
              </span>
              In endgames, knights can deliver checkmate, particularly in
              coordination with other pieces.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Knight Endgames Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Knight Endgames</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Knight and King Endgames:
              </span>{' '}
              In knight and king endgames, it&apos;s important to keep your king
              active while using your knight to control key squares.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Knight vs. Pawns:
              </span>{' '}
              Knights are excellent at blocking pawns, but be careful not to
              trap your own pieces while trying to stop the opponent&apos;s
              pawns.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Positional Play Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Positional Play</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Centralize Your Knights:
              </span>{' '}
              The center is where knights are most effective, controlling more
              squares and having more options for future moves.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Outposts:</span> Place
              knights on squares that cannot be attacked by enemy pawns to keep
              them safe and active.
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
              onClick={() => (window.location.href = '/learn/queen')}
              title='Queen'
            >
              <FaChessQueen className='text-4xl text-white hover:text-yellow-400' />
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

export default Knight
