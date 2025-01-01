/* eslint-disable */
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
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const [puzzles, setPuzzles] = useState<Puzzle[]>([])
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const hasFetched = useRef<boolean>(false)

    const batchSize = 1

    const themesWithDescriptions = [
      {
        name: 'All',
        description:
          'Includes all available puzzles without filtering by theme.',
      },
      {
        name: 'AdvancedPawn',
        description:
          'Puzzles featuring advanced pawn tactics to gain positional or material advantage.',
      },
      {
        name: 'Advantage',
        description:
          'Focuses on building a winning position or increasing an existing advantage.',
      },
      {
        name: 'AnastasiaMate',
        description:
          'Showcases the Anastasia mate pattern involving a rook and knight.',
      },
      {
        name: 'AttackingF2F7',
        description:
          'Exploits weaknesses on the f2 or f7 squares, often targeting the opponent’s king.',
      },
      {
        name: 'Attraction',
        description:
          'Tactics that lure key opponent pieces or the king into unfavorable positions.',
      },
      {
        name: 'BackRankMate',
        description:
          'Mate patterns involving an exposed king trapped on the back rank.',
      },
      {
        name: 'BodenMate',
        description:
          'A classic mate pattern using two bishops to trap the opponent’s king.',
      },
      {
        name: 'CapturingDefender',
        description:
          'Tactics that eliminate key defenders to create decisive threats.',
      },
      {
        name: 'Castling',
        description:
          'Puzzles where castling plays a significant role in the tactic or defense.',
      },
      {
        name: 'Clearance',
        description:
          'Involves moving a piece to clear a line, file, or square for another piece.',
      },
      {
        name: 'Crushing',
        description:
          'Dominating tactics that lead to overwhelming positions or direct victory.',
      },
      {
        name: 'DefensiveMove',
        description:
          'Focuses on finding the best defensive options to neutralize threats.',
      },
      {
        name: 'Deflection',
        description:
          'Tactics that force an opponent’s piece to move away from a critical square or task.',
      },
      {
        name: 'DiscoveredAttack',
        description:
          'Features attacks revealed by moving another piece out of the way.',
      },
      {
        name: 'DoubleBishopMate',
        description:
          'Mate pattern using two bishops to confine and checkmate the king.',
      },
      {
        name: 'DoubleCheck',
        description:
          'A simultaneous check by two pieces, forcing the opponent’s king to move.',
      },
      {
        name: 'EnPassant',
        description:
          'Puzzles where the special en passant pawn capture is integral to the solution.',
      },
      {
        name: 'Endgame',
        description:
          'Focuses on techniques and tactics in simplified, late-game positions.',
      },
      {
        name: 'ExposedKing',
        description: 'Tactics exploiting a king with insufficient protection.',
      },
      {
        name: 'Fork',
        description:
          'A single piece attacks two or more opponent pieces simultaneously.',
      },
      {
        name: 'Interference',
        description:
          'Tactics where pieces block critical lines or paths, disrupting coordination.',
      },
      {
        name: 'Intermezzo',
        description:
          'In-between moves that interrupt the main sequence to gain an advantage.',
      },
      {
        name: 'KingsideAttack',
        description:
          'Aggressive strategies targeting the king’s position on the kingside.',
      },
      {
        name: 'Long',
        description: 'Challenging puzzles with deeper, multi-move solutions.',
      },
      {
        name: 'Master',
        description:
          'Puzzles featuring positions from high-level games by chess masters.',
      },
      {
        name: 'MasterVsMaster',
        description:
          'Positions from games between two chess masters, testing advanced tactics.',
      },
      {
        name: 'Mate',
        description:
          'General mate-in-n moves puzzles, requiring precise calculation.',
      },
      {
        name: 'MateIn1',
        description:
          'Puzzles where checkmate can be achieved in a single move.',
      },
      {
        name: 'MateIn2',
        description: 'Puzzles where checkmate can be forced in two moves.',
      },
      {
        name: 'MateIn3',
        description: 'Puzzles where checkmate can be forced in three moves.',
      },
      {
        name: 'MateIn4',
        description: 'Puzzles where checkmate can be forced in four moves.',
      },
      {
        name: 'MateIn5',
        description: 'Puzzles where checkmate can be forced in five moves.',
      },
      {
        name: 'Middlegame',
        description: 'Focuses on tactics and strategy in the middlegame phase.',
      },
      {
        name: 'OneMove',
        description: 'Puzzles that can be solved with a single, decisive move.',
      },
      {
        name: 'Opening',
        description:
          'Tactics and traps arising from the opening phase of the game.',
      },
      {
        name: 'Pin',
        description:
          'Features pins where one piece immobilizes another due to a higher-value piece behind it.',
      },
      {
        name: 'QueensideAttack',
        description: 'Aggressive play targeting the queenside of the board.',
      },
      {
        name: 'QuietMove',
        description:
          'Subtle moves that set up threats or improve the position without immediate aggression.',
      },
      {
        name: 'RookEndgame',
        description: 'Endgame puzzles emphasizing rook maneuvers and tactics.',
      },
      {
        name: 'Sacrifice',
        description:
          'Tactics involving intentional material loss to gain a larger advantage.',
      },
      { name: 'Short', description: 'Quick puzzles with simple solutions.' },
      {
        name: 'Skewer',
        description:
          'Tactics where a high-value piece is attacked, forcing it to move and expose a lesser piece.',
      },
      {
        name: 'SmotheredMate',
        description:
          'A checkmate where the king is surrounded by its own pieces and cannot escape.',
      },
      {
        name: 'TrappedPiece',
        description:
          'Focuses on isolating and capturing opponent pieces with no escape.',
      },
      {
        name: 'VeryLong',
        description:
          'Extended puzzles requiring multi-move planning and execution.',
      },
      {
        name: 'XRayAttack',
        description:
          'Tactics involving indirect attacks through an intervening piece or square.',
      },
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
          // console.log('Puzzles loaded:', data)
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
      // console.log('Starting game with puzzles:', currentBatch)
      onFetchPuzzles(currentBatch)
      setGameStarted(true)
    }

    return (
      <div className='flex flex-col items-center mt-10 w-full'>
        <div className='bg-purple-900 bg-opacity-80 p-8 rounded-lg shadow-lg space-y-6 text-center w-full max-w-3xl'>
          <h2 className='text-2xl lg:text-3xl font-bold text-white mb-4'>
            Select Puzzle Theme
          </h2>

          <div className='relative w-full max-w-md mx-auto'>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full p-3 bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none flex items-center justify-center ${
                selectedTheme === 'All' ? 'text-gray-500' : 'text-black'
              }`}
            >
              {themesWithDescriptions.find((t) => t.name === selectedTheme)
                ?.name || 'Select Theme'}
            </button>
            {isDropdownOpen && (
              <div className='absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto scroll-smooth text-center'>
                {themesWithDescriptions.map((theme) => (
                  <div
                    key={theme.name}
                    onClick={() => {
                      setSelectedTheme(theme.name)
                      setIsDropdownOpen(false)
                    }}
                    className='p-3 hover:bg-gray-200 cursor-pointer'
                  >
                    <div className='font-bold text-black'>{theme.name}</div>
                    <div className='text-sm text-purple-600'>
                      {theme.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
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
