import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  UserCircle,
  Search,
  ChevronDown,
  ArrowLeft,
  FileText, // <-- changed from Eye to FileText
} from "lucide-react";
import api from "../services/api";

const VideoAnalysis = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const term = searchTerm.toLowerCase().trim();
      const filtered = users.filter(
        (user) =>
          user.name?.toLowerCase().includes(term) ||
          user.email?.toLowerCase().includes(term) ||
          user.employee_id?.toLowerCase().includes(term) ||
          user.phone?.includes(term) ||
          user.role?.toLowerCase().includes(term)
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getVideoAnalysisUsers();
      setUsers(response.data || []);
      setFilteredUsers(response.data || []);
    } catch (err) {
      console.error("Error fetching video analysis users:", err);
      setError(err.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

const handleViewReport = (userId) => {
  navigate(`/admin/video-analysis/report/${userId}`);
};

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      {/* Header (same) */}
      <div className="h-12 bg-white border-b flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin")}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-1 text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <span className="text-gray-500">|</span>
          <span className="text-sm font-medium text-gray-700">
            Video Analysis Users
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 font-medium">Super Admin</span>
          <button className="w-8 h-8 rounded-full border border-red-300 flex items-center justify-center">
            <Bell size={15} className="text-red-500" />
          </button>
          <button className="w-8 h-8 rounded-full border border-red-300 flex items-center justify-center">
            <UserCircle size={18} className="text-red-500" />
          </button>
        </div>
      </div>

      {/* Filter Bar (same) */}
      <div className="bg-[#ededed] border-b px-3 py-3">
        <div className="bg-white border px-4 py-3 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 border rounded px-3 h-10 bg-white">
              <Search size={15} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, employee ID, phone or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[280px] outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={fetchUsers}
              className="h-10 px-5 text-white text-sm rounded bg-gradient-to-r from-[#d94d59] to-[#e47b4a] flex items-center gap-2"
            >
              Refresh
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-[18px] text-gray-800">
            {filteredUsers.length} User{filteredUsers.length !== 1 && "s"} found
          </h2>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-sm overflow-x-auto">
          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading users...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              {searchTerm
                ? "No users match your search"
                : "No users have uploaded videos yet."}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.email || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.employee_id || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.phone || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.role || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleViewReport(user.id)}
                        className="text-red-500 hover:text-red-700 transition p-1 rounded hover:bg-red-50"
                        title="View report"
                      >
                        <FileText size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoAnalysis;