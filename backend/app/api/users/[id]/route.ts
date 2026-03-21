import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { extractToken, verifyToken } from '@/lib/auth';

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
        username: true,
        fullName: true,
        avatar: true,
        bio: true,
        level: true,
        xp: true,
        coins: true,
        createdAt: true,
        followers: { select: { id: true } },
        following: { select: { id: true } },
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...user,
      followerCount: user.followers.length,
      followingCount: user.following.length,
      followers: undefined,
      following: undefined
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = extractToken(req.headers.get('Authorization'));
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.id !== params.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { fullName, avatar, bio } = await req.json();

    const user = await db.user.update({
      where: { id: params.id },
      data: {
        ...(fullName && { fullName }),
        ...(avatar && { avatar }),
        ...(bio !== undefined && { bio })
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        avatar: true,
        bio: true,
        level: true,
        xp: true,
        coins: true
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
