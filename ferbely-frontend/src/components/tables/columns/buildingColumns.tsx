import { ColumnDef } from "@tanstack/react-table";
import { Building } from "@/types";
import { badgeVariants, textVariants, buttonVariants } from "@/styles/variants";
import { cn } from "@/lib/utils";

// Role mapping for badge variants
const getRoleVariant = (role: string) => {
  switch (role) {
    case 'house':
      return 'info';
    case 'apartment':
      return 'success';
    case 'office':
      return 'purple';
    case 'shop':
      return 'warning';
    default:
      return 'neutral';
  }
};

export const buildingColumns: ColumnDef<Building>[] = [
  {
    accessorKey: "name",
    header: "Building Name",
    cell: ({ row }) => (
      <div className={textVariants({ variant: 'body', weight: 'medium' })}>
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      const variant = getRoleVariant(role);
      return (
        <span className={cn(badgeVariants({ variant }), "capitalize")}>
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
        <div className={cn(
          textVariants({ variant: 'body', weight: 'medium' }),
          available === 0 ? 'text-green-600' : 'text-red-600'
        )}>
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