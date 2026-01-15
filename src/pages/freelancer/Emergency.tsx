import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

export const Emergency: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-dark relative flex flex-col border-[6px] border-red-600 rounded-lg overflow-hidden">
      
      {/* Top Warning Bar */}
      <div className="bg-red-600 px-6 py-3 flex items-center justify-center gap-2 animate-pulse">
        <span className="material-symbols-outlined text-white font-bold filled">warning</span>
        <span className="text-white font-bold uppercase tracking-widest text-xs">Alerta de Emergência</span>
      </div>

      <div className="p-6 flex flex-col items-center">
        <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">timer</span>
          Oferta Expira Em
        </span>

        {/* Countdown Timer */}
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-surface-dark border border-white/10 rounded-xl w-20 h-20 flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
            <span className="text-4xl font-display font-bold text-white">04</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase mt-1">Min</span>
          </div>
          <span className="text-2xl text-gray-600 font-bold">:</span>
          <div className="bg-[#2a0e0e] border border-red-500/30 rounded-xl w-20 h-20 flex flex-col items-center justify-center shadow-lg shadow-red-900/20 relative overflow-hidden">
            <span className="text-4xl font-display font-bold text-red-500">59</span>
            <span className="text-[10px] text-red-500/70 font-bold uppercase mt-1">Seg</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative">
        {/* Background Image with blur */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>
        </div>

        <div className="relative z-10 px-6 pt-4">
          <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 mb-6">
            <span className="material-symbols-outlined text-orange-500 text-sm">location_on</span>
            <span className="text-xs font-bold text-white">Bistro Paris 6 - Jardins (2km)</span>
          </div>

          <div className="mb-6">
            <span className="inline-block bg-red-500/20 text-red-500 text-[10px] font-bold px-2 py-1 rounded border border-red-500/20 mb-3">
              ● ALTA PRIORIDADE
            </span>
            <h1 className="text-3xl font-display font-bold text-white leading-tight">
              Restaurante Precisa de Cozinheiro <span className="text-primary italic">AGORA!</span>
            </h1>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            A equipe está desfalcada. O gerente precisa de confirmação imediata para o turno da noite.
          </p>

          {/* Offer Card */}
          <div className="bg-surface-dark/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl relative overflow-hidden mb-8">
             <div className="absolute top-0 right-0 p-4">
                <div className="bg-green-600/20 border border-green-500/30 text-green-500 text-[10px] font-bold px-3 py-2 rounded-lg text-center leading-tight">
                  BÔNUS ATIVO<br/>
                  <span className="text-xs">+ R$ 50,00</span>
                </div>
             </div>

             <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">VALOR TOTAL</p>
             <div className="flex items-baseline gap-1 mb-4">
               <span className="text-4xl font-display font-bold text-white">R$ 250</span>
               <span className="text-lg text-gray-500 font-medium">,00</span>
             </div>

             <div className="h-px w-full bg-white/5 mb-4"></div>

             <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-500 text-sm">payments</span>
                  <span className="text-xs text-gray-300 font-medium">Pagamento Imediato</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-500 text-sm">verified_user</span>
                  <span className="text-xs text-gray-300 font-medium">Vaga Garantida</span>
                </div>
             </div>
          </div>

          <button className="w-full bg-[#d46211] hover:bg-[#b8530d] text-white font-extrabold text-lg py-4 rounded-xl shadow-[0_4px_14px_0_rgba(224,89,21,0.39)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 mb-4 uppercase">
            EU POSSO IR AGORA!
            <span className="material-symbols-outlined font-bold">arrow_forward</span>
          </button>

          <button onClick={() => navigate(-1)} className="w-full flex items-center justify-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider py-4 hover:text-gray-300 transition-colors">
            <X size={14} />
            Não posso atender agora
          </button>
        </div>
      </div>
    </div>
  );
};