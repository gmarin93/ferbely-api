'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Building } from 'lucide-react';
import { buildingApi } from '@/services/api';
import { useFormMutation } from '@/hooks/useFormMutation';
import { FormContainer } from './FormContainer';
import { InputField, SelectField } from './FormField';

const buildingSchema = z.object({
  name: z.string().min(1, 'Building name is required').max(255),
  address: z.string().min(1, 'Address is required'),
  role: z.enum(['house', 'apartment', 'office', 'shop', 'other'], {
    required_error: 'Please select a building type',
  }),
});

type BuildingFormData = z.infer<typeof buildingSchema>;

interface BuildingFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function BuildingForm({ onSuccess, onCancel }: BuildingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BuildingFormData>({
    resolver: zodResolver(buildingSchema),
  });

  const { submit, isSubmitting, error } = useFormMutation({
    mutationFn: buildingApi.create,
    queryKey: 'buildings',
    onSuccess: () => {
      reset();
      onSuccess?.();
    },
  });

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FormContainer
        title="Add New Building"
        icon={Building}
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        submitText="Create Building"
        error={error ? 'Error creating building. Please try again.' : undefined}
      >
        <div className="space-y-4">
          <InputField
            label="Building Name"
            register={register('name')}
            error={errors.name}
            required
            placeholder="Enter building name"
          />

          <InputField
            label="Address"
            register={register('address')}
            error={errors.address}
            required
            placeholder="Enter building address"
          />

          <SelectField
            label="Building Type"
            register={register('role')}
            error={errors.role}
            required
            placeholder="Select building type"
            options={[
              { value: 'house', label: 'House' },
              { value: 'apartment', label: 'Apartment' },
              { value: 'office', label: 'Office' },
              { value: 'shop', label: 'Shop' },
              { value: 'other', label: 'Other' },
            ]}
          />
        </div>
      </FormContainer>
    </form>
  );
} 