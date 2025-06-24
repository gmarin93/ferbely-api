"use client";

import { Building, User, CalendarDays } from "lucide-react";
import { Contract } from "@/types";
import Header from "@/components/dashboard/Header";
import Cards_grid from "@/components/dashboard/Cards_grid";
import Loading from "@/components/common/loading";
import Error from "@/components/common/error";
import Dashboard_Table from "@/components/dashboard/Dashboard_Table";
import useFetch from "./hooks/useFetch";
import { buildingApi, contractApi } from "@/services/api";

export default function Dashboard() {
  const {
    data: buildings,
    isLoading: buildingsLoading,
    error: buildingsError,
  } = useFetch("buildings", buildingApi.getAll);
  const {
    data: contracts,
    isLoading: contractsLoading,
    error: contractsError,
  } = useFetch("contracts", contractApi.getAll);

  console.log(contracts);

  const isLoading: boolean = buildingsLoading || contractsLoading;
  const hasError = buildingsError || contractsError;
  const currentDate: Date = new Date();
  const expiredContracts: Contract[] | undefined = contracts?.results.filter(
    (c: Contract) => c.end_date < currentDate.toISOString()
  );
  const cards_grid = [
    {
      title: "Total Buildings",
      value: buildings?.count,
      icon: <Building className="h-8 w-8 text-green-500" />,
    },
    {
      title: "Active Contracts",
      value: contracts?.results.filter((c: Contract) => c.status === "active").length,
      icon: <CalendarDays className="h-8 w-8 text-purple-500" />,
    },
    {
      title: "Expired Contracts",
      value: expiredContracts?.slice(0, 5).length,
      icon: <CalendarDays className="h-8 w-8 text-purple-500" />,
    },
  ];

  isLoading && <Loading />;
  hasError && <Error />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header />
          <Cards_grid grid={cards_grid} />
          <Dashboard_Table items={contracts} />
        </div>
      </div>
    </div>
  );
}
