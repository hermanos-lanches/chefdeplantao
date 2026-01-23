import { useQuery } from '@tanstack/react-query';
import { verificationService } from '../lib/verificationService';

export const useVerification = (userId?: string) => {
  return useQuery({
    queryKey: ['verification', userId],
    queryFn: () => verificationService.getVerificationStatus(userId!),
    enabled: !!userId,
    refetchInterval: (data) => {
      // Se estiver em revisão, busca atualizações a cada 30 segundos
      return data?.verification_status === 'in_review' ? 30000 : false;
    }
  });
};
