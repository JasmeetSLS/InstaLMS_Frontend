import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Image as ImageIcon, X } from 'lucide-react';
import Editor from 'react-simple-wysiwyg';
import api, { FILE_BASE_URL } from '../services/api';
import { FaToggleOn } from 'react-icons/fa';

const CMS = () => {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPage, setEditingPage] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedPage, setSelectedPage] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: ''
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchCMSPages();
    }, []);

    const fetchCMSPages = async () => {
        try {
            setLoading(true);
            const response = await api.getCMSPages();
            if (response.success) {
                setPages(response.data);
            }
        } catch (err) {
            console.error('Error fetching CMS pages:', err);
            alert('Failed to fetch CMS pages: ' + (err.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (name === 'title') {
            const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
    };

    const handleContentChange = (e) => {
        setFormData(prev => ({ ...prev, content: e.target.value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.title || !formData.slug) {
            alert('Please fill in all required fields');
            return;
        }

        setSubmitting(true);
        
        const submitFormData = new FormData();
        submitFormData.append('title', formData.title);
        submitFormData.append('slug', formData.slug);
        submitFormData.append('content', formData.content || '');
        if (selectedImage) {
            submitFormData.append('image', selectedImage);
        }

        try {
            const response = await api.createCMSPage(submitFormData);
            if (response.success) {
                alert('CMS page created successfully!');
                resetForm();
                fetchCMSPages();
            }
        } catch (err) {
            console.error('Error creating CMS page:', err);
            alert('Failed to create CMS page: ' + (err.message || 'Unknown error'));
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({ title: '', slug: '', content: '' });
        setSelectedImage(null);
        setImagePreview(null);
        setEditingPage(null);
        setShowModal(false);
    };

    const handleView = (page) => {
        setSelectedPage(page);
        setShowViewModal(true);
    };

    const handleEdit = (page) => {
        alert('Edit functionality will be added soon');
    };

    const handleDelete = (page) => {
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
                    <h1 className="text-2xl font-bold text-gray-800">CMS Pages</h1>
                </div>
                
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition"
                >
                    <Plus className="w-4 h-4" />
                    Add CMS Page
                </button>
            </div>

            {/* Pages Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pages && pages.length > 0 ? (
                                pages.map((page, index) => (
                                    <tr key={page.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{page.title}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">{page.slug}</code>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {page.image_url && (
                                                <img 
                                                    src={`${FILE_BASE_URL}${page.image_url}`}
                                                    alt={page.title}
                                                    className="w-10 h-10 object-cover rounded-lg border border-gray-200"
                                                />
                                            )}
                                        </td>
                                        <td className="px-4 py-2 text-3xl text-green-600 whitespace-nowrap">
                                            <FaToggleOn />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleView(page)} className="p-1 text-blue-600 hover:bg-blue-50 rounded-md transition" title="View">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleEdit(page)} className="p-1 text-indigo-600 hover:bg-indigo-50 rounded-md transition" title="Edit">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(page)} className="p-1 text-red-600 hover:bg-red-50 rounded-md transition" title="Delete">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No CMS pages found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create/Edit Modal with Rich Text Editor */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {editingPage ? 'Edit CMS Page' : 'Create New CMS Page'}
                            </h2>
                            <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter page title"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Slug <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                                    placeholder="auto-generated-from-title"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">URL-friendly version of the title</p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Featured Image
                                </label>
                                <div className="mt-1 flex items-center gap-4">
                                    {imagePreview ? (
                                        <div className="relative">
                                            <img 
                                                src={imagePreview} 
                                                alt="Preview" 
                                                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedImage(null);
                                                    setImagePreview(null);
                                                }}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="cursor-pointer">
                                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex flex-col items-center justify-center border border-dashed border-gray-300 hover:border-blue-500 transition">
                                                <ImageIcon className="w-6 h-6 text-gray-400" />
                                                <span className="text-xs text-gray-500 mt-1">Upload</span>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Content
                                </label>
                                <Editor 
                                    value={formData.content} 
                                    onChange={handleContentChange}
                                    style={{
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '0.5rem',
                                        minHeight: '300px'
                                    }}
                                />
                            </div>
                            
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                                >
                                    {submitting ? 'Creating...' : (editingPage ? 'Update' : 'Create')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {showViewModal && selectedPage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">{selectedPage.title}</h2>
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>
                        
                        <div className="p-6">
                            {selectedPage.image_url && (
                                <div className="mb-6">
                                    <img 
                                        src={`${FILE_BASE_URL}${selectedPage.image_url}`}
                                        alt={selectedPage.title}
                                        className="w-full max-h-64 object-cover rounded-lg"
                                    />
                                </div>
                            )}
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                                <code className="text-sm bg-gray-100 px-2 py-1 rounded">{selectedPage.slug}</code>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                                <div 
                                    className="prose max-w-none bg-gray-50 p-4 rounded-lg"
                                    dangerouslySetInnerHTML={{ __html: selectedPage.content }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CMS;