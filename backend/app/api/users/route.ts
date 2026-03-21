import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        avatar: true,
        coins: true,
        xp: true,
        level: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(users);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Get users error:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to fetch users', details: errorMessage },
      { status: 500 }
    );
  }
}
