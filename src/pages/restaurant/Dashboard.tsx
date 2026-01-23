import React from 'react';
import { Bell, AlertCircle, Calendar, Users, User, Home, Plus, Lock, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { cn } from '../../lib/utils.ts';

export const Dashboard: React.FC = () => {
  return (
    <div className="bg-background min-h-screen text-white pb-32 relative overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl px-6 pt-14 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 rounded-3xl overflow-hidden border border-white/10">
            <img src="https://i.pravatar.cc/150?u=manager" alt="Manager" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-400">Olá, Marcos</span>
            <h1 className="text-xl font-bold text-white">Le Bistrot Parisien</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-2xl text-xs font-black shadow-lg shadow-red-600/20 flex items-center gap-2 transition-all active:scale-95">
            <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
            SOS EMERGÊNCIA
          </button>
          <button className="relative h-12 w-12 flex items-center justify-center rounded-3xl bg-card border border-white/5">
            <Bell size={22} className="text-gray-300" />
            <span className="absolute top-3.5 right-3.5 h-2.5 w-2.5 rounded-full bg-primary border-2 border-card"></span>
          </button>
        </div>
      </header>

      <main className="px-6 space-y-8">
        {/* Inactive Subscription Alert */}
        <section>
          <div className="bg-red-950/20 border border-red-500/20 rounded-[32px] p-6 flex items-center gap-4 shadow-2xl backdrop-blur-sm group cursor-pointer active:scale-[0.98] transition-all">
            <div className="h-12 w-12 rounded-2xl bg-red-500/20 flex items-center justify-center shrink-0">
              <AlertCircle className="text-red-500" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-red-100 font-bold text-base">Assinatura Inativa</h3>
              <p className="text-red-200/60 text-xs font-medium mt-0.5">Reative para publicar novas vagas.</p>
            </div>
            <ChevronRight className="text-red-500/50 group-hover:text-red-500 transition-colors" size={20} />
          </div>
        </section>

        {/* Next Shifts */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar size={20} className="text-primary" />
              Próximos Turnos
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card p-5 rounded-[28px] border border-white/5 space-y-4 relative overflow-hidden">
              <div className="flex justify-between items-center">
                <Badge variant="neutral" className="bg-white/5 border-white/5 text-[10px] px-2.5 py-1">HOJE</Badge>
                <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl overflow-hidden border border-white/10 grayscale opacity-70">
                  <img src="https://i.pravatar.cc/150?u=ana" alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Ana F.</p>
                  <p className="text-[11px] text-primary font-bold mt-0.5">18:00 - 23:00</p>
                </div>
              </div>
            </div>
            <div className="bg-card p-5 rounded-[28px] border border-white/5 space-y-4 relative overflow-hidden">
              <div className="flex justify-between items-center">
                <Badge variant="neutral" className="bg-white/5 border-white/5 text-[10px] px-2.5 py-1">AMANHÃ</Badge>
                <div className="h-2 w-2 rounded-full bg-orange-400"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl overflow-hidden border border-white/10 grayscale opacity-70">
                  <img src="https://i.pravatar.cc/150?u=carlos" alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Carlos S.</p>
                  <p className="text-[11px] text-gray-500 font-bold mt-0.5">11:00 - 15:00</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Locked Sections */}
        <section className="space-y-8 opacity-40 grayscale pointer-events-none select-none">
          <div className="space-y-4 relative">
             <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="bg-card/90 backdrop-blur-xl border border-white/10 rounded-3xl px-6 py-4 flex items-center gap-3 shadow-2xl">
                  <Lock size={20} className="text-gray-400" />
                  <p className="text-sm font-bold text-white">Gestão indisponível</p>
                </div>
              </div>
              <h2 className="text-xl font-bold text-white">Gestão de Escala</h2>
              <div className="bg-card h-32 rounded-[32px] border border-white/5"></div>
          </div>

          <div className="space-y-4 relative">
             <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="bg-card/90 backdrop-blur-xl border border-white/10 rounded-3xl px-6 py-4 flex items-center gap-3 shadow-2xl">
                  <Lock size={20} className="text-gray-400" />
                  <p className="text-sm font-bold text-white">Serviço indisponível</p>
                </div>
              </div>
              <h2 className="text-xl font-bold text-white">SOS Reposição</h2>
              <div className="bg-card h-24 rounded-[32px] border border-white/5"></div>
          </div>
        </section>

        {/* Available Candidates */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-white">Candidatos Disponíveis</h2>
          <div className="space-y-4">
            {[
              { name: 'Carlos Silva', role: 'Sous Chef • 5 anos exp.', img: 'https://i.pravatar.cc/150?u=carlos2' },
              { name: 'Ana Ferreira', role: 'Cozinheira • Especialista Grill', img: 'https://i.pravatar.cc/150?u=ana2' },
              { name: 'Roberto Lima', role: 'Auxiliar • Indisponível', img: 'https://i.pravatar.cc/150?u=roberto', status: 'OCUPADO' }
            ].map((candidate, i) => (
              <div key={i} className="bg-card p-5 rounded-[32px] border border-white/5 flex items-center gap-4 group">
                <div className="h-16 w-16 rounded-2xl overflow-hidden border border-white/10 grayscale">
                  <img src={candidate.img} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white">{candidate.name}</h4>
                    <div className="h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check size={10} className="text-white" strokeWidth={4} />
                    </div>
                  </div>
                  <p className="text-xs font-medium text-gray-500 mt-0.5">{candidate.role}</p>
                </div>
                {candidate.status ? (
                  <span className="text-[10px] font-black text-gray-600 tracking-widest">{candidate.status}</span>
                ) : (
                  <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-600">
                    <Lock size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-28 right-6 h-16 w-16 bg-card border border-white/10 rounded-3xl shadow-2xl flex items-center justify-center text-white active:scale-95 transition-all z-40">
        <Plus size={32} />
      </button>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-2xl border-t border-white/5 pb-8 pt-3">
        <div className="grid grid-cols-4 h-16 max-w-md mx-auto px-4">
          <NavItem icon={<Home size={24} />} label="Início" active={true} />
          <NavItem icon={<Calendar size={24} />} label="Escala" active={false} />
          <NavItem icon={<Users size={24} />} label="Profissionais" active={false} />
          <NavItem icon={<User size={24} />} label="Perfil" active={false} />
        </div>
      </nav>
    </div>
  );
};

const NavItem = ({ icon, label, active }: { icon: React.ReactNode; label: string; active: boolean }) => (
  <button className="flex flex-col items-center justify-center gap-1.5 group">
    <div className={cn(
      "transition-all duration-300",
      active ? "text-primary scale-110" : "text-gray-500 group-hover:text-gray-300"
    )}>
      {icon}
    </div>
    <span className={cn(
      "text-[10px] font-bold transition-colors",
      active ? "text-primary" : "text-gray-500 group-hover:text-gray-300"
    )}>{label}</span>
  </button>
);

function Check({ size, className, strokeWidth }: any) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth || 2} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
