# 🚀 FastAPI + React 풀스택 템플릿

FastAPI와 React를 활용한 풀스택 웹 애플리케이션 학습용 템플릿
회원가입/로그인 기능이 구현되어 있어 바로 프로젝트를 시작할 수 있음

## 📋 프로젝트 개요

### 🎯 목적
- FastAPI + React 풀스택 개발 학습
- 인증 시스템 구현 패턴 이해
- 현대적인 웹 개발 스택 경험

### 🛠️ 기술 스택

**Backend (FastAPI)**
- **FastAPI**: Python 기반 고성능 웹 프레임워크
- **FastAPI Users**: 인증/인가 시스템 (JWT 토큰 기반)
- **SQLAlchemy**: ORM (Object-Relational Mapping)
- **Pydantic**: 데이터 검증 및 직렬화
- **SQLite/PostgreSQL**: 데이터베이스 (개발/프로덕션)

**Frontend (React)**
- **React 18**: 사용자 인터페이스 라이브러리
- **TypeScript**: 정적 타입 검사
- **Vite**: 빠른 개발 서버 및 빌드 도구
- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크
- **Lucide React**: 아이콘 라이브러리

## 📁 프로젝트 구조

```
fullstack-template/
│
├── backend/                    # FastAPI 백엔드
│   ├── core/                   # 핵심 로직
│   │   ├── auth.py            # JWT 인증 설정
│   │   ├── user_db.py         # User DB 연결
│   │   └── user_manager.py    # 사용자 관리 로직
│   ├── models/                # SQLAlchemy 모델
│   │   ├── user.py           # User 모델
│   │   └── user_base.py      # Base 모델
│   ├── schemas/              # Pydantic 스키마
│   │   └── user.py          # User 스키마 (Request/Response)
│   ├── database.py          # DB 연결 설정
│   ├── main.py             # FastAPI 앱 진입점
│   └── requirements.txt    # Python 의존성
│
├── frontend/                  # React 프론트엔드
│   ├── src/
│   │   ├── pages/           # 페이지 컴포넌트
│   │   │   ├── Login.tsx   # 로그인 페이지
│   │   │   └── Register.tsx # 회원가입 페이지
│   │   ├── App.tsx         # 메인 App 컴포넌트
│   │   ├── main.tsx        # React 진입점
│   │   └── index.css       # Tailwind CSS
│   ├── package.json        # Node.js 의존성
│   ├── tailwind.config.js  # Tailwind 설정
│   └── vite.config.ts      # Vite 설정
│
└── README.md               # 이 파일
```

## 🚀 빠른 시작

### 1. 프로젝트 클론
```bash
git clone <repository-url>
cd fullstack-template
```

### 2. 백엔드 설정 및 실행
```bash
cd backend

# 가상환경 생성 (권장)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# 환경변수 설정
cp .env.example .env
# .env 파일에서 필요한 값들 수정

# 서버 실행
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### 3. 프론트엔드 설정 및 실행
```bash
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 4. 접속 확인
- **프론트엔드**: http://localhost:5173
- **백엔드 API**: http://localhost:8000
- **API 문서**: http://localhost:8000/docs

## 🔧 주요 기능

### ✅ 구현된 기능
- [✓] 회원가입 (이메일/비밀번호)
- [✓] 로그인 (JWT 토큰 기반)
- [✓] 사용자 인증 상태 관리
- [✓] API 요청/응답 처리
- [✓] 에러 핸들링

### 🚧 확장 가능한 기능
- [ ] 사용자 프로필 관리
- [ ] 비밀번호 재설정
- [ ] 이메일 인증
- [ ] 소셜 로그인 (Google, GitHub 등)
- [ ] 사용자 권한 관리 (Role-based)
- [ ] 데이터베이스 마이그레이션

## 📚 학습 포인트

### Backend (FastAPI)
1. **FastAPI Users 활용법**
   - 인증 시스템 구축 패턴
   - JWT 토큰 관리
   - 사용자 모델 확장

2. **SQLAlchemy ORM**
   - 비동기 데이터베이스 연결
   - 모델 정의 및 관계 설정
   - 쿼리 최적화

3. **API 설계 원칙**
   - RESTful API 구조
   - 스키마 검증 (Pydantic)
   - 에러 처리 및 응답 구조

### Frontend (React)
1. **현대적인 React 패턴**
   - 함수형 컴포넌트 + Hooks
   - 상태 관리 (useState, useEffect)
   - TypeScript 활용

2. **API 통신**
   - Fetch API 사용법
   - 비동기 처리 패턴
   - 에러 핸들링

3. **UI/UX**
   - Tailwind CSS 활용법
   - 반응형 디자인
   - 사용자 피드백 (로딩, 에러 메시지)

## 🔍 주요 파일 설명

### Backend 핵심 파일
- **`main.py`**: FastAPI 앱 설정, 라우터 등록, CORS 설정
- **`core/auth.py`**: JWT 인증 백엔드 구성
- **`core/user_manager.py`**: 사용자 생성/관리 로직
- **`models/user.py`**: SQLAlchemy User 모델 정의
- **`schemas/user.py`**: Pydantic 스키마 (API 입출력 검증)

### Frontend 핵심 파일
- **`App.tsx`**: 메인 컴포넌트, 라우팅 설정
- **`pages/Login.tsx`**: 로그인 폼, API 연동
- **`pages/Register.tsx`**: 회원가입 폼, 유효성 검사
- **`index.css`**: Tailwind CSS 설정

## 📝 API 엔드포인트

### 인증 관련
```
POST /auth/register      # 회원가입
POST /auth/jwt/login     # 로그인
POST /auth/jwt/logout    # 로그아웃
GET  /users/me           # 현재 사용자 정보
```

### API 문서
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc


