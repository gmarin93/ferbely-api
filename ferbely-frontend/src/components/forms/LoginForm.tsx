'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckSquare } from 'lucide-react';
import { authApi } from '@/services/api';
import { useFormMutation } from '@/hooks/useFormMutation';
import { FormContainer } from './FormContainer';
import { InputField } from './FormField';
import { ButtonComponent } from '../common/Button';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function LoginForm({ onSuccess, onCancel }: LoginFormProps) {
  const {
    register,
    handleSubmit, 
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const { submit, isSubmitting, error } = useFormMutation({
    mutationFn: authApi.login,
    queryKey: 'login',
    onSuccess: () => {
      reset();
      onSuccess?.();
    },
  });

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FormContainer
        title="Login"
        icon={CheckSquare}
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        submitText="Login"
        error={error ? 'Error logging in. Please try again.' : undefined}
      >
        <div className="space-y-4">
          <InputField
            label="Email"
            register={register('email')}
            error={errors.email}
            required
            placeholder="Enter email"
          />

          <InputField
            label="Password"
            register={register('password')}
            error={errors.password}
            required
            placeholder="Enter password"
          />

          <ButtonComponent createFor="login" variant="primary" size="md">
            Login
          </ButtonComponent>
        </div>
      </FormContainer>
    </form>
  );
} 