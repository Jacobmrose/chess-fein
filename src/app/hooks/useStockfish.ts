/* eslint-disable */
import { useRef, useEffect, useCallback } from 'react'
import { Square } from 'chess.js'

export interface UseStockfishOptions {
  position: string
  onMove: (from: Square, to: Square) => void
  difficulty: number
  enabled: boolean
}

// Detect if the user is on iOS (only on the client-side)
const isIOS =
  typeof window !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent)

export function useStockfish({
  position,
  onMove,
  difficulty,
  enabled,
}: UseStockfishOptions) {
  const stockfishWorker = useRef<Worker | null>(null)

  useEffect(() => {
    if (!enabled) {
      stockfishWorker.current?.terminate()
      stockfishWorker.current = null
      return
    }

    // Use the iOS-specific stockfish worker
    if (isIOS) {
      stockfishWorker.current = new Worker('/stockfish-16.1-lite-single.js')
    } else {
      stockfishWorker.current = new Worker('/stockfish.js')
    }

    stockfishWorker.current.postMessage('uci') // Set Stockfish to UCI mode

    // Configure options specifically for iOS (e.g., single-threaded mode and lower memory usage)
    if (isIOS) {
      stockfishWorker.current.postMessage('setoption name Threads value 1')
      stockfishWorker.current.postMessage('setoption name Hash value 16') // Limit memory to 16MB on iOS
    } else {
      stockfishWorker.current.postMessage('setoption name Threads value 2')
      stockfishWorker.current.postMessage('setoption name Hash value 128') // Use higher memory for non-iOS
    }

    return () => {
      stockfishWorker.current?.terminate()
    }
  }, [enabled])

  const getBestMove = useCallback(() => {
    if (!enabled || !stockfishWorker.current) return

    // Clamp difficulty within the valid range (1320–3190)
    const requestedElo = Math.min(3190, Math.max(1320, difficulty))

    // Map requested Elo (1320–3190) to skill level (1–20)
    const skill = Math.round(((requestedElo - 1320) / (3190 - 1320)) * 19) + 1

    // Map requested Elo (1320–3190) to depth (1–20)
    const depth = Math.round(((requestedElo - 1320) / (3190 - 1320)) * 19) + 1

    // Set Stockfish options dynamically
    stockfishWorker.current.postMessage(
      `setoption name Skill Level value ${skill}`
    )
    stockfishWorker.current.postMessage(`position fen ${position}`)
    stockfishWorker.current.postMessage(`go depth ${depth}`)

    const handleStockfishMessage = (event: MessageEvent) => {
      if (event.data.startsWith('bestmove')) {
        const [_, bestMove] = event.data.split(' ')
        if (bestMove && bestMove !== '(none)') {
          const from = bestMove.slice(0, 2) as Square
          const to = bestMove.slice(2, 4) as Square
          onMove(from, to)
        } else {
          console.error('No valid move received from Stockfish')
        }
        stockfishWorker.current?.removeEventListener(
          'message',
          handleStockfishMessage
        )
      }
    }

    stockfishWorker.current.addEventListener('message', handleStockfishMessage)
  }, [position, difficulty, onMove, enabled])

  return { getBestMove }
}
