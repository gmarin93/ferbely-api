import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  error?: FieldError;
  required?: boolean;
  children: React.ReactElement;
}

export const FormField = ({ label, error, required, children }: FormFieldProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
};

interface InputFieldProps {
  label: string;
  type?: string;
  error?: FieldError;
  required?: boolean;
  register: UseFormRegisterReturn;
  placeholder?: string;
}

export const InputField = ({ 
  label, 
  type = 'text', 
  error, 
  required, 
  register, 
  placeholder 
}: InputFieldProps) => {
  return (
    <FormField label={label} error={error} required={required}>
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </FormField>
  );
};

interface SelectFieldProps {
  label: string;
  error?: FieldError;
  required?: boolean;
  register: UseFormRegisterReturn;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const SelectField = ({ 
  label, 
  error, 
  required, 
  register, 
  options, 
  placeholder 
}: SelectFieldProps) => {
  return (
    <FormField label={label} error={error} required={required}>
      <select
        {...register}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}; 