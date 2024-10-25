import Footer from './components/Footer'
import NavbarWrapper from './components/NavbarWrapper' // Import the new NavbarWrapper
import './styles/globals.css'
import { ReactNode } from 'react'
import { Inconsolata } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { ToastContainer } from 'react-toastify' // Import ToastContainer

interface LayoutProps {
  children: ReactNode
}

const inconsolata = Inconsolata({ subsets: ['latin'] })

// Metadata export
export const metadata = {
  title: 'Chess Fein',
  description:
    'An online Chess Game portfolio project developed by Jacob Rose, featuring real-time gameplay and advanced chess analysis.',
  keywords:
    'Next.js, Typescript, TailwindCSS, Chess, Stockfish, Chess Analysis, Chess Engine',
}

// Viewport export
export const generateViewport = () => ({
  width: 'device-width',
  initialScale: 1,
})

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <UserProvider>
        <body
          className={`${inconsolata.className} flex flex-col min-h-screen bg-gradient-to-br from-purple-900 to-black text-white`}
        >
          <NavbarWrapper /> {/* Use the NavbarWrapper component here */}
          <main className='w-full mx-auto flex-grow flex items-center justify-center p-8'>
            {children}
          </main>
          <footer>
            <Footer />
          </footer>
          <ToastContainer
            position='top-center'
            autoClose={5000} // 5 secs before autoclose
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnHover
            pauseOnFocusLoss
          />
        </body>
      </UserProvider>
    </html>
  )
}

export default Layout
