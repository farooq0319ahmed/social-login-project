# Social Login Backend

This is the backend component of the social login application, built with FastAPI.

## Features

- OAuth 2.0 integration with Google and Facebook
- JWT-based authentication
- CSRF protection for OAuth flows
- Secure session management
- User management and persistence

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Create a `.env` file based on `.env.example` and add your OAuth credentials:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. Run the application:
   ```bash
   uvicorn src.main:app --reload
   ```

## Endpoints

- `GET /auth/google` - Initiate Google OAuth flow
- `GET /auth/google/callback` - Handle Google OAuth callback
- `GET /auth/facebook` - Initiate Facebook OAuth flow
- `GET /auth/facebook/callback` - Handle Facebook OAuth callback

## Google Console Configuration

For Google OAuth to work properly, you need to add the following redirect URI in your Google Console:

**Authorized redirect URI:** `http://localhost:8000/auth/google/callback`

Make sure this matches exactly with your backend configuration in the `.env` file:
```
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
```

## Security

- Implements CSRF protection using state parameters
- Validates OAuth tokens properly
- Stores sensitive credentials in environment variables
- Uses JWT for session management
- Proper CORS configuration with environment-based origins
- Environment variable parsing with safe defaults