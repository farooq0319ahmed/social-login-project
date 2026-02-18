---
id: 8
title: "Fix CORS Error"
stage: refactor
date_iso: "2026-02-11"
surface: agent
model: claude-sonnet-4.5
feature: 001-social-login
branch: 001-social-login
user: user
command: "/sp.specify"
labels: ["cors", "fastapi", "configuration", "bugfix"]
files_yaml:
  - "backend/src/main.py"
tests_yaml: []
links:
  spec: null
  plan: null
  tasks: null
  ticket: null
  adr: null
  pr: null
---

# Prompt History Record

## PROMPT_TEXT

```
I am getting this error while running my FastAPI backend with uvicorn:

AttributeError: 'list' object has no attribute 'split'

Error trace:
File "/backend/src/main.py", line 17, in <module>
allow_origins=os.getenv("BACKEND_CORS_ORIGINS", ["*"]).split(",")

It seems the default value passed to os.getenv is a list, but then .split(",") is being called on it.

Please:

1. Explain clearly why this error happens.
2. Provide the correct fixed version of this CORS configuration code.
3. Give me the best production-ready way to handle BACKEND_CORS_ORIGINS from environment variables.
4. Show the full corrected CORS middleware block for FastAPI.

Keep the solution clean and production safe.
```

## RESPONSE_TEXT

Fixed the CORS configuration error by properly handling environment variables for CORS origins. The issue was that os.getenv() returns a string (or None) but was being given a list as default value and then .split(",") was called on it. The solution uses ast.literal_eval() to safely parse the environment variable as a Python list literal, with proper error handling and fallback defaults.

## Outcome

Successfully resolved the AttributeError by implementing a safe and production-ready CORS configuration that properly handles environment variables as Python list literals.

## Evaluation

The fix addresses all requirements:
- Explains the root cause of the error
- Provides a correct fixed version of the CORS configuration
- Offers a production-ready approach for handling CORS origins from environment variables
- Shows the full corrected CORS middleware block
- Maintains clean and safe code practices