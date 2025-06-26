"use client";

import { Contract, Task } from "@/types";
import Header from "@/components/common/Header";
import Cards_grid from "@/components/Cards_grid";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import Table from "@/components/Table";
import useFetch from "@/app/hooks/useFetch";
import {contractApi, taskApi } from "@/services/api";
import { taskColumns } from "@/components/tables/columns/taskColumns";
import { tasks_grid } from "@/components/cards/grid/tasks_grid";

export default function Tasks() {
  const {
    data: contracts,
    isLoading: contractsLoading,
    error: contractsError,
  } = useFetch("contracts", contractApi);

  const {
    data: tasks,
    isLoading: tasksLoading,
    error: tasksError,
  } = useFetch("tasks", taskApi);

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
        c.tasks?.includes(task.id)
      )?.name,
      status: task.status,
    };
  });


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header title="Tasks" />
          <Cards_grid grid={cards_grid} />
          <Table
            data={tasks_data}
            columns={taskColumns}
            title="Tasks"
          />
        </div>
      </div>
    </div>
  );
}
