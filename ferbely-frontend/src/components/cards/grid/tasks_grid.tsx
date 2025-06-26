import { CalendarDays } from "lucide-react";

export const tasks_grid = (completed: number, pending: number) => {
  return [
    {
      title: "Total Tasks",
      value: completed + pending,
      icon: <CalendarDays className="h-8 w-8 text-purple-500" />,
    },
    {
      title: "Completed Tasks",
      value: completed,
      icon: <CalendarDays className="h-8 w-8 text-purple-500" />,
    },
    {
      title: "Pending Tasks",
      value: pending,
      icon: <CalendarDays className="h-8 w-8 text-purple-500" />,
    },
  ];
}