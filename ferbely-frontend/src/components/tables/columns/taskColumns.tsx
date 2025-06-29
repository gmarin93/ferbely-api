import { ColumnDef } from "@tanstack/react-table";
import { Task } from "@/types";
import { badgeVariants, textVariants, buttonVariants } from "@/styles/variants";
import { cn } from "@/lib/utils";

// Status mapping for badge variants
const getStatusVariant = (status: string) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'pending':
      return 'warning';
    case 'in_progress':
      return 'info';
    default:
      return 'neutral';
  }
};

export const taskColumns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: "Task Name",
    cell: ({ row }) => (
      <div className={textVariants({ variant: 'body', weight: 'medium' })}>
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = getStatusVariant(status);
      return (
        <span className={cn(badgeVariants({ variant }), "capitalize")}>
          {status?.replace('_', ' ')}
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
        <div className={textVariants({ variant: contractName ? 'body' : 'muted', weight: 'medium' })}>
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
        <button className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), "text-indigo-600 hover:text-indigo-900")}>
          View
        </button>
        <button className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), "text-green-600 hover:text-green-900")}>
          Edit
        </button>
      </div>
    ),
  },
]; 