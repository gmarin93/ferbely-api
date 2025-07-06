'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckSquare } from 'lucide-react';
import { authApi } from '@/services/api';
import { useFormMutation } from '@/hooks/useFormMutation';
import { FormContainer } from './FormContainer';
import { InputField } from './FormField';

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
    mutationFn: (data: LoginFormData) => {
      return authApi.login(data);
    },
    queryKey: 'login',
    onSuccess: () => {
      console.log('✅ Login successful!');
      reset();
      onSuccess?.();
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => {
      console.log('📝 Form submitted with data:', data);
      submit(data);
    })}>
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
            type="email"
          />

          <InputField
            label="Password"
            register={register('password')}
            error={errors.password}
            required
            placeholder="Enter password"
          />
        </div>
      </FormContainer>
    </form>
  );
} 