import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // FormData 형식으로 데이터 준비 (FastAPI Users 요구사항)
      const formData = new FormData();
      formData.append('username', email); // FastAPI Users는 username 필드 사용
      formData.append('password', password);

      const response = await fetch('http://localhost:8000/auth/jwt/login', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        
        // 토큰을 localStorage에 저장
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('token_type', data.token_type);
        
        console.log("로그인 성공:", data);
        alert("로그인 성공!");
        
        // 여기서 다른 페이지로 리다이렉트하거나 상태 변경
        // window.location.href = '/dashboard';
        
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">환영합니다</h1>
          <p className="text-gray-600">계정에 로그인하세요</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 
                         focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 
                         transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="password">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 
                         focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 
                         transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-600 text-sm">
              <input type="checkbox" className="mr-2 accent-indigo-500 w-4 h-4" disabled={isLoading} />
              로그인 상태 유지
            </label>
            <a href="/forgot-password" className="text-sm text-indigo-500 hover:underline">
              비밀번호 찾기
            </a>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 
                       rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                       transition-all duration-200 active:transform active:translate-y-0
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                       flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                로그인 중...
              </>
            ) : (
              "로그인"
            )}
          </button>

          <div className="text-center pt-4">
            <p className="text-gray-600 text-sm">
              계정이 없으신가요?{" "}
              <a href="/register" className="text-indigo-500 font-semibold hover:underline">
                회원가입
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;