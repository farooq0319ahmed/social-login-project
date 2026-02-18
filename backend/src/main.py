from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
import os
import ast
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import routers
from src.auth.router import router as auth_router

app = FastAPI(title="Social Login API", version="1.0.0")

# Define allow_origins before using it
cors_origins_str = os.getenv("BACKEND_CORS_ORIGINS", '["http://localhost:3000", "http://localhost:8000"]')
try:
    # Safely evaluate the string as a Python literal (safer than eval)
    allow_origins = ast.literal_eval(cors_origins_str)
except (ValueError, SyntaxError):
    # Fallback to default if parsing fails
    allow_origins = ["http://localhost:3000", "http://localhost:8000"]

# Add SessionMiddleware for OAuth state handling
app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET_KEY", "dev_session_secret_change_me"),
    session_cookie="session",
    max_age=3600,
    same_site="lax",
    https_only=False,
)

# Add CORS middleware (defined only once)
app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include auth routes
app.include_router(auth_router, prefix="/auth", tags=["auth"])

@app.get("/")
def read_root():
    return {"message": "Social Login API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/privacy")
def privacy():
    return {
        "privacy": "This app uses Google and Facebook login for authentication only. No personal data is stored or shared."
    }