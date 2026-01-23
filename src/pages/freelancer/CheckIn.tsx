"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Banknote, Navigation, Info, Check, ChevronRight } from 'lucide-react';
import { GoogleMapComponent } from '../../components/GoogleMap.tsx';

export const CheckIn: React.FC = () => {
  const navigate = useNavigate();
  const [distance, setDistance] = useState(50); 
  const [status, setStatus] = useState<'idle' | 'checking' | 'success'>('idle');
  
  const destinationLocation = { lat: -22.951916, lng: -43.184274 };
  const userLocation = { lat: -22.952500, lng: -43.184000 };

  const handleCheckIn = () => {
    setStatus('checking');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        navigate('/freelancer/dashboard');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-white flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-14 pb-6 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="h-12 w-12 bg-card rounded-3xl flex items-center justify-center border border-white/5 hover:bg-white/5 transition-colors text-white"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-xl font-bold">Check-in</h1>
        <button className="text-sm text-gray-400 font-bold hover:text-white transition-colors">Ajuda</button>
      </header>

      <main className="flex-1 flex flex-col px-6 pb-10 relative z-10">
        
        {/* Restaurant Card */}
        <div className="bg-card border border-white/5 rounded-[32px] p-6 mb-10 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 h-32 w-32 bg-primary/5 rounded-full blur-2xl"></div>
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1.5">RESTAURANTE</p>
              <h2 className="text-2xl font-bold text-white">Bistrô do Chef</h2>
            </div>
            <div className="h-14 w-14 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
              <img src="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=100&h=100&fit=crop" className="w-full h-full object-cover" alt="" />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2.5 bg-white/5 px-4 py-2.5 rounded-2xl border border-white/5">
              <Clock size={18} className="text-primary" />
              <span className="text-sm font-bold text-gray-200">19:00 - 23:00</span>
            </div>
            <div className="flex items-center gap-2.5 bg-green-500/10 px-4 py-2.5 rounded-2xl border border-green-500/10">
              <Banknote size={18} className="text-green-500" />
              <span className="text-sm font-bold text-green-500">R$ 200,00</span>
            </div>
          </div>
        </div>

        {/* Big Button Area */}
        <div className="flex-1 flex flex-col items-center justify-center mb-10 relative">
          
          {status === 'idle' && (
            <>
              <div className="absolute w-80 h-80 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
              <div className="absolute w-72 h-72 border border-primary/20 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20"></div>
              <div className="absolute w-64 h-64 border border-primary/10 rounded-full"></div>
            </>
          )}

          {status === 'success' && (
             <div className="absolute w-80 h-80 bg-green-500/10 rounded-full blur-[100px]"></div>
          )}
          
          <button 
            onClick={handleCheckIn}
            disabled={status !== 'idle'}
            className={`
              relative w-64 h-64 rounded-full 
              flex flex-col items-center justify-center 
              shadow-2xl transition-all duration-700 
              ${status === 'success' 
                ? 'bg-green-500 scale-100' 
                : 'bg-gradient-to-br from-primary to-[#D45200] shadow-[0_30px_60px_rgba(255,107,0,0.3)]'
              }
              ${status === 'checking' ? 'scale-95 opacity-90' : 'hover:scale-105 active:scale-95'}
              ${status === 'idle' ? 'cursor-pointer' : 'cursor-default'}
            `}
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center animate-in zoom-in duration-500">
                 <div className="h-24 w-24 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-md">
                   <Check size={56} className="text-white" strokeWidth={4} />
                 </div>
                 <span className="text-2xl font-black text-white text-center leading-tight tracking-tight">
                   CHECK-IN<br/>CONFIRMADO
                 </span>
              </div>
            ) : (
              <>
                <div className="h-24 w-24 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-md group-hover:bg-white/30 transition-colors">
                  <MapPin size={48} className={`text-white fill-white/20 ${status === 'checking' ? 'animate-bounce' : ''}`} />
                </div>
                <span className="text-2xl font-black text-white text-center leading-tight tracking-tight">
                  {status === 'checking' ? 'VALIDANDO\nLOCAL...' : 'CONFIRMAR\nCHEGADA'}
                </span>
                {status === 'idle' && (
                  <span className="mt-3 text-[10px] font-black text-black/40 bg-white/30 px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                    Toque aqui
                  </span>
                )}
              </>
            )}
          </button>
        </div>

        <p className={`text-center text-sm mb-10 leading-relaxed max-w-xs mx-auto transition-all duration-500 ${status === 'success' ? 'text-green-500 font-black scale-110' : 'text-gray-400 font-medium'}`}>
          {status === 'success' 
            ? 'Plantão iniciado! Bom trabalho, Chef.' 
            : 'Ao confirmar, você inicia a contagem das horas trabalhadas.'}
        </p>

        {/* Map Area */}
        <div className="h-48 w-full rounded-[32px] overflow-hidden relative border border-white/5 group shadow-2xl transition-all duration-700" style={{ opacity: status === 'success' ? 0.3 : 1, transform: status === 'success' ? 'scale(0.95)' : 'scale(1)' }}>
          <GoogleMapComponent 
            userLocation={userLocation}
            destinationLocation={destinationLocation}
            className="w-full h-full grayscale brightness-75 contrast-125"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none z-10"></div>
          
          {/* Location Badge */}
          <div className="absolute bottom-5 left-5 right-5 bg-card/90 backdrop-blur-xl p-4 rounded-2xl border border-white/10 flex items-center gap-4 shadow-2xl z-20">
             <div className="bg-primary/20 p-2 rounded-full">
               <Navigation size={18} className="text-primary fill-primary" />
             </div>
             <p className="text-sm font-bold text-white">Você está a <span className="text-primary">{distance}m</span> do local</p>
          </div>
        </div>

        <div className="flex items-start gap-3 mt-6 px-4">
           <Info size={16} className="text-gray-600 mt-0.5 shrink-0" />
           <p className="text-[11px] text-gray-600 font-bold leading-relaxed">
             Sua localização exata será compartilhada com o restaurante apenas no momento da confirmação.
           </p>
        </div>
      </main>
    </div>
  );
};
