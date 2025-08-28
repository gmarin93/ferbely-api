"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { buildingApi, contractApi, userApi } from "@/services/api";
import { Building as BuildingType, Contract, User } from "@/types";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { buttonVariants, textVariants, cardVariants } from "@/styles/variants";
import { cn } from "@/lib/utils";

const BuildingPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const buildingId = parseInt(id as string);

  const {
    data: building,
    isLoading: buildingLoading,
    error: buildingError,
  } = useFetch(`building-${buildingId}`, false, () => buildingApi.getById(buildingId));

  const {
    data: contracts,
    isLoading: contractsLoading,
    error: contractsError,
  } = useFetch("contracts", false, contractApi.getAll);

  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
  } = useFetch("users", false, userApi.getAll);

  const isLoading = buildingLoading || contractsLoading || usersLoading;
  const hasError = buildingError || contractsError || usersError;

  if (isLoading) return <Loading />;
  if (hasError) return <Error />;

  // Find related data
  const relatedContract = contracts?.data?.results?.find(
    (contract: Contract) => contract.building.toString() === buildingId.toString()
  );

  const owner = usersData?.data?.results?.find(
    (user: User) => user.id.toString() === building?.data?.owner?.toString()
  );

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => router.back()}
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-2")}
            >
              ← Back to Buildings
            </button>
            <h1 className={cn(textVariants({ variant: "h1", weight: "bold" }))}>
              {building?.data?.name}
            </h1>
            <p className={cn(textVariants({ variant: "muted" }))}>
              Building Details and Information
            </p>
          </div>
          <button
            onClick={() => router.push(`/buildings/${buildingId}/edit`)}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Edit Building
          </button>
        </div>

        {/* Building Details Card */}
        <div className={cn(cardVariants({ variant: "default" }), "mb-8")}>
          <div className="p-6">
            <h2 className={cn(textVariants({ variant: "h3", weight: "semibold" }), "mb-4")}>
              Building Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={cn(textVariants({ variant: "small", weight: "medium" }), "text-gray-600")}>
                  Name
                </label>
                <p className={cn(textVariants({ variant: "body", weight: "medium" }))}>
                  {building?.data?.name}
                </p>
              </div>
              <div>
                <label className={cn(textVariants({ variant: "small", weight: "medium" }), "text-gray-600")}>
                  Role
                </label>
                <p className={cn(textVariants({ variant: "body", weight: "medium" }), "capitalize")}>
                  {building?.data?.role}
                </p>
              </div>
              <div>
                <label className={cn(textVariants({ variant: "small", weight: "medium" }), "text-gray-600")}>
                  Address
                </label>
                <p className={cn(textVariants({ variant: "body", weight: "medium" }))}>
                  {building?.data?.address || "Not specified"}
                </p>
              </div>
              <div>
                <label className={cn(textVariants({ variant: "small", weight: "medium" }), "text-gray-600")}>
                  Owner
                </label>
                <p className={cn(textVariants({ variant: "body", weight: "medium" }))}>
                  {owner ? `${owner.first_name} ${owner.last_name}` : "Unknown"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contract Information */}
        {relatedContract && (
          <div className={cn(cardVariants({ variant: "default" }), "mb-8")}>
            <div className="p-6">
              <h2 className={cn(textVariants({ variant: "h3", weight: "semibold" }), "mb-4")}>
                Current Contract
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={cn(textVariants({ variant: "small", weight: "medium" }), "text-gray-600")}>
                    Contract Name
                  </label>
                  <p className={cn(textVariants({ variant: "body", weight: "medium" }))}>
                    {relatedContract.name}
                  </p>
                </div>
                <div>
                  <label className={cn(textVariants({ variant: "small", weight: "medium" }), "text-gray-600")}>
                    Status
                  </label>
                  <p className={cn(
                    textVariants({ variant: "body", weight: "medium" }),
                    relatedContract.status === "active" ? "text-green-600" : "text-red-600",
                    "capitalize"
                  )}>
                    {relatedContract.status}
                  </p>
                </div>
                <div>
                  <label className={cn(textVariants({ variant: "small", weight: "medium" }), "text-gray-600")}>
                    Start Date
                  </label>
                  <p className={cn(textVariants({ variant: "body", weight: "medium" }))}>
                    {new Date(relatedContract.start_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className={cn(textVariants({ variant: "small", weight: "medium" }), "text-gray-600")}>
                    End Date
                  </label>
                  <p className={cn(textVariants({ variant: "body", weight: "medium" }))}>
                    {new Date(relatedContract.end_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => router.push(`/contracts/new?building=${buildingId}`)}
            className={cn(buttonVariants({ variant: "secondary" }))}
          >
            Create New Contract
          </button>
          <button
            onClick={() => router.push(`/tasks/new?building=${buildingId}`)}
            className={cn(buttonVariants({ variant: "secondary" }))}
          >
            Create Task for this Building
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default BuildingPage;