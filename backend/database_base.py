import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# .env 파일에 정의된 환경변수 로드
# 예: DATABASE_URL=mysql+pymysql://user:password@host:port/dbname
load_dotenv()

# 환경변수에서 DB URL 불러오기
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL 환경변수가 설정되지 않았습니다.")

# 데이터베이스 엔진 생성
# - pool_pre_ping=True : 커넥션 풀에서 가져온 연결이 유효한지 확인 (끊긴 연결 자동 감지)
# - pool_recycle=3600  : 커넥션이 1시간 이상 유지되면 재연결 (MySQL 연결 끊김 방지)
# - echo=False         : 실행되는 SQL문을 로그에 출력할지 여부 (개발 중에는 True로 두면 디버깅에 좋음)
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=3600,
    echo=False
)

# 세션 팩토리(sessionmaker) 생성
# - autocommit=False : 트랜잭션을 자동 커밋하지 않음 (명시적으로 commit 필요)
# - autoflush=False  : 쿼리 실행 전에 자동 flush 하지 않음 (원할 때만 flush)
# - bind=engine      : 위에서 만든 엔진에 연결
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 모든 모델에서 상속받을 Base 클래스
# 나중에 models/*.py 에서 class User(Base): 처럼 사용
Base = declarative_base()

# 의존성 주입용 DB 세션 함수
# FastAPI의 Depends(get_db)로 호출하면
# - 요청 시작 시 DB 세션을 열고
# - 요청 처리 후 finally 블록에서 세션을 닫음
def get_db():
    db = SessionLocal()
    try:
        yield db  # 요청 핸들러에 세션 제공
    finally:
        db.close()  # 요청이 끝나면 세션 정리
