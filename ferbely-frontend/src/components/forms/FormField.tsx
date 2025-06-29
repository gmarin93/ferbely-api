import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { textVariants, inputVariants } from "@/styles/variants";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  error?: FieldError;
  required?: boolean;
  children: React.ReactElement;
}

export const FormField = ({ label, error, required, children }: FormFieldProps) => {
  return (
    <div>
      <label className={cn(textVariants({ variant: 'caption' }), "block mb-1")}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className={cn(textVariants({ variant: 'small' }), "text-red-500 mt-1")}>{error.message}</p>
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
        className={inputVariants({ variant: error ? 'error' : 'default' })}
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
        className={inputVariants({ variant: error ? 'error' : 'default' })}
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