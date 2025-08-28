"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { buildingApi } from "@/services/api";
import { Building as BuildingType } from "@/types";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import BuildingForm from "@/components/forms/BuildingForm";
import { buttonVariants, textVariants } from "@/styles/variants";
import { cn } from "@/lib/utils";

const EditBuildingPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const buildingId = parseInt(id as string);

  const {
    data: building,
    isLoading,
    error,
  } = useFetch(`building-${buildingId}`, false, () => buildingApi.getById(buildingId));

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  const handleSuccess = () => {
    router.push(`/buildings/${buildingId}`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleCancel}
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-2")}
          >
            ← Back
          </button>
          <h1 className={cn(textVariants({ variant: "h1", weight: "bold" }))}>
            Edit Building
          </h1>
          <p className={cn(textVariants({ variant: "muted" }))}>
            Update building information
          </p>
        </div>

        {/* Edit Form */}
        {building?.data && (
          <BuildingForm
            initialData={building.data}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
            isEditMode={true}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default EditBuildingPage;
