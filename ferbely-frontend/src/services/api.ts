import { api } from '@/lib/api';
import type { User, Building, Task, Bill, Contract, ApiResponse, LoginCredentials, RegisterData } from '@/types';

// User API
export const userApi = {
  getAll: () => api.get<ApiResponse<User>>('/users/'),
  getById: (id: number) => api.get<User>(`/users/${id}/`),
  create: (data: Partial<User>) => api.post<User>('/users/', data),
  update: (id: number, data: Partial<User>) => api.put<User>(`/users/${id}/`, data),
  delete: (id: number) => api.delete(`/users/${id}/`),
};

// Building API
export const buildingApi = {
  getAll: () => api.get<ApiResponse<Building>>('/buildings/'),
  getById: (id: number) => api.get<Building>(`/buildings/${id}/`),
  create: (data: Partial<Building>) => api.post<Building>('/buildings/', data),
  update: (id: number, data: Partial<Building>) => api.put<Building>(`/buildings/${id}/`, data),
  delete: (id: number) => api.delete(`/buildings/${id}/`),
};

// Task API
export const taskApi = {
  getAll: () => api.get<ApiResponse<Task>>('/tasks/'),
  getById: (id: number) => api.get<Task>(`/tasks/${id}/`),
  create: (data: Partial<Task>) => api.post<Task>('/tasks/', data),
  update: (id: number, data: Partial<Task>) => api.put<Task>(`/tasks/${id}/`, data),
  delete: (id: number) => api.delete(`/tasks/${id}/`),
};

// Bill API
export const billApi = {
  getAll: () => api.get<ApiResponse<Bill>>('/bills/'),
  getById: (id: number) => api.get<Bill>(`/bills/${id}/`),
  create: (data: Partial<Bill>) => api.post<Bill>('/bills/', data),
  update: (id: number, data: Partial<Bill>) => api.put<Bill>(`/bills/${id}/`, data),
  delete: (id: number) => api.delete(`/bills/${id}/`),
};

// Contract API
export const contractApi = {
  getAll: () => api.get<ApiResponse<Contract>>('/contracts/'),
  getById: (id: number) => api.get<Contract>(`/contracts/${id}/`),
  create: (data: Partial<Contract>) => api.post<Contract>('/contracts/', data),
  update: (id: number, data: Partial<Contract>) => api.put<Contract>(`/contracts/${id}/`, data),
  delete: (id: number) => api.delete(`/contracts/${id}/`),
};

// Auth API (if implemented in Django)
export const authApi = {
  login: (credentials: LoginCredentials) => api.post('/auth/login/', credentials),
  register: (data: RegisterData) => api.post('/auth/register/', data),
  logout: () => api.post('/auth/logout/'),
  refreshToken: () => api.post('/auth/refresh/'),
  getProfile: () => api.get('/auth/profile/'),
}; 