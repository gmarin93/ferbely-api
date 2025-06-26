import { Building, CalendarDays } from "lucide-react";

export const buildings_grid = (value: number, rented: number, available: number) => {
  return [
  {
    title: "Total Buildings",
    value: value,
    icon: <Building className="h-8 w-8 text-green-500" />,
  },
  {
    title: "Rented Buildings",
    value: rented,
    icon: <CalendarDays className="h-8 w-8 text-purple-500" />,
  },
  {
    title: "Available Buildings",
    value: available,
    icon: <CalendarDays className="h-8 w-8 text-purple-500" />,
  },
  ];  
}