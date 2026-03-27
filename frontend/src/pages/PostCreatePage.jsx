// src/pages/PostPage.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Eye, X, Upload, Image, Video, FileImage, AlertCircle, Calendar, Hash } from 'lucide-react';
import { categoryAPI, postAPI } from '../services/api';

const PostPage = () => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [error, setError] = useState('');
    
    const [formData, setFormData] = useState({
        category_id: '',
        title: '',
        content: '',
        hashtags: '',
    });
    
    const [mediaFiles, setMediaFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await postAPI.getAll();
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await categoryAPI.getAll();
            setCategories(response.data);
            if (response.data.length > 0) {
                setFormData(prev => ({ ...prev, category_id: response.data[0].id }));
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        
        if (files.length + mediaFiles.length > 10) {
            alert('Maximum 10 files allowed');
            return;
        }
        
        const oversizedFiles = files.filter(file => file.size > 50 * 1024 * 1024);
        if (oversizedFiles.length > 0) {
            alert('Some files exceed 50MB limit');
            return;
        }
        
        setMediaFiles(prev => [...prev, ...files]);
        
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => [...prev, { 
                    url: reader.result, 
                    type: file.type,
                    name: file.name,
                    size: (file.size / 1024 / 1024).toFixed(2)
                }]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeFile = (index) => {
        setMediaFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        
        if (!formData.category_id) {
            alert('Please select a category');
            return;
        }
        
        if (!formData.title.trim()) {
            alert('Please enter a title');
            return;
        }
        
        if (mediaFiles.length === 0) {
            alert('Please add at least one media file (image, video, or GIF)');
            return;
        }
        
        setCreating(true);
        
        const submitData = new FormData();
        submitData.append('category_id', formData.category_id);
        submitData.append('title', formData.title);
        submitData.append('content', formData.content);
        submitData.append('hashtags', formData.hashtags);
        
        mediaFiles.forEach(file => {
            submitData.append('media', file);
        });
        
        try {
            await postAPI.create(submitData);
            await fetchPosts();
            // Reset form
            setFormData({
                category_id: categories[0]?.id || '',
                title: '',
                content: '',
                hashtags: '',
            });
            setMediaFiles([]);
            setPreviews([]);
            setShowCreateModal(false);
            alert(`Post created successfully!`);
        } catch (error) {
            console.error('Error creating post:', error);
            alert(error.response?.data?.error || 'Error creating post. Please try again.');
        } finally {
            setCreating(false);
        }
    };

    const handleDeletePost = async (id, title) => {
        if (window.confirm(`Are you sure you want to delete post "${title}"?`)) {
            try {
                await postAPI.delete(id);
                await fetchPosts();
                alert('Post deleted successfully!');
            } catch (error) {
                console.error('Error deleting post:', error);
                alert('Error deleting post');
            }
        }
    };

    const handleViewPost = (post) => {
        setSelectedPost(post);
        setShowViewModal(true);
    };

    const getMediaIcon = (type) => {
        if (type.startsWith('video/')) return <Video className="w-4 h-4" />;
        if (type === 'image/gif') return <FileImage className="w-4 h-4" />;
        return <Image className="w-4 h-4" />;
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Unknown';
    };

    const truncateText = (text, maxLength = 100) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div className="p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Posts</h1>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition"
                    >
                        <Plus className="w-4 h-4" />
                        Create Post
                    </button>
                </div>

                {/* Posts Table */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                        <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800">No Posts Yet</h3>
                        <p className="text-gray-500 mt-2">Create your first post to get started</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            S.No
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Hashtags
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Created Date
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {posts.map((post, index) => (
                                        <tr key={post.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-black">{index + 1}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-black">{post.title}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-black">
                                                    {getCategoryName(post.category_id)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {post.hashtags && (
                                                    <div className="flex flex-wrap gap-1">
                                                        {post.hashtags.split(' ').slice(0, 2).map((tag, idx) => (
                                                            <span key={idx} className="text-black">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {post.hashtags.split(' ').length > 2 && (
                                                            <span className="text-black">+{post.hashtags.split(' ').length - 2}</span>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-black">
                                                    {new Date(post.created_at).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleViewPost(post)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                        title="View Post"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeletePost(post.id, post.title)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                        title="Delete Post"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Create Post Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-gray-200 sticky top-0 bg-white">
                            <h2 className="text-xl font-bold text-gray-800">Create New Post</h2>
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setMediaFiles([]);
                                    setPreviews([]);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleCreatePost} className="p-5 space-y-4">
                            {/* Category Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category *
                                </label>
                                <div className="flex gap-2">
                                    <select
                                        name="category_id"
                                        value={formData.category_id}
                                        onChange={handleInputChange}
                                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-black"
                                        required
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter post title"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-black"
                                    required
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Content
                                </label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    rows="4"
                                    placeholder="Write your post content here..."
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-black resize-none"
                                />
                            </div>

                            {/* Hashtags */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Hashtags
                                </label>
                                <input
                                    type="text"
                                    name="hashtags"
                                    value={formData.hashtags}
                                    onChange={handleInputChange}
                                    placeholder="#BAT #Training #Sales"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-black"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Separate hashtags with spaces
                                </p>
                            </div>

                            {/* Media Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Media Files * (Images, Videos, GIFs)
                                </label>
                                
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-black transition cursor-pointer bg-gray-50">
                                    <input
                                        type="file"
                                        accept="image/*,video/*,image/gif"
                                        multiple
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="media-upload"
                                    />
                                    <label htmlFor="media-upload" className="cursor-pointer block">
                                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                        <div className="text-sm text-gray-600 font-medium">
                                            Click to upload media
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Images, Videos, GIFs (Max 10 files, 50MB each)
                                        </div>
                                    </label>
                                </div>
                                
                                {previews.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        <div className="text-sm font-medium text-gray-700">
                                            Selected Files ({previews.length}/10):
                                        </div>
                                        <div className="space-y-2 max-h-48 overflow-y-auto">
                                            {previews.map((preview, idx) => (
                                                <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                                    <div className="w-12 h-12 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                                                        {preview.type.startsWith('video/') ? (
                                                            <video src={preview.url} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <img src={preview.url} alt="Preview" className="w-full h-full object-cover" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-800 truncate">{preview.name}</p>
                                                        <p className="text-xs text-gray-500">{preview.size} MB</p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFile(idx)}
                                                        className="p-1 hover:bg-red-100 rounded-full transition"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-500" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={creating}
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50"
                            >
                                {creating ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Creating Post...
                                    </span>
                                ) : (
                                    'Publish Post'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* View Post Modal */}
            {showViewModal && selectedPost && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-gray-200 sticky top-0 bg-white">
                            <h2 className="text-xl font-bold text-gray-800">Media Details</h2>
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="p-5 space-y-4">
                           
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
                            
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default PostPage;