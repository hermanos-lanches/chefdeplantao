import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Check } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';

export const Plans: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col p-6 relative">
      <header className="flex justify-between items-center mb-8">
         <button onClick={() => navigate(-1)} className="h-10 w-10 bg-surface-dark rounded-full flex items-center justify-center border border-white/10 hover:bg-white/10">
            <X size={20} />
         </button>
         <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Chef de Plantão</span>
         <button className="text-sm font-bold text-gray-400">Restaurar</button>
      </header>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold leading-tight mb-2">
          Escolha o plano ideal<br/>para seu negócio
        </h1>
        <p className="text-gray-400 text-sm">Desbloqueie todo o potencial da sua equipe</p>
      </div>

      <div className="relative">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-b from-primary to-orange-600 rounded-3xl blur opacity-20"></div>
        
        <div className="relative bg-[#1c1c1e] rounded-3xl p-1 border border-primary/50">
           {/* Recommended Tag */}
           <div className="absolute right-0 top-0">
             <div className="bg-gradient-to-r from-primary to-orange-600 text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-bl-xl rounded-tr-2xl tracking-wider">
               Recomendado
             </div>
           </div>

           <div className="p-6 pt-8">
              <h2 className="text-xl font-bold mb-2">Plano Empresarial</h2>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-display font-bold text-white">R$ 149</span>
                <span className="text-xl font-bold text-white">,00</span>
                <span className="text-gray-400 text-sm ml-1">/mês</span>
              </div>
              <p className="text-xs text-primary mb-6">Economize R$ 400/ano no plano anual</p>
              
              <div className="h-px bg-white/5 w-full mb-6"></div>

              <ul className="space-y-4 mb-8">
                {[
                  'Publicação Ilimitada de Vagas',
                  'Gestão de Escala Visual',
                  'Banco de Talentos Exclusivo',
                  'Botão SOS Emergência liberado'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-primary" />
                    </div>
                    <span className="text-sm text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => navigate('/restaurant/checkout')}
                fullWidth 
                className="h-14 text-base bg-[#b8530d] hover:bg-[#a34405] shadow-lg shadow-orange-900/20 border border-white/5"
              >
                Assinar Plano Empresarial
              </Button>
           </div>
        </div>
      </div>

      <div className="mt-6 bg-surface-dark border border-white/5 rounded-2xl p-4 flex items-center justify-between">
         <div>
            <h3 className="font-bold text-white text-sm">Vaga Avulsa</h3>
            <div className="flex items-baseline gap-1">
               <span className="text-lg font-bold text-white">R$ 39,90</span>
               <span className="text-xs text-gray-500">/vaga</span>
            </div>
         </div>
         <button className="px-4 py-2 rounded-lg border border-white/20 text-xs font-bold hover:bg-white/5 transition-colors">
            Comprar Vaga Única
         </button>
      </div>

      <div className="mt-auto pt-8 flex flex-col items-center gap-4">
         <div className="flex items-center gap-2 text-gray-500 text-xs">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            Cancele quando quiser. Pagamento Seguro.
         </div>
         <div className="flex gap-4 opacity-50 grayscale">
            <span className="material-symbols-outlined text-3xl">lock</span>
            <span className="font-display font-bold text-2xl">VISA</span>
            <div className="flex -space-x-2">
               <div className="h-6 w-6 rounded-full bg-white/50"></div>
               <div className="h-6 w-6 rounded-full bg-white/30"></div>
            </div>
         </div>
         <div className="flex gap-4 text-[10px] text-gray-600">
            <a href="#">Termos de Uso</a>
            <span>•</span>
            <a href="#">Política de Privacidade</a>
         </div>
      </div>
    </div>
  );
};