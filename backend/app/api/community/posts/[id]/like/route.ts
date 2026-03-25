import { NextRequest, NextResponse } from 'next/server';
import { extractToken, verifyToken } from '@/lib/auth';
import { db } from '@/lib/db';

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
    
    const post = await db.communityPost.findUnique({ where: { id: postId } });
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

    const existingLike = await db.postLike.findUnique({
      where: { userId_postId: { userId: payload.id, postId } }
    });

    if (existingLike) {
      await db.postLike.delete({ where: { id: existingLike.id } });
      await db.communityPost.update({
        where: { id: postId },
        data: { upvotes: { decrement: 1 } }
      });
      return NextResponse.json({ success: true, liked: false });
    } else {
      await db.postLike.create({
        data: { userId: payload.id, postId }
      });
      await db.communityPost.update({
        where: { id: postId },
        data: { upvotes: { increment: 1 } }
      });
      return NextResponse.json({ success: true, liked: true });
    }
  } catch (error) {
    console.error('Like error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
