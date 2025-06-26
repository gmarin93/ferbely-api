"use client";

import { Contract, Building as BuildingType } from "@/types";
import Header from "@/components/common/Header";
import Cards_grid from "@/components/Cards_grid";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import Table from "@/components/Table";
import useFetch from "@/app/hooks/useFetch";
import { buildingApi, contractApi } from "@/services/api";
import { buildingColumns } from "@/components/tables/columns/buildingColumns";
import { buildings_grid } from "@/components/cards/grid/buildings_grid";

export default function Buildings() {
  const {
    data: buildings,
    isLoading: buildingsLoading,
    error: buildingsError,
  } = useFetch("buildings", buildingApi);
  const {
    data: contracts,
    isLoading: contractsLoading,
    error: contractsError,
  } = useFetch("contracts", contractApi);

  const isLoading: boolean = buildingsLoading || contractsLoading;
  const hasError = buildingsError || contractsError;
  const cards_grid = buildings_grid(buildings?.data.count, contracts?.data.results.filter(
    (c: Contract) => c.status === "active"
  ).length, buildings?.data.count - contracts?.data.results.filter(
    (c: Contract) => c.status === "active"
  ).length);

  
  const buildings_data = buildings?.data.results.map((building: BuildingType) => {
    return {
      ...building,
      available: contracts?.data.results.filter(
        (c: Contract) => c.building === building.id
      ).length,
      contract_name: contracts?.data.results.find(
        (c: Contract) => c.building === building.id
      )?.name,
      role: building.role,
    };
  });

  if (isLoading) return <Loading />;
  if (hasError) return <Error />;


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header title="Buildings" />
          <Cards_grid grid={cards_grid} />
          <Table
            data={buildings_data}
            columns={buildingColumns}
            title="Buildings"
          />
        </div>
      </div>
    </div>
  );
} 