import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Clear any auth tokens on client side
  const response = NextResponse.json(
    { message: 'Logged out successfully' },
    { status: 200 }
  );
  return response;
}
