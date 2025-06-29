"use client";

import { usePathname, useRouter } from "next/navigation";
import { buttonVariants } from "@/styles/variants";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import React from "react";

// Generic Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

// Specialized Button Component for routing
interface ButtonComponentProps extends VariantProps<typeof buttonVariants> {
  createFor: 'buildings' | 'tasks' | 'contracts' | 'users' | 'login';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ButtonComponent = ({ 
  createFor, 
  children, 
  onClick,
  variant = 'primary',
  size = 'md',
  className
}: ButtonComponentProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    // Auto-routing or modal opening based on createFor
    if (createFor === 'login') {
      router.push('/login');
    } else {
      router.push(`/${createFor}/new`);
    }
    // Or: openModal(`create-${createFor}`);
    onClick?.();
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={className}
    >
      {children}
    </Button>
  );
};
