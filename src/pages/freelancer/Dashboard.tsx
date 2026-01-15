import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../../components/layout/BottomNav.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { currentUser } from '../../lib/mockData.ts';
import { formatCurrency } from '../../lib/utils.ts';
import { Frown, Search, MapPin, Briefcase, Crosshair, SlidersHorizontal, Loader2, Calendar } from 'lucide-react';

// --- TIPO ESTENDIDO COM COORDENADAS ---
interface JobWithCoords {
  id: string;
  restaurantName: string;
  restaurantLogo: string;
  role: string;
  price: number;
  date: string;
  duration: string;
  location: string;
  specialty?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distance?: number; // Calculado dinamicamente
}

// --- DADOS REAIS DE MAPS (GROUNDING) ---
// Coordenadas reais de locais no Rio de Janeiro e SP para simulação precisa
const JOBS_DATA: JobWithCoords[] = [
  {
    id: 'j1',
    restaurantName: 'Le Cordon Bleu',
    role: 'Cozinheiro(a)',
    price: 220,
    date: '2023-10-24T18:00:00',
    duration: '6h',
    location: 'Botafogo, RJ',
    restaurantLogo: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=100&h=100&fit=crop',
    specialty: 'Alta Gastronomia',
    coordinates: { lat: -22.951916, lng: -43.184274 } 
  },
  {
    id: 'j2',
    restaurantName: 'Sushi Leblon',
    role: 'Sushiman',
    price: 280,
    date: '2023-10-25T19:00:00',
    duration: '7h',
    location: 'Leblon, RJ',
    restaurantLogo: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=100&h=100&fit=crop',
    specialty: 'Japonês',
    coordinates: { lat: -22.984185, lng: -43.223577 }
  },
  {
    id: 'j3',
    restaurantName: 'Gero Ipanema',
    role: 'Garçom',
    price: 180,
    date: '2023-10-26T20:00:00',
    duration: '6h',
    location: 'Ipanema, RJ',
    restaurantLogo: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=100&h=100&fit=crop',
    specialty: 'Italiano',
    coordinates: { lat: -22.986877, lng: -43.208643 }
  },
  {
    id: 'j4',
    restaurantName: 'Aprazível',
    role: 'Auxiliar',
    price: 150,
    date: '2023-10-27T12:00:00',
    duration: '8h',
    location: 'Santa Teresa, RJ',
    restaurantLogo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop',
    specialty: 'Brasileira',
    coordinates: { lat: -22.929828, lng: -43.189536 }
  },
  {
    id: 'j5',
    restaurantName: 'Fogo de Chão',
    role: 'Churrasqueiro',
    price: 250,
    date: '2023-10-28T18:00:00',
    duration: '6h',
    location: 'Botafogo, RJ',
    restaurantLogo: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=100&h=100&fit=crop',
    specialty: 'Carnes',
    coordinates: { lat: -22.949821, lng: -43.180412 }
  }
];

export interface FilterState {
  search: string;
  role: string;
  location: string;
  date: string;
}

// --- UTILS: Haversine Formula (Cálculo de Distância em KM) ---
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Raio da terra em KM
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>({ search: '', role: '', location: '', date: '' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // States para Geolocalização
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // --- LÓGICA DE GEOLOCALIZAÇÃO ---
  const handleGetLocation = () => {
    setIsLoadingLocation(true);
    
    if (!('geolocation' in navigator)) {
      alert("Seu navegador não suporta geolocalização.");
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setFilters(prev => ({ ...prev, location: "📍 Minha Localização Atual" }));
        setIsLoadingLocation(false);
      },
      (error) => {
        // Fix: Explicit string template to avoid [object Object] in console
        console.error(`Erro de Geolocalização: ${error.message} (Código: ${error.code})`);
        
        let errorMessage = "Não foi possível obter sua localização.";
        
        switch (error.code) {
          case 1: // PERMISSION_DENIED
            errorMessage = "Permissão de localização negada. Verifique as configurações do navegador.";
            break;
          case 2: // POSITION_UNAVAILABLE
            errorMessage = "Sinal de GPS indisponível no momento.";
            break;
          case 3: // TIMEOUT
            errorMessage = "O tempo para obter a localização esgotou.";
            break;
          default:
            errorMessage = `Erro desconhecido: ${error.message}`;
        }
        
        alert(errorMessage);
        setIsLoadingLocation(false);
      },
      { 
        enableHighAccuracy: true,
        timeout: 20000, 
        maximumAge: 0
      }
    );
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    // Se o usuário digitar algo manualmente no local, limpamos o estado de GPS para parar de ordenar por distância
    if (key === 'location' && value !== "📍 Minha Localização Atual") {
      setUserLocation(null);
    }
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // --- FILTER & SORT LOGIC ---
  const filteredJobs = useMemo(() => {
    let jobs = JOBS_DATA.map(job => {
      // Se tivermos a localização do usuário, calculamos a distância
      if (userLocation) {
        const dist = getDistanceFromLatLonInKm(
          userLocation.lat,
          userLocation.lng,
          job.coordinates.lat,
          job.coordinates.lng
        );
        return { ...job, distance: dist };
      }
      return job;
    });

    // 1. Filtragem
    jobs = jobs.filter(job => {
      const matchSearch = filters.search 
        ? job.restaurantName.toLowerCase().includes(filters.search.toLowerCase()) 
        : true;
      
      const normalize = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      // Robust Role Matching (Handles accents and partial matches for snake_case values)
      let matchRole = true;
      if (filters.role) {
        const jobRoleNorm = normalize(job.role);
        const filterRoleNorm = normalize(filters.role);
        // Check if job role is inside filter (e.g. 'Auxiliar' in 'auxiliar_cozinha') or vice-versa
        matchRole = jobRoleNorm.includes(filterRoleNorm) || filterRoleNorm.includes(jobRoleNorm);
      }

      const matchLocation = filters.location
        ? (filters.location === "📍 Minha Localização Atual" ? true : job.location.toLowerCase().includes(filters.location.toLowerCase()))
        : true;
      const matchDate = filters.date ? job.date.startsWith(filters.date) : true;

      return matchSearch && matchRole && matchLocation && matchDate;
    });

    // 2. Ordenação (Se GPS ativo, ordena por proximidade)
    if (userLocation) {
      jobs.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return jobs;
  }, [filters, userLocation]);

  return (
    <div className="bg-background-dark min-h-screen pb-24 relative">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background-dark/80 backdrop-blur-md px-6 pt-12 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 rounded-full border-2 border-primary/20 p-0.5">
            <img 
              src={currentUser.photoUrl} 
              alt="Profile" 
              className="h-full w-full object-cover rounded-full"
            />
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background-dark"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-400">Bem-vindo de volta,</span>
            <h1 className="text-lg font-display font-bold leading-tight text-white">{currentUser.name}</h1>
          </div>
        </div>
        <button className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-surface-dark transition hover:bg-white/5">
          <span className="material-symbols-outlined text-gray-300 group-hover:text-primary">notifications</span>
          <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-primary"></span>
        </button>
      </header>

      <main className="space-y-6">
        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-4 px-6">
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-surface-dark p-4 border border-white/5">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl"></div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                <span className="material-symbols-outlined text-[18px] filled">star</span>
              </span>
              <span className="text-xs font-medium text-gray-400">Meu Score</span>
            </div>
            <div>
              <span className="text-3xl font-display font-bold tracking-tighter text-white">{currentUser.rating}</span>
              <span className="text-xs text-gray-500">/ 5.0</span>
            </div>
            <p className="mt-1 text-[10px] text-green-500 font-medium">Top 5% da região</p>
          </div>

          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-surface-dark p-4 border border-white/5">
            <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-green-500/5 blur-2xl"></div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                <span className="material-symbols-outlined text-[18px]">payments</span>
              </span>
              <span className="text-xs font-medium text-gray-400">Ganhos da Semana</span>
            </div>
            <div>
              <span className="text-xs text-gray-500 mr-1">R$</span>
              <span className="text-2xl font-display font-bold tracking-tighter text-white">1.200</span>
            </div>
            <p className="mt-1 text-[10px] text-gray-400 font-medium">+ R$ 180 pendente</p>
          </div>
        </section>

        {/* --- ÁREA DE TÍTULO E BUSCA --- */}
        <section>
          <div className="px-6 mb-3">
             <h3 className="text-xl font-display font-bold tracking-tight text-white">Vagas Disponíveis</h3>
          </div>

          {/* Barra de Busca + Botão Toggle */}
          <div className="px-6 pb-2 flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={18} />
              <input
                type="text"
                placeholder="Buscar restaurante..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full bg-[#262626] border border-white/5 rounded-xl h-12 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#e05915] placeholder-stone-500"
              />
            </div>
            
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`h-12 w-12 flex items-center justify-center rounded-xl border transition-colors ${isFilterOpen ? 'bg-[#e05915] border-[#e05915] text-white' : 'bg-[#262626] border-white/5 text-stone-400'}`}
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>

          {/* --- SEÇÃO DE FILTROS EMBUTIDA (INLINE) --- */}
          {isFilterOpen && (
            <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-200">
              <div className="bg-[#1c1c1c] border border-white/5 rounded-2xl p-4 space-y-4 shadow-inner mt-2">
                
                {/* Linha 1: Cargo */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Cargo</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={16} />
                    <select 
                      value={filters.role}
                      onChange={(e) => handleFilterChange('role', e.target.value)}
                      className="w-full bg-[#262626] border border-white/5 rounded-lg h-10 pl-9 pr-4 text-sm text-white focus:border-[#e05915] focus:outline-none appearance-none"
                    >
                      <option value="" disabled>Selecione um cargo</option>
                      
                      <optgroup label="Cozinha">
                        <option value="auxiliar_cozinha">Auxiliar de Cozinha</option>
                        <option value="cozinheiro">Cozinheiro(a)</option>
                        <option value="chef_cozinha">Chef de Cozinha</option>
                        <option value="sub_chef">Sub Chef</option>
                        <option value="chef_praca">Chef de Praça</option>
                        <option value="chef_fila">Chef de Fila</option>
                        <option value="sushiman">Sushiman/Sushiwoman</option>
                        <option value="pizzaiolo">Pizzaiolo(a)</option>
                        <option value="padeiro">Padeiro(a)</option>
                        <option value="confeiteiro">Confeiteiro(a)</option>
                      </optgroup>

                      <optgroup label="Salão & Atendimento">
                        <option value="garcom">Garçom/Garçonete</option>
                        <option value="cumim">Cumim</option>
                        <option value="maitre">Maître</option>
                        <option value="hostess">Atendente/Hostess</option>
                        <option value="gerente">Gerente</option>
                        <option value="caixa">Caixa</option>
                      </optgroup>

                      <optgroup label="Bar & Outros">
                        <option value="bartender">Bartender</option>
                        <option value="aux_bar">Auxiliar de Bar</option>
                        <option value="servicos_gerais">Serviços Gerais (Louça/Limpeza)</option>
                        <option value="seguranca">Segurança</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Linha 2: Local e Data */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Local</label>
                    <div className="relative group">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={16} />
                      <input 
                        id="inlineLocInput"
                        type="text" 
                        placeholder="Bairro"
                        value={filters.location}
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                        className={`w-full bg-[#262626] border rounded-lg h-10 pl-9 pr-8 text-sm text-white focus:outline-none transition-all ${
                            userLocation ? 'border-[#e05915] ring-1 ring-[#e05915]' : 'border-white/5 focus:border-[#e05915]'
                        }`}
                      />
                      <button 
                        onClick={handleGetLocation}
                        disabled={isLoadingLocation}
                        className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-[#e05915] hover:bg-white/5 rounded disabled:opacity-50"
                        title="Usar minha localização"
                      >
                        {isLoadingLocation ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Crosshair size={14} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div 
                    className="space-y-1.5 cursor-pointer group" 
                    onClick={(e) => {
                      const input = document.getElementById('date-trigger') as HTMLInputElement;
                      // Evita chamar showPicker se o clique foi direto no input (comportamento nativo já resolve)
                      if (input && e.target !== input) {
                        try {
                          if ('showPicker' in HTMLInputElement.prototype) {
                             input.showPicker();
                          } else {
                             input.focus();
                          }
                        } catch (err) {
                          // Silenciosamente foca no input se showPicker falhar (ex: cross-origin iframe)
                          input.focus();
                        }
                      }
                    }}
                  >
                    <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider cursor-pointer">Data</label>
                    <div className="relative">
                      {/* Ícone com pointer-events-none para que o clique passe para o input/container */}
                      <Calendar 
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 group-hover:text-[#e05915] transition-colors pointer-events-none" 
                        size={16} 
                      />
                      
                      <input 
                        id="date-trigger"
                        type="date"
                        value={filters.date}
                        onChange={(e) => handleFilterChange('date', e.target.value)}
                        className="w-full bg-[#262626] border border-white/5 rounded-lg h-10 pl-9 pr-2 text-sm text-white focus:border-[#e05915] focus:outline-none [color-scheme:dark] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Botão de Fechar/Aplicar */}
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-2 bg-[#e05915] hover:bg-[#b0420b] rounded-lg text-sm font-bold text-white shadow-md active:scale-95 transition-transform"
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
          )}

          {/* Job List */}
          <div className="flex flex-col gap-4 px-6 mt-2">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div 
                  key={job.id} 
                  onClick={() => navigate(`/freelancer/job/${job.id}`)}
                  className="group relative overflow-hidden rounded-2xl bg-surface-dark border border-white/5 transition-all hover:border-primary/30 cursor-pointer"
                >
                  <div className="relative h-28 w-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent z-10"></div>
                    <img 
                      src={job.restaurantLogo} 
                      alt="Job cover" 
                      className="h-full w-full object-cover opacity-80"
                    />
                    <div className="absolute top-3 left-3 z-20">
                      <Badge variant="neutral" className="bg-black/60 backdrop-blur-sm border-white/10 text-white">
                        {new Date(job.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).toUpperCase()} • {job.date.split('T')[1].slice(0, 5)}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3 z-20">
                      <Badge variant="primary" className="bg-primary text-white shadow-lg shadow-primary/20 border-none">
                        {formatCurrency(job.price)}
                      </Badge>
                    </div>
                  </div>

                  <div className="relative z-20 -mt-4 px-4 pb-4">
                    <div className="mb-3 flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-display font-bold text-white">{job.restaurantName}</h4>
                        <p className="text-sm text-gray-400">{job.role} • {job.specialty || 'Geral'}</p>
                      </div>
                      <div className="h-10 w-10 rounded-lg bg-white p-1 shadow-sm overflow-hidden border border-white/10">
                        <img src={job.restaurantLogo} alt="Logo" className="h-full w-full object-cover" />
                      </div>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className={`flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium transition-colors ${
                        job.distance 
                          ? 'bg-primary/20 text-primary border border-primary/20' 
                          : 'bg-white/5 text-gray-300'
                      }`}>
                        <span className="material-symbols-outlined text-[12px]">location_on</span>
                        {job.distance 
                          ? `${job.distance.toFixed(1)}km • ${job.location}` 
                          : job.location
                        }
                      </span>
                      <span className="flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-[10px] font-medium text-gray-300">
                        <span className="material-symbols-outlined text-[12px]">schedule</span>
                        {job.duration} Duração
                      </span>
                    </div>

                    <button className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-white text-surface-dark h-11 text-sm font-bold shadow transition hover:bg-gray-200">
                      Aceitar Vaga
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-surface-dark border border-white/5 rounded-2xl border-dashed">
                <div className="h-16 w-16 rounded-full bg-surface-highlight flex items-center justify-center mb-4">
                  <Frown size={32} className="text-gray-500" />
                </div>
                <h3 className="text-white font-bold text-lg">Nenhuma vaga encontrada</h3>
                <p className="text-gray-400 text-sm mt-1 max-w-[200px]">
                  Tente ajustar seus filtros para encontrar novas oportunidades.
                </p>
                <button 
                  onClick={() => {
                    setFilters({ search: '', role: '', location: '', date: '' });
                    setIsFilterOpen(false);
                    setUserLocation(null);
                  }}
                  className="mt-4 text-primary text-sm font-bold hover:underline"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </section>
        
        {/* Active Check-in Banner */}
        <div className="fixed bottom-[80px] left-0 right-0 px-4 z-40 max-w-md mx-auto">
           <button 
              onClick={() => navigate('/freelancer/check-in')}
              className="relative flex w-full items-center justify-between overflow-hidden rounded-2xl bg-primary px-1 py-1 shadow-lg shadow-primary/20 transition active:scale-[0.98]"
            >
            <div className="absolute inset-0 animate-pulse bg-white/10"></div>
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-primary">
              <span className="material-symbols-outlined">qr_code_scanner</span>
            </div>
            <div className="relative z-10 flex flex-1 flex-col px-3 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">Plantão Ativo • Hoje</span>
              <span className="text-sm font-bold text-white">Check-in: Le Cordon Bleu</span>
            </div>
            <div className="relative z-10 mr-2 flex items-center justify-center rounded-full bg-black/20 p-2">
              <span className="material-symbols-outlined text-white text-sm">arrow_forward</span>
            </div>
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};