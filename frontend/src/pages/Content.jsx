import React, { useState, useEffect } from "react";
import api from "../services/api";

const Content = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

        <button className="bg-gradient-to-r from-red-600 to-orange-400 hover:from-red-700 hover:to-orange-500 text-white px-5 py-2 text-sm rounded-md shadow-sm">
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
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full border-2 border-red-300 bg-white flex items-center justify-center text-red-500 text-sm font-semibold flex-shrink-0">
                  {getInitials(category.title)}
                </div>

                {/* Text */}
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
    </div>
  );
};

export default Content;