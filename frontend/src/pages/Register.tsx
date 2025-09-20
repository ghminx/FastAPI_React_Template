import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // 비밀번호 확인
    if (password !== confirm) {
      setError("비밀번호가 일치하지 않습니다.");
      setIsLoading(false);
      return;
    }

    // 비밀번호 길이 확인
    // if (password.length < 6) {
    //   setError("비밀번호는 6자 이상이어야 합니다.");
    //   setIsLoading(false);
    //   return;
    // }

    try {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          username : name
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("회원가입 성공:", data);
        setSuccess("회원가입이 완료되었습니다! 로그인 페이지로 이동하세요.");
        
        // 폼 초기화
        setName("");
        setEmail("");
        setPassword("");
        setConfirm("");
        
        // 3초 후 로그인 페이지로 리다이렉트
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
        
      } else {
        const errorData = await response.json();
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            setError(errorData.detail[0].msg || "회원가입에 실패했습니다.");
          } else {
            setError(errorData.detail || "회원가입에 실패했습니다.");
          }
        } else {
          setError("회원가입에 실패했습니다.");
        }
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row min-h-[600px] overflow-hidden">
        {/* 왼쪽 패널 */}
        <div className="flex-1 flex flex-col justify-center p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
              회원가입 ✨
            </h1>
            <p className="text-gray-500 text-base">
              새 계정을 만들어 시작해보세요
            </p>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* 성공 메시지 */}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div className="flex flex-col gap-6">
            {/* 이름 */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                이름
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 
                             focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 
                             transition disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* 이메일 */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                이메일
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 
                             focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 
                             transition disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* 비밀번호 */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                비밀번호
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 
                             focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 
                             transition disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">6자 이상 입력해주세요</p>
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label
                htmlFor="confirm"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                비밀번호 확인
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 
                             focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 
                             transition disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              {password && confirm && password !== confirm && (
                <p className="text-xs text-red-500 mt-1">비밀번호가 일치하지 않습니다</p>
              )}
            </div>

            {/* 회원가입 버튼 */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg 
                         font-semibold shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                         flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  처리 중...
                </>
              ) : (
                "회원가입"
              )}
            </button>

            {/* 로그인 링크 */}
            <div className="text-center mt-2 text-gray-500 text-sm">
              이미 계정이 있으신가요?{" "}
              <a
                href="/login"
                className="text-indigo-500 font-semibold hover:underline"
              >
                로그인
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;