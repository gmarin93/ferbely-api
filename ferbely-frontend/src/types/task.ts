export interface Task {
  id: number;
  name: string;
  type: string;
  status: string;
  contract: number | null;
  created_at: string;
  updated_at: string;
} 