import React from "react";
import { cardVariants, textVariants } from "@/styles/variants";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

// Stats Card Component (original behavior)
interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  className?: string;
}

export const StatsCard = ({ title, value, icon, className }: StatsCardProps) => {
  return (
    <div className={cn(cardVariants({ padding: 'md', hover: 'lift' }), className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className={textVariants({ variant: 'muted' })}>{title}</p>
          <p className={textVariants({ variant: 'h1' })}>{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
};

// Generic Card Component
interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  children: React.ReactNode;
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, padding = 'md', border = 'none', hover = 'none', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ padding, border, hover }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// Default export for backward compatibility
export default StatsCard;
