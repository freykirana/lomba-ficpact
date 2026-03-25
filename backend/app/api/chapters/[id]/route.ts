import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const unwrappedParams = await params;
    const chapter = await db.chapter.findUnique({
      where: { id: unwrappedParams.id },
      include: {
        testCases: {
          select: { id: true, input: true, expectedOutput: true }
        }
      }
    });

    if (!chapter) {
      return NextResponse.json(
        { error: 'Chapter not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...chapter,
      examples: chapter.examples ? JSON.parse(chapter.examples) : []
    });
  } catch (error) {
    console.error('Get chapter error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
