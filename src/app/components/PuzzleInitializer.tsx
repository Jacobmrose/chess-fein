import React, { useState, useEffect, useRef, useMemo } from 'react'

interface PuzzleInitializerProps {
  jsonPath: string // Path to the JSON file
  onFetchPuzzles: (puzzles: Puzzle[]) => void // Callback to pass puzzles
  filteredPuzzles: Puzzle[] // Filtered puzzles from parent
  setFilteredPuzzles: React.Dispatch<React.SetStateAction<Puzzle[]>> // Setter for filtered puzzles
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>
}

type Puzzle = {
  PuzzleId: string
  FEN: string
  Moves: string
  Themes: string
}

const PuzzleInitializer: React.FC<PuzzleInitializerProps> = React.memo(
  ({ jsonPath, onFetchPuzzles, setFilteredPuzzles, setGameStarted }) => {
    const [selectedTheme, setSelectedTheme] = useState<string>('All')
    const [puzzles, setPuzzles] = useState<Puzzle[]>([])
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const hasFetched = useRef<boolean>(false)

    const batchSize = 1

    const themes = [
      'All',
      'AdvancedPawn',
      'Advantage',
      'AnastasiaMate',
      'AttackingF2F7',
      'Attraction',
      'BackRankMate',
      'BodenMate',
      'CapturingDefender',
      'Castling',
      'Clearance',
      'Crushing',
      'DefensiveMove',
      'Deflection',
      'DiscoveredAttack',
      'DoubleBishopMate',
      'DoubleCheck',
      'EnPassant',
      'Endgame',
      'ExposedKing',
      'Fork',
      'Interference',
      'Intermezzo',
      'KingsideAttack',
      'Long',
      'Master',
      'MasterVsMaster',
      'Mate',
      'MateIn1',
      'MateIn2',
      'MateIn3',
      'MateIn4',
      'MateIn5',
      'Middlegame',
      'OneMove',
      'Opening',
      'Pin',
      'QueensideAttack',
      'QuietMove',
      'RookEndgame',
      'Sacrifice',
      'Short',
      'Skewer',
      'SmotheredMate',
      'TrappedPiece',
      'VeryLong',
      'XRayAttack',
    ]

    // Fetch puzzles on mount
    useEffect(() => {
      const loadPuzzles = async () => {
        if (hasFetched.current) return
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

    // Filter puzzles based on the selected theme
    const filteredPuzzles = useMemo(() => {
      if (selectedTheme === 'All') return puzzles
      return puzzles.filter((puzzle) =>
        (puzzle.Themes?.split(/\s+/) || []).some(
          (theme) => theme.toLowerCase() === selectedTheme.toLowerCase()
        )
      )
    }, [selectedTheme, puzzles])

    // Update parent state with filtered puzzles
    useEffect(() => {
      setFilteredPuzzles(filteredPuzzles)
    }, [filteredPuzzles, setFilteredPuzzles])

    // Start the game with the first batch of puzzles
    const handleStartGame = () => {
      const currentBatch = filteredPuzzles.slice(0, batchSize)
      console.log('Starting game with puzzles:', currentBatch)
      onFetchPuzzles(currentBatch)
      setGameStarted(true)
    }

    return (
      <div className='flex flex-col items-center mt-10 w-full'>
        <div className='bg-purple-900 bg-opacity-80 p-8 rounded-lg shadow-lg space-y-6 text-center w-full max-w-3xl'>
          <h2 className='text-2xl lg:text-3xl font-bold text-white'>
            Select Puzzle Theme
          </h2>

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

          <button
            onClick={handleStartGame}
            className={`w-full bg-purple-600 hover:bg-gray-700 text-white py-2 lg:py-3 rounded-md transition-colors duration-300 text-base lg:text-lg`}
            disabled={filteredPuzzles.length === 0 || isFetching}
          >
            Start Game
          </button>
        </div>
      </div>
    )
  }
)

export default PuzzleInitializer
