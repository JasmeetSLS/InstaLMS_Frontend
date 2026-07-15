import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Bell,
  UserCircle,
  ArrowLeft,
  FileText,
  BarChart3,
  Smile,
  Frown,
  Meh,
} from "lucide-react";
import api from "../services/api";

const VideoAnalysisReport = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const fetchUserDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all users and find the one with matching ID
      const response = await api.getVideoAnalysisUsers();
      const foundUser = response.data?.find((u) => u.id === parseInt(userId));
      if (foundUser) {
        setUser(foundUser);
      } else {
        setError("User not found");
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError(err.message || "Failed to load user details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] flex justify-center items-center">
        <div className="text-lg font-medium">Loading report...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] flex flex-col justify-center items-center">
        <p className="text-red-500 text-lg mb-4">{error || "User not found"}</p>
        <button
          onClick={() => navigate("/admin/video-analysis")}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Go Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      {/* Header */}
      <div className="h-12 bg-white border-b flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/video-analysis")}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-1 text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <span className="text-gray-500">|</span>
          <span className="text-sm font-medium text-gray-700">
            Video Analysis Report
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

      {/* Content */}
      <div className="p-6">
        {/* User Info Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            User Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{user.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Employee ID</p>
              <p className="font-medium">{user.employee_id || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{user.phone || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium">{user.role || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Placeholder Analysis */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="text-red-500" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">
              Emotion Analysis Overview
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <Smile className="text-green-600 mx-auto" size={28} />
              <p className="text-sm font-medium text-gray-700 mt-2">Happy</p>
              <p className="text-2xl font-bold text-green-600">78%</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <Meh className="text-yellow-600 mx-auto" size={28} />
              <p className="text-sm font-medium text-gray-700 mt-2">Neutral</p>
              <p className="text-2xl font-bold text-yellow-600">15%</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <Frown className="text-red-600 mx-auto" size={28} />
              <p className="text-sm font-medium text-gray-700 mt-2">Fear / Anxiety</p>
              <p className="text-2xl font-bold text-red-600">7%</p>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-500 border-t pt-4">
            <p>
              <strong>Note:</strong> This is a placeholder summary. Actual data will be shown once the video analysis is complete.
            </p>
            <p className="mt-1">
              User has <strong>5</strong> video submissions, with <strong>3</strong> processed by AWS and <strong>1</strong> by Gemini.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAnalysisReport;