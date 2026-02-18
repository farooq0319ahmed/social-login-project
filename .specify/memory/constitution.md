<!--
Sync Impact Report:
Version change: 1.0.0 → 1.1.0
Modified principles: All principles updated for OAuth security focus
Added sections: Security Requirements section
Removed sections: None
Templates requiring updates: ⚠ pending - .specify/templates/plan-template.md, .specify/templates/spec-template.md, .specify/templates/tasks-template.md
Follow-up TODOs: None
-->
# Social Login Project Constitution

## Core Principles

### I. OAuth 2.0 and OpenID Connect Compliance
All authentication flows MUST strictly follow OAuth 2.0 and OpenID Connect standards; Implementations must pass standard compliance tests; Every OAuth provider integration must follow RFC 6749 and relevant extensions.

### II. Zero-Secret Exposure
NEVER hardcode secrets in source code; Secrets MUST be stored in environment variables or secure vaults; Frontend code MUST NOT have access to backend secrets; All credentials must be loaded at runtime from secure sources.

### III. CSRF Protection with State Parameter
Every OAuth flow MUST implement CSRF protection using the state parameter; State values must be cryptographically random and validated upon callback; Sessions must be tied to state parameters to prevent cross-site request forgery attacks.

### IV. Secure Token Handling
Access tokens and refresh tokens must be stored securely (HTTP-only cookies for web, secure storage for mobile); Tokens must have proper expiration and rotation mechanisms; Token introspection and revocation must be supported.

### V. Test-First Security Approach (NON-NEGOTIABLE)
Security tests must be written before implementation; Authentication flows must be tested for common vulnerabilities; Penetration testing scenarios must be defined and automated; Red-Green-Refactor cycle strictly enforced for security features.

### VI. Minimal Permission Scopes
OAuth applications MUST request only necessary scopes; Scope requests must be justified and documented; Regular audits of granted permissions must be conducted; Principle of least privilege applied to all integrations.

## Security Requirements
All authentication implementations must undergo security review before deployment; Secret management follows environment variable standards; Session management must implement secure cookie policies; Rate limiting must be applied to authentication endpoints; Audit logging required for all authentication attempts; Data encryption in transit and at rest must be implemented.

## Development Workflow
OAuth provider integrations require security checklist completion; All authentication code must pass static analysis tools; Peer reviews must include security-focused assessment; Integration tests must cover authentication failure scenarios; Deployment requires security scan approval.

## Governance
This constitution governs all authentication and authorization implementations; Amendments require security team approval; All PRs must verify compliance with OAuth standards; Security vulnerabilities must be reported immediately; Code reviews must validate secret handling practices.

**Version**: 1.1.0 | **Ratified**: 2026-02-11 | **Last Amended**: 2026-02-11
