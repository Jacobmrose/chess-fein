import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // Uncomment this section to re-enable route protection
  /*
  const { cookies } = req

  const sessionCookie = cookies.get('appSession')

  const protectedPaths = [
    '/play',
    '/community',
    '/profile',
    '/puzzles',
    '/learn',
    '/about',
  ]
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath && !sessionCookie) {
    const home = new URL('/', req.url)
    home.searchParams.set('redirected', 'true')
    return NextResponse.redirect(home)
  }
  */

  return NextResponse.next() // Allow all requests unconditionally
}

export const config = {
  matcher: ['/play', '/community', '/profile', '/puzzles', '/learn', '/about'],
}
