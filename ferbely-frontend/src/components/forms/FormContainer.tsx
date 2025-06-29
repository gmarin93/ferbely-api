import React from 'react';
import { LucideIcon } from 'lucide-react';

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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Icon className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>

      {children}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="flex gap-3 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : submitText}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}; 