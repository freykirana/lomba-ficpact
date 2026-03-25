import { NextRequest, NextResponse } from 'next/server';
import { extractToken, verifyToken } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;
    const comments = await db.comment.findMany({
      where: { postId },
      include: {
        author: { select: { id: true, username: true, avatar: true } }
      },
      orderBy: { createdAt: 'asc' }
    });
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Comments GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = extractToken(req.headers.get('Authorization'));
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const payload = verifyToken(token);
    if (!payload || !payload.id) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const postId = params.id;
    const { content } = await req.json();

    const post = await db.communityPost.findUnique({ where: { id: postId } });
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

    const newComment = await db.comment.create({
      data: {
        content,
        postId,
        authorId: payload.id
      },
      include: {
        author: { select: { id: true, username: true, avatar: true } }
      }
    });

    return NextResponse.json(newComment);
  } catch (error) {
    console.error('Comments POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
