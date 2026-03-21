import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = parseInt(searchParams.get('skip') || '0');

    // Get weekly leaderboard (users with most XP gained in last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const weeklyStats = await db.submission.groupBy({
      by: ['userId'],
      where: {
        createdAt: {
          gte: sevenDaysAgo
        },
        status: 'ACCEPTED'
      },
      _sum: {
        xpEarned: true
      },
      orderBy: {
        _sum: {
          xpEarned: 'desc'
        }
      },
      take: limit,
      skip
    });

    // Get user details
    const leaderboard = await Promise.all(
      weeklyStats.map(async (stat: any, index: number) => {
        const user = await db.user.findUnique({
          where: { id: stat.userId },
          select: {
            id: true,
            username: true,
            avatar: true,
            level: true,
            xp: true
          }
        });
        return {
          rank: skip + index + 1,
          ...user,
          weeklyXp: stat._sum.xpEarned || 0
        };
      })
    );

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error('Get weekly leaderboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
