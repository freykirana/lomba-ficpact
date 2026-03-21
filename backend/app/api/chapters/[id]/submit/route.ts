import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { extractToken, verifyToken } from '@/lib/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = extractToken(req.headers.get('Authorization'));
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { code, language } = await req.json();

    if (!code || !language) {
      return NextResponse.json(
        { error: 'Code and language are required' },
        { status: 400 }
      );
    }

    // Get chapter and test cases
    const chapter = await db.chapter.findUnique({
      where: { id: params.id },
      include: { testCases: true }
    });

    if (!chapter) {
      return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
    }

    // Simulate code execution and test case validation
    // In production, you'd use a code execution engine like Judge0 or similar
    const passedTests = Math.floor(Math.random() * chapter.testCases.length);
    const status = passedTests === chapter.testCases.length ? 'ACCEPTED' : 'REJECTED';
    const isFirstSolve = await db.submission.count({
      where: {
        userId: payload.id,
        chapterId: params.id,
        status: 'ACCEPTED'
      }
    }) === 0;

    // Determine XP and coin rewards
    let xpEarned = 0;
    let coinsEarned = 0;

    if (status === 'ACCEPTED') {
      if (isFirstSolve) {
        xpEarned = 100;
        coinsEarned = 50;
      } else {
        xpEarned = 50;
        coinsEarned = 25;
      }
    }

    // Create submission
    const submission = await db.submission.create({
      data: {
        userId: payload.id,
        chapterId: params.id,
        code,
        language,
        status,
        passedTests,
        totalTests: chapter.testCases.length,
        xpEarned,
        coinsEarned,
        isFirstSolve
      }
    });

    // Update user stats if accepted
    if (status === 'ACCEPTED') {
      await db.user.update({
        where: { id: payload.id },
        data: {
          xp: { increment: xpEarned },
          coins: { increment: coinsEarned }
        }
      });
    }

    // Update chapter stats
    await db.chapter.update({
      where: { id: params.id },
      data: {
        totalAttempts: { increment: 1 },
        ...(status === 'ACCEPTED' && { totalSucceeds: { increment: 1 } })
      }
    });

    return NextResponse.json({
      submission: {
        ...submission,
        id: submission.id,
        status,
        passedTests,
        totalTests: chapter.testCases.length,
        xpEarned,
        coinsEarned,
        isFirstSolve
      }
    });
  } catch (error) {
    console.error('Submit chapter error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
