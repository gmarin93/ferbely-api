import { ColumnDef } from "@tanstack/react-table";
import { Task } from "@/types";

export const taskColumns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: "Task Name",
    cell: ({ row }) => (
      <div className="text-sm font-medium text-gray-900">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
          ${status === 'completed' ? 'bg-green-100 text-green-800' : 
            status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
            status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'}`}>
          {status?.replace('_', ' ').charAt(0).toUpperCase() + status?.replace('_', ' ').slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "contract_name",
    header: "Contract Name",
    cell: ({ row }) => {
      const contractName = row.getValue("contract_name") as string;
      return (
        <div className="text-sm font-medium text-gray-900">
          {contractName || 'No Contract'}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
          View
        </button>
        <button className="text-green-600 hover:text-green-900 text-sm font-medium">
          Edit
        </button>
      </div>
    ),
  },
]; 