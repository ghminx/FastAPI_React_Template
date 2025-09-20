/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ 소스 전체 스캔
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
