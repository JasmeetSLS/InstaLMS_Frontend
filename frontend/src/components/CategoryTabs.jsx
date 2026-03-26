// src/components/CategoryTabs.jsx
import React, { useRef, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';

const CategoryTabs = ({ categories, selectedCategory, onCategoryChange, loading }) => {
  const scrollContainerRef = useRef(null);

  // Function to get gradient colors for fallback
  const getGradientColor = (index) => {
    const gradients = [
      'from-pink-500 via-red-500 to-yellow-500',
      'from-purple-500 via-pink-500 to-red-500',
      'from-blue-500 via-cyan-500 to-green-500',
      'from-orange-500 via-yellow-500 to-red-500',
      'from-green-500 via-teal-500 to-blue-500',
      'from-indigo-500 via-purple-500 to-pink-500',
      'from-red-500 via-orange-500 to-yellow-500',
      'from-teal-500 via-green-500 to-blue-500',
    ];
    return gradients[index % gradients.length];
  };

  // Auto-scroll to selected category
  useEffect(() => {
    if (scrollContainerRef.current && selectedCategory) {
      const selectedButton = scrollContainerRef.current.querySelector(`[data-category-id="${selectedCategory}"]`);
      if (selectedButton) {
        selectedButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="px-4 mt-4">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 mt-4 relative">
      {/* Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {categories.map((category, index) => (
          <button
            key={category.id}
            data-category-id={category.id}
            onClick={() => onCategoryChange(category.id)}
            className="flex flex-col items-center gap-1 flex-shrink-0 group snap-start"
          >
            {/* Instagram-style Status Circle */}
            <div className={`
              relative p-0.5 rounded-full transition-all duration-200
              ${selectedCategory === category.id 
                ? 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500' 
                : 'bg-gradient-to-r from-gray-300 to-gray-400'
              }
            `}>
              <div className={`
                w-16 h-16 rounded-full overflow-hidden bg-white p-0.5
                ${selectedCategory === category.id ? 'bg-white' : ''}
              `}>
                {category.icon_url ? (
                  <img 
                    src={`http://localhost:5000${category.icon_url}`}
                    alt={category.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className={`
                    w-full h-full rounded-full flex items-center justify-center
                    bg-gradient-to-br ${getGradientColor(index)} text-white font-bold text-xl
                  `}>
                    {category.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
            
            {/* Category Name */}
            <span className={`
              text-xs font-medium transition-all duration-200
              ${selectedCategory === category.id 
                ? 'text-blue-600 font-semibold' 
                : 'text-gray-600'
              }
            `}>
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;