import React, { useState, useEffect, useRef, useMemo } from 'react'

interface PuzzleInitializerProps {
  jsonPath: string // Path to the JSON file
  onFetchPuzzles: (puzzles: Puzzle[]) => void // Callback to pass puzzles
  filteredPuzzles: Puzzle[] // Filtered puzzles from parent
  setFilteredPuzzles: React.Dispatch<React.SetStateAction<Puzzle[]>> // Setter for filtered puzzles
}

type Puzzle = {
  PuzzleId: string
  FEN: string
  Moves: string
  Themes: string
}

const PuzzleInitializer: React.FC<PuzzleInitializerProps> = React.memo(
  ({ jsonPath, onFetchPuzzles, filteredPuzzles, setFilteredPuzzles }) => {
    const [selectedTheme, setSelectedTheme] = useState<string>('All') // Selected theme
    const [puzzles, setPuzzles] = useState<Puzzle[]>([]) // All loaded puzzles
    const [currentBatch, setCurrentBatch] = useState<Puzzle[]>([]) // Current batch of 10 puzzles
    const [isFetching, setIsFetching] = useState<boolean>(false) // Loading state
    const hasFetched = useRef<boolean>(false) // Prevent duplicate fetches

    const batchSize = 10 // Number of puzzles per batch

    const themes = [
      'All',
      'Mate',
      'MateIn1',
      'MateIn2',
      'MateIn3',
      'Advantage',
      'Fork',
      'Crushing',
      'Pin',
      'DefensiveMove',
      'QueensideAttack',
    ]

    // Fetch puzzles when the component mounts
    useEffect(() => {
      const loadPuzzles = async () => {
        if (hasFetched.current) return // Prevent duplicate fetches
        hasFetched.current = true

        try {
          setIsFetching(true)
          const response = await fetch(jsonPath)
          const data: Puzzle[] = await response.json()
          setPuzzles(data)
          console.log('Puzzles loaded:', data)
        } catch (error) {
          console.error('Error loading puzzles:', error)
        } finally {
          setIsFetching(false)
        }
      }

      loadPuzzles()
    }, [jsonPath])

    // Memoized filtering logic
    const filteredPuzzlesMemo = useMemo(() => {
      const filtered =
        selectedTheme === 'All'
          ? puzzles
          : puzzles.filter((puzzle) => {
              const themesArray = puzzle.Themes?.split(/\s+/) || []
              return themesArray.some(
                (theme) => theme.toLowerCase() === selectedTheme.toLowerCase()
              )
            })

      setFilteredPuzzles(filtered)
      return filtered
    }, [selectedTheme, puzzles, setFilteredPuzzles])

    // Set current batch when filtered puzzles change
    useEffect(() => {
      setCurrentBatch(filteredPuzzlesMemo.slice(0, batchSize))
    }, [filteredPuzzlesMemo])

    const handleStartGame = () => {
      console.log('Starting game with puzzles:', currentBatch)
      onFetchPuzzles(currentBatch) // Send the first batch of puzzles to the parent
    }

    return (
      <div className='flex flex-col items-center mt-10 w-full'>
        <div className='bg-purple-900 bg-opacity-80 p-8 rounded-lg shadow-lg space-y-6 text-center w-full max-w-3xl'>
          <h2 className='text-2xl lg:text-3xl font-bold text-white'>
            Select Puzzle Theme
          </h2>

          {/* Puzzle Theme Selection */}
          <div className='flex flex-col items-center space-y-2'>
            <label
              htmlFor='theme-select'
              className='text-white text-base lg:text-lg'
            >
              Puzzle Theme:
            </label>
            <select
              id='theme-select'
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className='p-2 lg:p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600 text-black text-sm lg:text-lg'
            >
              {themes.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </div>

          {/* Start Game Button */}
          <button
            onClick={handleStartGame}
            className={`w-full bg-green-600 hover:bg-green-700 text-white py-2 lg:py-3 rounded-md transition-colors duration-300 text-base lg:text-lg`}
            disabled={currentBatch.length === 0 || isFetching}
          >
            Start Game
          </button>
        </div>
      </div>
    )
  }
)

export default PuzzleInitializer
