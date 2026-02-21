# Social Login Frontend

This is a standalone Next.js frontend application with integrated social login functionality using Google and Facebook OAuth. The backend functionality has been completely integrated into Next.js API routes, eliminating the need for an external backend.

## Features

- "Continue with Google" and "Continue with Facebook" buttons
- OAuth callback handling via Next.js API routes
- JWT token management
- Session persistence
- Error handling for authentication failures
- Server-side authentication handling
- CSRF protection for OAuth flows

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file and add your OAuth configuration:
   ```bash
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

3. Run the development server:
   ```bash
   npm run dev
   ```

## Components

- `GoogleLoginButton` - Component for Google OAuth login
- `FacebookLoginButton` - Component for Facebook OAuth login
- `AuthService` - Service for handling JWT tokens and user sessions
- `CallbackPage` - Page for handling OAuth callbacks and redirecting users
- Next.js API routes for authentication handling

## Security

- OAuth state parameter used for CSRF protection
- JWT tokens generated server-side with proper signing
- httpOnly cookies used for OAuth state validation
- Stores JWT tokens in localStorage (consider using httpOnly cookies in production)

## OAuth Configuration

### Google Console Configuration

When setting up your Google OAuth application, ensure the Authorized redirect URI in Google Console matches the Next.js API callback URL:

**API callback URL:** `http://localhost:3000/api/auth/callback`

This URL is where Google will redirect users after authentication, and it must be registered in your Google Console application.

### Facebook Console Configuration

For Facebook OAuth, ensure the Valid OAuth redirect URI in your Facebook app settings matches:

**API callback URL:** `http://localhost:3000/api/auth/callback`

## API Routes

- `GET /api/auth/google` - Initiates Google OAuth flow
- `GET /api/auth/facebook` - Initiates Facebook OAuth flow
- `GET /api/auth/callback` - Handles OAuth callbacks from providers
- `GET /api/auth/me` - Retrieves current user info
- `POST /api/auth/logout` - Handles user logout

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

## Getting Started

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

This application can be deployed directly to Vercel without any external backend. The Next.js API routes handle all authentication logic serverlessly.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
