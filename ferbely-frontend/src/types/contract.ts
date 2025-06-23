export interface Contract {
  id: number;
  name: string;
  type: 'monthly' | 'yearly';
  start_date: string;
  end_date: string;
  price: string;
  status: 'active' | 'inactive';
  user: number;
  tasks: number[];
  building: number;
  bill?: number;
  created_at: string;
  updated_at: string;
} 