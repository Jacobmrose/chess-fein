// useChessGame.ts

import { useState, useCallback } from 'react'
import { Chess } from 'chess.js'

import { UserProfile } from '@auth0/nextjs-auth0/client'

// Define types
type PlayerColor = 'white' | 'black'
type GameSettings = {
  timeLimit: number
  difficulty: number
}

export function useChessGame(user: UserProfile | null) {
  const [color, setColor] = useState<PlayerColor | null>(null)
  const [boardOrientation, setBoardOrientation] = useState<PlayerColor>('white')
  const [moves, setMoves] = useState<string[]>([])
  const [fenHistory, setFenHistory] = useState<string[]>([])
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(0)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [isResigned, setIsResigned] = useState<boolean>(false)
  const [activePlayer, setActivePlayer] = useState<PlayerColor>('white')
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    timeLimit: 5,
    difficulty: 1,
  })
  const [isPlaygroundMode, setIsPlaygroundMode] = useState<boolean>(false)
  const [aiEnabled, setAiEnabled] = useState<boolean>(true)

  // Handle starting a new game
  const handleStartGame = useCallback(
    (
      selectedColor: PlayerColor,
      selectedTimeLimit: number,
      selectedDifficulty: number,
      selectedPlaygroundMode: boolean
    ) => {
      setColor(selectedColor)
      setBoardOrientation(selectedColor)
      setGameSettings({
        timeLimit: selectedTimeLimit,
        difficulty: selectedDifficulty,
      })
      setIsPlaygroundMode(selectedPlaygroundMode)
      setMoves([])
      setFenHistory([new Chess().fen()])
      setCurrentMoveIndex(0)
      setIsGameOver(false)
      setIsResigned(false)
      setAiEnabled(true)
    },
    []
  )

  const handleMove = useCallback(
    (move: string, fen: string) => {
      const updatedMoves = [...moves.slice(0, currentMoveIndex + 1), move]
      const updatedFenHistory = [
        ...fenHistory.slice(0, currentMoveIndex + 1),
        fen,
      ]
      setMoves(updatedMoves)
      setFenHistory(updatedFenHistory)
      setCurrentMoveIndex((prev) => prev + 1)

      // Save to localStorage
      localStorage.setItem('fenHistory', JSON.stringify(updatedFenHistory))
    },
    [moves, currentMoveIndex, fenHistory]
  )

  // Navigate to a specific move in the history
  const handleNavigateToMove = (index: number) => {
    if (index >= 0 && index < fenHistory.length) {
      setCurrentMoveIndex(index)
    }
  }

  // Handle resignation
  const handleResignation = useCallback(() => {
    setIsResigned(true)
    setIsGameOver(true)
  }, [])

  const handleGameOver = useCallback(() => {
    setIsGameOver(true)
  }, [])

  // Reset the game
  const handleResetGame = () => {
    setColor(null)
    setBoardOrientation('white')
    setMoves([])
    setFenHistory([fenHistory[0]]) // Keep the initial position
    setCurrentMoveIndex(0)
    setIsGameOver(false)
    setIsResigned(false)
  }

  // Toggle board orientation
  const toggleBoardOrientation = () => {
    setBoardOrientation((prev) => (prev === 'white' ? 'black' : 'white'))
  }

  // Handle taking back a move
  const handleTakeBackMove = () => {
    if (currentMoveIndex > 0) {
      const updatedMoves = moves.slice(0, -1)
      const updatedFenHistory = fenHistory.slice(0, -1)
      setMoves(updatedMoves)
      setFenHistory(updatedFenHistory)
      setCurrentMoveIndex((prev) => prev - 1)

      // Save to localStorage
      localStorage.setItem('fenHistory', JSON.stringify(updatedFenHistory))
    }
  }

  // Toggle AI mode
  const toggleAI = () => {
    setAiEnabled((prev) => !prev)
  }

  // Get player name
  const getPlayerName = (side: PlayerColor): string =>
    side === color
      ? user?.name || `${side.charAt(0).toUpperCase() + side.slice(1)} Player`
      : `Stockfish ${gameSettings.difficulty} Elo`

  const whitePlayerName = getPlayerName('white')
  const blackPlayerName = getPlayerName('black')

  // Return all values and handlers
  return {
    color,
    boardOrientation,
    moves,
    fenHistory,
    currentMoveIndex,
    isGameOver,
    isResigned,
    activePlayer,
    gameSettings,
    isPlaygroundMode,
    aiEnabled,
    whitePlayerName,
    blackPlayerName,
    handleStartGame,
    handleMove,
    handleNavigateToMove,
    handleResignation,
    handleResetGame,
    toggleBoardOrientation,
    handleTakeBackMove,
    toggleAI,
    handleGameOver,
    setFenHistory,
    setActivePlayer,
  }
}
