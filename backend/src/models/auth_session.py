from datetime import datetime, timedelta
from typing import Optional
import secrets


class AuthenticationSession:
    def __init__(
        self,
        state: Optional[str] = None,
        created_at: Optional[datetime] = None,
        expires_at: Optional[datetime] = None,
        provider: Optional[str] = None,
        nonce: Optional[str] = None
    ):
        self.state = state or secrets.token_urlsafe(32)
        self.created_at = created_at or datetime.utcnow()
        self.expires_at = expires_at or (datetime.utcnow() + timedelta(minutes=10))  # 10 min expiry
        self.provider = provider
        self.nonce = nonce or secrets.token_urlsafe(32)  # Additional security measure

    def is_expired(self) -> bool:
        """Check if the authentication session is expired"""
        return datetime.utcnow() > self.expires_at

    def to_dict(self):
        """Convert the session object to a dictionary"""
        return {
            "state": self.state,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "expires_at": self.expires_at.isoformat() if self.expires_at else None,
            "provider": self.provider,
            "nonce": self.nonce
        }

    def validate_state(self, provided_state: str) -> bool:
        """Validate the provided state matches the session state"""
        return self.state == provided_state