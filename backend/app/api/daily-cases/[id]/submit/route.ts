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

    // Get daily case
    const dailyCase = await db.dailyCase.findUnique({
      where: { id: params.id },
      include: {
        chapter: {
          include: { testCases: true }
        }
      }
    });

    if (!dailyCase) {
      return NextResponse.json(
        { error: 'Daily case not found' },
        { status: 404 }
      );
    }

    // Check if user already submitted today
    const existingSubmission = await db.dailyCaseSubmission.findFirst({
      where: {
        userId: payload.id,
        dailyCaseId: params.id
      }
    });

    if (existingSubmission) {
      return NextResponse.json(
        { error: 'You have already submitted for today' },
        { status: 400 }
      );
    }

    // Parse question data to check answer
    if (!dailyCase.questionData) {
      return NextResponse.json({ error: 'Question data is missing' }, { status: 400 });
    }
    const qData = JSON.parse(dailyCase.questionData);
    const isCorrect = parseInt(code) === qData.correctIndex;

    const status = isCorrect ? 'ACCEPTED' : 'REJECTED';
    const xpEarned = isCorrect ? dailyCase.xpReward : 0;
    const coinsEarned = isCorrect ? dailyCase.coinReward : 0;

    const submission = await db.dailyCaseSubmission.create({
      data: {
        userId: payload.id,
        dailyCaseId: params.id,
        code,
        status,
        xpEarned,
        coinsEarned
      }
    });

    if (isCorrect) {
      await db.user.update({
        where: { id: payload.id },
        data: {
          xp: { increment: xpEarned },
          coins: { increment: coinsEarned }
        }
      });
    }

    return NextResponse.json(
      {
        message: isCorrect ? 'Great job! Answer is correct.' : 'Incorrect answer! Try again tomorrow.',
        submission,
        rewards: { xp: xpEarned, coins: coinsEarned },
        isCorrect
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Submit daily case error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
