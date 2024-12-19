'use client'

import { useChessGame } from '@/app/hooks/useChessGame'
import ChessGame from '@/app/components/ChessGame'
import GameInitializer from '@/app/components/GameInitializer'
import GameInfo from '@/app/components/GameInfo'

export default function Play() {
  const {
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
  } = useChessGame(null)

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
              onMove={handleMove}
              onGameOver={handleGameOver}
              isGameOver={isGameOver}
              isResigned={isResigned}
              whitePlayerName={whitePlayerName}
              blackPlayerName={blackPlayerName}
              timeLimit={gameSettings.timeLimit * 60}
              difficulty={gameSettings.difficulty}
              setActivePlayer={setActivePlayer}
              currentMoveIndex={currentMoveIndex}
              setFenHistory={setFenHistory}
              activePlayer={activePlayer}
              fenHistory={fenHistory}
              aiEnabled={aiEnabled}
              isPlaygroundMode={isPlaygroundMode}
              onResign={handleResignation}
            />
            <GameInfo
              moves={moves}
              fenHistory={fenHistory}
              currentMoveIndex={currentMoveIndex}
              navigateToMove={handleNavigateToMove}
              onResetGame={handleResetGame}
              onTakeBackMove={handleTakeBackMove}
              onToggleBoardOrientation={toggleBoardOrientation}
              onToggleAI={toggleAI}
              isGameOver={isGameOver}
              isPlaygroundMode={isPlaygroundMode}
              aiEnabled={aiEnabled}
              onResign={handleResignation}
            />
          </>
        )}
      </div>
    </div>
  )
}
