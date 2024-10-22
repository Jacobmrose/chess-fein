import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './styles/globals.css'
import { ReactNode } from 'react'
import { Inter, Inconsolata } from 'next/font/google'

interface LayoutProps {
  children: ReactNode
}

const inter = Inter({ subsets: ['latin'] })
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
      <body className={`${inconsolata.className} flex flex-col min-h-screen`}>
        <nav className='bg-blue-600 text-white p-4'>
          <Navbar />
        </nav>
        <main className='w-full mx-auto flex-grow flex items-center justify-center'>
          {children}
        </main>
        <footer className='bg-blue-600 text-white p-4'>
          <Footer />
        </footer>
      </body>
    </html>
  )
}

export default Layout
