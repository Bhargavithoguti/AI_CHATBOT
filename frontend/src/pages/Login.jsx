import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  
const handleLogin = async (e) => {
  e.preventDefault();

  setMessage("");

  try {
    const response = await axios.post(
      `${API_URL}/api/auth/login`,
      {
        email,
        password,
      }
    );

    const { token, user } = response.data;

    // Save login information in Zustand
    login(token, user);

    console.log("Login successful:", user);

    // Redirect based on role
    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  } catch (error) {
    console.error("Login error:", error);

    setMessage(
      error.response?.data?.message || "Login failed"
    );
  }
};

  return (
    <div className="min-h-screen bg-[#f7f9ff] flex items-center justify-center px-4">

      {/* Login Card */}
      <div className="w-full max-w-[390px] bg-white rounded-2xl border border-[#e7eaff] shadow-[0_8px_30px_rgba(70,70,120,0.08)] px-8 py-7">

        {/* Back Arrow */}
        <button
          type="button"
          className="text-[#475569] hover:text-[#5b5bf7] transition mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Logo + Brand */}
        <div className="flex flex-col items-center">

          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#625bf6] to-[#746cff] flex items-center justify-center shadow-md shadow-indigo-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="7" width="16" height="12" rx="4" />
              <path d="M9 12h.01" />
              <path d="M15 12h.01" />
              <path d="M9 16h6" />
              <path d="M12 7V4" />
              <circle cx="12" cy="3" r="1" />
            </svg>
          </div>

          <h1 className="text-[17px] font-bold text-[#111827] mt-2">
            AI Chatbot
          </h1>

          <h2 className="text-[17px] font-semibold text-[#111827] mt-6">
            Welcome Back!
          </h2>

          <p className="text-[12px] text-[#64748b] mt-1">
            Login to your account
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-7">

          {/* Email */}
          <div>
            <label className="block text-[11px] font-medium text-[#475569] mb-1.5">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-10 px-3 rounded-md border border-[#dfe3f0] bg-white text-[12px] text-[#1e293b] placeholder-[#a0a8b8] outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10 transition"
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="block text-[11px] font-medium text-[#475569] mb-1.5">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-10 px-3 rounded-md border border-[#dfe3f0] bg-white text-[12px] text-[#1e293b] placeholder-[#a0a8b8] outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10 transition"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mt-3">

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#635bff] cursor-pointer"
              />

              <span className="text-[10px] text-[#64748b]">
                Remember me
              </span>
            </label>

            <button
              type="button"
              className="text-[10px] text-[#635bff] hover:underline"
            >
              Forgot Password?
            </button>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-10 mt-5 rounded-md bg-gradient-to-r from-[#625bf6] to-[#7068ff] text-white text-[11px] font-semibold shadow-md shadow-indigo-200 hover:from-[#554ef0] hover:to-[#625bf6] transition"
          >
            Login
          </button>

        </form>

        {/* Message */}
        {message && (
          <p className="text-center text-[11px] text-[#625bf6] mt-4">
            {message}
          </p>
        )}

        {/* Register */}
        <p className="text-center text-[10px] text-[#64748b] mt-5">
          Don't have an account?{" "}
          <button
  type="button"
  onClick={() => navigate("/register")}
  className="text-[#625bf6] font-medium hover:underline"
>
  Register
</button>
        </p>

      </div>
    </div>
  );
}

export default Login;