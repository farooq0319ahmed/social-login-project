from authlib.integrations.starlette_client import OAuth
from starlette.requests import Request
from starlette.responses import RedirectResponse
from urllib.parse import urlencode
import os
import httpx
from src.config.settings import (
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
)
from src.models.user import SocialLoginUser
from src.auth.jwt_handler import create_token_for_user
from src.auth.user_service import UserService


# Initialize OAuth client for Google
oauth = OAuth()
google = oauth.register(
    name='google',
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={
        'scope': 'openid email profile'
    },
    redirect_uri=GOOGLE_REDIRECT_URI  # Add the redirect URI to the registration
)


async def google_login(request: Request):
    """
    Initiate Google OAuth flow
    """
    # Use Authlib's built-in state handling
    return await google.authorize_redirect(request, GOOGLE_REDIRECT_URI)


async def google_callback(request: Request):
    """
    Handle Google OAuth callback
    """
    try:
        error_param = request.query_params.get('error')
        error_description = request.query_params.get('error_description')

        # If there's an error parameter from Google, handle it directly
        if error_param:
            print(f"Google OAuth error received: {error_param} - {error_description}")
            frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
            return RedirectResponse(f"{frontend_url}/auth/callback?error=google_auth_failed&details={error_description or error_param}")

        # Get the authorization response from Google - Authlib handles state validation
        token = await google.authorize_access_token(request)

        # Get user info from the token first
        user_info = token.get('userinfo')

        # If userinfo is not in the token, fetch it using the access token
        if not user_info:
            access_token = token.get('access_token')
            if access_token:
                async with httpx.AsyncClient() as client:
                    resp = await client.get(
                        'https://www.googleapis.com/oauth2/v2/userinfo',
                        headers={'Authorization': f'Bearer {access_token}'}
                    )
                    if resp.status_code == 200:
                        user_info = resp.json()
                    else:
                        print(f"Google OAuth: Failed to fetch user info: {resp.status_code}")
                        # Redirect to frontend with clean error message
                        frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
                        return RedirectResponse(f"{frontend_url}/auth/callback?error=google_auth_failed")
            else:
                print("Google OAuth: No access token found in response")
                # Redirect to frontend with clean error message
                frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
                return RedirectResponse(f"{frontend_url}/auth/callback?error=google_auth_failed")

        if not user_info:
            print("Google OAuth: No user info received")
            # Redirect to frontend with clean error message
            frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
            return RedirectResponse(f"{frontend_url}/auth/callback?error=google_auth_failed")

        # Create user object
        user = SocialLoginUser(
            email=user_info.get('email', ''),
            name=user_info.get('name', ''),
            provider='google',
            provider_user_id=str(user_info.get('id') or user_info.get('sub')),
            avatar_url=user_info.get('picture')
        )

        # Validate user data
        if not UserService.validate_user(user):
            print("Google OAuth: Invalid user data received")
            # Redirect to frontend with clean error message
            frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
            return RedirectResponse(f"{frontend_url}/auth/callback?error=google_auth_failed")

        # Create or update the user in the database
        user = UserService.create_or_update_user(user)

        # Generate JWT token for the user
        jwt_token = create_token_for_user(user)

        # Redirect back to the frontend with the token
        frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
        params = urlencode({'token': jwt_token})
        return RedirectResponse(f"{frontend_url}/auth/callback?{params}")

    except Exception as e:
        # Log the exception server-side
        print(f"Google OAuth error: {str(e)}")

        # Redirect to frontend with clean error message (no raw exception details)
        frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
        return RedirectResponse(f"{frontend_url}/auth/callback?error=google_auth_failed")
