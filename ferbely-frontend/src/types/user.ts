export interface User {
  id: number;
  email: string;
  role: 'admin' | 'owner' | 'customer';
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  role?: 'customer' | 'owner';
} 