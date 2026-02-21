import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');
  const state = searchParams.get('state');

  // Check for errors from OAuth provider
  if (error) {
    console.error(`OAuth error: ${error}`, errorDescription);
    return NextResponse.redirect(`${request.nextUrl.origin}/auth/callback?error=oauth_error&details=${encodeURIComponent(errorDescription || error)}`);
  }

  // Verify state parameter for CSRF protection
  const storedState = cookies().get('oauth_state')?.value;
  if (!state || state !== storedState) {
    console.error('Invalid OAuth state parameter');
    return NextResponse.redirect(`${request.nextUrl.origin}/auth/callback?error=invalid_state`);
  }

  if (!code) {
    console.error('No authorization code received');
    return NextResponse.redirect(`${request.nextUrl.origin}/auth/callback?error=no_code`);
  }

  try {
    // Determine if this is Google or Facebook based on the original request
    // We'll use the presence of cookies to determine the provider
    const providerCookie = cookies().get('oauth_provider')?.value || 'unknown';

    let userInfo: any = {};

    if (providerCookie === 'google') {
      // Exchange code for Google tokens
      const tokenResponse = await exchangeCodeForTokens(
        code,
        `${request.nextUrl.origin}/api/auth/callback`,
        process.env.GOOGLE_CLIENT_ID!,
        process.env.GOOGLE_CLIENT_SECRET!,
        'https://oauth2.googleapis.com/token'
      );

      if (!tokenResponse.access_token) {
        throw new Error('Failed to get Google access token');
      }

      // Get user info from Google
      const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error(`Failed to fetch Google user info: ${userResponse.statusText}`);
      }

      userInfo = await userResponse.json();
      userInfo.provider = 'google';
    } else if (providerCookie === 'facebook') {
      // Exchange code for Facebook tokens
      const tokenResponse = await exchangeCodeForTokens(
        code,
        `${request.nextUrl.origin}/api/auth/callback`,
        process.env.FACEBOOK_APP_ID!,
        process.env.FACEBOOK_APP_SECRET!,
        'https://graph.facebook.com/v13.0/oauth/access_token'
      );

      if (!tokenResponse.access_token) {
        throw new Error('Failed to get Facebook access token');
      }

      // Get user info from Facebook
      const userResponse = await fetch(
        `https://graph.facebook.com/me?access_token=${tokenResponse.access_token}&fields=id,name,email,picture.type(large)`
      );

      if (!userResponse.ok) {
        throw new Error(`Failed to fetch Facebook user info: ${userResponse.statusText}`);
      }

      const fbUserInfo = await userResponse.json();
      userInfo = {
        id: fbUserInfo.id,
        name: fbUserInfo.name,
        email: fbUserInfo.email,
        picture: fbUserInfo.picture?.data?.url,
        provider: 'facebook'
      };
    } else {
      throw new Error('Unknown OAuth provider');
    }

    // Create JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_key');
    const token = await new SignJWT({
      userId: userInfo.id || userInfo.sub,
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture,
      provider: userInfo.provider
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);

    // Clear the OAuth state cookie
    cookies().delete('oauth_state');
    cookies().delete('oauth_provider');

    // Redirect to frontend callback with JWT token
    return NextResponse.redirect(`${request.nextUrl.origin}/auth/callback?token=${token}`);
  } catch (error: any) {
    console.error('OAuth callback error:', error);
    // Clear the OAuth state cookie
    cookies().delete('oauth_state');
    cookies().delete('oauth_provider');
    return NextResponse.redirect(`${request.nextUrl.origin}/auth/callback?error=callback_error&details=${encodeURIComponent(error.message || 'Unknown error')}`);
  }
}

// Helper function to exchange authorization code for tokens
async function exchangeCodeForTokens(
  code: string,
  redirectUri: string,
  clientId: string,
  clientSecret: string,
  tokenEndpoint: string
) {
  const tokenResponse = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
    }),
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    throw new Error(`Token exchange failed: ${errorText}`);
  }

  return await tokenResponse.json();
}