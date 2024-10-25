'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import Navbar from './Navbar'

const NavbarWrapper: React.FC = () => {
  const { user, isLoading } = useUser()

  // Render Navbar only if the user is authenticated
  return (
    <>
      {user && !isLoading && (
        <nav className='bg-gray-900 text-white p-4'>
          <Navbar />
        </nav>
      )}
    </>
  )
}

export default NavbarWrapper
