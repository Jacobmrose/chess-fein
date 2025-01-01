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

const Castling: React.FC = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-purple-900 to-black flex flex-col items-center px-4 pt-6 pb-6 sm:px-6 sm:pt-10 sm:pb-10'>
      {/* Castling Icon */}
      <GiCastle className='text-6xl mb-4 sm:text-5xl md:text-6xl' />

      {/* Page Title */}
      <h1 className='text-4xl font-bold text-white mt-4 text-center sm:text-3xl md:text-4xl'>
        Mastering Castling
      </h1>

      {/* Content Wrapper */}
      <div className='mt-6 sm:mt-12 max-w-full text-white space-y-12 px-4 sm:max-w-5xl sm:px-6'>
        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Core Functionalities Section */}
        <section>
          <h2 className='text-2xl font-semibold mb-6 text-center sm:text-2xl'>
            Core Functionalities
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed sm:text-base'>
            <li>
              Castling is a special move in chess where the king and a rook move
              simultaneously.
            </li>
            <li>
              There are two types of castling: kingside (short castling) and
              queenside (long castling).
            </li>
            <li>
              The king moves two squares towards the rook, and the rook moves to
              the square next to the king on the opposite side.
            </li>
            <li>
              To perform castling, the king and rook must meet specific
              conditions:
              <ul className='list-disc list-inside pl-6 sm:text-base'>
                <li>
                  The king and rook involved must not have moved previously.
                </li>
                <li>There must be no pieces between the king and rook.</li>
                <li>
                  The king cannot be in check, and the squares it moves over
                  must not be under attack.
                </li>
              </ul>
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Tips and Tricks Section */}
        <section>
          <h2 className='text-2xl font-semibold mb-6 text-center sm:text-2xl'>
            Tips and Tricks
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed sm:text-base'>
            <li>
              <span className='font-bold text-yellow-400'>Castle Early:</span>{' '}
              Castling early in the game can help protect your king and connect
              your rooks.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Avoid Delaying Castling:
              </span>{' '}
              Delaying castling can leave your king vulnerable in the center,
              where it may be exposed to attacks.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>King Safety:</span>{' '}
              Always castle to ensure your king is placed in a safe position,
              preferably behind pawns that can protect it.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Consider Your Rooks:
              </span>{' '}
              Castle to activate your rook, as rooks are most powerful when
              placed in the center or open files.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Common Strategies Section */}
        <section>
          <h2 className='text-2xl font-semibold mb-6 text-center sm:text-2xl'>
            Common Strategies
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed sm:text-base'>
            <li>
              <span className='font-bold text-yellow-400'>King Safety:</span>{' '}
              Always consider the safety of your king when castling. Avoid
              castling into positions where your opponent has a strong attacking
              potential.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Kingside vs. Queenside Castling:
              </span>{' '}
              Kingside castling is usually safer since the king is closer to the
              edge of the board and more protected by pawns. Queenside castling
              can be more aggressive but often more vulnerable.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Connect Your Rooks:
              </span>{' '}
              By castling, you bring your rooks together and open the
              possibility of placing them on central files or other active
              squares.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Common Mistakes to Avoid Section */}
        <section>
          <h2 className='text-2xl font-semibold mb-6 text-center sm:text-2xl'>
            Common Mistakes to Avoid
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed sm:text-base'>
            <li>
              <span className='font-bold text-yellow-400'>
                Delayed Castling:
              </span>{' '}
              Delaying castling too long can expose your king to attacks,
              especially in the middle game.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Castling Into Danger:
              </span>{' '}
              Be cautious about castling into an area where the opponent has
              strong attacking pieces, such as a developed queen or bishop.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Not Considering the Rook&apos;s Role:
              </span>{' '}
              Don&apos;t castle just to &quot;move&quot; your rook; ensure
              castling will help you position your rook for future play, ideally
              along open files.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Famous Castling Tactics Section */}
        <section>
          <h2 className='text-2xl font-semibold mb-6 text-center sm:text-2xl'>
            Famous Castling Tactics
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed sm:text-base'>
            <li>
              <span className='font-bold text-yellow-400'>
                Castling to Avoid Attack:
              </span>{' '}
              In some positions, castling is the best way to avoid a check or
              threatening piece targeting your king.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                The King&apos;s Safety Trap:
              </span>{' '}
              Castling can be used to move the king to a safer position while
              attacking the opponent&apos;s weaknesses.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Early Development:
              </span>{' '}
              Castling can also be a way to speed up your overall development,
              especially when you need to bring your rooks into the game.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Positional Play Section */}
        <section>
          <h2 className='text-2xl font-semibold mb-6 text-center sm:text-2xl'>
            Positional Play with Castling
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed sm:text-base'>
            <li>
              <span className='font-bold text-yellow-400'>Defensive Play:</span>{' '}
              Castling early allows for better defense as it moves the king out
              of the center and behind pawns.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Attacking Plans:
              </span>{' '}
              Consider queenside castling for an aggressive play, opening the
              possibility of an attack on the opponent&apos;s kingside.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Learn About Other Fundamentals Section */}
        <section className='mt-16'>
          <h2 className='text-xl sm:text-2xl font-semibold text-white mb-6 text-center'>
            Learn About Other Fundamentals
          </h2>
          <div className='flex flex-wrap justify-center gap-8 sm:gap-16'>
            <div
              className='cursor-pointer'
              onClick={() => (window.location.href = '/learn/en-passant')}
              title='En Passant'
            >
              <GiPerspectiveDiceSixFacesRandom className='text-3xl sm:text-4xl text-white hover:text-yellow-400' />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => (window.location.href = '/learn/board-setup')}
              title='Board Setup'
            >
              <FaChessBoard className='text-3xl sm:text-4xl text-white hover:text-yellow-400' />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => (window.location.href = '/learn/draws')}
              title='Draws'
            >
              <GiCheckMark className='text-3xl sm:text-4xl text-white hover:text-yellow-400' />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => (window.location.href = '/learn/checkmate')}
              title='Checkmate'
            >
              <GiChessKing className='text-3xl sm:text-4xl text-white hover:text-yellow-400' />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => (window.location.href = '/learn/tactics')}
              title='Tactics'
            >
              <GiCrossedSwords className='text-3xl sm:text-4xl text-white hover:text-yellow-400' />
            </div>
          </div>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>
      </div>
    </div>
  )
}

export default Castling
