import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateToken, comparePassword } from '@/lib/auth';
import { validateEmail } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Find user
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      username: user.username
    });

    return NextResponse.json(
      {
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          fullName: user.fullName,
          level: user.level,
          xp: user.xp,
          coins: user.coins
        },
        token
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
