import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  // Get environment variables
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = `${request.nextUrl.origin}/api/auth/callback`;

  if (!clientId) {
    return NextResponse.json({ error: 'Google client ID not configured' }, { status: 500 });
  }

  // Generate a random state for CSRF protection
  const state = Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  // Store state in cookie for validation later
  cookies().set('oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 10, // 10 minutes
    path: '/',
    sameSite: 'lax',
  });

  // Build Google OAuth URL
  const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  googleAuthUrl.searchParams.append('client_id', clientId);
  googleAuthUrl.searchParams.append('redirect_uri', redirectUri);
  googleAuthUrl.searchParams.append('response_type', 'code');
  googleAuthUrl.searchParams.append('scope', 'openid email profile');
  googleAuthUrl.searchParams.append('state', state);
  googleAuthUrl.searchParams.append('access_type', 'offline');
  googleAuthUrl.searchParams.append('prompt', 'consent');

  // Redirect to Google OAuth
  return NextResponse.redirect(googleAuthUrl.toString());
}