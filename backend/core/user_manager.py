# backend/core/user_manager.py
"""
사용자 관리 매니저 모듈

FastAPI Users를 활용한 사용자 인증 시스템의 핵심 매니저 클래스.
회원가입, 로그인, 비밀번호 재설정 등 사용자 관련 비즈니스 로직을 처리.
"""
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
    
    # 비밀번호 재설정 토큰 생성 시 사용할 비밀키
    reset_password_token_secret = SECRET
    
    # 이메일 인증 토큰 생성 시 사용할 비밀키
    verification_token_secret = SECRET

    async def on_after_register(self, user: User, request: Request | None = None) -> None:
        print(f"User {user.id} has registered.")
        
        
async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)