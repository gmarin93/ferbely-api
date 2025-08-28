export interface Building {
  id: number;
  name: string;
  role: 'house' | 'apartment' | 'office' | 'shop' | 'other';
  address: string;
  owner: string;
  contract_name: string;
  created_at: string;
  updated_at: string;
} 