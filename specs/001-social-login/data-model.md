# Data Model: Next.js-Only Social Login

## Overview
Data structures and entities for the Next.js-only social login implementation.

## Entity: SocialLoginUser
Represents a user who has authenticated via a social provider.

**Fields:**
- `id` (string): Unique identifier for the user (provider-specific user ID)
- `email` (string): User's email address from the OAuth provider
- `name` (string): User's full name from the OAuth provider
- `provider` (string): OAuth provider ('google' or 'facebook')
- `provider_user_id` (string): Unique user ID from the OAuth provider
- `avatar_url` (string, optional): URL to the user's profile picture

**Validation rules:**
- `email` must be a valid email format
- `provider` must be either 'google' or 'facebook'
- `id` and `provider_user_id` must be non-empty strings

## Entity: OAuthCredentials
Configuration data for OAuth providers (stored securely in environment variables).

**Fields:**
- `clientId` (string): OAuth client ID from the provider
- `clientSecret` (string): OAuth client secret from the provider
- `redirectUri` (string): URI to redirect after OAuth flow completion

**Validation rules:**
- All fields must be non-empty strings
- `redirectUri` must be a valid URI format

## Entity: AuthenticationSession
Temporary data structure holding state during OAuth flow to prevent CSRF attacks.

**Fields:**
- `state` (string): Cryptographically random state parameter
- `provider` (string): OAuth provider ('google' or 'facebook')
- `timestamp` (number): Unix timestamp of when the session was created
- `expiresAt` (number): Unix timestamp when the session expires

**Validation rules:**
- `state` must be a non-empty string
- `provider` must be either 'google' or 'facebook'
- `expiresAt` must be greater than `timestamp`
- Session must expire within 10 minutes of creation

## Entity: JWTTokenPayload
Structure of the payload contained in JWT tokens.

**Fields:**
- `userId` (string): Unique identifier for the user
- `email` (string): User's email address
- `name` (string): User's full name
- `picture` (string, optional): URL to the user's profile picture
- `provider` (string): OAuth provider ('google' or 'facebook')
- `iat` (number): Issued at timestamp
- `exp` (number): Expiration timestamp

**Validation rules:**
- `userId`, `email`, `name`, and `provider` must be non-empty strings
- `iat` and `exp` must be valid Unix timestamps
- `exp` must be greater than `iat`
- Token must expire within 7 days of issuance