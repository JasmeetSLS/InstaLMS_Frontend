// src/components/CarComponents.jsx
import React, { useState } from 'react';
import { Shield, Car, Gauge, Cog, Eye, Calendar, Hash, Image as ImageIcon, Video, FileImage } from 'lucide-react';

const CarComponents = ({ posts, loading, onViewPost }) => {
  const getMediaIcon = (type) => {
    if (type === 'video') return <Video className="w-4 h-4 text-blue-500" />;
    if (type === 'gif') return <FileImage className="w-4 h-4 text-purple-500" />;
    return <ImageIcon className="w-4 h-4 text-green-500" />;
  };

  if (loading) {
    return (
      <div className="px-4 mt-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="px-4 mt-6">
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800">No Posts Yet</h3>
          <p className="text-gray-500 mt-2">No posts available for this category</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 mt-6 space-y-4">
      <h2 className="text-lg font-bold text-gray-800 mb-3">Posts</h2>
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
          {/* Post Header */}
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg">{post.title}</h3>
            {post.hashtags && (
              <div className="flex flex-wrap gap-2 mt-2">
                {post.hashtags.split(' ').map((tag, idx) => (
                  <span key={idx} className="text-blue-600 text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Post Content */}
          {post.content && (
            <div className="px-4 py-3">
              <p className="text-gray-700 text-sm">{post.content}</p>
            </div>
          )}

          {/* Media Preview */}
          {post.media && post.media.length > 0 && (
            <div className="px-4 pb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {post.media.slice(0, 4).map((m, idx) => (
                    <span key={idx} title={m.type}>
                      {getMediaIcon(m.type)}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {post.media.length} file(s)
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {post.media.slice(0, 4).map((media, idx) => (
                  <div key={idx} className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer" onClick={() => onViewPost(post)}>
                    {media.type === 'video' ? (
                      <video 
                        src={`http://localhost:5000${media.url}`}
                        className="w-full h-24 object-cover"
                      />
                    ) : (
                      <img 
                        src={`http://localhost:5000${media.url}`}
                        alt={`Media ${idx + 1}`}
                        className="w-full h-24 object-cover"
                      />
                    )}
                  </div>
                ))}
                {post.media.length > 4 && (
                  <div className="bg-gray-100 rounded-lg flex items-center justify-center h-24">
                    <span className="text-sm text-gray-500">+{post.media.length - 4} more</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Post Footer */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              {new Date(post.created_at).toLocaleDateString()}
            </div>
            <button
              onClick={() => onViewPost(post)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <Eye className="w-4 h-4" />
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarComponents;