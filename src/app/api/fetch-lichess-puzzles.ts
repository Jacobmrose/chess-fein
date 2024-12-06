import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { theme, difficultyRange, maxMoves } = await req.json()

  if (!theme || !difficultyRange || !maxMoves) {
    return new Response(
      JSON.stringify({ error: 'Missing required parameters' }),
      { status: 400 }
    )
  }

  try {
    const response = await fetch('https://lichess.org/api/puzzle', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.LICHESS_API_TOKEN}`,
      },
    })

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch puzzles from Lichess' }),
        { status: response.status }
      )
    }

    const puzzles = await response.json()

    const filteredPuzzles = puzzles.filter((puzzle: any) => {
      const difficulty = puzzle.rating
      return (
        difficulty >= difficultyRange[0] &&
        difficulty <= difficultyRange[1] &&
        puzzle.moves.length <= maxMoves &&
        puzzle.theme.includes(theme)
      )
    })

    if (filteredPuzzles.length === 0) {
      return new Response(JSON.stringify({ error: 'No puzzles found' }), {
        status: 404,
      })
    }

    const selectedPuzzle =
      filteredPuzzles[Math.floor(Math.random() * filteredPuzzles.length)]

    return new Response(
      JSON.stringify({
        fen: selectedPuzzle.fen,
        moves: selectedPuzzle.moves,
        theme: selectedPuzzle.theme,
        rating: selectedPuzzle.rating,
      }),
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching puzzles:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    })
  }
}
