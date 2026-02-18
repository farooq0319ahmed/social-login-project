from typing import Optional
from src.models.user import SocialLoginUser


class UserService:
    # In-memory storage for users (in production, use a database)
    users_db = {}

    @classmethod
    def get_user_by_provider_id(cls, provider: str, provider_user_id: str) -> Optional[SocialLoginUser]:
        """
        Retrieve a user by their provider and provider-specific user ID
        """
        key = f"{provider}:{provider_user_id}"
        return cls.users_db.get(key)

    @classmethod
    def create_or_update_user(cls, user_data: SocialLoginUser) -> SocialLoginUser:
        """
        Create a new user or update an existing one
        """
        key = f"{user_data.provider}:{user_data.provider_user_id}"

        # Check if user already exists
        existing_user = cls.users_db.get(key)
        if existing_user:
            # Update existing user's info
            existing_user.email = user_data.email
            existing_user.name = user_data.name
            existing_user.avatar_url = user_data.avatar_url
            existing_user.updated_at = user_data.updated_at
            cls.users_db[key] = existing_user
            return existing_user
        else:
            # Create new user
            cls.users_db[key] = user_data
            return user_data

    @classmethod
    def get_user_by_email(cls, email: str) -> Optional[SocialLoginUser]:
        """
        Find a user by email (in case of linking accounts)
        """
        for user in cls.users_db.values():
            if user.email == email:
                return user
        return None

    @classmethod
    def validate_user(cls, user: SocialLoginUser) -> bool:
        """
        Validate user data before saving
        """
        if not user.validate_email(user.email):
            return False
        if not user.validate_provider(user.provider):
            return False
        if not user.name or not user.email:
            return False
        return True