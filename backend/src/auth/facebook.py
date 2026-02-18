from authlib.integrations.starlette_client import OAuth
from starlette.requests import Request
from starlette.responses import RedirectResponse
from urllib.parse import urlencode
import os
import httpx
from src.config.settings import (
    FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET,
    FACEBOOK_REDIRECT_URI
)
from src.models.user import SocialLoginUser
from src.auth.jwt_handler import create_token_for_user
from src.auth.user_service import UserService


# Initialize OAuth client for Facebook
oauth = OAuth()
facebook = oauth.register(
    name='facebook',
    client_id=FACEBOOK_APP_ID,
    client_secret=FACEBOOK_APP_SECRET,
    access_token_url='https://graph.facebook.com/oauth/access_token',
    authorize_url='https://www.facebook.com/v13.0/dialog/oauth',
    api_base_url='https://graph.facebook.com/',
    client_kwargs={'scope': 'email,public_profile'},
)


async def facebook_login(request: Request):
    """
    Initiate Facebook OAuth flow
    """
    # Use Authlib's built-in state handling
    return await facebook.authorize_redirect(request, FACEBOOK_REDIRECT_URI)


async def facebook_callback(request: Request):
    """
    Handle Facebook OAuth callback
    """
    try:
        error_param = request.query_params.get('error')
        error_description = request.query_params.get('error_description')

        # If there's an error parameter from Facebook, handle it directly
        if error_param:
            print(f"Facebook OAuth error received: {error_param} - {error_description}")
            frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
            return RedirectResponse(f"{frontend_url}/auth/callback?error=facebook_auth_failed&details={error_description or error_param}")

        # Get the authorization response from Facebook - Authlib handles state validation
        token = await facebook.authorize_access_token(request)

        # Get user info from the token first
        user_info = token.get('userinfo')

        # If userinfo is not in the token, fetch it using the access token
        if not user_info:
            access_token = token.get('access_token')
            if access_token:
                async with httpx.AsyncClient() as client:
                    resp = await client.get(
                        'https://graph.facebook.com/me',
                        headers={'Authorization': f'Bearer {access_token}'},
                        params={'fields': 'id,name,email,picture'}
                    )
                    if resp.status_code == 200:
                        user_info = resp.json()
                    else:
                        print(f"Facebook OAuth: Failed to fetch user info: {resp.status_code}")
                        # Clean up the session
                        csrf_protection.remove_session(state)
                        # Redirect to frontend with clean error message
                        frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
                        return RedirectResponse(f"{frontend_url}/auth/callback?error=facebook_auth_failed")
            else:
                print("Facebook OAuth: No access token found in response")
                # Redirect to frontend with clean error message
                frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
                return RedirectResponse(f"{frontend_url}/auth/callback?error=facebook_auth_failed")

        if not user_info:
            print("Facebook OAuth: No user info received")
            # Redirect to frontend with clean error message
            frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
            return RedirectResponse(f"{frontend_url}/auth/callback?error=facebook_auth_failed")

        # Create user object
        user = SocialLoginUser(
            email=user_info.get('email', ''),
            name=user_info.get('name', ''),
            provider='facebook',
            provider_user_id=str(user_info.get('id')),
            avatar_url=user_info.get('picture', {}).get('data', {}).get('url') if user_info.get('picture') else None
        )

        # Validate user data
        if not UserService.validate_user(user):
            print("Facebook OAuth: Invalid user data received")
            # Redirect to frontend with clean error message
            frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
            return RedirectResponse(f"{frontend_url}/auth/callback?error=facebook_auth_failed")

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
        print(f"Facebook OAuth error: {str(e)}")

        # Redirect to frontend with clean error message (no raw exception details)
        frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
        return RedirectResponse(f"{frontend_url}/auth/callback?error=facebook_auth_failed")