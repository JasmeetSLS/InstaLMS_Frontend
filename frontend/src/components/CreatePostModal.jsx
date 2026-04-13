import React, { useState, useEffect } from 'react';
import { X, Upload, Image, FileText, Plus, Trash2, Video } from 'lucide-react';

const CreatePostModal = ({ isOpen, onClose, onSubmit, categories = [] }) => {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    
    // Form state
    const [formData, setFormData] = useState({
        title: '',
        category_id: '',
        description: '',
        hashtags: '',
        youtube_links: []
    });
    
    const [mediaFiles, setMediaFiles] = useState([]);
    const [thumbnailFiles, setThumbnailFiles] = useState([]);
    const [youtubeInput, setYoutubeInput] = useState('');
    const [previewUrls, setPreviewUrls] = useState([]);

    useEffect(() => {
        if (isOpen) {
            resetForm();
        }
    }, [isOpen]);

    const resetForm = () => {
        setFormData({
            title: '',
            category_id: '',
            description: '',
            hashtags: '',
            youtube_links: []
        });
        setMediaFiles([]);
        setThumbnailFiles([]);
        setYoutubeInput('');
        setError('');
        setPreviewUrls([]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleMediaFilesChange = (e) => {
        const files = Array.from(e.target.files);
        setMediaFiles(prev => [...prev, ...files]);
        
        // Create preview URLs for images
        const newPreviewUrls = files.map(file => {
            if (file.type.startsWith('image/')) {
                return URL.createObjectURL(file);
            }
            return null;
        });
        setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    };

    const handleThumbnailFilesChange = (e) => {
        const files = Array.from(e.target.files);
        setThumbnailFiles(prev => [...prev, ...files]);
    };

    const removeMediaFile = (index) => {
        setMediaFiles(prev => prev.filter((_, i) => i !== index));
        setThumbnailFiles(prev => prev.filter((_, i) => i !== index));
        
        // Clean up preview URL
        if (previewUrls[index]) {
            URL.revokeObjectURL(previewUrls[index]);
        }
        setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    };

    const addYoutubeLink = () => {
        if (youtubeInput.trim() && !formData.youtube_links.includes(youtubeInput.trim())) {
            setFormData(prev => ({
                ...prev,
                youtube_links: [...prev.youtube_links, youtubeInput.trim()]
            }));
            setYoutubeInput('');
        }
    };

    const removeYoutubeLink = (index) => {
        setFormData(prev => ({
            ...prev,
            youtube_links: prev.youtube_links.filter((_, i) => i !== index)
        }));
    };

    const validateForm = () => {
        if (!formData.title.trim()) {
            setError('Title is required');
            return false;
        }
        
        if (!formData.category_id) {
            setError('Please select a category');
            return false;
        }
        
        if (mediaFiles.length === 0 && formData.youtube_links.length === 0) {
            setError('Please add at least one media file or YouTube link');
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setSubmitting(true);
        setError('');
        
        try {
            // Prepare form data to send to parent
            const submitFormData = new FormData();
            submitFormData.append('title', formData.title);
            submitFormData.append('category_id', formData.category_id);
            
            if (formData.description) {
                submitFormData.append('description', formData.description);
            }
            
            if (formData.hashtags) {
                submitFormData.append('hashtags', formData.hashtags);
            }
            
            // Add media files
            mediaFiles.forEach((file, index) => {
                submitFormData.append('media', file);
                if (thumbnailFiles[index]) {
                    submitFormData.append('thumbnail', thumbnailFiles[index]);
                }
            });
            
            // Add YouTube links
            formData.youtube_links.forEach(link => {
                submitFormData.append('youtube_links', link);
            });
            
            // Pass to parent component
            await onSubmit(submitFormData);
            
            // Reset and close on success
            resetForm();
            onClose();
            
        } catch (err) {
            setError(err.message || 'Failed to create post');
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Create New Post</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Title */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter post title"
                        />
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter post description"
                        />
                    </div>

                    {/* Hashtags */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Hashtags
                        </label>
                        <input
                            type="text"
                            name="hashtags"
                            value={formData.hashtags}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., #learning #training"
                        />
                    </div>

                    {/* Media Files */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Media Files
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <input
                                type="file"
                                multiple
                                accept="image/*,video/*,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.zip"
                                onChange={handleMediaFilesChange}
                                className="hidden"
                                id="media-upload"
                            />
                            <label
                                htmlFor="media-upload"
                                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                            >
                                <Upload className="w-4 h-4" />
                                Choose Files
                            </label>
                            <p className="text-xs text-gray-500 mt-2">
                                Supported: Images, Videos, PDF, PPT, ZIP (WBT)
                            </p>
                        </div>

                        {/* Media Preview */}
                        {mediaFiles.length > 0 && (
                            <div className="mt-3 space-y-2">
                                {mediaFiles.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2 flex-1">
                                            {previewUrls[index] ? (
                                                <img src={previewUrls[index]} alt="Preview" className="w-10 h-10 object-cover rounded" />
                                            ) : (
                                                <FileText className="w-8 h-8 text-gray-400" />
                                            )}
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-700">{file.name}</p>
                                                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeMediaFile(index)}
                                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="ml-2">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    if (e.target.files[0]) {
                                                        const newThumbnails = [...thumbnailFiles];
                                                        newThumbnails[index] = e.target.files[0];
                                                        setThumbnailFiles(newThumbnails);
                                                    }
                                                }}
                                                className="hidden"
                                                id={`thumbnail-${index}`}
                                            />
                                            <label
                                                htmlFor={`thumbnail-${index}`}
                                                className="text-xs text-blue-600 cursor-pointer hover:underline"
                                            >
                                                {thumbnailFiles[index] ? 'Change Thumbnail' : 'Add Thumbnail'}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* YouTube Links */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            YouTube Links
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="url"
                                value={youtubeInput}
                                onChange={(e) => setYoutubeInput(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="https://www.youtube.com/watch?v=..."
                            />
                            <button
                                type="button"
                                onClick={addYoutubeLink}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        {/* YouTube Links List */}
                        {formData.youtube_links.length > 0 && (
                            <div className="mt-3 space-y-2">
                                {formData.youtube_links.map((link, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2 flex-1">
                                            <Video className="w-5 h-5 text-red-600" />
                                            <span className="text-sm text-gray-700 truncate">{link}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeYoutubeLink(index)}
                                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50"
                        >
                            {submitting ? 'Creating...' : 'Create Post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePostModal;