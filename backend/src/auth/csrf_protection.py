import secrets
from datetime import datetime, timedelta
from typing import Dict, Optional
from src.models.auth_session import AuthenticationSession


class CSRFProtection:
    def __init__(self):
        self.active_sessions: Dict[str, AuthenticationSession] = {}

    def generate_state(self, provider: str) -> str:
        """
        Generate a new state parameter for CSRF protection
        """
        state = secrets.token_urlsafe(32)

        # Create an authentication session to track this request
        auth_session = AuthenticationSession(
            state=state,
            provider=provider
        )

        # Store the session temporarily
        self.active_sessions[state] = auth_session

        return state

    def validate_state(self, state: str) -> bool:
        """
        Validate the state parameter exists and is not expired
        """
        if state not in self.active_sessions:
            return False

        auth_session = self.active_sessions[state]

        if auth_session.is_expired():
            self.remove_session(state)
            return False

        return True

    def get_session(self, state: str) -> Optional[AuthenticationSession]:
        """
        Get the authentication session for a given state
        """
        if state not in self.active_sessions:
            return None

        auth_session = self.active_sessions[state]

        if auth_session.is_expired():
            self.remove_session(state)
            return None

        return auth_session

    def remove_session(self, state: str):
        """
        Remove a session after successful validation
        """
        if state in self.active_sessions:
            del self.active_sessions[state]

    def cleanup_expired_sessions(self):
        """
        Remove all expired sessions (call periodically)
        """
        expired_states = [
            state for state, session in self.active_sessions.items()
            if session.is_expired()
        ]

        for state in expired_states:
            del self.active_sessions[state]


# Global instance for the application
csrf_protection = CSRFProtection()