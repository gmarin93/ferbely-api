"use client";

import Header from '@/components/common/Header';
import TaskForm from '@/components/forms/TaskForm';
import { useRouter } from 'next/navigation';

export default function CreateTaskPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-2xl mx-auto px-4">
          <Header title="Create New Task" />
          <TaskForm 
            onSuccess={() => router.push('/tasks')} 
            onCancel={() => router.back()}
          />
        </div>
      </div>
    </div>
  );
}