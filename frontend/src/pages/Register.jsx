import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      console.log("Register response:", response.data);

      setMessage("Registration successful!");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("user");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      console.error("Registration error:", error);

      setError(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff] flex items-center justify-center px-4 py-8">

      {/* Register Card */}
      <div className="w-full max-w-[390px] bg-white rounded-2xl border border-[#e7eaff] shadow-[0_8px_30px_rgba(70,70,120,0.08)] px-8 py-7">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-[#475569] hover:text-[#635bff] transition mb-3"
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

        {/* Logo */}
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

          <h2 className="text-[17px] font-semibold text-[#111827] mt-5">
            Create Your Account
          </h2>

          <p className="text-[12px] text-[#64748b] mt-1">
            Join us and start chatting with AI
          </p>

        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="mt-6">

          {/* Full Name */}
          <div>
            <label className="block text-[11px] font-medium text-[#475569] mb-1.5">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full h-9 px-3 rounded-md border border-[#dfe3f0] bg-white text-[12px] text-[#1e293b] placeholder-[#a0a8b8] outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10 transition"
            />
          </div>

          {/* Email */}
          <div className="mt-3">
            <label className="block text-[11px] font-medium text-[#475569] mb-1.5">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-9 px-3 rounded-md border border-[#dfe3f0] bg-white text-[12px] text-[#1e293b] placeholder-[#a0a8b8] outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10 transition"
            />
          </div>

          {/* Password */}
          <div className="mt-3">
            <label className="block text-[11px] font-medium text-[#475569] mb-1.5">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-9 px-3 pr-10 rounded-md border border-[#dfe3f0] bg-white text-[12px] text-[#1e293b] placeholder-[#a0a8b8] outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#635bff]"
              >
                {showPassword ? "◉" : "◌"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mt-3">
            <label className="block text-[11px] font-medium text-[#475569] mb-1.5">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full h-9 px-3 pr-10 rounded-md border border-[#dfe3f0] bg-white text-[12px] text-[#1e293b] placeholder-[#a0a8b8] outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10 transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#635bff]"
              >
                {showConfirmPassword ? "◉" : "◌"}
              </button>
            </div>
          </div>

          {/* Role */}
          <div className="mt-4">

            <p className="text-[11px] font-medium text-[#475569] mb-2">
              I am a
            </p>

            <div className="flex items-center gap-5">

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-[#635bff]"
                />

                <span className="text-[11px] text-[#64748b]">
                  User
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-[#635bff]"
                />

                <span className="text-[11px] text-[#64748b]">
                  Admin
                </span>
              </label>

            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-center text-[10px] text-red-500 mt-3">
              {error}
            </p>
          )}

          {/* Success */}
          {message && (
            <p className="text-center text-[10px] text-green-600 mt-3">
              {message}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-9 mt-4 rounded-md bg-gradient-to-r from-[#625bf6] to-[#7068ff] text-white text-[11px] font-semibold shadow-md shadow-indigo-200 hover:from-[#554ef0] hover:to-[#625bf6] transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        {/* Login Link */}
        <p className="text-center text-[10px] text-[#64748b] mt-4">
          Already have an account?{" "}

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-[#625bf6] font-medium hover:underline"
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
}

export default Register;