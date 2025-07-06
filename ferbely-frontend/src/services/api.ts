import { api } from '@/lib/api';
import { API_CONFIG, ENDPOINTS } from '@/config/api';
import type { User, Building, Task, Bill, Contract, ApiResponse, LoginCredentials, RegisterData } from '@/types';

// User API
export const userApi = {
  getAll: () => api.get<ApiResponse<User>>(`${API_CONFIG.BASE_URL}${ENDPOINTS.USERS}/`),
  getById: (id: number) => api.get<User>(`${API_CONFIG.BASE_URL}${ENDPOINTS.USERS}/${id}/`),
  create: (data: Partial<User>) => api.post<User>(`${API_CONFIG.BASE_URL}${ENDPOINTS.USERS}/`, data),
  update: (id: number, data: Partial<User>) => api.put<User>(`${API_CONFIG.BASE_URL}${ENDPOINTS.USERS}/${id}/`, data),
  delete: (id: number) => api.delete(`${API_CONFIG.BASE_URL}${ENDPOINTS.USERS}/${id}/`),
};

// Building API
export const buildingApi = {
  getAll: () => api.get<ApiResponse<Building>>(`${API_CONFIG.BASE_URL}${ENDPOINTS.BUILDINGS}/`),
  getById: (id: number) => api.get<Building>(`${API_CONFIG.BASE_URL}${ENDPOINTS.BUILDINGS}/${id}/`),
  create: (data: Partial<Building>) => api.post<Building>(`${API_CONFIG.BASE_URL}${ENDPOINTS.BUILDINGS}/`, data),
  update: (id: number, data: Partial<Building>) => api.put<Building>(`${API_CONFIG.BASE_URL}${ENDPOINTS.BUILDINGS}/${id}/`, data),
  delete: (id: number) => api.delete(`${API_CONFIG.BASE_URL}${ENDPOINTS.BUILDINGS}/${id}/`),
};

// Task API
export const taskApi = {
  getAll: () => api.get<ApiResponse<Task>>(`${API_CONFIG.BASE_URL}${ENDPOINTS.TASKS}/`),
  getById: (id: number) => api.get<Task>(`${API_CONFIG.BASE_URL}${ENDPOINTS.TASKS}/${id}/`),
  create: (data: Partial<Task>) => api.post<Task>(`${API_CONFIG.BASE_URL}${ENDPOINTS.TASKS}/`, data),
  update: (id: number, data: Partial<Task>) => api.put<Task>(`${API_CONFIG.BASE_URL}${ENDPOINTS.TASKS}/${id}/`, data),
  delete: (id: number) => api.delete(`${API_CONFIG.BASE_URL}${ENDPOINTS.TASKS}/${id}/`),
};

// Bill API
export const billApi = {
  getAll: () => api.get<ApiResponse<Bill>>(`${API_CONFIG.BASE_URL}${ENDPOINTS.BILLS}/`),
  getById: (id: number) => api.get<Bill>(`${API_CONFIG.BASE_URL}${ENDPOINTS.BILLS}/${id}/`),
  create: (data: Partial<Bill>) => api.post<Bill>(`${API_CONFIG.BASE_URL}${ENDPOINTS.BILLS}/`, data),
  update: (id: number, data: Partial<Bill>) => api.put<Bill>(`${API_CONFIG.BASE_URL}${ENDPOINTS.BILLS}/${id}/`, data),
  delete: (id: number) => api.delete(`${API_CONFIG.BASE_URL}${ENDPOINTS.BILLS}/${id}/`),
};

// Contract API
export const contractApi = {
  getAll: () => api.get<ApiResponse<Contract>>(`${API_CONFIG.BASE_URL}${ENDPOINTS.CONTRACTS}/`),
  getById: (id: number) => api.get<Contract>(`${API_CONFIG.BASE_URL}${ENDPOINTS.CONTRACTS}/${id}/`),
  create: (data: Partial<Contract>) => api.post<Contract>(`${API_CONFIG.BASE_URL}${ENDPOINTS.CONTRACTS}/`, data),
  update: (id: number, data: Partial<Contract>) => api.put<Contract>(`${API_CONFIG.BASE_URL}${ENDPOINTS.CONTRACTS}/${id}/`, data),
  delete: (id: number) => api.delete(`${API_CONFIG.BASE_URL}${ENDPOINTS.CONTRACTS}/${id}/`),
};

// Auth API (if implemented in Django)
export const authApi = {
  login: (credentials: LoginCredentials) => {
    console.log('🌐 Making API call to:', API_CONFIG.BASE_URL + '/auth/login/');
    console.log('📝 Sending credentials:', credentials);
    return api.post(API_CONFIG.BASE_URL + '/auth/login/', credentials)
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