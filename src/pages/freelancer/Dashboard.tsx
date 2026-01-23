import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../../components/layout/BottomNav.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { authService } from '../../lib/authService.ts';
import { jobsService } from '../../lib/jobsService.ts';
import { formatCurrency, cn } from '../../lib/utils.ts';
import { Bell, Star, Banknote, MapPin, Clock, QrCode, ChevronRight, Loader2 } from 'lucide-react';
import { User, Job } from '../../types';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        const availableJobs = await jobsService.getAvailableJobs();
        setJobs(availableJobs);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Loader2 className="text-primary animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-32 relative overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl px-6 pt-14 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 rounded-3xl overflow-hidden border border-white/10">
            <img 
              src={user?.photoUrl || 'https://i.pravatar.cc/150?u=thiago'} 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-background"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-400">Bem-vindo de volta,</span>
            <h1 className="text-xl font-bold text-white">Chef {user?.name.split(' ')[0] || 'Thiago'}</h1>
          </div>
        </div>
        <button className="relative h-12 w-12 flex items-center justify-center rounded-3xl bg-card border border-white/5">
          <Bell size={22} className="text-gray-300" />
          <span className="absolute top-3.5 right-3.5 h-2.5 w-2.5 rounded-full bg-primary border-2 border-card"></span>
        </button>
      </header>

      <main className="px-6 space-y-8">
        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-card p-5 rounded-3xl border border-white/5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Star size={18} className="text-primary fill-primary" />
              </div>
              <span className="text-xs font-bold text-gray-400">Meu Score</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{user?.rating || '4.9'}</span>
                <span className="text-sm text-gray-500">/ 5.0</span>
              </div>
              <p className="text-[11px] text-green-500 font-bold mt-1">Top 5% da região</p>
            </div>
          </div>

          <div className="bg-card p-5 rounded-3xl border border-white/5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-2xl bg-green-500/10 flex items-center justify-center">
                <Banknote size={18} className="text-green-500" />
              </div>
              <span className="text-xs font-bold text-gray-400">Ganhos da Semana</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-white">R$ 1.200</span>
              <p className="text-[11px] text-gray-500 font-bold mt-1">+ R$ 180 pendente</p>
            </div>
          </div>
        </section>

        {/* Vagas Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Vagas Disponíveis</h2>
            <button className="text-sm font-bold text-primary">Ver todas</button>
          </div>

          <div className="space-y-6">
            {jobs.length > 0 ? jobs.map((job) => (
              <div key={job.id} className="relative group overflow-hidden rounded-[32px] bg-card border border-white/5 shadow-2xl">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <img src={job.restaurantLogo || 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070'} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent"></div>
                </div>

                <div className="relative z-10 p-6 space-y-6">
                  <div className="flex justify-between items-start">
                    <Badge variant="neutral" className="bg-black/40 backdrop-blur-md border-white/10 py-2 px-4 rounded-2xl">
                      {new Date(job.date).toLocaleDateString('pt-BR', { weekday: 'short', hour: '2-digit', minute: '2-digit' }).toUpperCase()}
                    </Badge>
                    <div className="bg-primary text-white font-bold px-4 py-2 rounded-2xl shadow-lg">
                      {formatCurrency(job.price)}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white leading-tight">{job.restaurantName}</h3>
                      <p className="text-gray-300 font-medium mt-1">{job.role}</p>
                    </div>
                    <div className="h-14 w-14 rounded-2xl overflow-hidden border border-white/20 shadow-xl">
                      <img src={job.restaurantLogo || 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=100&h=100&fit=crop'} className="w-full h-full object-cover" alt="" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl border border-white/5">
                      <MapPin size={14} className="text-gray-400" />
                      <span className="text-xs font-bold text-gray-300">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl border border-white/5">
                      <Clock size={14} className="text-gray-400" />
                      <span className="text-xs font-bold text-gray-300">{job.duration}</span>
                    </div>
                  </div>

                  <Button 
                    fullWidth 
                    variant="primary" 
                    size="lg" 
                    className="rounded-[20px] h-16 text-lg"
                    onClick={() => user && jobsService.acceptJob(job.id, user.id)}
                  >
                    Aceitar Vaga
                  </Button>
                </div>
              </div>
            )) : (
              <div className="text-center py-10">
                <p className="text-gray-500 font-bold">Nenhuma vaga disponível no momento.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Active Shift Floating Card */}
      <div className="fixed bottom-28 left-6 right-6 z-40">
        <div 
          onClick={() => navigate('/freelancer/check-in')}
          className="bg-primary p-4 rounded-[28px] shadow-2xl shadow-primary/30 flex items-center gap-4 cursor-pointer active:scale-95 transition-all"
        >
          <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-primary shadow-inner">
            <QrCode size={28} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">Plantão Ativo • Hoje</p>
            <h4 className="text-lg font-bold text-white">Check-in: Le Cordon Bleu</h4>
          </div>
          <div className="h-10 w-10 rounded-full bg-black/10 flex items-center justify-center text-white">
            <ChevronRight size={24} />
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
