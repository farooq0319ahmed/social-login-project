# Social Login Frontend

This is the frontend component of the social login application, built with React/Next.js.

## Features

- "Continue with Google" and "Continue with Facebook" buttons
- OAuth callback handling
- JWT token management
- Session persistence
- Error handling for authentication failures

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file and add your API configuration:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Components

- `GoogleLoginButton` - Component for Google OAuth login
- `FacebookLoginButton` - Component for Facebook OAuth login
- `AuthService` - Service for handling JWT tokens and user sessions
- `LoginPage` - Login page with social login options
- `CallbackPage` - Page for handling OAuth callbacks and redirecting users

## Security

- Stores JWT tokens in localStorage
- Validates token expiration
- Handles authentication errors gracefully

## Google Console Configuration

When setting up your Google OAuth application, ensure the Authorized redirect URI in Google Console matches the backend callback URL:

**Backend callback URL:** `http://localhost:8000/auth/google/callback`

This URL is where Google will redirect users after authentication, and it must be registered in your Google Console application.

## Getting Started

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
