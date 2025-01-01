/* eslint-disable */
import { useRef, useEffect, useCallback } from 'react'
import { Square } from 'chess.js'

export interface UseStockfishOptions {
  position: string
  onMove: (from: Square, to: Square) => void
  difficulty: number
  enabled: boolean
}

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

    // Initialize Stockfish worker
    stockfishWorker.current = new Worker('/stockfish.js')
    stockfishWorker.current.postMessage('uci') // Set Stockfish to UCI mode

    return () => {
      stockfishWorker.current?.terminate() // Terminate the worker when disabled or unmounted
    }
  }, [enabled])

  const getBestMove = useCallback(() => {
    if (!enabled || !stockfishWorker.current) return

    // Calculate Elo and related parameters
    const elo = Math.min(3190, Math.max(1320, difficulty))
    const skill = Math.round(((difficulty - 1320) / (3190 - 1320)) * 20) // Skill: 0–20
    const depth = Math.min(
      20,
      Math.max(8, Math.round(((elo - 1320) / (3190 - 1320)) * 12) + 8)
    ) // Dynamic depth scaling
    const limitStrength = elo < 2700 // Limit Stockfish strength for lower ELOs

    // Set Stockfish options
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
      // console.log('Stockfish message:', event.data) // Log all messages for debugging
      if (event.data.startsWith('bestmove')) {
        const [_, bestMove] = event.data.split(' ')
        if (bestMove && bestMove !== '(none)') {
          const from = bestMove.slice(0, 2) as Square
          const to = bestMove.slice(2, 4) as Square
          onMove(from, to) // Trigger the provided onMove callback
        } else {
          console.error('No valid move received from Stockfish')
        }
        // Clean up the event listener after processing the move
        stockfishWorker.current?.removeEventListener(
          'message',
          handleStockfishMessage
        )
      }
    }

    // Add an event listener to handle Stockfish's response
    stockfishWorker.current.addEventListener('message', handleStockfishMessage)
  }, [position, difficulty, onMove, enabled])

  return { getBestMove } // Return getBestMove for usage in components
}
