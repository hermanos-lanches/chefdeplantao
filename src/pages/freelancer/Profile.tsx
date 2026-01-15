import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../../components/layout/BottomNav.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { currentUser } from '../../lib/mockData.ts';

export const Profile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-dark min-h-screen pb-24">
      <header className="sticky top-0 z-50 flex items-center bg-background-dark/95 backdrop-blur-sm p-4 pb-2 justify-between border-b border-white/5">
        <button onClick={() => navigate(-1)} className="text-white flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Perfil e Documentos</h2>
        <button className="flex h-10 px-2 items-center justify-center rounded-lg hover:bg-white/5">
          <p className="text-primary font-bold text-base leading-normal tracking-[0.015em]">Salvar</p>
        </button>
      </header>

      <main className="p-4 space-y-6">
        <div className="flex flex-col items-center gap-4 pt-2">
          <div className="relative group cursor-pointer">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full h-32 w-32 shadow-xl ring-4 ring-surface-highlight"
              style={{ backgroundImage: `url(${currentUser.photoUrl})` }}
            ></div>
            <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full ring-4 ring-background-dark flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-[20px]">edit</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-white text-2xl font-display font-bold leading-tight text-center">{currentUser.name}</h1>
            <p className="text-gray-400 text-base font-medium mt-1">Chef de Cozinha Freelance</p>
          </div>
        </div>

        <div className="w-full h-px bg-white/5 my-2"></div>

        <div className="flex flex-col gap-4">
          <h3 className="text-white text-lg font-bold px-1">Informações Pessoais</h3>
          <div className="bg-surface-dark rounded-xl p-1 shadow-sm border border-white/5">
            <div className="px-4 py-3 border-b border-white/5">
              <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1 block">E-mail</span>
              <p className="text-white text-base font-medium">{currentUser.email}</p>
            </div>
            <div className="px-4 py-3">
              <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1 block">Telefone</span>
              <p className="text-white text-base font-medium">+55 11 99999-9999</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-white text-lg font-bold px-1">Informações Profissionais</h3>
          <div className="bg-surface-dark rounded-xl p-4 shadow-sm flex flex-col gap-4 border border-white/5">
            <label className="flex flex-col w-full">
              <span className="text-white text-sm font-semibold mb-2">Especialidade</span>
              <div className="flex items-center gap-2 bg-background-dark rounded-lg px-3 py-3 border border-white/10">
                <span className="material-symbols-outlined text-gray-500">restaurant</span>
                <input className="flex-1 bg-transparent border-none p-0 text-white placeholder:text-gray-600 focus:ring-0 text-sm" type="text" defaultValue="Cozinha Italiana, Grelhados"/>
              </div>
            </label>
            <label className="flex flex-col w-full">
              <span className="text-white text-sm font-semibold mb-2">Biografia</span>
              <textarea 
                className="w-full bg-background-dark rounded-lg px-3 py-3 border border-white/10 focus:border-primary focus:ring-0 text-white placeholder:text-gray-600 text-sm resize-none leading-relaxed" 
                rows={3}
                defaultValue={currentUser.bio}
              ></textarea>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-white text-lg font-bold">Documentação</h3>
            <span className="text-xs font-medium text-gray-400 bg-white/5 px-2 py-1 rounded-md">1 Ação Necessária</span>
          </div>
          
          <div className="group relative overflow-hidden bg-surface-dark rounded-xl p-5 shadow-sm border-l-4 border-green-500 border-t border-r border-b border-white/5">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-green-500/10 text-green-500 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-[24px]">badge</span>
                </div>
                <div>
                  <p className="text-white font-bold text-base">Identidade (RG/CNH)</p>
                  <p className="text-xs text-gray-400">Val: 12/2028</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-green-500/10 text-green-500 px-2 py-1 rounded-md">
                <span className="material-symbols-outlined text-[16px] filled">check_circle</span>
                <span className="text-xs font-bold uppercase tracking-wider">Verificado</span>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-surface-dark rounded-xl p-5 shadow-sm border-l-4 border-yellow-500 border-t border-r border-b border-white/5">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-500/10 text-yellow-500 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-[24px]">sanitizer</span>
                </div>
                <div>
                  <p className="text-white font-bold text-base">Certificado Anvisa</p>
                  <p className="text-xs text-gray-400">Enviado hoje</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-md">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span className="text-xs font-bold uppercase tracking-wider">Pendente</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Seu documento está sendo analisado por nossa equipe de conformidade. Isso geralmente leva de 24 a 48 horas.
            </p>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};