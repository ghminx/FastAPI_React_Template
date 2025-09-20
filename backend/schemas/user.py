# backend/schemas/user.py
import uuid
from datetime import datetime
from fastapi_users import schemas
from pydantic import EmailStr

# 응답용 (비밀번호 제외)
class UserRead(schemas.BaseUser[uuid.UUID]):
    username: str
    created_at: datetime

# 생성 요청용
class UserCreate(schemas.BaseUserCreate):
    username: str


