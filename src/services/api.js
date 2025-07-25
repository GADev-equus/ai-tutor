/**
 * API service for making requests to the backend
 */
import axios from 'axios';

// Create an axios instance with default configuration
export const api = axios.create({
  baseURL: (import.meta.env.VITE_BIOTUTOR_API_URL || 'http://localhost:8000') + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT authentication interceptor
api.interceptors.request.use(
  (config) => {
    // Get JWT token from localStorage (set by URL parameter from main site)
    const token = localStorage.getItem('auth_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 AI-TUTOR API - Using JWT token from localStorage');
    } else {
      console.log('❌ AI-TUTOR API - No token found in localStorage');
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for authentication error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('🔒 AI-TUTOR API - Authentication failed, clearing token');
      localStorage.removeItem('auth_token');
      // Redirect to main site for re-authentication
      window.location.href = import.meta.env.VITE_MAIN_DOMAIN || 'https://equussystems.co';
    }
    return Promise.reject(error);
  }
);

/**
 * Send a chat message to the biology tutor API
 *
 * @param {string} message - The user's message
 * @param {string} threadId - Optional thread ID for conversation continuity
 * @returns {Promise<Object>} - The response from the API
 */
export const sendChatMessage = async (message, threadId = null) => {
  try {
    const payload = {
      message,
      ...(threadId && { thread_id: threadId }),
    };

    console.log('Sending chat message to API:', {
      payload,
      url: api.defaults.baseURL,
    });
    // Note that the backend route is defined as /api/chat, but our axios instance
    // already has the /api prefix in its baseURL, so we just use /chat
    const response = await api.post('/chat', payload);
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    console.error('Error details:', {
      status: error.response?.status,
      data: error.response?.data,
      baseURL: api.defaults.baseURL,
      message: error.message,
    });
    throw error;
  }
};

/**
 * Retrieve relevant documents based on a query
 *
 * @param {string} query - The search query
 * @returns {Promise<Object>} - Document search results
 */
export const retrieveDocuments = async (query) => {
  try {
    const response = await api.post('/retrieve', { query });
    return response.data;
  } catch (error) {
    console.error('Error retrieving documents:', error);
    throw error;
  }
};

/**
 * Check the health status of the API
 *
 * @returns {Promise<Object>} - The health status response
 */
export const checkApiHealth = async () => {
  try {
    // Use the correct health check endpoint
    console.log('Checking API health at:', `${api.defaults.baseURL}/healthz`);
    const response = await api.get('/healthz');
    console.log('Health check response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API health check failed:', error);
    console.error('Error details:', {
      status: error.response?.status,
      data: error.response?.data,
      baseURL: api.defaults.baseURL,
      url: error.config?.url,
    });
    throw error;
  }
};

/**
 * Get conversation history for a specific thread
 *
 * @param {string} threadId - Thread ID to retrieve history for
 * @returns {Promise<Object>} - Conversation history
 */
export const getConversationHistory = async (threadId) => {
  try {
    const response = await api.get(`/history/${threadId}`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving conversation history:', error);
    throw error;
  }
};

/**
 * Add API interceptor to handle authentication or other request/response modifications
 *
 * @param {Function} onRequest - Function to run before each request
 * @param {Function} onResponse - Function to run after each response
 * @param {Function} onError - Function to run on error
 */
export const addApiInterceptors = (onRequest, onResponse, onError) => {
  api.interceptors.request.use(onRequest);
  api.interceptors.response.use(onResponse, onError);
};

export default api;
