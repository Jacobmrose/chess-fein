'use client'

import { useState, useCallback } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import ChessGame from '@/app/components/ChessGame'
import GameInitializer from '@/app/components/GameInitializer'
import GameInfo from '@/app/components/GameInfo'
import { Chess } from 'chess.js'

export default function Play() {
  const { user } = useUser()
  const [color, setColor] = useState<'white' | 'black' | null>(null)
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>(
    'white'
  )
  const [moves, setMoves] = useState<string[]>([])
  const [fenHistory, setFenHistory] = useState<string[]>([new Chess().fen()])
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isResigned, setIsResigned] = useState(false)
  const [activePlayer, setActivePlayer] = useState<'white' | 'black'>('white')
  const [gameSettings, setGameSettings] = useState({
    timeLimit: 5,
    difficulty: 1,
  })
  const [isPlaygroundMode, setIsPlaygroundMode] = useState<boolean>(false)
  const [aiEnabled, setAiEnabled] = useState<boolean>(true)

  const handleResignation = useCallback(() => {
    setIsResigned(true)
    handleGameOver()
  }, [])

  const handleStartGame = (
    selectedColor: 'white' | 'black',
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
  }

  const toggleAI = () => {
    setAiEnabled((prev) => !prev) // Toggle AI state
  }

  const handleMove = (move: string, fen: string) => {
    const updatedMoves = [...moves.slice(0, currentMoveIndex + 1), move]
    const updatedFenHistory = [
      ...fenHistory.slice(0, currentMoveIndex + 1),
      fen,
    ]

    setMoves(updatedMoves)
    setFenHistory(updatedFenHistory)
    setCurrentMoveIndex((prevIndex) => prevIndex + 1)

    // Persist updated history to localStorage
    localStorage.setItem('fenHistory', JSON.stringify(updatedFenHistory))
  }

  const handleNavigateToMove = (index: number) => {
    if (index >= 0 && index < fenHistory.length) {
      setCurrentMoveIndex(index)
    }
  }

  const handleResetGame = () => {
    setColor(null)
    setBoardOrientation('white')
    setMoves([])
    setFenHistory([new Chess().fen()])
    setCurrentMoveIndex(0)
    setIsGameOver(false)
    setIsResigned(false)
  }

  const handleGameOver = () => {
    setIsGameOver(true)
  }

  const toggleBoardOrientation = () => {
    setBoardOrientation((prev) => (prev === 'white' ? 'black' : 'white'))
  }

  const handleTakeBackMove = () => {
    if (currentMoveIndex > 0) {
      const updatedMoves = moves.slice(0, -1)
      const updatedFenHistory = fenHistory.slice(0, -1)
      const previousFen = updatedFenHistory[updatedFenHistory.length - 1]
      const game = new Chess(previousFen)

      setMoves(updatedMoves)
      setFenHistory(updatedFenHistory)
      setCurrentMoveIndex((prevIndex) => prevIndex - 1)

      // Update localStorage
      localStorage.setItem('fenHistory', JSON.stringify(updatedFenHistory))

      // Sync the turn with the ChessGame state by determining the active player
      const activePlayer = game.turn() === 'w' ? 'white' : 'black'
      setActivePlayer(activePlayer)
    }
  }

  const getPlayerName = (side: 'white' | 'black') =>
    side === color
      ? user?.name || `${side.charAt(0).toUpperCase() + side.slice(1)} Player`
      : `Stockfish ${gameSettings.difficulty} Elo`

  const whitePlayerName = getPlayerName('white')
  const blackPlayerName = getPlayerName('black')

  return (
    <div className='flex flex-col items-center w-full h-auto p-4 mt-16'>
      <div className='relative w-full max-w-4xl flex flex-col items-center'>
        {!color ? (
          <GameInitializer onStartGame={handleStartGame} />
        ) : (
          <>
            <ChessGame
              color={color}
              boardOrientation={boardOrientation}
              onMove={(move, fen) => handleMove(move, fen)}
              onGameOver={handleGameOver}
              isGameOver={isGameOver}
              isResigned={isResigned}
              whitePlayerName={whitePlayerName}
              blackPlayerName={blackPlayerName}
              timeLimit={gameSettings.timeLimit * 60}
              difficulty={gameSettings.difficulty}
              onResign={handleResignation}
              currentMoveIndex={currentMoveIndex}
              activePlayer={activePlayer}
              setActivePlayer={setActivePlayer}
              fenHistory={fenHistory}
              setFenHistory={setFenHistory}
              aiEnabled={aiEnabled}
              isPlaygroundMode={isPlaygroundMode}
            />
            <GameInfo
              moves={moves}
              fenHistory={fenHistory}
              currentMoveIndex={currentMoveIndex}
              navigateToMove={handleNavigateToMove}
              onResign={handleResignation}
              onResetGame={handleResetGame}
              isGameOver={isGameOver}
              onToggleBoardOrientation={toggleBoardOrientation}
              onTakeBackMove={handleTakeBackMove}
              aiEnabled={aiEnabled}
              onToggleAI={toggleAI}
              isPlaygroundMode={isPlaygroundMode}
            />
          </>
        )}
      </div>
    </div>
  )
}
