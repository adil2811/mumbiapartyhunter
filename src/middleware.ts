import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  console.log('Current Path:', path);
  
  const isPublicPath =
    path === '/login' || path === '/signup' || path === '/verifyemail'
  
  const isPrivatePath = 
    path === '/' || // Include the root path
    path === '/filterevent' || 
    path === '/listevent' || 
    path === '/cart' || 
    (path.startsWith('/search') && path !== '/search'); // Exclude '/search' itself

  const token = request.cookies.get('token')?.value || ''

  console.log('Token:', token);

  if (isPublicPath && token) {
    console.log('Redirecting from public path to home');
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (isPrivatePath && !token) {
    console.log('Redirecting from private path to login');
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
}

export const config = {
  matcher: [
    '/',
    '/profile/:path*',
    '/login',
    '/signup',
    '/verifyemail',
    '/filterevent',
    '/listevent',
    '/cart',
    '/search',
    '/search/query',
  ]
}
