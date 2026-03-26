// src/components/CarComponents.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Eye, Image as ImageIcon, Video, FileImage, ChevronLeft, ChevronRight, Heart, MessageCircle, Share2, Play, Pause } from 'lucide-react';

const CarComponents = ({ posts, loading, onViewPost }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [videoStates, setVideoStates] = useState({});
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);
  const videoRefs = useRef({});

  const getMediaIcon = (type) => {
    if (type === 'video') return <Video className="w-4 h-4 text-blue-500" />;
    if (type === 'gif') return <FileImage className="w-4 h-4 text-purple-500" />;
    return <ImageIcon className="w-4 h-4 text-green-500" />;
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
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
      {posts.map((post) => {
        const currentIndex = getCurrentIndex(post.id);
        const currentMedia = post.media && post.media.length > 0 ? post.media[currentIndex] : null;
        const hasMultipleMedia = post.media && post.media.length > 1;
        const isLiked = likedPosts[post.id] || false;
        const videoState = videoStates[post.id] || 'paused';

        return (
          <article key={post.id} className="bg-white rounded-2xl  shadow-sm border border-gray-100 overflow-hidden">

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

            {/* Engagement Actions */}
            <div className="px-5 pt-4 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <button 
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 transition ${isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button className="flex items-center gap-1.5 text-gray-600 hover:text-blue-500 transition">
                  <MessageCircle className="w-6 h-6" />
                </button>
                <button className="flex items-center gap-1.5 text-gray-600 hover:text-green-500 transition">
                  <Share2 className="w-6 h-6" />
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
  );
};

export default CarComponents;