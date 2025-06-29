import { ColumnDef } from "@tanstack/react-table";
import { Contract } from "@/types";
import { badgeVariants, textVariants, buttonVariants } from "@/styles/variants";
import { cn } from "@/lib/utils";

// Status mapping for badge variants
const getStatusVariant = (status: string) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'expired':
      return 'error';
    default:
      return 'neutral';
  }
};

export const contractColumns: ColumnDef<Contract>[] = [
  {
    accessorKey: "name",
    header: "Contract Name",
    cell: ({ row }) => (
      <div className={textVariants({ variant: 'body', weight: 'medium' })}>
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <span className={cn(badgeVariants({ variant: 'info' }), "capitalize")}>
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
        <div className={textVariants({ variant: 'body', weight: 'medium' })}>
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
        <div className={cn(
          textVariants({ variant: 'body', weight: 'medium' }),
          isExpired ? 'text-red-600' : 'text-gray-900'
        )}>
          {date.toLocaleDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className={cn(textVariants({ variant: 'body', weight: 'medium' }), "text-green-600")}>
        ${parseFloat(row.getValue("price")).toFixed(2)}
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