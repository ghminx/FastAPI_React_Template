# backend/core/user_manager.py
import uuid
from fastapi import Depends, Request
from fastapi_users import BaseUserManager, UUIDIDMixin
from models.user import User
from core.user_db import get_user_db

import os 
from dotenv import load_dotenv

load_dotenv()

SECRET = os.getenv('SECRET_KEY')

class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, user: User, request: Request | None = None) -> None:
        print(f"User {user.id} has registered.")
        
        
        
        
async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)