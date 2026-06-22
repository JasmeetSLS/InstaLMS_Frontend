import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Content = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Modal and form state (status removed)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [iconFile, setIconFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.getCmsCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (title) => {
    if (!title) return "CA";
    return title
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/admin/stream/${categoryId}`);
  };

  // --- Modal form handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
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

  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const payload = new FormData();
      payload.append("title", formData.title.trim());
      payload.append("content", formData.content || "");
      // status is NOT sent – backend always sets to 'active'
      if (iconFile) {
        payload.append("icon", iconFile);
      }

      await api.createCmsCategory(payload);

      // Success
      setIsModalOpen(false);
      setFormData({ title: "", content: "" });
      setIconFile(null);
      const fileInput = document.getElementById("icon-upload");
      if (fileInput) fileInput.value = "";

      await fetchCategories();
      alert("Category added successfully!");
    } catch (error) {
      console.error("Add category error:", error);
      setError(error.message || "Failed to add category. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError("");
    setFormData({ title: "", content: "" });
    setIconFile(null);
    const fileInput = document.getElementById("icon-upload");
    if (fileInput) fileInput.value = "";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-base font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#f3f3f3] min-h-screen p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <input
          type="text"
          placeholder="Search"
          className="w-72 border border-gray-300 rounded-md px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-red-600 to-orange-400 hover:from-red-700 hover:to-orange-500 text-white px-5 py-2 text-sm rounded-md shadow-sm"
        >
          Add Category
        </button>
      </div>

      {/* Grid */}
      {categories.length === 0 ? (
        <div className="text-center text-gray-500 py-12 text-base">
          No categories found
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group bg-white border rounded-md overflow-hidden cursor-pointer transition hover:shadow-lg"
              onClick={() => handleCategoryClick(category.id)}
            >
              {/* Top Bar */}
              <div className="h-10 flex justify-between items-center px-4 border-b text-sm font-medium text-gray-700 group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-orange-400 group-hover:text-white">
                <div>
                  {category.total_streams || 140} STREAMS
                  <span className="mx-2">|</span>
                  {category.streaming || 133} STREAMING
                </div>

                <button className="w-6 h-6 rounded-full bg-white text-red-500 flex items-center justify-center text-xs">
                  ▼
                </button>
              </div>

              {/* Content */}
              <div className="p-5 flex items-start gap-4 min-h-[110px] group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-orange-400">
                <div className="w-12 h-12 rounded-full border-2 border-red-300 bg-white flex items-center justify-center text-red-500 text-sm font-semibold flex-shrink-0">
                  {getInitials(category.title)}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-white">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600 line-clamp-2 group-hover:text-white">
                    {category.content || "No description available"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Category Modal (status field removed) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#000000d6] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>

            {error && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 text-sm rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleAddCategory}>
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
                />
              </div>

              {/* Icon Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Icon (optional, max 5MB)
                </label>
                <input
                  id="icon-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm"
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
                  {submitting ? "Adding..." : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;