# Quickstart Guide: Social Login Implementation

## Setup

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   # Edit .env with your Google and Facebook OAuth credentials
   ```

4. Run the backend:
   ```bash
   uvicorn src.main:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.local.example .env.local
   # Edit with your API configuration
   ```

4. Run the frontend:
   ```bash
   npm run dev
   ```

## Environment Variables

### Backend (.env)
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
- `FACEBOOK_APP_ID`: Your Facebook app ID
- `FACEBOOK_APP_SECRET`: Your Facebook app secret
- `JWT_SECRET_KEY`: Secret key for JWT token signing
- `BACKEND_CORS_ORIGINS`: Comma-separated list of allowed origins (e.g., '["http://localhost:3000", "http://localhost:8000"]')

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL`: URL of your backend API (e.g., http://localhost:8000)

## OAuth Provider Configuration

### Google OAuth Setup
1. Go to Google Cloud Console
2. Create a new OAuth 2.0 client ID
3. Add authorized redirect URIs:
   - `http://localhost:8000/auth/google/callback`

### Facebook OAuth Setup
1. Go to Facebook Developers Console
2. Create a new app
3. Add authorized redirect URIs:
   - `http://localhost:8000/auth/facebook/callback`

## API Endpoints

### Google OAuth
- `GET /auth/google` - Initiate Google OAuth flow
- `GET /auth/google/callback` - Handle Google OAuth callback

### Facebook OAuth
- `GET /auth/facebook` - Initiate Facebook OAuth flow
- `GET /auth/facebook/callback` - Handle Facebook OAuth callback

### Other Endpoints
- `GET /health` - Health check
- `GET /privacy` - Privacy policy

## Testing the Integration

1. Start both backend and frontend
2. Visit the frontend at http://localhost:3000
3. Click on "Continue with Google" or "Continue with Facebook"
4. Complete the OAuth flow
5. Verify you're redirected back to the frontend with a JWT token

## Troubleshooting

- If you get CORS errors, check that your BACKEND_CORS_ORIGINS includes your frontend URL
- If OAuth fails, verify your client IDs and secrets are correct
- If callback redirects fail, check that your redirect URIs match exactly in the provider consoles