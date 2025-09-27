import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check if the user is trying to access admin routes
  if (pathname.startsWith('/admin')) {
    // Check for admin cookie
    const isAdmin = request.cookies.get('isAdmin')?.value === 'true';
    
    // If not admin and trying to access protected admin routes, redirect to login
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*'
  ]
};
