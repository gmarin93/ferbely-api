import { ColumnDef } from "@tanstack/react-table";
import { Contract } from "@/types";

export const contractColumns: ColumnDef<Contract>[] = [
  {
    accessorKey: "name",
    header: "Contract Name",
    cell: ({ row }) => (
      <div className="text-sm font-medium text-gray-900">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
        {row.getValue("type")}
      </span>
    ),
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("start_date"));
      return (
        <div className="text-sm font-medium text-gray-900">
          {date.toLocaleDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("end_date"));
      const isExpired = date < new Date();
      return (
        <div className={`text-sm font-medium ${isExpired ? 'text-red-600' : 'text-gray-900'}`}>
          {date.toLocaleDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className="text-sm font-medium text-green-600">
        ${parseFloat(row.getValue("price")).toFixed(2)}
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
          ${status === 'active' ? 'bg-green-100 text-green-800' : 
            status === 'expired' ? 'bg-red-100 text-red-800' : 
            'bg-gray-100 text-gray-800'}`}>
          {status}
        </span>
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