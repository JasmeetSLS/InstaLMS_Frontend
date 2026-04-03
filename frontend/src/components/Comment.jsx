// src/components/Comment.jsx
import React, { useState } from 'react';
import { X, Send, User, ThumbsUp, MessageCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { IoLogoYoutube } from 'react-icons/io5';

const Comment = ({ post, onClose }) => {
  const [activeTab, setActiveTab] = useState('all'); // all, recent, popular, following
  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState({});
  const [comments, setComments] = useState([
    // Predefined comments from different users
    {
      id: 1,
      userId: 101,
      userName: "Rajesh Kumar",
      userImage: null,
      comment: "Amazing car! The performance is outstanding. Really love the design and features.",
      time: "2 hours ago",
      likes: 24,
      isFollowing: false,
      userType: "car_enthusiast",
      userRole: "Car Expert"
    },
    {
      id: 2,
      userId: 102,
      userName: "Priya Sharma",
      userImage: null,
      comment: "🔥🔥 This is exactly what I've been looking for! Great post, keep sharing such content.",
      time: "3 hours ago",
      likes: 18,
      isFollowing: false,
      userType: "car_lover",
      userRole: "Automobile Engineer"
    },
    {
      id: 3,
      userId: 103,
      userName: "Amit Patel",
      userImage: null,
      comment: "The fuel efficiency is impressive! Would love to see more details about the engine specifications.",
      time: "5 hours ago",
      likes: 32,
      isFollowing: false,
      userType: "car_buyer",
      userRole: "Car Dealer"
    },
    {
      id: 4,
      userId: 104,
      userName: "Neha Gupta",
      userImage: null,
      comment: "What's the price range for this model? Really interested in purchasing one.",
      time: "1 day ago",
      likes: 12,
      isFollowing: false,
      userType: "potential_buyer",
      userRole: "Customer"
    },
    {
      id: 5,
      userId: 105,
      userName: "Vikram Singh",
      userImage: null,
      comment: "The safety features are top-notch! 5-star rating from me. 👌",
      time: "1 day ago",
      likes: 45,
      isFollowing: false,
      userType: "safety_expert",
      userRole: "Safety Inspector"
    },
    {
      id: 6,
      userId: 106,
      userName: "Anjali Mehta",
      userImage: null,
      comment: "Beautiful color choice! The matte finish looks premium.",
      time: "2 days ago",
      likes: 8,
      isFollowing: false,
      userType: "design_lover",
      userRole: "Car Designer"
    },
    {
      id: 7,
      userId: 107,
      userName: "Suresh Reddy",
      userImage: null,
      comment: "How's the maintenance cost? Planning to buy next month.",
      time: "2 days ago",
      likes: 15,
      isFollowing: false,
      userType: "car_buyer",
      userRole: "Customer"
    },
    {
      id: 8,
      userId: 108,
      userName: "Kavita Joshi",
      userImage: null,
      comment: "The interior is luxurious! Perfect for long drives.",
      time: "3 days ago",
      likes: 27,
      isFollowing: false,
      userType: "car_lover",
      userRole: "Travel Enthusiast"
    },
    {
      id: 9,
      userId: 109,
      userName: "Rahul Verma",
      userImage: null,
      comment: "Test drove this yesterday. Smooth handling and great acceleration!",
      time: "3 days ago",
      likes: 19,
      isFollowing: false,
      userType: "test_driver",
      userRole: "Car Reviewer"
    },
    {
      id: 10,
      userId: 110,
      userName: "Pooja Nair",
      userImage: null,
      comment: "The technology features are mind-blowing! Love the infotainment system.",
      time: "4 days ago",
      likes: 22,
      isFollowing: false,
      userType: "tech_lover",
      userRole: "Tech Reviewer"
    }
  ]);

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
    "Incredible content!"
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

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        userId: 999, // Current user
        userName: "You", // Current user name
        userImage: null,
        comment: newComment,
        time: "Just now",
        likes: 0,
        isFollowing: false,
        userType: "current_user",
        userRole: "User"
      };
      setComments([newCommentObj, ...comments]);
      setNewComment('');
    }
  };

  const handleQuickComment = (quickComment) => {
    const newCommentObj = {
      id: comments.length + 1,
      userId: 999,
      userName: "You",
      userImage: null,
      comment: quickComment,
      time: "Just now",
      likes: 0,
      isFollowing: false,
      userType: "current_user",
      userRole: "User"
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
      case 'recent':
        return [...comments].sort((a, b) => {
          const timeOrder = { 'Just now': 0, 'hours ago': 1, 'day ago': 2, 'days ago': 3 };
          return 0; // Simplified sorting
        });
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
              {['all', 'recent', 'popular', 'following'].map((tab) => (
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

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[500px]">
            {filteredComments.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No comments yet</p>
                <p className="text-sm text-gray-400">Be the first to comment!</p>
              </div>
            ) : (
              filteredComments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  {/* User Avatar */}
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0">
                    {comment.userImage ? (
                      <img 
                        src={comment.userImage}
                        alt={comment.userName}
                        className="w-full h-full object-cover"
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
                          {comment.userRole && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                              {comment.userRole}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {comment.time}
                          </span>
                          <button
                            onClick={() => handleFollowUser(comment.userId)}
                            className={`text-xs px-2 py-1 rounded transition ${
                              comment.isFollowing
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}
                          >
                            {comment.isFollowing ? 'Following' : 'Follow'}
                          </button>
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
                      <button className="text-xs text-gray-500 hover:text-blue-500 transition">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Predefined Quick Comments */}
          <div className="border-t border-gray-200 p-4">
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-2">Quick comments:</p>
              <div className="flex flex-wrap gap-2">
                {predefinedQuickComments.map((quickComment, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickComment(quickComment)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition"
                  >
                    {quickComment}
                  </button>
                ))}
              </div>
            </div>

            {/* Add Comment Input */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                  placeholder="Write a comment..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <Send className="w-4 h-4" />
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;