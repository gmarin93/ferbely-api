"use client";

import { Suspense } from "react";
import { Building, Contract } from "@/types";
import Cards_grid from "@/components/common/Cards_grid";
import Loading from "@/components/common/Loading";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import Table from "@/components/tables/Table";
import useFetch from "@/hooks/useFetch";
import { buildingApi, contractApi } from "@/services/api";
import { contractColumns } from "@/components/tables/columns/contractColumns";
import { contracts_grid } from "@/components/cards/grid/contracts_grid";

// Suspense-enabled content component
function DashboardData() {
  // With suspense enabled, these will automatically suspend the component
  const { data: buildings } = useFetch("buildings", false, buildingApi.getAll);
  const { data: contracts } = useFetch("contracts", false, contractApi.getAll);

  const currentDate: Date = new Date(); 
  const expiredContracts: Contract[] = contracts?.data.results.filter(
    (c: Contract) => c.end_date < currentDate.toISOString()
  );
  const activeContracts = contracts_grid(
    contracts?.data.results.filter((c: Contract) => c.status === "active")
      .length,
    expiredContracts?.slice(0, 5).length,
    contracts?.data.count
  );

  const contractsRes = contracts?.data.results || [];
  const contracts_data = contractsRes.map((c: Contract) => ({
    ...c,
    building: buildings?.data.results.find((b: Building) => b.id.toString() === c.building.toString())?.name,
  }));
  

  return (
    <>
      <Cards_grid grid={activeContracts} />
      <Table
        data={contracts_data}
        columns={contractColumns}
        title="Contracts"
      />
    </>
  );
}

export default function DashboardContent() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <DashboardData />
      </Suspense>
    </ErrorBoundary>
  );
} 