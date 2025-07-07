'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckSquare } from 'lucide-react';
import { authApi } from '@/services/api';
import { useFormMutation } from '@/hooks/useFormMutation';
import { useAuth } from '@/providers/auth-provider';
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
  const { login } = useAuth();
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
    onSuccess: (response) => {
      console.log('✅ Login successful! Response:', response);
      
      // Save token and user info to auth context
      const { token, user_id, email, username, first_name, last_name } = response.data;
      
      login(token, {
        id: user_id,
        email,
        username,
        first_name,
        last_name,
      });
      
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