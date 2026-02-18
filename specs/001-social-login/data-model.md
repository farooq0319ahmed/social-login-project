# Data Model: Social Login Implementation

## Entities

### SocialLoginUser
Represents a user who has authenticated via a social provider

**Fields:**
- id: string (UUID) - Unique identifier for the user
- email: string - User's email address from the provider
- name: string - User's full name from the provider
- provider: string (google|facebook) - OAuth provider used for authentication
- provider_user_id: string - Unique ID from the OAuth provider
- avatar_url: string (optional) - URL to user's profile picture
- created_at: datetime - Timestamp of account creation
- updated_at: datetime - Timestamp of last update
- is_active: boolean - Account status flag

**Validation rules:**
- email must be valid email format
- provider must be one of: google, facebook
- provider_user_id must be unique per provider
- name and email are required fields

### AuthenticationSession
Temporary data structure holding state during OAuth flow to prevent CSRF attacks

**Fields:**
- state: string - Cryptographically random state parameter
- provider: string (google|facebook) - OAuth provider for this session
- created_at: datetime - Timestamp of session creation
- expires_at: datetime - Timestamp when session expires
- nonce: string - Additional security parameter

**Validation rules:**
- state must be cryptographically random
- expiration must be within reasonable timeframe (e.g., 10 minutes)
- session must be deleted after successful authentication

### JWTToken
JSON Web Token for authenticated user sessions

**Fields:**
- token: string - Signed JWT token
- user_id: string (UUID) - Foreign key to SocialLoginUser
- expires_at: datetime - Token expiration timestamp
- created_at: datetime - Token creation timestamp

**Validation rules:**
- token must be properly signed
- expiration must be within reasonable timeframe (e.g., 24 hours)
- User must exist and be active