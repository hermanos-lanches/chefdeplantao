import React from 'react';
import { BottomNav } from '../../components/layout/BottomNav.tsx';
import { myShifts } from '../../lib/mockData.ts';
import { formatCurrency } from '../../lib/utils.ts';

export const Shifts: React.FC = () => {
  return (
    <div className="bg-background-dark min-h-screen pb-24">
      <header className="sticky top-0 z-30 bg-background-dark/95 backdrop-blur-md px-6 pt-12 pb-4 border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-display font-extrabold tracking-tight text-white">Meus Plantões</h1>
            <p className="text-xs font-medium text-gray-400 mt-0.5">Gerencie sua agenda</p>
          </div>
          <button className="relative group p-2 rounded-full hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-gray-400 text-2xl">tune</span>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background-dark"></span>
          </button>
        </div>
        
        <div className="relative flex bg-surface-dark p-1.5 rounded-xl shadow-inner">
          <div className="absolute left-1.5 top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white/10 shadow-sm rounded-lg transition-all duration-300 ease-out border border-white/5"></div>
          <button className="flex-1 relative z-10 py-2 text-sm font-bold text-center text-white transition-colors">
            Próximos
          </button>
          <button className="flex-1 relative z-10 py-2 text-sm font-medium text-center text-gray-400 hover:text-white transition-colors">
            Realizados
          </button>
        </div>
      </header>

      <main className="px-6 py-6 space-y-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">A Seguir</h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary border border-primary/20">HOJE</span>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-surface-dark shadow-lg border border-white/5 group">
            <div className="h-32 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-transparent to-transparent z-10 opacity-90"></div>
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070" 
                alt="Restaurant" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute top-3 left-3 z-20 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-white text-[16px]">calendar_today</span>
                <span className="text-xs font-bold text-white">28 Out • 16:00</span>
              </div>
            </div>
            
            <div className="p-5 pt-2 relative z-20 -mt-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-display font-bold text-white leading-tight">Le Petit Bistro</h2>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="material-symbols-outlined text-primary text-[18px]">restaurant_menu</span>
                    <p className="text-sm font-medium text-primary">Sous Chef</p>
                  </div>
                </div>
                <div className="text-right bg-white/5 px-3 py-2 rounded-lg border border-white/5">
                  <p className="text-xs text-gray-400 font-medium">Ganhos Est.</p>
                  <p className="font-display font-bold text-lg text-white tracking-tight">{formatCurrency(180)}</p>
                </div>
              </div>
              
              <div className="h-px w-full bg-white/5 mb-5"></div>
              
              <div className="grid grid-cols-[1.2fr_1fr] gap-3 items-stretch">
                <div className="bg-surface-highlight rounded-xl p-3 border border-white/5 flex flex-col justify-center items-center">
                  <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-1">Início em</span>
                  <div className="font-mono text-xl font-bold text-white tracking-widest tabular-nums">
                    02:14
                  </div>
                </div>
                <button className="bg-primary hover:bg-primary-hover active:scale-95 transition-all duration-200 text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex flex-col items-center justify-center gap-1 group">
                  <span className="material-symbols-outlined group-hover:animate-bounce">login</span>
                  Fazer Check-in
                </button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Nesta Semana</h3>
          <div className="space-y-4">
            <div className="flex flex-col bg-surface-dark rounded-xl p-4 shadow-sm border border-white/5 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-700"></div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-lg bg-surface-highlight flex flex-col items-center justify-center border border-white/5">
                    <span className="text-[10px] font-bold uppercase text-gray-400">OUT</span>
                    <span className="text-xl font-display font-bold text-white">30</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-base font-bold text-white truncate">Gaucho Steakhouse</h4>
                    <span className="text-sm font-bold text-white">{formatCurrency(210)}</span>
                  </div>
                  <p className="text-sm text-primary truncate mb-1">Churrasqueiro • 18:00 - 00:00</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    Centro, 5ª Avenida
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
};