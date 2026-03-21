import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { calculateLevel, getXPForNextLevel } from '@/lib/utils';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        level: true,
        xp: true,
        coins: true,
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get solved chapters
    const solvedChapters = await db.submission.findMany({
      where: {
        userId,
        status: 'ACCEPTED',
        isFirstSolve: true
      },
      select: { chapterId: true }
    });

    // Get stats
    const totalSubmissions = await db.submission.count({
      where: { userId }
    });

    const acceptedSubmissions = await db.submission.count({
      where: { userId, status: 'ACCEPTED' }
    });

    const nextLevelXP = getXPForNextLevel(user.level);
    const xpProgress = user.xp % 1000;

    return NextResponse.json({
      user: {
        id: user.id,
        level: user.level,
        xp: user.xp,
        coins: user.coins
      },
      progress: {
        totalSubmissions,
        acceptedSubmissions,
        solvedProblems: solvedChapters.length,
        currentXP: xpProgress,
        nextLevelXP: 1000,
        completionRate: totalSubmissions > 0 ? ((acceptedSubmissions / totalSubmissions) * 100).toFixed(2) : 0
      }
    });
  } catch (error) {
    console.error('Get progress error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
