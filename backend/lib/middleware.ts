import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractToken } from './auth';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    username: string;
  };
}

export function withAuth(handler: (req: AuthenticatedRequest) => Promise<Response>) {
  return async (req: NextRequest) => {
    const token = extractToken(req.headers.get('Authorization'));

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const authReq = req as AuthenticatedRequest;
    authReq.user = user;

    return handler(authReq);
  };
}

export function createErrorResponse(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function createSuccessResponse(data: any, status: number = 200) {
  return NextResponse.json(data, { status });
}
