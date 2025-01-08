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
      // console.log('iOS detected: Using stockfish-16.1-lite-single.js')
      stockfishWorker.current = new Worker('/stockfish-16.1-lite-single.js')
    } else {
      // console.log('Non-iOS detected: Using standard stockfish.js')
      stockfishWorker.current = new Worker('/stockfish.js')
    }

    stockfishWorker.current.postMessage('uci') // Set Stockfish to UCI mode

    // Configure options specifically for iOS (e.g., single-threaded mode and lower memory usage)
    if (isIOS) {
      // console.log(
      //   'iOS detected: Setting single-thread mode and low memory usage'
      // )
      stockfishWorker.current.postMessage('setoption name Threads value 1')
      stockfishWorker.current.postMessage('setoption name Hash value 16') // Limit memory to 16MB on iOS
    } else {
      // console.log('Non-iOS detected: Using default settings')
      stockfishWorker.current.postMessage('setoption name Threads value 2')
      stockfishWorker.current.postMessage('setoption name Hash value 128') // Use higher memory for non-iOS
    }

    return () => {
      stockfishWorker.current?.terminate()
    }
  }, [enabled])

  const getBestMove = useCallback(() => {
    if (!enabled || !stockfishWorker.current) return

    // // Calculate Elo and related parameters
    // const elo = Math.min(3190, Math.max(1320, difficulty))
    // const skill = Math.round(((difficulty - 1320) / (3190 - 1320)) * 20) // Skill: 0–20
    // const depth = Math.min(
    //   20, // No depth restriction on iOS, allowing full depth calculation
    //   Math.max(8, Math.round(((elo - 1320) / (3190 - 1320)) * 12) + 8)
    // )

    // const limitStrength = elo < 2700 // Limit Stockfish strength for lower ELOs

    // Clamp difficulty within the valid range (100–3190)
    const requestedElo = Math.min(3190, Math.max(100, difficulty))

    // Map requested Elo (100–3190) to UCI_Elo (1320–3190)
    const elo = Math.round(
      ((requestedElo - 100) / (3190 - 100)) * (3190 - 1320) + 1320
    )

    // Map requested Elo (100–3190) to skill level (0–20)
    const skill = Math.round(((requestedElo - 100) / (3190 - 100)) * 20)

    // Map requested Elo (100–3190) to depth (1–20)
    const depth = Math.round(((requestedElo - 100) / (3190 - 100)) * 19) + 1

    // Limit Stockfish strength if Elo is below 2700
    const limitStrength = elo < 2700

    // Set Stockfish options dynamically
    stockfishWorker.current.postMessage(
      `setoption name UCI_LimitStrength value ${limitStrength}`
    )
    stockfishWorker.current.postMessage(`setoption name UCI_Elo value ${elo}`)
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
