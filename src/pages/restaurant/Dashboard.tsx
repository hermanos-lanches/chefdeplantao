import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, AlertCircle, Calendar, Users, User, Home, Plus, Lock, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { cn } from '../../lib/utils.ts';
import { useAuth } from '../../hooks/useAuth.ts';
import { useJobs } from '../../hooks/useJobs.ts';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { jobs, isLoading: isJobsLoading } = useJobs();

  const isSubscribed = (user as any)?.subscription_status === 'active';

  if (isAuthLoading || isJobsLoading) {
    return (
      <div className="bg-[#0f0f10] min-h-screen flex items-center justify-center">
        <Loader2 className="text-orange-500 animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f10] min-h-screen text-white pb-32 relative overflow-x-hidden">
      <header className="sticky top-0 z-30 bg-[#0f0f10]/80 backdrop-blur-xl px-6 pt-14 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 rounded-3xl overflow-hidden border border-white/10">
            <img 
              src={user?.photoUrl || `https://ui-avatars.com/api/?name=${user?.name || 'Restaurante'}&background=f97316&color=fff`} 
              alt="Manager" 
              className="h-full w-full object-cover" 
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-400">Olá, {user?.name.split(' ')[0]}</span>
            <h1 className="text-xl font-bold text-white">{user?.name}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-2xl text-xs font-black shadow-lg shadow-red-600/20 flex items-center gap-2 transition-all active:scale-95">
            <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
            SOS EMERGÊNCIA
          </button>
          <button className="relative h-12 w-12 flex items-center justify-center rounded-3xl bg-[#1c1c1e] border border-white/5">
            <Bell size={22} className="text-gray-300" />
            <span className="absolute top-3.5 right-3.5 h-2.5 w-2.5 rounded-full bg-orange-500 border-2 border-[#1c1c1e]"></span>
          </button>
        </div>
      </header>

      <main className="px-6 space-y-8">
        {!isSubscribed && (
          <section onClick={() => navigate('/restaurant/plans')}>
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
        )}

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar size={20} className="text-orange-500" />
              Vagas Publicadas
            </h2>
          </div>
          <div className="space-y-4">
            {jobs && jobs.filter(j => j.restaurantId === user?.id).length > 0 ? (
              jobs.filter(j => j.restaurantId === user?.id).map(job => (
                <div key={job.id} className="bg-[#1c1c1e] p-5 rounded-[28px] border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">{job.role}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{new Date(job.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <Badge variant="neutral" className="bg-orange-500/10 text-orange-500 border-none">
                    {job.status === 'open' ? 'Aberto' : 'Preenchido'}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="bg-[#1c1c1e] p-8 rounded-[32px] border border-dashed border-white/10 text-center">
                <p className="text-gray-500 text-sm font-medium">Você ainda não publicou nenhuma vaga.</p>
                <Button 
                  variant="ghost" 
                  className="mt-4 text-orange-500 font-bold"
                  onClick={() => navigate('/restaurant/create-job')}
                  disabled={!isSubscribed}
                >
                  Criar minha primeira vaga
                </Button>
              </div>
            )}
          </div>
        </section>

        <section className={cn("space-y-8", !isSubscribed && "opacity-40 grayscale pointer-events-none select-none")}>
          <div className="space-y-4 relative">
             {!isSubscribed && (
               <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="bg-[#1c1c1e]/90 backdrop-blur-xl border border-white/10 rounded-3xl px-6 py-4 flex items-center gap-3 shadow-2xl">
                    <Lock size={20} className="text-gray-400" />
                    <p className="text-sm font-bold text-white">Gestão indisponível</p>
                  </div>
                </div>
             )}
              <h2 className="text-xl font-bold text-white">Gestão de Escala</h2>
              <div className="bg-[#1c1c1e] h-32 rounded-[32px] border border-white/5 flex items-center justify-center">
                <p className="text-gray-600 text-xs">Nenhum profissional escalado para hoje.</p>
              </div>
          </div>
        </section>
      </main>

      <button 
        onClick={() => navigate('/restaurant/create-job')}
        disabled={!isSubscribed}
        className={cn(
          "fixed bottom-28 right-6 h-16 w-16 rounded-3xl shadow-2xl flex items-center justify-center text-white active:scale-95 transition-all z-40",
          isSubscribed ? "bg-orange-500" : "bg-[#1c1c1e] border border-white/10 opacity-50"
        )}
      >
        <Plus size={32} />
      </button>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f0f10]/80 backdrop-blur-2xl border-t border-white/5 pb-8 pt-3">
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
      active ? "text-orange-500 scale-110" : "text-gray-500 group-hover:text-gray-300"
    )}>
      {icon}
    </div>
    <span className={cn(
      "text-[10px] font-bold transition-colors",
      active ? "text-orange-500" : "text-gray-500 group-hover:text-gray-300"
    )}>{label}</span>
  </button>
);
