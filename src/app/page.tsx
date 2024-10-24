'use client'

import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function Home() {
  const { user, isLoading } = useUser() // Get user info and loading state from auth0
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isCooldown, setIsCooldown] = useState(false)
  const router = useRouter()

  const handleGuestLogin = async () => {
    if (loading || isCooldown) {
      return // Prevents executing if already loading or in cooldown
    }

    setLoading(true)
    setMessage('') // Clear previous messages

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/guest`
      )
      localStorage.setItem('token', response.data.token) // Store the token in local storage
      setMessage(response.data.message)

      // Immediately set cooldown after successful login
      setIsCooldown(true)

      // Redirect to the game page after a short delay
      setTimeout(() => {
        router.push('/play')
      }, 2000)
    } catch (error: any) {
      console.error('Guest login error:', error)
      setMessage(
        error.response?.data?.message ||
          'Failed to log in as guest. Please try again.'
      )
    } finally {
      setLoading(false)

      setTimeout(() => {
        setIsCooldown(false) // Reset cooldown after 4 seconds
      }, 4000)
    }
  }

  return (
    <div className='w-full flex flex-col items-center justify-center h-screen bg-gray-100 p-4'>
      <img src='/chess-fein.png' alt='Chess Fein Logo' className='h-24 mb-4' />
      <h1 className='text-4xl md:text-6xl font-bold mb-6 text-center'>
        Welcome to Chess Fein
      </h1>

      {/* Conditionally render content based on user authentication status */}
      {!isLoading && !user ? (
        <>
          <p className='mb-4 text-xl text-center'>
            Sign in, sign up, or play as a guest!
          </p>
          <div className='flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0'>
            {/* Login Button */}
            <Link
              href='/api/auth/login'
              className='bg-blue-500 text-white font-bold py-3 px-6 rounded hover:bg-blue-700 transition-colors duration-300 text-center'
            >
              Login
            </Link>

            {/* Register Button */}
            <Link
              href='/api/auth/login' // same as login page may change this to a combined button
              className='bg-green-500 text-white font-bold py-3 px-6 rounded hover:bg-green-700 transition-colors duration-300 text-center'
            >
              Register
            </Link>

            {/* Guest Login Button */}
            <button
              onClick={handleGuestLogin}
              disabled={loading || isCooldown} // Disable button during loading and cooldown
              className={`bg-gray-500 text-white font-bold py-3 px-6 rounded transition-colors duration-300 text-center ${
                loading || isCooldown
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-700'
              }`}
            >
              {loading ? 'Loading...' : 'Play as Guest'}
            </button>
          </div>
        </>
      ) : (
        <p className='mt-6 max-w-md mx-auto text-center text-lg'>
          Open-source chess application that integrates real-time gameplay with
          advanced analysis using the Stockfish engine, offering a user-friendly
          platform for chess enthusiasts and developers alike.
        </p>
      )}

      {message && <p className='mt-4 text-red-500'>{message}</p>}
    </div>
  )
}
