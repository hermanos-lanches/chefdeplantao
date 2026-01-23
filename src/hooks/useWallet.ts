import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export const useWallet = (profileId?: string) => {
  const queryClient = useQueryClient();

  // Busca o saldo atual
  const useBalance = () => {
    return useQuery({
      queryKey: ['wallet', 'balance', profileId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('wallet_balances')
          .select('balance_cents')
          .eq('profile_id', profileId)
          .single();
        
        if (error && error.code !== 'PGRST116') throw error; // PGRST116 é "not found", saldo 0
        return data?.balance_cents || 0;
      },
      enabled: !!profileId,
    });
  };

  // Busca histórico de transações
  const useTransactions = () => {
    return useQuery({
      queryKey: ['wallet', 'transactions', profileId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('wallet_transactions')
          .select('*')
          .eq('profile_id', profileId)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data;
      },
      enabled: !!profileId,
    });
  };

  // Solicitar Saque (Payout)
  const useRequestPayout = () => {
    return useMutation({
      mutationFn: async (amountCents: number) => {
        const { error } = await supabase
          .from('wallet_transactions')
          .insert({
            profile_id: profileId,
            type: 'debit',
            category: 'payout',
            amount_cents: amountCents,
            description: 'Solicitação de saque via PIX',
            status: 'pending'
          });
        
        if (error) throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['wallet'] });
      }
    });
  };

  return {
    useBalance,
    useTransactions,
    useRequestPayout
  };
};
