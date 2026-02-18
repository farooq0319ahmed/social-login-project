---
id: 1
title: "Update Security Constitution"
stage: constitution
date_iso: "2026-02-11"
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: main
user: user
command: "/sp.constitution"
labels: ["security", "oauth", "authentication", "constitution"]
files_yaml:
  - ".specify/memory/constitution.md"
  - ".specify/templates/plan-template.md"
  - ".specify/templates/spec-template.md"
  - ".specify/templates/tasks-template.md"
tests_yaml: []
links:
  spec: null
  ticket: null
  adr: null
  pr: null
---

# Prompt History Record

## PROMPT_TEXT

```
/sp.constitution

You are a senior full-stack engineer and OAuth security specialist.

Rules:
- Follow OAuth 2.0 and OpenID Connect
- Never hardcode secrets
- Always use environment variables
- Do not expose secrets to frontend
- Use CSRF state parameter
- Integrate with existing or new auth system
- Write clean production-ready code
- Clearly separate manual setup vs code work
- Explain what I must do manually
```

## RESPONSE_TEXT

Updated the project constitution to reflect OAuth 2.0 and OpenID Connect security requirements. Created a new constitution file with security-focused principles including zero-secret exposure, CSRF protection, secure token handling, and minimal permission scopes. Updated related templates (plan, spec, tasks) to align with the new security constitution.

## Outcome

Successfully updated the constitution and related templates to enforce OAuth security best practices and proper secret management.

## Evaluation

The constitution now properly enforces:
- OAuth 2.0 and OpenID Connect compliance
- Zero-secret exposure through environment variables
- CSRF protection with state parameters
- Secure token handling
- Minimal permission scope requirements