// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Category APIs
export const categoryAPI = {
    // Get all categories
    getAll: () => api.get('/categories'),
    
    // Get single category
    getById: (id) => api.get(`/categories/${id}`),
    
    // Create new category with icon
    create: (formData) => api.post('/categories', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    
    // Update category with icon
    update: (id, formData) => api.put(`/categories/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    
    // Delete category
    delete: (id) => api.delete(`/categories/${id}`),
};

// Post APIs
export const postAPI = {
    // Get all posts
    getAll: () => api.get('/posts'),
    
    // Get posts by category
    getByCategory: (categoryId) => api.get(`/posts/category/${categoryId}`),
    
    // Get single post
    getById: (id) => api.get(`/posts/${id}`),
    
    // Create post with media
    create: (formData) => api.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    
    // Update post
    update: (id, formData) => api.put(`/posts/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    
    // Delete post
    delete: (id) => api.delete(`/posts/${id}`),
    
    // Delete specific media
    deleteMedia: (postId, mediaId) => api.delete(`/posts/${postId}/media/${mediaId}`),
};

export default api;