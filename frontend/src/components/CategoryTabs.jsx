// src/components/CategoryTabs.jsx
import React from 'react';

const CategoryTabs = ({ categories, selectedCategory, onCategoryChange, loading }) => {
  if (loading) {
    return (
      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 mt-4">
      <div className="bg-white rounded-xl shadow-sm p-1 flex gap-1 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;