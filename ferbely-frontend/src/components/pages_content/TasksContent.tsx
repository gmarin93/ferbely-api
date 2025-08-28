"use client";

import { Contract, Task } from "@/types";
import Cards_grid from "@/components/common/Cards_grid";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import Table from "@/components/tables/Table";
import useFetch from "@/hooks/useFetch";
import { contractApi, taskApi } from "@/services/api";
import { taskColumns } from "@/components/tables/columns/taskColumns";
import { tasks_grid } from "@/components/cards/grid/tasks_grid";
import { Suspense } from "react";
import { ErrorBoundary } from "../common/ErrorBoundary";

export default function TasksContent() {
  const {
    data: contracts,
    isLoading: contractsLoading,
    error: contractsError,
  } = useFetch("contracts", false, contractApi.getAll);

  const {
    data: tasks,
    isLoading: tasksLoading,
    error: tasksError,
  } = useFetch("tasks", false, taskApi.getAll);

  const isLoading: boolean = contractsLoading || tasksLoading;
  const hasError = contractsError || tasksError;
  
  const cards_grid = tasks_grid(
    tasks?.data.results.filter((t: Task) => t.status === "completed")
      .length,
    tasks?.data.results.filter((t: Task) => t.status === "pending")
      .length
  );

  if (isLoading) return <Loading />;
  if (hasError) return <Error />;

  const tasks_data = tasks?.data.results.map((task: Task) => {
    return {
      ...task,
      contract_name: contracts?.data.results.find((c: Contract) =>
        c.id.toString() === task.contract?.toString()
      )?.name,
      status: task.status,
    };
  });

  console.log(tasks_data);

  return (
    <TasksContentErrorBoundary>
      <Cards_grid grid={cards_grid} />
      <Table
        data={tasks_data}
        columns={taskColumns}
        title="Tasks"
      />
    </TasksContentErrorBoundary>
  );
} 

export function TasksContentErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}