import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button.tsx';

export const Terms: React.FC = () => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [openSection, setOpenSection] = useState<number | null>(null);

  const sections = [
    { 
      id: 1, 
      title: 'Aceitação dos Termos',
      content: 'Ao utilizar o Chef de Plantão, você concorda integralmente com estas normas. A plataforma atua como intermediária entre profissionais autônomos e estabelecimentos gastronômicos.'
    },
    { 
      id: 2, 
      title: 'Privacidade e LGPD (Dados Sensíveis)',
      content: 'Em conformidade com a LGPD (Lei 13.709/2018), coletamos dados como CPF, telefone e fotos de documentos exclusivamente para fins de segurança e verificação de identidade. Suas fotos de documentos são armazenadas em ambiente criptografado e não são compartilhadas com terceiros, exceto para fins de validação antifraude.'
    },
    { 
      id: 3, 
      title: 'Consentimento de Geolocalização',
      content: 'Para o funcionamento do modelo "estilo Uber", você autoriza o rastreamento de sua localização em tempo real enquanto o aplicativo estiver em uso ou durante a execução de um plantão. Isso é necessário para calcular distâncias, tempo de chegada e garantir a segurança de ambas as partes.'
    },
    { 
      id: 4, 
      title: 'Verificação de Identidade e Retenção',
      content: 'Os documentos enviados passam por análise automática e/ou manual. Mantemos esses dados pelo período em que sua conta estiver ativa. Caso você solicite a exclusão da conta, seus dados sensíveis serão anonimizados ou deletados em até 30 dias, conforme exigido por lei.'
    },
    { 
      id: 5, 
      title: 'Assinatura e Pagamentos',
      content: 'Restaurantes concordam com a cobrança recorrente de R$ 149,00/mês. Profissionais concordam que os pagamentos de plantões serão processados via Wallet interna, sujeitos a prazos de compensação bancária.'
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white p-6 flex flex-col">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="hover:text-orange-500 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">Termos de Uso e Privacidade</h1>
      </header>

      <div className="flex-1 overflow-y-auto pb-6 space-y-6">
        <div className="space-y-4">
          <p className="text-[10px] text-gray-500 font-bold tracking-wider uppercase">
            ÚLTIMA ATUALIZAÇÃO: 23 JAN, 2026
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Bem-vindo ao <span className="text-orange-500 font-bold">Chef de Plantão</span>. Para sua segurança e conformidade com a <span className="text-blue-400">LGPD</span>, leia atentamente como tratamos seus dados.
          </p>
        </div>

        <div className="space-y-3">
          {sections.map((section) => (
            <div key={section.id} className="bg-[#1c1c1e] border border-white/5 rounded-2xl overflow-hidden transition-all">
              <div 
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 text-sm font-bold">
                    {section.id}
                  </div>
                  <span className="font-medium text-sm text-gray-200 pr-4">{section.title}</span>
                </div>
                <ChevronDown size={20} className={`text-gray-500 transition-transform ${openSection === section.id ? 'rotate-180' : ''}`} />
              </div>
              {openSection === section.id && (
                <div className="px-4 pb-4 text-xs text-gray-400 leading-relaxed border-t border-white/5 pt-3">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-orange-500/5 rounded-2xl p-4 flex gap-3 border border-orange-500/10">
          <div className="mt-1 flex-shrink-0">
             <span className="material-symbols-outlined text-orange-500 text-lg">shield</span>
          </div>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            Seus dados estão protegidos por criptografia de ponta a ponta e políticas de Row Level Security (RLS).
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2" onClick={() => setAccepted(!accepted)}>
          <div className={`h-6 w-6 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${accepted ? 'bg-orange-500 border-orange-500' : 'border-gray-600 bg-transparent'}`}>
            {accepted && <Check size={16} className="text-white" />}
          </div>
          <span className="text-sm text-gray-300 cursor-pointer select-none">Li e dou consentimento para o uso de meus dados e localização</span>
        </div>
      </div>

      <div className="pt-4">
        <Button 
          fullWidth 
          size="lg" 
          disabled={!accepted}
          onClick={() => navigate('/freelancer/dashboard')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Aceitar e Continuar
        </Button>
      </div>
    </div>
  );
};
