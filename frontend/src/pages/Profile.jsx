import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function Profile() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const darkMode = useAuthStore((state) => state.darkMode);
  const toggleDarkMode = useAuthStore((state) => state.toggleDarkMode);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
        <div
          className={`px-5 py-6 border-b ${
            darkMode ? "border-[#374151]" : "border-[#eef0f6]"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#625bf6] to-[#746cff] flex items-center justify-center text-white">
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
            className="w-full flex items-center gap-3 rounded-lg bg-[#635bff]/10 px-3 py-2.5 text-left text-xs font-semibold text-[#635bff]"
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
      <main className="flex-1">
        {/* Header */}
        <header
          className={`border-b px-5 md:px-8 py-4 flex items-center justify-between ${
            darkMode
              ? "bg-[#1f2937] border-[#374151]"
              : "bg-white border-[#e7eaff]"
          }`}
        >
          <div>
            <h1 className={`text-lg font-bold ${headingColor}`}>
              Profile
            </h1>

            <p className={`text-xs mt-1 ${mutedColor}`}>
              Manage your account information
            </p>
          </div>

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
        </header>

        {/* Profile Card */}
        <div className="max-w-3xl mx-auto p-5 md:p-8">
          <div
            className={`border rounded-2xl shadow-sm p-6 ${
              darkMode
                ? "bg-[#1f2937] border-[#374151]"
                : "bg-white border-[#e7eaff]"
            }`}
          >
            {/* Profile Header */}
            <div
              className={`flex flex-col items-center text-center border-b pb-6 ${
                darkMode ? "border-[#374151]" : "border-[#eef0f6]"
              }`}
            >
              <div className="w-20 h-20 rounded-full bg-[#635bff]/10 flex items-center justify-center text-2xl font-bold text-[#635bff]">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <h2 className={`text-lg font-semibold mt-4 ${headingColor}`}>
                {user?.name || "User"}
              </h2>

              <p className={`text-xs mt-1 ${mutedColor}`}>
                {user?.email || "No email available"}
              </p>

              <span className="mt-3 rounded-full bg-[#635bff]/10 px-3 py-1 text-[10px] font-medium text-[#635bff]">
                {user?.role || "user"}
              </span>
            </div>

            {/* Account Information */}
            <div className="mt-6">
              <h3 className={`text-sm font-semibold ${headingColor}`}>
                Account Information
              </h3>

              <div className="mt-4 space-y-4">
                <div>
                  <label className={`block text-xs font-medium mb-2 ${bodyColor}`}>
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={user?.name || ""}
                    readOnly
                    className={`w-full h-10 rounded-lg border px-3 text-xs outline-none ${
                      darkMode
                        ? "bg-[#111827] border-[#4b5563] text-[#e5e7eb]"
                        : "bg-[#fafbff] border-[#dfe3f0] text-[#334155]"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-2 ${bodyColor}`}>
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className={`w-full h-10 rounded-lg border px-3 text-xs outline-none ${
                      darkMode
                        ? "bg-[#111827] border-[#4b5563] text-[#e5e7eb]"
                        : "bg-[#fafbff] border-[#dfe3f0] text-[#334155]"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-2 ${bodyColor}`}>
                    Account Role
                  </label>

                  <input
                    type="text"
                    value={user?.role || "user"}
                    readOnly
                    className={`w-full h-10 rounded-lg border px-3 text-xs outline-none ${
                      darkMode
                        ? "bg-[#111827] border-[#4b5563] text-[#e5e7eb]"
                        : "bg-[#fafbff] border-[#dfe3f0] text-[#334155]"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className={`rounded-lg border px-5 py-2.5 text-xs font-medium transition ${
                  darkMode
                    ? "border-[#4b5563] text-[#d1d5db] hover:border-[#635bff] hover:text-[#a5b4fc]"
                    : "border-[#dfe3f0] text-[#64748b] hover:border-[#635bff] hover:text-[#635bff]"
                }`}
              >
                Back to Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-gradient-to-r from-[#625bf6] to-[#7068ff] px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-200 transition hover:from-[#554ef0] hover:to-[#625bf6]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;