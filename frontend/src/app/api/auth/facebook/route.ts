import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  // Get environment variables
  const appId = process.env.FACEBOOK_APP_ID;
  const redirectUri = `${request.nextUrl.origin}/api/auth/callback`;

  if (!appId) {
    return NextResponse.json({ error: 'Facebook app ID not configured' }, { status: 500 });
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

  // Build Facebook OAuth URL
  const facebookAuthUrl = new URL('https://www.facebook.com/v13.0/dialog/oauth');
  facebookAuthUrl.searchParams.append('client_id', appId);
  facebookAuthUrl.searchParams.append('redirect_uri', redirectUri);
  facebookAuthUrl.searchParams.append('response_type', 'code');
  facebookAuthUrl.searchParams.append('scope', 'email,public_profile');
  facebookAuthUrl.searchParams.append('state', state);

  // Redirect to Facebook OAuth
  return NextResponse.redirect(facebookAuthUrl.toString());
}