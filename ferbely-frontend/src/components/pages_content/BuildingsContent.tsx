"use client";

import { Contract, Building as BuildingType, User } from "@/types";
import Cards_grid from "@/components/common/Cards_grid";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import Table from "@/components/tables/Table";
import useFetch from "@/hooks/useFetch";
import { buildingApi, contractApi, userApi } from "@/services/api";
import { buildingColumns } from "@/components/tables/columns/buildingColumns";
import { buildings_grid } from "@/components/cards/grid/buildings_grid";
import { ErrorBoundary } from "../common/ErrorBoundary";
import { Suspense } from "react";

export default function BuildingsContent() {
  const {
    data: buildings,
    isLoading: buildingsLoading,
    error: buildingsError,
  } = useFetch("buildings", false, buildingApi.getAll);
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

  const users: User[] = usersData?.data?.results ?? [];
  const isLoading: boolean =
    buildingsLoading || contractsLoading || usersLoading;
  const hasError = buildingsError || contractsError || usersError;

  const cards_grid = buildings_grid(
    buildings?.data.count,
    contracts?.data.results.filter((c: Contract) => c.status === "active")
      .length,
    buildings?.data.count -
      contracts?.data.results.filter((c: Contract) => c.status === "active")
        .length
  );

  const buildings_data = buildings?.data.results.map(
    (building: BuildingType) => {
      return {
        ...building,
        available: contracts?.data.results.filter(
          (c: Contract) => c.building === building.id.toString()
        ).length,
        contract_name: contracts?.data.results.find(
          (c: Contract) => c.building.toString() === building.id.toString()  
        )?.name,
        role: building.role,
        owner: users?.filter((user) => user.id.toString() == building.owner).pop()?.first_name ?? '',
      };
    }
  );

  if (isLoading) return <Loading />;
  if (hasError) return <Error />;

  return (
    <BuildingsContentErrorBoundary>
      <Cards_grid grid={cards_grid} />
      <Table
        data={buildings_data}
        columns={buildingColumns}
        title="Buildings"
      />
    </BuildingsContentErrorBoundary>
  );
}

export function BuildingsContentErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
