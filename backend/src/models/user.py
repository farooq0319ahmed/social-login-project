from datetime import datetime
from typing import Optional
from uuid import uuid4
from enum import Enum


class Provider(str, Enum):
    GOOGLE = "google"
    FACEBOOK = "facebook"


class SocialLoginUser:
    def __init__(
        self,
        id: Optional[str] = None,
        email: str = "",
        name: str = "",
        provider: str = "",
        provider_user_id: str = "",
        avatar_url: Optional[str] = None,
        created_at: Optional[datetime] = None,
        updated_at: Optional[datetime] = None,
        is_active: bool = True
    ):
        self.id = id or str(uuid4())
        self.email = email
        self.name = name
        self.provider = provider
        self.provider_user_id = provider_user_id
        self.avatar_url = avatar_url
        self.created_at = created_at or datetime.utcnow()
        self.updated_at = updated_at or datetime.utcnow()
        self.is_active = is_active

    def to_dict(self):
        """Convert the user object to a dictionary"""
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "provider": self.provider,
            "provider_user_id": self.provider_user_id,
            "avatar_url": self.avatar_url,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "is_active": self.is_active
        }

    @staticmethod
    def validate_email(email: str) -> bool:
        """Validate email format"""
        import re
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None

    @staticmethod
    def validate_provider(provider: str) -> bool:
        """Validate provider is one of the allowed values"""
        return provider in [Provider.GOOGLE.value, Provider.FACEBOOK.value]