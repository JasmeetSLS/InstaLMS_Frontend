// Constants
export const FILE_BASE_URL = 'http://localhost:5000';
export const API_BASE_URL = `${FILE_BASE_URL}/api`;

// Route configuration
const ROUTE_CONFIG = {
  admin: { base: '/admin', prefix: '/admin' }
};

// Common headers
const getDefaultHeaders = (isFormData = false) => {
  const headers = {};
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  
  const token = localStorage.getItem('adminToken');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Response handlers
const handleResponse = async (response, options = {}) => {
  const contentType = response.headers.get('content-type');
  
  if (options.responseType === 'blob') {
    if (!response.ok) {
      try {
        const errorText = await response.text();
        throw new Error(errorText || 'Download failed');
      } catch (textError) {
        throw new Error(`Download failed with status: ${response.status}`);
      }
    }
    const blob = await response.blob();
    return blob;
  }
  
  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    return data;
  } else {
    const text = await response.text();
    if (!response.ok) {
      throw new Error(text || 'Something went wrong');
    }
    return text;
  }
};

// URL builder
const buildUrl = (endpoint) => {
  for (const [key, config] of Object.entries(ROUTE_CONFIG)) {
    if (endpoint.startsWith(config.prefix)) {
      const baseUrl = `${API_BASE_URL}${config.base}`;
      const cleanEndpoint = endpoint.replace(config.prefix, '');
      return `${baseUrl}${cleanEndpoint}`;
    }
  }
  return `${API_BASE_URL}${endpoint}`;
};

// Core request method
const request = async (endpoint, method = 'GET', data = null, options = {}) => {
  const url = buildUrl(endpoint);
  const headers = getDefaultHeaders(options.isFormData);
  
  let body = data;
  if (data && !options.isFormData) {
    body = JSON.stringify(data);
  }

  const config = {
    method,
    headers,
    body,
    ...options
  };

  const response = await fetch(url, config);
  return handleResponse(response, options);
};

// API method factory
const createApiMethods = (basePath = '') => ({
  get: (endpoint, options = {}) => request(`${basePath}${endpoint}`, 'GET', null, options),
  post: (endpoint, data, options = {}) => request(`${basePath}${endpoint}`, 'POST', data, options),
  put: (endpoint, data, options = {}) => request(`${basePath}${endpoint}`, 'PUT', data, options),
  delete: (endpoint) => request(`${basePath}${endpoint}`, 'DELETE')
});

const admin = createApiMethods('/admin');

// Main API object
const api = {
  // Core request method (exposed for custom requests)
  request,

  // Admin APIs
  adminLogin: (username, password) => admin.post('/login', { username, password }),
  
  // User Management APIs (Admin only)
  getUsers: () => admin.get('/users'),
  getUserById: (id) => admin.get(`/users/${id}`),
  updateUserStatus: (id, status) => admin.put(`/users/${id}/status`, { status }),
  deleteUser: (id) => admin.delete(`/users/${id}`),
  importUsers: (formData) => admin.post('/users/bulk/import', formData, { isFormData: true }),
  exportUsers: () => admin.get('/users/bulk/export', { responseType: 'blob' }),
  
  // Category Management APIs (Admin only)
  getCategories: () => admin.get('/categories'),
  getCategoryById: (id) => admin.get(`/categories/${id}`),
  createCategory: (formData) => admin.post('/categories', formData, { isFormData: true }),
  updateCategory: (id, formData) => admin.put(`/categories/${id}`, formData, { isFormData: true }),
  updateCategoryStatus: (id, status) => admin.put(`/categories/${id}/status`, { status }),
  deleteCategory: (id) => admin.delete(`/categories/${id}`)
};

export default api;