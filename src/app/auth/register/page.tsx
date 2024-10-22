'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          username,
          email,
          password,
        }
      )
      setMessage(response.data.message)

      // Redirect to the login page after a 2-second delay
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
    } catch (error: any) {
      setMessage(error.response?.data.message || 'Registration failed.')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center p-4 bg-gray-100 w-full'>
      <h2 className='text-2xl font-bold mb-4'>Register</h2>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded-lg shadow-md w-full max-w-sm'
      >
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className='border p-2 rounded w-full mb-4'
        />
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
          Register
        </button>
      </form>
      {message && <p className='mt-4 text-red-500'>{message}</p>}
    </div>
  )
}

export default Register
