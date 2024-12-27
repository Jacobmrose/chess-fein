'use client'

import React from 'react'
import {
  GiCastle,
  GiCrossedSwords,
  GiCheckMark,
  GiChessKing,
  GiPerspectiveDiceSixFacesRandom,
} from 'react-icons/gi'

import { FaChessBoard } from 'react-icons/fa'

const BoardSetup: React.FC = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-purple-900 to-black flex flex-col items-center px-6 pt-10 pb-10'>
      {/* Board Setup Icon */}
      <FaChessBoard className='text-6xl mb-4' />

      {/* Page Title */}
      <h1 className='text-5xl font-bold text-white mt-4'>
        Understanding the Initial Board Setup
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
              The game begins with a specific arrangement of pieces on the
              chessboard. Each player controls 16 pieces: 1 king, 1 queen, 2
              rooks, 2 knights, 2 bishops, and 8 pawns.
            </li>
            <li>
              The chessboard is composed of 64 squares, alternating between
              light and dark colors. The light-colored squares are always on the
              right-hand side of each player when setting up the board.
            </li>
            <li>
              The pieces are arranged as follows:
              <ul className='list-disc list-inside pl-6'>
                <li>Pawns are placed on the second and seventh ranks.</li>
                <li>
                  The back rank (1st for white, 8th for black) holds the more
                  significant pieces: rooks, knights, bishops, the queen, and
                  the king.
                </li>
              </ul>
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Detailed Piece Setup Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Detailed Piece Setup</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>White Pieces:</span>
              <ul className='list-disc list-inside pl-6'>
                <li>
                  <span className='font-semibold'>1st Rank:</span> From left to
                  right: rook, knight, bishop, queen, king, bishop, knight,
                  rook.
                </li>
                <li>
                  <span className='font-semibold'>2nd Rank:</span> All 8 pawns
                  are placed across the second rank.
                </li>
              </ul>
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Black Pieces:</span>
              <ul className='list-disc list-inside pl-6'>
                <li>
                  <span className='font-semibold'>8th Rank:</span> From left to
                  right: rook, knight, bishop, queen, king, bishop, knight,
                  rook.
                </li>
                <li>
                  <span className='font-semibold'>7th Rank:</span> All 8 pawns
                  are placed across the seventh rank.
                </li>
              </ul>
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Importance of Piece Placement Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>
            Why Proper Piece Placement Matters
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              The correct placement of pieces is crucial because it ensures that
              all pieces can move according to their specific rules. Any
              misplacement can disrupt a player's ability to execute tactics and
              strategies effectively.
            </li>
            <li>
              The pawns are crucial in controlling the center and preventing the
              opponent from advancing. Their correct placement allows for better
              control and movement of other pieces.
            </li>
            <li>
              The rooks, knights, bishops, queen, and king must be positioned so
              that they support each other and can coordinate to control
              important squares on the board.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Important Notes Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>
            Important Notes on Board Setup
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Queen Placement:
              </span>{' '}
              The white queen is placed on the white (light-colored) square,
              while the black queen is placed on the black (dark-colored)
              square.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>King Placement:</span>{' '}
              The king is always placed next to the queen. It's important to
              remember the king's relative placement to the queen and the need
              for castling later in the game.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Pawns:</span> At the
              start of the game, pawns are placed on the second and seventh
              ranks, which allows them to advance and control key squares in the
              opening phase of the game.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Board Setup Common Mistakes Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>
            Common Mistakes to Avoid in Board Setup
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Incorrect Queen Placement:
              </span>{' '}
              Always remember the queen's color. Misplacing the queen can
              confuse the player and lead to the wrong strategy or moves.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Confusing King and Queen Placement:
              </span>{' '}
              The king and queen must be placed next to each other on the back
              rank. The king's relative position to the queen is key for future
              moves and castling.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Ignoring Pawn Structure:
              </span>{' '}
              The placement of pawns directly impacts the structure of your
              position. Make sure pawns are lined up properly and are not
              obstructing other pieces.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Board Setup Tips Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>
            Tips for Effective Board Setup
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Position Your Rooks:
              </span>{' '}
              Rooks should be positioned in a way that they can easily control
              open files as soon as the game progresses.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Knight Placement:
              </span>{' '}
              Knights should ideally be placed on the board early, controlling
              the center and helping to defend your pawns.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Bishop Coordination:
              </span>{' '}
              Try to place your bishops on long diagonals, as they are more
              effective in the center of the board where they can control many
              squares.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Think About Pawn Structure:
              </span>{' '}
              The initial pawn setup will define the pace of the game. Be sure
              to move pawns effectively in the opening to control the center and
              prepare for further piece development.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>
        {/* Learn About Other Fundamentals Section */}
        <section className='mt-16'>
          <h2 className='text-2xl font-semibold text-white mb-6 text-center'>
            Learn About Other Fundamentals
          </h2>
          <div className='flex justify-center gap-16'>
            <div
              className='cursor-pointer'
              onClick={() => (window.location.href = '/learn/en-passant')}
              title='En Passant'
            >
              <GiPerspectiveDiceSixFacesRandom className='text-4xl text-white hover:text-yellow-400' />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => (window.location.href = '/learn/castling')}
              title='Castling'
            >
              <GiCastle className='text-4xl text-white hover:text-yellow-400' />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => (window.location.href = '/learn/draws')}
              title='Draws'
            >
              <GiCheckMark className='text-4xl text-white hover:text-yellow-400' />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => (window.location.href = '/learn/checkmate')}
              title='Checkmate'
            >
              <GiChessKing className='text-4xl text-white hover:text-yellow-400' />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => (window.location.href = '/learn/tactics')}
              title='Tactics'
            >
              <GiCrossedSwords className='text-4xl text-white hover:text-yellow-400' />
            </div>
          </div>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>
      </div>
    </div>
  )
}

export default BoardSetup
