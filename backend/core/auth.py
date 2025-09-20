# backend/core/auth.py
import uuid
from fastapi_users.authentication import AuthenticationBackend, BearerTransport, JWTStrategy

import os 
from dotenv import load_dotenv

load_dotenv()

SECRET = os.getenv('SECRET_KEY')

# JWT를 HTTP Authorization 헤더에 Bearer 방식으로 전달
bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")

# JWT 발급 전략
def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET, lifetime_seconds=3600)  # 1시간 유효

# 인증 백엔드 생성
auth_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)
