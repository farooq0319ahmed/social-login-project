from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
from .google import google_login, google_callback
from .facebook import facebook_login, facebook_callback


router = APIRouter()


@router.get("/google")
async def google_auth(request: Request):
    return await google_login(request)


@router.get("/google/callback")
async def google_auth_callback(request: Request):
    return await google_callback(request)


@router.get("/facebook")
async def facebook_auth(request: Request):
    return await facebook_login(request)


@router.get("/facebook/callback")
async def facebook_auth_callback(request: Request):
    return await facebook_callback(request)