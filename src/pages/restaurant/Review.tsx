import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Check } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';

export const Review: React.FC = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = ['Pontual', 'Proativo', 'Especialista', 'Bom Trabalho em Equipe', 'Limpo & Organizado'];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col p-6">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="hover:text-primary transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold uppercase tracking-widest text-center flex-1 pr-10">AVALIAR PLANTÃO</h1>
      </header>

      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
           <div className="h-28 w-28 rounded-full p-1 border border-primary/30">
             <img src="https://i.pravatar.cc/150?u=carlosm" alt="Chef" className="h-full w-full rounded-full object-cover grayscale" />
           </div>
           <div className="absolute bottom-0 right-2 bg-[#4e2c18] border border-primary/50 text-primary h-8 w-8 rounded-full flex items-center justify-center">
             <span className="material-symbols-outlined text-sm">restaurant</span>
           </div>
        </div>
        
        <h2 className="text-xl font-bold mb-1 text-center">
           Como foi o plantão com<br/>
           <span className="text-primary">Carlos Mendez</span>?
        </h2>
        <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mt-2">
           SOUS CHEF • 24 OUT • JANTAR
        </p>
      </div>

      <div className="flex justify-center gap-2 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button 
            key={star}
            onClick={() => setRating(star)}
            className="transition-transform active:scale-125 focus:outline-none"
          >
            <Star 
               size={36} 
               fill={star <= rating ? "#d46211" : "transparent"} 
               className={star <= rating ? "text-primary" : "text-gray-600"} 
               strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
      
      <div className="text-center mb-10 h-6">
         {rating === 5 && <span className="text-sm font-bold bg-white/10 px-3 py-1 rounded-full text-gray-200">Excelente</span>}
         {rating === 4 && <span className="text-sm font-bold bg-white/10 px-3 py-1 rounded-full text-gray-200">Muito Bom</span>}
         {rating > 0 && rating < 4 && <span className="text-sm font-bold bg-white/10 px-3 py-1 rounded-full text-gray-200">Poderia ser melhor</span>}
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
           <h3 className="font-bold text-sm">Feedback Rápido</h3>
           <span className="text-[10px] text-gray-500">Selecione o que se aplica</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
           {tags.map(tag => (
             <button
               key={tag}
               onClick={() => toggleTag(tag)}
               className={`h-12 px-4 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between ${
                 selectedTags.includes(tag) 
                   ? 'bg-[#d46211] border-[#d46211] text-white shadow-lg shadow-primary/20' 
                   : 'bg-surface-dark border-white/5 text-gray-400 hover:bg-white/5'
               }`}
             >
               {tag}
               {selectedTags.includes(tag) && <Check size={14} />}
             </button>
           ))}
           <button className="h-12 px-4 rounded-2xl border border-white/5 bg-transparent text-xs font-medium text-gray-500 border-dashed hover:text-gray-300 hover:border-gray-500 transition-colors">
             + Adicionar outro
           </button>
        </div>
      </div>

      <div className="mt-8">
        <Button 
          fullWidth 
          size="lg" 
          onClick={() => navigate('/restaurant/dashboard')}
          className="flex items-center justify-center gap-2"
        >
           Enviar Avaliação
           <span className="material-symbols-outlined">arrow_forward</span>
        </Button>
        <button 
           onClick={() => navigate('/restaurant/dashboard')}
           className="w-full text-center mt-4 text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
           Pular avaliação por enquanto
        </button>
      </div>
    </div>
  );
};