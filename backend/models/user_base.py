# backend/models/user.py

from sqlalchemy import Column, Integer, String, DateTime, Boolean, BigInteger, Enum, ForeignKey
from sqlalchemy.orm import relationship

from database import Base
import enum
from datetime import datetime


# 유저 Role Enum 지정(다른값은 들어오지 못하게하기위함)
class UserRole(enum.Enum):
    USER = 'user'
    ADMIN = 'admin'
    
    
# User 모델 
class User(Base):
    
    __tablename__ = "users"
    
    # 기본키 (고유 ID)
    id = Column(Integer, primary_key=True, index=True)
    
    # 사용자명 (중복 불가)
    username = Column(String(25), unique=True, nullable=False)  # unique : 고유값(중복불가설정) nullable : 필수값(NULL 허용안함)
    
    # 이메일 (중복 불가)
    email = Column(String(255), unique=True, nullable=False)
    
    # 비밀번호
    hash_password = Column(String(255), nullable=False)
    
    # 유저 Role
    role = Column(Enum(UserRole), default=UserRole.USER)
    
    # 생성일 
    created_at = Column(DateTime, default=datetime.utcnow)       # utcnow : UTC 표준시간
    


