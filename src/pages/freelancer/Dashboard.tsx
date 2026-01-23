import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../../components/layout/BottomNav.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { ConsentModal } from '../../components/ui/ConsentModal.tsx';
import { VerificationStatus } from '../../components/features/VerificationStatus.tsx';
import { authService } from '../../lib/authService.ts';
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
  
  // Estados para os Modais de Consentimento
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
      <div className="bg-[#0f0f10] min-h-screen flex items-center justify-center">
        <Loader2 className="text-orange-500 animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f10] min-h-screen pb-32 relative overflow-x-hidden">
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

      <header className="sticky top-0 z-30 bg-[#0f0f10]/80 backdrop-blur-xl px-6 pt-14 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 rounded-3xl overflow-hidden border border-white/10">
            <img 
              src={user?.photoUrl || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=f97316&color=fff`} 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-[#0f0f10]"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-400">Bem-vindo de volta,</span>
            <h1 className="text-xl font-bold text-white">{user?.name.split(' ')[0] || 'Chef'}</h1>
          </div>
        </div>
        <button className="relative h-12 w-12 flex items-center justify-center rounded-3xl bg-[#1c1c1e] border border-white/5">
          <Bell size={22} className="text-gray-300" />
          <span className="absolute top-3.5 right-3.5 h-2.5 w-2.5 rounded-full bg-orange-500 border-2 border-[#1c1c1e]"></span>
        </button>
      </header>

      <main className="px-6 space-y-8">
        {user?.role === 'professional' && (
          <section>
            <VerificationStatus 
              status={(user as any).verification_status || 'pending'} 
            />
          </section>
        )}

        <section className="grid grid-cols-2 gap-4">
          <div className="bg-[#1c1c1e] p-5 rounded-3xl border border-white/5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                <Star size={18} className="text-orange-500 fill-orange-500" />
              </div>
              <span className="text-xs font-bold text-gray-400">Meu Score</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{user?.rating || '5.0'}</span>
                <span className="text-sm text-gray-500">/ 5.0</span>
              </div>
              <p className="text-[11px] text-green-500 font-bold mt-1">Perfil em destaque</p>
            </div>
          </div>

          <div className="bg-[#1c1c1e] p-5 rounded-3xl border border-white/5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-2xl bg-green-500/10 flex items-center justify-center">
                <Banknote size={18} className="text-green-500" />
              </div>
              <span className="text-xs font-bold text-gray-400">Saldo Carteira</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-white">{formatCurrency(balance || 0)}</span>
              <p className="text-[11px] text-gray-500 font-bold mt-1">Disponível para saque</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Vagas Disponíveis</h2>
            <button className="text-sm font-bold text-orange-500" onClick={() => navigate('/freelancer/jobs')}>Ver todas</button>
          </div>

          <div className="space-y-6">
            {jobs && jobs.length > 0 ? jobs.map((job) => (
              <div key={job.id} className="relative group overflow-hidden rounded-[32px] bg-[#1c1c1e] border border-white/5 shadow-2xl">
                <div className="absolute inset-0 z-0">
                  <img src={job.restaurantLogo || 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070'} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] via-[#1c1c1e]/60 to-transparent"></div>
                </div>

                <div className="relative z-10 p-6 space-y-6">
                  <div className="flex justify-between items-start">
                    <Badge variant="neutral" className="bg-black/40 backdrop-blur-md border-white/10 py-2 px-4 rounded-2xl">
                      {new Date(job.date).toLocaleDateString('pt-BR', { weekday: 'short', hour: '2-digit', minute: '2-digit' }).toUpperCase()}
                    </Badge>
                    <div className="bg-orange-500 text-white font-bold px-4 py-2 rounded-2xl shadow-lg">
                      {formatCurrency(job.price)}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white leading-tight">{job.restaurantName}</h3>
                      <p className="text-gray-300 font-medium mt-1">{job.role}</p>
                    </div>
                    <div className="h-14 w-14 rounded-2xl overflow-hidden border border-white/20 shadow-xl">
                      <img src={job.restaurantLogo || `https://ui-avatars.com/api/?name=${job.restaurantName}&background=f97316&color=fff`} className="w-full h-full object-cover" alt="" />
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
                    className="rounded-[20px] h-16 text-lg bg-orange-500 hover:bg-orange-600"
                    onClick={() => acceptJob.mutate(job.id)}
                    disabled={acceptJob.isPending}
                  >
                    {acceptJob.isPending ? 'Processando...' : 'Aceitar Vaga'}
                  </Button>
                </div>
              </div>
            )) : (
              <div className="text-center py-10 bg-[#1c1c1e] rounded-[32px] border border-dashed border-white/10">
                <p className="text-gray-500 font-bold">Nenhuma vaga disponível no momento.</p>
                <p className="text-xs text-gray-600 mt-2">Fique de olho! Novas oportunidades surgem a todo instante.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};
