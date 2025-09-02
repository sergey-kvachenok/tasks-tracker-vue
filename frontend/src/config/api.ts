// API Configuration
export const API_CONFIG = {
  // Base URL for API endpoints
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  
  // API version (if needed in the future)
  VERSION: 'v1',
  
  // Full API base URL
  get API_BASE_URL() {
    return `${this.BASE_URL}/api`;
  },
  
  // Specific endpoints
  ENDPOINTS: {
    TASKS: '/tasks',
    USERS: '/users', // For future use
    AUTH: '/auth',   // For future use
  }
} as const;

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.API_BASE_URL}${endpoint}`;
};

// Pre-built URLs for common endpoints
export const API_URLS = {
  TASKS: {
    LIST: buildApiUrl(API_CONFIG.ENDPOINTS.TASKS),
    CREATE: buildApiUrl(API_CONFIG.ENDPOINTS.TASKS),
    GET: (id: number) => buildApiUrl(`${API_CONFIG.ENDPOINTS.TASKS}/${id}`),
    UPDATE: (id: number) => buildApiUrl(`${API_CONFIG.ENDPOINTS.TASKS}/${id}`),
    DELETE: (id: number) => buildApiUrl(`${API_CONFIG.ENDPOINTS.TASKS}/${id}`),
  }
} as const;
