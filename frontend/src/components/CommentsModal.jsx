// src/components/CommentsModal.jsx
import React, { useState, useEffect } from 'react';
import { X, User, ThumbsUp, MessageCircle, Clock } from 'lucide-react';
import { authAPI } from '../services/api';

const CommentsModal = ({ post, onClose }) => {
  const [activeTab, setActiveTab] = useState('all'); // all, popular, following
  const [likedComments, setLikedComments] = useState({});
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch current user profile
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await authAPI.getProfile();
        if (response.data) {
          setCurrentUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        // Fallback to localStorage
        const userFromStorage = localStorage.getItem('user');
        if (userFromStorage) {
          setCurrentUser(JSON.parse(userFromStorage));
        }
      }
    };
    fetchCurrentUser();
  }, []);

  // Get current user's profile image URL
  const getCurrentUserProfileImage = () => {
    if (currentUser?.profile_image) {
      return `http://localhost:5000${currentUser.profile_image}`;
    }
    return null;
  };

  // Extended predefined quick comments
  const predefinedQuickComments = [
    "Amazing! 🔥",
    "Love this! ❤️",
    "Great post! 👍",
    "Interesting! 😮",
    "Thanks for sharing!",
    "Can't wait to see more!",
    "This is awesome!",
    "Well explained!",
    "Very helpful!",
    "Incredible content!",
    "Keep up the good work! 💪",
    "This made my day! 😊",
    "Absolutely brilliant! ✨",
    "Couldn't agree more! 🎯",
    "Best post I've seen today! 👑",
    "So true! 💯",
    "Fantastic perspective! 🌟",
    "Learned something new! 📚",
    "This deserves more attention! 👏",
    "Well said! 🎉",
    "Outstanding content! ⭐",
    "Really appreciate this! 🙏",
    "Mind blowing! 🤯",
    "Simply perfect! 🎯"
  ];

  const handleLikeComment = (commentId) => {
    setLikedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
    
    // Update likes count
    setComments(prevComments => 
      prevComments.map(comment => 
        comment.id === commentId
          ? { ...comment, likes: comment.likes + (likedComments[commentId] ? -1 : 1) }
          : comment
      )
    );
  };

  const handleQuickComment = (quickComment) => {
    if (!currentUser) return;
    
    const newCommentObj = {
      id: comments.length + 1,
      userId: currentUser.id,
      userName: currentUser.name,
      userImage: getCurrentUserProfileImage(),
      comment: quickComment,
      time: "Just now",
      likes: 0,
      isFollowing: false,
      userType: "current_user",
    };
    setComments([newCommentObj, ...comments]);
  };

  const handleFollowUser = (userId) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.userId === userId
          ? { ...comment, isFollowing: !comment.isFollowing }
          : comment
      )
    );
  };

  const getFilteredComments = () => {
    switch(activeTab) {
      case 'popular':
        return [...comments].sort((a, b) => b.likes - a.likes);
      case 'following':
        return comments.filter(comment => comment.isFollowing);
      default:
        return comments;
    }
  };

  const filteredComments = getFilteredComments();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 transition-opacity"></div>
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full transform transition-all max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900">
                Comments ({comments.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex px-4 gap-2">
              {['all', 'popular', 'following'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                    activeTab === tab
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Comments List - Empty State */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[500px]">
            {filteredComments.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">No comments yet</p>
                  </div>
            ) : (
              filteredComments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  {/* User Avatar with Profile Image */}
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0">
                    {comment.userImage ? (
                      <img 
                        src={comment.userImage}
                        alt={comment.userName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Comment Content */}
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-gray-900">
                            {comment.userName}
                          </span>
                          {comment.userType === 'current_user' && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                              You
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-blue-700 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {comment.time}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">{comment.comment}</p>
                    </div>
                    
                    {/* Comment Actions */}
                    <div className="flex items-center gap-4 mt-1 ml-2">
                      <button
                        onClick={() => handleLikeComment(comment.id)}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-500 transition"
                      >
                        <ThumbsUp className={`w-3 h-3 ${likedComments[comment.id] ? 'fill-blue-500 text-blue-500' : ''}`} />
                        <span>{comment.likes}</span>
                      </button>
                      {comment.userType !== 'current_user' && (
                        <button 
                          onClick={() => handleFollowUser(comment.userId)}
                          className="text-xs text-gray-500 hover:text-blue-500 transition"
                        >
                          {comment.isFollowing ? 'Following' : 'Follow'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Predefined Quick Comments Only - No Text Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-blue-500" />
                <p className="text-sm font-medium text-gray-700">Quick Comments (Click to add)</p>
              </div>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                {predefinedQuickComments.map((quickComment, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickComment(quickComment)}
                    className="text-sm bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-700 px-3 py-2 rounded-full transition-all duration-200 border border-gray-200 hover:border-blue-300 hover:scale-105 transform"
                  >
                    {quickComment}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;