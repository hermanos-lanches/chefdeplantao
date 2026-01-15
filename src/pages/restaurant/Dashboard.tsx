import React from 'react';
import { formatCurrency } from '../../lib/utils.ts';

export const Dashboard: React.FC = () => {
  return (
    <div className="bg-background-dark min-h-screen text-white pb-24 relative overflow-hidden">
      <header className="flex items-center justify-between p-4 pt-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-surface-highlight flex items-center justify-center overflow-hidden border border-white/10">
            <img src="https://i.pravatar.cc/150?u=manager" alt="Manager" className="h-full w-full object-cover" />
          </div>
          <div>
            <h1 className="text-sm text-gray-400 font-medium leading-tight">Olá, Marcos</h1>
            <p className="text-base font-bold leading-tight">Le Bistrot Parisien</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-red-600 hover:bg-red-700 text-white pl-2 pr-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-red-500/50 flex items-center gap-1 transition-all">
            <span className="material-symbols-outlined text-[18px]">e911_emergency</span>
            SOS EMERGÊNCIA
          </button>
          <button className="text-white p-2 rounded-full hover:bg-white/10 relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary"></span>
          </button>
        </div>
      </header>

      <div className="mx-4 mt-2">
        <div className="bg-red-900/30 border border-red-500/40 rounded-xl p-4 flex items-start gap-3 shadow-lg backdrop-blur-sm">
          <span className="material-symbols-outlined text-red-500 mt-0.5 animate-pulse">error</span>
          <div>
            <h3 className="text-red-100 font-bold text-sm">Assinatura Inativa</h3>
            <p className="text-red-200/80 text-xs mt-1 leading-relaxed">Sua assinatura está inativa. Reative para publicar vagas.</p>
          </div>
          <button className="ml-auto text-red-400 hover:text-red-300">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>

      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">event_upcoming</span>
            Próximos Turnos
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface-highlight p-3 rounded-2xl border border-white/5 relative overflow-hidden shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-md">Hoje</span>
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-surface-dark p-0.5 border border-white/10">
                <img src="https://i.pravatar.cc/150?u=ana" alt="Ana" className="h-full w-full rounded-full object-cover grayscale opacity-80" />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">Ana F.</p>
                <p className="text-[10px] text-primary font-medium mt-0.5">18:00 - 23:00</p>
              </div>
            </div>
          </div>
          <div className="bg-surface-highlight p-3 rounded-2xl border border-white/5 relative overflow-hidden shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-md">Amanhã</span>
              <div className="h-1.5 w-1.5 rounded-full bg-orange-400"></div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-surface-dark p-0.5 border border-white/10">
                <img src="https://i.pravatar.cc/150?u=carlos" alt="Carlos" className="h-full w-full rounded-full object-cover grayscale opacity-80" />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">Carlos S.</p>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5">11:00 - 15:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 relative">
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="bg-surface-highlight/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-2xl">
            <span className="material-symbols-outlined text-gray-400">lock</span>
            <p className="text-sm font-medium text-white">Gestão indisponível</p>
          </div>
        </div>
        <div className="filter blur-sm opacity-40 select-none pointer-events-none">
          <div className="px-4 flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold leading-tight flex items-center gap-2">
              Gestão de Escala
              <span className="text-xs bg-surface-highlight px-2 py-0.5 rounded text-gray-400">Semana 42</span>
            </h3>
            <button className="text-primary text-sm font-bold">Ver Completo</button>
          </div>
          <div className="flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar">
            {/* Mocked days */}
            {['SEG', 'TER', 'QUA', 'QUI', 'SEX'].map((day, i) => (
              <div key={day} className="flex-shrink-0 flex flex-col items-center gap-2 min-w-[60px]">
                <span className={`text-xs font-bold ${i === 1 ? 'text-primary' : 'text-gray-500'}`}>{day}</span>
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${i === 1 ? 'bg-primary shadow-lg shadow-primary/20 text-white' : 'bg-surface-highlight border border-white/5 text-gray-400'}`}>
                  <span className="text-lg font-bold">{12 + i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <nav className="fixed bottom-0 left-0 right-0 bg-surface-highlight/95 backdrop-blur-xl border-t border-white/5 pb-8 pt-4 px-6 flex justify-between items-center z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <button className="flex flex-col items-center gap-1 text-primary group transition-colors">
          <span className="material-symbols-outlined fill-1 text-[26px]">home</span>
          <span className="text-[10px] font-medium tracking-wide">Início</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors">
          <span className="material-symbols-outlined text-[26px]">calendar_month</span>
          <span className="text-[10px] font-medium tracking-wide">Escala</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors">
          <span className="material-symbols-outlined text-[26px]">group</span>
          <span className="text-[10px] font-medium tracking-wide">Profissionais</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors">
          <span className="material-symbols-outlined text-[26px]">person</span>
          <span className="text-[10px] font-medium tracking-wide">Perfil</span>
        </button>
      </nav>
    </div>
  );
};