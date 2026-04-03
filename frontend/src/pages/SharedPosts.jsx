// src/components/SharedPosts.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { shareAPI } from '../services/api';
import { User, Clock, Share2, ArrowLeft, Play, Pause, X, ChevronLeft, ChevronRight, UserPlus } from 'lucide-react';
import { IoLogoYoutube } from 'react-icons/io5';

const SharedPosts = () => {
  const navigate = useNavigate();
  const [receivedShares, setReceivedShares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMediaIndex, setCurrentMediaIndex] = useState({});
  const [showYouTubePopup, setShowYouTubePopup] = useState(false);
  const [currentYouTubeUrl, setCurrentYouTubeUrl] = useState('');
  const [videoStates, setVideoStates] = useState({});
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);
  const videoRefs = useRef({});

  useEffect(() => {
    fetchReceivedShares();
  }, []);

  const fetchReceivedShares = async () => {
    setLoading(true);
    try {
      const received = await shareAPI.getReceivedShares();
      setReceivedShares(received.data);
    } catch (error) {
      console.error('Error fetching received shares:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  // Carousel navigation functions
  const nextMedia = (postId, totalMedia) => {
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

  // Video player functions
  const toggleVideoPlay = (postId) => {
    const video = videoRefs.current[postId];
    if (!video) return;

    if (currentlyPlayingId && currentlyPlayingId !== postId) {
      const otherVideo = videoRefs.current[currentlyPlayingId];
      if (otherVideo) {
        otherVideo.pause();
        setVideoStates(prev => ({ ...prev, [currentlyPlayingId]: 'paused' }));
      }
    }

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

  // YouTube functions
  const handleYouTubeThumbnailClick = (youtubeUrl) => {
    setCurrentYouTubeUrl(youtubeUrl);
    setShowYouTubePopup(true);
  };

  const handleCloseYouTubePopup = () => {
    setShowYouTubePopup(false);
    setCurrentYouTubeUrl('');
  };

  const openInYouTube = () => {
    window.open(currentYouTubeUrl, '_blank');
  };

  const getYouTubeEmbedUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
  };

  const getYouTubeThumbnail = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Shared With Me</h1>
        <p className="text-gray-500 text-sm mt-1">Posts that have been shared with you</p>
      </div>

      {/* Shares List */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : receivedShares.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Share2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No shared posts yet</p>
            <p className="text-sm text-gray-400 mt-1">
              When someone shares a post with you, it will appear here
            </p>
          </div>
        ) : (
          receivedShares.map((share) => {
            const postMedia = share.media || [];
            const currentIndex = getCurrentIndex(share.post_id);
            const currentMedia = postMedia.length > 0 ? postMedia[currentIndex] : null;
            const hasMultipleMedia = postMedia.length > 1;
            const videoState = videoStates[share.post_id] || 'paused';
            const youtubeThumbnail = currentMedia?.type === 'youtube' ? getYouTubeThumbnail(currentMedia.url) : null;

            return (
              <article key={share.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Shared Header - Highlighted at the top */}
                <div className="px-5 pt-4 pb-2 flex items-center gap-3 bg-black">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0 ring-2 ring-white shadow-md">
                      {share.shared_by_profile_image ? (
                        <img 
                          src={`http://localhost:5000${share.shared_by_profile_image}`}
                          alt={share.shared_by_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full ring-2 ring-white"></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-white">
                        {share.shared_by_name}
                      </span>
                      <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                        Shared with you
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-white mt-0.5">
                      <Clock className="w-3 h-3" />
                      {new Date(share.created_at).toLocaleDateString()}
                    </div>
                  </div>
                
                </div>

                {/* Media Carousel */}
                {postMedia.length > 0 && currentMedia && (
                  <div className="relative w-full bg-black">
                    <div className="w-full relative">
                      {currentMedia.type === 'video' ? (
                        <>
                          <video 
                            ref={el => {
                              if (el) videoRefs.current[share.post_id] = el;
                            }}
                            src={`http://localhost:5000${currentMedia.url}`}
                            className="w-full h-auto max-h-[600px] object-contain cursor-pointer"
                            style={{ maxHeight: '70vh' }}
                            onClick={() => toggleVideoPlay(share.post_id)}
                            onPlay={() => handleVideoPlay(share.post_id)}
                            onPause={() => handleVideoPause(share.post_id)}
                            onEnded={() => handleVideoEnded(share.post_id)}
                          />
                          
                          <div 
                            className="absolute inset-0 flex items-center justify-center cursor-pointer"
                            onClick={() => toggleVideoPlay(share.post_id)}
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
                      ) : currentMedia.type === 'youtube' ? (
                        <div 
                          className="relative cursor-pointer group"
                          onClick={() => handleYouTubeThumbnailClick(currentMedia.url)}
                        >
                          <img 
                            src={youtubeThumbnail}
                            alt="YouTube Video"
                            className="w-full h-auto max-h-[600px] object-contain"
                            style={{ maxHeight: '70vh' }}
                            onError={(e) => {
                              const match = currentMedia.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
                              e.target.src = `https://img.youtube.com/vi/${match?.[1]}/hqdefault.jpg`;
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all duration-300">
                            <div className="bg-red-600/90 hover:bg-red-600 rounded-full p-5 shadow-lg transition transform group-hover:scale-110">
                              <Play className="w-12 h-12 text-white fill-current ml-1" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <img 
                          src={`http://localhost:5000${currentMedia.url}`}
                          alt={share.post_title}
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
                            onClick={() => prevMedia(share.post_id, postMedia.length)}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition z-10"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                        )}
                        {currentIndex < postMedia.length - 1 && (
                          <button
                            onClick={() => nextMedia(share.post_id, postMedia.length)}
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
                        {postMedia.map((media, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              const video = videoRefs.current[share.post_id];
                              if (video && !video.paused) {
                                video.pause();
                                setVideoStates(prev => ({ ...prev, [share.post_id]: 'paused' }));
                                setCurrentlyPlayingId(null);
                              }
                              setCurrentMediaIndex(prev => ({ ...prev, [share.post_id]: idx }));
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

                    {/* YouTube Badge */}
                    {currentMedia.type === 'youtube' && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-md flex items-center gap-1 z-10">
                        <IoLogoYoutube className="w-4 h-4" />
                        <span className="text-xs font-medium">YouTube</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Title */}
                {share.post_title && (
                  <div className="px-5 pt-4 pb-2">
                    <p className="text-gray-900 text-base font-medium leading-relaxed">
                      {share.post_title}
                    </p>
                  </div>
                )}

                {/* Content */}
                {share.post_content && (
                  <div className="px-5 pb-2">
                    <p className="text-gray-600 text-sm">
                      {share.post_content}
                    </p>
                  </div>
                )}

                {/* Hashtags */}
                {share.post_hashtags && (
                  <div className="px-5 pb-4">
                    <div className="flex flex-wrap gap-2">
                      {share.post_hashtags.split(' ').map((tag, idx) => (
                        <span key={idx} className="text-blue-500 text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>

      {/* YouTube Popup Modal */}
      {showYouTubePopup && (
        <div className="fixed inset-0 z-50 overflow-y-auto" onClick={handleCloseYouTubePopup}>
          <div className="fixed inset-0 bg-[#000000cc] bg-opacity-95 transition-opacity"></div>
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div 
              className="relative bg-white rounded-2xl shadow-xl max-w-5xl w-full transform transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <IoLogoYoutube className="w-6 h-6 text-red-600" />
                  <h3 className="text-lg font-semibold text-gray-900">YouTube Video</h3>
                </div>
                <button
                  onClick={handleCloseYouTubePopup}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={getYouTubeEmbedUrl(currentYouTubeUrl)}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

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
    </div>
  );
};

export default SharedPosts;