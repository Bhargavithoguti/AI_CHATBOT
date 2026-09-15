import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function Chat() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const darkMode = useAuthStore((state) => state.darkMode);
  const toggleDarkMode = useAuthStore((state) => state.toggleDarkMode);

  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingChats, setFetchingChats] = useState(true);

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

      setChats([...response.data.chats].reverse());
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
      setFetchingChats(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchChats();
  }, [token]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim() || loading) {
      return;
    }

    const currentMessage = message.trim();

    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/chat`,
        {
          message: currentMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setChats((previousChats) => [
        ...previousChats,
        response.data.chat,
      ]);
    } catch (error) {
      console.error("Failed to send message:", error);

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        logout();
        navigate("/");
      } else {
        alert("Failed to get AI response. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setChats([]);
    setMessage("");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const headingColor = darkMode ? "text-white" : "text-[#111827]";
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

        <nav className="p-3 space-y-2">
          <button
            onClick={() => navigate("/dashboard")}
            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs transition ${
              darkMode
                ? "text-[#d1d5db] hover:bg-[#374151] hover:text-white"
                : "text-[#64748b] hover:bg-[#f5f6ff] hover:text-[#635bff]"
            }`}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-3 rounded-lg bg-[#635bff]/10 px-3 py-2.5 text-left text-xs font-semibold text-[#635bff]"
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

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Header */}
        <header
          className={`border-b px-4 sm:px-5 md:px-8 py-4 flex items-center justify-between ${
            darkMode
              ? "bg-[#1f2937] border-[#374151]"
              : "bg-white border-[#e7eaff]"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate("/dashboard")}
              className={`text-lg transition ${
                darkMode
                  ? "text-[#d1d5db] hover:text-white"
                  : "text-[#64748b] hover:text-[#635bff]"
              }`}
            >
              ←
            </button>

            <div className="min-w-0">
              <h1 className={`text-sm font-bold ${headingColor}`}>
                AI Chatbot
              </h1>

              <p className={`text-[11px] mt-1 truncate ${mutedColor}`}>
                Ask anything and get instant answers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleDarkMode}
              className={`w-8 h-8 shrink-0 rounded-full border text-sm transition ${
                darkMode
                  ? "border-[#4b5563] text-yellow-300 hover:bg-[#374151]"
                  : "border-[#e1e4ee] text-[#64748b] hover:bg-[#f5f6ff]"
              }`}
              title="Toggle theme"
            >
              {darkMode ? "☀" : "☾"}
            </button>

            <button
              onClick={handleNewChat}
              className="hidden sm:block rounded-lg bg-gradient-to-r from-[#625bf6] to-[#7068ff] px-3 py-2 text-[11px] font-semibold text-white shadow-md shadow-indigo-200"
            >
              + New Chat
            </button>

            <div className="w-8 h-8 shrink-0 rounded-full bg-[#635bff]/10 flex items-center justify-center text-xs font-bold text-[#635bff]">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-8">
          <div className="max-w-4xl mx-auto">
            {fetchingChats ? (
              <div className="text-center py-10">
                <p className={`text-xs ${mutedColor}`}>
                  Loading conversations...
                </p>
              </div>
            ) : chats.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-16 sm:py-20">
                <div className="w-16 h-16 rounded-2xl bg-[#635bff]/10 flex items-center justify-center text-3xl">
                  🤖
                </div>

                <h2 className={`text-lg font-bold mt-5 ${headingColor}`}>
                  How can I help you?
                </h2>

                <p className={`text-xs mt-2 ${mutedColor}`}>
                  Start a conversation by sending a message below.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {chats.map((chat) => (
                  <div
                    key={chat._id || chat.id}
                    className="space-y-3"
                  >
                    {/* User Message */}
                    <div className="flex justify-end">
                      <div className="max-w-[88%] sm:max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-r from-[#625bf6] to-[#7068ff] px-4 py-3 text-xs leading-5 text-white shadow-sm break-words">
                        {chat.message}
                      </div>
                    </div>

                    {/* AI Message */}
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="w-8 h-8 shrink-0 rounded-full bg-[#635bff]/10 flex items-center justify-center text-sm">
                        🤖
                      </div>

                      <div
                        className={`max-w-[88%] sm:max-w-[85%] rounded-2xl rounded-bl-md border px-4 py-3 text-xs leading-5 break-words ${
                          darkMode
                            ? "bg-[#1f2937] border-[#374151] text-[#e5e7eb]"
                            : "bg-white border-[#e7eaff] text-[#334155]"
                        }`}
                      >
                        <p
                          className={`text-[10px] font-semibold mb-1 ${
                            darkMode
                              ? "text-[#a5b4fc]"
                              : "text-[#635bff]"
                          }`}
                        >
                          AI Chatbot
                        </p>

                        {chat.reply}
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-[#635bff]/10 flex items-center justify-center text-sm">
                      🤖
                    </div>

                    <div
                      className={`rounded-2xl rounded-bl-md border px-4 py-3 text-xs ${
                        darkMode
                          ? "bg-[#1f2937] border-[#374151] text-[#9ca3af]"
                          : "bg-white border-[#e7eaff] text-[#94a3b8]"
                      }`}
                    >
                      AI Chatbot is typing...
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Message Input */}
        <div
          className={`border-t p-3 sm:p-4 md:p-6 ${
            darkMode
              ? "bg-[#1f2937] border-[#374151]"
              : "bg-white border-[#e7eaff]"
          }`}
        >
          <form
            onSubmit={handleSendMessage}
            className="max-w-4xl mx-auto flex items-center gap-2 sm:gap-3"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              className={`min-w-0 flex-1 h-11 rounded-xl border px-3 sm:px-4 text-xs outline-none transition ${
                darkMode
                  ? "bg-[#111827] border-[#4b5563] text-white placeholder-[#9ca3af] focus:border-[#635bff]"
                  : "bg-[#fafbff] border-[#dfe3f0] text-[#334155] placeholder-[#a0a8b8] focus:border-[#635bff]"
              }`}
            />

            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="h-11 shrink-0 rounded-xl bg-gradient-to-r from-[#625bf6] to-[#7068ff] px-4 sm:px-5 text-xs font-semibold text-white shadow-md shadow-indigo-200 transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "..." : "Send ↗"}
            </button>
          </form>

          <p className={`text-center text-[10px] mt-3 ${mutedColor}`}>
            AI Chatbot can make mistakes. Check important information.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Chat;