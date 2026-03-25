import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { extractToken, verifyToken } from '@/lib/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const unwrappedParams = await params;
    const authHeader = req.headers.get('Authorization');
    const token = extractToken(authHeader);
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const body = await req.json();
    const { score } = body;

    // Check cooldown again to prevent bypass
    const latestSubmission = await db.submission.findFirst({
      where: { userId: payload.id, chapterId: unwrappedParams.id, language: 'quiz' },
      orderBy: { createdAt: 'desc' }
    });

    if (latestSubmission && latestSubmission.status === 'REJECTED') {
      const timeDiff = Date.now() - new Date(latestSubmission.createdAt).getTime();
      const cooldownMs = 30 * 60 * 1000;
      if (timeDiff < cooldownMs) {
        return NextResponse.json({ error: 'Masih dalam masa cooldown (menunggu 30 menit).', cooldownRemaining: cooldownMs - timeDiff }, { status: 403 });
      }
    }

    const chapter = await db.chapter.findUnique({ where: { id: unwrappedParams.id } });
    if (!chapter) return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });

    const isPerfect = score === 100;
    
    // Create submission record
    await db.submission.create({
      data: {
        userId: payload.id,
        chapterId: unwrappedParams.id,
        code: JSON.stringify({ score }),
        language: 'quiz',
        status: isPerfect ? 'ACCEPTED' : 'REJECTED',
        xpEarned: isPerfect ? 1000 : 0,
        coinsEarned: isPerfect ? 500 : 0,
        passedTests: isPerfect ? 5 : 0,
        totalTests: 5
      }
    });

    if (isPerfect) {
      // Award user
      await db.user.update({
        where: { id: payload.id },
        data: {
          xp: { increment: 1000 },
          coins: { increment: 500 }
        }
      });
      return NextResponse.json({ success: true, message: 'Skor sempurna! Mendapatkan 1000 XP dan 500 Coins.', cooldownRemaining: 0 });
    } else {
      return NextResponse.json({ success: false, message: 'Jawaban salah terdeteksi. Silakan coba kembali setelah 30 menit.', cooldownRemaining: 30 * 60 * 1000 });
    }

  } catch (error) {
    console.error('Submit quiz error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
