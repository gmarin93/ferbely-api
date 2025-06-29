"use client";

import Header from '@/components/common/Header';
import BuildingForm from '@/components/forms/BuildingForm';
import { useRouter } from 'next/navigation';
import { pageVariants, containerVariants } from "@/styles/variants";

export default function CreateBuildingPage() {
  const router = useRouter();
  return (
    <div className={pageVariants()}>
      <div className="py-8">
        <div className={containerVariants({ size: 'md' })}>
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