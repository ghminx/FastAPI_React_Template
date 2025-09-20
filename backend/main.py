import uuid

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from database import create_db_and_tables

# 모델이 정의되야 자동으로 DB에 테이블 생성됨
from models.user import User

# fastapi_users 
from fastapi_users import FastAPIUsers


# 스키마 
from schemas.user import UserRead, UserCreate


# 라우터 정의 
from core.user_manager import get_user_manager
from core.auth import auth_backend

app = FastAPI()

# CORS 설정 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)

# 회원가입 라우터 등록
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)


# 로그인 / 로그아웃
app.include_router(
    fastapi_users.get_auth_router(auth_backend, requires_verification=False),
    prefix="/auth/jwt",
    tags=["auth"],
)


# 앱 시작할 때 테이블 생성
@app.on_event("startup")
async def on_startup():
    await create_db_and_tables()



    
# uvicorn main:app --host 0.0.0.0 --port 8000 --reload