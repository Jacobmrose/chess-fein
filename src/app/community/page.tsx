'use client'

import React from 'react'
import { FaGithub, FaDiscord } from 'react-icons/fa'
import { GiTeamIdea, GiCalendar } from 'react-icons/gi'

const Community: React.FC = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-purple-900 to-black flex flex-col items-center px-4 sm:px-6 pt-8'>
      {/* Community Title Section */}
      <h1 className='text-3xl md:text-4xl font-bold mt-12 md:mt-16 text-white text-center'>
        Join the Chess Fein Community
      </h1>
      <p className='mt-4 text-base md:text-lg text-purple-300 text-center max-w-3xl'>
        Connect with chess enthusiasts, get involved in discussions, share
        feedback, and enhance your skills with free coaching. Chess Fein’s
        community is here to support your chess journey.
      </p>

      {/* Community Features Section */}
      <h2 className='text-2xl md:text-3xl font-semibold mt-12 md:mt-16 text-white text-center'>
        Explore Our Features
      </h2>
      <div className='mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl px-2'>
        {/* GitHub Repository */}
        <div className='bg-purple-900 p-6 md:p-8 rounded-lg shadow-md hover:bg-gray-700 transition cursor-pointer flex flex-col items-center justify-center'>
          <FaGithub className='text-white w-12 md:w-20 h-12 md:h-20 mb-2 md:mb-4' />
          <h3 className='text-lg md:text-xl font-semibold mb-1 md:mb-2 text-white text-center'>
            GitHub Repository
          </h3>
          <p className='text-sm md:text-base text-purple-300 text-center'>
            Explore the source code, submit issues, and contribute to the Chess
            Fein project.
          </p>
          <button
            className='mt-3 md:mt-4 px-4 md:px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-300 hover:text-black transition'
            onClick={() =>
              window.open('https://github.com/Jacobmrose/chess-fein', '_blank')
            }
          >
            Visit GitHub
          </button>
        </div>

        {/* Discord Server */}
        <div className='bg-purple-900 p-6 md:p-8 rounded-lg shadow-md hover:bg-gray-700 transition cursor-pointer flex flex-col items-center justify-center'>
          <FaDiscord className='text-white w-12 md:w-20 h-12 md:h-20 mb-2 md:mb-4' />
          <h3 className='text-lg md:text-xl font-semibold mb-1 md:mb-2 text-white text-center'>
            Join Our Discord
          </h3>
          <p className='text-sm md:text-base text-purple-300 text-center'>
            Connect with other players, get coaching, and participate in
            community events.
          </p>
          <button
            className='mt-3 md:mt-4 px-4 md:px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-300 hover:text-black transition'
            onClick={() =>
              window.open('https://discord.gg/JPykzz8J7f', '_blank')
            }
          >
            Join Discord
          </button>
        </div>

        {/* Community Events */}
        <div className='bg-purple-900 p-6 md:p-8 rounded-lg shadow-md hover:bg-gray-700 transition cursor-pointer flex flex-col items-center justify-center'>
          <GiCalendar className='text-white w-12 md:w-20 h-12 md:h-20 mb-2 md:mb-4' />
          <h3 className='text-lg md:text-xl font-semibold mb-1 md:mb-2 text-white text-center'>
            Community Events
          </h3>
          <p className='text-sm md:text-base text-purple-300 text-center'>
            Stay up to date with coaching sessions, Q&As, and other events
            hosted by our community.
          </p>
          <button
            className='mt-3 md:mt-4 px-4 md:px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-300 hover:text-black transition'
            onClick={() =>
              window.open('https://discord.gg/JPykzz8J7f', '_blank')
            }
          >
            View Events
          </button>
        </div>

        {/* Submit Feedback */}
        <div className='bg-purple-900 p-6 md:p-8 rounded-lg shadow-md hover:bg-gray-700 transition cursor-pointer flex flex-col items-center justify-center'>
          <GiTeamIdea className='text-white w-12 md:w-20 h-12 md:h-20 mb-2 md:mb-4' />
          <h3 className='text-lg md:text-xl font-semibold mb-1 md:mb-2 text-white text-center'>
            Submit Feedback
          </h3>
          <p className='text-sm md:text-base text-purple-300 text-center'>
            Help us improve by submitting suggestions or reporting issues. Your
            feedback matters!
          </p>
          <button
            className='mt-3 md:mt-4 px-4 md:px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-300 hover:text-black transition'
            onClick={() =>
              window.open('https://discord.gg/JPykzz8J7f', '_blank')
            }
          >
            Submit Feedback
          </button>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className='mt-12 md:mt-16 flex flex-col items-center mb-12 md:mb-16'>
        <h3 className='text-xl md:text-2xl font-semibold text-white text-center'>
          Be Part of Our Growing Community
        </h3>
        <p className='text-sm md:text-base text-purple-300 text-center mt-2 md:mt-4 max-w-2xl'>
          Chess is more than a game—it’s a journey. Join Chess Fein’s community
          to connect, learn, and grow as a player.
        </p>
        <button
          className='mt-6 md:mt-8 px-6 md:px-8 py-2 md:py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-300 hover:text-black transition'
          onClick={() => (window.location.href = '/')}
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default Community
