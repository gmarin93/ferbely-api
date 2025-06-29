"use client";

import Header from '@/components/common/Header';
import TaskForm from '@/components/forms/TaskForm';
import { useRouter } from 'next/navigation';
import { pageVariants, containerVariants } from "@/styles/variants";

export default function CreateTaskPage() {
  const router = useRouter();
  return (
    <div className={pageVariants()}>
      <div className="py-8">
        <div className={containerVariants({ size: 'md' })}>
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