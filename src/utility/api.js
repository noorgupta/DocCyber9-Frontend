/**
 * ═══════════════════════════════════════════════════════════════════
 * EMINENT - API UTILITY
 * Centralized API calls with JWT authentication
 * ═══════════════════════════════════════════════════════════════════
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Retrieve JWT token from localStorage
 * Checks multiple possible key names for compatibility
 */
const getToken = () => {
  return localStorage.getItem('eminent_token') || 
         localStorage.getItem('token') || 
         localStorage.getItem('jwtToken') || 
         null;
};

/**
 * Universal API call function with automatic JWT authentication
 * @param {string} url - API endpoint URL (e.g., '/auth/login' or full URL)
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {object|null} data - Request body data (optional)
 * @param {boolean} requiresAuth - Whether this endpoint requires authentication
 * @returns {Promise<object>} - Response data
 */
export const apiCall = async (url, method = 'GET', data = null, requiresAuth = true) => {
  try {
    // Construct full URL if relative path is provided
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

    // Base headers
    const headers = {};

    // Add Authorization header if token exists and auth is required
    if (requiresAuth) {
      const token = getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else {
        throw new Error('No authentication token found. Please login first.');
      }
    }

    // Prepare fetch options
    const options = {
      method: method.toUpperCase(),
      headers,
    };

    // Add body for POST, PUT, PATCH requests
    if (data && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
      // If data is FormData (file upload), let the browser set Content-Type (do not JSON.stringify)
      if (typeof FormData !== 'undefined' && data instanceof FormData) {
        options.body = data;
      } else {
        headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
      }
    }

    // Make the API call
    const response = await fetch(fullUrl, options);

    // Parse response
    const responseData = await response.json();

    // Handle non-OK responses
    if (!response.ok) {
      throw new Error(
        responseData.message || 
        responseData.error || 
        `API call failed with status ${response.status}`
      );
    }

    return responseData;

  } catch (error) {
    // Network error or fetch failure
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Failed to connect to server. Please check if the backend is running.');
    }
    
    // Re-throw other errors
    throw error;
  }
};

/**
 * Convenience methods for common HTTP verbs
 */
export const api = {
  get: (url, requiresAuth = true) => apiCall(url, 'GET', null, requiresAuth),
  post: (url, data, requiresAuth = true) => apiCall(url, 'POST', data, requiresAuth),
  put: (url, data, requiresAuth = true) => apiCall(url, 'PUT', data, requiresAuth),
  delete: (url, requiresAuth = true) => apiCall(url, 'DELETE', null, requiresAuth),
};

/**
 * Authentication helper functions
 */
export const auth = {
  login: async (email, password) => {
    const response = await apiCall('/auth/login', 'POST', { email, password }, false);
    if (response.success && response.token) {
      localStorage.setItem('eminent_token', response.token);
      localStorage.setItem('eminent_user', JSON.stringify(response.user));
    }
    return response;
  },

  signup: async (email, password, name) => {
    const response = await apiCall('/auth/signup', 'POST', { email, password, name }, false);
    if (response.success && response.token) {
      localStorage.setItem('eminent_token', response.token);
      localStorage.setItem('eminent_user', JSON.stringify(response.user));
    }
    return response;
  },

  logout: () => {
    localStorage.removeItem('eminent_token');
    localStorage.removeItem('token');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('eminent_user');
  },

  isAuthenticated: () => {
    return !!getToken();
  },

  getUser: () => {
    const userStr = localStorage.getItem('eminent_user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

export default apiCall;
