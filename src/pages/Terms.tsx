import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button.tsx';

export const Terms: React.FC = () => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  const sections = [
    { id: 1, title: 'Aceitação dos Termos' },
    { id: 2, title: 'Responsabilidades do Freelancer' },
    { id: 3, title: 'Responsabilidades do Restaurante' },
    { id: 4, title: 'Assinatura e Pagamentos' },
    { id: 5, title: 'Política de Cancelamento' },
  ];

  return (
    <div className="min-h-screen bg-background-dark text-white p-6 flex flex-col">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="hover:text-primary transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">Termos de Uso e Privacidade</h1>
      </header>

      <div className="flex-1 overflow-y-auto pb-6 space-y-6">
        <div className="space-y-4">
          <p className="text-[10px] text-gray-500 font-bold tracking-wider uppercase">
            ÚLTIMA ATUALIZAÇÃO: 12 OUT, 2023
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Bem-vindo ao <span className="text-primary font-bold">Chef de Plantão</span>. Por favor, leia atentamente as cláusulas abaixo para entender seus direitos e deveres em nossa plataforma.
          </p>
        </div>

        <div className="space-y-3">
          {sections.map((section) => (
            <div key={section.id} className="bg-surface-dark border border-white/5 rounded-2xl p-4 flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                  {section.id}
                </div>
                <span className="font-medium text-sm text-gray-200 pr-4">{section.title}</span>
              </div>
              <ChevronDown size={20} className="text-gray-500" />
            </div>
          ))}
        </div>

        <div className="bg-surface-highlight rounded-2xl p-4 flex gap-3 border border-white/5">
          <div className="mt-1 flex-shrink-0">
             <span className="material-symbols-outlined text-gray-400 text-lg">info</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Em caso de dúvidas sobre nossos termos, entre em contato com nosso suporte jurídico através do email juridico@chefdeplantao.com.br.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2" onClick={() => setAccepted(!accepted)}>
          <div className={`h-6 w-6 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${accepted ? 'bg-primary border-primary' : 'border-gray-600 bg-transparent'}`}>
            {accepted && <Check size={16} className="text-white" />}
          </div>
          <span className="text-sm text-gray-300 cursor-pointer select-none">Li e concordo com os termos</span>
        </div>
      </div>

      <div className="pt-4">
        <Button 
          fullWidth 
          size="lg" 
          disabled={!accepted}
          onClick={() => navigate('/freelancer/dashboard')}
          className="flex items-center justify-center gap-2"
        >
          Continuar
          <span className="material-symbols-outlined">arrow_forward</span>
        </Button>
      </div>
    </div>
  );
};