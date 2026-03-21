import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { extractToken, verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = parseInt(searchParams.get('skip') || '0');

    const posts = await db.communityPost.findMany({
      where: {
        ...(category && { category })
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        },
        comments: {
          select: { id: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip
    });

    return NextResponse.json(
      posts.map((post: any) => ({
        ...post,
        commentCount: post.comments.length,
        comments: undefined
      }))
    );
  } catch (error) {
    console.error('Get community posts error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = extractToken(req.headers.get('Authorization'));
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { title, content, category, tags } = await req.json();

    if (!title || !content || !category) {
      return NextResponse.json(
        { error: 'Title, content, and category are required' },
        { status: 400 }
      );
    }

    const post = await db.communityPost.create({
      data: {
        authorId: payload.id,
        title,
        content,
        category,
        tags: tags ? tags.join(',') : ''
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

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Create community post error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
