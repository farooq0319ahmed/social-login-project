---
id: "025"
title: "Vercel build fixes completed"
stage: "tasks"
date: "2026-02-22"
surface: "agent"
model: "claude-sonnet-4-6"
feature: "001-social-login"
branch: "main"
user: "faroo"
command: "sp.tasks"
labels: ["vercel", "nextjs", "build", "fix", "typescript", "cookies"]
links:
  spec: "/mnt/a/social-login-project/specs/001-social-login/spec.md"
  plan: "/mnt/a/social-login-project/specs/001-social-login/plan.md"
  tasks: "/mnt/a/social-login-project/specs/001-social-login/tasks-vercel-fix.md"
  ticket: null
  adr: null
  pr: null
files:
  - "/mnt/a/social-login-project/frontend/next.config.ts"
  - "/mnt/a/social-login-project/frontend/src/app/api/auth/callback/route.ts"
  - "/mnt/a/social-login-project/frontend/src/app/api/auth/google/route.ts"
  - "/mnt/a/social-login-project/frontend/src/app/api/auth/facebook/route.ts"
tests: []
---

# Vercel/Next Build Error Fixes - Completed

## Summary
Fixed Vercel/Next build errors and made `npm run build` succeed by addressing two main issues:
1. Fixed `experimental.serverActions` configuration in next.config.ts
2. Fixed async cookies usage in API routes

## Issues Fixed

### 1. next.config.ts Error
- **Problem**: `experimental.serverActions: true` was invalid for the Next.js version
- **Solution**: Removed the experimental block entirely
- **Additional Fix**: Updated `images.domains` to `images.remotePatterns` to eliminate deprecation warning

### 2. API Route Cookies Error
- **Problem**: `cookies().get()` fails because `cookies()` returns a Promise
- **Solution**: Updated all API routes to use `const cookieStore = await cookies()` pattern
- **Files Updated**:
  - `frontend/src/app/api/auth/callback/route.ts`
  - `frontend/src/app/api/auth/google/route.ts`
  - `frontend/src/app/api/auth/facebook/route.ts`

## Verification
- `npm run build` now completes successfully with no TypeScript errors
- All API routes properly handle async cookies operations
- No warnings related to experimental features or deprecated configurations

## Git Operations
- Changes committed with message: "fix: vercel build (cookies async + next config)"
- Changes pushed to origin main branch

## Outcome
The Next.js application now builds successfully on Vercel with all TypeScript errors resolved.