import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../../components/layout/BottomNav.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { ConsentModal } from '../../components/ui/ConsentModal.tsx';
import { VerificationStatus } from '../../components/features/VerificationStatus.tsx';
import { useJobs } from '../../hooks/useJobs.ts';
import { useAuth } from '../../hooks/useAuth.ts';
import { useWallet } from '../../hooks/useWallet.ts';
import { formatCurrency } from '../../lib/utils.ts';
import { Bell, Star, Banknote, MapPin, Clock, QrCode, ChevronRight, Loader2 } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { jobs, isLoading: isJobsLoading, acceptJob } = useJobs();
  const { balance, isLoading: isWalletLoading } = useWallet();
  
  const [showLocationConsent, setShowLocationConsent] = useState(false);
  const [showIdentityConsent, setShowIdentityConsent] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && user && user.role === 'professional') {
      const hasSeenLocation = localStorage.getItem('consent_location');
      if (!hasSeenLocation) {
        setShowLocationConsent(true);
      }
    }
  }, [user, isAuthLoading]);

  const handleLocationAccept = () => {
    localStorage.setItem('consent_location', 'true');
    setShowLocationConsent(false);
    if (user?.role === 'professional' && !localStorage.getItem('consent_identity')) {
      setShowIdentityConsent(true);
    }
  };

  const handleIdentityAccept = () => {
    localStorage.setItem('consent_identity', 'true');
    setShowIdentityConsent(false);
    navigate('/freelancer/profile');
  };

  if (isAuthLoading || isJobsLoading || isWalletLoading) {
    return (
      <div className="bg-[#14110F] min-h-screen flex items-center justify-center">
        <Loader2 className="text-orange-500 animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="bg-[#14110F] min-h-screen pb-40 relative overflow-x-hidden font-sans">
      <ConsentModal 
        isOpen={showLocationConsent} 
        type="location" 
        onClose={() => setShowLocationConsent(false)} 
        onAccept={handleLocationAccept} 
      />
      <ConsentModal 
        isOpen={showIdentityConsent} 
        type="identity" 
        onClose={() => setShowIdentityConsent(false)} 
        onAccept={handleIdentityAccept} 
      />

      {/* Header - Fiel ao Layout */}
      <header className="sticky top-0 z-30 bg-[#14110F]/80 backdrop-blur-2xl px-6 pt-14 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 rounded-[24px] overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src={user?.photoUrl || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=f97316&color=fff`} 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-1.5 right-1.5 h-4 w-4 rounded-full bg-green-500 border-2 border-[#14110F]"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">Bem-vindo de volta,</span>
            <h1 className="text-2xl font-bold text-white tracking-tight">Chef {user?.name.split(' ')[0] || 'Thiago'}</h1>
          </div>
        </div>
        <button className="relative h-14 w-14 flex items-center justify-center rounded-[24px] bg-[#1C1917] border border-white/5 shadow-xl">
          <Bell size={24} className="text-gray-300" />
          <span className="absolute top-4 right-4 h-3 w-3 rounded-full bg-orange-500 border-2 border-[#1C1917]"></span>
        </button>
      </header>

      <main className="px-6 space-y-10">
        {/* Stats Grid - Fiel ao Layout */}
        <section className="grid grid-cols-2 gap-5">
          <div className="bg-[#1C1917] p-6 rounded-[32px] border border-white/5 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                <Star size={20} className="text-orange-500 fill-orange-500" />
              </div>
              <span className="text-sm font-bold text-gray-400">Meu Score</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-bold text-white tracking-tighter">{user?.rating || '4.9'}</span>
                <span className="text-base text-gray-600 font-medium">/ 5.0</span>
              </div>
              <p className="text-xs text-green-500 font-black mt-2 tracking-wide">Top 5% da região</p>
            </div>
          </div>

          <div className="bg-[#1C1917] p-6 rounded-[32px] border border-white/5 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-green-500/10 flex items-center justify-center">
                <Banknote size={20} className="text-green-500" />
              </div>
              <span className="text-sm font-bold text-gray-400">Ganhos da Semana</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xs font-bold text-gray-500 mr-1">R$</span>
                <span className="text-4xl font-bold text-white tracking-tighter">{balance ? (balance/100).toLocaleString('pt-BR') : '1.200'}</span>
              </div>
              <p className="text-xs text-gray-500 font-bold mt-2">+ R$ 180 pendente</p>
            </div>
          </div>
        </section>

        {/* Vagas Section - Fiel ao Layout */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white tracking-tight">Vagas Disponíveis</h2>
            <button className="text-sm font-black text-orange-500 uppercase tracking-widest" onClick={() => navigate('/freelancer/jobs')}>Ver todas</button>
          </div>

          <div className="space-y-8">
            {jobs && jobs.length > 0 ? jobs.map((job) => (
              <div key={job.id} className="relative group overflow-hidden rounded-[40px] bg-[#1C1917] border border-white/5 shadow-2xl transition-all active:scale-[0.98]">
                <div className="absolute inset-0 z-0">
                  <img src={job.restaurantLogo || 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070'} className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-1000" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/80 to-transparent"></div>
                </div>

                <div className="relative z-10 p-8 space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 py-2.5 px-5 rounded-2xl text-[11px] font-black text-white tracking-widest uppercase">
                      {new Date(job.date).toLocaleDateString('pt-BR', { weekday: 'short', hour: '2-digit', minute: '2-digit' }).replace('.', '')}
                    </div>
                    <div className="bg-orange-500 text-white font-black px-5 py-2.5 rounded-2xl shadow-xl shadow-orange-500/20 text-sm">
                      {formatCurrency(job.price)}
                    </div>
                  </div>

                  <div className="flex items-center gap-5 pt-4">
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-white leading-tight tracking-tight">{job.restaurantName}</h3>
                      <p className="text-gray-400 font-bold mt-1.5 text-lg">{job.role} • {job.specialty || 'Cozinha Quente'}</p>
                    </div>
                    <div className="h-16 w-16 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                      <img src={job.restaurantLogo || `https://ui-avatars.com/api/?name=${job.restaurantName}&background=f97316&color=fff`} className="w-full h-full object-cover" alt="" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2.5 bg-white/5 px-4 py-2.5 rounded-2xl border border-white/5 backdrop-blur-md">
                      <MapPin size={16} className="text-gray-500" />
                      <span className="text-xs font-black text-gray-300 uppercase tracking-wider">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2.5 bg-white/5 px-4 py-2.5 rounded-2xl border border-white/5 backdrop-blur-md">
                      <Clock size={16} className="text-gray-500" />
                      <span className="text-xs font-black text-gray-300 uppercase tracking-wider">{job.duration}</span>
                    </div>
                  </div>

                  <Button 
                    fullWidth 
                    className="rounded-[24px] h-20 text-xl font-black bg-white text-black hover:bg-gray-100 shadow-2xl transition-all active:scale-95"
                    onClick={() => acceptJob.mutate(job.id)}
                    disabled={acceptJob.isPending}
                  >
                    {acceptJob.isPending ? 'Processando...' : 'Aceitar Vaga'}
                  </Button>
                </div>
              </div>
            )) : (
              <div className="text-center py-16 bg-[#1C1917] rounded-[40px] border border-dashed border-white/10 shadow-inner">
                <div className="h-20 w-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Loader2 className="text-gray-700" size={32} />
                </div>
                <p className="text-gray-400 text-lg font-bold">Nenhuma vaga disponível no momento.</p>
                <p className="text-sm text-gray-600 mt-3 max-w-[240px] mx-auto leading-relaxed">Fique de olho! Novas oportunidades surgem a todo instante.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Active Shift Floating Card - Fiel ao Layout */}
      <div className="fixed bottom-32 left-6 right-6 z-40">
        <div 
          onClick={() => navigate('/freelancer/check-in')}
          className="bg-orange-500 p-5 rounded-[32px] shadow-2xl shadow-orange-500/40 flex items-center gap-5 cursor-pointer active:scale-95 transition-all group"
        >
          <div className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center text-orange-500 shadow-inner">
            <QrCode size={32} strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em] mb-1">Plantão Ativo • Hoje</p>
            <h4 className="text-xl font-bold text-white tracking-tight">Check-in: Le Cordon Bleu</h4>
          </div>
          <div className="h-12 w-12 rounded-full bg-black/10 flex items-center justify-center text-white group-hover:bg-black/20 transition-colors">
            <ChevronRight size={28} />
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
