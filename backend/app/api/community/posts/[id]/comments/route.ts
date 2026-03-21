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

    const { content } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: 'Comment content is required' },
        { status: 400 }
      );
    }

    const post = await db.communityPost.findUnique({
      where: { id: params.id }
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const comment = await db.comment.create({
      data: {
        authorId: payload.id,
        postId: params.id,
        content
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        }
      }
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('Create comment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
