export const startTimer = (
  activePlayer: 'white' | 'black',
  whiteTime: number,
  blackTime: number,
  setWhiteTime: React.Dispatch<React.SetStateAction<number>>,
  setBlackTime: React.Dispatch<React.SetStateAction<number>>,
  setGameEnded: React.Dispatch<React.SetStateAction<boolean>>,
  setWinner: React.Dispatch<React.SetStateAction<string | null>>,
  onGameOver: () => void
) => {
  const handleTimer = () => {
    if (activePlayer === 'white') {
      setWhiteTime((prevTime) => {
        if (prevTime <= 1) {
          setGameEnded(true)
          setWinner('White ran out of time!')
          onGameOver()
          return 0
        }
        return prevTime - 1
      })
    } else {
      setBlackTime((prevTime) => {
        if (prevTime <= 1) {
          setGameEnded(true)
          setWinner('Black ran out of time!')
          onGameOver()
          return 0
        }
        return prevTime - 1
      })
    }
  }

  const interval = setInterval(handleTimer, 1000)

  // Return a cleanup function to clear the interval
  return () => clearInterval(interval)
}
