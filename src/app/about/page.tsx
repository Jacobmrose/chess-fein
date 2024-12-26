'use client'
import React from 'react'
import {
  FaChessKing,
  FaChessQueen,
  FaChessPawn,
  FaChessBoard,
} from 'react-icons/fa'
import {
  GiTrophyCup,
  GiChessKing,
  GiCastle,
  GiCrossedSwords,
  GiPerspectiveDiceSixFacesRandom,
} from 'react-icons/gi'

const About: React.FC = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-purple-900 to-black flex flex-col items-center px-4 pt-8'>
      {/* About Title Section */}
      <h1 className='text-4xl font-bold mt-16 text-white text-center'>
        Welcome to Chess Fein
      </h1>
      <p className='mt-4 text-lg text-purple-300 text-center max-w-3xl'>
        Chess Fein is an immersive and dynamic chess platform, offering both
        exciting AI-powered gameplay and a vast library of puzzles designed to
        challenge and improve your skills.
      </p>

      {/* Features Section */}
      <h2 className='text-3xl font-semibold mt-16 text-white text-center'>
        Key Features
      </h2>
      <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 w-full max-w-6xl'>
        {/* Player vs AI with Stockfish */}
        <div className='bg-purple-900 p-8 rounded-lg shadow-md hover:bg-gray-700 transition cursor-pointer flex flex-col items-center justify-center'>
          <div className='w-20 h-20 flex items-center justify-center mb-4'>
            <GiTrophyCup className='text-white w-full h-full' />
          </div>
          <h3 className='text-xl font-semibold mb-2 text-white text-center'>
            Player vs AI (Stockfish)
          </h3>
          <p className='text-purple-300 text-center'>
            Challenge yourself against AI opponents powered by Stockfish, with
            Elo ratings ranging from 1320 to 3190. Perfect for players of all
            skill levels.
          </p>
        </div>

        {/* 20,000 Puzzles with 50+ Themes */}
        <div className='bg-purple-900 p-8 rounded-lg shadow-md hover:bg-gray-700 transition cursor-pointer flex flex-col items-center justify-center'>
          <div className='w-20 h-20 flex items-center justify-center mb-4'>
            <FaChessBoard className='text-white w-full h-full' />
          </div>
          <h3 className='text-xl font-semibold mb-2 text-white text-center'>
            20,000 Puzzles & 50+ Themes
          </h3>
          <p className='text-purple-300 text-center'>
            Sharpen your chess skills with over 20,000 puzzles, covering 50+
            themes like forks, pins, and discovered attacks to elevate your
            gameplay.
          </p>
        </div>

        {/* Custom Move Highlighting */}
        <div className='bg-purple-900 p-8 rounded-lg shadow-md hover:bg-gray-700 transition cursor-pointer flex flex-col items-center justify-center'>
          <div className='w-20 h-20 flex items-center justify-center mb-4'>
            <FaChessPawn className='text-white w-full h-full' />
          </div>
          <h3 className='text-xl font-semibold mb-2 text-white text-center'>
            Custom Move Highlighting
          </h3>
          <p className='text-purple-300 text-center'>
            See every legal move on the board to help visualize strategies and
            plans, making it easier for beginners to learn.
          </p>
        </div>

        {/* Drag and Drop / Click to Move */}
        <div className='bg-purple-900 p-8 rounded-lg shadow-md hover:bg-gray-700 transition cursor-pointer flex flex-col items-center justify-center'>
          <div className='w-20 h-20 flex items-center justify-center mb-4'>
            <GiCastle className='text-white w-full h-full' />
          </div>
          <h3 className='text-xl font-semibold mb-2 text-white text-center'>
            Drag and Drop / Click to Move
          </h3>
          <p className='text-purple-300 text-center'>
            Easily move your pieces by clicking or dragging them on the board,
            offering an intuitive experience for beginners and pros alike.
          </p>
        </div>

        {/* Learning Modules */}
        <div className='bg-purple-900 p-8 rounded-lg shadow-md hover:bg-gray-700 transition cursor-pointer flex flex-col items-center justify-center'>
          <div className='w-20 h-20 flex items-center justify-center mb-4'>
            <GiChessKing className='text-white w-full h-full' />
          </div>
          <h3 className='text-xl font-semibold mb-2 text-white text-center'>
            Learning Modules
          </h3>
          <p className='text-purple-300 text-center'>
            Explore modules focused on individual pieces and key fundamentals
            like en passant, castling, and tactics. Each module introduces
            various themes in the 50+ puzzle library to enhance your
            understanding.
          </p>
        </div>

        {/* Growing Chess Community */}
        <div className='bg-purple-900 p-8 rounded-lg shadow-md hover:bg-gray-700 transition cursor-pointer flex flex-col items-center justify-center'>
          <div className='w-20 h-20 flex items-center justify-center mb-4'>
            <GiCrossedSwords className='text-white w-full h-full' />
          </div>
          <h3 className='text-xl font-semibold mb-2 text-white text-center'>
            Growing Chess Community
          </h3>
          <p className='text-purple-300 text-center'>
            Join a vibrant community of chess enthusiasts always ready to lend a
            hand, whether you're new to the game or a seasoned player.
          </p>
        </div>
      </div>

      {/* Project Mission Section */}
      <h2 className='text-3xl font-semibold mt-16 text-white text-center'>
        Our Mission
      </h2>
      <p className='mt-6 text-lg text-purple-300 text-center max-w-3xl'>
        At Chess Fein, we aim to make chess accessible to players of all levels.
        Whether you're a beginner looking to learn the basics or an advanced
        player honing your skills, we provide the tools, challenges, and
        learning resources to help you improve and enjoy the game.
      </p>

      {/* Call to Action Section */}
      <div className='mt-16 flex flex-col items-center'>
        <h3 className='text-2xl font-semibold text-white'>
          Ready to Improve Your Chess?
        </h3>
        <p className='text-purple-300 text-center mt-4 max-w-2xl'>
          Join the Chess Fein community and start playing today! Dive into our
          AI matches, explore thousands of puzzles, and challenge your friends.
          Your chess journey starts here.
        </p>
        <button
          className='mt-8 px-8 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-500 transition'
          onClick={() => (window.location.href = '/play')}
        >
          Player VS AI
        </button>
        <button
          className='mt-8 px-8 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-500 transition'
          onClick={() => (window.location.href = '/puzzles')}
        >
          Puzzles
        </button>
      </div>
    </div>
  )
}

export default About
