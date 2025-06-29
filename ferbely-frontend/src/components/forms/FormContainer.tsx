import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cardVariants, textVariants, buttonVariants, alertVariants } from "@/styles/variants";
import { cn } from "@/lib/utils";

interface FormContainerProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  onCancel?: () => void;
  isSubmitting?: boolean;
  submitText?: string;
  error?: string;
}

export const FormContainer = ({ 
  title, 
  icon: Icon, 
  children, 
  onCancel, 
  isSubmitting, 
  submitText = 'Submit',
  error
}: FormContainerProps) => {
  return (
    <div className={cardVariants({ padding: 'md', border: 'light' })}>
      <div className="flex items-center mb-6">
        <Icon className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className={textVariants({ variant: 'h3' })}>{title}</h2>
      </div>

      {children}

      {error && (
        <div className={cn(alertVariants({ variant: 'error' }), "mt-4")}>
          <p className={textVariants({ variant: 'small' })}>{error}</p>
        </div>
      )}

      <div className="flex gap-3 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(buttonVariants({ variant: 'primary' }), "flex-1")}
        >
          {isSubmitting ? 'Submitting...' : submitText}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className={buttonVariants({ variant: 'outline' })}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}; 