import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');

    const chapters = await db.chapter.findMany({
      where: {
        ...(category && { category }),
        ...(difficulty && { difficulty })
      },
      select: {
        id: true,
        title: true,
        description: true,
        difficulty: true,
        category: true,
        totalAttempts: true,
        totalSucceeds: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(chapters);
  } catch (error) {
    console.error('Get chapters error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, content, difficulty, category, examples } = await req.json();

    if (!title || !description || !content || !difficulty || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const chapter = await db.chapter.create({
      data: {
        title,
        description,
        content,
        difficulty,
        category,
        examples: JSON.stringify(examples || [])
      }
    });

    return NextResponse.json(chapter, { status: 201 });
  } catch (error) {
    console.error('Create chapter error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
