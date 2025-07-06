import { api } from '@/lib/api';
import { API_CONFIG, ENDPOINTS } from '@/config/api';
import type { User, Building, Task, Bill, Contract, ApiResponse, LoginCredentials, RegisterData } from '@/types';

// User API
export const userApi = {
  getAll: () => api.get<ApiResponse<User>>(`${ENDPOINTS.USERS}/`),
  getById: (id: number) => api.get<User>(`${ENDPOINTS.USERS}/${id}/`),
  create: (data: Partial<User>) => api.post<User>(`${ENDPOINTS.USERS}/`, data),
  update: (id: number, data: Partial<User>) => api.put<User>(`${ENDPOINTS.USERS}/${id}/`, data),
  delete: (id: number) => api.delete(`${ENDPOINTS.USERS}/${id}/`),
};

// Building API
export const buildingApi = {
  getAll: () => api.get<ApiResponse<Building>>(`${ENDPOINTS.BUILDINGS}/`),
  getById: (id: number) => api.get<Building>(`${ENDPOINTS.BUILDINGS}/${id}/`),
  create: (data: Partial<Building>) => api.post<Building>(`${ENDPOINTS.BUILDINGS}/`, data),
  update: (id: number, data: Partial<Building>) => api.put<Building>(`${ENDPOINTS.BUILDINGS}/${id}/`, data),
  delete: (id: number) => api.delete(`${ENDPOINTS.BUILDINGS}/${id}/`),
};

// Task API
export const taskApi = {
  getAll: () => api.get<ApiResponse<Task>>(`${ENDPOINTS.TASKS}/`),
  getById: (id: number) => api.get<Task>(`${ENDPOINTS.TASKS}/${id}/`),
  create: (data: Partial<Task>) => api.post<Task>(`${ENDPOINTS.TASKS}/`, data),
  update: (id: number, data: Partial<Task>) => api.put<Task>(`${ENDPOINTS.TASKS}/${id}/`, data),
  delete: (id: number) => api.delete(`${ENDPOINTS.TASKS}/${id}/`),
};

// Bill API
export const billApi = {
  getAll: () => api.get<ApiResponse<Bill>>(`${ENDPOINTS.BILLS}/`),
  getById: (id: number) => api.get<Bill>(`${ENDPOINTS.BILLS}/${id}/`),
  create: (data: Partial<Bill>) => api.post<Bill>(`${ENDPOINTS.BILLS}/`, data),
  update: (id: number, data: Partial<Bill>) => api.put<Bill>(`${ENDPOINTS.BILLS}/${id}/`, data),
  delete: (id: number) => api.delete(`${ENDPOINTS.BILLS}/${id}/`),
};

// Contract API
export const contractApi = {
  getAll: () => api.get<ApiResponse<Contract>>(`${ENDPOINTS.CONTRACTS}/`),
  getById: (id: number) => api.get<Contract>(`${ENDPOINTS.CONTRACTS}/${id}/`),
  create: (data: Partial<Contract>) => api.post<Contract>(`${ENDPOINTS.CONTRACTS}/`, data),
  update: (id: number, data: Partial<Contract>) => api.put<Contract>(`${ENDPOINTS.CONTRACTS}/${id}/`, data),
  delete: (id: number) => api.delete(`${ENDPOINTS.CONTRACTS}/${id}/`),
};

// Auth API (if implemented in Django)
export const authApi = {
  login: (credentials: LoginCredentials) => {
    console.log('🌐 Making API call to:', API_CONFIG.BASE_URL + '/api/v0/auth/login/');
    console.log('📝 Sending credentials:', credentials);
    return api.post(API_CONFIG.BASE_URL + '/api/v0/auth/login/', credentials)
      .then(response => {
        console.log('📥 API Response:', response);
        return response;
      })
      .catch(error => {
        console.error('❌ API Error:', error);
        throw error;
      });
  },
  register: (data: RegisterData) => api.post(API_CONFIG.BASE_URL + '/api/v0/auth/register/', data),
  logout: () => api.post(API_CONFIG.BASE_URL + '/api/v0/auth/logout/'),
  refreshToken: () => api.post(API_CONFIG.BASE_URL + '/api/v0/auth/refresh/'),
  getProfile: () => api.get(API_CONFIG.BASE_URL + '/api/v0/auth/profile/'),
}; 

console.log(API_CONFIG.BASE_URL);