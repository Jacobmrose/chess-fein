import { NextResponse } from 'next/server'

export function middleware(request: Request) {
  const userAgent = request.headers.get('user-agent') || ''
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent)

  const response = NextResponse.next()

  // Remove headers for iOS devices
  if (isIOS) {
    // Remove CORS headers for iOS
    if (request.url.includes('/stockfish-16.1-lite-single.js')) {
      response.headers.delete('Cross-Origin-Opener-Policy')
      response.headers.delete('Cross-Origin-Embedder-Policy')
      response.headers.delete('Cross-Origin-Resource-Policy')
    }
  } else {
    // Set headers for non-iOS devices
    if (request.url.includes('/stockfish-16.1-lite-single.js')) {
      response.headers.set('Cross-Origin-Opener-Policy', 'same-origin')
      response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp')
      response.headers.set('Cross-Origin-Resource-Policy', 'cross-origin')
    }
  }

  return response
}
