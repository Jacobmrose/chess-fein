'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import UserInfo from './UserInfo'

function Navbar() {
  const pathname = usePathname()
  const [isNavOpen, setIsNavOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev)
  }

  return (
    <nav className='text-xl max-w-5xl mx-auto py-4 flex flex-col md:flex-row items-center justify-evenly'>
      <Link
        href='/'
        aria-label='Home'
        className={`flex items-center ${
          isActive('/') ? 'text-purple-700 font-bold' : 'text-white'
        } hover:text-purple-500`}
      >
        <img
          src='/chess-fein.png'
          alt='Chess Fein Logo'
          className='h-8 filter invert'
        />
      </Link>

      <button
        className='md:hidden flex items-center justify-center p-2 text-white'
        onClick={toggleNav}
        aria-label='Toggle navigation'
        aria-expanded={isNavOpen}
      >
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

      <div
        className={`flex-col md:flex-row items-center gap-6 md:gap-10 ${
          isNavOpen ? 'flex' : 'hidden'
        } md:flex justify-between w-full md:w-auto`}
      >
        <Link
          href='/play'
          aria-label='Play'
          className={`${
            isActive('/play') ? 'text-purple-700 font-bold' : 'text-white'
          } hover:text-purple-500`}
        >
          Play
        </Link>
        <Link
          href='/about'
          aria-label='About'
          className={`${
            isActive('/about') ? 'text-purple-700 font-bold' : 'text-white'
          } hover:text-purple-500`}
        >
          About
        </Link>
        <Link
          href='/learn'
          aria-label='Learn'
          className={`${
            isActive('/learn') ? 'text-purple-700 font-bold' : 'text-white'
          } hover:text-purple-500`}
        >
          Learn
        </Link>
        <Link
          href='/puzzles'
          aria-label='Puzzles'
          className={`${
            isActive('/puzzles') ? 'text-purple-700 font-bold' : 'text-white'
          } hover:text-purple-500`}
        >
          Puzzles
        </Link>
        <Link
          href='/community'
          aria-label='Community'
          className={`${
            isActive('/community') ? 'text-purple-700 font-bold' : 'text-white'
          } hover:text-purple-500`}
        >
          Community
        </Link>

        {/* Add UserInfo component here */}
        {/* <UserInfo /> */}
      </div>
    </nav>
  )
}

export default Navbar
