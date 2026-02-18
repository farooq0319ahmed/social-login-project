from datetime import datetime, timedelta
from typing import Optional
import jwt
from src.config.settings import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from src.models.user import SocialLoginUser


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """
    Create a JWT access token with the given data and expiration time
    """
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token: str):
    """
    Verify a JWT token and return the payload if valid
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.exceptions.ExpiredSignatureError:
        raise Exception("Token has expired")
    except jwt.exceptions.JWTError:
        raise Exception("Invalid token")


def create_token_for_user(user: SocialLoginUser):
    """
    Create a JWT token specifically for a user
    """
    data = {
        "sub": str(user.id),
        "email": user.email,
        "name": user.name,
        "provider": user.provider
    }

    token = create_access_token(data=data)
    return token