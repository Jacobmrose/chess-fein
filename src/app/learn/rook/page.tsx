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

const Rook: React.FC = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-purple-900 to-black flex flex-col items-center px-6 pt-10 pb-10'>
      {/* Chess Rook Icon */}
      <FaChessRook className='text-6xl mb-4' />

      {/* Page Title */}
      <h1 className='text-5xl font-bold text-white mt-4'>Mastering the Rook</h1>

      {/* Content Wrapper */}
      <div className='mt-12 max-w-5xl text-white space-y-16'>
        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Core Functionalities Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Core Functionalities</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              Rooks move horizontally or vertically across any number of
              squares.
            </li>
            <li>Rooks are key pieces for controlling open files and ranks.</li>
            <li>
              During castling, a rook moves toward the king as part of the
              maneuver.
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
                Control open files:
              </span>{' '}
              Place your rooks on open or semi-open files to maximize their
              range and influence.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Double rooks:</span>{' '}
              Stack your rooks on the same file to amplify their attacking
              potential.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Coordinate with the king:
              </span>{' '}
              Activate your rooks in the endgame alongside your king for
              effective attacks.
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
                Rook on the 7th rank:
              </span>{' '}
              Place your rook on the opponent’s 7th rank to attack pawns and
              restrict the king’s movement.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Rook endgame dominance:
              </span>{' '}
              Rooks excel in endgames; keep them active to create threats and
              support pawn promotion.
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
              <span className='font-bold text-yellow-400'>Rook Lift:</span> A
              rook lift involves moving a rook up to a rank where it can swing
              to the center or other side of the board for an attack. This is
              especially useful for creating threats against the opponent’s
              king.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Use the Rook Pair Effectively:
              </span>{' '}
              Rooks work best when paired, as they can defend each other,
              control adjacent files, and create significant tactical threats.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Cutting Off the King:
              </span>{' '}
              In the endgame, use your rook to cut off the opponent’s king from
              accessing key ranks or files, often sealing a winning position.
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
                Premature Rook Activity:
              </span>{' '}
              Avoid moving your rooks out too early, as they can be easily
              harassed by smaller pieces. Rooks are most effective on open or
              semi-open files later in the game.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Leaving the Rooks Passive:
              </span>{' '}
              A passive rook (e.g., one stuck behind pawns) is a significant
              liability. Always aim to activate your rooks.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Famous Rook Tactics Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Famous Rook Tactics</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>Back Rank Mate:</span>{' '}
              A rook can deliver checkmate on the back rank if the opponent's
              king is trapped by its own pawns and has no escape squares.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Rook Fork:</span> Use
              your rook to attack two pieces simultaneously (e.g., a king and
              another undefended piece), forcing the opponent to lose material.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Rook Sacrifice:</span>{' '}
              Sometimes sacrificing a rook (e.g., on h8 or h1) can expose the
              opponent's king to a decisive attack, especially when paired with
              other active pieces.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Rook and Pawn Endgames Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>
            Rook and Pawn Endgames
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Lucena Position:
              </span>{' '}
              A fundamental rook endgame technique where your rook supports a
              pawn promotion by creating a "bridge."
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Philidor Position:
              </span>{' '}
              A defensive setup in rook and pawn endgames where the defending
              rook prevents the opponent’s king from advancing.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Passed Pawns:</span>{' '}
              Combine your rook with passed pawns to create promotion threats,
              forcing the opponent into a defensive posture.
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
                Rook on an Open File:
              </span>{' '}
              Always strive to control open files with your rooks. A rook on an
              open file is more powerful than one blocked by pawns.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Rook Behind Passed Pawns:
              </span>{' '}
              Place your rook behind your passed pawn (or the opponent's). This
              maximizes its effectiveness in pushing the pawn forward or
              restricting the opponent.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>King Safety:</span>{' '}
              Use rooks to protect your own king, especially during the middle
              game, by controlling important files and preventing enemy piece
              infiltration.
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

export default Rook
