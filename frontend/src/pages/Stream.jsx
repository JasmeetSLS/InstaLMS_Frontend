import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Bell,
  UserCircle,
  Search,
  ChevronDown,
  RefreshCcw,
  Pencil,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  X, // for close icon
} from "lucide-react";
import api, { FILE_BASE_URL } from "../services/api";

const Stream = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Add Stream Modal State ---
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    language: "",
    content: "",
  });
  const [iconFile, setIconFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState("");

  useEffect(() => {
    fetchStreams();
  }, [categoryId]);

  const fetchStreams = async () => {
    try {
      setLoading(true);
      const response = await api.getStreamsByCategory(categoryId);
      setStreams(response.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching streams:", err);
      setError("Failed to load streams. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).replace(/ /g, "-");
  };

  const getStatusDisplay = (status) => {
    if (status === "active") return "Active";
    if (status === "inactive") return "Inactive";
    return "Work In Progress";
  };

  const handleViewSections = (streamId, e) => {
    e.stopPropagation();
    navigate(`/admin/sections/${streamId}`);
  };

  // --- Modal Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setModalError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        e.target.value = "";
        return;
      }
      setIconFile(file);
    }
  };

  const handleAddStream = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setModalError("Title is required");
      return;
    }
    if (!formData.language.trim()) {
      setModalError("Language is required");
      return;
    }

    setSubmitting(true);
    setModalError("");

    try {
      const payload = new FormData();
      payload.append("category_id", categoryId);
      payload.append("title", formData.title.trim());
      payload.append("language", formData.language.trim());
      payload.append("content", formData.content || "");
      if (iconFile) {
        payload.append("icon", iconFile);
      }
      // status and sort_order not sent; backend hardcodes them

      const response = await api.createStream(payload);

      // Success: close modal, reset form, refresh list
      setShowModal(false);
      setFormData({ title: "", language: "", content: "" });
      setIconFile(null);
      const fileInput = document.getElementById("stream-icon-upload");
      if (fileInput) fileInput.value = "";
      await fetchStreams();
      // Optional success toast
      alert("Stream added successfully!");
    } catch (err) {
      console.error("Add stream error:", err);
      setModalError(err.message || "Failed to add stream. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalError("");
    setFormData({ title: "", language: "", content: "" });
    setIconFile(null);
    const fileInput = document.getElementById("stream-icon-upload");
    if (fileInput) fileInput.value = "";
  };

  // --- Render ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] flex justify-center items-center">
        <div className="text-lg font-medium">Loading streams...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] flex flex-col justify-center items-center">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button
          onClick={() => navigate("/admin/content")}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Go Back to Categories
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
            onClick={() => navigate("/admin/content")}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-1 text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <span className="text-gray-500">|</span>
          <span className="text-sm font-medium text-gray-700">
            Streams for Category
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 font-medium">
            Super Admin
          </span>
          <button className="w-8 h-8 rounded-full border border-red-300 flex items-center justify-center">
            <Bell size={15} className="text-red-500" />
          </button>
          <button className="w-8 h-8 rounded-full border border-red-300 flex items-center justify-center">
            <UserCircle size={18} className="text-red-500" />
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#ededed] border-b px-3 py-3">
        <div className="bg-white border px-4 py-3 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <button className="h-10 bg-[#2d2d31] text-white px-4 rounded-sm flex items-center gap-3 text-sm">
              English Global
              <ChevronDown size={14} />
            </button>

            <div className="flex items-center gap-2 border rounded px-3 h-10 bg-white">
              <Search size={15} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-[220px] outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button className="text-sm text-gray-600 flex items-center gap-2">
              1 filter applied
              <ChevronDown size={14} />
            </button>
            <button className="text-sm text-red-500">Clear Filter</button>

            {/* Add Stream Button */}
            <button
              onClick={() => setShowModal(true)}
              className="h-10 px-5 text-white text-sm rounded bg-gradient-to-r from-[#d94d59] to-[#e47b4a] flex items-center gap-2"
            >
              Add Stream
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-[18px] text-gray-800">
            {streams.length} Stream{streams.length !== 1 && "s"} found
          </h2>

          <div className="bg-white border px-3 py-2 rounded text-sm flex items-center gap-2">
            <span className="text-gray-500">sort by :</span>
            <span className="font-semibold">Relevance</span>
            <ChevronDown size={14} />
          </div>
        </div>

        {/* Stream Cards */}
        <div className="space-y-3">
          {streams.map((stream) => (
            <div
              key={stream.id}
              className="bg-white border border-gray-200 px-3 py-3 rounded-sm"
            >
              <div className="grid grid-cols-[220px_1.8fr_220px_180px_120px] gap-4 items-center">
                {/* Image */}
                <div className="relative">
                  {stream.icon_url ? (
                    <img
                      src={`${FILE_BASE_URL}${stream.icon_url}`}
                      alt={stream.title}
                      className="w-full h-[90px] object-cover border rounded"
                    />
                  ) : (
                    <div className="w-full h-[90px] bg-gray-200 border rounded flex items-center justify-center text-gray-500 text-sm">
                      No Image
                    </div>
                  )}
                  <button className="absolute -bottom-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center">
                    <Pencil size={10} />
                  </button>
                </div>

                {/* Details */}
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold text-[15px] text-gray-800">
                      {stream.title}
                    </h3>
                    <span className="bg-[#2d2d2d] text-white text-[10px] px-2 py-[2px] rounded">
                      V1
                    </span>
                    <span className="font-semibold text-xs text-gray-700">
                      {stream.status?.toUpperCase() || "ACTIVE"}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2">
                    {stream.content || "No description available"}
                  </p>

                  <span className="inline-block mt-2 bg-gray-100 px-2 py-1 rounded text-[11px] font-medium">
                    {stream.language || "1 Language"}
                  </span>
                </div>

                {/* Stats */}
                <div>
                  <button
                    onClick={(e) => handleViewSections(stream.id, e)}
                    className="text-[#c94f4f] text-sm font-semibold hover:underline flex items-center gap-1 transition"
                  >
                    {stream.sections_count || 0} Sections |{" "}
                    {stream.contents_count || 0} Cards
                    <ChevronRight size={14} className="inline-block" />
                  </button>
                  <p className="text-[11px] text-gray-500 mt-1">
                    LAST UPDATED : {formatDate(stream.updated_at)}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700">
                    {getStatusDisplay(stream.status)}
                  </h4>
                  <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
                    <RefreshCcw size={14} />
                    Sync
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    {stream.sections_count || 0} sections available
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end">
                  <button className="border border-red-300 text-red-500 px-3 py-1.5 text-sm rounded flex items-center gap-1">
                    Actions
                    <ChevronDown size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Add Stream Modal --- */}
      {showModal && (
        <div className="fixed inset-0 bg-[#000000d6] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Stream</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
                disabled={submitting}
              >
                <X size={20} />
              </button>
            </div>

            {modalError && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 text-sm rounded">
                {modalError}
              </div>
            )}

            <form onSubmit={handleAddStream}>
              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  required
                  disabled={submitting}
                />
              </div>

              {/* Language */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Language <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  placeholder="e.g., English, Hindi"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  required
                  disabled={submitting}
                />
              </div>

              {/* Content */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  disabled={submitting}
                />
              </div>

              {/* Icon Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Icon (optional, max 5MB)
                </label>
                <input
                  id="stream-icon-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm"
                  disabled={submitting}
                />
                {iconFile && (
                  <p className="text-xs text-gray-500 mt-1">
                    Selected: {iconFile.name}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={submitting}
                >
                  {submitting ? "Adding..." : "Add Stream"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stream;