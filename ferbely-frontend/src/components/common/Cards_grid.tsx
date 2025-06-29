'use client';

import { StatsCard } from "./Card";
import { cn } from "@/lib/utils";

const Cards_grid = ({ grid }: { grid: any }) => {
    
    return (    
        <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 mb-8")}>
            {grid.map((item: any) => (
                <StatsCard
                    key={item.title}
                    title={item.title}
                    value={item.value}
                    icon={item.icon}
                />
            ))}
      </div>
     );
}
 
export default Cards_grid;