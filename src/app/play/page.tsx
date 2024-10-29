'use client'

import { Chessboard } from 'react-chessboard'

export default function Play() {
  return (
    <div className='flex justify-center items-center w-full h-screen p-4'>
      <div className='relative w-full max-w-4xl flex justify-center h-full'>
        <div
          className='flex justify-center items-center w-full h-full'
          style={{ maxWidth: '75vmin', maxHeight: '75vmin' }}
        >
          <Chessboard
            customBoardStyle={{
              borderRadius: '4px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
            }}
            customDarkSquareStyle={{
              backgroundColor: '#6A0DAD',
            }}
            customLightSquareStyle={{
              backgroundColor: '#D3D3D3',
            }}
          />
        </div>
      </div>
    </div>
  )
}
