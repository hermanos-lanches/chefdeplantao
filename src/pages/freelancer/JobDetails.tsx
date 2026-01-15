import React, { useState, useEffect } from 'react';
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
  Loader2,
  UtensilsCrossed
} from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { GoogleMapComponent } from '../../components/GoogleMap.tsx';
import { formatCurrency } from '../../lib/utils.ts';

// Definição da interface para os detalhes da vaga
interface JobDetailData {
  id: string;
  restaurantName: string;
  role: string;
  price: number;
  hourlyRate: number;
  date: string;
  time: string;
  duration: string;
  location: string;
  address: string;
  image: string;
  logo: string;
  category: string;
  description: string;
  requirements: { item: string; type: 'required' | 'critical' | 'info' | 'success' }[];
  coordinates: { lat: number; lng: number };
  userLocation: { lat: number; lng: number };
}

// Banco de dados simulado com as mesmas vagas do Dashboard
const JOBS_DATABASE: Record<string, JobDetailData> = {
  'j1': {
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
    coordinates: { lat: -22.951916, lng: -43.184274 },
    userLocation: { lat: -22.955000, lng: -43.180000 }
  },
  'j2': {
    id: 'j2',
    restaurantName: 'Sushi Leblon',
    role: 'Sushiman Pleno',
    price: 280,
    hourlyRate: 40.00,
    date: '2023-10-25',
    time: '19:00 - 02:00',
    duration: '7h',
    location: 'Leblon, Rio de Janeiro',
    address: 'Rua Dias Ferreira, 256 - Leblon, Rio de Janeiro - RJ',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070',
    logo: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=100&h=100&fit=crop',
    category: 'Culinária Japonesa',
    description: 'Vaga para Sushiman com experiência em cortes precisos e montagem de combinados. O profissional irá atuar no balcão principal durante o movimento de jantar.',
    requirements: [
      { item: 'Yanagiba Própria', type: 'required' },
      { item: 'Dólmã Preta (Fornecida se necessário)', type: 'info' },
      { item: 'Experiência comprovada em Omakase', type: 'required' },
    ],
    coordinates: { lat: -22.984185, lng: -43.223577 },
    userLocation: { lat: -22.955000, lng: -43.180000 }
  },
  'j3': {
    id: 'j3',
    restaurantName: 'Gero Ipanema',
    role: 'Garçom / Cumim',
    price: 180,
    hourlyRate: 30.00,
    date: '2023-10-26',
    time: '20:00 - 02:00',
    duration: '6h',
    location: 'Ipanema, Rio de Janeiro',
    address: 'Rua Aníbal de Mendonça, 157 - Ipanema, Rio de Janeiro - RJ',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16549766b?q=80&w=2070',
    logo: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=100&h=100&fit=crop',
    category: 'Italiano Clássico',
    description: 'Auxílio no serviço de salão, polimento de taças e organização de praça. Restaurante de alto padrão, exige-se postura impecável e conhecimento básico de etiqueta.',
    requirements: [
      { item: 'Sapato Social Preto', type: 'required' },
      { item: 'Calça Social Preta', type: 'required' },
      { item: 'Camisa Branca lisa', type: 'required' },
      { item: 'Saca-rolhas dois estágios', type: 'info' }
    ],
    coordinates: { lat: -22.986877, lng: -43.208643 },
    userLocation: { lat: -22.955000, lng: -43.180000 }
  },
  'j4': {
    id: 'j4',
    restaurantName: 'Aprazível',
    role: 'Auxiliar de Cozinha',
    price: 150,
    hourlyRate: 18.75,
    date: '2023-10-27',
    time: '12:00 - 20:00',
    duration: '8h',
    location: 'Santa Teresa, Rio de Janeiro',
    address: 'Rua Aprazível, 62 - Santa Teresa, Rio de Janeiro - RJ',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070',
    logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop',
    category: 'Cozinha Brasileira',
    description: 'Auxílio no pré-preparo (mise en place), cortes de legumes, higienização de folhas e organização da praça fria.',
    requirements: [
      { item: 'Antiderrapante', type: 'critical' },
      { item: 'Avental de Peito', type: 'required' },
      { item: 'Disposição para aprender', type: 'success' }
    ],
    coordinates: { lat: -22.929828, lng: -43.189536 },
    userLocation: { lat: -22.955000, lng: -43.180000 }
  },
  'j5': {
    id: 'j5',
    restaurantName: 'Fogo de Chão',
    role: 'Churrasqueiro',
    price: 250,
    hourlyRate: 41.60,
    date: '2023-10-28',
    time: '18:00 - 00:00',
    duration: '6h',
    location: 'Botafogo, Rio de Janeiro',
    address: 'Av. Reporter Nestor Moreira, s/n - Botafogo, Rio de Janeiro - RJ',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2070',
    logo: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=100&h=100&fit=crop',
    category: 'Churrascaria',
    description: 'Profissional para assar e servir carnes nobres no sistema de rodízio. Necessário experiência com espeto corrido e atendimento ao cliente.',
    requirements: [
      { item: 'Faca de Churrasco Profissional', type: 'required' },
      { item: 'Botina de Segurança', type: 'critical' },
      { item: 'Uniforme fornecido no local', type: 'info' }
    ],
    coordinates: { lat: -22.949821, lng: -43.180412 },
    userLocation: { lat: -22.955000, lng: -43.180000 }
  }
};

export const JobDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [job, setJob] = useState<JobDetailData | null>(null);

  // Efeito para carregar os dados da vaga baseado no ID da URL
  useEffect(() => {
    if (id && JOBS_DATABASE[id]) {
      setJob(JOBS_DATABASE[id]);
    } else {
      // Fallback para j1 se o ID não existir, ou poderia redirecionar
      setJob(JOBS_DATABASE['j1']);
    }
  }, [id]);

  if (!job) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  const handleAcceptJob = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    e.stopPropagation();

    if (isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`👨‍🍳 Vaga em ${job.restaurantName} garantida!`);
      navigate('/freelancer/shifts');
    } catch (error) {
      console.error("Erro ao aceitar vaga:", error);
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Vaga para ${job.role} no ${job.restaurantName}`,
        text: `Confira esta vaga de ${job.role} no ${job.restaurantName} pagando ${formatCurrency(job.price)}!`,
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      alert('Compartilhando vaga com amigos...');
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
        <button 
          onClick={handleShare}
          className="h-10 w-10 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-primary"
        >
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
              alt={job.restaurantName} 
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
              <div className="h-14 w-14 rounded-xl bg-white p-1 shadow-lg overflow-hidden">
                <img src={job.logo} className="w-full h-full object-cover" alt="Logo" />
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
                    req.type === 'info' ? 'text-blue-400' : 
                    req.type === 'success' ? 'text-green-500' : 'text-green-500'
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