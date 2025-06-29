'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User } from 'lucide-react';
import { userApi } from '@/services/api';
import { useFormMutation } from '@/hooks/useFormMutation';
import { FormContainer } from './FormContainer';
import { InputField, SelectField } from './FormField';

const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip_code: z.string().min(1, 'Zip code is required'),
  role: z.enum(['customer', 'owner'], {
    required_error: 'Please select a role',
  }),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function UserForm({ onSuccess, onCancel }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const { submit, isSubmitting, error } = useFormMutation({
    mutationFn: userApi.create,
    queryKey: 'users',
    onSuccess: () => {
      reset();
      onSuccess?.();
    },
  });

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FormContainer
        title="Add New User"
        icon={User}
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        submitText="Create User"
        error={error ? 'Error creating user. Please try again.' : undefined}
      >
        <div className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="First Name"
              register={register('first_name')}
              error={errors.first_name}
              required
              placeholder="Enter first name"
            />
            <InputField
              label="Last Name"
              register={register('last_name')}
              error={errors.last_name}
              required
              placeholder="Enter last name"
            />
          </div>

          {/* Account Fields */}
          <InputField
            label="Email"
            type="email"
            register={register('email')}
            error={errors.email}
            required
            placeholder="Enter email address"
          />

          <InputField
            label="Password"
            type="password"
            register={register('password')}
            error={errors.password}
            required
            placeholder="Enter password"
          />

          <InputField
            label="Phone"
            type="tel"
            register={register('phone')}
            error={errors.phone}
            required
            placeholder="Enter phone number"
          />

          {/* Address Fields */}
          <InputField
            label="Address"
            register={register('address')}
            error={errors.address}
            required
            placeholder="Enter street address"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="City"
              register={register('city')}
              error={errors.city}
              required
              placeholder="Enter city"
            />
            <InputField
              label="State"
              register={register('state')}
              error={errors.state}
              required
              placeholder="Enter state"
            />
            <InputField
              label="Zip Code"
              register={register('zip_code')}
              error={errors.zip_code}
              required
              placeholder="Enter zip code"
            />
          </div>

          {/* Role Selection */}
          <SelectField
            label="Role"
            register={register('role')}
            error={errors.role}
            required
            placeholder="Select a role"
            options={[
              { value: 'customer', label: 'Customer' },
              { value: 'owner', label: 'Owner' },
            ]}
          />
        </div>
      </FormContainer>
    </form>
  );
} 