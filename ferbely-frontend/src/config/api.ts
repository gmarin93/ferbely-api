// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v0',
  TIMEOUT: 10000, // 10 seconds
} as const;

// Environment variables
export const ENV = {
  NODE_ENV: process.env.NODE_ENV,
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
} as const;

// API Endpoints  
export const ENDPOINTS = {
  USERS: '/users',
  BUILDINGS: '/buildings',
  CONTRACTS: '/contracts',
  TASKS: '/tasks',
  BILLS: '/bills',
} as const;

// Export for backward compatibility
export const API_BASE_URL = API_CONFIG.BASE_URL; 