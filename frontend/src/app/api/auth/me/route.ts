import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(request: NextRequest) {
  try {
    // Get the token from the Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify the JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_key');
    const verified = await jwtVerify(token, secret);

    // Return user information
    return NextResponse.json({
      user: {
        id: verified.payload.userId,
        email: verified.payload.email,
        name: verified.payload.name,
        picture: verified.payload.picture,
        provider: verified.payload.provider
      }
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}