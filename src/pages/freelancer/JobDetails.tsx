import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Share2, 
  MapPin, 
  Calendar, 
  Clock, 
  ChefHat, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  Loader2
} from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { GoogleMapComponent } from '../../components/GoogleMap.tsx';
import { formatCurrency } from '../../lib/utils.ts';

export const JobDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // 1. Estado de Loading
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dados Mockados Específicos para Le Cordon Bleu
  const job = {
    id: 'j1',
    restaurantName: 'Le Cordon Bleu',
    role: 'Cozinheiro - Praça de Grelhados',
    price: 250,
    hourlyRate: 35.50,
    date: '2023-10-24',
    time: '18:00 - 00:00',
    duration: '6h',
    location: 'Botafogo, Rio de Janeiro',
    address: 'Rua da Passagem, 179 - Botafogo, Rio de Janeiro - RJ',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974', 
    logo: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=100&h=100&fit=crop',
    category: 'Alta Gastronomia',
    description: 'Buscamos profissional com experiência em praça de quentes (grelhados e assados) para evento exclusivo de degustação. Necessário agilidade e conhecimento de pontos de carne.',
    requirements: [
      { item: 'Dolmã Branca Completa (Sem logos)', type: 'required' },
      { item: 'Kit de Facas Próprio', type: 'required' },
      { item: 'Sapatos Antiderrapantes (Crocs Pro ou similar)', type: 'critical' },
      { item: 'Chegar com 30min de antecedência', type: 'info' }
    ],
    // Coordinates for the Map
    coordinates: { lat: -22.951916, lng: -43.184274 },
    // Dummy User Location for route visualization
    userLocation: { lat: -22.955000, lng: -43.180000 }
  };

  const handleAcceptJob = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    e.stopPropagation();

    if (isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      // Simulação de Fetch (Network Delay)
      await new Promise(resolve => setTimeout(resolve, 1500));

      alert("👨‍🍳 Vaga garantida! Prepare sua dolmã.");
      navigate('/freelancer/shifts');

    } catch (error) {
      console.error("Erro ao aceitar vaga:", error);
      alert("Ocorreu um erro ao tentar aceitar a vaga. Tente novamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background-dark min-h-screen text-white pb-28 relative">
      
      {/* Header de Navegação */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background-dark/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-white/5">
        <button 
          onClick={() => navigate(-1)} 
          className="h-10 w-10 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>
        <span className="text-sm font-bold uppercase tracking-widest text-gray-300">Detalhes da Vaga</span>
        <button className="h-10 w-10 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-primary">
          <Share2 size={20} />
        </button>
      </header>

      <main className="pt-20">
        
        {/* Galeria / Hero Section */}
        <div className="relative w-full h-72 px-4 mb-6">
          <div className="w-full h-full rounded-[2rem] overflow-hidden relative shadow-2xl border border-white/5 group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
            <img 
              src={job.image} 
              alt="Cozinha" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Badges Flutuantes */}
            <div className="absolute top-4 left-4 z-20">
               <Badge variant="warning" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 backdrop-blur-md px-3 py-1.5 text-xs">
                 <ChefHat size={14} className="mr-1" />
                 {job.category}
               </Badge>
            </div>
            
            {/* Logo do Restaurante sobrepondo */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3">
              <div className="h-14 w-14 rounded-xl bg-white p-1 shadow-lg">
                <img src={job.logo} className="w-full h-full object-cover rounded-lg" alt="Logo" />
              </div>
              <div className="mb-1">
                <p className="text-gray-300 text-xs font-medium uppercase tracking-wide">Restaurante</p>
                <h1 className="text-xl font-display font-bold text-white leading-none">{job.restaurantName}</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 space-y-8">
          
          {/* Cabeçalho da Vaga & Preço */}
          <section className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <h2 className="text-2xl font-display font-bold leading-tight mb-2">{job.role}</h2>
              <div className="flex flex-wrap gap-2 text-sm text-gray-400">
                <span className="flex items-center gap-1 bg-surface-highlight px-2 py-1 rounded-md border border-white/5">
                  <Calendar size={14} className="text-primary" />
                  Hoje, 24 Out
                </span>
                <span className="flex items-center gap-1 bg-surface-highlight px-2 py-1 rounded-md border border-white/5">
                  <Clock size={14} className="text-primary" />
                  {job.time}
                </span>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Valor Total</span>
              <span className="text-3xl font-display font-bold text-primary tracking-tight">
                {formatCurrency(job.price)}
              </span>
              <span className="text-[10px] font-medium text-gray-500">
                ~ {formatCurrency(job.hourlyRate)} / hora
              </span>
            </div>
          </section>

          {/* Descrição */}
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Sobre a Vaga</h3>
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              {job.description}
            </p>
          </section>

          {/* Requisitos */}
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Requisitos & Itens</h3>
            <div className="bg-surface-dark border border-white/5 rounded-2xl p-5 space-y-4 shadow-sm">
              {job.requirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`mt-0.5 shrink-0 ${
                    req.type === 'critical' ? 'text-red-500' : 
                    req.type === 'info' ? 'text-blue-400' : 'text-green-500'
                  }`}>
                    {req.type === 'critical' ? <AlertTriangle size={18} /> : 
                     req.type === 'info' ? <Info size={18} /> : <CheckCircle2 size={18} />}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${req.type === 'critical' ? 'text-red-100' : 'text-gray-200'}`}>
                      {req.item}
                    </p>
                    {req.type === 'critical' && (
                      <span className="text-[10px] text-red-500 font-bold uppercase tracking-wide">Item Obrigatório</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Localização com GoogleMapComponent */}
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Localização</h3>
            <div className="rounded-2xl overflow-hidden border border-white/10 h-48 relative bg-surface-highlight group cursor-pointer">
              <GoogleMapComponent 
                userLocation={job.userLocation} 
                destinationLocation={job.coordinates}
                className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                loadingComponent={
                  <div className="w-full h-full bg-[#1c1c1e] animate-pulse flex items-center justify-center">
                     <div className="flex flex-col items-center gap-2 opacity-50">
                        <MapPin size={24} className="text-gray-500" />
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Carregando mapa...</span>
                     </div>
                  </div>
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 to-transparent pointer-events-none"></div>
              
              <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                <div className="flex items-start gap-3">
                  <div className="bg-primary p-2 rounded-full shadow-lg shadow-primary/20 mt-1">
                    <MapPin size={20} className="text-white fill-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base">{job.location}</h4>
                    <p className="text-gray-400 text-xs mt-0.5 leading-snug max-w-[250px]">{job.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Botão de Ação (Sticky Footer) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-dark/90 backdrop-blur-xl border-t border-white/5 z-50">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <div className="hidden sm:block">
            <p className="text-xs text-gray-400 uppercase font-bold">Total a receber</p>
            <p className="text-xl font-display font-bold text-white">{formatCurrency(job.price)}</p>
          </div>
          <Button 
            type="button" 
            fullWidth 
            size="lg" 
            disabled={isSubmitting}
            className={`
              h-14 text-base shadow-lg shadow-primary/25 border-t border-white/10
              ${isSubmitting 
                ? 'bg-orange-400/80 cursor-not-allowed brightness-90'
                : 'bg-gradient-to-r from-[#d46211] to-[#b8530d] hover:brightness-110'
              }
            `}
            onClick={handleAcceptJob}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={20} />
                <span>Confirmando presença...</span>
              </div>
            ) : (
              'ACEITAR VAGA'
            )}
          </Button>
        </div>
      </div>

    </div>
  );
};