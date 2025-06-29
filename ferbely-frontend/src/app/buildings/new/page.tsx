"use client";

import Header from '@/components/common/Header';
import BuildingForm from '@/components/forms/BuildingForm';
import { useRouter } from 'next/navigation';

export default function CreateBuildingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-2xl mx-auto px-4">
          <Header title="Create New Building" />
          <BuildingForm 
            onSuccess={() => router.push('/buildings')} 
            onCancel={() => router.back()}
          />
        </div>
      </div>
    </div>
  );
}