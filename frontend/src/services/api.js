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
const withoutAdmin = createApiMethods();

// Helper to build query string
const buildQuery = (params) => {
  const query = new URLSearchParams(params).toString();
  return query ? `?${query}` : '';
};

// Main API object
const api = {
  // Core request method (exposed for custom requests)
  request,

  // Admin APIs
  adminLogin: (username, password) => admin.post('/public/login', { username, password }),
  
  // Category APIs
  getCategories: () => admin.get('/categories'),
  createCategory: (formData) => admin.post('/add-category', formData, { isFormData: true }),
  updateCategory: (id, formData) => admin.put(`/categories/${id}`, formData, { isFormData: true }),
  deleteCategory: (id) => admin.delete(`/categories/${id}`),

  // Post APIs
  getPosts: () => admin.get('/posts'),
  createPost: (formData) => admin.post('/add-post', formData, { isFormData: true }),
  
  // Quiz APIs
  bulkUploadQuiz: (formData) => admin.post('/quiz/bulk-upload', formData, { isFormData: true }),
  getQuizQuestions: (postId) => admin.get(`/quiz/questions/${postId}`),
  getAllPostTitles: () => admin.get('/posts/titles'),

  // CMS APIs
  getCMSPages: () => admin.get('/cms/pages'),
  createCMSPage: (formData) => admin.post('/cms/page', formData, { isFormData: true }),

  // Role APIs
  getRoles: () => admin.get('/roles'),

  // Dashboard APIs (NEW)
  getDashboardDropdowns: (params = {}) => admin.get(`/dashboard/dropdowns${buildQuery(params)}`),
  getDashboardStats: (params = {}) => admin.get(`/dashboard/stats${buildQuery(params)}`),
  getDashboardLeaderboard: (params = {}) => admin.get(`/dashboard/leaderboard${buildQuery(params)}`),
  getDashboardLearningProgress: (params = {}) => admin.get(`/dashboard/learning-progress${buildQuery(params)}`),
  getUserContentPreferences: (params = {}) => admin.get(`/dashboard/user-content-preferences${buildQuery(params)}`),
  getHourlyUsage: (params = {}) => admin.get(`/dashboard/hourly-usage${buildQuery(params)}`),
  getStateWiseUsage: (params = {}) => admin.get(`/dashboard/state-wise-usage${buildQuery(params)}`),


   // CMS Category APIs (NEW)
  getCmsCategories: (params = {}) => withoutAdmin.get(`/cms-categories${buildQuery(params)}`),
  createCmsCategory: (formData) => withoutAdmin.post('/add-cms-category', formData, { isFormData: true }),

  //CMS Stream API
//CMS Stream API
// In api.js, inside the main api object:
getStreamsByCategory: (categoryId, params = {}) => 
    withoutAdmin.get(`/streams/${categoryId}${buildQuery(params)}`),
createStream: (formData) => withoutAdmin.post('/add-stream', formData, { isFormData: true }),
getStreamById: (streamId) => withoutAdmin.get(`/stream/${streamId}`),
updateStream: (streamId, formData) => withoutAdmin.put(`/stream/${streamId}`, formData, { isFormData: true }),
    

    //CMS Section APIs
   // CMS Section APIs
getSectionsByStream: (streamId) => withoutAdmin.get(`/sections/${streamId}`),
createSection: (data) => withoutAdmin.post('/add-section', data),
getSectionById: (sectionId) => withoutAdmin.get(`/section/${sectionId}`),
updateSection: (sectionId, data) => withoutAdmin.put(`/section/${sectionId}`, data),
deleteSection: (sectionId) => withoutAdmin.delete(`/section/${sectionId}`),

    //CMS Content APIs
       getContentsBySection: (sectionId) => withoutAdmin.get(`/contents/${sectionId}`),
        getContentById: (contentId) => withoutAdmin.get(`/content/${contentId}`),
        createContent: (formData) => withoutAdmin.post('/add-content', formData, { isFormData: true }),
        updateContent: (contentId, formData) => withoutAdmin.put(`/content/${contentId}`, formData, { isFormData: true }),
deleteContent: (contentId) => withoutAdmin.delete(`/content/${contentId}`),

//CMS Question APIs
//CMS Question APIs
// CMS Question APIs
getQuestionsBySection: (sectionId) => withoutAdmin.get(`/questions/${sectionId}`),
getQuestionById: (questionId) => withoutAdmin.get(`/question/${questionId}`),
createQuestion: (data) => withoutAdmin.post('/add-question', data),
updateQuestion: (questionId, data) => withoutAdmin.put(`/question/${questionId}`, data),
deleteQuestion: (questionId) => withoutAdmin.delete(`/question/${questionId}`),

// Video Analysis APIs
getVideoAnalysisUsers: () => withoutAdmin.get('/video-analysis/users-only'),
getVideoAnalysisReport: (userId) => withoutAdmin.get(`/video-analysis/report/${userId}`)
};

export default api;