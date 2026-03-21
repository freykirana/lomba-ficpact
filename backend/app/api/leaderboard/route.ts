import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = parseInt(searchParams.get('skip') || '0');

    const leaderboard = await db.user.findMany({
      select: {
        id: true,
        username: true,
        avatar: true,
        level: true,
        xp: true,
        coins: true
      },
      orderBy: [
        { level: 'desc' },
        { xp: 'desc' }
      ],
      take: limit,
      skip
    });

    // Add ranking
    const ranked = leaderboard.map((user: any, index: number) => ({
      rank: skip + index + 1,
      ...user
    }));

    return NextResponse.json(ranked);
  } catch (error) {
    console.error('Get leaderboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
