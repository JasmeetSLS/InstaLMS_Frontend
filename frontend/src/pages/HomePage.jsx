// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CategoryTabs from '../components/CategoryTabs';
import CarComponents from '../components/CarComponents';
import { categoryAPI, postAPI } from '../services/api';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch categories on load
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch posts when category changes
  useEffect(() => {
    if (selectedCategory) {
      fetchPostsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await categoryAPI.getAll();
      setCategories(response.data);
      if (response.data.length > 0) {
        setSelectedCategory(response.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchPostsByCategory = async (categoryId) => {
    setLoadingPosts(true);
    try {
      const response = await postAPI.getByCategory(categoryId);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const getMediaIcon = (type) => {
    if (type === 'video') return <Video className="w-4 h-4" />;
    if (type === 'gif') return <FileImage className="w-4 h-4" />;
    return <ImageIcon className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      {/* Category Tabs - Dynamic from API */}
      <CategoryTabs 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        loading={loadingCategories}
      />
      
      {/* Posts List - From Selected Category */}
      <CarComponents 
        posts={posts}
        loading={loadingPosts}
        onViewPost={handleViewPost}
      />

      {/* View Post Modal */}
      {showModal && selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-800">Post Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              {/* Title */}
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Title</div>
                <h3 className="text-xl font-bold text-gray-800">{selectedPost.title}</h3>
              </div>
              
              {/* Content */}
              {selectedPost.content && (
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Content</div>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedPost.content}</p>
                </div>
              )}
              
              {/* Hashtags */}
              {selectedPost.hashtags && (
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Hashtags</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.hashtags.split(' ').map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 text-sm text-blue-600 bg-blue-50 rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Media Gallery */}
              {selectedPost.media && selectedPost.media.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">
                    Media Files ({selectedPost.media.length})
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedPost.media.map((media, idx) => (
                      <div key={idx} className="bg-gray-100 rounded-lg overflow-hidden">
                        {media.type === 'video' ? (
                          <video 
                            src={`http://localhost:5000${media.url}`}
                            controls
                            className="w-full h-48 object-cover"
                          />
                        ) : (
                          <img 
                            src={`http://localhost:5000${media.url}`}
                            alt={`Media ${idx + 1}`}
                            className="w-full h-48 object-cover"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Date Info */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Created: {new Date(selectedPost.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;