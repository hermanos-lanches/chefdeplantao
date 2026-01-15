import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, HelpCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { Input } from '../../components/ui/Input.tsx';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col p-6">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="hover:text-primary transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">Checkout</h1>
      </header>

      {/* Product Summary */}
      <div className="bg-[#2a1a10] border border-primary/20 rounded-2xl p-4 mb-8 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shrink-0">
             <span className="material-symbols-outlined text-white">restaurant</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
               <h3 className="font-bold text-base text-white">Assinatura Mensal</h3>
               <div className="text-right">
                  <p className="font-bold text-lg text-white">R$ 149,00</p>
                  <p className="text-xs text-gray-400">/mês</p>
               </div>
            </div>
            <p className="text-gray-400 text-sm">Chef de Plantão Pro</p>
          </div>
        </div>
        
        <div className="h-px bg-white/5 w-full"></div>
        
        <div className="space-y-2">
           <div className="flex items-center gap-2">
              <span className="bg-primary/20 rounded-full p-0.5">
                <span className="material-symbols-outlined text-primary text-[14px]">check</span>
              </span>
              <span className="text-sm text-gray-300">Acesso ilimitado a freelancers</span>
           </div>
           <div className="flex items-center gap-2">
              <span className="bg-primary/20 rounded-full p-0.5">
                <span className="material-symbols-outlined text-primary text-[14px]">check</span>
              </span>
              <span className="text-sm text-gray-300">Suporte prioritário 24/7</span>
           </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 text-primary font-bold">
        <CreditCard size={20} />
        <h2>Dados do Pagamento</h2>
      </div>

      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate('/restaurant/dashboard'); }}>
        <div className="space-y-4">
           <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Número do Cartão</label>
              <div className="relative">
                 <input 
                    type="text" 
                    placeholder="0000 0000 0000 0000" 
                    className="block w-full bg-[#262626] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all p-4 font-mono tracking-widest"
                 />
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <CreditCard size={20} />
                 </div>
              </div>
           </div>

           <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Nome no Cartão</label>
              <input 
                 type="text" 
                 placeholder="COMO NO CARTÃO" 
                 className="block w-full bg-[#262626] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all p-4 uppercase"
              />
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Validade</label>
                <input 
                    type="text" 
                    placeholder="MM/AA" 
                    className="block w-full bg-[#262626] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all p-4 text-center"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">CVV</label>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="123" 
                        className="block w-full bg-[#262626] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all p-4 text-center"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <HelpCircle size={16} />
                    </div>
                </div>
              </div>
           </div>
        </div>

        <div className="pt-8">
           <Button type="submit" fullWidth size="lg" className="h-14 bg-primary hover:bg-primary-hover shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
              <Lock size={18} />
              Confirmar Pagamento
           </Button>
           <div className="flex items-center justify-center gap-2 mt-4 text-gray-500 text-[10px]">
              <span className="material-symbols-outlined text-xs">verified_user</span>
              Pagamento 100% seguro. Cancelamento grátis.
           </div>
        </div>
      </form>
    </div>
  );
};