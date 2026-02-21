# Social Login Application (Next.js Only)

This is a complete social login application that has been converted to a Next.js-only architecture. All backend functionality has been integrated into Next.js API routes, eliminating the need for a separate Python backend.

## Architecture

- **Frontend**: Next.js application with integrated authentication
- **Authentication**: Handled entirely through Next.js API routes
- **OAuth Providers**: Google and Facebook
- **Token Management**: JWT tokens generated server-side
- **Deployment**: Single Vercel deployment (no external backend needed)

## Features

- Google OAuth login
- Facebook OAuth login
- JWT token management
- Protected routes
- Dashboard view for authenticated users
- Server-side authentication handling
- CSRF protection for OAuth flows

## Tech Stack

- Next.js 16+
- React 19+
- Tailwind CSS
- OAuth 2.0
- JWT authentication
- jose library for JWT handling

## Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the frontend directory with the following variables:
   ```env
   # Google OAuth Configuration
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Facebook OAuth Configuration
   FACEBOOK_APP_ID=your_facebook_app_id
   FACEBOOK_APP_SECRET=your_facebook_app_secret

   # JWT Secret for signing tokens
   JWT_SECRET=your_super_secret_jwt_key_change_in_production

   # Next.js application URL
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Visit `http://localhost:3000` in your browser.

## API Routes

- `GET /api/auth/google` - Initiate Google OAuth flow
- `GET /api/auth/facebook` - Initiate Facebook OAuth flow
- `GET /api/auth/callback` - Handle OAuth callback
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout user

## Authentication Flow

1. User clicks on Google/Facebook login button
2. User is redirected to the respective OAuth provider via Next.js API route
3. User authenticates with the provider
4. User is redirected back to `/api/auth/callback` with an authorization code
5. The Next.js API route exchanges the code for an access token
6. The access token is used to get user information from the provider
7. A JWT token is generated server-side and returned to the frontend
8. User is redirected to the frontend callback with the JWT token
9. Frontend stores the token and redirects to the dashboard

## Security Considerations

- OAuth state parameter is used for CSRF protection and stored in httpOnly cookies
- JWT tokens are generated server-side with proper signing
- PKCE (Proof Key for Code Exchange) is implemented for additional security
- All sensitive operations happen server-side in API routes

## Deployment

This application can be deployed directly to Vercel without any external backend:

1. Connect your repository to Vercel
2. Set the project root to the `frontend` directory
3. Configure the environment variables in Vercel dashboard
4. Deploy!

The application will handle all authentication flows serverlessly through Next.js API routes.
