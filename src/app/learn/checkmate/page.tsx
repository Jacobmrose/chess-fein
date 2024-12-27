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

const Checkmate: React.FC = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-purple-900 to-black flex flex-col items-center px-6 pt-10 pb-10'>
      {/* Checkmate Icon */}
      <GiChessKing className='text-6xl mb-4' />

      {/* Page Title */}
      <h1 className='text-5xl font-bold text-white mt-4'>
        Understanding Checkmate in Chess
      </h1>

      {/* Content Wrapper */}
      <div className='mt-12 max-w-5xl text-white space-y-16'>
        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Core Functionalities Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>What is Checkmate?</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              Checkmate is the ultimate goal in chess: to place your opponent’s
              king in a position where it is under attack and cannot escape
              capture.
            </li>
            <li>
              A game ends immediately in checkmate, and the player whose king is
              checkmated loses.
            </li>
            <li>
              The key components of checkmate are attacking the opposing king,
              ensuring that no other moves can remove the threat (no legal
              move), and trapping the king with no escape.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Types of Checkmate Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Types of Checkmate</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Back Rank Checkmate:
              </span>{' '}
              This happens when the opposing king is trapped on the back rank by
              its own pieces, and your rook or queen delivers the check. The
              opponent cannot escape because their own pieces block any attempt
              to move.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Smothered Mate:</span>{' '}
              This occurs when the opponent’s king is surrounded by its own
              pieces, and your knight delivers the check, with no escape squares
              available for the king.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Fool’s Mate:</span>{' '}
              The quickest possible checkmate in chess, where White makes two
              blunders (moving the pawn in front of the king and the queen) and
              Black checkmates in 2 moves.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Queen and King Checkmate:
              </span>{' '}
              A powerful combination used in endgames, where the queen and king
              work together to force the opponent’s king to the edge of the
              board and eventually into a checkmate position.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                King and Rook Checkmate:
              </span>{' '}
              This is a basic but important technique where the king and rook
              work together to trap the opponent’s king on the edge of the board
              and deliver checkmate.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Bishop and King Checkmate:
              </span>{' '}
              A more difficult checkmate, where the bishop and king collaborate
              to checkmate the opponent’s king, often in the corner of the
              board. The position is tricky, as the king must be placed
              correctly.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Rook and King Checkmate:
              </span>{' '}
              This is similar to the queen and king checkmate, where the rook
              and king cooperate to push the opponent’s king toward the edge of
              the board and then deliver checkmate.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Strategies for Achieving Checkmate Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>
            Strategies for Achieving Checkmate
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Control the Center:
              </span>{' '}
              Dominating the center of the board is essential for controlling
              the game and eventually creating checkmate opportunities. Control
              of the center gives your pieces more mobility and makes it easier
              to coordinate checkmate.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Coordinate Pieces:
              </span>{' '}
              Checkmate is usually achieved when your pieces work together.
              Whether it's a king and rook, queen and king, or knight and queen,
              ensure your pieces are supporting each other and working towards a
              common goal.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Push the Opponent’s King to the Edge:
              </span>{' '}
              In many checkmate patterns, the opponent’s king is forced to the
              edge of the board. Whether you are using a rook, queen, or bishop,
              trapping the enemy king against the edge is a key element in
              delivering checkmate.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Avoid Stalemates:
              </span>{' '}
              While going for checkmate, be mindful not to accidentally
              stalemate your opponent. Ensure they have enough legal moves to
              avoid a draw while you set up your checkmate.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Be Patient:</span>{' '}
              Checkmate strategies often require patience. You need to be
              methodical in pushing your opponent’s pieces into a position where
              they cannot escape. Take your time to execute your strategy
              correctly and avoid rushed moves.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Common Mistakes Leading to Checkmate Failure Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>
            Common Mistakes in Checkmate
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Overlooking Escape Routes:
              </span>{' '}
              Sometimes, in the rush to deliver checkmate, players fail to
              notice that the opponent’s king has an escape route. Always check
              for available squares before making your final move.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Allowing Stalemate:
              </span>{' '}
              A common mistake is to deliver checkmate in a way that leaves the
              opponent’s king with no legal moves but also no check. Be aware of
              how your pieces are placed to avoid creating a stalemate.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Rushing the Checkmate:
              </span>{' '}
              Checkmate strategies often require multiple moves. Rushing into it
              without completing the necessary preparations can result in
              blunders or missed opportunities.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Misplacing Pieces:
              </span>{' '}
              Failing to position your pieces in the right spots can hinder your
              ability to checkmate. For instance, putting your rook too far from
              the king could allow the opponent to escape.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Famous Checkmate Patterns Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>
            Famous Checkmate Patterns
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                The Back Rank Mate:
              </span>{' '}
              A classic checkmate pattern where a rook or queen checkmates the
              opposing king on the back rank while the opponent’s pieces block
              any escape.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                The Smothered Mate:
              </span>{' '}
              A pattern where a knight delivers checkmate to a king surrounded
              by its own pieces. Famous in endgames, this checkmate is both
              tricky and elegant.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Queen and King vs. King:
              </span>{' '}
              The fundamental technique for checkmating in endgames, where the
              queen and king work together to methodically drive the opposing
              king to the edge and deliver checkmate.
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
              onClick={() => (window.location.href = '/learn/board-setup')}
              title='Board Setup'
            >
              <FaChessBoard className='text-4xl text-white hover:text-yellow-400' />
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

export default Checkmate
