import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import api, { FILE_BASE_URL } from '../services/api';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        icon: null
    });
    const [previewUrl, setPreviewUrl] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await api.getCategories();
            if (response.success) {
                setCategories(response.data);
            } else {
                setError('Failed to fetch categories');
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError(err.message || 'Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (2MB max)
            if (file.size > 2 * 1024 * 1024) {
                setError('File size must be less than 2MB');
                return;
            }
            
            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                setError('Only image files (JPEG, PNG, GIF, WEBP) are allowed');
                return;
            }
            
            setFormData({
                ...formData,
                icon: file
            });
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const resetForm = () => {
        setFormData({ name: '', icon: null });
        setPreviewUrl(null);
        setEditingCategory(null);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name.trim()) {
            setError('Category name is required');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const submitData = new FormData();
            submitData.append('name', formData.name);
            if (formData.icon) {
                submitData.append('icon', formData.icon);
            }

            if (editingCategory) {
                // Update category
                const response = await api.updateCategory(editingCategory.id, submitData);
                if (response.success) {
                    alert('Category updated successfully');
                } else {
                    throw new Error(response.error || 'Failed to update category');
                }
            } else {
                // Create category
                const response = await api.createCategory(submitData);
                if (response.success) {
                    alert('Category created successfully');
                } else {
                    throw new Error(response.error || 'Failed to create category');
                }
            }
            
            setShowModal(false);
            resetForm();
            fetchCategories();
        } catch (err) {
            console.error('Error saving category:', err);
            setError(err.message || 'Failed to save category');
        } finally {
            setSubmitting(false);
        }
    };

const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
        name: category.name,
        icon: null
    });
    // Add /uploads/ to the path
    setPreviewUrl(category.icon_url ? `${FILE_BASE_URL}/uploads/${category.icon_url}` : null);
    setShowModal(true);
};

    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete category "${name}"?`)) {
            try {
                const response = await api.deleteCategory(id);
                if (response.success) {
                    alert('Category deleted successfully');
                    fetchCategories();
                } else {
                    alert(response.error || 'Failed to delete category');
                }
            } catch (err) {
                console.error('Error deleting category:', err);
                alert(err.message || 'Failed to delete category');
            }
        }
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
                    <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
                </div>
                
                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition"
                >
                    <Plus className="w-4 h-4" />
                    Add Category
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                </div>
            )}

            {/* Categories Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    S.No
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Icon
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
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
                            {categories.map((category, index) => (
                                <tr key={category.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {category.icon_url ? (
                                            <img 
                                                src={`${FILE_BASE_URL}/uploads/${category.icon_url}`}
                                                alt={category.name}
                                                className="w-10 h-10 object-cover rounded-lg"
                                            />
                                        ) : null}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {category.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {category.status}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEdit(category)}
                                                className="p-1 text-blue-600 hover:bg-blue-50 rounded-md transition"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category.id, category.name)}
                                                className="p-1 text-red-600 hover:bg-red-50 rounded-md transition"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* Empty State */}
                    {categories.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No categories found
                        </div>
                    )}
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {editingCategory ? 'Edit Category' : 'Add New Category'}
                            </h2>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter category name"
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category Icon
                                </label>
                                <div className="flex items-center gap-4">
                                    <label className="flex-1 cursor-pointer">
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition">
                                            <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-500">
                                                Click to upload image
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                JPEG, PNG, GIF, WEBP (Max 2MB)
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                    
                                    {previewUrl && (
                                        <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                                            <img 
                                                src={previewUrl} 
                                                alt="Preview" 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {error && (
                                <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                                    {error}
                                </div>
                            )}
                            
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        resetForm();
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50"
                                >
                                    {submitting ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            {editingCategory ? 'Updating...' : 'Creating...'}
                                        </div>
                                    ) : (
                                        editingCategory ? 'Update Category' : 'Create Category'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;