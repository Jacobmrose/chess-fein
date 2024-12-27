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

const EnPassant: React.FC = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-purple-900 to-black flex flex-col items-center px-6 pt-10 pb-10'>
      {/* En Passant Icon */}
      <GiPerspectiveDiceSixFacesRandom className='text-6xl mb-4' />

      {/* Page Title */}
      <h1 className='text-5xl font-bold text-white mt-4'>
        Mastering En Passant
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
              En Passant is a special pawn capture that occurs when an
              opponent's pawn moves two squares forward from its starting
              position, landing beside your pawn.
            </li>
            <li>
              You can capture the opponent’s pawn as if it had only moved one
              square forward, but this move must be made immediately after the
              two-square advance.
            </li>
            <li>
              The capture happens diagonally, and the opponent's pawn is removed
              from the board.
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
              <span className='font-bold text-yellow-400'>Act Quickly:</span> If
              you want to use En Passant, make sure to capture the pawn
              immediately after it moves two squares. If you wait, the
              opportunity will be lost.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Avoid Giving Your Opponent the Chance:
              </span>{' '}
              When advancing pawns, be aware that an opponent could capture your
              pawn with En Passant if you move it two squares forward and leave
              it vulnerable.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Use En Passant to Gain Material:
              </span>{' '}
              En Passant can help you eliminate an opponent’s pawn and
              potentially gain an advantage in material if they make an
              unfortunate move.
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
              <span className='font-bold text-yellow-400'>Defensive Use:</span>{' '}
              Use En Passant to capture an opponent’s advancing pawn that
              threatens your structure, especially if it leaves your pawn in a
              vulnerable position.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Maintain the Threat:
              </span>{' '}
              If you are playing a defensive game, keep your pawns positioned so
              that En Passant can be a potential threat, forcing your opponent
              to be cautious when advancing pawns.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Opening the Board:
              </span>{' '}
              When in the opening, be mindful of how advancing pawns could set
              up an En Passant capture that could help you open lines or gain
              central control.
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
                Missing the Opportunity:
              </span>{' '}
              Failing to recognize when En Passant is available can cost you an
              important capture.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Using En Passant Hastily:
              </span>{' '}
              Don’t rush into En Passant just because it's an option; sometimes
              it’s better to develop other pieces or wait for a better moment.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Leaving Your Pawns Vulnerable:
              </span>{' '}
              If you advance your pawns too early without considering En
              Passant, your opponent may take advantage of the opportunity.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Famous En Passant Tactics Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>
            Famous En Passant Tactics
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                The Unexpected Capture:
              </span>{' '}
              Surprise your opponent by using En Passant when they think their
              pawn is safe from capture after advancing two squares.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Breaking the Pawn Structure:
              </span>{' '}
              Use En Passant to break your opponent's pawn structure, especially
              if it opens a file or diagonal for your pieces.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Positional Play Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>
            Positional Play with En Passant
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Control the Center:
              </span>{' '}
              En Passant can be a powerful weapon in the center of the board,
              where pawns are often advancing, and it can help you break your
              opponent’s formation.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Pawn Chains:</span> Be
              careful when creating pawn chains, as your opponent might take
              advantage of En Passant to disrupt your structure.
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
              onClick={() => (window.location.href = '/learn/castling')}
              title='Castling'
            >
              <GiCastle className='text-4xl text-white hover:text-yellow-400' />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => (window.location.href = '/learn/board-setup')}
              title='Board Setup'
            >
              <FaChessBoard className='text-4xl text-white hover:text-yellow-400' />
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

export default EnPassant
