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

    const { quantity } = await req.json();

    // Get shop item
    const item = await db.shopItem.findUnique({
      where: { id: params.id }
    });

    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    // Get user
    const user = await db.user.findUnique({
      where: { id: payload.id }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const qty = quantity || 1;
    const totalPrice = item.price * qty;

    // Check if user has enough coins
    if (user.coins < totalPrice) {
      return NextResponse.json(
        { error: 'Insufficient coins' },
        { status: 400 }
      );
    }

    // Create purchase
    const purchase = await db.purchase.create({
      data: {
        userId: payload.id,
        itemId: params.id,
        quantity: qty,
        totalPrice
      }
    });

    // Deduct coins from user
    await db.user.update({
      where: { id: payload.id },
      data: {
        coins: { decrement: totalPrice }
      }
    });

    return NextResponse.json(
      {
        message: 'Purchase successful',
        purchase
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Purchase item error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
