# backend/models/user.py

from sqlalchemy import Column, Integer, String, DateTime, Boolean, BigInteger, Enum, ForeignKey
from sqlalchemy.orm import relationship

from database import Base
import enum
from datetime import datetime

from fastapi_users.db import SQLAlchemyBaseUserTableUUID



# 유저 Role Enum 지정(다른값은 들어오지 못하게하기위함)
class UserRole(enum.Enum):
    USER = 'user'
    ADMIN = 'admin'
    
    
# User 모델 
class User(SQLAlchemyBaseUserTableUUID, Base):
    
    __tablename__ = "users"
    

    # fastapi-users가 제공하는 기본 필드들:
    # id (UUID)                : 각 사용자를 식별하는 고유 ID (UUID 형식, Primary Key)
    # email (String)           : 로그인 ID로 사용되는 이메일, 고유(unique) 제약조건이 걸림
    # hashed_password (String) : 해시 처리된 비밀번호 (평문 저장 ❌, bcrypt 등 알고리즘으로 암호화됨)
    # is_active (Boolean)      : 계정 활성 상태 (False면 로그인 불가, 계정 정지 등에 활용)
    # is_superuser (Boolean)   : 슈퍼유저 권한 여부 (True면 관리자 권한 → 모든 권한 허용)
    # is_verified (Boolean)    : 이메일 인증 여부 (회원가입 후 이메일 검증 로직에서 활용)

        
    # 사용자명 (중복 불가)
    username = Column(String(25), unique=True, nullable=False)  # unique : 고유값(중복불가설정) nullable : 필수값(NULL 허용안함)

    # 생성일 
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)       # utcnow : UTC 표준시간
    


