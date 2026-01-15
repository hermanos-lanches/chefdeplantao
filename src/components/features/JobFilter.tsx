import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, X, SlidersHorizontal, Trash2, Briefcase, Crosshair } from 'lucide-react';
import { Input } from '../ui/Input.tsx';

export interface FilterState {
  search: string;
  role: string;
  location: string;
  date: string;
}

interface JobFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

const JOB_ROLES = [
  // Cozinha
  "Auxiliar de Cozinha",
  "Cozinheiro(a)",
  "Chef de Cozinha",
  "Sub Chef",
  "Chef de Praça",
  "Chef de Fila",
  "Sushiman/Sushiwoman",
  "Pizzaiolo(a)",
  "Padeiro(a)",
  "Confeiteiro(a)",
  
  // Salão e Atendimento
  "Garçom/Garçonete",
  "Cumim",
  "Maître",
  "Atendente/Hostess",
  "Gerente",
  "Caixa",

  // Bar e Outros
  "Bartender (Barman/Barmaid)",
  "Auxiliar de Bar",
  "Serviços Gerais (Louça/Limpeza)",
  "Segurança"
];

export const JobFilter: React.FC<JobFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    role: '',
    location: '',
    date: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  // Debounce the filter changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange(filters);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters, onFilterChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleUseLocation = () => {
    // Simulação de preenchimento via geolocalização
    setFilters(prev => ({ ...prev, location: 'Minha Localização Atual' }));
  };

  const removeFilter = (key: keyof FilterState) => {
    setFilters(prev => ({ ...prev, [key]: '' }));
  };

  const clearFilters = () => {
    setFilters({ search: '', role: '', location: '', date: '' });
    setIsExpanded(false);
  };

  // Helper to check if specific filters (other than search text) are active
  const hasAdvancedFilters = filters.location || filters.date || filters.role;

  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}`;
  };

  return (
    <div className="bg-surface-dark rounded-2xl border border-white/5 p-4 mb-6 transition-all shadow-sm">
      {/* Top Bar: Search + Toggle */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Input 
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Buscar por restaurante..." 
            leftIcon={<Search size={18} />}
            className="bg-surface-highlight border-transparent h-10 text-sm"
          />
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`h-10 w-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
            isExpanded || hasAdvancedFilters
              ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
              : 'bg-surface-highlight border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          {isExpanded ? (
            <X size={20} />
          ) : (
            <div className="relative">
              <SlidersHorizontal size={20} />
              {hasAdvancedFilters && (
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-white border-2 border-primary rounded-full"></span>
              )}
            </div>
          )}
        </button>
      </div>

      {/* Summary Chips (Visible when collapsed but filtered) */}
      {!isExpanded && hasAdvancedFilters && (
        <div className="mt-3 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
          {filters.role && (
            <button 
              onClick={() => removeFilter('role')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-wide hover:bg-primary/20 transition-colors group"
            >
              <Briefcase size={12} />
              {filters.role}
              <X size={12} className="opacity-50 group-hover:opacity-100" />
            </button>
          )}
          {filters.location && (
            <button 
              onClick={() => removeFilter('location')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-highlight border border-white/10 text-gray-300 text-[11px] font-bold uppercase tracking-wide hover:bg-white/10 transition-colors group"
            >
              <MapPin size={12} />
              {filters.location}
              <X size={12} className="opacity-50 group-hover:opacity-100" />
            </button>
          )}
          {filters.date && (
            <button 
              onClick={() => removeFilter('date')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-highlight border border-white/10 text-gray-300 text-[11px] font-bold uppercase tracking-wide hover:bg-white/10 transition-colors group"
            >
              <Calendar size={12} />
              {formatDateDisplay(filters.date)}
              <X size={12} className="opacity-50 group-hover:opacity-100" />
            </button>
          )}
          
          <button 
            onClick={clearFilters}
            className="text-[10px] text-gray-500 font-bold hover:text-white underline decoration-gray-700 underline-offset-2 ml-1"
          >
            Limpar tudo
          </button>
        </div>
      )}

      {/* Expanded Form */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          
          <div className="col-span-2">
             <label className="text-[10px] uppercase font-bold text-gray-500 mb-1.5 block ml-1">Cargo / Função</label>
             <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                   <Briefcase size={16} />
                </div>
                <select 
                  name="role"
                  value={filters.role}
                  onChange={handleChange}
                  className="w-full bg-surface-highlight rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 border border-white/5 focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                >
                  <option value="">Selecione um cargo</option>
                  {JOB_ROLES.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                   <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </div>
             </div>
          </div>

          <div className="col-span-1">
             <label className="text-[10px] uppercase font-bold text-gray-500 mb-1.5 block ml-1">Localização</label>
             <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                   <MapPin size={16} />
                </div>
                <input 
                  name="location"
                  value={filters.location}
                  onChange={handleChange}
                  placeholder="Bairro"
                  className="w-full bg-surface-highlight rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-gray-500 border border-white/5 focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button 
                  onClick={handleUseLocation}
                  type="button"
                  title="Usar minha localização"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary-hover transition-colors p-1"
                >
                  <Crosshair size={16} />
                </button>
             </div>
          </div>
          <div className="col-span-1">
             <label className="text-[10px] uppercase font-bold text-gray-500 mb-1.5 block ml-1">Data</label>
             <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                   <Calendar size={16} />
                </div>
                <input 
                  type="date"
                  name="date"
                  value={filters.date}
                  onChange={handleChange}
                  className="w-full bg-surface-highlight rounded-xl pl-10 pr-3 py-3 text-sm text-white placeholder-gray-500 border border-white/5 focus:outline-none focus:border-primary/50 transition-colors [color-scheme:dark]"
                />
             </div>
          </div>
          
          <div className="col-span-2 flex justify-end mt-2 pt-2 border-t border-white/5">
            <button 
              onClick={clearFilters}
              className="text-xs font-bold text-gray-400 hover:text-red-400 flex items-center gap-1.5 transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
            >
              <Trash2 size={14} />
              Limpar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
};