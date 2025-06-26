import { Building, CalendarDays } from "lucide-react";

export const contracts_grid = (active: number, expired: number, buildings: number) => {
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
      title: "Total Buildings",
      value: buildings,
      icon: <Building className="h-8 w-8 text-purple-500" />,
    },
  ];
}