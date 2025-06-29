'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckSquare } from 'lucide-react';
import { taskApi } from '@/services/api';
import { useFormMutation } from '@/hooks/useFormMutation';
import { FormContainer } from './FormContainer';
import { InputField, SelectField } from './FormField';

const taskSchema = z.object({
  name: z.string().min(1, 'Task name is required').max(100),
  description: z.string().optional(),
  status: z.enum(['pending', 'in_progress', 'completed'], {
    required_error: 'Please select a status',
  }),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function TaskForm({ onSuccess, onCancel }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: 'pending'
    }
  });

  const { submit, isSubmitting, error } = useFormMutation({
    mutationFn: taskApi.create,
    queryKey: 'tasks',
    onSuccess: () => {
      reset();
      onSuccess?.();
    },
  });

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FormContainer
        title="Add New Task"
        icon={CheckSquare}
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        submitText="Create Task"
        error={error ? 'Error creating task. Please try again.' : undefined}
      >
        <div className="space-y-4">
          <InputField
            label="Task Name"
            register={register('name')}
            error={errors.name}
            required
            placeholder="Enter task name"
          />

          <InputField
            label="Description"
            register={register('description')}
            error={errors.description}
            placeholder="Optional description"
          />

          <SelectField
            label="Status"
            register={register('status')}
            error={errors.status}
            required
            options={[
              { value: 'pending', label: 'Pending' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'completed', label: 'Completed' },
            ]}
          />
        </div>
      </FormContainer>
    </form>
  );
} 