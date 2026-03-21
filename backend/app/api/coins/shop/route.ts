import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const items = await db.shopItem.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        icon: true,
        category: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('Get shop items error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, price, icon, category } = await req.json();

    if (!name || !price || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const item = await db.shopItem.create({
      data: {
        name,
        description: description || '',
        price,
        icon: icon || '',
        category
      }
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Create shop item error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
