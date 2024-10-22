'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { log } from 'console'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email,
          password,
        }
      )

      // Set success message
      setMessage('Login successful!') // Indicate successful login
      console.log(response)

      // Redirect to the home page after a 2-second delay
      setTimeout(() => {
        router.push('/') // Adjust this path as needed
      }, 2000) // 2000 milliseconds = 2 seconds
    } catch (error: any) {
      // Log the error message
      console.error('Login error:', error.response?.data)
      setMessage(
        error.response?.data.message || 'Login failed. Please try again.'
      )
    }
  }

  return (
    <div className='flex flex-col items-center justify-center p-4 bg-gray-100 w-full'>
      <h2 className='text-2xl font-bold mb-4'>Login</h2>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded-lg shadow-md w-full max-w-sm'
      >
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='border p-2 rounded w-full mb-4'
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='border p-2 rounded w-full mb-4'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600'
        >
          Login
        </button>
      </form>
      {message && <p className='mt-4 text-red-500'>{message}</p>}
    </div>
  )
}

export default Login
