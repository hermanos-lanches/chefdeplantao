import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../lib/authService';
import { LoginInput } from '../schemas';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const useUser = () => {
    return useQuery({
      queryKey: ['auth', 'user'],
      queryFn: () => authService.getCurrentUser(),
      staleTime: 1000 * 60 * 10, // 10 minutos
    });
  };

  const useSignIn = () => {
    return useMutation({
      mutationFn: ({ email, password }: LoginInput) => authService.signIn(email, password),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
      },
    });
  };

  const useSignOut = () => {
    return useMutation({
      mutationFn: () => authService.signOut(),
      onSuccess: () => {
        queryClient.setQueryData(['auth', 'user'], null);
        queryClient.clear();
      },
    });
  };

  return {
    useUser,
    useSignIn,
    useSignOut,
  };
};
