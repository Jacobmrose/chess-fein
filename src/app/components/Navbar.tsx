'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

function Navbar() {
  const pathname = usePathname()
  const [isNavOpen, setIsNavOpen] = useState(false)

  // Function to determine if a link is active
  const isActive = (path: string) => pathname === path

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev)
  }

  return (
    <nav className='text-xl max-w-5xl mx-auto py-4 flex flex-col md:flex-row items-center justify-evenly'>
      {/* Home Logo */}
      <Link
        href='/'
        aria-label='Home'
        className={`flex items-center ${
          isActive('/') ? 'text-blue-500 font-bold' : ''
        } hover:underline`}
      >
        <img
          src='/chess-fein.png' // Correct path to your image in the public directory
          alt='Chess Fein Logo'
          className='h-8' // Adjust height to be more visible
        />
      </Link>

      {/* Arrow Button for mobile menu */}
      <button
        className='md:hidden flex items-center justify-center p-2 text-white'
        onClick={toggleNav}
        aria-label='Toggle navigation'
        aria-expanded={isNavOpen}
      >
        {/* Down Arrow when collapsed */}
        <svg
          className={`h-6 w-6 ${isNavOpen ? 'hidden' : 'block'}`}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M6 9l6 6 6-6'
          />
        </svg>

        {/* Up Arrow when expanded */}
        <svg
          className={`h-6 w-6 ${isNavOpen ? 'block' : 'hidden'}`}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M6 15l6-6 6 6'
          />
        </svg>
      </button>

      {/* Navbar Links */}
      <div
        className={`flex-col md:flex-row items-center gap-6 md:gap-10 ${
          isNavOpen ? 'flex' : 'hidden'
        } md:flex justify-between w-full md:w-auto`}
      >
        <Link
          href='/play'
          aria-label='Play'
          className={`${
            isActive('/play') ? 'text-blue-500 font-bold' : ''
          } hover:underline`}
        >
          Play
        </Link>
        <Link
          href='/about'
          aria-label='About'
          className={`${
            isActive('/about') ? 'text-blue-500 font-bold' : ''
          } hover:underline`}
        >
          About
        </Link>
        <Link
          href='/history'
          aria-label='History'
          className={`${
            isActive('/history') ? 'text-blue-500 font-bold' : ''
          } hover:underline`}
        >
          History
        </Link>
        <Link
          href='/profile'
          aria-label='Profile'
          className={`${
            isActive('/profile') ? 'text-blue-500 font-bold' : ''
          } hover:underline`}
        >
          Profile
        </Link>
        <Link
          href='/settings'
          aria-label='Settings'
          className={`${
            isActive('/settings') ? 'text-blue-500 font-bold' : ''
          } hover:underline`}
        >
          Settings
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
