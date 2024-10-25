// src/app/page.tsx

'use client'

import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function Home() {
  const { user, isLoading } = useUser() // Get user info and loading state from Auth0

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-900 to-black w-full px-8 md:px-16 lg:px-32 relative'>
      {/* <img
        src='/chess-fein.png'
        alt='Chess Fein Logo'
        className='h-32 mb-24 z-10 filter invert'
      /> */}

      {/* Updated Heading */}
      <h1 className='text-6xl md:text-8xl font-bold mb-40 text-transparent bg-clip-text text-white text-center drop-shadow-lg'>
        Chess Fein
      </h1>

      {/* Conditionally render content based on user authentication status */}
      {!isLoading && !user ? (
        <>
          <Link
            href='/api/auth/login'
            className='bg-purple-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-transform duration-300 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 z-10'
          >
            Join the Game
          </Link>
        </>
      ) : (
        <p className='mb-24 max-w-md mx-auto text-center text-lg text-white z-10'>
          Open-source chess application that integrates real-time gameplay with
          advanced analysis using the Stockfish engine.
        </p>
      )}
    </div>
  )
}
