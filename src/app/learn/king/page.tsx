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

const King: React.FC = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-purple-900 to-black flex flex-col items-center px-6 pt-10'>
      {/* Chess King Icon */}
      <FaChessKing className='text-6xl mb-4' />

      {/* Page Title */}
      <h1 className='text-5xl font-bold text-white mt-4'>Mastering the King</h1>

      {/* Content Wrapper */}
      <div className='mt-12 max-w-5xl text-white space-y-16'>
        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Core Functionalities Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Core Functionalities</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              The king can move one square in any direction: vertically,
              horizontally, or diagonally.
            </li>
            <li>
              The king cannot move into a square that is under attack by an
              opponent’s piece.
            </li>
            <li>
              Castling allows the king to move two squares toward a rook, and
              the rook moves to the square next to the king. Certain conditions
              must be met:
              <ul className='list-disc list-inside pl-6 space-y-1'>
                <li>
                  Neither the king nor the rook involved has moved before.
                </li>
                <li>No pieces are between the king and the rook.</li>
                <li>
                  The king is not in check, nor does it move through or land in
                  a square under attack.
                </li>
              </ul>
            </li>
            <li>
              The king must avoid check (direct attack) and cannot remain in
              check. If the king cannot escape check, it is checkmate, and the
              game is over.
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
                Prioritize safety:
              </span>{' '}
              Keep the king safe by castling early in the game, especially to
              protect it from central attacks.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Active in the endgame:
              </span>{' '}
              Use the king as an active piece in the endgame to support pawns
              and control key squares.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Avoid unnecessary exposure:
              </span>{' '}
              Don&apos;t move the king into open positions unless it&apos;s safe
              to do so.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Coordinate with other pieces:
              </span>{' '}
              Work with other pieces to set up defenses or create mating
              threats.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Stay central:</span>{' '}
              In the endgame, position the king toward the center of the board
              to maximize its influence.
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
              <span className='font-bold text-yellow-400'>King safety:</span>{' '}
              Avoid keeping the king on open files or diagonals where it can be
              easily attacked.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Endgame dominance:
              </span>{' '}
              Use the king to block or support passed pawns, gaining an
              advantage in pawn races.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Opposition:</span> Use
              the concept of opposition in the endgame to control key squares
              and force the opponent’s king to retreat.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Defense against attacks:
              </span>{' '}
              Keep pawns and pieces near the king to form a protective barrier.
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
                King and pawn endgame:
              </span>{' '}
              Learn the fundamentals of using the king in the endgame to support
              pawns and promote them to a queen.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                King in the center:
              </span>{' '}
              In the endgame, centralizing the king allows it to reach any area
              of the board quickly.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>Active king:</span>{' '}
              Move your king toward the center as the game transitions to the
              endgame to exert maximum influence.
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
                Exposing the king too early:
              </span>{' '}
              Moving the king out too soon or too aggressively can lead to
              attacks and checkmate.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Neglecting castling:
              </span>{' '}
              Delaying or neglecting castling leaves the king vulnerable in the
              center, especially against central attacks.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Lack of king coordination:
              </span>{' '}
              Failing to work with your other pieces to protect the king or set
              up a strong defense can be disastrous.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Famous King Tactics Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Famous King Tactics</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>King walking:</span>{' '}
              In some endgames, the king can &quot;walk&quot; across the board
              to help support pawns and restrict the opponent&apos;s king.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                King and queen coordination:
              </span>{' '}
              In some situations, the king and queen can work together to
              deliver checkmate or put pressure on the opponent&apos;s position.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Back-rank defense:
              </span>{' '}
              A king, in conjunction with pawns, can be used to defend against
              back-rank checkmate threats.
            </li>
          </ul>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>

        {/* Endgame King Section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6'>Endgame King Use</h2>
          <ul className='list-disc list-inside space-y-4 text-lg leading-relaxed'>
            <li>
              <span className='font-bold text-yellow-400'>
                King in endgame:
              </span>{' '}
              The king becomes more powerful in the endgame, helping to support
              pawns and control important squares.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                Opposition in pawn endgames:
              </span>{' '}
              Master the concept of opposition to block your opponent&apos;s
              king and advance your own pawns.
            </li>
            <li>
              <span className='font-bold text-yellow-400'>
                King and pawn endings:
              </span>{' '}
              Learn the key techniques for using the king effectively in pawn
              endgames, such as promoting pawns or stopping the opponent from
              doing so.
            </li>
          </ul>
        </section>
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
              onClick={() => (window.location.href = '/learn/queen')}
              title='Queen'
            >
              <FaChessQueen className='text-4xl text-white hover:text-yellow-400' />
            </div>
          </div>
        </section>

        {/* Decorative Divider */}
        <div className='border-t border-gray-600 w-full'></div>
      </div>
    </div>
  )
}

export default King
