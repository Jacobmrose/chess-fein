import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { cookies } = req

  const sessionCookie = cookies.get('appSession')

  const protectedPaths = [
    '/play',
    '/settings',
    '/profile',
    '/puzzles',
    '/history',
    '/about',
  ]
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath && !sessionCookie) {
    const home = new URL('/', req.url)
    home.searchParams.set('redirected', 'true') // Add query parameter
    return NextResponse.redirect(home)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/play', '/settings', '/profile', '/puzzles', '/history', '/about'],
}
