// src/pages/CategoryPage.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X, AlertCircle, Save, Folder } from 'lucide-react';
import { categoryAPI } from '../services/api';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');

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

        try {
            await categoryAPI.create(categoryName);
            await fetchCategories();
            setCategoryName('');
            setShowModal(false);
            setError('');
        } catch (error) {
            console.error('Error creating category:', error);
            setError(error.response?.data?.error || 'Error creating category');
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

        try {
            await categoryAPI.update(id, editName);
            await fetchCategories();
            setEditingId(null);
            setEditName('');
        } catch (error) {
            console.error('Error updating category:', error);
            alert(error.response?.data?.error || 'Error updating category');
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditName('');
    };

    const getCategoryColor = (index) => {
        const colors = [
            'bg-orange-100 text-orange-700',
            'bg-green-100 text-green-700',
            'bg-purple-100 text-purple-700',
            'bg-orange-100 text-orange-700',
            'bg-pink-100 text-pink-700',
            'bg-indigo-100 text-indigo-700',
        ];
        return colors[index % colors.length];
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
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm text-gray-500">{index + 1}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {editingId === category.id ? (
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            value={editName}
                                                            onChange={(e) => setEditName(e.target.value)}
                                                            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                            autoFocus
                                                        />
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <div className="font-medium text-gray-900">{category.name}</div>
                                                
                                                    </div>
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