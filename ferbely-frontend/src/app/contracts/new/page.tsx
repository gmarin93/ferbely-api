"use client";

import Header from '@/components/common/Header';
import ContractForm from '@/components/forms/ContractForm';
import { useRouter } from 'next/navigation';
import { pageVariants, containerVariants } from "@/styles/variants";

export default function CreateContractPage() {
  const router = useRouter();

  return (
    <div className={pageVariants()}>
      <div className="py-8">
        <div className={containerVariants({ size: "md" })}>
          <Header title="Create New Contract" />
          <ContractForm
            onSuccess={() => router.push("/")}
            onCancel={() => router.back()}
          />
        </div>
      </div>
    </div>
  );
}