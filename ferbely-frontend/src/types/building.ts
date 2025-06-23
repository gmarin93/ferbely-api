export interface Building {
  id: number;
  name: string;
  role: 'house' | 'apartment' | 'office' | 'shop' | 'other';
  address: string;
  owner: number;
  created_at: string;
  updated_at: string;
} 