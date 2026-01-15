"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Banknote, Navigation, Info, UtensilsCrossed, Check } from 'lucide-react';
import { GoogleMapComponent } from '../../components/GoogleMap.tsx';

export const CheckIn: React.FC = () => {
  const navigate = useNavigate();
  const [distance, setDistance] = useState(50); 
  const [status, setStatus] = useState<'idle' | 'checking' | 'success'>('idle');
  
  // Coordenadas do Restaurante (Le Cordon Bleu - Botafogo, RJ)
  const destinationLocation = { lat: -22.951916, lng: -43.184274 };

  // Coordenadas Simuladas do Usuário (Próximo ao local)
  const userLocation = { lat: -22.952500, lng: -43.184000 };

  const handleCheckIn = () => {
    setStatus('checking');
    
    // Simulate validation delay
    setTimeout(() => {
      setStatus('success');
      
      // Redirect after success animation
      setTimeout(() => {
        navigate('/freelancer/dashboard');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-6 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="h-10 w-10 bg-surface-dark rounded-full flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors text-white"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold">Check-in</h1>
        <button className="text-sm text-gray-400 font-medium hover:text-white transition-colors">Ajuda</button>
      </header>

      <main className="flex-1 flex flex-col px-6 pb-6 relative z-10">
        
        {/* Restaurant Card */}
        <div className="bg-surface-dark border border-white/5 rounded-3xl p-5 mb-8 shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">RESTAURANTE</p>
              <h2 className="text-xl font-display font-bold text-white">Bistrô do Chef</h2>
            </div>
            <div className="h-12 w-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center p-2">
              <UtensilsCrossed className="text-primary" size={24} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 bg-surface-highlight/50 w-fit px-3 py-1.5 rounded-lg border border-white/5">
              <Clock size={16} className="text-orange-500" />
              <span className="text-sm font-medium text-gray-200">19:00 - 23:00</span>
            </div>
            <div className="flex items-center gap-2 bg-green-500/10 w-fit px-3 py-1.5 rounded-lg border border-green-500/20">
              <Banknote size={16} className="text-green-500" />
              <span className="text-sm font-medium text-green-500">R$ 200,00</span>
            </div>
          </div>
        </div>

        {/* Big Button Area */}
        <div className="flex-1 flex flex-col items-center justify-center mb-8 relative">
          
          {status === 'idle' && (
            <>
              <div className="absolute w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute w-64 h-64 border border-primary/30 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20"></div>
              <div className="absolute w-60 h-60 border border-primary/20 rounded-full"></div>
            </>
          )}

          {status === 'success' && (
             <div className="absolute w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
          )}
          
          <button 
            onClick={handleCheckIn}
            disabled={status !== 'idle'}
            className={`
              relative w-56 h-56 rounded-full 
              flex flex-col items-center justify-center 
              shadow-2xl transition-all duration-500 
              border-4
              ${status === 'success' 
                ? 'bg-green-500 border-green-400 scale-100' 
                : 'bg-gradient-to-b from-primary to-[#a34405] border-white/10 shadow-[0_20px_50px_rgba(212,98,17,0.4)]'
              }
              ${status === 'checking' ? 'scale-95 opacity-90' : 'hover:scale-105 active:scale-95'}
              ${status === 'idle' ? 'cursor-pointer' : 'cursor-default'}
            `}
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center animate-in zoom-in duration-300">
                 <div className="h-20 w-20 bg-white/20 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm">
                   <Check size={48} className="text-white" strokeWidth={3} />
                 </div>
                 <span className="text-2xl font-bold text-white text-center leading-tight">
                   CHECK-IN<br/>CONFIRMADO
                 </span>
              </div>
            ) : (
              <>
                <div className="h-20 w-20 bg-white/20 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                  <MapPin size={40} className={`text-white fill-white/20 ${status === 'checking' ? 'animate-bounce' : ''}`} />
                </div>
                <span className="text-2xl font-bold text-white text-center leading-tight">
                  {status === 'checking' ? 'VALIDANDO\nLOCAL...' : 'CONFIRMAR\nCHEGADA'}
                </span>
                {status === 'idle' && (
                  <span className="mt-2 text-[10px] font-bold text-black/40 bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest">
                    Toque aqui
                  </span>
                )}
              </>
            )}
          </button>
        </div>

        <p className={`text-center text-sm mb-8 leading-relaxed max-w-xs mx-auto transition-colors duration-300 ${status === 'success' ? 'text-green-500 font-bold' : 'text-gray-400'}`}>
          {status === 'success' 
            ? 'Plantão iniciado! Bom trabalho, Chef.' 
            : 'Ao confirmar, você inicia a contagem das horas trabalhadas.'}
        </p>

        {/* Interactive Google Map Component */}
        <div className="h-40 w-full rounded-2xl overflow-hidden relative border border-white/10 group shadow-lg transition-opacity duration-500" style={{ opacity: status === 'success' ? 0.5 : 1 }}>
          <GoogleMapComponent 
            userLocation={userLocation}
            destinationLocation={destinationLocation}
            className="w-full h-full"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark/20 to-transparent pointer-events-none z-10"></div>
          
          {/* Location Badge (Overlay on top of map) */}
          <div className="absolute bottom-4 left-4 right-4 bg-surface-dark/95 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center gap-3 shadow-lg z-20">
             <div className="bg-primary/20 p-1.5 rounded-full">
               <Navigation size={16} className="text-primary fill-primary" />
             </div>
             <p className="text-xs font-bold text-white">Você está a {distance}m do local</p>
          </div>
        </div>

        <div className="flex items-start gap-2 mt-4 px-2">
           <Info size={14} className="text-gray-500 mt-0.5 shrink-0" />
           <p className="text-[10px] text-gray-500 leading-tight">
             Sua localização exata será compartilhada com o restaurante apenas no momento da confirmação.
           </p>
        </div>
      </main>
    </div>
  );
};