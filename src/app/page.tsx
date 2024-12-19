'use client'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-900 to-black w-full px-8 md:px-16 lg:px-32 relative'>
      <h1 className='text-6xl md:text-8xl font-bold mb-40 text-transparent bg-clip-text text-white text-center drop-shadow-lg'>
        Chess Fein
      </h1>
      <p className='mb-24 max-w-md mx-auto text-center text-lg text-white z-10'>
        Open-source chess application that integrates real-time gameplay with
        advanced analysis using the Stockfish engine.
      </p>
    </div>
  )
}
