# Implementation Plan: Next.js-Only Social Login Conversion

**Branch**: `001-nextjs-only-conversion` | **Date**: 2026-02-22 | **Spec**: [specs/001-social-login/spec.md]
**Input**: Feature specification from `/specs/001-social-login/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Convert existing Python backend to Next.js API routes, eliminating external backend dependency. All OAuth functionality (Google/Facebook) and JWT handling will be managed through Next.js API routes, enabling full deployment on Vercel without external backend services.

## Technical Context

**Language/Version**: TypeScript/JavaScript for frontend, Node.js runtime for API routes
**Primary Dependencies**: Next.js 16+, React 19+, jose library for JWT handling, OAuth 2.0 libraries
**Storage**: N/A (stateless authentication with JWT tokens)
**Testing**: Jest/React Testing Library for frontend, manual testing for OAuth flows
**Target Platform**: Web application deployable on Vercel
**Project Type**: Web application with integrated authentication
**Performance Goals**: OAuth flows complete within 30 seconds, API routes respond under 500ms
**Constraints**: <500ms p95 for API routes, JWT tokens must be properly signed and validated, CSRF protection implemented
**Scale/Scope**: Single application supporting thousands of concurrent OAuth sessions

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- ✅ OAuth 2.0 and OpenID Connect compliance verified (using standard OAuth flows)
- ✅ Zero-secret exposure validated (secrets stored in environment variables only)
- ✅ CSRF protection with state parameter planned (implemented in API routes)
- ✅ Secure token handling approach defined (JWT tokens with proper signing)
- ✅ Minimal permission scopes approach confirmed (only email, profile requested)
- ✅ Security requirements alignment verified (all security principles met)

## Project Structure

### Documentation (this feature)

```text
specs/001-social-login/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
frontend/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── google/
│   │   │       │   └── route.ts
│   │   │       ├── facebook/
│   │   │       │   └── route.ts
│   │   │       ├── callback/
│   │   │       │   └── route.ts
│   │   │       ├── me/
│   │   │       │   └── route.ts
│   │   │       └── logout/
│   │   │           └── route.ts
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── page.js
│   │   ├── privacy-policy/
│   │   │   └── page.js
│   │   └── data-deletion/
│   │       └── page.js
│   ├── components/
│   │   └── auth/
│   │       ├── GoogleLoginButton.js
│   │       └── FacebookLoginButton.js
│   ├── services/
│   │   └── authService.js
│   └── utils/
├── .env.local           # Environment variables
├── next.config.ts       # Next.js configuration
├── package.json         # Dependencies
└── README.md            # Documentation
```

**Structure Decision**: Web application with frontend-only architecture using Next.js API routes for all backend functionality. This eliminates the need for a separate backend service while maintaining security and scalability.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | | No violations identified |
