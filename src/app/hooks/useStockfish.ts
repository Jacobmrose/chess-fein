import { useRef, useEffect, useCallback, useState } from 'react'
import { Chess, Square } from 'chess.js'

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

    stockfishWorker.current = new Worker('/stockfish.js')

    stockfishWorker.current.postMessage('uci')

    return () => {
      stockfishWorker.current?.terminate()
    }
  }, [enabled])

  const getBestMove = useCallback(() => {
    if (!enabled || !stockfishWorker.current) return

    const elo = Math.min(3190, Math.max(1320, difficulty))
    const skill = Math.min(
      20,
      Math.max(0, Math.round(((difficulty - 1320) / (3190 - 1320)) * 20))
    )
    const depth = skill === 20 ? 20 : Math.min(20, Math.max(1, skill))
    const limitStrength = elo < 2700
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
      console.log('Stockfish message:', event.data) // Log Stockfish messages
      if (event.data.startsWith('bestmove')) {
        const [_, bestMove] = event.data.split(' ')
        if (bestMove && bestMove !== '(none)') {
          const from = bestMove.slice(0, 2) as Square
          const to = bestMove.slice(2, 4) as Square
          onMove(from, to)
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
