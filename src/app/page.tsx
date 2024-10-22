'use client'

import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleGuestLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/guest')
      localStorage.setItem('token', response.data.token) // Store the token in local storage
      setMessage(response.data.message)

      // Redirect to the game page after a short delay
      setTimeout(() => {
        router.push('/play') // Redirect to the game page
      }, 2000)
    } catch (error: any) {
      console.error('Guest login error:', error)
      setMessage('Failed to log in as guest. Please try again.')
    }
  }

  return (
    <div className='w-full flex flex-col items-center justify-center h-screen bg-gray-100 p-4'>
      <img
        src='/chess-fein.png' //
        alt='Chess Fein Logo'
        className='h-24 mb-4' //
      />
      <h1 className='text-4xl md:text-6xl font-bold mb-6 text-center'>
        Welcome to Chess Fein
      </h1>
      <p className='mb-4 text-xl text-center'>
        Sign in, sign up, or play as a guest!
      </p>
      <div className='flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0'>
        <Link
          href='/auth/login'
          className='bg-blue-500 text-white font-bold py-3 px-6 rounded hover:bg-blue-700 transition-colors duration-300 text-center'
        >
          Login
        </Link>
        <Link
          href='/auth/register'
          className='bg-green-500 text-white font-bold py-3 px-6 rounded hover:bg-green-700 transition-colors duration-300 text-center'
        >
          Register
        </Link>
        <button
          onClick={handleGuestLogin}
          className='bg-gray-500 text-white font-bold py-3 px-6 rounded hover:bg-gray-700 transition-colors duration-300 text-center'
        >
          Play as Guest
        </button>
      </div>
      {message && <p className='mt-4 text-red-500'>{message}</p>}
    </div>
  )
}
