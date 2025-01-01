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

const Draws: React.FC = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-purple-900 to-black flex flex-col items-center px-6 pt-10 pb-10'>
      {/* Draws Icon */}
      <GiCheckMark className='text-6xl mb-4' />

      {/* Page Title */}
      <h1 className='text-5xl font-bold text-white mt-4'>
        Understanding Draws in Chess
      </h1>

      {/* Content Wrapper */}
      <div className='mt-12 max-w-5xl text-white space-y-16'>
        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Core Functionalities Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>What is a Draw?</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              A draw in chess occurs when the game ends in a tie. This can
              happen in a variety of ways, and no player wins.
            </li>
            <li>
              Draws can be the result of a stalemate, insufficient material,
              agreement between both players, the fifty-move rule, or threefold
              repetition.
            </li>
            <li>
              Draws are often used by players to avoid losing when they’re at a
              disadvantage, or when neither player can make progress.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Types of Draws Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Types of Draws</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>Stalemate:</span> A
              stalemate occurs when one player is not in check, but they have no
              legal moves. The game immediately ends in a draw.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Insufficient Material:
              </span>{' '}
              If a player has no sufficient material to checkmate the opponent
              (e.g., king vs king), the game is declared a draw.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Fifty-Move Rule:
              </span>{' '}
              If no capture or pawn move has occurred in the last 50 moves by
              either player, a player can claim a draw. This rule prevents games
              from dragging on indefinitely without progress.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Threefold Repetition:
              </span>{' '}
              If the same position appears three times on the board with the
              same player to move, the game can be claimed as a draw. This is
              known as threefold repetition.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Mutual Agreement:
              </span>{' '}
              Both players can agree to a draw at any point during the game,
              often when neither player can win.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* How to Avoid Draws Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>How to Avoid Draws</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Aggressive Play:
              </span>{' '}
              Avoid passive play that allows your opponent to force a draw.
              Always strive for active piece movement and control of the center.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Avoid Repetitive Moves:
              </span>{' '}
              Repeating the same moves too often can lead to a threefold
              repetition draw. Always look for new tactics and strategies to
              break the repetition.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Create Winning Chances:
              </span>{' '}
              In cases where you are ahead in material, try to simplify the
              position and force your opponent into a losing scenario. Do not
              settle for perpetual checks or deadlocked positions.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Prevent Stalemate:
              </span>{' '}
              Ensure that your opponent always has a legal move, especially when
              they are in a corner. Avoid situations where you could
              inadvertently force a stalemate, especially in endgames.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Keep Pawns Active:
              </span>{' '}
              In endgames, always keep your pawns moving forward to create
              threats. Pawns that remain passive can lead to a draw due to lack
              of progress.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Common Mistakes Leading to Draws Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>
            Common Mistakes Leading to Draws
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Overestimating a Draw:
              </span>{' '}
              Sometimes players settle for a draw prematurely, thinking they are
              in a losing position, when they might have had a winning
              opportunity.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Ignoring the 50-Move Rule:
              </span>{' '}
              If you’ve made many moves without a capture or pawn advance, you
              may be able to claim a draw. Don’t forget this rule if the game is
              nearing its 50-move threshold.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Excessive Repetition of Moves:
              </span>{' '}
              Repeating moves too frequently can force a threefold repetition
              draw, especially when you’re ahead in material or in a winning
              position.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Inability to Convert Advantage:
              </span>{' '}
              Players sometimes struggle to convert a material advantage into a
              win, resulting in a draw. Always aim to simplify the position and
              use your advantage to create a winning plan.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Draw Scenarios to Watch Out For Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>
            Draw Scenarios to Watch Out For
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Stalemate in Endgames:
              </span>{' '}
              A common endgame mistake is placing your opponent&apos;s king in a
              stalemate position. Ensure they always have legal moves to prevent
              this.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Threefold Repetition in Complex Positions:
              </span>{' '}
              In complex tactical positions, players can easily fall into
              threefold repetition traps. Pay attention to the board and avoid
              repeating the same moves.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Insufficient Material for Checkmate:
              </span>{' '}
              Always be aware of situations where you or your opponent may not
              have enough material to checkmate. A lone king, or a king and
              bishop/knight against a lone king, can lead to a draw.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Famous Draws Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>
            Famous Draws in Chess History
          </h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                Fischer vs. Petrosian (1971):
              </span>{' '}
              A draw by repetition after several moves in a complex endgame.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Karpov vs. Korchnoi (1978):
              </span>{' '}
              A highly contested World Chess Championship match that featured
              multiple draws, including several forced draws due to threefold
              repetition.
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

export default Draws
