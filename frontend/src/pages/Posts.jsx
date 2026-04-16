import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Image, Video, FileText, Eye, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { FaToggleOn, FaYoutube } from "react-icons/fa";
import api, { FILE_BASE_URL } from '../services/api';
import CreatePostModal from '../components/CreatePostModal';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await api.getPosts();
            console.log('API Response:', response);
            
            if (response.success) {
                if (Array.isArray(response.data)) {
                    setPosts(response.data);
                } else if (response.data && Array.isArray(response.data.posts)) {
                    setPosts(response.data.posts);
                } else {
                    setPosts([]);
                    setError('Invalid data format received');
                }
            } else {
                setError(response.error || 'Failed to fetch posts');
                setPosts([]);
            }
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError(err.message || 'Failed to fetch posts');
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await api.getCategories();
            if (response.success && Array.isArray(response.data)) {
                setCategories(response.data);
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    // Handle post creation from modal
    const handleCreatePost = async (formData) => {
        try {
            const response = await api.createPost(formData);
            
            if (response.success) {
                alert('Post created successfully!');
                await fetchPosts(); // Refresh the posts list
                return response;
            } else {
                throw new Error(response.error || 'Failed to create post');
            }
        } catch (err) {
            console.error('Error creating post:', err);
            throw err;
        }
    };

    // Get media icon based on type
    const getMediaIcon = (mediaType) => {
        switch (mediaType) {
            case 'image':
                return <Image className="w-4 h-4 text-green-600" />;
            case 'video':
                return <Video className="w-4 h-4 text-blue-600" />;
            case 'youtube':
                return <FaYoutube  className="w-4 h-4 text-red-600" />;
            case 'pdf':
                return <FileText className="w-4 h-4 text-orange-600" />;
            case 'ppt':
                return <FileText className="w-4 h-4 text-yellow-600" />;
            case 'wbt':
                return <FileText className="w-4 h-4 text-purple-600" />;
            default:
                return <Image className="w-4 h-4 text-gray-600" />;
        }
    };

    const handleView = (post) => {
        setSelectedPost(post);
        setShowViewModal(true);
    };

    const handleEdit = (post) => {
       alert('Edit functionality will be added soon');
    };

    const handleDelete = (post) => {
       alert('Delete functionality will be added soon');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Posts</h1>
                </div>
                
                <button
                    onClick={() => {
                        setEditingPost(null);
                        setShowModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition"
                >
                    <Plus className="w-4 h-4" />
                    Add Post
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                </div>
            )}

            {/* Posts Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    S.No
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category Icon
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Media
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stats
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {posts && posts.length > 0 ? (
                                posts.map((post, index) => (
                                    <tr key={post.id || index} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                                            <img 
                                                    src={`${FILE_BASE_URL}${post.category_icon_url}`}
                                                    // alt={post.title}
                                                    className="w-10 h-10 object-cover rounded-lg"
                                                />
                                        </td>
                                        <td className="px-4 py-2 text-sm">
                                           {post.title}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                                           {post.category_name}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                                            {post.media && post.media.length > 0 ? (
                                                <div className="flex items-center gap-1">
                                                    {post.media.slice(0, 3).map((media, idx) => (
                                                        <div key={idx} title={media.media_type}>
                                                            {getMediaIcon(media.media_type)}
                                                        </div>
                                                    ))}
                                                    {post.media.length > 3 && (
                                                        <span className="text-xs text-gray-500 ml-1">
                                                            +{post.media.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-xs">No media</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1" title="Views">
                                                    <Eye className="w-3 h-3 text-gray-400" />
                                                    <span className="text-xs">{post.views_count || 0}</span>
                                                </div>
                                                <div className="flex items-center gap-1" title="Likes">
                                                    <ThumbsUp className="w-3 h-3 text-gray-400" />
                                                    <span className="text-xs">{post.likes_count || 0}</span>
                                                </div>
                                                <div className="flex items-center gap-1" title="Comments">
                                                    <MessageCircle className="w-3 h-3 text-gray-400" />
                                                    <span className="text-xs">{post.comments_count || 0}</span>
                                                </div>
                                                <div className="flex items-center gap-1" title="Shares">
                                                    <Share2 className="w-3 h-3 text-gray-400" />
                                                    <span className="text-xs">{post.shares_count || 0}</span>
                                                </div>
                                            </div>
                                        </td>
                                          <td className="px-4 py-2 text-3xl text-green-600 whitespace-nowrap">
                                                                                {/* {post.status} */}
                                                                                <FaToggleOn />
                                                                            </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleView(post)}
                                                    className="p-1 text-blue-600 hover:bg-blue-50 rounded-md transition"
                                                    title="View"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit()}
                                                    className="p-1 text-indigo-600 hover:bg-indigo-50 rounded-md transition"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                onClick={() => handleDelete()}
                                                    className="p-1 text-red-600 hover:bg-red-50 rounded-md transition"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                                        No posts found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Post Modal */}
            {showViewModal && selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Media Files ({selectedPost.media?.length || 0})
                            </h2>
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>
                        
                        <div className="p-6">
                            {selectedPost.media && selectedPost.media.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {selectedPost.media.map((media, idx) => (
                                        <div key={idx} className="border rounded-lg overflow-hidden">
                                            {/* Image */}
                                            {media.media_type === 'image' && media.media_url && (
                                                <img 
                                                    src={`${FILE_BASE_URL}${media.media_url}`}
                                                    alt={`Media ${idx + 1}`}
                                                    className="w-full h-48 object-cover"
                                                />
                                            )}
                                            
                                            {/* YouTube */}
                                            {media.media_type === 'youtube' && (
                                                <div className="relative">
                                                    <img 
                                                        src={media.thumbnail_url}
                                                        alt="YouTube thumbnail"
                                                        className="w-full h-48 object-cover"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                                                        <FaYoutube  className="w-12 h-12 text-red-600" />
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Video */}
                                            {media.media_type === 'video' && media.media_url && (
                                                <video className="w-full h-48 object-cover" controls>
                                                    <source src={`${FILE_BASE_URL}${media.media_url}`} />
                                                </video>
                                            )}
                                            
                                            {/* GIF */}
                                            {media.media_type === 'gif' && media.media_url && (
                                                <img 
                                                    src={`${FILE_BASE_URL}${media.media_url}`}
                                                    alt={`GIF ${idx + 1}`}
                                                    className="w-full h-48 object-cover"
                                                />
                                            )}
                                            
                                            {/* PDF, PPT, WBT */}
                                            {(media.media_type === 'pdf' || media.media_type === 'ppt' || media.media_type === 'wbt') && (
                                                <div className="w-full h-48 flex flex-col items-center justify-center bg-gray-50">
                                                    {getMediaIcon(media.media_type)}
                                                    <span className="text-sm text-gray-500 mt-2 uppercase">{media.media_type}</span>
                                                    {media.media_url && (
                                                        <a 
                                                            href={`${FILE_BASE_URL}${media.media_url}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xs text-blue-600 mt-2 hover:underline"
                                                        >
                                                            Open File
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                            
                                            <div className="p-2 bg-gray-50 text-xs text-gray-600 flex justify-between items-center">
                                                <span>Type: {media.media_type}</span>
                                                {media.media_type === 'youtube' && media.media_url && (
                                                    <a 
                                                        href={media.media_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-red-600 hover:underline"
                                                    >
                                                        Watch on YouTube
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">No media files found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Create Post Modal */}
            <CreatePostModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleCreatePost}
                categories={categories}
            />
        </div>
    );
};

export default Posts;