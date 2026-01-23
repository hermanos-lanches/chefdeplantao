import { supabase } from './supabase';
import { Transaction } from '../types';

export const transactionsService = {
  async getMyTransactions(userId: string): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(t => ({
      id: t.id,
      type: t.type,
      amount: t.amount,
      date: t.created_at,
      status: t.status,
      description: t.description,
    }));
  }
};
