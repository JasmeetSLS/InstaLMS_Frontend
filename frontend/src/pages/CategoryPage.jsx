// src/pages/CategoryPage.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X, AlertCircle, Save, Folder, Upload, Image as ImageIcon } from 'lucide-react';
import { categoryAPI } from '../services/api';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categoryIcon, setCategoryIcon] = useState(null);
    const [iconPreview, setIconPreview] = useState('');
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editIcon, setEditIcon] = useState(null);
    const [editIconPreview, setEditIconPreview] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await categoryAPI.getAll();
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        if (!categoryName.trim()) {
            setError('Please enter category name');
            return;
        }
        
        if (categoryName.length < 2) {
            setError('Category name must be at least 2 characters');
            return;
        }

        const formData = new FormData();
        formData.append('name', categoryName);
        if (categoryIcon) {
            formData.append('icon', categoryIcon);
        }

        try {
            await categoryAPI.create(formData);
            await fetchCategories();
            setCategoryName('');
            setCategoryIcon(null);
            setIconPreview('');
            setShowModal(false);
            setError('');
        } catch (error) {
            console.error('Error creating category:', error);
            setError(error.response?.data?.error || 'Error creating category');
        }
    };

    const handleUpdateCategory = async (id) => {
        if (!editName.trim()) {
            alert('Category name cannot be empty');
            return;
        }
        
        if (editName.length < 2) {
            alert('Category name must be at least 2 characters');
            return;
        }

        const formData = new FormData();
        formData.append('name', editName);
        if (editIcon) {
            formData.append('icon', editIcon);
        }

        try {
            await categoryAPI.update(id, formData);
            await fetchCategories();
            setEditingId(null);
            setEditName('');
            setEditIcon(null);
            setEditIconPreview('');
        } catch (error) {
            console.error('Error updating category:', error);
            alert(error.response?.data?.error || 'Error updating category');
        }
    };

    const handleDeleteCategory = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete category "${name}"?`)) {
            try {
                await categoryAPI.delete(id);
                await fetchCategories();
            } catch (error) {
                console.error('Error deleting category:', error);
                alert('Error deleting category');
            }
        }
    };

    const handleEditCategory = (category) => {
        setEditingId(category.id);
        setEditName(category.name);
        setEditIconPreview(category.icon_url ? `http://localhost:5000${category.icon_url}` : '');
        setEditIcon(null);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditName('');
        setEditIcon(null);
        setEditIconPreview('');
    };

    const handleIconChange = (e, isEdit = false) => {
        const file = e.target.files[0];
        if (file) {
            if (isEdit) {
                setEditIcon(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setEditIconPreview(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setCategoryIcon(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setIconPreview(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    return (
        <div className="p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
                    </div>
                    <button
                        onClick={() => {
                            setCategoryName('');
                            setCategoryIcon(null);
                            setIconPreview('');
                            setError('');
                            setShowModal(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition"
                    >
                        <Plus className="w-4 h-4" />
                        Create Category
                    </button>
                </div>

                {/* Categories Table */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                    </div>
                ) : categories.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                        <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800">No Categories Yet</h3>
                        <p className="text-gray-500 mt-2">Create your first category to get started</p>
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
                                            Icon
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Category Name
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
                                    {categories.map((category, index) => (
                                        <tr key={category.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-500">{index + 1}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editingId === category.id ? (
                                                    <div className="flex items-center gap-2">
                                                        {editIconPreview ? (
                                                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                                                                <img src={editIconPreview} alt="Preview" className="w-full h-full object-cover" />
                                                            </div>
                                                        ) : (
                                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                                <ImageIcon className="w-5 h-5 text-gray-400" />
                                                            </div>
                                                        )}
                                                        <label className="cursor-pointer">
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleIconChange(e, true)}
                                                                className="hidden"
                                                            />
                                                            <div className="text-xs text-blue-600 hover:text-blue-700 cursor-pointer">
                                                                Change
                                                            </div>
                                                        </label>
                                                    </div>
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                                                        {category.icon_url ? (
                                                            <img 
                                                                src={`http://localhost:5000${category.icon_url}`}
                                                                alt={category.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <span className="text-orange-600 font-bold text-lg">
                                                                {category.name.charAt(0).toUpperCase()}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {editingId === category.id ? (
                                                    <input
                                                        type="text"
                                                        value={editName}
                                                        onChange={(e) => setEditName(e.target.value)}
                                                        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                        autoFocus
                                                    />
                                                ) : (
                                                    <div className="font-medium text-gray-900">{category.name}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600">
                                                    {new Date(category.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                {editingId === category.id ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleUpdateCategory(category.id)}
                                                            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                                            title="Save"
                                                        >
                                                            <Save className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={handleCancelEdit}
                                                            className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                                                            title="Cancel"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleEditCategory(category)}
                                                            className="p-2 text-blue-600 hover:bg-orange-50 rounded-lg transition"
                                                            title="Edit Category"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteCategory(category.id, category.name)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                            title="Delete Category"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Create Category Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full">
                        <div className="flex items-center justify-between p-5 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-800">Create New Category</h3>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setError('');
                                    setCategoryName('');
                                    setCategoryIcon(null);
                                    setIconPreview('');
                                }}
                                className="p-1 hover:bg-gray-100 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleCreateCategory} className="p-5">
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-red-500" />
                                    <span className="text-sm text-red-600">{error}</span>
                                </div>
                            )}
                            
                            {/* Icon Upload */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category Icon (Optional)
                                </label>
                                <div className="flex items-center gap-4">
                                    {iconPreview ? (
                                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                                            <img src={iconPreview} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                                            <ImageIcon className="w-8 h-8 text-gray-400" />
                                        </div>
                                    )}
                                    <label className="cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleIconChange(e, false)}
                                            className="hidden"
                                        />
                                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer">
                                            <Upload className="w-4 h-4" />
                                            <span className="text-sm">Upload Icon</span>
                                        </div>
                                    </label>
                                    {iconPreview && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCategoryIcon(null);
                                                setIconPreview('');
                                            }}
                                            className="text-red-500 text-sm hover:text-red-600"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Recommended: Square image, max 5MB</p>
                            </div>
                            
                            <input
                                type="text"
                                value={categoryName}
                                onChange={(e) => {
                                    setCategoryName(e.target.value);
                                    setError('');
                                }}
                                placeholder="Enter category name (e.g., BAT, Product)"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                autoFocus
                            />
                            <div className="flex gap-3 mt-5">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setError('');
                                        setCategoryName('');
                                        setCategoryIcon(null);
                                        setIconPreview('');
                                    }}
                                    className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600"
                                >
                                    Create Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;