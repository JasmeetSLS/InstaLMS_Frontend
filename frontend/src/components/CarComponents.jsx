// src/components/CarComponents.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Eye, Image as ImageIcon, Video, FileImage, ChevronLeft, ChevronRight, Heart, MessageCircle, Share2, Play, Pause, Send, X, User, Search, Check, ThumbsUp, View, Bookmark, TestTube, HelpCircle, Share, Share2Icon } from 'lucide-react';
import { userAPI } from '../services/api';
import { IoLogoYoutube } from 'react-icons/io5';

const CarComponents = ({ posts, loading, onViewPost }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [videoStates, setVideoStates] = useState({});
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [showYouTubePopup, setShowYouTubePopup] = useState(false);
  const videoRefs = useRef({});

  const getMediaIcon = (type) => {
    if (type === 'video') return <Video className="w-5 h-5 text-blue-500" />;
    if (type === 'gif') return <FileImage className="w-5 h-5 text-purple-500" />;
    return <ImageIcon className="w-5 h-5 text-green-500" />;
  };

  const nextMedia = (postId, totalMedia) => {
    // Pause video before changing media
    const video = videoRefs.current[postId];
    if (video && !video.paused) {
      video.pause();
      setVideoStates(prev => ({ ...prev, [postId]: 'paused' }));
      setCurrentlyPlayingId(null);
    }
    
    setCurrentMediaIndex(prev => ({
      ...prev,
      [postId]: ((prev[postId] || 0) + 1) % totalMedia
    }));
  };

  const prevMedia = (postId, totalMedia) => {
    // Pause video before changing media
    const video = videoRefs.current[postId];
    if (video && !video.paused) {
      video.pause();
      setVideoStates(prev => ({ ...prev, [postId]: 'paused' }));
      setCurrentlyPlayingId(null);
    }
    
    setCurrentMediaIndex(prev => ({
      ...prev,
      [postId]: ((prev[postId] || 0) - 1 + totalMedia) % totalMedia
    }));
  };

  const getCurrentIndex = (postId) => {
    return currentMediaIndex[postId] || 0;
  };

  const handleLike = (postId) => {
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Add this function to handle YouTube button click
const handleYouTubeClick = () => {
  setShowYouTubePopup(true);
};

// Add this function to open in YouTube app/website
const openInYouTube = () => {
  window.open('https://www.youtube.com/watch?v=GSyle-JHiDw', '_blank');
  setShowYouTubePopup(false);
};


  const toggleVideoPlay = (postId) => {
    const video = videoRefs.current[postId];
    if (!video) return;

    // If another video is playing, pause it
    if (currentlyPlayingId && currentlyPlayingId !== postId) {
      const otherVideo = videoRefs.current[currentlyPlayingId];
      if (otherVideo) {
        otherVideo.pause();
        setVideoStates(prev => ({ ...prev, [currentlyPlayingId]: 'paused' }));
      }
    }

    // Toggle current video
    if (video.paused) {
      video.play();
      setVideoStates(prev => ({ ...prev, [postId]: 'playing' }));
      setCurrentlyPlayingId(postId);
    } else {
      video.pause();
      setVideoStates(prev => ({ ...prev, [postId]: 'paused' }));
      setCurrentlyPlayingId(null);
    }
  };

  const handleVideoPlay = (postId) => {
    setVideoStates(prev => ({ ...prev, [postId]: 'playing' }));
    setCurrentlyPlayingId(postId);
  };

  const handleVideoPause = (postId) => {
    setVideoStates(prev => ({ ...prev, [postId]: 'paused' }));
    if (currentlyPlayingId === postId) {
      setCurrentlyPlayingId(null);
    }
  };

  const handleVideoEnded = (postId) => {
    setVideoStates(prev => ({ ...prev, [postId]: 'ended' }));
    setCurrentlyPlayingId(null);
  };

  // Fetch all users for sharing
  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const response = await userAPI.getAll();
      if (response.data) {
        // Filter out current user (optional)
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const otherUsers = response.data.filter(user => user.id !== currentUser.id);
        setUsers(otherUsers);
        setFilteredUsers(otherUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleShareClick = async (post) => {
    setSelectedPost(post);
    setShowSharePopup(true);
    setSearchTerm('');
    setSelectedUsers([]);
    await fetchUsers();
  };

  const handleClosePopup = () => {
    setShowSharePopup(false);
    setSelectedPost(null);
    setSelectedUsers([]);
    setSearchTerm('');
    setShareSuccess(false);
  };

  const handleSearchUsers = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(term) || 
        user.employeeid.toLowerCase().includes(term)
      );
      setFilteredUsers(filtered);
    }
  };

  const toggleUserSelection = (user) => {
    setSelectedUsers(prev => {
      if (prev.find(u => u.id === user.id)) {
        return prev.filter(u => u.id !== user.id);
      } else {
        return [...prev, user];
      }
    });
  };

  const handleSendShare = () => {
    if (selectedUsers.length === 0) {
      alert('Please select at least one user to share with');
      return;
    }

    // Here you can implement the actual share logic
    // For now, just show success message
    console.log('Sharing post:', selectedPost.id);
    console.log('Shared with users:', selectedUsers);
    
    setShareSuccess(true);
    setTimeout(() => {
      handleClosePopup();
    }, 2000);
  };

  // Reset video state when media index changes
  useEffect(() => {
    // When media changes, reset video state for that post
    Object.keys(currentMediaIndex).forEach(postId => {
      const video = videoRefs.current[postId];
      if (video) {
        video.pause();
        setVideoStates(prev => ({ ...prev, [postId]: 'paused' }));
      }
    });
  }, [currentMediaIndex]);

  if (loading) {
    return (
      <div className="px-4 mt-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="px-4 mt-6">
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <ImageIcon className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">No posts yet</h3>
          <p className="text-gray-500 text-sm mt-1">Be the first to share something</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {posts.map((post) => {
          const currentIndex = getCurrentIndex(post.id);
          const currentMedia = post.media && post.media.length > 0 ? post.media[currentIndex] : null;
          const hasMultipleMedia = post.media && post.media.length > 1;
          const isLiked = likedPosts[post.id] || false;
          const videoState = videoStates[post.id] || 'paused';

          return (
            <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

              {/* Media Carousel */}
              {post.media && post.media.length > 0 && currentMedia && (
                <div className="relative w-full bg-black">
                  <div className="w-full relative">
                    {currentMedia.type === 'video' ? (
                      <>
                        <video 
                          ref={el => {
                            if (el) videoRefs.current[post.id] = el;
                          }}
                          src={`http://localhost:5000${currentMedia.url}`}
                          className="w-full h-auto max-h-[600px] object-contain cursor-pointer"
                          style={{ maxHeight: '70vh' }}
                          onClick={() => toggleVideoPlay(post.id)}
                          onPlay={() => handleVideoPlay(post.id)}
                          onPause={() => handleVideoPause(post.id)}
                          onEnded={() => handleVideoEnded(post.id)}
                        />
                        
                        {/* Center Play/Pause Button */}
                        <div 
                          className="absolute inset-0 flex items-center justify-center cursor-pointer"
                          onClick={() => toggleVideoPlay(post.id)}
                        >
                          {videoState === 'playing' ? (
                            <div className="bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition transform hover:scale-110">
                              <Pause className="w-8 h-8 text-gray-800 fill-current" />
                            </div>
                          ) : (
                            <div className="bg-white/80 hover:bg-white rounded-full p-4 shadow-lg transition transform hover:scale-110">
                              <Play className="w-8 h-8 text-gray-800 fill-current ml-1" />
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <img 
                        src={`http://localhost:5000${currentMedia.url}`}
                        alt={post.title}
                        className="w-full h-auto max-h-[600px] object-contain"
                        style={{ maxHeight: '70vh' }}
                      />
                    )}
                  </div>

                  {/* Carousel Navigation */}
                  {hasMultipleMedia && (
                    <>
                      {currentIndex > 0 && (
                        <button
                          onClick={() => prevMedia(post.id, post.media.length)}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition z-10"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                      )}
                      {currentIndex < post.media.length - 1 && (
                        <button
                          onClick={() => nextMedia(post.id, post.media.length)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition z-10"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      )}
                    </>
                  )}

                  {/* Media Indicators */}
                  {hasMultipleMedia && (
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
                      {post.media.map((media, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            // Pause video before changing media
                            const video = videoRefs.current[post.id];
                            if (video && !video.paused) {
                              video.pause();
                              setVideoStates(prev => ({ ...prev, [post.id]: 'paused' }));
                              setCurrentlyPlayingId(null);
                            }
                            setCurrentMediaIndex(prev => ({ ...prev, [post.id]: idx }));
                          }}
                          className={`h-1 rounded-full transition-all ${
                            idx === currentIndex 
                              ? 'w-5 bg-white' 
                              : 'w-1.5 bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}


<div className="px-5 pt-4 pb-2 flex items-center justify-between">
  {/* Left side - Engagement buttons */}
  <div className="flex items-center gap-3">
    <button 
      onClick={() => handleLike(post.id)}
      className={`flex items-center gap-1 transition ${isLiked ? 'text-blue-500' : 'text-gray-600 hover:text-blue-500'}`}
    >
      <ThumbsUp className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
      <span className="text-xs">{post.likes || 1}</span>
    </button>
    
    <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition">
      <Eye className="w-6 h-6" />
      <span className="text-xs">{post.views || 2}</span>
    </button>
    
    <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition">
      <MessageCircle className="w-6 h-6" />
    </button>
    
    <button 
      onClick={() => handleShareClick(post)}
      className="flex items-center gap-1 text-gray-600 hover:text-green-500 transition"
    >
      <Share2 className="w-5 h-5" />
    </button>
  </div>

  {/* Right side - Additional action buttons */}
  <div className="flex items-center gap-3">
{/* YouTube button with popup */}
<button 
  onClick={handleYouTubeClick}
  className="relative group transition-all duration-300 transform hover:scale-110 active:scale-95"
  title="Watch on YouTube"
>
  {/* Red glow effect on hover */}
  <span className="absolute inset-0 rounded-full bg-red-400 opacity-0 group-hover:opacity-75 group-hover:animate-ping"></span>
  
  {/* YouTube icon with red gradient background */}
  <div className="relative bg-gradient-to-r from-red-500 to-red-700 rounded-full p-1.5 shadow-lg group-hover:shadow-xl transition-all duration-300">
    <svg 
      className="w-5 h-5 text-white" 
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  </div>
  
  {/* Touch ripple effect */}
  <span className="absolute inset-0 rounded-full bg-red-500 opacity-0 transition-all duration-300 group-active:opacity-50 group-active:scale-150"></span>
</button>

  {/* Quiz button with colorful MCQ icon */}
  <button 
    onClick={() => {/* Add quiz functionality */}}
    className="relative group transition-all duration-300 transform hover:scale-110 active:scale-95"
    title="Take Quiz"
  >
    {/* Colorful glow effect on hover */}
    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-75 group-hover:animate-ping"></span>
    
    {/* MCQ icon with colorful gradient background */}
    <div className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-full p-1.5 shadow-lg group-hover:shadow-xl transition-all duration-300">
      <svg 
        className="w-5 h-5 text-white" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        {/* Multiple choice checkbox style icon */}
        <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
        <circle cx="17.5" cy="17.5" r="1.5" fill="white"/>
        <circle cx="17.5" cy="11.5" r="1.5" fill="white"/>
        <circle cx="17.5" cy="7.5" r="1.5" fill="white"/>
      </svg>
    </div>
    
    {/* Touch ripple effect */}
    <span className="absolute inset-0 rounded-full bg-purple-500 opacity-0 transition-all duration-300 group-active:opacity-50 group-active:scale-150"></span>
  </button>

    {/* Bookmark button */}
    <button 
      onClick={() => {/* Add bookmark functionality */}}
      className="text-gray-600 hover:text-yellow-600 transition"
      title="Save to Bookmarks"
    >
      <Bookmark className="w-6 h-6" />
    </button>
  </div>
</div>

              {/* Title */}
              {post.title && (
                <div className="px-5 pb-2">
                  <p className="text-gray-900 text-base font-medium leading-relaxed">
                    {post.title}
                  </p>
                </div>
              )}

              {/* Hashtags */}
              {post.hashtags && (
                <div className="px-5 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {post.hashtags.split(' ').map((tag, idx) => (
                      <span key={idx} className="text-blue-500 text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Share Popup Modal */}
      {showSharePopup && (
        <div className="fixed inset-0 z-50 overflow-y-auto" onClick={handleClosePopup}>
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div 
              className="relative bg-white rounded-2xl shadow-xl max-w-md w-full transform transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Share Post</h3>
                <button
                  onClick={handleClosePopup}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Success Message */}
              {shareSuccess && (
                <div className="m-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-green-700">
                      Shared successfully with {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''}!
                    </p>
                  </div>
                </div>
              )}

              {/* Search Bar */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users by name or employee ID..."
                    value={searchTerm}
                    onChange={handleSearchUsers}
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Users List */}
              <div className="max-h-96 overflow-y-auto">
                {loadingUsers ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : filteredUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No users found</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {filteredUsers.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => toggleUserSelection(user)}
                        className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                          selectedUsers.find(u => u.id === user.id) ? 'bg-blue-50' : ''
                        }`}
                      >
                        {/* Profile Image */}
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0">
                          {user.profile_image ? (
                            <img 
                              src={`http://localhost:5000${user.profile_image}`}
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </div>
                        
                        {/* User Info */}
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">ID: {user.employeeid}</p>
                        </div>

                        {/* Role Badge */}
                        <div className="flex items-center gap-2">
                          
                          {selectedUsers.find(u => u.id === user.id) && (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer with Send Button */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">
                    {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                <button
                  onClick={handleSendShare}
                  disabled={selectedUsers.length === 0}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send to {selectedUsers.length > 0 ? `${selectedUsers.length} user${selectedUsers.length > 1 ? 's' : ''}` : 'users'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* YouTube Popup Modal */}
{showYouTubePopup && (
  <div className="fixed inset-0 z-50 overflow-y-auto" onClick={() => setShowYouTubePopup(false)}>
    <div className="fixed inset-0 bg-[#00000080] bg-opacity-75 transition-opacity"></div>
    
    <div className="flex min-h-full items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <IoLogoYoutube className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">YouTube Video</h3>
          </div>
          <button
            onClick={() => setShowYouTubePopup(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/GSyle-JHiDw?autoplay=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Footer with Open in YouTube button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={openInYouTube}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2.5 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <IoLogoYoutube className="w-5 h-5" />
            Open in YouTube
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Video will open in YouTube app or website
          </p>
        </div>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default CarComponents;