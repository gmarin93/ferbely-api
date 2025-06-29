import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface UseFormMutationOptions<T> {
  mutationFn: (data: T) => Promise<any>;
  queryKey: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export function useFormMutation<T>({
  mutationFn,
  queryKey,
  onSuccess,
  onError
}: UseFormMutationOptions<T>) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      onSuccess?.();
    },
    onError: (error) => {
      console.error(`Error creating ${queryKey}:`, error);
      onError?.(error);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const submit = (data: T) => {
    setIsSubmitting(true);
    mutation.mutate(data);
  };

  return {
    submit,
    isSubmitting,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
} 