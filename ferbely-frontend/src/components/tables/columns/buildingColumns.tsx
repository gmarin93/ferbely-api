import { ColumnDef } from "@tanstack/react-table";
import { Building } from "@/types";

export const buildingColumns: ColumnDef<Building>[] = [
  {
    accessorKey: "name",
    header: "Building Name",
    cell: ({ row }) => (
      <div className="text-sm font-medium text-gray-900">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
          ${role === 'house' ? 'bg-blue-100 text-blue-800' : 
            role === 'apartment' ? 'bg-green-100 text-green-800' : 
            role === 'office' ? 'bg-purple-100 text-purple-800' :
            role === 'shop' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'}`}>
          {role}
        </span>
      );
    },
  },
  {
    accessorKey: "available",
    header: "Available",
    cell: ({ row }) => {
      const available = row.getValue("available") as number;
      return (
        <div className={`text-sm font-medium ${available === 0 ? 'text-green-600' : 'text-red-600'}`}>
          {available === 0 ? 'Yes' : 'No'}
        </div>
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