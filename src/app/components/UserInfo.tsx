'use client'

import { useState, useEffect } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { usePathname } from 'next/navigation'

const UserInfo: React.FC = () => {
  const { user, isLoading } = useUser()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()

  const toggleDropdown = () => setDropdownOpen((prev) => !prev)

  const handleLogout = () => {
    setTimeout(() => {
      window.location.href = '/api/auth/logout'
      toast.success('Successfully logged out!')
    }, 100)
    setDropdownOpen(false)
  }

  useEffect(() => {
    setDropdownOpen(false)
  }, [pathname])

  return (
    <div className='relative'>
      <button onClick={toggleDropdown} className='flex items-center'>
        <FaUserCircle size={24} />
      </button>
      {dropdownOpen && (
        <div className='absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white border rounded shadow-lg z-10'>
          <div className='px-4 py-2'>
            {isLoading ? (
              <p>Loading...</p>
            ) : user ? (
              <div>
                <p className='text-sm text-gray-800'>{user.name}</p>
                <p className='text-sm text-gray-800'>{user.email}</p>
                <Link
                  href='/profile'
                  className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className='block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200'
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href='/api/auth/login'
                className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserInfo
