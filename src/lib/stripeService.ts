import { supabase } from './supabase';

export const stripeService = {
  /**
   * Inicia o processo de checkout para a assinatura de R$ 149/mês.
   * Em uma aplicação real, isso chamaria uma Edge Function do Supabase que interage com o Stripe Node SDK.
   */
  async createSubscriptionCheckout(userId: string) {
    const { data, error } = await supabase.functions.invoke('create-stripe-checkout', {
      body: { 
        priceId: 'price_H5ggY9Iz9sS26J', // ID do produto no Stripe (R$ 149,00)
        userId 
      }
    });

    if (error) throw error;
    
    // Redireciona para o Stripe Checkout
    if (data?.url) {
      window.location.href = data.url;
    }
  },

  /**
   * Abre o portal do cliente para gerenciar assinatura (cancelar, trocar cartão)
   */
  async openCustomerPortal(userId: string) {
    const { data, error } = await supabase.functions.invoke('create-stripe-portal', {
      body: { userId }
    });

    if (error) throw error;
    if (data?.url) {
      window.location.href = data.url;
    }
  }
};
