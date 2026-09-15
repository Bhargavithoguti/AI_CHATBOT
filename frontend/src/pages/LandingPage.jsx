import { useNavigate } from "react-router-dom";
import  useAuthStore  from "../store/authStore";

function LandingPage() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useAuthStore();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-[#070d1a] text-white"
          : "bg-[#f5f8ff] text-[#172554]"
      }`}
    >
      {/* Navbar */}
      <header
        className={`border-b ${
          darkMode ? "border-white/10" : "border-indigo-100"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-bold sm:text-base"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500 text-lg text-white">
              💬
            </span>
            <span>AI Chatbot</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 text-sm md:flex">
            <a
              href="#home"
              className="transition hover:text-indigo-500"
            >
              Home
            </a>
            <a
              href="#features"
              className="transition hover:text-indigo-500"
            >
              Features
            </a>
            <a
              href="#about"
              className="transition hover:text-indigo-500"
            >
              About
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleDarkMode}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border text-sm ${
                darkMode
                  ? "border-white/15 bg-white/5"
                  : "border-indigo-100 bg-white"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => navigate("/login")}
              className="rounded-lg border border-indigo-400 px-3 py-2 text-xs font-medium text-indigo-500 transition hover:bg-indigo-500 hover:text-white sm:px-5 sm:text-sm"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="rounded-lg bg-indigo-500 px-3 py-2 text-xs font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-600 sm:px-5 sm:text-sm"
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main id="home">
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 md:grid-cols-2 md:py-20 lg:gap-20">
          {/* Hero Text */}
          <div className="text-center md:text-left">
            <div
              className={`mb-5 inline-flex rounded-full px-4 py-2 text-xs font-medium ${
                darkMode
                  ? "bg-indigo-500/10 text-indigo-300"
                  : "bg-indigo-100 text-indigo-600"
              }`}
            >
              Your smart AI companion
            </div>

            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Your Personal
              <span className="block text-indigo-500">
                AI Assistant
              </span>
            </h1>

            <p
              className={`mx-auto mt-6 max-w-xl text-sm leading-7 sm:text-base md:mx-0 ${
                darkMode ? "text-slate-300" : "text-slate-500"
              }`}
            >
              Ask anything, get instant answers. Chat with an intelligent
              assistant designed to help you learn, create, and solve problems
              faster.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
              <button
                onClick={() => navigate("/register")}
                className="rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-600"
              >
                Get Started →
              </button>

              <a
                href="#features"
                className={`rounded-xl border px-6 py-3 text-sm font-semibold transition ${
                  darkMode
                    ? "border-white/20 hover:bg-white/10"
                    : "border-indigo-200 bg-white hover:bg-indigo-50"
                }`}
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Robot Illustration */}
          <div className="relative flex justify-center">
            <div
              className={`absolute h-64 w-64 rounded-full blur-3xl sm:h-80 sm:w-80 ${
                darkMode ? "bg-indigo-700/30" : "bg-indigo-200/60"
              }`}
            ></div>

            <div className="relative w-full max-w-md">
              {/* Floating Chat Bubbles */}
              <div className="absolute left-0 top-5 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg">
                Hello!
              </div>

              <div className="absolute right-0 top-24 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg">
                Ask me anything
              </div>

              {/* Robot */}
              <div
                className={`mx-auto mt-12 flex h-64 w-64 items-center justify-center rounded-[35%] border-8 border-indigo-300 shadow-2xl sm:h-80 sm:w-80 ${
                  darkMode
                    ? "bg-[#111c35] shadow-indigo-900/40"
                    : "bg-white shadow-indigo-200"
                }`}
              >
                <div className="relative flex h-40 w-48 items-center justify-center rounded-[45%] bg-gradient-to-br from-indigo-400 to-indigo-700 shadow-xl sm:h-48 sm:w-56">
                  <div className="absolute -top-7 h-8 w-2 rounded-full bg-indigo-500"></div>
                  <div className="absolute -top-10 h-5 w-5 rounded-full bg-indigo-400"></div>

                  <div className="flex gap-8">
                    <div className="h-7 w-7 rounded-full bg-white shadow-inner sm:h-8 sm:w-8"></div>
                    <div className="h-7 w-7 rounded-full bg-white shadow-inner sm:h-8 sm:w-8"></div>
                  </div>

                  <div className="absolute bottom-6 h-2 w-16 rounded-full bg-white/80"></div>
                </div>
              </div>

              <div className="absolute bottom-0 left-3 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg">
                I'm here to help
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className={`border-t px-5 py-14 sm:px-8 sm:py-20 ${
            darkMode ? "border-white/10" : "border-indigo-100"
          }`}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold text-indigo-500">
                WHY CHOOSE US
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Everything you need in one place
              </h2>

              <p
                className={`mt-4 text-sm leading-7 sm:text-base ${
                  darkMode ? "text-slate-300" : "text-slate-500"
                }`}
              >
                Get quick answers, manage your conversations, and enjoy a
                secure AI-powered experience.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div
                className={`rounded-2xl border p-6 text-center transition hover:-translate-y-1 ${
                  darkMode
                    ? "border-white/10 bg-white/5"
                    : "border-indigo-100 bg-white shadow-sm"
                }`}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">
                  ⚡
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  Instant Responses
                </h3>

                <p
                  className={`mt-3 text-sm leading-6 ${
                    darkMode ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  Get quick and accurate answers to your questions whenever
                  you need them.
                </p>
              </div>

              {/* Feature 2 */}
              <div
                className={`rounded-2xl border p-6 text-center transition hover:-translate-y-1 ${
                  darkMode
                    ? "border-white/10 bg-white/5"
                    : "border-indigo-100 bg-white shadow-sm"
                }`}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">
                  💬
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  Chat History
                </h3>

                <p
                  className={`mt-3 text-sm leading-6 ${
                    darkMode ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  Access your previous conversations and continue learning
                  from where you stopped.
                </p>
              </div>

              {/* Feature 3 */}
              <div
                className={`rounded-2xl border p-6 text-center transition hover:-translate-y-1 sm:col-span-2 lg:col-span-1 ${
                  darkMode
                    ? "border-white/10 bg-white/5"
                    : "border-indigo-100 bg-white shadow-sm"
                }`}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">
                  🔒
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  Secure & Private
                </h3>

                <p
                  className={`mt-3 text-sm leading-6 ${
                    darkMode ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  Your conversations are protected with secure authentication
                  and controlled access.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className={`px-5 py-14 sm:px-8 sm:py-20 ${
            darkMode ? "bg-[#0b1426]" : "bg-white"
          }`}
        >
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              A smarter way to get things done
            </h2>

            <p
              className={`mt-5 text-sm leading-7 sm:text-base ${
                darkMode ? "text-slate-300" : "text-slate-500"
              }`}
            >
              AI Chatbot helps you find information, solve problems, and
              explore ideas through a simple and friendly chat interface.
              Start your conversation today.
            </p>

            <button
              onClick={() => navigate("/register")}
              className="mt-7 rounded-xl bg-indigo-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
            >
              Start Chatting →
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className={`border-t px-5 py-6 text-center text-xs sm:px-8 ${
          darkMode
            ? "border-white/10 text-slate-400"
            : "border-indigo-100 text-slate-500"
        }`}
      >
        © 2026 AI Chatbot. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;