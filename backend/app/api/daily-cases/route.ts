import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let dailyCase = await db.dailyCase.findFirst({
      where: {
        date: {
          gte: today,
          lt: tomorrow
        }
      },
      include: {
        chapter: {
          select: {
            id: true,
            title: true,
            description: true,
            content: true,
            difficulty: true
          }
        }
      }
    });

    // If no daily case for today, create one
    if (!dailyCase) {
      const randomChapter = await db.chapter.findFirst({
        orderBy: { createdAt: 'desc' }
      });

      if (randomChapter) {
        dailyCase = await db.dailyCase.create({
          data: {
            date: today,
            chapterId: randomChapter.id,
            xpReward: 200,
            coinReward: 100
          },
          include: {
            chapter: {
              select: {
                id: true,
                title: true,
                description: true,
                content: true,
                difficulty: true
              }
            }
          }
        });
      }
    }

    return NextResponse.json(dailyCase);
  } catch (error) {
    console.error('Get daily case error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
