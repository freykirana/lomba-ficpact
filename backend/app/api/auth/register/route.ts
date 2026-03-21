import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateToken, hashPassword, comparePassword } from '@/lib/auth';
import { validateEmail, validatePassword } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { email, username, password } = await req.json();

    // Validation
    if (!email || !username || !password) {
      return NextResponse.json(
        { error: 'Email, username, and password are required' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!validatePassword(password)) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { username: username.toLowerCase() }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email or username already in use' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await db.user.create({
      data: {
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        password: hashedPassword,
        fullName: username
      },
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        level: true,
        xp: true,
        coins: true
      }
    });

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      username: user.username
    });

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user,
        token
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
