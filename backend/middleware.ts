import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Add CORS headers
  const response = NextResponse.next();

  response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');

  if (request.method === 'OPTIONS') {
    return response;
  }

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
