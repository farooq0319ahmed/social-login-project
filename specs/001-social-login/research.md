# Research: Next.js-Only Social Login Conversion

## Overview
Research document for converting the Python backend to Next.js API routes for social login functionality.

## Decision: Next.js API Routes Architecture
**Rationale**: Moving all backend functionality to Next.js API routes allows for a single Vercel deployment without external backend dependencies. This approach maintains security while simplifying deployment and scaling.

**Alternatives considered**:
1. Keep Python backend on Render/DigitalOcean - Requires managing multiple deployments
2. Use Next.js API routes - Single deployment, Vercel native, server-side processing
3. Use edge functions - Potential latency benefits but limited for OAuth flows

## Decision: OAuth Flow Implementation
**Rationale**: Implement OAuth flows server-side in Next.js API routes with CSRF protection using state parameters. This ensures security while keeping sensitive operations server-side.

**Alternatives considered**:
1. Client-side OAuth - Would expose secrets to client
2. Server-side OAuth via API routes - Keeps secrets secure, implements CSRF protection
3. Third-party auth service - Adds external dependency

## Decision: JWT Token Management
**Rationale**: Generate JWT tokens server-side in API routes and return to frontend for storage. This maintains security while allowing stateless authentication.

**Alternatives considered**:
1. Session cookies - Would require more complex session management
2. JWT tokens - Stateless, scalable, standard approach
3. Database sessions - Would require backend storage

## Decision: Environment Variables
**Rationale**: Store all OAuth credentials in environment variables accessible only server-side in API routes. This prevents secret exposure to client-side code.

**Alternatives considered**:
1. Hardcoded values - Major security risk
2. Environment variables - Standard practice, secure
3. External secret management - Overkill for this project

## Decision: CSRF Protection
**Rationale**: Implement state parameter for OAuth flows stored in temporary server-side storage or secure cookies. This prevents cross-site request forgery attacks.

**Alternatives considered**:
1. No CSRF protection - Security vulnerability
2. State parameter with temporary storage - Standard OAuth practice
3. PKCE extension - Not needed for web applications

## Decision: Libraries and Dependencies
**Rationale**: Use jose library for JWT handling in Next.js, which is a well-established library for JWT operations in JavaScript environments.

**Alternatives considered**:
1. jsonwebtoken - Popular but jose has better TypeScript support
2. jose - Modern, well-maintained, good security track record
3. Custom implementation - High security risk and maintenance burden