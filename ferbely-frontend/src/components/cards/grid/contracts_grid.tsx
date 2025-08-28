import { Building, CalendarDays } from "lucide-react";

export const contracts_grid = (active: number, expired: number, contracts: number) => {
  return [
    {
      title: "Active Contracts",
      value: active,
      icon: <CalendarDays className="h-8 w-8 text-purple-500" />,
    },
    {
      title: "Expired Contracts",
      value: expired,
      icon: <CalendarDays className="h-8 w-8 text-red-500" />,
    },
    {
      title: "Total Contracts",
      value: contracts,
      icon: <Building className="h-8 w-8 text-purple-500" />,
    },
  ];
}