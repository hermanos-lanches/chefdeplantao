import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../../components/layout/BottomNav.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { useAuth } from '../../hooks/useAuth.ts';
import { ChevronLeft, Edit2, Mail, Phone, Award, FileText, CheckCircle, Clock, AlertCircle, Loader2 } from 'lucide-react';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: (user as any)?.bio || '',
    specialty: (user as any)?.specialty || ''
  });

  if (isLoading) {
    return (
      <div className="bg-[#0f0f10] min-h-screen flex items-center justify-center">
        <Loader2 className="text-orange-500 animate-spin" size={48} />
      </div>
    );
  }

  const handleSave = () => {
    updateProfile.mutate(formData, {
      onSuccess: () => setIsEditing(false)
    });
  };

  const verificationStatus = (user as any)?.verification_status || 'pending';

  return (
    <div className="bg-[#0f0f10] min-h-screen pb-32">
      <header className="sticky top-0 z-50 flex items-center bg-[#0f0f10]/95 backdrop-blur-sm p-4 pb-2 justify-between border-b border-white/5">
        <button onClick={() => navigate(-1)} className="text-white flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Perfil e Documentos</h2>
        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex h-10 px-4 items-center justify-center rounded-lg hover:bg-white/5"
          disabled={updateProfile.isPending}
        >
          <p className="text-orange-500 font-bold text-base leading-normal tracking-[0.015em]">
            {updateProfile.isPending ? 'Salvando...' : (isEditing ? 'Salvar' : 'Editar')}
          </p>
        </button>
      </header>

      <main className="p-4 space-y-6">
        <div className="flex flex-col items-center gap-4 pt-2">
          <div className="relative group cursor-pointer">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full h-32 w-32 shadow-xl ring-4 ring-[#1c1c1e]"
              style={{ backgroundImage: `url(${user?.photoUrl || `https://ui-avatars.com/api/?name=${user?.name}&background=f97316&color=fff`})` }}
            ></div>
            <div className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full ring-4 ring-[#0f0f10] flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
              <Edit2 size={16} />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            {isEditing ? (
              <input 
                className="bg-[#1c1c1e] border border-white/10 rounded-lg px-3 py-1 text-white text-xl font-bold text-center focus:ring-1 focus:ring-orange-500 outline-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            ) : (
              <h1 className="text-white text-2xl font-bold leading-tight text-center">{user?.name}</h1>
            )}
            <p className="text-gray-400 text-base font-medium mt-1">Profissional Freelancer</p>
          </div>
        </div>

        <div className="w-full h-px bg-white/5 my-2"></div>

        <div className="flex flex-col gap-4">
          <h3 className="text-white text-lg font-bold px-1">Informações de Contato</h3>
          <div className="bg-[#1c1c1e] rounded-xl p-1 shadow-sm border border-white/5">
            <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
              <Mail size={18} className="text-gray-500" />
              <div>
                <span className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider block">E-mail</span>
                <p className="text-white text-sm font-medium">{user?.email}</p>
              </div>
            </div>
            <div className="px-4 py-3 flex items-center gap-3">
              <Phone size={18} className="text-gray-500" />
              <div>
                <span className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider block">Telefone</span>
                <p className="text-white text-sm font-medium">{(user as any)?.phone || 'Não informado'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-white text-lg font-bold px-1">Informações Profissionais</h3>
          <div className="bg-[#1c1c1e] rounded-xl p-4 shadow-sm flex flex-col gap-4 border border-white/5">
            <label className="flex flex-col w-full">
              <span className="text-white text-sm font-semibold mb-2">Especialidade</span>
              <div className="flex items-center gap-2 bg-[#0f0f10] rounded-lg px-3 py-3 border border-white/10">
                <Award size={18} className="text-gray-500" />
                {isEditing ? (
                  <input 
                    className="flex-1 bg-transparent border-none p-0 text-white placeholder:text-gray-600 focus:ring-0 text-sm" 
                    type="text" 
                    placeholder="Ex: Cozinha Italiana, Grelhados"
                    value={formData.specialty}
                    onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                  />
                ) : (
                  <span className="text-white text-sm">{(user as any)?.specialty || 'Defina sua especialidade'}</span>
                )}
              </div>
            </label>
            <label className="flex flex-col w-full">
              <span className="text-white text-sm font-semibold mb-2">Biografia</span>
              {isEditing ? (
                <textarea 
                  className="w-full bg-[#0f0f10] rounded-lg px-3 py-3 border border-white/10 focus:border-orange-500 focus:ring-0 text-white placeholder:text-gray-600 text-sm resize-none leading-relaxed" 
                  rows={3}
                  placeholder="Conte um pouco sobre sua experiência..."
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                ></textarea>
              ) : (
                <p className="text-gray-400 text-sm leading-relaxed">{(user as any)?.bio || 'Escreva uma breve biografia para atrair mais restaurantes.'}</p>
              )}
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-white text-lg font-bold">Documentação</h3>
            {verificationStatus === 'pending' && (
              <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded-md">Ação Necessária</span>
            )}
          </div>
          
          <div className={cn(
            "group relative overflow-hidden bg-[#1c1c1e] rounded-xl p-5 shadow-sm border-l-4 border-t border-r border-b border-white/5",
            verificationStatus === 'verified' ? "border-l-green-500" : 
            verificationStatus === 'in_review' ? "border-l-yellow-500" : "border-l-red-500"
          )}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  verificationStatus === 'verified' ? "bg-green-500/10 text-green-500" : 
                  verificationStatus === 'in_review' ? "bg-yellow-500/10 text-yellow-500" : "bg-red-500/10 text-red-500"
                )}>
                  <FileText size={24} />
                </div>
                <div>
                  <p className="text-white font-bold text-base">Identidade (RG/CNH)</p>
                  <p className="text-xs text-gray-400">
                    {verificationStatus === 'verified' ? 'Documento validado' : 
                     verificationStatus === 'in_review' ? 'Em análise' : 'Aguardando envio'}
                  </p>
                </div>
              </div>
              <div className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-md",
                verificationStatus === 'verified' ? "bg-green-500/10 text-green-500" : 
                verificationStatus === 'in_review' ? "bg-yellow-500/10 text-yellow-500" : "bg-red-500/10 text-red-500"
              )}>
                {verificationStatus === 'verified' ? <CheckCircle size={14} /> : 
                 verificationStatus === 'in_review' ? <Clock size={14} /> : <AlertCircle size={14} />}
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {verificationStatus === 'verified' ? 'Verificado' : 
                   verificationStatus === 'in_review' ? 'Pendente' : 'Não Enviado'}
                </span>
              </div>
            </div>
            {verificationStatus === 'pending' && (
              <Button 
                fullWidth 
                variant="ghost" 
                className="mt-2 text-orange-500 border border-orange-500/20"
                onClick={() => navigate('/freelancer/onboarding')}
              >
                Enviar Documentos
              </Button>
            )}
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};
