'use client'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  const logoSize = 60 // Size of each logo (width and height)
  const margin = 135 // Margin between logos

  const [logosPerRow, setLogosPerRow] = useState(0)
  const [logosPerColumn, setLogosPerColumn] = useState(0)

  // Calculate available space dynamically
  const calculateLogos = () => {
    const container = document.getElementById('logo-container')
    if (container) {
      const containerWidth = container.clientWidth
      const containerHeight = container.clientHeight

      if (window.innerWidth < 456) {
        setLogosPerRow(0)
        setLogosPerColumn(0)
        return
      }

      // Adjust for margins to prevent overflow
      const adjustedLogoSize = logoSize + margin

      const newLogosPerRow = Math.floor(containerWidth / adjustedLogoSize)
      const newLogosPerColumn = Math.floor(containerHeight / adjustedLogoSize)

      setLogosPerRow(newLogosPerRow)
      setLogosPerColumn(newLogosPerColumn)
    }
  }

  useEffect(() => {
    calculateLogos()
    window.addEventListener('resize', calculateLogos)

    return () => window.removeEventListener('resize', calculateLogos)
  }, [])

  const totalLogos = logosPerRow * logosPerColumn

  return (
    <>
      <Head>
        <title>Chess Fein</title>
      </Head>
      <div
        id='logo-container'
        className='relative w-full bg-transparent overflow-hidden flex justify-center items-center'
        style={{
          height: '70vh', // Limit the grid to 70% of the viewport height
        }}
      >
        {/* Text Overlay */}
        <div className='absolute flex flex-col items-center justify-center text-center z-10 px-4'>
          <h1 className='text-5xl md:text-7xl font-bold text-white drop-shadow-lg'>
            Chess Fein
          </h1>
          <p className='text-lg md:text-xl mt-16 text-gray-300 drop-shadow-md max-w-3xl'>
            A modern, open-source chess platform designed to deliver an engaging
            and intuitive experience for both enthusiasts and newcomers.
          </p>
        </div>

        {/* Background grid of logos */}
        <div
          className='grid'
          style={{
            gridTemplateColumns: `repeat(${logosPerRow}, ${logoSize}px)`,
            gridAutoRows: `${logoSize}px`,
            gap: `${margin}px`,
            justifyContent: 'center', // Center horizontally
            alignContent: 'center', // Center vertically
            zIndex: -1,
          }}
        >
          {Array.from({ length: totalLogos }).map((_, index) => (
            <div key={index} className='flex justify-center items-center'>
              <Image
                src='/chess-fein.png'
                alt='Chess Fein Logo'
                width={logoSize}
                height={logoSize}
                className='opacity-25'
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
