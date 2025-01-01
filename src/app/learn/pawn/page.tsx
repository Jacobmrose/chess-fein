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

const Pawn: React.FC = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-purple-900 to-black flex flex-col items-center px-6 pt-10 pb-10'>
      {/* Chess Pawn Icon */}
      <FaChessPawn className='text-6xl mb-4' />

      {/* Page Title */}
      <h1 className='text-5xl font-bold text-white mt-4'>Mastering the Pawn</h1>

      {/* Content Wrapper */}
      <div className='mt-12 max-w-5xl text-white space-y-16'>
        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Core Functionalities Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Core Functionalities</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>Pawns move forward one square but capture diagonally.</li>
            <li>On their first move, pawns can advance two squares.</li>
            <li>
              Pawns can promote to any other piece (except the king) when they
              reach the opposite end of the board.
            </li>
            <li>
              The special capture &quot;en passant&quot; allows pawns to take an
              adjacent pawn that has just advanced two squares.
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
                Control the center:
              </span>{' '}
              Use pawns to control key central squares (e4, d4, e5, d5) early in
              the game.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Support your pieces:
              </span>{' '}
              Pawns are excellent for defending stronger pieces like knights and
              bishops.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Advance with caution:
              </span>{' '}
              Avoid pushing pawns unnecessarily, as this can create weaknesses.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Create pawn chains:
              </span>{' '}
              Link pawns diagonally to provide mutual protection.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Use passed pawns:
              </span>{' '}
              A passed pawn (one without opposing pawns to block it) is a
              powerful endgame asset.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Avoid isolated pawns:
              </span>{' '}
              Pawns without neighboring pawns to support them are vulnerable to
              attack.
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
              <span className='font-bold text-yellow-400'>Pawn storms:</span> In
              certain positions, pushing pawns aggressively toward the
              opponent&apos;s king can lead to devastating attacks.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Endgame promotion:
              </span>{' '}
              Use pawns to create a promotion threat in the endgame, forcing
              your opponent to focus on defense.
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
              <span className='font-bold text-yellow-400'>Pawn breaks:</span> A
              pawn break is a strategic pawn push to open up the position,
              typically used to break through the opponent&apos;s pawn
              structure.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Pawn structure:</span>{' '}
              Understanding pawn structures, such as the pawn majority or
              isolated pawns, can help plan your attacks and defenses more
              effectively.
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
                Overextending pawns:
              </span>{' '}
              Pushing pawns too far without sufficient support can create weak
              squares and targets for your opponent.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Neglecting pawn structure:
              </span>{' '}
              Disrupting your pawn structure can weaken your position, so be
              mindful of unnecessary pawn moves.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Famous Pawn Tactics Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Famous Pawn Tactics</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>Pawn forks:</span>{' '}
              Pawns can create forks, attacking two enemy pieces simultaneously.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Pawn promotions:
              </span>{' '}
              Promoting a pawn into a queen, rook, or knight is a common tactic,
              especially in the endgame, to gain a material advantage.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Pawn Endgames Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Pawn Endgames</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>Passed pawns:</span> A
              passed pawn, one with no opposing pawns blocking its advance, is a
              powerful asset in the endgame.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Pawn majority:</span>{' '}
              In endgames, having a pawn majority (more pawns on one side of the
              board) can be crucial to advancing your pawns.
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
              <span className='font-bold text-yellow-400'>Pawn structure:</span>{' '}
              The pawn structure determines the dynamics of the game, so
              understanding how to form and break pawn chains is essential.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Blocking passed pawns:
              </span>{' '}
              Using your pawns to block the advance of your opponent&apos;s
              passed pawns is an important defensive strategy.
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

export default Pawn
