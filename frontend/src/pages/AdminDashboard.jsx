import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function AdminDashboard() {
  const navigate = useNavigate();

  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const darkMode = useAuthStore((state) => state.darkMode);
  const toggleDarkMode = useAuthStore((state) => state.toggleDarkMode);

  const [stats, setStats] = useState({
    users: 0,
    chats: 0,
  });

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [statsResponse, usersResponse] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/stats", config),
        axios.get("http://localhost:5000/api/admin/users", config),
      ]);

      setStats(statsResponse.data);
      setUsers(usersResponse.data.users);
    } catch (error) {
      console.error("Admin dashboard error:", error);

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
    if (!token || user?.role !== "admin") {
      navigate("/login");
      return;
    }

    fetchDashboardData();
  }, [token, user, navigate]);

  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((currentUsers) =>
        currentUsers.filter((item) => item._id !== id)
      );

      setStats((currentStats) => ({
        ...currentStats,
        users: Math.max(0, currentStats.users - 1),
      }));
    } catch (error) {
      console.error("Delete user error:", error);

      alert(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const filteredUsers = users.filter((item) => {
    const searchText = search.toLowerCase();

    return (
      item.name?.toLowerCase().includes(searchText) ||
      item.email?.toLowerCase().includes(searchText)
    );
  });

  const headingColor = darkMode ? "text-white" : "text-[#111827]";
  const bodyColor = darkMode ? "text-[#d1d5db]" : "text-[#64748b]";
  const mutedColor = darkMode ? "text-[#9ca3af]" : "text-[#94a3b8]";

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-[#111827]" : "bg-[#f7f9ff]"
        }`}
      >
        <p className={`text-sm ${bodyColor}`}>
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "bg-[#111827]" : "bg-[#f7f9ff]"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`hidden md:flex w-60 flex-col border-r ${
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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#625bf6] to-[#746cff] flex items-center justify-center shadow-md shadow-indigo-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
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

            <div>
              <h1 className={`text-sm font-bold ${headingColor}`}>
                AI Chatbot
              </h1>

              <p className={`text-[10px] ${mutedColor}`}>
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <button
            onClick={() => navigate("/admin")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#635bff]/10 text-[#635bff] text-sm font-medium"
          >
            <span>▦</span>
            Dashboard
          </button>

          <button
            onClick={() => navigate("/admin")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${
              darkMode
                ? "text-[#d1d5db] hover:bg-[#374151] hover:text-white"
                : "text-[#64748b] hover:bg-[#f5f6ff] hover:text-[#635bff]"
            }`}
          >
            <span>♙</span>
            Users
          </button>
        </nav>

        {/* Logout */}
        <div className="mt-auto p-4">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm transition ${
              darkMode
                ? "border-[#4b5563] text-[#d1d5db] hover:text-red-400 hover:border-red-400"
                : "border-[#e1e4ee] text-[#64748b] hover:text-red-500 hover:border-red-200"
            }`}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header
          className={`border-b px-5 md:px-8 py-4 flex items-center justify-between ${
            darkMode
              ? "bg-[#1f2937] border-[#374151]"
              : "bg-white border-[#e7eaff]"
          }`}
        >
          <div>
            <h2 className={`text-xl font-semibold ${headingColor}`}>
              Dashboard
            </h2>

            <p className={`text-xs mt-1 ${mutedColor}`}>
              Manage your AI chatbot application
            </p>
          </div>

          <div className="flex items-center gap-3">
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

            <div className="hidden sm:block text-right">
              <p className={`text-xs font-semibold ${headingColor}`}>
                {user?.name}
              </p>

              <p className={`text-[10px] ${mutedColor}`}>
                Administrator
              </p>
            </div>

            <div className="w-9 h-9 rounded-full bg-[#635bff]/10 text-[#635bff] flex items-center justify-center text-sm font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 sm:p-5 md:p-8">
          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            <div
              className={`border rounded-xl p-5 shadow-sm ${
                darkMode
                  ? "bg-[#1f2937] border-[#374151]"
                  : "bg-white border-[#e7eaff]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs ${mutedColor}`}>
                    Total Users
                  </p>

                  <h3
                    className={`text-2xl font-bold mt-2 ${headingColor}`}
                  >
                    {stats.users}
                  </h3>
                </div>

                <div className="w-11 h-11 rounded-lg bg-[#635bff]/10 flex items-center justify-center text-[#635bff]">
                  ♙
                </div>
              </div>
            </div>

            <div
              className={`border rounded-xl p-5 shadow-sm ${
                darkMode
                  ? "bg-[#1f2937] border-[#374151]"
                  : "bg-white border-[#e7eaff]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs ${mutedColor}`}>
                    Total Chats
                  </p>

                  <h3
                    className={`text-2xl font-bold mt-2 ${headingColor}`}
                  >
                    {stats.chats}
                  </h3>
                </div>

                <div className="w-11 h-11 rounded-lg bg-[#635bff]/10 flex items-center justify-center text-[#635bff]">
                  ◫
                </div>
              </div>
            </div>
          </div>

          {/* Users Section */}
          <div
            className={`border rounded-xl shadow-sm overflow-hidden ${
              darkMode
                ? "bg-[#1f2937] border-[#374151]"
                : "bg-white border-[#e7eaff]"
            }`}
          >
            <div
              className={`px-5 py-5 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
                darkMode ? "border-[#374151]" : "border-[#eef0f6]"
              }`}
            >
              <div>
                <h3 className={`text-sm font-semibold ${headingColor}`}>
                  Users
                </h3>

                <p className={`text-[10px] mt-1 ${mutedColor}`}>
                  Manage registered users
                </p>
              </div>

              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full sm:w-56 h-9 px-3 rounded-md border text-xs outline-none focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10 ${
                  darkMode
                    ? "bg-[#111827] border-[#4b5563] text-white placeholder-[#9ca3af]"
                    : "bg-white border-[#dfe3f0] text-[#1e293b] placeholder-[#a0a8b8]"
                }`}
              />
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className={`text-left ${
                      darkMode ? "bg-[#111827]" : "bg-[#fafbff]"
                    }`}
                  >
                    <th
                      className={`px-5 py-3 text-[10px] font-semibold ${bodyColor}`}
                    >
                      Name
                    </th>

                    <th
                      className={`px-5 py-3 text-[10px] font-semibold ${bodyColor}`}
                    >
                      Email
                    </th>

                    <th
                      className={`px-5 py-3 text-[10px] font-semibold ${bodyColor}`}
                    >
                      Role
                    </th>

                    <th
                      className={`px-5 py-3 text-[10px] font-semibold ${bodyColor}`}
                    >
                      Joined
                    </th>

                    <th
                      className={`px-5 py-3 text-[10px] font-semibold ${bodyColor}`}
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className={`px-5 py-8 text-center text-xs ${mutedColor}`}
                      >
                        No users found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((item) => (
                      <tr
                        key={item._id}
                        className={`border-t transition ${
                          darkMode
                            ? "border-[#374151] hover:bg-[#374151]"
                            : "border-[#eef0f6] hover:bg-[#fafbff]"
                        }`}
                      >
                        <td
                          className={`px-5 py-4 text-xs font-medium ${headingColor}`}
                        >
                          {item.name}
                        </td>

                        <td className={`px-5 py-4 text-xs ${bodyColor}`}>
                          {item.email}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[9px] font-medium ${
                              item.role === "admin"
                                ? "bg-[#635bff]/10 text-[#635bff]"
                                : darkMode
                                ? "bg-[#374151] text-[#d1d5db]"
                                : "bg-[#f1f5f9] text-[#64748b]"
                            }`}
                          >
                            {item.role}
                          </span>
                        </td>

                        <td className={`px-5 py-4 text-xs ${bodyColor}`}>
                          {item.createdAt
                            ? new Date(
                                item.createdAt
                              ).toLocaleDateString()
                            : "-"}
                        </td>

                        <td className="px-5 py-4">
                          {item.role === "admin" ? (
                            <span className={`text-[10px] ${mutedColor}`}>
                              Admin
                            </span>
                          ) : (
                            <button
                              onClick={() => handleDeleteUser(item._id)}
                              className="text-[10px] text-red-500 hover:text-red-700 hover:underline"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile User Cards */}
            <div className="md:hidden">
              {filteredUsers.length === 0 ? (
                <p
                  className={`px-5 py-8 text-center text-xs ${mutedColor}`}
                >
                  No users found
                </p>
              ) : (
                <div className="p-4 space-y-3">
                  {filteredUsers.map((item) => (
                    <div
                      key={item._id}
                      className={`rounded-xl border p-4 ${
                        darkMode
                          ? "bg-[#111827] border-[#374151]"
                          : "bg-[#fafbff] border-[#e7eaff]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h4
                            className={`text-sm font-semibold ${headingColor}`}
                          >
                            {item.name}
                          </h4>

                          <p
                            className={`text-xs mt-1 break-all ${bodyColor}`}
                          >
                            {item.email}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 px-2.5 py-1 rounded-full text-[9px] font-medium ${
                            item.role === "admin"
                              ? "bg-[#635bff]/10 text-[#635bff]"
                              : darkMode
                              ? "bg-[#374151] text-[#d1d5db]"
                              : "bg-[#f1f5f9] text-[#64748b]"
                          }`}
                        >
                          {item.role}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3 mt-4">
                        <p className={`text-[10px] ${mutedColor}`}>
                          Joined:{" "}
                          {item.createdAt
                            ? new Date(
                                item.createdAt
                              ).toLocaleDateString()
                            : "-"}
                        </p>

                        {item.role === "admin" ? (
                          <span className={`text-[10px] ${mutedColor}`}>
                            Admin
                          </span>
                        ) : (
                          <button
                            onClick={() => handleDeleteUser(item._id)}
                            className="text-[10px] text-red-500 hover:text-red-700 hover:underline"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;