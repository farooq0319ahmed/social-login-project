import secrets
import hashlib


def generate_random_state(length: int = 32) -> str:
    """
    Generate a cryptographically random state parameter for CSRF protection
    """
    return secrets.token_urlsafe(length)


def hash_value(value: str, salt: str = "") -> str:
    """
    Hash a value with an optional salt for secure storage
    """
    return hashlib.sha256((value + salt).encode()).hexdigest()


def verify_hash(value: str, hashed_value: str, salt: str = "") -> bool:
    """
    Verify that a value matches a hash
    """
    return hash_value(value, salt) == hashed_value


def generate_nonce() -> str:
    """
    Generate a cryptographic nonce for additional security
    """
    return secrets.token_urlsafe(16)