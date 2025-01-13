import Footer from './components/Footer'
import './styles/globals.css'
import { ReactNode } from 'react'
import { Inconsolata } from 'next/font/google'
import Navbar from './components/Navbar'

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
      <body
        className={`${inconsolata.className} flex flex-col min-h-screen bg-gradient-to-br from-purple-900 to-black text-white`}
      >
        <nav className='bg-gray-900 text-white p-4'>
          <Navbar />
        </nav>
        <main className='w-full mx-auto flex-grow flex items-center justify-center p-8'>
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  )
}

export default Layout
