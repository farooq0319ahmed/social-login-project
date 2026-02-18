---
id: 13
title: "Add Privacy Policy Endpoint"
stage: misc
date_iso: "2026-02-14"
surface: agent
model: claude-sonnet-4.5
feature: 001-social-login
branch: 001-social-login
user: user
command: "/sp.specify"
labels: ["privacy", "endpoint", "api", "compliance"]
files_yaml:
  - "backend/src/main.py"
tests_yaml: []
links:
  spec: "/specs/001-social-login/spec.md"
  plan: "/specs/001-social-login/plan.md"
  tasks: "/specs/001-social-login/tasks.md"
  ticket: null
  adr: null
  pr: null
---

# Prompt History Record

## PROMPT_TEXT

```
You are working in my repo: /mnt/a/social-login-project

Task: Add a privacy policy endpoint to the FastAPI backend.

Context:
- Backend runs with: uvicorn src.main:app --reload
- The FastAPI app is defined in: backend/src/main.py
- I need a GET endpoint at /privacy that returns this JSON:
  {
    "privacy": "This app uses Google and Facebook login for authentication only. No personal data is stored or shared."
  }

Requirements:
1) Open backend/src/main.py
2) Add this route near the existing root/health routes (do not break existing code):

   @app.get("/privacy")
   def privacy():
       return {
           "privacy": "This app uses Google and Facebook login for authentication only. No personal data is stored or shared."
       }

3) Ensure formatting and imports remain correct. Do not remove existing middleware, routers, or routes.
4) Run the backend (or instruct the exact command) and verify by curling:
   curl http://127.0.0.1:8000/privacy
   It must return the JSON above.
5) If src.main is not pointing to backend/src/main.py, locate the correct file that defines `app = FastAPI(...)` and apply the same change there.

Output:
- Show the exact code diff (before/after or patch format)
- Show the verification result of the curl request
```

## RESPONSE_TEXT

Successfully added the privacy policy endpoint to the FastAPI backend. The endpoint returns the required JSON response with the privacy statement. Verified that the endpoint works correctly by starting the server and testing with curl.

## Outcome

Privacy policy endpoint successfully implemented and tested.

## Evaluation

The privacy endpoint meets all requirements:
- Added to the correct file (backend/src/main.py)
- Returns the exact JSON specified
- Located near existing root/health routes
- Does not break existing code
- Verified working with curl request