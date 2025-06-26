"use client";

import { Contract } from "@/types";
import Header from "@/components/common/Header";
import Cards_grid from "@/components/Cards_grid";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import Table from "@/components/Table";
import useFetch from "@/app/hooks/useFetch";
import { buildingApi, contractApi } from "@/services/api";
import { contractColumns } from "@/components/tables/columns/contractColumns";
import { contracts_grid } from "@/components/cards/grid/contracts_grid";

export default function Home() {
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
  const currentDate: Date = new Date();
  const expiredContracts: Contract[] = contracts?.data.results.filter(
    (c: Contract) => c.end_date < currentDate.toISOString()
  );
  const activeContracts = contracts_grid(
    contracts?.data.results.filter((c: Contract) => c.status === "active")
      .length,
    expiredContracts?.slice(0, 5).length,
    buildings?.data.count
  );

  if (isLoading) return <Loading />;
  if (hasError) return <Error />;

  const contracts_data = contracts?.data.results || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header title="Dashboard" />
          <Cards_grid grid={activeContracts} />
          <Table
            data={contracts_data}
            columns={contractColumns}
            title="Contracts"
          />
        </div>
      </div>
    </div>
  );
}
