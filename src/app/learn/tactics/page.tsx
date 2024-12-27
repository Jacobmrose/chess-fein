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

const Tactics: React.FC = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-purple-900 to-black flex flex-col items-center px-6 pt-10 pb-10'>
      {/* Tactics Icon */}
      <GiCrossedSwords className='text-6xl mb-4' />

      {/* Page Title */}
      <h1 className='text-5xl font-bold text-white mt-4'>
        Mastering Chess Tactics
      </h1>

      {/* Content Wrapper */}
      <div className='mt-12 max-w-5xl text-white space-y-16'>
        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Core Functionalities Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>
            What Are Chess Tactics?
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              Chess tactics are short-term calculations and strategies used to
              gain an advantage over your opponent. Unlike chess strategy, which
              focuses on the long-term plan, tactics focus on immediate results.
            </li>
            <li>
              They involve using pieces in specific patterns to win material,
              checkmate the opponent’s king, or force favorable positions.
            </li>
            <li>
              A solid understanding of tactics is key to becoming a strong chess
              player, as they allow you to spot opportunities for gaining
              material or achieving checkmate.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Common Chess Tactics Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Common Chess Tactics</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>Fork:</span> A fork is
              a tactic where a single piece attacks two or more of the
              opponent’s pieces at the same time, forcing them into a difficult
              position. Knights are especially effective at forking, but any
              piece can execute a fork.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Pin:</span> A pin
              occurs when a piece is immobilized because moving it would expose
              a more valuable piece behind it. A piece pinned to the opponent's
              king cannot move, creating tactical opportunities.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Skewer:</span> A
              skewer is similar to a pin, but the more valuable piece is in
              front. When the piece in front moves, the less valuable piece is
              exposed and can be captured.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Discovered Attack:
              </span>{' '}
              A discovered attack occurs when one piece moves, revealing an
              attack from another piece. This can be used to attack multiple
              targets at once, often catching your opponent off guard.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Double Attack:</span>{' '}
              A double attack happens when two pieces threaten two of the
              opponent’s pieces at the same time. This forces the opponent to
              choose which piece to save, often leading to material gain.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Zwischenzug (Intermediate Move):
              </span>{' '}
              This tactic involves making a surprising, intermediate move to
              disrupt your opponent’s calculations. It is often used in tactical
              combinations to gain the upper hand in a position.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Back Rank Mate:</span>{' '}
              This occurs when a rook or queen checkmates the opponent’s king,
              which is trapped on the back rank by its own pieces. This is a
              common tactical pattern in endgames.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Sacrifice:</span> A
              sacrifice involves intentionally giving up material, often a piece
              or a pawn, to gain a tactical advantage. Sacrifices can lead to
              checkmate or winning more material in the long run.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Tactics by Piece Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Tactics by Piece</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>Knight Tactics:</span>{' '}
              The knight is an excellent piece for forks and can jump over other
              pieces. Knights can create confusion and imbalance on the board,
              often exploiting gaps in the opponent’s defense.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Rook Tactics:</span>{' '}
              Rooks are powerful on open files and ranks, often used for pins,
              skewers, and doubling up on the same file. Rooks can also be part
              of tactical combinations that involve heavy attacks.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Bishop Tactics:</span>{' '}
              Bishops can control long diagonals and are ideal for attacking
              from a distance. They are especially useful in skewers and
              long-range pins.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Queen Tactics:</span>{' '}
              The queen is the most powerful piece on the board and can perform
              a wide variety of tactical tricks, from forks and skewers to
              discovered attacks and double attacks.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>King Tactics:</span>{' '}
              While not usually involved in tactical attacks, the king can
              become an important piece in endgames. Using the king actively in
              the endgame, for example, in "king and pawn" tactics, can create
              threats and avoid stalemate.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Tactical Motifs Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>
            Tactical Motifs in Chess
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>Decoy:</span> A decoy
              involves luring an opponent's piece or king to a specific square
              to trap them or allow for a greater tactical threat.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Overloading:</span>{' '}
              Overloading occurs when a piece is tasked with multiple defensive
              duties, making it impossible to defend everything. The overloaded
              piece can be targeted for a tactical gain.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Underpromotion:</span>{' '}
              Underpromotion is a rare tactic where a pawn is promoted to a
              piece other than a queen, often a knight, to create a checkmate or
              avoid a stalemate.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Interference:</span>{' '}
              Interference involves moving one of your pieces between an
              opponent’s attacking piece and its target, disrupting their
              threat.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Deflection:</span>{' '}
              Deflection is when you force an opponent’s piece away from a key
              square, making their position weaker and allowing you to
              capitalize on it.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Creating Combinations Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>
            Creating Tactical Combinations
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Look for Weaknesses:
              </span>{' '}
              To create a tactical combination, first identify your opponent’s
              weaknesses, such as unprotected pieces, open lines, or vulnerable
              squares.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Coordinate Your Pieces:
              </span>{' '}
              Effective tactics often require coordination between pieces.
              Combining the power of your pieces on the same target can lead to
              devastating tactical combinations.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Use Tactical Patterns:
              </span>{' '}
              Knowing common tactical patterns, such as forks, pins, and
              skewers, allows you to quickly spot opportunities during the game.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Calculate Variations:
              </span>{' '}
              Always calculate several moves ahead. Tactical combinations often
              require careful calculation to ensure that no counterattacks are
              possible.
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
          </div>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>
      </div>
    </div>
  )
}

export default Tactics
