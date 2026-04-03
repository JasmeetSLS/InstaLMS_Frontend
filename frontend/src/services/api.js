// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    // Login user
    login: (credentials) => api.post('/login', credentials),
    
    // Get current user info
    getCurrentUser: () => api.get('/me'),
    
    // Get user profile with image
    getProfile: () => api.get('/me'),
    
    // Logout (clear local storage)
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isUserLoggedIn');
    }
};

// User APIs
export const userAPI = {
    // Get all users
    getAll: () => api.get('/users'),
    
    // Get single user
    getById: (id) => api.get(`/users/${id}`),
    
    // Create new user with profile image
    create: (formData) => api.post('/users', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    
    // Update user with profile image
    update: (id, formData) => api.put(`/users/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    
    // Delete user
    delete: (id) => api.delete(`/users/${id}`),
};

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

// Share Post APIs
export const shareAPI = {
    // Share post to multiple users
    sharePost: (postId, sharedToUsers) => api.post('/posts/share', {
        post_id: postId,
        shared_to_users: sharedToUsers
    }),
    
    // Get all shares received by current user
    getReceivedShares: () => api.get('/posts/shares/received'),
    
    // Get all shares sent by current user
    getSentShares: () => api.get('/posts/shares/sent'),
    
    // Get shares for a specific post
    getPostShares: (postId) => api.get(`/posts/${postId}/shares`),
    
    // Delete/remove a share
    deleteShare: (shareId) => api.delete(`/posts/shares/${shareId}`),
};

export default api;