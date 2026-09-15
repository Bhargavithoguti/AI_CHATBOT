import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";



function UserDashboard() {
  const navigate = useNavigate();

  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const API_URL = import.meta.env.VITE_API_URL;

  const darkMode = useAuthStore((state) => state.darkMode);
  const toggleDarkMode = useAuthStore((state) => state.toggleDarkMode);

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChats = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/chat`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setChats(response.data.chats);
    } catch (error) {
      console.error("Failed to load chats:", error);

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        logout();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchChats();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const recentChats = chats.slice(0, 3);

  const cardBackground = darkMode ? "bg-[#1f2937]" : "bg-white";
  const borderColor = darkMode
    ? "border-[#374151]"
    : "border-[#e7eaff]";
  const headingColor = darkMode ? "text-white" : "text-[#111827]";
  const bodyColor = darkMode ? "text-[#d1d5db]" : "text-[#64748b]";
  const mutedColor = darkMode ? "text-[#9ca3af]" : "text-[#94a3b8]";

  return (
    <div
      className={`min-h-screen flex ${
        darkMode
          ? "bg-[#111827] text-white"
          : "bg-[#f7f9ff] text-[#172554]"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`hidden md:flex w-56 flex-col border-r ${
          darkMode
            ? "bg-[#1f2937] border-[#374151]"
            : "bg-white border-[#e7eaff]"
        }`}
      >
        {/* Logo */}
        <div
          className={`px-5 py-6 border-b ${
            darkMode ? "border-[#374151]" : "border-[#eef0f6]"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#625bf6] to-[#746cff] flex items-center justify-center text-white text-sm">
              🤖
            </div>

            <span className={`text-sm font-bold ${headingColor}`}>
              AI Chatbot
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-2">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full flex items-center gap-3 rounded-lg bg-[#635bff]/10 px-3 py-2.5 text-left text-xs font-semibold text-[#635bff]"
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            onClick={() => navigate("/chat")}
            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs transition ${
              darkMode
                ? "text-[#d1d5db] hover:bg-[#374151] hover:text-white"
                : "text-[#64748b] hover:bg-[#f5f6ff] hover:text-[#635bff]"
            }`}
          >
            <span>＋</span>
            New Chat
          </button>

          <button
            onClick={() => navigate("/chat")}
            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs transition ${
              darkMode
                ? "text-[#d1d5db] hover:bg-[#374151] hover:text-white"
                : "text-[#64748b] hover:bg-[#f5f6ff] hover:text-[#635bff]"
            }`}
          >
            <span>◫</span>
            Chat History
          </button>

          <button
            onClick={() => navigate("/profile")}
            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs transition ${
              darkMode
                ? "text-[#d1d5db] hover:bg-[#374151] hover:text-white"
                : "text-[#64748b] hover:bg-[#f5f6ff] hover:text-[#635bff]"
            }`}
          >
            <span>♙</span>
            Profile
          </button>
        </nav>

        {/* Logout */}
        <div className="mt-auto p-4">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 text-xs transition ${
              darkMode
                ? "text-[#d1d5db] hover:text-red-400"
                : "text-[#64748b] hover:text-red-500"
            }`}
          >
            <span>↪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header
          className={`border-b px-4 sm:px-5 md:px-8 py-4 flex items-center justify-between ${
            darkMode
              ? "bg-[#1f2937] border-[#374151]"
              : "bg-white border-[#e7eaff]"
          }`}
        >
          <div className="min-w-0">
            <h1
              className={`text-base sm:text-lg font-bold truncate ${headingColor}`}
            >
              Hello, {user?.name || "Bhargavi"} 👋
            </h1>

            <p className={`text-xs mt-1 ${mutedColor}`}>
              Ask anything to get started...
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleDarkMode}
              className={`w-8 h-8 rounded-full border text-sm transition ${
                darkMode
                  ? "border-[#4b5563] text-yellow-300 hover:bg-[#374151]"
                  : "border-[#e1e4ee] text-[#64748b] hover:bg-[#f5f6ff]"
              }`}
              title="Toggle theme"
            >
              {darkMode ? "☀" : "☾"}
            </button>

            <div className="w-8 h-8 rounded-full bg-[#635bff]/10 flex items-center justify-center text-xs font-bold text-[#635bff]">
              {user?.name?.charAt(0)?.toUpperCase() || "B"}
            </div>

            <span className={`hidden sm:block text-xs ${bodyColor}`}>
              {user?.name || "Bhargavi"}⌄
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-5 md:p-8 max-w-6xl mx-auto">
          {/* Ask AI Box */}
          <section
            className={`${cardBackground} border ${borderColor} rounded-xl p-5 shadow-sm`}
          >
            <h2 className={`text-sm font-semibold ${headingColor}`}>
              What can I help you with?
            </h2>

            <p className={`text-xs mt-1 ${mutedColor}`}>
              Start a new conversation with your AI assistant.
            </p>

            <button
              onClick={() => navigate("/chat")}
              className={`mt-5 w-full rounded-lg border px-4 py-3 text-left text-xs transition flex items-center justify-between gap-3 ${
                darkMode
                  ? "border-[#4b5563] text-[#9ca3af] hover:border-[#635bff] hover:bg-[#374151]"
                  : "border-[#dfe3f0] text-[#a0a8b8] hover:border-[#635bff]"
              }`}
            >
              <span>Start a new conversation...</span>

              <span className="shrink-0 rounded-md bg-[#635bff] px-3 py-2 text-white">
                ↗
              </span>
            </button>
          </section>

          {/* Statistics */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
            <div
              className={`${cardBackground} border ${borderColor} rounded-xl p-4 shadow-sm`}
            >
              <p className={`text-[11px] ${mutedColor}`}>
                Total Chats
              </p>

              <h3 className={`text-2xl font-bold mt-2 ${headingColor}`}>
                {chats.length}
              </h3>
            </div>

            <div
              className={`${cardBackground} border ${borderColor} rounded-xl p-4 shadow-sm`}
            >
              <p className={`text-[11px] ${mutedColor}`}>
                Active Today
              </p>

              <h3 className={`text-2xl font-bold mt-2 ${headingColor}`}>
                {
                  chats.filter((chat) => {
                    const today = new Date().toDateString();

                    return (
                      new Date(chat.createdAt).toDateString() === today
                    );
                  }).length
                }
              </h3>
            </div>

            <div
              className={`${cardBackground} border ${borderColor} rounded-xl p-4 shadow-sm`}
            >
              <p className={`text-[11px] ${mutedColor}`}>
                Quick Actions
              </p>

              <button
                onClick={() => navigate("/chat")}
                className="mt-3 rounded-md bg-gradient-to-r from-[#625bf6] to-[#7068ff] px-4 py-2 text-[11px] font-semibold text-white shadow-md shadow-indigo-200 hover:from-[#554ef0] hover:to-[#625bf6] transition"
              >
                New Chat
              </button>
            </div>
          </section>

          {/* Recent Chats */}
          <section
            className={`${cardBackground} border ${borderColor} rounded-xl shadow-sm mt-5`}
          >
            <div
              className={`px-5 py-4 flex items-center justify-between border-b ${
                darkMode ? "border-[#374151]" : "border-[#eef0f6]"
              }`}
            >
              <h2 className={`text-sm font-semibold ${headingColor}`}>
                Recent Chats
              </h2>

              <button
                onClick={() => navigate("/chat")}
                className="text-[11px] text-[#635bff] hover:underline"
              >
                View all
              </button>
            </div>

            <div className="p-5">
              {loading ? (
                <p className={`text-xs ${mutedColor}`}>
                  Loading chats...
                </p>
              ) : recentChats.length === 0 ? (
                <p className={`text-xs ${mutedColor}`}>
                  No chats available yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {recentChats.map((chat) => (
                    <button
                      key={chat._id || chat.id}
                      onClick={() => navigate("/chat")}
                      className={`w-full flex items-center gap-3 rounded-lg border p-3 text-left transition ${
                        darkMode
                          ? "border-[#374151] hover:bg-[#374151]"
                          : "border-[#eef0f6] hover:bg-[#fafbff]"
                      }`}
                    >
                      <div className="w-8 h-8 shrink-0 rounded-full bg-[#635bff]/10 flex items-center justify-center text-[#635bff]">
                        💬
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-xs font-medium truncate ${
                            darkMode ? "text-[#e5e7eb]" : "text-[#334155]"
                          }`}
                        >
                          {chat.message}
                        </p>

                        <p className={`text-[10px] mt-1 ${mutedColor}`}>
                          {chat.createdAt
                            ? new Date(chat.createdAt).toLocaleString()
                            : "Recent chat"}
                        </p>
                      </div>

                      <span className={`text-xs ${mutedColor}`}>
                        ›
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default UserDashboard;